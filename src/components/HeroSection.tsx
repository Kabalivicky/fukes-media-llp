
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Brain, Zap, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import VisualGenerator from './AI/VisualGenerator';
import { useState } from 'react';

const HeroSection = () => {
  const [showAIDemo, setShowAIDemo] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />
      
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

      <div className="container relative z-10 px-4">
        <div className="text-center space-y-12 max-w-6xl mx-auto">
          {/* Main heading - Fixed alignment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="gradient-text block">AI-Driven VFX</span>
              <span className="text-foreground block">& Creative Studio</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
              Where artificial intelligence meets creative excellence. We're revolutionizing 
              visual effects with cutting-edge AI technology and emotion-driven storytelling.
            </p>
          </motion.div>

          {/* AI features highlight - Fixed grid alignment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
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
                className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:bg-card/70 transition-colors text-center"
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/#contact">
              <Button size="lg" className="gradient-button text-lg px-8 py-4 w-full sm:w-auto">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 w-full sm:w-auto"
              onClick={() => setShowAIDemo(!showAIDemo)}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Try AI Demo
            </Button>
            
            <Link to="/advanced-pricing">
              <Button size="lg" variant="ghost" className="text-lg px-8 py-4 w-full sm:w-auto">
                View Pricing
              </Button>
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
