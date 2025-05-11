
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VFXIndustryInsights from '@/components/VFXIndustryInsights';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, FileText, PieChart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedIcon from '@/components/AnimatedIcon';

const VFXIndustryInsightsPage = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      
      <main className="pt-20">
        <motion.section 
          className="container mx-auto px-4 py-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={itemVariants}
          >
            <div className="mb-4 flex justify-center">
              <AnimatedIcon 
                icon={<PieChart />} 
                size="lg" 
                withRotate={true} 
                color="text-primary"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text-blue">VFX Industry Atlas</h1>
            <p className="text-xl text-muted-foreground mb-6">
              A comprehensive study of the global VFX industry, based on data from 55,000+ professionals across 560 studios worldwide.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Button 
                className="gradient-button flex items-center gap-2" 
                onClick={handleDownload} 
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </motion.div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Report
                  </>
                )}
              </Button>
              <Button variant="outline" asChild className="flex items-center gap-2">
                <Link to="/contact">
                  <FileText className="mr-2 h-4 w-4" />
                  Request Custom Analysis
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.section>
        
        <VFXIndustryInsights />
        
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="glass p-6 rounded-xl border border-white/10 hover-scale"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex items-start mb-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-3 rounded-lg mr-4">
                  <Globe className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold">Explore Research</h2>
              </div>
              <p className="text-white/80 mb-6">
                Discover more detailed analysis and regional breakdowns in our VFX Research section.
              </p>
              
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/vfx-research" className="flex items-center justify-center">
                  View VFX Research <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="glass p-6 rounded-xl border border-white/10 hover-scale"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex items-start mb-4">
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-3 rounded-lg mr-4">
                  <FileText className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold">Contribute to Future Research</h2>
              </div>
              <p className="text-white/80 mb-6">
                Help improve future editions of the VFX Industry Atlas by sending corrections, suggestions, or additional data.
              </p>
              
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link to="/contact" className="flex items-center justify-center">
                  Contact the Research Team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VFXIndustryInsightsPage;
