import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingIntro = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro === 'true') {
      setShouldShow(false);
      setIsLoading(false);
      return;
    }
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 120);
    
    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setShouldShow(false);
        sessionStorage.setItem('hasSeenIntro', 'true');
      }, 400);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setShouldShow(false);
          sessionStorage.setItem('hasSeenIntro', 'true');
        }, 300);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleSkip = () => {
    setIsLoading(false);
    setShouldShow(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {shouldShow && (
        <motion.div 
          className={`fixed inset-0 flex items-center justify-center bg-background w-screen h-screen overflow-hidden ${
            isLoading ? 'z-[10000]' : 'z-0'
          }`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/30"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  scale: 0
                }}
                animate={{ 
                  y: [null, Math.random() * -200 - 100],
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Glowing orbs */}
          <motion.div 
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-transparent blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-gradient-to-l from-secondary/20 to-transparent blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Animated Logo Container */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1
              }}
              className="relative mb-8"
            >
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 -m-4 rounded-full border-2 border-primary/30"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 -m-8 rounded-full border border-primary/20"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
              
              <motion.img 
                src="/lovable-uploads/98a66a3b-d5b0-4b14-891c-e5ee0f6dcbc3.png"
                alt="Fuke's Media"
                className="w-32 h-auto relative z-10"
                animate={{ 
                  filter: [
                    "drop-shadow(0 0 10px hsl(var(--primary) / 0.3))",
                    "drop-shadow(0 0 20px hsl(var(--primary) / 0.5))",
                    "drop-shadow(0 0 10px hsl(var(--primary) / 0.3))"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Title with gradient animation */}
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_auto]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                backgroundPosition: ["0% center", "200% center"]
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.3 },
                y: { duration: 0.5, delay: 0.3 },
                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            >
              Fuke's Media
            </motion.h1>
            
            {/* Subtitle with typewriter effect */}
            <motion.p 
              className="text-sm md:text-base text-muted-foreground mb-10 tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              AI-Driven VFX & Creative Studio
            </motion.p>
            
            {/* Enhanced progress bar */}
            <motion.div 
              className="relative w-64 md:w-80"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div 
                  className="h-full rounded-full relative overflow-hidden"
                  style={{ 
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.7), hsl(var(--primary)))'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
              
              {/* Progress indicators */}
              <div className="flex justify-between mt-3">
                <motion.span 
                  className="text-xs text-muted-foreground font-mono"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {progress < 100 ? 'Initializing...' : 'Complete'}
                </motion.span>
                <motion.span 
                  className="text-xs text-primary font-mono font-bold"
                  key={Math.floor(progress)}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </motion.div>

            {/* Loading dots */}
            <motion.div 
              className="flex gap-1.5 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/60"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Skip button */}
          <motion.button 
            className="absolute bottom-8 right-8 text-muted-foreground hover:text-foreground text-sm transition-all duration-300 hover:scale-105 px-4 py-2 rounded-full border border-border/50 hover:border-primary/50 hover:bg-primary/5"
            onClick={handleSkip}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skip Intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIntro;
