import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style, aspectRatio = '16:9', duration = 5 } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Prompt is required');
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Generating video for prompt: "${prompt}" with style: "${style}", aspect: "${aspectRatio}", duration: ${duration}s`);

    // Build enhanced prompt with style
    const stylePrompts: Record<string, string> = {
      cinematic: 'cinematic quality, dramatic lighting, film grain, professional cinematography, movie-like',
      animation: '3D animated style, smooth motion, vibrant colors, polished CGI, Pixar-quality',
      documentary: 'documentary style, natural lighting, realistic footage, authentic feel',
      commercial: 'commercial quality, polished, professional, advertising aesthetic, clean'
    };

    const styleEnhancement = stylePrompts[style] || stylePrompts.cinematic;
    const enhancedPrompt = `${prompt}. ${styleEnhancement}. High quality video, smooth motion.`;

    // Use Lovable AI for video generation
    const response = await fetch('https://ai.gateway.lovable.dev/v1/videos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        aspect_ratio: aspectRatio,
        duration: duration,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Video generation error:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      if (response.status === 402) {
        throw new Error('AI usage limit reached. Please check your workspace credits.');
      }
      throw new Error(`Video generation failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Video generation response received');

    // Extract video URL from response
    const videoUrl = data.video_url || data.url;
    
    if (!videoUrl) {
      throw new Error('No video was generated. Please try a different prompt.');
    }

    // Optionally upload to Supabase storage for persistence
    let finalVideoUrl = videoUrl;
    
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Fetch the video from the generated URL
      const videoResponse = await fetch(videoUrl);
      if (videoResponse.ok) {
        const videoBuffer = await videoResponse.arrayBuffer();
        const fileName = `generated/videos/${Date.now()}.mp4`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('projects')
          .upload(fileName, videoBuffer, {
            contentType: 'video/mp4',
            upsert: true
          });

        if (!uploadError && uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('projects')
            .getPublicUrl(fileName);
          finalVideoUrl = publicUrl;
          console.log('Video uploaded to storage:', finalVideoUrl);
        }
      }
    } catch (uploadError) {
      console.log('Storage upload skipped, using original URL');
    }

    console.log('Successfully generated video');

    return new Response(
      JSON.stringify({ 
        success: true, 
        videoUrl: finalVideoUrl,
        prompt: prompt,
        style: style,
        duration: duration
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-video function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to generate video',
        success: false
      }),
      { 
        status: error.message?.includes('Rate limit') ? 429 : 
                error.message?.includes('usage limit') ? 402 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
