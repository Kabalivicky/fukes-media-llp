import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import SEOHelmet from '@/components/SEOHelmet';
import ErrorBoundary from '@/components/ErrorBoundary';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fuke's Media",
    "url": "https://fukes-media.com",
    "logo": "/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png",
    "description": "Professional VFX Studio delivering exceptional visual effects and creative solutions",
    "sameAs": [
      "https://twitter.com/fukesmedia",
      "https://www.linkedin.com/company/fukes-media",
      "https://www.instagram.com/fukesmedia"
    ]
  };

  return (
    <>
      <SEOHelmet 
        title="Fuke's Media LLP - Professional VFX Studio"
        description="Professional VFX studio delivering cutting-edge visual effects, CGI, color grading, and creative services for film and television."
        keywords="VFX studio, visual effects, CGI, color grading, post-production, film VFX, Fuke's Media"
        canonical="https://fukes-media.com"
        structuredData={structuredData}
      />

      <motion.div 
        className="min-h-screen w-full bg-background text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Billboard */}
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>

        {/* Portfolio Rows */}
        <ErrorBoundary>
          <PortfolioSection />
        </ErrorBoundary>

        {/* Services Section */}
        <ErrorBoundary>
          <ServicesSection />
        </ErrorBoundary>

        {/* Team Section */}
        <div id="team">
          <ErrorBoundary>
            <TeamSection />
          </ErrorBoundary>
        </div>

        {/* Contact Section */}
        <div id="contact">
          <ErrorBoundary>
            <ContactSection />
          </ErrorBoundary>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
