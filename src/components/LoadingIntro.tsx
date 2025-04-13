
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const LoadingIntro = () => {
  const [isLoading, setIsLoading] = useState(true);
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
    
    // Set timeout as fallback if video doesn't end properly
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasSeenIntro', 'true');
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle video end event
  const handleVideoEnd = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  if (!isLoading) {
    return null;
  }

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full max-w-4xl max-h-screen overflow-hidden">
        {/* Particles in background */}
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
        
        {/* Animated logo sequence */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img 
            src="/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png"
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
          
          {/* Company name */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.h1 
              className="text-4xl font-bold text-white mb-2 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
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
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-fukes-blue via-fukes-red to-fukes-green w-64 rounded-full overflow-hidden mt-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <motion.div 
              className="h-full w-full bg-white/30"
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            />
          </motion.div>
          
          <motion.p
            className="text-white/60 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Redefining Digital Media
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
  );
};

export default LoadingIntro;
