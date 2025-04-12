
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import BackgroundEffect from '@/components/BackgroundEffect';
import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PricingCalculator from '@/components/PricingCalculator';
import PortfolioSection from '@/components/PortfolioSection';
import TeamSection from '@/components/TeamSection';
import CareersSection from '@/components/CareersSection';
import InvestorsSection from '@/components/InvestorsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Fuke's Media - AI-Driven VFX & Creative Studio</title>
        <meta name="description" content="Fuke's Media combines AI technology with expert creative direction to deliver exceptional visual effects and creative solutions for film, television, and digital media." />
        <meta name="keywords" content="VFX, visual effects, creative studio, AI, digital media, film production" />
        <meta property="og:title" content="Fuke's Media - AI-Driven VFX & Creative Studio" />
        <meta property="og:description" content="Pioneering digital media powerhouse combining AI technology with expert creative direction." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fukes-media.com" />
        <meta property="og:image" content="/lovable-uploads/a0ad627e-2387-4f68-9856-c313d6d46f87.png" />
        <link rel="canonical" href="https://fukes-media.com" />
      </Helmet>

      <div className="min-h-screen text-foreground">
        {/* Enhanced Background Effects */}
        <BackgroundEffect />
        <div className="fixed inset-0 -z-10 opacity-30" aria-hidden="true">
          <ParticleBackground />
        </div>
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main id="main-content" className="relative z-10">
          <HeroSection />
          <ServicesSection />
          <PricingCalculator />
          <PortfolioSection />
          <TeamSection />
          <CareersSection />
          <InvestorsSection />
          <ContactSection />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
