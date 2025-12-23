import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollPercentageIndicator = () => {
  const { scrollYProgress } = useScroll();
  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
      setIsVisible(latest > 0.02);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!isVisible) return null;

  // Calculate the circumference of the circle
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 hidden md:flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-16 h-16 group cursor-pointer">
        {/* Background glow */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-300" />
        
        {/* Outer ring with gradient */}
        <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 48 48">
          {/* Background circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted/30"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: smoothProgress.get() 
                ? circumference - (smoothProgress.get() * circumference) 
                : circumference
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset: circumference - (percentage / 100) * circumference 
            }}
            transition={{ duration: 0.1 }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--fukes-blue))" />
              <stop offset="50%" stopColor="hsl(var(--fukes-red))" />
              <stop offset="100%" stopColor="hsl(var(--fukes-green))" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-background/90 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center border border-border/50 shadow-lg">
            <span className="text-xs font-bold text-foreground tabular-nums">
              {percentage}%
            </span>
          </div>
        </div>
        
        {/* Decorative particles */}
        {percentage > 0 && (
          <>
            <motion.div
              className="absolute w-1 h-1 bg-primary rounded-full"
              animate={{
                x: [0, 10, 0],
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ top: '20%', left: '20%' }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-accent rounded-full"
              animate={{
                x: [0, -8, 0],
                y: [0, 8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              style={{ bottom: '25%', right: '20%' }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ScrollPercentageIndicator;
