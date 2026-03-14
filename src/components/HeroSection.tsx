import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { ArrowRight, ChevronDown, FileText, Calculator } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/components/ui/theme-provider';
import logoBlack from '@/assets/logo-black.png';
import logoWhite from '@/assets/logo-white.png';

const FloatingShape = ({ className, delay = 0, duration = 20 }: { className: string; delay?: number; duration?: number }) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    animate={{
      y: [0, -30, 0],
      rotateX: [0, 15, 0],
      rotateY: [0, 25, 0],
      rotateZ: [0, 5, -5, 0],
    }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{ transformStyle: 'preserve-3d' }}
    aria-hidden="true"
  />
);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  const logoSrc = theme === 'dark' ? logoWhite : logoBlack;

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Dark matte background */}
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      
      {/* 3D Depth grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          y: y3,
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(60deg) translateZ(-200px)',
          transformOrigin: 'center top',
        }}
        aria-hidden="true"
      />

      {/* Floating 3D geometric shapes */}
      <FloatingShape 
        className="top-[15%] left-[8%] w-20 h-20 border border-primary/20 rounded-2xl"
        delay={0} duration={18}
      />
      <FloatingShape 
        className="top-[25%] right-[12%] w-16 h-16 border border-secondary/20 rounded-full"
        delay={2} duration={22}
      />
      <FloatingShape 
        className="bottom-[30%] left-[15%] w-12 h-12 border border-accent/20 rotate-45"
        delay={4} duration={16}
      />
      <FloatingShape 
        className="top-[60%] right-[8%] w-24 h-24 border border-primary/10 rounded-3xl"
        delay={1} duration={25}
      />
      <FloatingShape 
        className="top-[10%] left-[45%] w-8 h-8 bg-secondary/5 rounded-full"
        delay={3} duration={20}
      />
      <FloatingShape 
        className="bottom-[20%] right-[25%] w-14 h-14 border border-accent/15 rounded-xl"
        delay={5} duration={19}
      />

      {/* RGB light orbs with 3D depth */}
      <motion.div 
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ 
          y: y1,
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)',
          transformStyle: 'preserve-3d',
          translateZ: '-100px',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute top-1/4 -right-32 w-[450px] h-[450px] rounded-full opacity-20 blur-[120px]"
        style={{ 
          y: y2,
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.4), transparent 70%)',
          translateZ: '-150px',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full opacity-15 blur-[120px]"
        style={{ 
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.3), transparent 70%)',
          translateZ: '-200px',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        aria-hidden="true"
      />

      {/* Main Content with 3D perspective */}
      <motion.div 
        className="container relative z-10 px-4 mx-auto w-full pt-24 pb-8" 
        style={{ opacity, scale, rotateX, transformStyle: 'preserve-3d' }}
      >
        <div className="text-center space-y-8 max-w-5xl mx-auto w-full" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Logo with 3D float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.2, duration: 1, type: 'spring', stiffness: 80 }}
            className="flex justify-center"
            style={{ transformStyle: 'preserve-3d', translateZ: '60px' }}
          >
            <motion.img
              src={logoSrc}
              alt="Fuke's Media LLP"
              className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-2xl"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </motion.div>

          {/* 3D Headline with layered depth */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 60 }}
            style={{ transformStyle: 'preserve-3d', translateZ: '40px' }}
          >
            <h1 id="hero-heading" className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <motion.span
                className="inline-block"
                whileHover={{ translateZ: 20, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                VFX. Post. Design.
              </motion.span>
              <br />
              <motion.span 
                className="gradient-text inline-block"
                whileHover={{ translateZ: 30, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Everything Visual.
              </motion.span>
              <br />
              <motion.span 
                className="text-muted-foreground/80 inline-block"
                whileHover={{ translateZ: 20, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                One Studio.
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ translateZ: '20px' }}
          >
            We build disciplined VFX systems for films, OTT, advertising, and television — with transparent costing, structured delivery, and zero production drama.
          </motion.p>

          {/* 3D Stats Row */}
          <motion.div 
            className="grid grid-cols-3 max-w-xl mx-auto gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d', translateZ: '30px' }}
          >
            {[
              { value: '500+', label: 'Shots Delivered' },
              { value: '50+', label: 'Productions' },
              { value: '5+', label: 'Years' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-3 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/30 cursor-default"
                whileHover={{ 
                  y: -8, 
                  rotateX: 5,
                  rotateY: i === 0 ? -5 : i === 2 ? 5 : 0,
                  scale: 1.05,
                  boxShadow: '0 25px 50px -12px hsl(var(--secondary) / 0.25)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-xl sm:text-2xl font-display font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons with 3D press effect */}
          <motion.nav 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 pt-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            aria-label="Get started actions"
            style={{ translateZ: '50px' }}
          >
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05, y: -3, rotateX: 3 }}
                whileTap={{ scale: 0.97, y: 1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Button 
                  size="lg" 
                  className="gradient-button group text-base px-8 py-6 rounded-full shadow-glow-blue w-full sm:w-auto"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Request Project Breakdown
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>

            <Link to="/pricing">
              <motion.div
                whileHover={{ scale: 1.05, y: -3, rotateX: 3 }}
                whileTap={{ scale: 0.97, y: 1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group text-base px-8 py-6 rounded-full border-2 w-full sm:w-auto hover:bg-card/80"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Get Shot-Level Estimate
                </Button>
              </motion.div>
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
