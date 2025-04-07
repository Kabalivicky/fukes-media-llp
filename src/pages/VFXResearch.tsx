
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import VFXGlobalMap from '@/components/VFXResearch/VFXGlobalMap';
import VFXDataHighlights from '@/components/VFXResearch/VFXDataHighlights';
import VFXRegionalSpotlight from '@/components/VFXResearch/VFXRegionalSpotlight';
import VFXIndustryTrends from '@/components/VFXResearch/VFXIndustryTrends';
import VFXSponsorsSection from '@/components/VFXResearch/VFXSponsorsSection';
import VFXResearchIntro from '@/components/VFXResearch/VFXResearchIntro';

const VFXResearch = () => {
  const [activeRegion, setActiveRegion] = useState<string>("global");
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 z-10 relative">
        <div className="space-y-24">
          <SectionTitle
            title="Visual Effects World Atlas"
            subtitle="Global VFX Industry Research & Data"
            accent="secondary"
          />
          
          <VFXResearchIntro />
          
          <VFXGlobalMap activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
          
          <VFXDataHighlights />
          
          <VFXRegionalSpotlight region={activeRegion} />
          
          <VFXIndustryTrends />
          
          <VFXSponsorsSection />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VFXResearch;
