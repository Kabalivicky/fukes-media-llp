import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyCTAs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTAs after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
        >
          <Link to="/contact">
            <Button
              size="lg"
              className="rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </Link>
          
          <Link to="/freelancer-portal">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full shadow-2xl hover:shadow-secondary/50 transition-all duration-300 border-2"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Hire Us
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTAs;
