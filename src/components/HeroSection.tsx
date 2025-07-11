
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Brain, Zap, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import VisualGenerator from './AI/VisualGenerator';
import MagneticButton from './MagneticButton';
import MorphingText from './MorphingText';
import GlitchText from './GlitchText';
import AnimatedTextReveal from './AnimatedTextReveal';
import ThreeDFloatingElements from './ThreeDFloatingElements';
import { useState } from 'react';

const HeroSection = () => {
  const [showAIDemo, setShowAIDemo] = useState(false);
  
  const aiTerms = ['AI-Driven VFX', 'Neural Rendering', 'Smart Automation', 'Computer Vision', 'Machine Learning', 'Deep Learning'];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      {/* 3D Floating Elements */}
      <ThreeDFloatingElements />
      
      {/* Background gradient and animated elements */}
      <div className="absolute inset-0 w-full bg-gradient-to-br from-background via-background to-muted/50" />
      
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 blur-xl"
            style={{
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 0.5 + 0.5],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 mx-auto w-full">
        <div className="text-center space-y-12 max-w-6xl mx-auto w-full">
          {/* Main heading - Fixed alignment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="gradient-text block">
                <GlitchText 
                  text="AI-Driven VFX"
                  className="inline-block"
                  intensity="medium"
                />
              </span>
              <span className="text-foreground block">& Creative Studio</span>
            </h1>
            <AnimatedTextReveal
              text="Where artificial intelligence meets creative excellence. We're revolutionizing visual effects with cutting-edge AI technology and emotion-driven storytelling."
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4 text-center"
              type="words"
              stagger={0.05}
              delay={0.5}
            />
          </motion.div>

          {/* AI features highlight - Fixed grid alignment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto w-full px-4"
          >
            {[
              { icon: Brain, label: "AI Visual Generation", desc: "Create stunning visuals with AI" },
              { icon: Eye, label: "Emotion Detection", desc: "Real-time facial analysis" },
              { icon: Sparkles, label: "Neural Rendering", desc: "AI-optimized rendering" },
              { icon: Zap, label: "Smart Automation", desc: "Intelligent workflow automation" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:bg-card/70 transition-colors text-center w-full"
              >
                <feature.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold text-sm mb-2">{feature.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons - Fixed alignment and spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4"
          >
            <Link to="/#contact">
              <MagneticButton size="lg" className="gradient-button text-lg px-8 py-4 w-full sm:w-auto">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </MagneticButton>
            </Link>
            
            <MagneticButton 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 w-full sm:w-auto"
              onClick={() => setShowAIDemo(!showAIDemo)}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Try AI Demo
            </MagneticButton>
            
            <Link to="/advanced-pricing">
              <MagneticButton size="lg" variant="ghost" className="text-lg px-8 py-4 w-full sm:w-auto">
                View Pricing
              </MagneticButton>
            </Link>
          </motion.div>

          {/* AI Demo section - Fixed container alignment */}
          {showAIDemo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 w-full max-w-6xl mx-auto"
            >
              <VisualGenerator />
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator - Fixed positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
