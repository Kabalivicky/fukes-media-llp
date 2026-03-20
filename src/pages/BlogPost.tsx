import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHelmet from '@/components/SEOHelmet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Share2, User } from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '@/data/blogPosts';
import { toast } from 'sonner';

const SocialShareButtons = ({ url, title }: { url: string; title: string }) => {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const share = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Share:</span>
      <Button variant="outline" size="sm" onClick={() => share('twitter')} className="text-xs px-3">
        𝕏 Twitter
      </Button>
      <Button variant="outline" size="sm" onClick={() => share('linkedin')} className="text-xs px-3">
        LinkedIn
      </Button>
      <Button variant="outline" size="sm" onClick={() => share('whatsapp')} className="text-xs px-3">
        WhatsApp
      </Button>
      <Button variant="ghost" size="sm" onClick={copyLink} title="Copy link">
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <main className="container mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Button onClick={() => navigate('/news')}>Back to Blog</Button>
      </main>
    );
  }

  const related = getRelatedPosts(post, 3);
  const postUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <SEOHelmet
        title={`${post.title} | Fuke's Media Blog`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
      />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Back */}
          <Link to="/news" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          {/* Header */}
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-balance">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><User className="h-4 w-4" />{post.author} — {post.authorRole}</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</span>
          </div>

          <SocialShareButtons url={postUrl} title={post.title} />

          {/* Cover Image */}
          <div className="mt-8 mb-10 rounded-xl overflow-hidden aspect-video">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {post.content.split('\n\n').map((para, i) => {
              if (para.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{para.replace('## ', '')}</h2>;
              }
              if (para.startsWith('- ')) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-1 mb-4">
                    {para.split('\n').map((li, j) => (
                      <li key={j}>{li.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                );
              }
              if (para.match(/^\d\./)) {
                return (
                  <ol key={i} className="list-decimal pl-6 space-y-1 mb-4">
                    {para.split('\n').map((li, j) => (
                      <li key={j}>{li.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} className="mb-4 leading-relaxed text-muted-foreground">{para}</p>;
            })}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          {/* Share bottom */}
          <div className="border-t pt-6 mb-16">
            <p className="text-sm text-muted-foreground mb-3">Enjoyed this article? Share it with your network.</p>
            <SocialShareButtons url={postUrl} title={post.title} />
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(rp => (
                  <Link key={rp.id} to={`/blog/${rp.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow group overflow-hidden">
                      <div className="aspect-video overflow-hidden">
                        <img src={rp.coverImage} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">{rp.category}</Badge>
                        <h3 className="font-semibold line-clamp-2 mb-1">{rp.title}</h3>
                        <p className="text-xs text-muted-foreground">{rp.readTime}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </main>
    </>
  );
};

export default BlogPost;
