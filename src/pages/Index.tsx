
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import BackgroundEffect from '@/components/BackgroundEffect';
import ParticleBackground from '@/components/ParticleBackground';
import ParallaxBackground from '@/components/ParallaxBackground';
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
  // Create refs for the sections to scroll to
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    services: null,
    portfolio: null,
    team: null,
    careers: null,
    investors: null,
    contact: null
  });

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (!href?.startsWith('#')) return;
      
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
        // Update URL without reload
        window.history.pushState(null, '', `/#${targetId}`);
      }
    };

    // Add event listeners
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Clean up
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  // On initial load, check if there's a hash in the URL and scroll to that section
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500); // Small delay to ensure DOM is fully loaded
      }
    } else {
      // Scroll to top when component mounts with no hash
      window.scrollTo(0, 0);
    }
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

      <div className="min-h-screen text-foreground overflow-x-hidden">
        {/* Enhanced Background Effects */}
        <BackgroundEffect />
        <div className="fixed inset-0 -z-10 opacity-30" aria-hidden="true">
          <ParticleBackground />
        </div>
        <ParallaxBackground />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main id="main-content" className="relative z-10">
          <HeroSection />
          <div id="services" ref={(el) => sectionsRef.current.services = el}>
            <ServicesSection />
          </div>
          <PricingCalculator />
          <div id="portfolio" ref={(el) => sectionsRef.current.portfolio = el}>
            <PortfolioSection />
          </div>
          <div id="team" ref={(el) => sectionsRef.current.team = el}>
            <TeamSection />
          </div>
          <div id="careers" ref={(el) => sectionsRef.current.careers = el}>
            <CareersSection />
          </div>
          <div id="investors" ref={(el) => sectionsRef.current.investors = el}>
            <InvestorsSection />
          </div>
          <div id="contact" ref={(el) => sectionsRef.current.contact = el}>
            <ContactSection />
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
