import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageLoadingBar = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading
    setIsLoading(true);
    setProgress(0);

    // Simulate progress
    const timer1 = setTimeout(() => setProgress(30), 50);
    const timer2 = setTimeout(() => setProgress(60), 150);
    const timer3 = setTimeout(() => setProgress(80), 250);
    const timer4 = setTimeout(() => setProgress(100), 400);
    const timer5 = setTimeout(() => setIsLoading(false), 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [location.pathname]);

  if (!isLoading && progress === 0) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[10000] h-1 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-primary/20 blur-sm" />
      
      {/* Progress bar */}
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-accent relative"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Glow dot at the end */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"
          animate={{
            boxShadow: [
              '0 0 10px hsl(var(--primary))',
              '0 0 20px hsl(var(--primary))',
              '0 0 10px hsl(var(--primary))',
            ],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default PageLoadingBar;