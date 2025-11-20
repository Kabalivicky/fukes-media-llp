
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TeamSection from '@/components/TeamSection';
import IndustryResourcesSection from '@/components/IndustryResourcesSection';
import ContactSection from '@/components/ContactSection';
import SEOHelmet from '@/components/SEOHelmet';
import SectionTitle from '@/components/SectionTitle';
import AnimatedLogo from '@/components/AnimatedLogo';
import ErrorBoundary from '@/components/ErrorBoundary';
import EnhancedModularInfo from '@/components/EnhancedModularInfo';
import VideoBackground from '@/components/VideoBackground';
import useScrollSync from '@/hooks/useScrollSync';

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
  
  // Use our custom hook for scroll sync
  useScrollSync({ offset: 80 });
  
  // Create refs for the sections to scroll to
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    services: null,
    portfolio: null,
    team: null,
    careers: null,
    contact: null
  });

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);

  // Handle scroll events to update animation values with performance optimization
  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      window.requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fuke's Media",
    "url": "https://fukes-media.com",
    "logo": "/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png",
    "description": "AI-Driven VFX & Creative Studio delivering exceptional visual effects and creative solutions",
    "sameAs": [
      "https://twitter.com/fukesmedia",
      "https://www.linkedin.com/company/fukes-media",
      "https://www.instagram.com/fukesmedia"
    ]
  };

  return (
    <>
      <SEOHelmet 
        title="Fuke's Media LLP - AI-Driven VFX Studio"
        description="Professional VFX studio combining cutting-edge AI technology with creative excellence. We deliver cinematic visual effects, AI-assisted production, and innovative storytelling solutions."
        keywords="AI-driven visual effects, cinematic VFX, neural rendering, machine learning VFX, creative studio, film production, Fuke's Media, AI assistant"
        canonical="https://fukes-media.com"
        structuredData={structuredData}
      />

      <div className="relative min-h-screen w-full text-foreground overflow-x-hidden">
        {/* Video Background - Showreel playing behind content */}
        <VideoBackground opacity={0.15} showOverlay={true} />
        
        {/* Floating elements in background with will-change for better performance */}
        <div className="fixed inset-0 -z-10 w-full" aria-hidden="true">
          <motion.div 
            className="absolute top-1/4 right-[10%] w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-fukes-blue/10 blur-[80px] sm:blur-[100px]"
            style={{ y: y1, willChange: 'transform' }}
          />
          <motion.div 
            className="absolute top-[60%] left-[5%] w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-fukes-red/10 blur-[100px] sm:blur-[120px]"
            style={{ y: y2, willChange: 'transform' }}
          />
          <motion.div 
            className="absolute top-[30%] left-[20%] w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-fukes-green/10 blur-[60px] sm:blur-[80px]"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -20, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ willChange: 'transform' }}
          />
        </div>
        
        {/* Main Content with Motion Effects */}
        <main id="main-content" className="relative z-10">
          {/* Animated logo that follows scroll */}
          <motion.div 
            className="hidden md:block fixed top-20 right-[5%] z-10"
            style={{ 
              opacity, 
              scale: useTransform(scrollY, [0, 300], [1, 0.8]),
              willChange: 'transform, opacity' 
            }}
          >
            <AnimatedLogo size="md" />
          </motion.div>

          <ErrorBoundary>
            <HeroSection />
          </ErrorBoundary>
          
          <div id="services" ref={(el) => sectionsRef.current.services = el}>
            <ErrorBoundary>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
              >
                <ServicesSection />
              </motion.div>
            </ErrorBoundary>
          </div>
          
          <ErrorBoundary>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <EnhancedModularInfo />
            </motion.div>
          </ErrorBoundary>
          
          
          <div id="portfolio" ref={(el) => sectionsRef.current.portfolio = el}>
            <ErrorBoundary>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
              >
                <PortfolioSection />
              </motion.div>
            </ErrorBoundary>
          </div>
          
          
          <div id="team" ref={(el) => sectionsRef.current.team = el}>
            <ErrorBoundary>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
              >
                <TeamSection />
              </motion.div>
            </ErrorBoundary>
          </div>
          
          
          <ErrorBoundary>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <IndustryResourcesSection />
            </motion.div>
          </ErrorBoundary>
          
          <div id="contact" ref={(el) => sectionsRef.current.contact = el}>
            <ErrorBoundary>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
              >
                <ContactSection />
              </motion.div>
            </ErrorBoundary>
          </div>
          
          {/* Enhanced progress indicator */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
            <div className="h-1 w-60 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-fukes-blue via-fukes-red to-fukes-green"
                style={{ width: `${scrollProgress * 100}%`, willChange: 'width' }}
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
      </div>
    </>
  );
};

export default Home;
