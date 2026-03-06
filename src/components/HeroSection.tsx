import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ArrowRight, ChevronDown, FileText, Calculator } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/components/ui/theme-provider';
import logoBlack from '@/assets/logo-black.png';
import logoWhite from '@/assets/logo-white.png';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const logoSrc = theme === 'dark' ? logoWhite : logoBlack;

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Dark matte background */}
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      
      {/* Subtle RGB line accents */}
      <motion.div 
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ 
          y: y1,
          background: 'radial-gradient(circle, hsl(354 87% 50% / 0.4), transparent 70%)'
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute top-1/4 -right-32 w-[450px] h-[450px] rounded-full opacity-20 blur-[120px]"
        style={{ 
          y: y2,
          background: 'radial-gradient(circle, hsl(200 100% 45% / 0.4), transparent 70%)'
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full opacity-15 blur-[120px]"
        style={{ 
          background: 'radial-gradient(circle, hsl(150 100% 40% / 0.3), transparent 70%)'
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        aria-hidden="true"
      />

      {/* Geometric dot grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <motion.div 
        className="container relative z-10 px-4 mx-auto w-full pt-24 pb-8" 
        style={{ opacity, scale }}
      >
        <div className="text-center space-y-8 max-w-5xl mx-auto w-full">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 100 }}
            className="flex justify-center"
          >
            <img
              src={logoSrc}
              alt="Fuke's Media LLP"
              className="h-20 sm:h-24 md:h-28 w-auto object-contain"
            />
          </motion.div>

          {/* Headline — sharp, geometric, high contrast */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <h1 id="hero-heading" className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Production-Ready VFX.
              <br />
              <span className="gradient-text">No Pipeline Chaos.</span>
              <br />
              <span className="text-muted-foreground/80">No Budget Surprises.</span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            We build disciplined VFX systems for films, OTT, advertising, and television — with transparent costing, structured delivery, and zero production drama.
          </motion.p>

          {/* Stats Row */}
          <motion.div 
            className="grid grid-cols-3 max-w-xl mx-auto gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {[
              { value: '500+', label: 'Shots Delivered' },
              { value: '50+', label: 'Productions' },
              { value: '5+', label: 'Years' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-3 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/30"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-xl sm:text-2xl font-display font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons — Producer language */}
          <motion.nav 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 pt-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            aria-label="Get started actions"
          >
            <Link to="/contact">
              <Button 
                size="lg" 
                className="gradient-button group text-base px-8 py-6 rounded-full shadow-glow-blue w-full sm:w-auto"
              >
                <FileText className="w-4 h-4 mr-2" />
                Request Project Breakdown
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link to="/pricing">
              <Button 
                size="lg" 
                variant="outline" 
                className="group text-base px-8 py-6 rounded-full border-2 w-full sm:w-auto hover:bg-card/80"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Get Shot-Level Estimate
              </Button>
            </Link>
          </motion.nav>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <button
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          aria-label="Scroll to services"
        >
          <span className="text-xs tracking-widest uppercase">Explore</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
