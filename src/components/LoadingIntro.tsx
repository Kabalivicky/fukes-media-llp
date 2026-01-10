import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power } from 'lucide-react';

const LoadingIntro = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') !== 'true';
    }
    return true;
  });

  const handleEnter = useCallback(() => {
    setIsRevealed(true);
    setTimeout(() => {
      setShouldShow(false);
      sessionStorage.setItem('hasSeenIntro', 'true');
    }, 1200);
  }, []);

  if (!shouldShow) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {shouldShow && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black w-screen h-screen overflow-hidden z-[10000]"
          initial={{ opacity: 1 }}
          animate={isRevealed ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1, delay: isRevealed ? 0.2 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Netflix-style curtain reveal effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black via-black to-black"
            initial={{ scaleY: 1 }}
            animate={isRevealed ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'top' }}
          />
          
          {/* Ambient glow */}
          <motion.div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
            }}
            animate={isRevealed ? { scale: 3, opacity: 0.8 } : { 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={isRevealed ? { duration: 0.6 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main content */}
          <motion.div 
            className="relative z-10 flex flex-col items-center justify-center cursor-pointer select-none"
            onClick={handleEnter}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <img 
                src="/lovable-uploads/98a66a3b-d5b0-4b14-891c-e5ee0f6dcbc3.png"
                alt="Fuke's Media"
                className="w-24 h-auto opacity-80"
              />
            </motion.div>

            {/* Power button container */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Outer ring pulse */}
              <motion.div
                className="absolute inset-0 -m-8 rounded-full border-2 border-primary/20"
                animate={isRevealed ? { scale: 2.5, opacity: 0 } : { 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={isRevealed ? { duration: 0.5 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 -m-4 rounded-full border border-primary/30"
                animate={isRevealed ? { scale: 2, opacity: 0 } : { 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={isRevealed ? { duration: 0.4 } : { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />

              {/* Power button */}
              <motion.div
                className="w-28 h-28 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{
                  background: isRevealed 
                    ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  border: '2px solid',
                  borderColor: isRevealed ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.2)'
                }}
                animate={isRevealed ? { 
                  boxShadow: '0 0 60px hsl(var(--primary) / 0.8), 0 0 120px hsl(var(--primary) / 0.4)'
                } : {
                  boxShadow: '0 0 20px hsl(var(--primary) / 0.1)'
                }}
                whileHover={{ 
                  borderColor: 'hsl(var(--primary))',
                  boxShadow: '0 0 30px hsl(var(--primary) / 0.3)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* RGB sweep effect on hover/click */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  style={{
                    background: 'linear-gradient(90deg, #0057B7, #D50032, #009639, #0057B7)',
                    backgroundSize: '300% 100%'
                  }}
                  animate={isRevealed ? { 
                    opacity: 0.8,
                    backgroundPosition: ['0% 50%', '100% 50%']
                  } : {}}
                  transition={{ duration: 0.6 }}
                />
                
                <Power 
                  className={`w-12 h-12 relative z-10 transition-colors duration-300 ${
                    isRevealed ? 'text-white' : 'text-white/60 group-hover:text-primary'
                  }`}
                />
              </motion.div>
            </motion.div>

            {/* Click to enter text */}
            <motion.p
              className="mt-10 text-white/50 text-sm tracking-[0.3em] uppercase font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {isRevealed ? 'Welcome' : 'Click to Enter'}
            </motion.p>

            {/* Animated underline */}
            <motion.div
              className="mt-2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: isRevealed ? 200 : 100 }}
              transition={{ duration: 0.6, delay: 1 }}
            />
          </motion.div>

          {/* Bottom branding */}
          <motion.div
            className="absolute bottom-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-xs text-white/30 tracking-widest uppercase">
              AI-Driven VFX & Creative Studio
            </p>
          </motion.div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
          <motion.div
            className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          />
          <motion.div
            className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />
          <motion.div
            className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIntro;
