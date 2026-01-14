import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute per IP

function getRateLimitKey(req: Request): string {
  // Use X-Forwarded-For header or fall back to a default
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'anonymous';
  return ip;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

// Input validation
function validateInput(searchQuery: unknown, category: unknown): { valid: boolean; error?: string } {
  if (searchQuery !== undefined && searchQuery !== null) {
    if (typeof searchQuery !== 'string') {
      return { valid: false, error: 'searchQuery must be a string' };
    }
    if (searchQuery.length > 200) {
      return { valid: false, error: 'searchQuery must be 200 characters or less' };
    }
  }
  
  if (category !== undefined && category !== null) {
    if (typeof category !== 'string') {
      return { valid: false, error: 'category must be a string' };
    }
    const validCategories = ['VFX', 'AI & Technology', 'Animation', 'Post-Production', 'Industry'];
    if (category.length > 50) {
      return { valid: false, error: 'category must be 50 characters or less' };
    }
  }
  
  return { valid: true };
}

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

  // Rate limiting check
  const rateLimitKey = getRateLimitKey(req);
  const rateLimit = checkRateLimit(rateLimitKey);
  
  if (!rateLimit.allowed) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Rate limit exceeded. Please try again later.',
      news: [] 
    }), {
      status: 429,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': '0',
        'Retry-After': '60'
      },
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { searchQuery, category } = body;

    // Validate input
    const validation = validateInput(searchQuery, category);
    if (!validation.valid) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: validation.error,
        news: [] 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Use Firecrawl search to find recent VFX and entertainment news
    const searchTerms = [
      'VFX visual effects news 2024',
      'post production industry news',
      'AI in film production',
      'Hollywood visual effects studios',
      'animation industry updates',
    ];

    const query = (searchQuery as string) || searchTerms[Math.floor(Math.random() * searchTerms.length)];
    const categoryStr = (category as string) || '';

    const response = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `${query} ${categoryStr ? categoryStr : 'VFX post-production AI entertainment'}`,
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
      const randomCategory = categoryStr || categories[Math.floor(Math.random() * categories.length)];
      
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
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': String(rateLimit.remaining)
      },
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An error occurred while fetching news',
      news: [] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
