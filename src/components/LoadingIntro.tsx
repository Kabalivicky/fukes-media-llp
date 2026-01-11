import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingIntro = () => {
  const [phase, setPhase] = useState<'burst' | 'converge' | 'logo' | 'done'>('burst');
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') !== 'true';
    }
    return true;
  });

  useEffect(() => {
    if (!shouldShow) return;
    
    // Phase 1: Lens burst (0-1.2s)
    // Phase 2: Rays converge to center (1.2-2.2s)
    // Phase 3: Logo reveal (2.2-4s)
    // Phase 4: Done (4s+)
    const timer1 = setTimeout(() => setPhase('converge'), 1200);
    const timer2 = setTimeout(() => setPhase('logo'), 2200);
    const timer3 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('hasSeenIntro', 'true');
    }, 4000);
    const timer4 = setTimeout(() => setShouldShow(false), 4300);
    
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

  // Fuke's Media brand RGB colors
  const brandColors = {
    red: '#C8102E',
    blue: '#0077B6', 
    green: '#00A651',
  };

  // Generate lens flare rays at various angles
  const lensRays = [
    { angle: 0, color: brandColors.red, length: '120vw', thickness: 3, delay: 0 },
    { angle: 30, color: brandColors.green, length: '100vw', thickness: 2, delay: 0.05 },
    { angle: 60, color: brandColors.blue, length: '110vw', thickness: 2.5, delay: 0.1 },
    { angle: 90, color: brandColors.red, length: '120vw', thickness: 3, delay: 0.02 },
    { angle: 120, color: brandColors.green, length: '100vw', thickness: 2, delay: 0.08 },
    { angle: 150, color: brandColors.blue, length: '110vw', thickness: 2.5, delay: 0.12 },
    { angle: 180, color: brandColors.red, length: '120vw', thickness: 3, delay: 0.03 },
    { angle: 210, color: brandColors.green, length: '100vw', thickness: 2, delay: 0.07 },
    { angle: 240, color: brandColors.blue, length: '110vw', thickness: 2.5, delay: 0.11 },
    { angle: 270, color: brandColors.red, length: '120vw', thickness: 3, delay: 0.04 },
    { angle: 300, color: brandColors.green, length: '100vw', thickness: 2, delay: 0.09 },
    { angle: 330, color: brandColors.blue, length: '110vw', thickness: 2.5, delay: 0.06 },
  ];

  // Secondary thinner rays for depth
  const secondaryRays = [...Array(24)].map((_, i) => ({
    angle: i * 15,
    color: [brandColors.red, brandColors.green, brandColors.blue][i % 3],
    delay: 0.15 + i * 0.02,
  }));

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black w-screen h-screen overflow-hidden z-[10000]"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'done' ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Deep space background with subtle grain */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
            }}
          />

          {/* Camera lens aperture effect - outer ring */}
          <motion.div
            className="absolute w-[200vmax] h-[200vmax] rounded-full"
            style={{
              background: `conic-gradient(
                from 0deg,
                ${brandColors.red}10,
                ${brandColors.green}10,
                ${brandColors.blue}10,
                ${brandColors.red}10
              )`,
              filter: 'blur(100px)',
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ 
              scale: phase === 'burst' ? [0, 1.5] : phase === 'converge' ? 0.8 : 0,
              opacity: phase === 'burst' ? [0, 0.6] : phase === 'converge' ? 0.3 : 0,
              rotate: phase === 'burst' ? [0, 45] : 45,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Primary lens flare rays - dramatic burst */}
          <div className="absolute inset-0 overflow-hidden">
            {lensRays.map((ray, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute origin-center"
                style={{
                  top: '50%',
                  left: '50%',
                  width: ray.length,
                  height: `${ray.thickness}px`,
                  transform: `translate(-50%, -50%) rotate(${ray.angle}deg)`,
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    ${ray.color}00 10%,
                    ${ray.color}40 25%,
                    ${ray.color} 50%, 
                    ${ray.color}40 75%,
                    ${ray.color}00 90%,
                    transparent 100%
                  )`,
                  boxShadow: `
                    0 0 ${ray.thickness * 8}px ${ray.thickness * 2}px ${ray.color}60,
                    0 0 ${ray.thickness * 20}px ${ray.thickness * 4}px ${ray.color}30,
                    0 0 ${ray.thickness * 40}px ${ray.thickness * 8}px ${ray.color}15
                  `,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: phase === 'burst' ? [0, 1.2, 1] : phase === 'converge' ? 0.3 : 0,
                  opacity: phase === 'burst' ? [0, 1, 0.8] : phase === 'converge' ? [0.8, 0] : 0,
                }}
                transition={{ 
                  duration: phase === 'burst' ? 0.8 : 0.6,
                  delay: ray.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}

            {/* Secondary rays for depth and complexity */}
            {secondaryRays.map((ray, i) => (
              <motion.div
                key={`secondary-${i}`}
                className="absolute origin-center"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '80vw',
                  height: '1px',
                  transform: `translate(-50%, -50%) rotate(${ray.angle}deg)`,
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    ${ray.color}30 30%,
                    ${ray.color}80 50%, 
                    ${ray.color}30 70%,
                    transparent 100%
                  )`,
                  boxShadow: `0 0 15px 2px ${ray.color}40`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: phase === 'burst' ? [0, 1] : phase === 'converge' ? 0.2 : 0,
                  opacity: phase === 'burst' ? [0, 0.6] : phase === 'converge' ? 0 : 0,
                }}
                transition={{ 
                  duration: 0.6,
                  delay: ray.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>

          {/* Central lens flare hotspot */}
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, 
                rgba(255,255,255,0.9) 0%, 
                rgba(255,255,255,0.4) 20%,
                ${brandColors.red}40 40%,
                ${brandColors.green}30 60%,
                ${brandColors.blue}20 80%,
                transparent 100%
              )`,
              filter: 'blur(2px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: phase === 'burst' ? [0, 2, 1.5] : phase === 'converge' ? [1.5, 0.5] : phase === 'logo' ? 0 : 0,
              opacity: phase === 'burst' ? [0, 1, 0.9] : phase === 'converge' ? [0.9, 1, 0] : 0,
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Hexagonal lens flare artifacts */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`hex-${i}`}
              className="absolute"
              style={{
                width: '60px',
                height: '60px',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: `linear-gradient(135deg, ${[brandColors.red, brandColors.green, brandColors.blue][i % 3]}30, transparent)`,
                filter: 'blur(1px)',
              }}
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0, 
                opacity: 0 
              }}
              animate={{ 
                x: phase === 'burst' ? [0, (i - 2.5) * 80] : (i - 2.5) * 80,
                y: phase === 'burst' ? [0, Math.sin(i * 1.2) * 40] : Math.sin(i * 1.2) * 40,
                scale: phase === 'burst' ? [0, 1] : phase === 'converge' ? [1, 0] : 0,
                opacity: phase === 'burst' ? [0, 0.5] : phase === 'converge' ? [0.5, 0] : 0,
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3 + i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}

          {/* Anamorphic streak effect */}
          <motion.div
            className="absolute w-[200vw] h-1"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%,
                ${brandColors.blue}20 20%,
                ${brandColors.blue}60 35%,
                rgba(255,255,255,0.8) 50%,
                ${brandColors.blue}60 65%,
                ${brandColors.blue}20 80%,
                transparent 100%
              )`,
              boxShadow: `
                0 0 40px 10px ${brandColors.blue}40,
                0 0 80px 20px ${brandColors.blue}20
              `,
              filter: 'blur(0.5px)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: phase === 'burst' ? [0, 1.2] : phase === 'converge' ? [1.2, 0] : 0,
              opacity: phase === 'burst' ? [0, 0.7] : phase === 'converge' ? [0.7, 0] : 0,
            }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Logo reveal */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: phase === 'logo' ? 1 : 0.8,
              opacity: phase === 'logo' ? 1 : 0,
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Logo glow */}
            <motion.div
              className="absolute -inset-20 rounded-full"
              style={{
                background: `radial-gradient(ellipse, 
                  ${brandColors.red}20 0%, 
                  ${brandColors.green}15 33%, 
                  ${brandColors.blue}10 66%, 
                  transparent 100%
                )`,
                filter: 'blur(40px)',
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Logo container with RGB border */}
            <motion.div
              className="relative p-[2px] rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${brandColors.red}, ${brandColors.green}, ${brandColors.blue}, ${brandColors.red})`,
                backgroundSize: '300% 300%',
              }}
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="bg-black rounded-2xl p-6">
                <motion.img 
                  src="/lovable-uploads/98a66a3b-d5b0-4b14-891c-e5ee0f6dcbc3.png"
                  alt="Fuke's Media"
                  className="w-40 md:w-56 h-auto"
                  style={{
                    filter: `
                      drop-shadow(0 0 20px ${brandColors.red}60) 
                      drop-shadow(0 0 40px ${brandColors.green}40) 
                      drop-shadow(0 0 60px ${brandColors.blue}30)
                    `,
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
            </motion.div>

            {/* Brand name with shimmer */}
            <motion.h1
              className="mt-6 text-3xl md:text-5xl font-bold tracking-[0.2em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, 
                    ${brandColors.red}, 
                    #ffffff, 
                    ${brandColors.green}, 
                    #ffffff, 
                    ${brandColors.blue}
                  )`,
                  backgroundSize: '200% auto',
                }}
              >
                FUKE'S MEDIA
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="mt-3 text-xs md:text-sm text-white/50 tracking-[0.5em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              AI-Driven VFX Studio
            </motion.p>
          </motion.div>

          {/* Loading progress bar */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'done' ? 1 : 0 }}
          >
            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${brandColors.red}, ${brandColors.green}, ${brandColors.blue})`,
                }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.5, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Skip button */}
          <motion.button 
            className="absolute bottom-6 right-6 text-white/30 hover:text-white/60 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 border border-white/10 px-3 py-1.5 rounded hover:border-white/30"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'done' ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            Skip
          </motion.button>

          {/* Subtle scanlines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.1) 2px,
                rgba(255, 255, 255, 0.1) 4px
              )`,
            }}
          />

          {/* Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIntro;