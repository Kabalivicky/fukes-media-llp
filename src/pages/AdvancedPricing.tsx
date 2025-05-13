
import { useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import AdvancedPricingCalculator from '@/components/EnhancedPricingCalculator/AdvancedPricingCalculator';
import { motion } from 'framer-motion';
import SEOHelmet from '@/components/SEOHelmet';

const AdvancedPricing = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "VFX Services Pricing Calculator",
    "provider": {
      "@type": "Organization",
      "name": "Fuke's Media",
      "url": "https://fukes-media.com"
    },
    "description": "Advanced pricing calculator for VFX, creative, and production services with detailed cost breakdown.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "valueAddedTaxIncluded": false
      }
    }
  };

  return (
    <>
      <SEOHelmet
        title="Advanced Pricing Calculator - Fuke's Media"
        description="Calculate detailed cost estimates for your VFX, creative, and production projects with our advanced interactive pricing tool."
        keywords="VFX pricing, creative pricing, production cost, price calculator, visual effects cost"
        canonical="https://fukes-media.com/advanced-pricing"
        structuredData={structuredData}
      />

      <MainLayout pageKey="advanced-pricing">
        <section id="advanced-pricing-calculator" className="py-20 px-4 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            <SectionTitle 
              title="Advanced Pricing Calculator" 
              subtitle="Get comprehensive estimates for your project based on detailed specifications and advanced options"
            />
            
            <div className="mt-12">
              <AdvancedPricingCalculator />
            </div>
            
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-card/30 p-6 rounded-lg border border-border/40">
                  <h3 className="text-xl font-semibold mb-3">Transparent Pricing</h3>
                  <p className="text-muted-foreground">
                    Our calculator provides clear, detailed breakdowns of all cost factors, so you understand exactly what you're paying for.
                  </p>
                </div>
                
                <div className="bg-card/30 p-6 rounded-lg border border-border/40">
                  <h3 className="text-xl font-semibold mb-3">Production Tiers</h3>
                  <p className="text-muted-foreground">
                    Choose from multiple production tiers based on your budget, timeline, and quality requirements.
                  </p>
                </div>
                
                <div className="bg-card/30 p-6 rounded-lg border border-border/40">
                  <h3 className="text-xl font-semibold mb-3">Customizable Options</h3>
                  <p className="text-muted-foreground">
                    Fine-tune your estimate with advanced specifications including resolution, effect complexity, and delivery timeline.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </MainLayout>
    </>
  );
};

export default AdvancedPricing;
