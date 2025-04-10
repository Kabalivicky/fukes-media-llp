
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VFXResearchIntro from '@/components/VFXResearch/VFXResearchIntro';
import VFXGlobalMap from '@/components/VFXResearch/VFXGlobalMap';
import VFXRegionalSpotlight from '@/components/VFXResearch/VFXRegionalSpotlight';
import VFXDataHighlights from '@/components/VFXResearch/VFXDataHighlights';
import VFXIndustryTrends from '@/components/VFXResearch/VFXIndustryTrends';
import IndustryPartnersSection from '@/components/IndustryPartnersSection';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import VFXSponsorsSection from '@/components/VFXResearch/VFXSponsorsSection';

const VFXResearch = () => {
  const [activeRegion, setActiveRegion] = useState('global');
  
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 neon-text-orange">Visual Effects World Atlas</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A comprehensive study of the global VFX industry landscape, workforce distribution, and emerging trends.
            </p>
          </div>
          
          <section className="mb-20">
            <VFXResearchIntro />
          </section>
          
          <section className="mb-20">
            <VFXGlobalMap activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
          </section>
          
          <section className="mb-20">
            <VFXRegionalSpotlight region={activeRegion} />
          </section>
          
          <section className="mb-20">
            <VFXDataHighlights />
          </section>
          
          <section className="mb-20">
            <VFXIndustryTrends />
          </section>
          
          <div className="flex justify-center mb-10">
            <Button 
              className="group gradient-button flex items-center gap-2 text-lg py-6 px-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Return to Top
              <ChevronDown className="h-5 w-5 transform rotate-180 group-hover:translate-y-[-2px] transition-transform" />
            </Button>
          </div>
          
          <section>
            <IndustryPartnersSection />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VFXResearch;
