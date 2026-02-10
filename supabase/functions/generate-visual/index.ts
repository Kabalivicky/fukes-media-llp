import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_PROMPT_LENGTH = 1000;
const MAX_COUNT = 3;
const VALID_STYLES = ['cinematic', 'artistic', 'photorealistic', 'vfx'];

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

    const { prompt, style, count = 1 } = await req.json();

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

    const validCount = Math.min(Math.max(1, Number(count) || 1), MAX_COUNT);

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
        status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`Generating ${validCount} image(s) for user ${claimsData.claims.sub}`);

    const stylePrompts: Record<string, string> = {
      cinematic: 'cinematic lighting, movie quality, dramatic atmosphere, film grain, professional cinematography',
      artistic: 'artistic style, oil painting texture, vibrant colors, creative composition, fine art aesthetic',
      photorealistic: 'photorealistic, ultra high definition, 8K resolution, sharp details, natural lighting',
      vfx: 'VFX concept art, digital matte painting, epic scale, fantasy elements, movie production quality'
    };

    const styleEnhancement = stylePrompts[style] || stylePrompts.cinematic;
    const enhancedPrompt = `${prompt}. ${styleEnhancement}. Ultra high resolution.`;

    const generatedImages: string[] = [];

    for (let i = 0; i < validCount; i++) {
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
        console.error(`Image generation error (attempt ${i + 1}):`, response.status);
        if (response.status === 429 || response.status === 402) {
          return new Response(
            JSON.stringify({ error: 'Usage limit reached. Please try again later.' }),
            { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        continue;
      }

      const data = await response.json();
      const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      
      if (imageData) {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const adminSupabase = createClient(supabaseUrl, supabaseServiceKey);

        if (imageData.startsWith('data:image')) {
          const base64Data = imageData.split(',')[1];
          const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
          const fileName = `generated/${Date.now()}-${i}.png`;
          
          const { data: uploadData, error: uploadError } = await adminSupabase.storage
            .from('projects')
            .upload(fileName, imageBuffer, {
              contentType: 'image/png',
              upsert: true
            });

          if (!uploadError && uploadData) {
            const { data: { publicUrl } } = adminSupabase.storage
              .from('projects')
              .getPublicUrl(fileName);
            generatedImages.push(publicUrl);
          } else {
            generatedImages.push(imageData);
          }
        } else {
          generatedImages.push(imageData);
        }
      }
    }

    if (generatedImages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Unable to generate images. Please try a different prompt.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, images: generatedImages, prompt, style }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-visual function:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again later.', success: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
