
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import DynamicPrice from '@/components/DynamicPrice';
import FadeInOnScroll from '@/components/FadeInOnScroll';
import { ArrowDown, Play } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(textRef.current, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }).fromTo(ctaRef.current, {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4').fromTo(videoRef.current, {
      scale: 0.95,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
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
      <div className="absolute inset-0 bg-grid-pattern bg-16 opacity-5" aria-hidden="true"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="text-center lg:text-left">
            <div className="inline-block mb-3 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
              New VFX Technology
            </div>
            
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
              <span className="block">AI-Driven</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-fukes-blue via-fukes-green to-fukes-red animate-gradient">
                VFX & Creative
              </span>
              <span className="block">Studio</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-6">
              Fuke's Media is a pioneering digital media powerhouse combining AI technology with expert creative direction to deliver exceptional visual effects and creative solutions.
            </p>
            
            <div className="mb-8 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <div className="glass p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Starting at</p>
                <p className="text-3xl font-bold">
                  <DynamicPrice priceUSD={499} className="mr-2" />
                  <span className="text-lg text-muted-foreground">per project</span>
                </p>
              </div>
            </div>
            
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="gradient-button text-lg group">
                Explore Our Work
                <ArrowDown className="ml-1 w-5 h-5 transition-transform group-hover:translate-y-1" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg flex gap-2">
                <Play className="w-5 h-5" />
                Watch Showreel
              </Button>
            </div>
          </div>
          
          <div ref={videoRef} className="hidden lg:block relative" aria-hidden="true">
            <div className="relative w-full aspect-square animate-float">
              <div className="absolute inset-0 rounded-2xl overflow-hidden glass">
                <img 
                  src="/lovable-uploads/a0ad627e-2387-4f68-9856-c313d6d46f87.png"
                  alt="Fuke's Media Logo"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 object-contain"
                />
                
                {/* Animated glowing orbs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-fukes-blue/20 rounded-full blur-xl animate-pulse" 
                  style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-fukes-red/20 rounded-full blur-xl animate-pulse" 
                  style={{ animationDuration: '6s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-fukes-green/20 rounded-full blur-xl animate-pulse" 
                  style={{ animationDuration: '5s' }}></div>
              </div>
              
              <div className="absolute -top-6 -right-6 glass p-3 rounded-lg animate-pulse-custom">
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-fukes-blue to-fukes-cyan p-3 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white text-center">AI Technology</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass p-3 rounded-lg animate-pulse-custom" style={{
                animationDelay: '1s'
              }}>
                <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-fukes-red to-fukes-gold p-3 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white text-center">Award Winning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground/70">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
