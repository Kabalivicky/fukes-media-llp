
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const LoadingIntro = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Store the intended path to redirect after the intro
  useEffect(() => {
    // Skip intro if we've seen it this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro === 'true') {
      setIsLoading(false);
      return;
    }
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);
    
    // Set timeout as fallback if video doesn't end properly
    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasSeenIntro', 'true');
      }, 500);
    }, 6000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Update when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasSeenIntro', 'true');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!isLoading) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black w-screen h-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Animated grid background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-20" 
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }}
            />
          </div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 z-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`intro-particle-${i}`}
                className="absolute rounded-full bg-white/30 blur-sm"
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 z-0 bg-gradient-to-br from-fukes-blue/20 via-fukes-red/20 to-fukes-green/20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />
          
          {/* Animated logo sequence */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.img 
              src="/lovable-uploads/773570e5-fe9a-45c8-b246-6337fa83b87d.png"
              alt="Fuke's Media"
              className="w-64 h-auto mb-8"
              initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
              animate={{ 
                scale: [0.5, 1.2, 1],
                opacity: [0, 1, 1],
                rotateY: [-30, 10, 0]
              }}
              transition={{
                duration: 2.5,
                ease: "easeOut",
                times: [0, 0.6, 1]
              }}
            />
            
            {/* Holographic text effect */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <motion.h1 
                className="text-5xl font-bold mb-2 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                style={{
                  background: "linear-gradient(90deg, #0057B7, #D50032, #009639, #0057B7)",
                  backgroundSize: "300% 100%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradient-shift 4s ease infinite"
                }}
              >
                Fuke's Media
              </motion.h1>
              <motion.p
                className="text-lg text-white/80"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.1, duration: 0.8 }}
              >
                AI-Driven VFX & Creative Studio
              </motion.p>
            </motion.div>
            
            {/* Progress loader */}
            <motion.div 
              className="h-1 bg-gradient-to-r from-fukes-blue via-fukes-red to-fukes-green w-64 rounded-full overflow-hidden mt-8 relative"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <motion.div 
                className="h-full bg-white/50 absolute left-0 top-0"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
            
            <motion.p
              className="text-white/60 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
            >
              {progress < 100 ? `Loading... ${Math.round(progress)}%` : "Ready"}
            </motion.p>
          </motion.div>

          {/* Skip button */}
          <button 
            className="absolute bottom-8 right-8 text-white/60 hover:text-white text-sm transition-colors"
            onClick={() => {
              setIsLoading(false);
              sessionStorage.setItem('hasSeenIntro', 'true');
            }}
          >
            Skip Intro
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingIntro;
