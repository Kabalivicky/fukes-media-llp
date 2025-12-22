import { Download, Package, Palette, Film, Code, FileImage } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DigitalProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: 'LUTs' | 'Presets' | 'Templates' | 'Assets' | 'Scripts';
  downloadUrl?: string;
  previewImage?: string;
  featured?: boolean;
  free?: boolean;
}

const digitalProducts: DigitalProduct[] = [
  {
    id: 'cinematic-luts-pack',
    name: 'Cinematic LUTs Pack',
    description: '25 professional color grading LUTs for film and video',
    price: 29.99,
    currency: 'USD',
    category: 'LUTs',
    featured: true
  },
  {
    id: 'vfx-templates-bundle',
    name: 'VFX Templates Bundle',
    description: 'After Effects templates for explosions, fire, and particles',
    price: 49.99,
    currency: 'USD',
    category: 'Templates',
    featured: true
  },
  {
    id: 'free-color-presets',
    name: 'Starter Color Presets',
    description: '10 free color grading presets for beginners',
    price: 0,
    currency: 'USD',
    category: 'Presets',
    free: true
  },
  {
    id: 'motion-graphics-pack',
    name: 'Motion Graphics Pack',
    description: 'Animated titles, transitions, and lower thirds',
    price: 39.99,
    currency: 'USD',
    category: 'Templates'
  },
  {
    id: 'nuke-scripts',
    name: 'Nuke Python Scripts',
    description: 'Automation scripts for Nuke compositing workflows',
    price: 19.99,
    currency: 'USD',
    category: 'Scripts'
  },
  {
    id: 'hdri-environment-pack',
    name: 'HDRI Environment Pack',
    description: '50 high-quality HDRI environments for 3D rendering',
    price: 59.99,
    currency: 'USD',
    category: 'Assets'
  }
];

const categoryIcons = {
  LUTs: Palette,
  Presets: Film,
  Templates: Package,
  Assets: FileImage,
  Scripts: Code
};

interface DigitalProductsProps {
  limit?: number;
  showFreeOnly?: boolean;
  category?: string;
}

const DigitalProducts = ({ limit, showFreeOnly = false, category }: DigitalProductsProps) => {
  let products = digitalProducts;
  
  if (showFreeOnly) {
    products = products.filter(p => p.free);
  }
  
  if (category) {
    products = products.filter(p => p.category === category);
  }
  
  if (limit) {
    products = products.slice(0, limit);
  }

  const handlePurchase = (product: DigitalProduct) => {
    // Placeholder for purchase flow
    // This would integrate with Stripe, Gumroad, or similar
    if (product.free) {
      alert(`Downloading: ${product.name}`);
    } else {
      alert(`Purchase flow for: ${product.name} - $${product.price}`);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Digital Products
        </CardTitle>
        <CardDescription>
          Professional assets, LUTs, presets, and templates for your projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const CategoryIcon = categoryIcons[product.category];
            
            return (
              <div
                key={product.id}
                className="p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/10 transition-all duration-300 hover:border-primary/50 flex flex-col"
              >
                <div className="flex items-start justify-between mb-2">
                  <CategoryIcon className="w-8 h-8 text-primary/70" />
                  <div className="flex gap-1">
                    {product.featured && (
                      <Badge className="bg-primary/20 text-primary text-xs">
                        Featured
                      </Badge>
                    )}
                    {product.free && (
                      <Badge className="bg-green-500/20 text-green-500 text-xs">
                        Free
                      </Badge>
                    )}
                  </div>
                </div>
                
                <h4 className="font-semibold text-foreground mb-1">
                  {product.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-3 flex-grow">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-lg text-primary">
                    {product.free ? 'Free' : `$${product.price}`}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handlePurchase(product)}
                    className={product.free ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {product.free ? 'Download' : 'Buy Now'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline">
            View All Products
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalProducts;
