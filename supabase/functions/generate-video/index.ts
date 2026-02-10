import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_PROMPT_LENGTH = 1000;
const VALID_STYLES = ['cinematic', 'animation', 'documentary', 'commercial'];
const VALID_ASPECT_RATIOS = ['16:9', '9:16', '1:1', '4:3'];
const VALID_DURATIONS = [5, 10];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Invalid or expired session' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { prompt, style, aspectRatio = '16:9', duration = 5 } = await req.json();

    // Input validation
    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Prompt is required and must be a string' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return new Response(JSON.stringify({ error: `Prompt must be under ${MAX_PROMPT_LENGTH} characters` }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (style && !VALID_STYLES.includes(style)) {
      return new Response(JSON.stringify({ error: `Style must be one of: ${VALID_STYLES.join(', ')}` }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!VALID_ASPECT_RATIOS.includes(aspectRatio)) {
      return new Response(JSON.stringify({ error: `Aspect ratio must be one of: ${VALID_ASPECT_RATIOS.join(', ')}` }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const validDuration = VALID_DURATIONS.includes(Number(duration)) ? Number(duration) : 5;

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
        status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`Generating video for user ${claimsData.claims.sub}`);

    const stylePrompts: Record<string, string> = {
      cinematic: 'cinematic quality, dramatic lighting, film grain, professional cinematography, movie-like',
      animation: '3D animated style, smooth motion, vibrant colors, polished CGI, Pixar-quality',
      documentary: 'documentary style, natural lighting, realistic footage, authentic feel',
      commercial: 'commercial quality, polished, professional, advertising aesthetic, clean'
    };

    const styleEnhancement = stylePrompts[style] || stylePrompts.cinematic;
    const enhancedPrompt = `${prompt}. ${styleEnhancement}. High quality video, smooth motion.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/videos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        aspect_ratio: aspectRatio,
        duration: validDuration,
      }),
    });

    if (!response.ok) {
      console.error('Video generation error:', response.status);
      if (response.status === 429 || response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Usage limit reached. Please try again later.', success: false }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({ error: 'Unable to generate video. Please try again later.', success: false }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const videoUrl = data.video_url || data.url;
    
    if (!videoUrl) {
      return new Response(
        JSON.stringify({ error: 'Unable to generate video. Please try a different prompt.', success: false }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let finalVideoUrl = videoUrl;
    
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const adminSupabase = createClient(supabaseUrl, supabaseServiceKey);

      const videoResponse = await fetch(videoUrl);
      if (videoResponse.ok) {
        const videoBuffer = await videoResponse.arrayBuffer();
        const fileName = `generated/videos/${Date.now()}.mp4`;
        
        const { data: uploadData, error: uploadError } = await adminSupabase.storage
          .from('projects')
          .upload(fileName, videoBuffer, {
            contentType: 'video/mp4',
            upsert: true
          });

        if (!uploadError && uploadData) {
          const { data: { publicUrl } } = adminSupabase.storage
            .from('projects')
            .getPublicUrl(fileName);
          finalVideoUrl = publicUrl;
        }
      }
    } catch (uploadError) {
      console.log('Storage upload skipped, using original URL');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        videoUrl: finalVideoUrl,
        prompt,
        style,
        duration: validDuration
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-video function:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again later.', success: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
