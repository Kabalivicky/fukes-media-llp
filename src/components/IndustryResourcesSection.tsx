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
const resources: Resource[] = [{
  id: '1',
  title: 'Film & TV Drama Career Map',
  description: 'Comprehensive career pathway guide for film and television industry professionals',
  category: 'Career Development',
  image: filmTvCareerMap,
  type: 'career-map'
}, {
  id: '2',
  title: 'Animation Industry Career Map',
  description: 'Complete career progression guide for animation industry roles and opportunities',
  category: 'Career Development',
  image: animationCareerMap,
  type: 'career-map'
}, {
  id: '3',
  title: 'VFX Careers & Opportunities',
  description: 'Visual effects career paths, skills requirements, and industry insights',
  category: 'Career Development',
  image: vfxCareers,
  type: 'infographic'
}, {
  id: '4',
  title: 'Professional Rate Card',
  description: 'Detailed pricing structure for VFX services across all departments and complexity levels',
  category: 'Pricing & Services',
  image: priceRateCard,
  type: 'pricing'
}, {
  id: '5',
  title: 'African VFX Market Analysis',
  description: 'Comprehensive overview of the visual effects industry landscape across Africa',
  category: 'Market Research',
  image: africanVfxMarket,
  type: 'research'
}, {
  id: '6',
  title: 'France VFX Industry Spotlight',
  description: 'In-depth analysis of the French visual effects market and opportunities',
  category: 'Market Research',
  image: franceVfxSpotlight,
  type: 'research'
}, {
  id: '7',
  title: 'Egypt VFX Market Overview',
  description: 'Detailed examination of Egyptian VFX industry trends and ecosystem',
  category: 'Market Research',
  image: egyptVfxSpotlight,
  type: 'research'
}, {
  id: '8',
  title: 'Film & TV Production Guide',
  description: 'Complete production pipeline and role definitions for film and television projects',
  category: 'Production',
  image: filmTvProduction,
  type: 'infographic'
}];
const IndustryResourcesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const categories = ['All', 'Career Development', 'Market Research', 'Pricing & Services', 'Production'];
  const filteredResources = selectedCategory === 'All' ? resources : resources.filter(resource => resource.category === selectedCategory);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
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
  return;
};
export default IndustryResourcesSection;