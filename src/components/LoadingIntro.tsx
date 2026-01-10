import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingIntro = () => {
  const [phase, setPhase] = useState<'logo' | 'zoom' | 'done'>('logo');
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') !== 'true';
    }
    return true;
  });

  useEffect(() => {
    if (!shouldShow) return;
    
    // Auto-play the Netflix-style animation
    const timer1 = setTimeout(() => setPhase('zoom'), 2000);
    const timer2 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('hasSeenIntro', 'true');
    }, 3200);
    const timer3 = setTimeout(() => setShouldShow(false), 3500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [shouldShow]);

  const handleSkip = useCallback(() => {
    setPhase('done');
    sessionStorage.setItem('hasSeenIntro', 'true');
    setTimeout(() => setShouldShow(false), 300);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black w-screen h-screen overflow-hidden z-[10000]"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'done' ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Netflix-style horizontal light streaks */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{
                  top: `${20 + i * 15}%`,
                  left: '-100%',
                  right: '200%',
                }}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ 
                  x: phase === 'logo' ? '100%' : '200%',
                  opacity: phase === 'logo' ? [0, 1, 0] : 0
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.15,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>

          {/* Ambient glow behind logo */}
          <motion.div
            className="absolute w-[800px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: phase === 'zoom' ? 0 : 0.6,
              scale: phase === 'zoom' ? 2 : 1
            }}
            transition={{ duration: 1 }}
          />

          {/* Main Netflix-style logo animation */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: phase === 'zoom' ? 15 : 1,
              opacity: phase === 'zoom' ? 0 : 1
            }}
            transition={{ 
              scale: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
              opacity: { duration: 0.8 }
            }}
          >
            {/* Logo container with Netflix-style shadow */}
            <motion.div
              className="relative"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* RGB ribbon effects */}
              <motion.div
                className="absolute -inset-8 opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'logo' ? 0.6 : 0 }}
              >
                {/* Left ribbon */}
                <motion.div
                  className="absolute left-0 top-1/2 w-2 h-32 -translate-y-1/2 rounded-full"
                  style={{ background: 'linear-gradient(180deg, #0057B7, #D50032, #009639)' }}
                  initial={{ scaleY: 0, x: -20 }}
                  animate={{ scaleY: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
                {/* Right ribbon */}
                <motion.div
                  className="absolute right-0 top-1/2 w-2 h-32 -translate-y-1/2 rounded-full"
                  style={{ background: 'linear-gradient(180deg, #009639, #D50032, #0057B7)' }}
                  initial={{ scaleY: 0, x: 20 }}
                  animate={{ scaleY: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </motion.div>

              {/* Main logo with dramatic shadow */}
              <motion.img 
                src="/lovable-uploads/98a66a3b-d5b0-4b14-891c-e5ee0f6dcbc3.png"
                alt="Fuke's Media"
                className="w-40 md:w-56 h-auto relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 40px hsl(var(--primary) / 0.5))'
                }}
                initial={{ filter: 'drop-shadow(0 0 0px transparent)' }}
                animate={{ 
                  filter: phase === 'logo' 
                    ? 'drop-shadow(0 0 40px hsl(var(--primary) / 0.5))' 
                    : 'drop-shadow(0 0 100px hsl(var(--primary)))'
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Shine sweep effect */}
              <motion.div
                className="absolute inset-0 overflow-hidden rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: '-200%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>

            {/* Brand name with letter animation */}
            <motion.h1
              className="mt-8 text-3xl md:text-5xl font-bold tracking-wider text-white"
              initial={{ opacity: 0, y: 20, letterSpacing: '0.5em' }}
              animate={{ 
                opacity: phase === 'zoom' ? 0 : 1, 
                y: 0,
                letterSpacing: '0.2em'
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
                FUKE'S MEDIA
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="mt-4 text-sm md:text-base text-white/50 tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'zoom' ? 0 : 0.6 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              AI-Driven VFX Studio
            </motion.p>
          </motion.div>

          {/* Bottom loading bar - Netflix style */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'logo' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0057B7, #D50032, #009639)'
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Skip button */}
          <motion.button 
            className="absolute bottom-8 right-8 text-white/30 hover:text-white/60 text-xs tracking-widest uppercase transition-colors duration-300"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'logo' ? 1 : 0 }}
            transition={{ delay: 1 }}
          >
            Skip
          </motion.button>

          {/* Vignette overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIntro;
