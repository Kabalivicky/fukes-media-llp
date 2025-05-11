
import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Only show progress indicator after 100px scroll
      setIsVisible(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <motion.div 
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-background/30 backdrop-blur-md p-2 rounded-full shadow-lg border border-white/10">
        <div className="h-1.5 w-60 bg-muted/50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-fukes-blue via-fukes-red to-fukes-green"
            style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
          />
        </div>
        
        <div className="flex justify-between mt-1 text-xs text-muted-foreground px-1">
          <span>Start</span>
          <span>Progress</span>
          <span>End</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollProgressIndicator;
