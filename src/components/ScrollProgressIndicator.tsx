
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollProgressIndicatorProps {
  showLabels?: boolean;
}

const ScrollProgressIndicator = ({ showLabels = true }: ScrollProgressIndicatorProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress for animations (0 to 1)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
      <div className="h-1 w-60 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-fukes-blue via-fukes-red to-fukes-green"
          style={{ width: `${scrollProgress * 100}%` }}
          initial={{ width: '0%' }}
          animate={{ width: `${scrollProgress * 100}%` }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
      </div>
      
      {showLabels && (
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Top</span>
          <span>Bottom</span>
        </div>
      )}
    </div>
  );
};

export default ScrollProgressIndicator;
