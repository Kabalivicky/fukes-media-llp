import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container relative z-10 px-4 mx-auto w-full pt-20 pb-12">
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Professional VFX Studio</span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight leading-none">
              <span className="gradient-text">FUKE'S</span>
              <br />
              <span className="text-foreground">MEDIA</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
          >
            Cutting-edge AI technology meets creative excellence. 
            We deliver cinematic visual effects that push the boundaries of imagination.
          </motion.p>

          {/* Video showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-4xl mx-auto px-4"
          >
            <div className="relative w-full rounded-2xl overflow-hidden glass-card hover-lift group cursor-pointer" 
                 style={{ paddingBottom: '56.25%' }}>
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl gradient-border" />
              
              <div className="absolute inset-[1px] rounded-2xl bg-card/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                    animate={{ 
                      boxShadow: ['0 0 30px hsl(var(--primary) / 0.3)', '0 0 50px hsl(var(--primary) / 0.5)', '0 0 30px hsl(var(--primary) / 0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <PlayCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-foreground font-semibold text-sm sm:text-base">Watch Our Showreel</p>
                    <p className="text-muted-foreground text-xs sm:text-sm">Experience Visual Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 pt-4"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg px-8 py-6 btn-gradient btn-glow group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Work With Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>

            <Link to="/showreel" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-base sm:text-lg px-8 py-6 glass-card hover:bg-card/80 border-border/50"
              >
                View Showreel
              </Button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-16 pt-8"
          >
            {[
              { value: '50+', label: 'Projects' },
              { value: '5+', label: 'Years' },
              { value: '100%', label: 'Quality' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
