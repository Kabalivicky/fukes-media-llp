import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

const ScrollIndicator = ({ targetId = 'services', className = '' }: ScrollIndicatorProps) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.button
      className={`group cursor-pointer flex flex-col items-center gap-2 ${className}`}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      aria-label={`Scroll to ${targetId} section`}
    >
      {/* Mouse indicator */}
      <motion.div
        className="relative w-7 h-11 rounded-full border-2 border-muted-foreground/40 group-hover:border-primary/60 transition-colors duration-300 flex items-start justify-center p-2"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="w-1.5 h-3 rounded-full bg-primary"
          animate={{ 
            y: [0, 12, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
      </motion.div>
      
      {/* Bouncing arrow */}
      <motion.div
        className="text-muted-foreground/60 group-hover:text-primary transition-colors duration-300"
        animate={{ y: [0, 6, 0] }}
        transition={{ 
          duration: 1.2, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: 0.3
        }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
      
      {/* Text label */}
      <motion.span
        className="text-xs text-muted-foreground/50 uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        Scroll
      </motion.span>
    </motion.button>
  );
};

export default ScrollIndicator;
