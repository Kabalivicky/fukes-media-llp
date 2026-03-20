import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bookmark, Calendar, Clock, ExternalLink, Loader2, RefreshCw, Search, Share2, TrendingUp, Sparkles, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  source: string;
  url?: string;
  trending?: boolean;
  provider?: 'firecrawl' | 'perplexity';
}

type NewsSource = 'all' | 'firecrawl' | 'perplexity';

const LiveNews = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<string | null>(null);
  const [newsSource, setNewsSource] = useState<NewsSource>('all');

  const fetchFromFirecrawl = async (category?: string): Promise<NewsItem[]> => {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-industry-news', {
        body: { searchQuery: searchQuery || undefined, category: category !== 'all' ? category : undefined },
      });
      if (error) throw error;
      return (data?.news || []).map((item: NewsItem) => ({ ...item, provider: 'firecrawl' as const }));
    } catch (error) {
      console.error('Firecrawl fetch error:', error);
      return [];
    }
  };

  const fetchFromPerplexity = async (category?: string): Promise<NewsItem[]> => {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-perplexity-news', {
        body: { searchQuery: searchQuery || undefined, category: category !== 'all' ? category : undefined },
      });
      if (error) throw error;
      return (data?.news || []).map((item: NewsItem) => ({ ...item, provider: 'perplexity' as const }));
    } catch (error) {
      console.error('Perplexity fetch error:', error);
      return [];
    }
  };

  const fetchNews = useCallback(async (category?: string) => {
    setIsLoading(true);
    try {
      let allNews: NewsItem[] = [];
      if (newsSource === 'all') {
        const [f, p] = await Promise.all([fetchFromFirecrawl(category), fetchFromPerplexity(category)]);
        allNews = [...f, ...p];
      } else if (newsSource === 'firecrawl') {
        allNews = await fetchFromFirecrawl(category);
      } else {
        allNews = await fetchFromPerplexity(category);
      }
      const unique = allNews.reduce((acc: NewsItem[], cur) => {
        if (!acc.some(i => i.title.toLowerCase().substring(0, 30) === cur.title.toLowerCase().substring(0, 30))) acc.push(cur);
        return acc;
      }, []);
      setNewsItems(unique);
      setLastFetched(new Date().toISOString());
      toast.success(`Found ${unique.length} news items`);
    } catch {
      toast.error('Unable to fetch news at this time');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, newsSource]);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  useEffect(() => {
    let result = [...newsItems];
    if (activeTab !== 'all') result = result.filter(i => i.category.toLowerCase().includes(activeTab.toLowerCase()));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(i => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
    }
    setFilteredNews(result);
  }, [activeTab, searchQuery, newsItems]);

  const getCategoryColor = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes('vfx')) return 'bg-purple-500';
    if (c.includes('ai') || c.includes('tech')) return 'bg-amber-500';
    if (c.includes('animation')) return 'bg-green-500';
    if (c.includes('post')) return 'bg-blue-500';
    if (c.includes('industry')) return 'bg-red-500';
    return 'bg-primary';
  };

  return (
    <>
      <SEOHelmet title="Live Industry News | Fuke's Media" description="Real-time news from VFX, AI, and entertainment industries." />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <SectionHeading title="Live Industry Feed" subtitle="Real-time news from VFX, AI, and entertainment sources" />

        {/* Source selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Source:</span>
            <div className="flex gap-1">
              {(['all', 'firecrawl', 'perplexity'] as const).map(s => (
                <Button key={s} variant={newsSource === s ? 'default' : 'outline'} size="sm" onClick={() => setNewsSource(s)} className="text-xs">
                  {s === 'all' && <Globe className="h-3 w-3 mr-1" />}
                  {s === 'perplexity' && <Sparkles className="h-3 w-3 mr-1" />}
                  {s === 'all' ? 'All Sources' : s === 'firecrawl' ? 'Firecrawl' : 'Perplexity AI'}
                </Button>
              ))}
            </div>
          </div>
          {lastFetched && <span className="text-sm text-muted-foreground">Updated: {new Date(lastFetched).toLocaleTimeString()}</span>}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <form onSubmit={e => { e.preventDefault(); fetchNews(activeTab); }} className="relative w-full md:max-w-md flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search news..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Button type="submit" disabled={isLoading}>{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}</Button>
            <Button type="button" variant="outline" size="icon" onClick={() => fetchNews(activeTab)} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </form>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="vfx">VFX</TabsTrigger>
              <TabsTrigger value="ai">AI & Tech</TabsTrigger>
              <TabsTrigger value="animation">Animation</TabsTrigger>
              <TabsTrigger value="post">Post-Prod</TabsTrigger>
              <TabsTrigger value="industry">Industry</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading && newsItems.length === 0 ? (
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Fetching latest news...</h3>
          </div>
        ) : filteredNews.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(item => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-all group">
                  <CardHeader className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'; }} />
                      <div className="absolute top-2 left-2"><Badge className={`${getCategoryColor(item.category)} text-white`}>{item.category}</Badge></div>
                      {item.trending && <div className="absolute top-2 right-2"><Badge variant="outline" className="bg-background/80 backdrop-blur-sm flex items-center gap-1"><TrendingUp className="h-3 w-3 text-red-500" />Trending</Badge></div>}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-5">
                    <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                      <span className="font-medium">{item.source}</span>
                      {item.provider && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{item.provider === 'perplexity' ? 'AI' : 'Web'}</Badge>}
                    </div>
                    <CardTitle className="mb-2 line-clamp-2 text-lg">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{item.summary}</CardDescription>
                  </CardContent>
                  <CardFooter className="px-5 pb-5 pt-0 flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />{new Date(item.date).toLocaleDateString()}
                      <Clock className="h-4 w-4 ml-3 mr-1" />{item.readTime}
                    </div>
                    <div className="flex gap-1">
                      {item.url && item.url !== '#' && <Button variant="ghost" size="icon" onClick={() => window.open(item.url, '_blank')}><ExternalLink className="h-4 w-4" /></Button>}
                      <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Bookmark className="h-4 w-4" /></Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-2">No results found</h3>
            <Button onClick={() => fetchNews(activeTab)} disabled={isLoading}><RefreshCw className="h-4 w-4 mr-2" />Refresh</Button>
          </div>
        )}
      </main>
    </>
  );
};

export default LiveNews;
