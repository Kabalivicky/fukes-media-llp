
import { useState } from 'react';
import VFXResearchIntro from '@/components/VFXResearch/VFXResearchIntro';
import VFXGlobalMap from '@/components/VFXResearch/VFXGlobalMap';
import VFXRegionalSpotlight from '@/components/VFXResearch/VFXRegionalSpotlight';
import VFXDataHighlights from '@/components/VFXResearch/VFXDataHighlights';
import VFXIndustryTrends from '@/components/VFXResearch/VFXIndustryTrends';
import IndustryPartnersSection from '@/components/IndustryPartnersSection';
import { Button } from '@/components/ui/button';
import { ChevronDown, Globe, Database, TrendingUp, MapPin } from 'lucide-react';
import VFXSponsorsSection from '@/components/VFXResearch/VFXSponsorsSection';
import { motion } from 'framer-motion';
import AnimatedIcon from '@/components/AnimatedIcon';

const VFXResearch = () => {
  const [activeRegion, setActiveRegion] = useState('global');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen text-foreground">
      <main className="pb-20">
        <motion.div 
          className="container mx-auto px-4 py-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="mb-16 text-center" variants={itemVariants}>
            <div className="flex justify-center mb-4">
              <AnimatedIcon 
                icon={<Globe />} 
                size="lg" 
                withPulse={true}
                className="text-fukes-blue" 
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 neon-text-orange">Visual Effects World Atlas</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A comprehensive study of the global VFX industry landscape, workforce distribution, and emerging trends.
            </p>
          </motion.div>
          
          <motion.section className="mb-20" variants={itemVariants}>
            <div className="flex items-center justify-center mb-8">
              <Database className="mr-2 text-fukes-blue" />
              <h2 className="text-2xl font-bold">Research Overview</h2>
            </div>
            <VFXResearchIntro />
          </motion.section>
          
          <motion.section className="mb-20" variants={itemVariants}>
            <div className="flex items-center justify-center mb-8">
              <MapPin className="mr-2 text-fukes-green" />
              <h2 className="text-2xl font-bold">Global VFX Landscape</h2>
            </div>
            <VFXGlobalMap activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
          </motion.section>
          
          <motion.section className="mb-20" variants={itemVariants}>
            <div className="flex items-center justify-center mb-8">
              <Globe className="mr-2 text-fukes-red" />
              <h2 className="text-2xl font-bold">Regional Spotlight</h2>
            </div>
            <VFXRegionalSpotlight region={activeRegion} />
          </motion.section>
          
          <motion.section className="mb-20" variants={itemVariants}>
            <div className="flex items-center justify-center mb-8">
              <Database className="mr-2 text-fukes-blue" />
              <h2 className="text-2xl font-bold">Data Highlights</h2>
            </div>
            <VFXDataHighlights />
          </motion.section>
          
          <motion.section className="mb-20" variants={itemVariants}>
            <div className="flex items-center justify-center mb-8">
              <TrendingUp className="mr-2 text-fukes-green" />
              <h2 className="text-2xl font-bold">Industry Trends</h2>
            </div>
            <VFXIndustryTrends />
          </motion.section>
          
          <motion.div 
            className="flex justify-center mb-10"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 8 }}
          >
            <Button 
              className="group gradient-button flex items-center gap-2 text-lg py-6 px-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Return to Top
              <ChevronDown className="h-5 w-5 transform rotate-180 group-hover:translate-y-[-2px] transition-transform" />
            </Button>
          </motion.div>
          
          <motion.section variants={itemVariants}>
            <IndustryPartnersSection />
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
};

export default VFXResearch;
