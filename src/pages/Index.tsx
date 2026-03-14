import { useRef, lazy, Suspense, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Shield, Clock, Crosshair, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import SEOHelmet from '@/components/SEOHelmet';
import SectionHeading from '@/components/SectionHeading';
import SectionWrapper from '@/components/SectionWrapper';
import ErrorBoundary from '@/components/ErrorBoundary';
import useScrollSync from '@/hooks/useScrollSync';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PricingCalculator = lazy(() => import('@/components/PricingCalculator'));
const PortfolioSection = lazy(() => import('@/components/PortfolioSection'));
const CareersSection = lazy(() => import('@/components/CareersSection'));

const SectionLoader = ({ text = "Loading..." }: { text?: string }) => (
  <div className="h-96 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
      <span className="text-muted-foreground text-sm">{text}</span>
    </div>
  </div>
);

const processSteps = [
  { step: '01', icon: FileText, title: 'Brief & Scope', description: 'We map every deliverable — VFX, edit, design, color, sound — upfront.' },
  { step: '02', icon: Crosshair, title: 'Creative & Production', description: 'CGI, compositing, branding, motion graphics — all under one roof.' },
  { step: '03', icon: Clock, title: 'Post & Polish', description: 'Editing, color grading, sound design, DI — seamless finish.' },
  { step: '04', icon: Shield, title: 'Deliver & Deploy', description: 'Final masters, social cuts, reels, and platform-ready assets.' },
];

const painPoints = [
  'VFX, editing, and design scattered across vendors',
  'No single studio that handles everything end-to-end',
  'Inconsistent quality when outsourcing to multiple teams',
  'Social media content treated as an afterthought',
];

// 3D Tilt card for process steps
const Process3DCard = ({ step, index }: { step: typeof processSteps[0]; index: number }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rotateX: (0.5 - y) * 25, rotateY: (x - 0.5) * 25 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 80 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '600px' }}
    >
      <motion.div
        animate={tilt}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Card className="h-full border-border/30 bg-card/50 backdrop-blur-sm rounded-2xl transition-shadow duration-500 hover:shadow-2xl hover:shadow-secondary/10 group">
          <CardContent className="p-6" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div 
              className="font-display text-4xl font-bold gradient-text mb-3"
              style={{ transform: 'translateZ(40px)' }}
            >
              {step.step}
            </motion.div>
            <div style={{ transform: 'translateZ(25px)' }}>
              <Icon className="w-5 h-5 text-primary mb-2" />
              <h3 className="text-lg font-display font-bold mb-2 group-hover:text-secondary transition-colors">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  useScrollSync({ offset: 80 });

  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    services: null, portfolio: null, careers: null, contact: null
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fuke's Media LLP",
    "url": "https://fukesmedia.com",
    "logo": "/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png",
    "description": "Full-service post-production, VFX, CGI, editing, design, branding, and social media content studio. Everything visual, one studio.",
    "address": { "@type": "PostalAddress", "addressLocality": "Bengaluru", "addressRegion": "Karnataka", "postalCode": "560070", "addressCountry": "IN" },
    "telephone": "+916362281003",
    "email": "info@fukesmedia.com",
  };

  return (
    <>
      <SEOHelmet 
        title="Fuke's Media LLP — VFX. Post. Design. Everything Visual. One Studio." 
        description="Full-service post-production & creative studio — CGI, compositing, editing, color grading, motion graphics, branding, sound design, and social media content." 
        keywords="VFX studio India, post production, CGI, video editing, color grading, motion graphics, branding, social media content, sound design, Bengaluru" 
        canonical="https://fukesmedia.com" 
        structuredData={structuredData} 
      />

      <div className="relative min-h-screen w-full text-foreground overflow-x-hidden">
        <main id="main-content" className="relative z-10">
          
          <ErrorBoundary>
            <HeroSection />
          </ErrorBoundary>

          {/* Pain Point Statement with 3D entrance */}
          <ErrorBoundary>
            <SectionWrapper variant="dark">
              <div className="max-w-4xl mx-auto text-center" style={{ perspective: '1000px' }}>
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
                  initial={{ opacity: 0, rotateX: -30 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <AlertTriangle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Industry Reality Check</span>
                </motion.div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {painPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      className="p-5 rounded-2xl bg-card/30 border border-border/30 text-left backdrop-blur-sm hover:bg-card/50 transition-colors cursor-default group"
                      initial={{ opacity: 0, y: 40, rotateX: 10 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 80 }}
                      whileHover={{ y: -5, scale: 1.02, boxShadow: '0 20px 40px -15px hsl(var(--primary) / 0.15)' }}
                    >
                      <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">{point}</p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.p
                  className="text-lg text-muted-foreground mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  We exist because these problems shouldn't.
                </motion.p>
              </div>
            </SectionWrapper>
          </ErrorBoundary>

          {/* Process Section — 3D Cards */}
          <ErrorBoundary>
            <SectionWrapper variant="gradient" withDivider>
              <SectionHeading 
                title="Our Discipline" 
                subtitle="Four steps. No chaos. No surprises." 
                badge="Process"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {processSteps.map((step, index) => (
                  <Process3DCard key={step.step} step={step} index={index} />
                ))}
              </div>
            </SectionWrapper>
          </ErrorBoundary>
          
          <div id="services" ref={el => sectionsRef.current.services = el}>
            <ErrorBoundary>
              <ServicesSection />
            </ErrorBoundary>
          </div>

          {/* Pricing Philosophy with 3D depth */}
          <ErrorBoundary>
            <SectionWrapper variant="dark" withDivider>
              <div className="max-w-3xl mx-auto text-center" style={{ perspective: '1000px' }}>
                <SectionHeading 
                  title="Pricing Philosophy" 
                  subtitle="We do not quote randomly." 
                  badge="Transparency"
                />
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    'Per-frame costing available',
                    'Shot complexity matrix',
                    'Transparent revision limits',
                    'No hidden billing',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm group cursor-default"
                      initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, rotateY: i % 2 === 0 ? 10 : -10 }}
                      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 80 }}
                      whileHover={{ 
                        y: -4, scale: 1.02,
                        boxShadow: '0 20px 40px -15px hsl(var(--accent) / 0.15)'
                      }}
                    >
                      <Shield className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm font-medium group-hover:text-foreground transition-colors">{item}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm italic mb-6">
                  "If a producer wants cheap and chaotic, we're not the right studio."
                </p>
                <Link to="/pricing">
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
                    <Button size="lg" className="gradient-button rounded-full px-10 text-base">
                      Get Shot-Level Estimate
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </SectionWrapper>
          </ErrorBoundary>
          
          <div id="portfolio" ref={el => sectionsRef.current.portfolio = el}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader text="Loading portfolio..." />}>
                <PortfolioSection />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* CTA with 3D depth */}
          <ErrorBoundary>
            <section className="section-padding relative overflow-hidden" style={{ perspective: '1000px' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent pointer-events-none" />
              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 40, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 60 }}
                >
                  <SectionHeading 
                    title="Ready for Predictable VFX?" 
                    subtitle="Get a shot-level breakdown with transparent costing. No vague assumptions."
                  />
                </motion.div>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Link to="/contact">
                    <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
                      <Button size="lg" className="gradient-button rounded-full px-10 text-base">
                        Request Project Breakdown
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/pricing">
                    <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
                      <Button size="lg" variant="outline" className="rounded-full px-10 text-base">
                        Shot-Level Calculator
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </section>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <ScrollReveal animation="fadeUp" duration={0.7}>
              <Suspense fallback={<SectionLoader text="Loading calculator..." />}>
                <PricingCalculator />
              </Suspense>
            </ScrollReveal>
          </ErrorBoundary>
          
          <div id="careers" ref={el => sectionsRef.current.careers = el}>
            <ErrorBoundary>
              <ScrollReveal animation="fadeUp" duration={0.8}>
                <Suspense fallback={<SectionLoader text="Loading careers..." />}>
                  <CareersSection />
                </Suspense>
              </ScrollReveal>
            </ErrorBoundary>
          </div>
          
          <div id="contact" ref={el => sectionsRef.current.contact = el}>
            <ErrorBoundary>
              <ScrollReveal animation="fadeUp" duration={0.7}>
                <ContactSection />
              </ScrollReveal>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
