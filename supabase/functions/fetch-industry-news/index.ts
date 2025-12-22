import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// News sources to scrape
const newsSources = [
  { url: 'https://www.vfxvoice.com/', name: 'VFX Voice', category: 'VFX' },
  { url: 'https://www.fxguide.com/', name: 'FXGuide', category: 'VFX' },
  { url: 'https://www.cartoonbrew.com/', name: 'Cartoon Brew', category: 'Animation' },
  { url: 'https://variety.com/v/digital/', name: 'Variety Digital', category: 'Industry' },
  { url: 'https://www.hollywoodreporter.com/t/visual-effects/', name: 'Hollywood Reporter', category: 'VFX' },
];

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

    // Use Firecrawl search to find recent VFX and entertainment news
    const searchTerms = [
      'VFX visual effects news 2024',
      'post production industry news',
      'AI in film production',
      'Hollywood visual effects studios',
      'animation industry updates',
    ];

    const query = searchQuery || searchTerms[Math.floor(Math.random() * searchTerms.length)];

    const response = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `${query} ${category ? category : 'VFX post-production AI entertainment'}`,
        limit: 10,
        lang: 'en',
        scrapeOptions: {
          formats: ['markdown'],
          onlyMainContent: true,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Firecrawl API error:', errorText);
      throw new Error(`Firecrawl API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform Firecrawl results to news items
    const newsItems: NewsItem[] = (data.data || []).map((item: any, index: number) => {
      const categories = ['VFX', 'AI & Technology', 'Animation', 'Post-Production', 'Industry'];
      const randomCategory = category || categories[Math.floor(Math.random() * categories.length)];
      
      // Extract a clean title
      const title = item.title || item.metadata?.title || 'Industry Update';
      
      // Extract description/summary
      const summary = item.description || 
                     item.metadata?.description || 
                     (item.markdown ? item.markdown.substring(0, 200) + '...' : 'Read more about the latest industry developments.');
      
      // Try to get image from metadata
      const image = item.metadata?.ogImage || 
                   item.metadata?.image || 
                   `https://images.unsplash.com/photo-${1518770660439 + index}-4636190af475?w=800&h=600&fit=crop`;

      return {
        id: `news-${Date.now()}-${index}`,
        title: title.length > 100 ? title.substring(0, 97) + '...' : title,
        summary: summary.length > 200 ? summary.substring(0, 197) + '...' : summary,
        category: randomCategory,
        image,
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
        source: item.metadata?.siteName || new URL(item.url || 'https://example.com').hostname.replace('www.', ''),
        url: item.url || '#',
        trending: index < 3,
      };
    });

    return new Response(JSON.stringify({ 
      success: true, 
      news: newsItems,
      fetchedAt: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching news:', error);
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
