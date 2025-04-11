
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

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-foreground">
      {/* Background Effects */}
      <BackgroundEffect />
      <div className="fixed inset-0 -z-10 opacity-40">
        <ParticleBackground />
      </div>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10">
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
  );
};

export default Home;
