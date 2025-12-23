import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PricingCalculator from '@/components/PricingCalculator';
import PortfolioSection from '@/components/PortfolioSection';
import TeamSection from '@/components/TeamSection';
import CareersSection from '@/components/CareersSection';
import ContactSection from '@/components/ContactSection';
import SEOHelmet from '@/components/SEOHelmet';
import SectionTitle from '@/components/SectionTitle';
import AnimatedLogo from '@/components/AnimatedLogo';
import ErrorBoundary from '@/components/ErrorBoundary';
import EnhancedModularInfo from '@/components/EnhancedModularInfo';
import useScrollSync from '@/hooks/useScrollSync';
import ScrollReveal from '@/components/ScrollReveal';

// Animation variants for scroll-triggered animations
const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};
const Home = () => {
  // State for scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use our custom hook for scroll sync
  useScrollSync({
    offset: 80
  });

  // Create refs for the sections to scroll to
  const sectionsRef = useRef<{
    [key: string]: HTMLDivElement | null;
  }>({
    services: null,
    portfolio: null,
    team: null,
    careers: null,
    contact: null
  });

  // Parallax scroll effects
  const {
    scrollY
  } = useScroll();
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
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
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
    "sameAs": ["https://twitter.com/fukesmedia", "https://www.linkedin.com/company/fukes-media", "https://www.instagram.com/fukesmedia"]
  };
  return <>
      <SEOHelmet title="Fuke's Media LLP - Award-Winning AI-Driven VFX Studio" description="Award-caliber VFX studio combining cutting-edge AI technology with creative excellence. We deliver cinematic visual effects, AI-assisted production, and innovative storytelling solutions." keywords="award-winning VFX, AI-driven visual effects, cinematic VFX, neural rendering, machine learning VFX, creative studio, film production, Fuke's Media, AI assistant" canonical="https://fukes-media.com" structuredData={structuredData} />

      <div className="relative min-h-screen w-full text-foreground overflow-x-hidden">
        
        {/* Main Content with Motion Effects */}
        <main id="main-content" className="relative z-10">
          {/* Animated logo that follows scroll */}
          <motion.div className="hidden md:block fixed top-20 right-[5%] z-10" style={{
          opacity,
          scale: useTransform(scrollY, [0, 300], [1, 0.8]),
          willChange: 'transform, opacity'
        }}>
            <AnimatedLogo size="md" />
          </motion.div>

          <ErrorBoundary>
            <HeroSection />
          </ErrorBoundary>
          
          <div id="services" ref={el => sectionsRef.current.services = el}>
            <ErrorBoundary>
              <ScrollReveal animation="fadeUp" duration={0.7}>
                <ServicesSection />
              </ScrollReveal>
            </ErrorBoundary>
          </div>
          
          <ErrorBoundary>
            <ScrollReveal animation="zoomIn" duration={0.8} delay={0.1}>
              <EnhancedModularInfo />
            </ScrollReveal>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <ScrollReveal animation="slideUp" duration={0.7}>
              <PricingCalculator />
            </ScrollReveal>
          </ErrorBoundary>
          
          <div id="portfolio" ref={el => sectionsRef.current.portfolio = el}>
            <ErrorBoundary>
              <ScrollReveal animation="fadeLeft" duration={0.8}>
                <PortfolioSection />
              </ScrollReveal>
            </ErrorBoundary>
          </div>
          
          {/* Featured Content & Awards Section */}
          <ErrorBoundary>
            <ScrollReveal animation="blur" duration={0.9}>
              <section className="py-20 px-4 bg-muted/20">
                <div className="container mx-auto">
                  <SectionTitle title="Award-Winning Excellence" subtitle="Recognition from industry leaders and creative festivals worldwide" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
                    
                    <motion.div className="text-center p-6 rounded-lg bg-card/50 border border-secondary/20 hover:border-secondary/40 transition-colors" whileHover={{
                    scale: 1.05
                  }} transition={{
                    type: "spring",
                    stiffness: 300
                  }}>
                      <div className="text-4xl font-display font-bold text-secondary mb-2">500+</div>
                      <p className="text-muted-foreground font-medium">Projects Completed</p>
                      <p className="text-xs text-muted-foreground mt-1">Global Reach</p>
                    </motion.div>
                    <motion.div className="text-center p-6 rounded-lg bg-card/50 border border-accent/20 hover:border-accent/40 transition-colors" whileHover={{
                    scale: 1.05
                  }} transition={{
                    type: "spring",
                    stiffness: 300
                  }}>
                      <div className="text-4xl font-display font-bold text-accent mb-2">98%</div>
                      <p className="text-muted-foreground font-medium">Client Satisfaction</p>
                      <p className="text-xs text-muted-foreground mt-1">Proven Excellence</p>
                    </motion.div>
                  </div>
                  
                  {/* Client Testimonials Carousel */}
                  <ScrollReveal animation="fadeRight" delay={0.2} duration={0.7}>
                    <div className="mt-16 max-w-4xl mx-auto">
                      <div className="text-center">
                        <h3 className="text-2xl font-display font-bold mb-8">What Industry Leaders Say</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 bg-card rounded-lg border border-border/50">
                            <p className="text-muted-foreground italic mb-4">
                              "Fuke's Media's AI-driven approach revolutionized our post-production workflow. Their innovation is unmatched."
                            </p>
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-primary/20 rounded-full mr-3" />
                              <div>
                                <p className="font-semibold">Sarah Chen</p>
                                <p className="text-sm text-muted-foreground">Director, Quantum Films</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </section>
            </ScrollReveal>
          </ErrorBoundary>
          
          <div id="team" ref={el => sectionsRef.current.team = el}>
            <ErrorBoundary>
              <ScrollReveal animation="fadeUp" duration={0.7}>
                <TeamSection />
              </ScrollReveal>
            </ErrorBoundary>
          </div>
          
          <div id="careers" ref={el => sectionsRef.current.careers = el}>
            <ErrorBoundary>
              <ScrollReveal animation="zoomIn" duration={0.8}>
                <CareersSection />
              </ScrollReveal>
            </ErrorBoundary>
          </div>
          
          
          <div id="contact" ref={el => sectionsRef.current.contact = el}>
            <ErrorBoundary>
              <ScrollReveal animation="slideUp" duration={0.7}>
                <ContactSection />
              </ScrollReveal>
            </ErrorBoundary>
          </div>
          
          {/* Enhanced progress indicator */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
            <div className="h-1 w-60 bg-muted rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-fukes-blue via-fukes-red to-fukes-green" style={{
              width: `${scrollProgress * 100}%`,
              willChange: 'width'
            }} initial={{
              width: '0%'
            }} animate={{
              width: `${scrollProgress * 100}%`
            }} transition={{
              type: 'spring',
              stiffness: 50
            }} />
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Top</span>
              <span>Bottom</span>
            </div>
          </div>
        </main>
      </div>
    </>;
};
export default Home;