
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DynamicPrice from '@/components/DynamicPrice';

const VFXResearch = () => {
  const [activeRegion, setActiveRegion] = useState<string>("global");
  const [activeTab, setActiveTab] = useState<string>("overview");
  
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
            title="VFX World Atlas"
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
                <div className="mt-6">
                  <p className="text-lg font-medium">
                    Premium access starting at <DynamicPrice priceUSD={299} showCode={true} className="font-bold" />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 w-full mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="data">Data Insights</TabsTrigger>
              <TabsTrigger value="regions">Regional Analysis</TabsTrigger>
              <TabsTrigger value="trends">Industry Trends</TabsTrigger>
              <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-16">
              <VFXResearchIntro />
              <VFXGlobalMap activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
              
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="gradient-button text-lg"
                  onClick={() => setActiveTab("data")}
                >
                  Explore Data Insights
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="data" className="space-y-16">
              <VFXDataHighlights />
              
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("overview")}
                >
                  Back to Overview
                </Button>
                <Button 
                  className="gradient-button"
                  onClick={() => setActiveTab("regions")}
                >
                  Regional Analysis
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="regions" className="space-y-16">
              <VFXRegionalSpotlight region={activeRegion} />
              
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("data")}
                >
                  Back to Data
                </Button>
                <Button 
                  className="gradient-button"
                  onClick={() => setActiveTab("trends")}
                >
                  Industry Trends
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-16">
              <VFXIndustryTrends />
              
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("regions")}
                >
                  Back to Regions
                </Button>
                <Button 
                  className="gradient-button"
                  onClick={() => setActiveTab("sponsors")}
                >
                  Our Sponsors
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="sponsors" className="space-y-16">
              <VFXSponsorsSection />
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("overview")}
                >
                  Back to Start
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-800/40 to-red-900/40 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Get Full Access</h3>
                  <p className="text-muted-foreground">
                    Unlock comprehensive VFX industry data and insights
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xl mb-4">
                    Starting at <DynamicPrice priceUSD={299} showCode={true} className="font-bold" />
                  </p>
                  <Button className="gradient-button" size="lg">
                    Purchase Atlas
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VFXResearch;
