
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
import { Card, CardContent } from '@/components/ui/card';

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
            title="VFX World Atlas 2024"
            subtitle="Global Analysis of Visual Effects Industry"
            accent="red"
          />
          
          <Card className="overflow-hidden border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8">
                <h2 className="text-4xl font-bold mb-4">Visual Effects Industry Research</h2>
                <p className="text-lg opacity-90">
                  Comprehensive data on 55,000+ VFX professionals and 560 companies worldwide
                </p>
              </div>
            </CardContent>
          </Card>
          
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
