import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SEOHelmet from '@/components/SEOHelmet';
import SectionWrapper from '@/components/SectionWrapper';
import { AnimatedLetters, GradientText } from '@/components/KineticText';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Download, ExternalLink, Star, Filter,
  Layers, Video, Image, Music, Cpu, Box, BookOpen, 
  Palette, Sparkles, ArrowRight, Heart, Eye
} from 'lucide-react';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElements from '@/components/FloatingElements';
import AnimatedSectionDivider from '@/components/AnimatedSectionDivider';

const resourceCategories = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'software', label: 'Software', icon: Cpu },
  { id: 'plugin', label: 'Plugins', icon: Box },
  { id: 'asset', label: 'Assets', icon: Palette },
  { id: 'tutorial', label: 'Tutorials', icon: BookOpen },
  { id: 'template', label: 'Templates', icon: Sparkles },
  { id: 'stock-footage', label: 'Footage', icon: Video },
  { id: 'stock-image', label: 'Images', icon: Image },
  { id: 'stock-audio', label: 'Audio', icon: Music },
  { id: '3d-model', label: '3D Models', icon: Box },
];

// Sample resources for demonstration
const sampleResources = [
  {
    id: '1',
    name: 'Nuke',
    slug: 'nuke',
    short_description: 'Industry-standard compositing software for VFX',
    description: 'Node-based digital compositing and visual effects application used for film and television post-production.',
    resource_type: 'software',
    industries: ['vfx', 'film', 'tv'],
    website_url: 'https://www.foundry.com/products/nuke',
    image_url: null,
    pricing_type: 'subscription',
    price: 4599,
    price_currency: 'USD',
    tags: ['compositing', 'vfx', '3d', 'node-based'],
    features: ['Node-based workflow', '3D compositing', 'Deep compositing', 'Stereo tools'],
    is_featured: true,
    rating: 4.8,
    reviews_count: 1250,
  },
  {
    id: '2',
    name: 'Houdini',
    slug: 'houdini',
    short_description: '3D animation and VFX software with procedural workflow',
    description: 'Procedural 3D animation and visual effects software widely used in film, TV, and games.',
    resource_type: 'software',
    industries: ['vfx', 'film', 'gaming'],
    website_url: 'https://www.sidefx.com/',
    image_url: null,
    pricing_type: 'subscription',
    price: 4495,
    price_currency: 'USD',
    tags: ['procedural', '3d', 'simulation', 'vfx'],
    features: ['Procedural workflow', 'Particle systems', 'Fluid simulations', 'Python scripting'],
    is_featured: true,
    rating: 4.9,
    reviews_count: 890,
  },
  {
    id: '3',
    name: 'DaVinci Resolve',
    slug: 'davinci-resolve',
    short_description: 'Professional video editing and color grading suite',
    description: 'Complete post-production solution with editing, color correction, VFX, and audio in one application.',
    resource_type: 'software',
    industries: ['film', 'tv', 'youtube'],
    website_url: 'https://www.blackmagicdesign.com/products/davinciresolve',
    image_url: null,
    pricing_type: 'freemium',
    price: 295,
    price_currency: 'USD',
    tags: ['editing', 'color-grading', 'audio', 'free'],
    features: ['Professional editing', 'Advanced color grading', 'Fairlight audio', 'Fusion VFX'],
    is_featured: true,
    rating: 4.7,
    reviews_count: 3200,
  },
  {
    id: '4',
    name: 'Red Giant Complete',
    slug: 'red-giant-complete',
    short_description: 'Essential VFX and motion graphics plugins for After Effects',
    description: 'Suite of plugins for visual effects, motion graphics, and video editing.',
    resource_type: 'plugin',
    industries: ['vfx', 'advertising', 'youtube'],
    website_url: 'https://www.maxon.net/red-giant',
    image_url: null,
    pricing_type: 'subscription',
    price: 599,
    price_currency: 'USD',
    tags: ['after-effects', 'premiere', 'motion-graphics', 'plugins'],
    features: ['Trapcode Suite', 'Magic Bullet', 'Universe', 'VFX Suite'],
    is_featured: false,
    rating: 4.6,
    reviews_count: 750,
  },
  {
    id: '5',
    name: 'Action VFX',
    slug: 'action-vfx',
    short_description: 'Premium stock footage for visual effects compositing',
    description: 'High-quality practical effects footage including explosions, fire, smoke, and more.',
    resource_type: 'stock-footage',
    industries: ['vfx', 'film', 'tv', 'gaming'],
    website_url: 'https://www.actionvfx.com/',
    image_url: null,
    pricing_type: 'paid',
    price: 0,
    price_currency: 'USD',
    tags: ['stock-footage', 'explosions', 'fire', 'practical-effects'],
    features: ['4K+ resolution', 'Alpha channels', 'ProRes format', 'Commercial license'],
    is_featured: true,
    rating: 4.8,
    reviews_count: 520,
  },
  {
    id: '6',
    name: 'Blender',
    slug: 'blender',
    short_description: 'Free and open-source 3D creation suite',
    description: 'Complete 3D creation suite supporting modeling, rigging, animation, simulation, rendering, and more.',
    resource_type: 'software',
    industries: ['vfx', 'animation', 'gaming', 'youtube'],
    website_url: 'https://www.blender.org/',
    image_url: null,
    pricing_type: 'free',
    price: 0,
    price_currency: 'USD',
    tags: ['3d', 'free', 'open-source', 'animation'],
    features: ['3D modeling', 'Sculpting', 'Animation', 'Grease Pencil 2D', 'Cycles renderer'],
    is_featured: true,
    rating: 4.7,
    reviews_count: 5600,
  },
  {
    id: '7',
    name: 'Unreal Engine',
    slug: 'unreal-engine',
    short_description: 'Real-time 3D engine for games and virtual production',
    description: 'Powerful real-time 3D creation tool for games, film, and virtual production workflows.',
    resource_type: 'software',
    industries: ['gaming', 'virtual-production', 'film', 'ar-vr'],
    website_url: 'https://www.unrealengine.com/',
    image_url: null,
    pricing_type: 'free',
    price: 0,
    price_currency: 'USD',
    tags: ['real-time', 'game-engine', 'virtual-production', 'metahuman'],
    features: ['Nanite', 'Lumen', 'MetaHumans', 'Virtual production tools'],
    is_featured: true,
    rating: 4.9,
    reviews_count: 4800,
  },
  {
    id: '8',
    name: 'School of Motion',
    slug: 'school-of-motion',
    short_description: 'Online motion design courses and tutorials',
    description: 'Professional motion design education with structured courses taught by industry experts.',
    resource_type: 'tutorial',
    industries: ['animation', 'advertising', 'youtube'],
    website_url: 'https://www.schoolofmotion.com/',
    image_url: null,
    pricing_type: 'paid',
    price: 997,
    price_currency: 'USD',
    tags: ['education', 'after-effects', 'motion-design', 'courses'],
    features: ['Structured curriculum', 'Expert instructors', 'Community access', 'Certificates'],
    is_featured: false,
    rating: 4.9,
    reviews_count: 1100,
  },
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pricingFilter, setPricingFilter] = useState<string>('');

  // Query for real resources from database
  const { data: dbResources, isLoading } = useQuery({
    queryKey: ['resources', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('resources')
        .select('*')
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('rating', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Combine sample resources with database resources
  const allResources = [...sampleResources, ...(dbResources || [])];

  // Filter resources
  const filteredResources = allResources.filter((resource) => {
    const matchesSearch = !searchQuery || 
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
      resource.resource_type === selectedCategory;
    
    const matchesPricing = !pricingFilter || 
      resource.pricing_type === pricingFilter;

    return matchesSearch && matchesCategory && matchesPricing;
  });

  const featuredResources = filteredResources.filter(r => r.is_featured);

  const getPricingBadge = (pricingType: string, price?: number, currency = 'USD') => {
    const colors: Record<string, string> = {
      free: 'bg-green-500/10 text-green-500 border-green-500/20',
      freemium: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      paid: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      subscription: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    };

    const labels: Record<string, string> = {
      free: 'Free',
      freemium: 'Freemium',
      paid: price ? `$${price}` : 'Paid',
      subscription: price ? `$${price}/yr` : 'Subscription',
    };

    return (
      <Badge variant="outline" className={colors[pricingType] || ''}>
        {labels[pricingType] || pricingType}
      </Badge>
    );
  };

  const ResourceCard = ({ resource, featured = false }: { resource: typeof sampleResources[0], featured?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${featured ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-transparent' : 'border-border/50'}`}>
        {featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <Star className="w-3 h-3 mr-1" /> Featured
            </Badge>
          </div>
        )}
        
        <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-t-lg overflow-hidden relative">
          {resource.image_url ? (
            <img src={resource.image_url} alt={resource.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Box className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
              {resource.name}
            </CardTitle>
            {getPricingBadge(resource.pricing_type, resource.price, resource.price_currency)}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {resource.short_description}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{resource.rating}</span>
            </div>
            <span className="text-muted-foreground">
              ({resource.reviews_count} reviews)
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {resource.tags?.slice(0, 4).map((tag: string, idx: number) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {resource.industries?.slice(0, 3).map((industry: string, idx: number) => (
              <Badge key={idx} variant="outline" className="text-xs capitalize">
                {industry.replace('-', ' ')}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
            <Button size="sm" className="h-8" asChild>
              <a href={resource.website_url} target="_blank" rel="noopener noreferrer">
                Visit <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet
        title="Resources | Tools & Assets for Post-Production - Fuke's Media"
        description="Discover the best software, plugins, assets, and tutorials for VFX, animation, and post-production workflows."
        keywords="VFX software, animation tools, post-production plugins, stock footage, 3D assets, tutorials"
      />

      {/* Hero Section */}
      <ParallaxSection className="relative pt-32 pb-16" speed={0.5}>
        <FloatingElements variant="geometric" density="low" colorScheme="mixed" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Layers className="w-4 h-4 mr-2" />
              {allResources.length}+ Resources
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              <AnimatedLetters>Tools &</AnimatedLetters>
              <span className="block mt-2">
                <GradientText>Resources</GradientText>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need for professional post-production workflows. Software, plugins, assets, and more.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search tools, plugins, assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
              <Button className="h-12 px-8 gradient-button">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>

      <AnimatedSectionDivider variant="wave" />

      {/* Category Tabs */}
      <SectionWrapper>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <div className="overflow-x-auto pb-4">
            <TabsList className="inline-flex h-auto p-1 bg-muted/50 gap-1">
              {resourceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Pricing Filter */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm text-muted-foreground">Pricing:</span>
            <div className="flex gap-2">
              {['', 'free', 'freemium', 'paid', 'subscription'].map((type) => (
                <Button
                  key={type}
                  variant={pricingFilter === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPricingFilter(type)}
                >
                  {type || 'All'}
                </Button>
              ))}
            </div>
          </div>

          <TabsContent value={selectedCategory} className="mt-0">
            {/* Featured Resources */}
            {featuredResources.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                    <Star className="w-6 h-6 text-amber-500" />
                    Featured Resources
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredResources.slice(0, 4).map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All Resources */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">
                  All Resources
                </h2>
                <Badge variant="outline">{filteredResources.length} items</Badge>
              </div>
              
              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="aspect-video bg-muted rounded-t-lg" />
                      <CardHeader className="space-y-2">
                        <div className="h-5 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-full" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : filteredResources.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Layers className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={() => {
                    setSelectedCategory('all');
                    setPricingFilter('');
                    setSearchQuery('');
                  }}>
                    Clear All Filters
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </SectionWrapper>

      {/* Submit Resource CTA */}
      <AnimatedSectionDivider variant="hexagon" inverted />
      <SectionWrapper variant="gradient">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Know a Great <GradientText>Resource</GradientText>?
          </h2>
          <p className="text-muted-foreground mb-6">
            Help the community by submitting tools, plugins, or assets that you find useful.
          </p>
          <Button size="lg" className="gradient-button">
            Submit a Resource <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Resources;
