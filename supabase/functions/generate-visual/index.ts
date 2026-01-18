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
    const { prompt, style, count = 1 } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Prompt is required');
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Generating ${count} image(s) for prompt: "${prompt}" with style: "${style}"`);

    // Build enhanced prompt with style
    const stylePrompts: Record<string, string> = {
      cinematic: 'cinematic lighting, movie quality, dramatic atmosphere, film grain, professional cinematography',
      artistic: 'artistic style, oil painting texture, vibrant colors, creative composition, fine art aesthetic',
      photorealistic: 'photorealistic, ultra high definition, 8K resolution, sharp details, natural lighting',
      vfx: 'VFX concept art, digital matte painting, epic scale, fantasy elements, movie production quality'
    };

    const styleEnhancement = stylePrompts[style] || stylePrompts.cinematic;
    const enhancedPrompt = `${prompt}. ${styleEnhancement}. Ultra high resolution.`;

    // Generate images (up to 3 variations)
    const generatedImages: string[] = [];
    const numImages = Math.min(count, 3);

    for (let i = 0; i < numImages; i++) {
      console.log(`Generating image ${i + 1}/${numImages}...`);
      
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-image',
          messages: [
            {
              role: 'user',
              content: `Generate a high-quality image: ${enhancedPrompt}${i > 0 ? ` (variation ${i + 1})` : ''}`
            }
          ],
          modalities: ['image', 'text']
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Image generation error (attempt ${i + 1}):`, response.status, errorText);
        
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        }
        if (response.status === 402) {
          throw new Error('AI usage limit reached. Please check your workspace credits.');
        }
        throw new Error(`Image generation failed: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Image ${i + 1} response received`);
      
      // Extract the image URL from the response
      const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      
      if (imageData) {
        // Upload to Supabase storage for persistence
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Decode base64 and upload
        if (imageData.startsWith('data:image')) {
          const base64Data = imageData.split(',')[1];
          const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
          const fileName = `generated/${Date.now()}-${i}.png`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('projects')
            .upload(fileName, imageBuffer, {
              contentType: 'image/png',
              upsert: true
            });

          if (!uploadError && uploadData) {
            const { data: { publicUrl } } = supabase.storage
              .from('projects')
              .getPublicUrl(fileName);
            generatedImages.push(publicUrl);
          } else {
            // If upload fails, use the base64 directly
            generatedImages.push(imageData);
          }
        } else {
          generatedImages.push(imageData);
        }
      }
    }

    if (generatedImages.length === 0) {
      throw new Error('No images were generated. Please try a different prompt.');
    }

    console.log(`Successfully generated ${generatedImages.length} image(s)`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        images: generatedImages,
        prompt: prompt,
        style: style
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-visual function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to generate image',
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