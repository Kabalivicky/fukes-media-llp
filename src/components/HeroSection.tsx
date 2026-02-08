import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Sparkles, Zap, Brain, Play, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VisualGenerator from './AI/VisualGenerator';
import { AnimatedLetters, AnimatedWords } from './KineticText';
import MarqueeText from './MarqueeText';
import ScrollIndicator from './ScrollIndicator';
import ProjectShowcaseStrip from './ProjectShowcaseStrip';

const HeroSection = () => {
  const [showAIDemo, setShowAIDemo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Stagger animation for feature cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const features = [
    { icon: Sparkles, title: 'AI Visual Generation', desc: 'Create stunning visuals with AI', color: 'text-primary' },
    { icon: Brain, title: 'Emotion Detection', desc: 'Real-time facial analysis', color: 'text-secondary' },
    { icon: Zap, title: 'Neural Rendering', desc: 'AI-optimized rendering', color: 'text-accent' },
  ];
  
  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Atmospheric Background - Inspired by Uncommon Studio */}
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl"
        style={{ y: y1 }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-radial from-secondary/15 via-secondary/5 to-transparent blur-3xl"
        style={{ y: y2 }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-radial from-accent/15 via-accent/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Grid overlay for depth */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Main Content */}
      <motion.div 
        className="container relative z-10 px-4 mx-auto w-full pt-24 pb-8" 
        style={{ opacity, scale }}
      >
        <div className="text-center space-y-8 max-w-5xl mx-auto w-full">
          
          {/* Kinetic Typography Hero - Award-winning style */}
          <header className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground font-medium">Award-Winning VFX Studio</span>
            </motion.div>

            <h1 
              id="hero-heading"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tighter leading-[0.9]"
            >
              <AnimatedLetters delay={0.3}>FUKE'S</AnimatedLetters>
              <br />
              <AnimatedLetters delay={0.5} className="bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient" style={{ backgroundImage: 'linear-gradient(90deg, #C8102E, #0077B6, #00A651, #C8102E)' }}>MEDIA</AnimatedLetters>
            </h1>

            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <AnimatedWords delay={1}>
                We craft cinematic visual effects that push the boundaries of what's possible.
              </AnimatedWords>
            </motion.p>
          </header>

          {/* Feature Cards - Hover effects inspired by CSSDA winners */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto w-full px-4 pt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            role="list"
            aria-label="Key features"
          >
            {features.map((feature, index) => (
              <motion.article 
                key={index}
                variants={cardVariants}
                className="group relative p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 text-center overflow-hidden transition-all duration-500 hover:border-primary/50 hover:bg-card/50"
                role="listitem"
                whileHover={{ y: -5 }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <feature.icon className={`w-8 h-8 mx-auto mb-4 ${feature.color} transition-transform duration-300 group-hover:scale-110`} aria-hidden="true" />
                <h3 className="font-semibold text-base mb-2 font-display">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.article>
            ))}
          </motion.div>

          {/* CTA Buttons - Strong, clear calls to action */}
          <motion.nav 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 pt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            aria-label="Get started actions"
          >
            <Link to="/contact">
              <Button 
                size="xl" 
                variant="cta"
                className="group text-lg px-10 py-6 w-full sm:w-auto relative overflow-hidden"
                aria-label="Start working with us"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Work With Us
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>

            <Button 
              size="lg" 
              variant="outline" 
              className="group text-lg px-8 py-4 w-full sm:w-auto border-2" 
              onClick={() => setShowAIDemo(!showAIDemo)}
              aria-expanded={showAIDemo}
              aria-controls="ai-demo-section"
            >
              <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
              {showAIDemo ? 'Hide Demo' : 'Try AI Demo'}
            </Button>

            <Link to="/pricing">
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-lg px-8 py-4 w-full sm:w-auto hover:text-primary"
                aria-label="View our pricing plans"
              >
                View Pricing
              </Button>
            </Link>
          </motion.nav>
        </div>
      </motion.div>

      {/* AI Demo Section */}
      {showAIDemo && (
        <motion.div 
          id="ai-demo-section"
          className="container relative z-10 px-4 py-8 w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          role="region"
          aria-label="AI Visual Generator Demo"
        >
          <VisualGenerator />
        </motion.div>
      )}

      {/* Project Showcase Film Strip */}
      <ProjectShowcaseStrip />

      {/* Scroll indicator */}
      <ScrollIndicator 
        targetId="services" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20" 
      />
    </section>
  );
};

export default HeroSection;