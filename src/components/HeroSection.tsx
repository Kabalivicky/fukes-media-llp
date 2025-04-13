
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import DynamicPrice from '@/components/DynamicPrice';
import { ArrowDown, Play, Sparkles, Star } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  
  // Text animation with split text effect
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate the main heading with a staggered effect
    if (textRef.current) {
      const headingElements = textRef.current.querySelectorAll('.animate-text');
      
      tl.fromTo(headingElements, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }
    
    // Animate CTA elements
    tl.fromTo(ctaRef.current, {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4');
    
    // Animate video/visual element
    tl.fromTo(videoRef.current, {
      scale: 0.8,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.6');
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Advanced grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern bg-16 opacity-5" aria-hidden="true"></div>
      
      {/* Animated gradient lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse-custom"></div>
        <div className="absolute top-[60%] left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent animate-pulse-custom" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-pulse-custom" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Vertical line */}
      <div className="absolute top-0 left-[10%] h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute top-0 right-[10%] h-full w-px bg-gradient-to-b from-transparent via-secondary/20 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="text-center lg:text-left">
            <motion.div 
              className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Revolutionizing VFX with AI Technology
              </div>
            </motion.div>
            
            <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6 tracking-tighter">
              <span className="block animate-text">The Future of</span>
              <motion.span 
                className="block bg-clip-text text-transparent bg-gradient-to-r from-fukes-blue via-fukes-green to-fukes-red animate-gradient animate-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Visual Effects
              </motion.span>
              <span className="block animate-text">Is Here</span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Fuke's Media combines cutting-edge AI technology with expert creative direction to deliver <span className="text-primary font-semibold">exceptional visual experiences</span> for film, television, and digital media.
            </motion.p>
            
            <motion.div 
              className="mb-8 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="glass p-5 rounded-xl backdrop-blur-md">
                <p className="text-sm text-muted-foreground mb-1">Starting at only</p>
                <p className="text-4xl font-bold flex items-center">
                  <DynamicPrice priceUSD={499} className="mr-2" />
                  <span className="text-lg text-muted-foreground">per project</span>
                </p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-fukes-gold text-fukes-gold" />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">Trusted by studios worldwide</span>
                </div>
              </div>
            </motion.div>
            
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Button size="lg" className="gradient-button text-lg font-medium group px-8 py-6">
                <span>Explore Our Work</span>
                <ArrowDown className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg flex gap-2 px-8 py-6">
                <Play className="w-5 h-5" />
                Watch Showreel
              </Button>
            </div>
          </div>
          
          <div ref={videoRef} className="hidden lg:block relative" aria-hidden="true">
            <div className="relative w-full aspect-square">
              {/* Main animated logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatedLogo size="xl" className="animate-float" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 glass p-3 rounded-lg backdrop-blur-md animate-pulse-custom">
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-fukes-blue to-fukes-cyan p-3 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white text-center">AI Technology</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass p-3 rounded-lg backdrop-blur-md animate-pulse-custom" style={{
                animationDelay: '1s'
              }}>
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-fukes-red to-fukes-gold p-3 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white text-center">Award Winning</span>
                </div>
              </div>
              
              {/* Orbiting particles */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-primary/80 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: `${Math.cos(i * (Math.PI * 2 / 20)) * 150}px`,
                      y: `${Math.sin(i * (Math.PI * 2 / 20)) * 150}px`,
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: i * 0.1,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
              
              {/* Tech circuit lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <g stroke="rgba(0,87,183,0.2)" fill="none" strokeWidth="1">
                  <motion.circle cx="200" cy="200" r="180" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  <motion.circle cx="200" cy="200" r="150" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, delay: 1.3 }}
                  />
                  <motion.circle cx="200" cy="200" r="120" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 2, delay: 1.6 }}
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll prompt */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div 
          className="flex flex-col items-center text-foreground/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <span className="text-xs mb-2">Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
