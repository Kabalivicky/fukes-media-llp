
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VFXIndustryInsights from '@/components/VFXIndustryInsights';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const VFXIndustryInsightsPage = () => {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      
      <main className="pt-20">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">VFX Industry Atlas</h1>
            <p className="text-xl text-muted-foreground mb-6">
              A comprehensive study of the global VFX industry, based on data from 55,000+ professionals across 560 studios worldwide.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Button className="gradient-button">
                <Download className="mr-2 h-4 w-4" />
                Download Full Report
              </Button>
              <Button variant="outline">Request Custom Analysis</Button>
            </div>
          </div>
        </section>
        
        <VFXIndustryInsights />
        
        <section className="container mx-auto px-4 py-12">
          <div className="glass p-6 rounded-xl border border-white/10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Contribute to Future Research</h2>
            <p className="text-center text-white/80 mb-6">
              Help improve future editions of the VFX Industry Atlas by sending corrections, suggestions, or additional data.
            </p>
            
            <div className="flex justify-center">
              <Button variant="outline">Contact the Research Team</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VFXIndustryInsightsPage;
