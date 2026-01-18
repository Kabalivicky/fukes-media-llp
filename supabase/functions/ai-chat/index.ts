import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json() as { messages: Message[] };
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Messages array is required');
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemMessage = {
      role: 'system',
      content: `You are the Fuke's Media VFX AI Assistant - a helpful, knowledgeable assistant specializing in visual effects, post-production, and creative services.

Your expertise includes:
- VFX techniques: compositing, rotoscoping, color grading, 3D modeling, motion graphics
- Post-production workflows: editing, sound design, DI, mastering
- Industry software: Nuke, After Effects, DaVinci Resolve, Maya, Houdini, Blender
- Project estimation and budgeting for VFX work
- Industry best practices and standards

About Fuke's Media:
- Award-winning VFX and post-production studio
- Worked on major Hollywood films and independent productions
- Specializes in high-end VFX, AI-driven creative solutions, and production support
- Offers services in VFX, color grading, motion graphics, and virtual production

Be helpful, professional, and concise. When discussing pricing, encourage users to use the pricing calculator or contact the sales team for accurate quotes.`
    };

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [systemMessage, ...messages],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'I apologize, but I was unable to generate a response. Please try again.';

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred processing your request',
        response: 'I apologize, but I encountered an error. Please try again later.'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});