import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHelmet from '@/components/SEOHelmet';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Search, Star, ArrowRight, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { blogPosts, getFeaturedPosts, categories, BlogPost } from '@/data/blogPosts';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const POSTS_PER_PAGE = 6;

const NewsletterBanner = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email },
      });
      if (error) throw error;
      toast.success('Subscribed! Check your inbox.');
      setEmail('');
    } catch {
      toast.error('Failed to subscribe. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-full my-4">
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex flex-col md:flex-row items-center gap-4 p-6">
          <div className="flex items-center gap-3 flex-1">
            <Mail className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Stay in the loop</h3>
              <p className="text-sm text-muted-foreground">Get VFX insights, tutorials, and industry news delivered weekly.</p>
            </div>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="min-w-[200px]"
            />
            <Button type="submit" disabled={loading} className="shrink-0">
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const PostCard = ({ post }: { post: BlogPost }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Link to={`/blog/${post.slug}`}>
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 group overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground">{post.category}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-5">
          <CardTitle className="mb-2 line-clamp-2 text-lg group-hover:text-primary transition-colors">{post.title}</CardTitle>
          <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
          </div>
          <span className="text-xs">{post.author}</span>
        </CardFooter>
      </Card>
    </Link>
  </motion.div>
);

const News = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const featured = getFeaturedPosts();

  const filtered = useMemo(() => {
    let result = [...blogPosts];
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    }
    return result;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paged = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  // Reset page when filters change
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <>
      <SEOHelmet
        title="Blog & Insights | Fuke's Media - VFX & Post-Production"
        description="VFX breakdowns, industry insights, behind-the-scenes tutorials, and production tips from Fuke's Media LLP."
        keywords="VFX blog, VFX tutorials, post-production insights, Indian VFX industry, compositing tips"
      />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SectionHeading
            title="Blog & Industry Insights"
            subtitle="VFX breakdowns, production tutorials, and contrarian industry takes from our team"
          />

          {/* Featured Posts */}
          {activeCategory === 'All' && !searchQuery && page === 1 && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Featured Posts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featured.map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`}>
                    <Card className="h-full group overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/20">
                      <div className="relative aspect-video overflow-hidden">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <Badge className="mb-2 bg-primary text-primary-foreground">{post.category}</Badge>
                          <h3 className="text-white font-bold line-clamp-2">{post.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                          <span>{post.author}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Post Grid with Newsletter CTA */}
          {paged.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map((post, i) => (
                <>
                  <PostCard key={post.id} post={post} />
                  {i === 2 && paged.length > 3 && <NewsletterBanner key="newsletter" />}
                </>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground">Try a different search or category.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPage(i + 1)}
                  className="w-9"
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {/* Browse by tag link */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Want real-time industry news from external sources?{' '}
              <Link to="/news/live" className="text-primary hover:underline inline-flex items-center gap-1">
                View Live Feed <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default News;
