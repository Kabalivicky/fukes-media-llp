
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
    
    // Play the intro video
    const video = videoRef.current;
    if (video) {
      video.play().catch(err => {
        console.error("Video playback error:", err);
        setIsLoading(false); // Skip to content if video can't play
      });
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
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          muted
          playsInline
        >
          <source src="/lovable-uploads/intro-video.mp4" type="video/mp4" />
          {/* Fallback if video doesn't load */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.img 
              src="/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png"
              alt="Fuke's Media"
              className="w-64 h-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
              }}
            />
          </div>
        </video>

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
        
        {/* Loading animation as fallback */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.img 
            src="/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png"
            alt="Fuke's Media"
            className="w-64 h-auto mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 1],
              opacity: 1
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              times: [0, 0.7, 1]
            }}
          />
          
          <motion.div 
            className="h-1 bg-gradient-to-r from-fukes-blue via-fukes-red to-fukes-green w-64 rounded-full overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <motion.div 
              className="h-full w-full bg-white/30"
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingIntro;
