
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VFXIndustryInsights from '@/components/VFXIndustryInsights';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const VFXIndustryInsightsPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      
      <main className="pt-20">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text-blue">VFX Industry Atlas</h1>
            <p className="text-xl text-muted-foreground mb-6">
              A comprehensive study of the global VFX industry, based on data from 55,000+ professionals across 560 studios worldwide.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Button className="gradient-button" onClick={handleDownload} disabled={isDownloading}>
                <Download className="mr-2 h-4 w-4" />
                {isDownloading ? 'Processing...' : 'Download Full Report'}
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Request Custom Analysis</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <VFXIndustryInsights />
        
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl border border-white/10 hover-scale">
              <h2 className="text-2xl font-bold mb-4">Explore Research</h2>
              <p className="text-white/80 mb-6">
                Discover more detailed analysis and regional breakdowns in our VFX Research section.
              </p>
              
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/vfx-research" className="flex items-center justify-center">
                  View VFX Research <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="glass p-6 rounded-xl border border-white/10 hover-scale">
              <h2 className="text-2xl font-bold mb-4">Contribute to Future Research</h2>
              <p className="text-white/80 mb-6">
                Help improve future editions of the VFX Industry Atlas by sending corrections, suggestions, or additional data.
              </p>
              
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/contact" className="flex items-center justify-center">
                  Contact the Research Team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VFXIndustryInsightsPage;
