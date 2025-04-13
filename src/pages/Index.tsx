
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
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
import AnimatedLogo from '@/components/AnimatedLogo';

// Animation variants for scroll-triggered animations
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const Home = () => {
  // State for scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Create refs for the sections to scroll to
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    services: null,
    portfolio: null,
    team: null,
    careers: null,
    investors: null,
    contact: null
  });

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);

  // Handle scroll events to update animation values
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress for animations (0 to 1)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

      <div className="relative min-h-screen text-foreground overflow-x-hidden">
        {/* Floating elements in background */}
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <motion.div 
            className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-fukes-blue/10 blur-[100px]"
            style={{ y: y1 }}
          />
          <motion.div 
            className="absolute top-[60%] left-[5%] w-72 h-72 rounded-full bg-fukes-red/10 blur-[120px]"
            style={{ y: y2 }}
          />
          <motion.div 
            className="absolute top-[30%] left-[20%] w-48 h-48 rounded-full bg-fukes-green/10 blur-[80px]"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -20, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content with Motion Effects */}
        <main id="main-content" className="relative z-10">
          {/* Animated logo that follows scroll */}
          <motion.div 
            className="hidden md:block fixed top-20 right-[5%] z-10"
            style={{ opacity, scale: useTransform(scrollY, [0, 300], [1, 0.8]) }}
          >
            <AnimatedLogo size="md" />
          </motion.div>

          <HeroSection />
          
          <div id="services" ref={(el) => sectionsRef.current.services = el}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <ServicesSection />
            </motion.div>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
          >
            <PricingCalculator />
          </motion.div>
          
          <div id="portfolio" ref={(el) => sectionsRef.current.portfolio = el}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <PortfolioSection />
            </motion.div>
          </div>
          
          <div id="team" ref={(el) => sectionsRef.current.team = el}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <TeamSection />
            </motion.div>
          </div>
          
          <div id="careers" ref={(el) => sectionsRef.current.careers = el}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <CareersSection />
            </motion.div>
          </div>
          
          <div id="investors" ref={(el) => sectionsRef.current.investors = el}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <InvestorsSection />
            </motion.div>
          </div>
          
          <div id="contact" ref={(el) => sectionsRef.current.contact = el}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <ContactSection />
            </motion.div>
          </div>
          
          {/* Enhanced progress indicator */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
            <div className="h-1 w-60 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-fukes-blue via-fukes-red to-fukes-green"
                style={{ width: `${scrollProgress * 100}%` }}
                initial={{ width: '0%' }}
                animate={{ width: `${scrollProgress * 100}%` }}
                transition={{ type: 'spring', stiffness: 50 }}
              />
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Top</span>
              <span>Bottom</span>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
