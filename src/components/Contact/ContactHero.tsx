import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { AnimatedLetters, GradientText, AnimatedWords } from '@/components/KineticText';

const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-20 bg-background overflow-hidden" aria-label="Contact hero">
      {/* Lightweight CSS background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-primary/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-secondary/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
            <Sparkles className="w-4 h-4 mr-2" />
            Let's Create Together
          </Badge>
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
          <AnimatedLetters className="block" delay={0.2}>Get In</AnimatedLetters>
          <span className="block mt-2">
            <GradientText>Touch</GradientText>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-2xl mx-auto text-xl text-muted-foreground"
        >
          Ready to push the boundaries of visual storytelling? We're here to bring your vision to life.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactHero;
