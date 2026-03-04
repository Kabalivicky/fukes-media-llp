import { useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import SEOHelmet from '@/components/SEOHelmet';
import SectionHeading from '@/components/SectionHeading';
import ErrorBoundary from '@/components/ErrorBoundary';
import useScrollSync from '@/hooks/useScrollSync';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';

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

const Home = () => {
  useScrollSync({ offset: 80 });

  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    services: null,
    portfolio: null,
    careers: null,
    contact: null
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fuke's Media LLP",
    "url": "https://fukesmedia.com",
    "logo": "/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png",
    "description": "End-to-End Visual Production Studio — Expert VFX & CGI, Creative Services, Digital Intermediate, and Tech Innovation",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kathriguppe IV Phase, Banashankari",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560070",
      "addressCountry": "IN"
    },
    "telephone": "+916362281003",
    "email": "info@fukesmedia.com",
    "sameAs": [
      "https://www.instagram.com/fukes_media/",
      "https://www.linkedin.com/company/fukesmedia/",
      "https://x.com/FukesMedia",
      "https://www.youtube.com/@FukesMedia"
    ]
  };

  return (
    <>
      <SEOHelmet 
        title="Fuke's Media LLP — End-to-End Visual Production Studio" 
        description="Expert VFX & CGI at the Core. From graphic design and video editing to advanced VFX and CGI — we craft complete visual experiences for film, brand, television, and digital." 
        keywords="VFX studio, CGI, visual effects, color grading, DI, motion graphics, 3D animation, post production, Fuke's Media" 
        canonical="https://fukesmedia.com" 
        structuredData={structuredData} 
      />

      <div className="relative min-h-screen w-full text-foreground overflow-x-hidden">
        <main id="main-content" className="relative z-10">
          
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
          
          <div id="portfolio" ref={el => sectionsRef.current.portfolio = el}>
            <ErrorBoundary>
              <ScrollReveal animation="fadeUp" duration={0.8}>
                <Suspense fallback={<SectionLoader text="Loading portfolio..." />}>
                  <PortfolioSection />
                </Suspense>
              </ScrollReveal>
            </ErrorBoundary>
          </div>

          {/* CTA Section */}
          <ErrorBoundary>
            <ScrollReveal animation="fadeUp" duration={0.7}>
              <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                  <SectionHeading 
                    title="Ready to Create Something Extraordinary?" 
                    subtitle="Let's collaborate to bring your vision to life with cutting-edge VFX and post-production"
                  />
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                    <Link to="/contact">
                      <Button size="lg" className="gradient-button rounded-full px-10 text-base">
                        Get in Touch
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/pricing">
                      <Button size="lg" variant="outline" className="rounded-full px-10 text-base">
                        View Pricing
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>
            </ScrollReveal>
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
