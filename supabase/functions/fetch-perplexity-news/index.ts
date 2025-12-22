import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  source: string;
  url: string;
  trending?: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchQuery, category } = await req.json().catch(() => ({}));
    
    if (!perplexityApiKey) {
      throw new Error('PERPLEXITY_API_KEY is not configured');
    }

    const query = searchQuery || 'latest VFX visual effects post-production entertainment industry news';
    const categoryFilter = category ? ` ${category}` : '';

    console.log(`Fetching news with query: ${query}${categoryFilter}`);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: `You are a news aggregator for the VFX, animation, and entertainment industry. 
            Return exactly 8 recent news items in JSON format. Each item must have:
            - title: compelling headline (max 100 chars)
            - summary: brief description (max 200 chars)
            - category: one of "VFX", "AI & Technology", "Animation", "Post-Production", "Industry"
            - source: publication name
            - url: link to the article
            
            Return ONLY valid JSON array, no markdown or explanations.`
          },
          {
            role: 'user',
            content: `Find the latest news about: ${query}${categoryFilter}. Focus on VFX, visual effects, animation, post-production, and AI in entertainment. Return as JSON array.`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, errorText);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '[]';
    const citations = data.citations || [];
    
    console.log('Perplexity response received, parsing content...');
    
    // Parse the JSON content from Perplexity
    let parsedNews: any[] = [];
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        parsedNews = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error('Failed to parse Perplexity response:', parseError);
      parsedNews = [];
    }

    // Transform to our NewsItem format
    const newsItems: NewsItem[] = parsedNews.map((item: any, index: number) => {
      const categories = ['VFX', 'AI & Technology', 'Animation', 'Post-Production', 'Industry'];
      const itemCategory = categories.includes(item.category) ? item.category : categories[Math.floor(Math.random() * categories.length)];
      
      return {
        id: `perplexity-${Date.now()}-${index}`,
        title: (item.title || 'Industry Update').substring(0, 100),
        summary: (item.summary || item.description || 'Read more about the latest industry developments.').substring(0, 200),
        category: category || itemCategory,
        image: `https://images.unsplash.com/photo-${1518770660439 + index}-4636190af475?w=800&h=600&fit=crop`,
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
        source: item.source || 'Industry News',
        url: item.url || citations[index] || '#',
        trending: index < 2,
      };
    });

    console.log(`Returning ${newsItems.length} news items from Perplexity`);

    return new Response(JSON.stringify({ 
      success: true, 
      news: newsItems,
      citations,
      fetchedAt: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching news from Perplexity:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      news: [] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
