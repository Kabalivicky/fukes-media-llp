import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingIntro = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // Skip intro if we've seen it this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro === 'true') {
      setShouldShow(false);
      setIsLoading(false);
      return;
    }
    
    // Fast progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 20;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);
    
    // Quick dismiss
    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setShouldShow(false);
        sessionStorage.setItem('hasSeenIntro', 'true');
      }, 300);
    }, 1500);
    
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
        }, 200);
      }, 100);
      
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
          className={`fixed inset-0 flex items-center justify-center bg-background w-screen h-screen ${
            isLoading ? 'z-[10000]' : 'z-0'
          }`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Simple logo */}
            <img 
              src="/lovable-uploads/98a66a3b-d5b0-4b14-891c-e5ee0f6dcbc3.png"
              alt="Fuke's Media"
              className="w-48 h-auto mb-6"
            />
            
            <h1 
              className="text-3xl font-bold mb-2 text-center text-foreground"
            >
              Fuke's Media
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              AI-Driven VFX & Creative Studio
            </p>
            
            {/* Simple progress bar */}
            <div className="h-1 bg-muted w-48 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-muted-foreground text-xs mt-3">
              {progress < 100 ? `Loading... ${Math.round(progress)}%` : "Ready"}
            </p>

            {/* Skip button */}
            <button 
              className="absolute bottom-8 right-8 text-muted-foreground hover:text-foreground text-sm transition-colors"
              onClick={handleSkip}
            >
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIntro;
