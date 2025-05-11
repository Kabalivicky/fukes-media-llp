
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Calendar, Clock, MessageCircle, Search, Share2, TrendingUp } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'production' | 'post-production' | 'pre-production' | 'tech' | 'industry';
  image: string;
  date: string;
  readTime: number;
  source: string;
  trending?: boolean;
}

// Sample news data - in a real app this would come from an API
const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'New AI-Powered Tools Revolutionize VFX Workflows',
    summary: 'Major studios are adopting artificial intelligence to streamline post-production processes, cutting costs and time by up to 40%.',
    category: 'post-production',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=vfx-news-1&backgroundColor=0057B7',
    date: '2025-05-10',
    readTime: 5,
    source: 'VFX World',
    trending: true
  },
  {
    id: '2',
    title: 'Virtual Production Studios Expand Globally',
    summary: 'LED wall technology sees massive adoption across film industries worldwide, with new stages opening in Southeast Asia and Eastern Europe.',
    category: 'production',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=vfx-news-2&backgroundColor=D50032',
    date: '2025-05-07',
    readTime: 8,
    source: 'Production Weekly'
  },
  {
    id: '3',
    title: 'Upcoming Regulations May Impact VFX Tax Incentives',
    summary: 'New legislation being considered in multiple countries could reshape how tax credits are applied to visual effects work.',
    category: 'industry',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=vfx-news-3&backgroundColor=009639',
    date: '2025-05-05',
    readTime: 6,
    source: 'Industry Insider'
  },
  {
    id: '4',
    title: 'Real-Time Rendering Breakthrough Announced',
    summary: 'A major technology company has unveiled a new GPU series capable of photo-realistic real-time rendering for film-quality visuals.',
    category: 'tech',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=vfx-news-4&backgroundColor=FFCC00',
    date: '2025-05-03',
    readTime: 4,
    source: 'Tech Review'
  },
  {
    id: '5',
    title: 'New Pre-Production Pipeline Tools Focus on Remote Collaboration',
    summary: 'Several new software solutions aim to solve challenges in remote pre-production, addressing the industry\'s permanent shift to distributed teams.',
    category: 'pre-production',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=vfx-news-5&backgroundColor=00BFFF',
    date: '2025-05-01',
    readTime: 7,
    source: 'Digital Pipeline'
  },
  {
    id: '6',
    title: 'Indie Studios Form Alliance to Compete with Industry Giants',
    summary: 'A consortium of independent VFX studios has united to take on larger projects that would typically go to major providers.',
    category: 'industry',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=vfx-news-6&backgroundColor=0057B7',
    date: '2025-04-28',
    readTime: 5,
    source: 'VFX Journal'
  }
];

const News = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(newsItems);
  
  useEffect(() => {
    let result = [...newsItems];
    
    // Filter by category
    if (activeTab !== 'all') {
      result = result.filter(item => item.category === activeTab);
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
  }, [activeTab, searchQuery]);
  
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
    switch (category) {
      case 'production': return 'bg-blue-500 hover:bg-blue-600';
      case 'post-production': return 'bg-purple-500 hover:bg-purple-600';
      case 'pre-production': return 'bg-green-500 hover:bg-green-600';
      case 'tech': return 'bg-amber-500 hover:bg-amber-600';
      case 'industry': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <MainLayout pageKey="news">
      <Helmet>
        <title>Industry News | Fuke's Media - VFX & Creative Studio</title>
        <meta name="description" content="Stay updated with the latest news and trends in VFX, production, post-production, and creative industries worldwide." />
      </Helmet>
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle 
            title="Industry News & Updates" 
            subtitle="Stay informed with the latest developments in VFX, production, and creative technology"
            accent="primary"
          />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search news articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="production">Production</TabsTrigger>
                <TabsTrigger value="post-production">Post</TabsTrigger>
                <TabsTrigger value="pre-production">Pre-Production</TabsTrigger>
                <TabsTrigger value="tech">Tech</TabsTrigger>
                <TabsTrigger value="industry">Industry</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredNews.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredNews.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-md transition-shadow border border-border/50">
                    <CardHeader className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={`${getCategoryColor(item.category)} text-white`}>
                            {item.category.replace('-', ' ')}
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
                      <CardTitle className="mb-2 line-clamp-2">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{item.summary}</CardDescription>
                    </CardContent>
                    
                    <CardFooter className="px-5 pb-5 pt-0 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        {item.readTime} min read
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageCircle className="h-4 w-4" />
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
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </motion.div>
      </main>
    </MainLayout>
  );
};

export default News;
