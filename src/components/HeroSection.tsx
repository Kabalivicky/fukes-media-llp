import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Sparkles, Zap, Brain } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VisualGenerator from './AI/VisualGenerator';

const HeroSection = () => {
  const [showAIDemo, setShowAIDemo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 w-full bg-background" />
      <motion.div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute top-1/4 -right-48 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div 
        className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-secondary/10 blur-2xl"
        style={{ y: y3 }}
      />

      <motion.div className="container relative z-10 px-4 mx-auto w-full" style={{ opacity, scale }}>
        <div className="text-center space-y-10 max-w-5xl mx-auto w-full">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
              FUKE'S MEDIA
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 text-center font-body">VFX studio combining cutting-edge AI technology with creative excellence. We deliver cinematic visual effects that push the boundaries of what's possible.</p>
          </div>

          <div className="mt-4 max-w-4xl mx-auto">
            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto w-full px-4">
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border text-center w-full">
              <Sparkles className="w-6 h-6 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-sm mb-2">AI Visual Generation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Create stunning visuals with AI</p>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border text-center w-full">
              <Brain className="w-6 h-6 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-sm mb-2">Emotion Detection</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Real-time facial analysis</p>
            </div>
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border text-center w-full">
              <Zap className="w-6 h-6 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-sm mb-2">Neural Rendering</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">AI-optimized rendering</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4">
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8 py-4 w-full sm:w-auto">
                Work With Us
              </Button>
            </Link>

            <Button size="lg" variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto" onClick={() => setShowAIDemo(!showAIDemo)}>
              Try AI Demo
            </Button>

            <Link to="/advanced-pricing">
              <Button size="lg" variant="ghost" className="text-lg px-8 py-4 w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>

          {showAIDemo && <div className="mt-12 w-full max-w-6xl mx-auto">
              <VisualGenerator />
            </div>}
        </div>
      </motion.div>
    </section>
  );
};
export default HeroSection;