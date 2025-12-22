import { ExternalLink, Star, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AffiliateProduct {
  name: string;
  description: string;
  category: string;
  affiliateUrl: string;
  imageUrl?: string;
  discount?: string;
  rating?: number;
  featured?: boolean;
}

const affiliateProducts: AffiliateProduct[] = [
  {
    name: 'Adobe Creative Cloud',
    description: 'Industry-standard creative tools for VFX, video editing, and design',
    category: 'Software',
    affiliateUrl: 'https://www.adobe.com/creativecloud.html',
    discount: '20% OFF',
    rating: 5,
    featured: true
  },
  {
    name: 'DaVinci Resolve Studio',
    description: 'Professional video editing, color correction, and VFX',
    category: 'Software',
    affiliateUrl: 'https://www.blackmagicdesign.com/products/davinciresolve',
    rating: 5,
    featured: true
  },
  {
    name: 'Houdini',
    description: '3D animation and VFX software for procedural content',
    category: 'Software',
    affiliateUrl: 'https://www.sidefx.com/products/houdini/',
    rating: 5
  },
  {
    name: 'Nuke',
    description: 'Node-based compositing for film and TV',
    category: 'Software',
    affiliateUrl: 'https://www.foundry.com/products/nuke-family/nuke',
    rating: 5
  },
  {
    name: 'Cinema 4D',
    description: 'Professional 3D modeling, animation, and rendering',
    category: 'Software',
    affiliateUrl: 'https://www.maxon.net/cinema-4d',
    discount: '15% OFF',
    rating: 4
  },
  {
    name: 'Blender Market',
    description: 'Premium addons and assets for Blender',
    category: 'Assets',
    affiliateUrl: 'https://blendermarket.com/',
    rating: 4
  },
  {
    name: 'Turbosquid',
    description: '3D models and assets for your projects',
    category: 'Assets',
    affiliateUrl: 'https://www.turbosquid.com/',
    rating: 4
  },
  {
    name: 'Skillshare',
    description: 'Learn VFX, motion graphics, and more',
    category: 'Learning',
    affiliateUrl: 'https://www.skillshare.com/',
    discount: '1 Month Free',
    rating: 4
  }
];

interface AffiliateLinksProps {
  limit?: number;
  showFeaturedOnly?: boolean;
  category?: string;
}

const AffiliateLinks = ({ limit, showFeaturedOnly = false, category }: AffiliateLinksProps) => {
  let products = affiliateProducts;
  
  if (showFeaturedOnly) {
    products = products.filter(p => p.featured);
  }
  
  if (category) {
    products = products.filter(p => p.category === category);
  }
  
  if (limit) {
    products = products.slice(0, limit);
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Recommended Tools & Resources
        </CardTitle>
        <CardDescription>
          Professional tools we use and recommend. Some links may earn us a commission.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group"
            >
              <div className="p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/10 transition-all duration-300 hover:border-primary/50 h-full">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                      {product.name}
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </h4>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {product.category}
                    </Badge>
                  </div>
                  {product.discount && (
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {product.discount}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.description}
                </p>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: product.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            * Some links are affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateLinks;
