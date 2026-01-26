import { motion } from 'framer-motion';
import SEOHelmet from '@/components/SEOHelmet';
import SectionWrapper from '@/components/SectionWrapper';
import { AnimatedLetters, GradientText } from '@/components/KineticText';
import { Badge } from '@/components/ui/badge';
import { Search, Users } from 'lucide-react';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElements from '@/components/FloatingElements';
import AnimatedSectionDivider from '@/components/AnimatedSectionDivider';
import ArtistSearchComponent from '@/components/Search/ArtistSearch';

const ArtistSearchPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet
        title="Find Artists | Hire Top Creative Talent - Fuke's Media"
        description="Search and connect with talented VFX artists, animators, compositors, and post-production professionals worldwide."
        keywords="hire VFX artists, find animators, creative talent, freelance artists, post-production professionals"
      />

      {/* Hero Section */}
      <ParallaxSection className="relative pt-32 pb-12" speed={0.5}>
        <FloatingElements variant="orbs" density="low" colorScheme="primary" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Search className="w-4 h-4 mr-2" />
              Find Your Perfect Match
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              <AnimatedLetters>Discover</AnimatedLetters>
              <span className="block mt-2">
                <GradientText>Top Artists</GradientText>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Search through our global network of creative professionals. Filter by skills, experience, and availability.
            </p>
          </motion.div>
        </div>
      </ParallaxSection>

      <AnimatedSectionDivider variant="wave" />

      {/* Search Section */}
      <SectionWrapper>
        <ArtistSearchComponent />
      </SectionWrapper>
    </div>
  );
};

export default ArtistSearchPage;
