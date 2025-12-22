import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SEOHelmet from '@/components/SEOHelmet';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Calendar, Clock, ExternalLink, Loader2, MessageCircle, RefreshCw, Search, Share2, TrendingUp } from 'lucide-react';
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
}

const News = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<string | null>(null);
  
  const fetchNews = useCallback(async (category?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-industry-news', {
        body: { 
          searchQuery: searchQuery || undefined,
          category: category !== 'all' ? category : undefined 
        },
      });

      if (error) {
        console.error('Error fetching news:', error);
        toast.error('Failed to fetch latest news');
        return;
      }

      if (data?.success && data?.news) {
        setNewsItems(data.news);
        setLastFetched(data.fetchedAt);
        toast.success('News updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Unable to fetch news at this time');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, []);

  // Filter news based on active tab
  useEffect(() => {
    let result = [...newsItems];
    
    // Filter by category
    if (activeTab !== 'all') {
      result = result.filter(item => 
        item.category.toLowerCase().includes(activeTab.toLowerCase())
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.title.toLowerCase().includes(query) || 
          item.summary.toLowerCase().includes(query)
      );
    }
    
    setFilteredNews(result);
  }, [activeTab, searchQuery, newsItems]);

  const handleRefresh = () => {
    fetchNews(activeTab);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNews(activeTab);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getCategoryColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('vfx') || cat.includes('visual')) return 'bg-purple-500 hover:bg-purple-600';
    if (cat.includes('ai') || cat.includes('tech')) return 'bg-amber-500 hover:bg-amber-600';
    if (cat.includes('animation')) return 'bg-green-500 hover:bg-green-600';
    if (cat.includes('post')) return 'bg-blue-500 hover:bg-blue-600';
    if (cat.includes('industry')) return 'bg-red-500 hover:bg-red-600';
    return 'bg-primary hover:bg-primary/90';
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Industry News & Updates",
    "description": "Stay updated with the latest news and trends in VFX, production, post-production, and creative industries worldwide.",
    "publisher": {
      "@type": "Organization",
      "name": "Fuke's Media LLP",
      "url": "https://fukes-media.com"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filteredNews.slice(0, 5).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": item.title,
          "description": item.summary,
          "datePublished": item.date
        }
      }))
    }
  };

  return (
    <>
      <SEOHelmet
        title="Industry News | Fuke's Media - VFX & Creative Studio"
        description="Stay updated with the latest real-time news and trends in VFX, AI, production, post-production, and creative industries worldwide."
        keywords="VFX news, film industry news, post-production news, AI entertainment news, visual effects trends"
        structuredData={structuredData}
      />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle 
            title="Industry News & Updates" 
            subtitle="Real-time news from VFX, AI, and entertainment industries"
            accent="primary"
          />

          {/* Last updated indicator */}
          {lastFetched && (
            <div className="text-center mb-4">
              <span className="text-sm text-muted-foreground">
                Last updated: {new Date(lastFetched).toLocaleString()}
              </span>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <form onSubmit={handleSearch} className="relative w-full md:max-w-md flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search VFX, AI, entertainment news..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={handleRefresh}
                disabled={isLoading}
                title="Refresh news"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </form>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
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
              <p className="text-muted-foreground">Searching VFX, AI, and entertainment sources</p>
            </div>
          ) : filteredNews.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredNews.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border border-border/50 group">
                    <CardHeader className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop';
                          }}
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={`${getCategoryColor(item.category)} text-white`}>
                            {item.category}
                          </Badge>
                        </div>
                        {item.trending && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-red-500" />
                              Trending
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-grow p-5">
                      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                        <span className="font-medium">{item.source}</span>
                      </div>
                      <CardTitle className="mb-2 line-clamp-2 text-lg">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{item.summary}</CardDescription>
                    </CardContent>
                    
                    <CardFooter className="px-5 pb-5 pt-0 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        {item.readTime}
                      </div>
                      
                      <div className="flex gap-2">
                        {item.url && item.url !== '#' && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => window.open(item.url, '_blank')}
                            title="Read full article"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" title="Share">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Bookmark">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh News
              </Button>
            </div>
          )}
        </motion.div>
      </main>
    </>
  );
};

export default News;
