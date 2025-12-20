import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Import infographic images
import brandLogo from '@/assets/infographics/brand-logo.png';
import filmTvCareerMap from '@/assets/infographics/film-tv-career-map.png';
import africanVfxMarket from '@/assets/infographics/african-vfx-market.png';
import filmTvProduction from '@/assets/infographics/film-tv-production.png';
import vfxCareers from '@/assets/infographics/vfx-careers.png';
import fukesMediaLogo from '@/assets/infographics/fukes-media-logo.png';
import priceRateCard from '@/assets/infographics/price-rate-card.png';
import franceVfxSpotlight from '@/assets/infographics/france-vfx-spotlight.png';
import egyptVfxSpotlight from '@/assets/infographics/egypt-vfx-spotlight.png';
import animationCareerMap from '@/assets/infographics/animation-career-map.png';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  type: 'infographic' | 'career-map' | 'pricing' | 'research';
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Film & TV Drama Career Map',
    description: 'Comprehensive career pathway guide for film and television industry professionals',
    category: 'Career Development',
    image: filmTvCareerMap,
    type: 'career-map'
  },
  {
    id: '2',
    title: 'Animation Industry Career Map',
    description: 'Complete career progression guide for animation industry roles and opportunities',
    category: 'Career Development', 
    image: animationCareerMap,
    type: 'career-map'
  },
  {
    id: '3',
    title: 'VFX Careers & Opportunities',
    description: 'Visual effects career paths, skills requirements, and industry insights',
    category: 'Career Development',
    image: vfxCareers,
    type: 'infographic'
  },
  {
    id: '4',
    title: 'Professional Rate Card',
    description: 'Detailed pricing structure for VFX services across all departments and complexity levels',
    category: 'Pricing & Services',
    image: priceRateCard,
    type: 'pricing'
  },
  {
    id: '5',
    title: 'African VFX Market Analysis',
    description: 'Comprehensive overview of the visual effects industry landscape across Africa',
    category: 'Market Research',
    image: africanVfxMarket,
    type: 'research'
  },
  {
    id: '6',
    title: 'France VFX Industry Spotlight',
    description: 'In-depth analysis of the French visual effects market and opportunities',
    category: 'Market Research',
    image: franceVfxSpotlight,
    type: 'research'
  },
  {
    id: '7',
    title: 'Egypt VFX Market Overview',
    description: 'Detailed examination of Egyptian VFX industry trends and ecosystem',
    category: 'Market Research',
    image: egyptVfxSpotlight,
    type: 'research'
  },
  {
    id: '8',
    title: 'Film & TV Production Guide',
    description: 'Complete production pipeline and role definitions for film and television projects',
    category: 'Production',
    image: filmTvProduction,
    type: 'infographic'
  }
];

const IndustryResourcesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const categories = ['All', 'Career Development', 'Market Research', 'Pricing & Services', 'Production'];
  
  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Career Development': 'bg-primary/10 text-primary border-primary/20',
      'Market Research': 'bg-secondary/10 text-secondary border-secondary/20',
      'Pricing & Services': 'bg-accent/10 text-accent-foreground border-accent/20',
      'Production': 'bg-muted text-muted-foreground border-muted-foreground/20'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground border-muted-foreground/20';
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background via-background/50 to-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Industry Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guides, market insights, and professional resources for the VFX and animation industry
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Resources Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredResources.map((resource) => (
              <motion.div key={resource.id} variants={itemVariants}>
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                            onClick={() => setSelectedResource(resource)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl w-full h-[90vh] p-0">
                          <DialogHeader className="p-6 pb-4">
                            <DialogTitle className="flex items-center justify-between">
                              {selectedResource?.title}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex-1 overflow-auto px-6 pb-6">
                            {selectedResource && (
                              <img 
                                src={selectedResource.image} 
                                alt={selectedResource.title}
                                className="w-full h-auto mx-auto"
                              />
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = resource.image;
                          link.download = `${resource.title}.png`;
                          link.click();
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Badge className={`${getCategoryColor(resource.category)} text-xs`}>
                        {resource.category}
                      </Badge>
                      <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center space-y-6 pt-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Looking for Custom Resources?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Need industry-specific guides, custom rate cards, or market research for your region? 
                Contact us for personalized consulting and resource development.
              </p>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              Request Custom Resources
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryResourcesSection;