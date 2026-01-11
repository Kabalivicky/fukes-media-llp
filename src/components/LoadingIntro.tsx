import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingIntro = () => {
  const [phase, setPhase] = useState<'lines' | 'logo' | 'zoom' | 'done'>('lines');
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') !== 'true';
    }
    return true;
  });

  useEffect(() => {
    if (!shouldShow) return;
    
    // Phase 1: RGB lines spread (0-1.5s)
    // Phase 2: Logo appears (1.5-3s)
    // Phase 3: Zoom out (3-4s)
    const timer1 = setTimeout(() => setPhase('logo'), 1500);
    const timer2 = setTimeout(() => setPhase('zoom'), 3500);
    const timer3 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('hasSeenIntro', 'true');
    }, 4500);
    const timer4 = setTimeout(() => setShouldShow(false), 4800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [shouldShow]);

  const handleSkip = useCallback(() => {
    setPhase('done');
    sessionStorage.setItem('hasSeenIntro', 'true');
    setTimeout(() => setShouldShow(false), 300);
  }, []);

  if (!shouldShow) return null;

  // Fuke's Media brand RGB colors from the logo
  const rgbColors = [
    '#C8102E', // Fuke's Red (crimson)
    '#0077B6', // Fuke's Blue (vibrant blue)
    '#00A651', // Fuke's Green (emerald green)
    '#C8102E', // Red
    '#0077B6', // Blue  
    '#00A651', // Green
    '#C8102E', // Red
    '#0077B6', // Blue
  ];

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black w-screen h-screen overflow-hidden z-[10000]"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'done' ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* RGB Lines spreading from center - Horizontal */}
          <div className="absolute inset-0 overflow-hidden">
            {rgbColors.map((color, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0"
                style={{
                  top: '50%',
                  height: '8px',
                  background: `linear-gradient(90deg, transparent 5%, ${color} 30%, ${color} 70%, transparent 95%)`,
                  boxShadow: `
                    0 0 20px 4px ${color},
                    0 0 40px 8px ${color},
                    0 0 80px 16px ${color},
                    0 0 120px 24px ${color}80
                  `,
                  filter: 'blur(0.5px)',
                }}
                initial={{ 
                  scaleX: 0, 
                  y: 0,
                  opacity: 0 
                }}
                animate={{ 
                  scaleX: phase === 'lines' ? [0, 1.5] : 1.5,
                  y: phase === 'lines' 
                    ? [0, (i - rgbColors.length / 2) * 70] 
                    : (i - rgbColors.length / 2) * 70,
                  opacity: phase === 'lines' ? [0, 1, 0.9] : phase === 'logo' ? 0.4 : 0
                }}
                transition={{ 
                  duration: 1.2,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            ))}

            {/* Vertical RGB lines */}
            {rgbColors.map((color, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0"
                style={{
                  left: '50%',
                  width: '8px',
                  background: `linear-gradient(180deg, transparent 5%, ${color} 30%, ${color} 70%, transparent 95%)`,
                  boxShadow: `
                    0 0 20px 4px ${color},
                    0 0 40px 8px ${color},
                    0 0 80px 16px ${color},
                    0 0 120px 24px ${color}80
                  `,
                  filter: 'blur(0.5px)',
                }}
                initial={{ 
                  scaleY: 0, 
                  x: 0,
                  opacity: 0 
                }}
                animate={{ 
                  scaleY: phase === 'lines' ? [0, 1.5] : 1.5,
                  x: phase === 'lines' 
                    ? [0, (i - rgbColors.length / 2) * 90] 
                    : (i - rgbColors.length / 2) * 90,
                  opacity: phase === 'lines' ? [0, 1, 0.7] : phase === 'logo' ? 0.3 : 0
                }}
                transition={{ 
                  duration: 1.2,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            ))}

            {/* Diagonal RGB lines - Enhanced */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`d-${i}`}
                className="absolute origin-center"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '800px',
                  height: '6px',
                  transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
                  background: `linear-gradient(90deg, transparent 10%, ${rgbColors[i % 3]} 40%, ${rgbColors[i % 3]} 60%, transparent 90%)`,
                  boxShadow: `
                    0 0 15px 3px ${rgbColors[i % 3]},
                    0 0 30px 6px ${rgbColors[i % 3]},
                    0 0 60px 12px ${rgbColors[i % 3]}60
                  `,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: phase === 'lines' ? [0, 2.5] : 2.5,
                  opacity: phase === 'lines' ? [0, 0.9, 0.6] : phase === 'logo' ? 0.15 : 0
                }}
                transition={{ 
                  duration: 1.1,
                  delay: 0.2 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            ))}

            {/* Extra dramatic outer ring lines */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`outer-${i}`}
                className="absolute origin-center"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '150vw',
                  height: '4px',
                  transform: `translate(-50%, -50%) rotate(${i * 15}deg)`,
                  background: `linear-gradient(90deg, transparent, ${rgbColors[i % 3]}40, ${rgbColors[i % 3]}, ${rgbColors[i % 3]}40, transparent)`,
                  boxShadow: `0 0 30px 5px ${rgbColors[i % 3]}50`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: phase === 'lines' ? [0, 1] : 1,
                  opacity: phase === 'lines' ? [0, 0.5, 0.3] : phase === 'logo' ? 0.1 : 0
                }}
                transition={{ 
                  duration: 1.3,
                  delay: 0.4 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            ))}
          </div>

          {/* Center burst effect */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,0,0,0.3), rgba(0,255,0,0.3), rgba(0,0,255,0.3), transparent 70%)',
              filter: 'blur(40px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: phase === 'lines' ? [0, 3] : phase === 'logo' ? 2 : 0,
              opacity: phase === 'lines' ? [0, 0.8, 0.4] : phase === 'logo' ? 0.3 : 0
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Main logo animation */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: phase === 'zoom' ? 20 : phase === 'logo' || phase === 'lines' ? 1 : 1,
              opacity: phase === 'lines' ? 0 : phase === 'zoom' ? 0 : 1
            }}
            transition={{ 
              scale: { duration: 1, ease: [0.76, 0, 0.24, 1] },
              opacity: { duration: 0.5, delay: phase === 'logo' ? 0 : 0 }
            }}
          >
            {/* Ambient glow */}
            <motion.div
              className="absolute -inset-32 rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(255,0,0,0.2), rgba(0,255,0,0.2), rgba(0,0,255,0.2), transparent 60%)',
                filter: 'blur(60px)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'logo' ? 0.8 : 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Logo with RGB border effect */}
            <motion.div
              className="relative p-1 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #FF0000, #00FF00, #0000FF, #FF0000)',
                backgroundSize: '300% 300%',
              }}
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ 
                opacity: phase === 'logo' ? 1 : 0,
                rotate: 0,
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                rotate: { duration: 0.8 },
                backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' }
              }}
            >
              <div className="bg-black rounded-xl p-4">
                <motion.img 
                  src="/lovable-uploads/98a66a3b-d5b0-4b14-891c-e5ee0f6dcbc3.png"
                  alt="Fuke's Media"
                  className="w-48 md:w-64 h-auto"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(255,0,0,0.5)) drop-shadow(0 0 30px rgba(0,255,0,0.5)) drop-shadow(0 0 30px rgba(0,0,255,0.5))'
                  }}
                />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.h1
              className="mt-8 text-4xl md:text-6xl font-bold tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: phase === 'logo' ? 1 : 0, 
                y: phase === 'logo' ? 0 : 30
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #FF0000, #FFFFFF, #00FF00, #FFFFFF, #0000FF)',
                  backgroundSize: '200% auto',
                }}
              >
                FUKE'S MEDIA
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="mt-4 text-sm md:text-base text-white/60 tracking-[0.4em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'logo' ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              AI-Driven VFX Studio
            </motion.p>
          </motion.div>

          {/* RGB Loading bar */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'zoom' && phase !== 'done' ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #FF0000, #00FF00, #0000FF, #FF0000)',
                  backgroundSize: '200% 100%',
                }}
                initial={{ width: '0%', backgroundPosition: '0% 0%' }}
                animate={{ 
                  width: '100%',
                  backgroundPosition: ['0% 0%', '100% 0%']
                }}
                transition={{ 
                  width: { duration: 3.5, ease: 'linear' },
                  backgroundPosition: { duration: 1, repeat: Infinity, ease: 'linear' }
                }}
              />
            </div>
          </motion.div>

          {/* Skip button */}
          <motion.button 
            className="absolute bottom-8 right-8 text-white/40 hover:text-white text-xs tracking-widest uppercase transition-colors duration-300 border border-white/20 px-4 py-2 rounded hover:border-white/40"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'zoom' && phase !== 'done' ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            Skip Intro
          </motion.button>

          {/* Scanline overlay for cinematic TV effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(0, 0, 0, 0.3) 1px,
                rgba(0, 0, 0, 0.3) 2px
              )`,
              backgroundSize: '100% 4px',
            }}
          />
          
          {/* Additional horizontal scanline flicker */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(
                to bottom,
                transparent 0%,
                rgba(255, 255, 255, 0.02) 50%,
                transparent 100%
              )`,
              backgroundSize: '100% 8px',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '0% 100%'],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Vignette overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIntro;
