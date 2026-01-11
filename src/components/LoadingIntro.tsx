import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingIntro = () => {
  const [phase, setPhase] = useState<'flicker' | 'blackout' | 'flare' | 'reveal' | 'done'>('flicker');
  const [flickerOpacity, setFlickerOpacity] = useState(0);
  const [countdownNumber, setCountdownNumber] = useState(5);
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') !== 'true';
    }
    return true;
  });

  // Film reel flicker effect with countdown
  useEffect(() => {
    if (!shouldShow || phase !== 'flicker') return;
    
    // Countdown timer - each number shows for ~400ms
    const countdownInterval = setInterval(() => {
      setCountdownNumber(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 1;
        }
        return prev - 1;
      });
    }, 400);
    
    // Continuous flicker throughout countdown
    const flickerInterval = setInterval(() => {
      setFlickerOpacity(Math.random() * 0.6 + 0.4);
    }, 80);
    
    return () => {
      clearInterval(countdownInterval);
      clearInterval(flickerInterval);
    };
  }, [shouldShow, phase]);

  useEffect(() => {
    if (!shouldShow) return;
    
    // Phase 0: Film flicker with countdown (0-2.2s)
    // Phase 1: Blackout (2.2-2.5s)
    // Phase 2: Camera flare burst (2.5-4.2s)
    // Phase 3: Logo reveal (4.2-6.2s)
    // Phase 4: Done (6.2s+)
    const timer0 = setTimeout(() => setPhase('blackout'), 2200);
    const timer1 = setTimeout(() => setPhase('flare'), 2500);
    const timer2 = setTimeout(() => setPhase('reveal'), 4200);
    const timer3 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('hasSeenIntro', 'true');
    }, 6200);
    const timer4 = setTimeout(() => setShouldShow(false), 6500);
    
    return () => {
      clearTimeout(timer0);
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

  // Cinematic color palette - warmer, more filmic
  const colors = {
    warmWhite: '#FFF8F0',
    amber: '#FFBE0B',
    orange: '#FB5607',
    magenta: '#FF006E',
    cyan: '#3A86FF',
    coolBlue: '#4CC9F0',
  };

  // Generate dust particles for realism
  const dustParticles = [...Array(40)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.4 + 0.1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  // Realistic lens bokeh circles
  const bokehCircles = [...Array(12)].map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 80,
    y: (Math.random() - 0.5) * 60,
    size: Math.random() * 80 + 40,
    color: [colors.cyan, colors.amber, colors.magenta, colors.orange][i % 4],
    delay: Math.random() * 0.5,
  }));

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black w-screen h-screen overflow-hidden z-[10000]"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'done' ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Film reel flicker overlay */}
          {phase === 'flicker' && (
            <>
              {/* Warm sepia flicker */}
              <motion.div
                className="absolute inset-0 z-50 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, 
                    rgba(255, 230, 180, ${flickerOpacity * 0.3}) 0%, 
                    rgba(180, 140, 80, ${flickerOpacity * 0.2}) 50%,
                    rgba(60, 40, 20, ${flickerOpacity * 0.4}) 100%
                  )`,
                }}
              />
              
              {/* Film burn marks */}
              <motion.div
                className="absolute inset-0 z-50 pointer-events-none"
                style={{
                  opacity: flickerOpacity > 0.5 ? (flickerOpacity - 0.5) * 0.3 : 0,
                  background: `
                    radial-gradient(ellipse at 20% 30%, rgba(255, 200, 150, 0.4) 0%, transparent 30%),
                    radial-gradient(ellipse at 80% 70%, rgba(255, 180, 120, 0.3) 0%, transparent 25%),
                    radial-gradient(ellipse at 60% 20%, rgba(255, 220, 180, 0.2) 0%, transparent 20%)
                  `,
                }}
              />
              
              {/* Sprocket holes / frame edge simulation */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-8 z-50"
                style={{
                  opacity: flickerOpacity * 0.6,
                  background: `repeating-linear-gradient(
                    180deg,
                    transparent 0px,
                    transparent 40px,
                    rgba(0, 0, 0, 0.8) 40px,
                    rgba(0, 0, 0, 0.8) 60px
                  )`,
                }}
              />
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-8 z-50"
                style={{
                  opacity: flickerOpacity * 0.6,
                  background: `repeating-linear-gradient(
                    180deg,
                    transparent 0px,
                    transparent 40px,
                    rgba(0, 0, 0, 0.8) 40px,
                    rgba(0, 0, 0, 0.8) 60px
                  )`,
                }}
              />
              
              {/* Film scratches */}
              <motion.div
                className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
                style={{ opacity: flickerOpacity * 0.15 }}
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full"
                    style={{
                      left: `${15 + i * 18}%`,
                      width: '1px',
                      background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 80%, transparent 100%)',
                      transform: `translateY(${Math.random() * 20 - 10}%)`,
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Countdown circle with number */}
              <motion.div
                className="absolute z-50 flex items-center justify-center"
                style={{
                  width: '180px',
                  height: '180px',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: flickerOpacity > 0.4 ? 1 : 0.3,
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  scale: { duration: 0.4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Outer circle */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `3px solid rgba(255, 255, 255, ${flickerOpacity * 0.5})`,
                  }}
                />
                
                {/* Spinning arc indicator */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '3px solid transparent',
                    borderTopColor: `rgba(255, 255, 255, ${flickerOpacity * 0.8})`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner countdown number */}
                <motion.span
                  key={countdownNumber}
                  className="text-white font-bold z-10"
                  style={{
                    fontSize: '72px',
                    fontFamily: 'Georgia, serif',
                    textShadow: '0 0 20px rgba(255,255,255,0.5)',
                    opacity: flickerOpacity,
                  }}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: flickerOpacity }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {countdownNumber}
                </motion.span>
              </motion.div>
              
              {/* Cross hairs */}
              <div 
                className="absolute z-40"
                style={{ opacity: flickerOpacity * 0.3 }}
              >
                <div className="absolute w-[200px] h-[2px] bg-white/40 -translate-x-1/2" />
                <div className="absolute w-[2px] h-[200px] bg-white/40 -translate-y-1/2" />
              </div>
              
              {/* Corner frame marks */}
              <div className="absolute z-40" style={{ opacity: flickerOpacity * 0.4 }}>
                <div className="absolute w-6 h-6 border-l-2 border-t-2 border-white/50" style={{ top: '-100px', left: '-100px' }} />
                <div className="absolute w-6 h-6 border-r-2 border-t-2 border-white/50" style={{ top: '-100px', right: '-100px' }} />
                <div className="absolute w-6 h-6 border-l-2 border-b-2 border-white/50" style={{ bottom: '-100px', left: '-100px' }} />
                <div className="absolute w-6 h-6 border-r-2 border-b-2 border-white/50" style={{ bottom: '-100px', right: '-100px' }} />
              </div>
            </>
          )}

          {/* Film grain texture overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-50"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              opacity: phase === 'flicker' ? 0.08 : 0.04,
            }}
          />

          {/* Floating dust particles */}
          {dustParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white/80"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase !== 'done' ? [0, particle.opacity, 0] : 0,
                y: [0, -30, -60],
                x: [0, Math.random() * 20 - 10],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}

          {/* Main light source - cinematic warm flare */}
          <motion.div
            className="absolute"
            style={{
              width: '400px',
              height: '400px',
              background: `radial-gradient(circle, 
                ${colors.warmWhite} 0%, 
                ${colors.amber}80 15%, 
                ${colors.orange}40 35%, 
                transparent 70%
              )`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 'flare' ? [0, 3, 2] : phase === 'reveal' ? [2, 0.5, 0] : 0,
              opacity: phase === 'flare' ? [0, 1, 0.8] : phase === 'reveal' ? [0.8, 0.3, 0] : 0,
            }}
            transition={{
              duration: phase === 'flare' ? 1.5 : 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Realistic anamorphic horizontal streak */}
          <motion.div
            className="absolute w-[300vw] h-[3px]"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%,
                ${colors.coolBlue}00 10%,
                ${colors.coolBlue}40 25%,
                ${colors.cyan}80 40%,
                ${colors.warmWhite} 50%,
                ${colors.cyan}80 60%,
                ${colors.coolBlue}40 75%,
                ${colors.coolBlue}00 90%,
                transparent 100%
              )`,
              boxShadow: `
                0 0 60px 15px ${colors.cyan}50,
                0 0 120px 30px ${colors.coolBlue}30,
                0 -2px 40px 5px ${colors.cyan}40,
                0 2px 40px 5px ${colors.cyan}40
              `,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase === 'flare' ? [0, 1.2, 1] : phase === 'reveal' ? [1, 0] : 0,
              opacity: phase === 'flare' ? [0, 0.9, 0.7] : phase === 'reveal' ? [0.7, 0] : 0,
            }}
            transition={{
              duration: phase === 'flare' ? 1.2 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Secondary anamorphic streak - offset */}
          <motion.div
            className="absolute w-[200vw] h-[1px]"
            style={{
              top: 'calc(50% + 8px)',
              background: `linear-gradient(90deg, 
                transparent 0%,
                ${colors.magenta}30 30%,
                ${colors.magenta}60 50%,
                ${colors.magenta}30 70%,
                transparent 100%
              )`,
              boxShadow: `0 0 30px 5px ${colors.magenta}40`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase === 'flare' ? [0, 1] : phase === 'reveal' ? 0 : 0,
              opacity: phase === 'flare' ? [0, 0.5] : 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Vertical light leak */}
          <motion.div
            className="absolute w-[2px] h-[150vh]"
            style={{
              background: `linear-gradient(180deg, 
                transparent 0%,
                ${colors.amber}40 30%,
                ${colors.warmWhite}80 50%,
                ${colors.amber}40 70%,
                transparent 100%
              )`,
              boxShadow: `0 0 40px 10px ${colors.amber}30`,
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: phase === 'flare' ? [0, 1] : phase === 'reveal' ? [1, 0] : 0,
              opacity: phase === 'flare' ? [0, 0.6] : phase === 'reveal' ? [0.6, 0] : 0,
            }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Bokeh circles - realistic lens artifacts */}
          {bokehCircles.map((circle) => (
            <motion.div
              key={circle.id}
              className="absolute rounded-full"
              style={{
                width: circle.size,
                height: circle.size,
                border: `1px solid ${circle.color}30`,
                background: `radial-gradient(circle at 30% 30%, 
                  ${circle.color}15 0%, 
                  transparent 60%
                )`,
                boxShadow: `inset 0 0 20px ${circle.color}10`,
              }}
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x: phase === 'flare' || phase === 'reveal' ? circle.x : 0,
                y: phase === 'flare' || phase === 'reveal' ? circle.y : 0,
                scale: phase === 'flare' ? [0, 1.2, 1] : phase === 'reveal' ? [1, 0] : 0,
                opacity: phase === 'flare' ? [0, 0.4, 0.3] : phase === 'reveal' ? [0.3, 0] : 0,
              }}
              transition={{
                duration: 1.2,
                delay: circle.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}

          {/* Chromatic aberration ring */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              border: `2px solid transparent`,
              background: `
                linear-gradient(black, black) padding-box,
                linear-gradient(135deg, ${colors.cyan}, ${colors.magenta}, ${colors.amber}) border-box
              `,
              filter: 'blur(1px)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 'flare' ? [0.5, 1.5, 1.2] : phase === 'reveal' ? [1.2, 2, 0] : 0,
              opacity: phase === 'flare' ? [0, 0.4, 0.2] : phase === 'reveal' ? [0.2, 0] : 0,
            }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Light leak from edge - warm */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{
              background: `linear-gradient(135deg, 
                transparent 0%,
                ${colors.orange}10 50%,
                ${colors.amber}20 100%
              )`,
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: phase === 'flare' ? [0, 0.4, 0.2] : phase === 'reveal' ? [0.2, 0] : 0,
              x: phase === 'flare' ? [100, 0] : 0,
            }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Inner lens glow ring */}
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full"
            style={{
              background: 'transparent',
              boxShadow: `
                inset 0 0 60px 20px ${colors.warmWhite}20,
                0 0 80px 40px ${colors.amber}15
              `,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 'flare' ? [0, 1.5] : phase === 'reveal' ? [1.5, 0] : 0,
              opacity: phase === 'flare' ? [0, 0.6] : phase === 'reveal' ? [0.6, 0] : 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Logo reveal */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: phase === 'reveal' ? 1 : 0.9,
              opacity: phase === 'reveal' ? 1 : 0,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Subtle glow behind logo */}
            <motion.div
              className="absolute -inset-32 rounded-full"
              style={{
                background: `radial-gradient(ellipse, 
                  ${colors.warmWhite}10 0%, 
                  transparent 70%
                )`,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Logo */}
            <motion.img
              src="/lovable-uploads/98a66a3b-d5b0-4b14-891c-e5ee0f6dcbc3.png"
              alt="Fuke's Media"
              className="w-48 md:w-64 h-auto"
              style={{
                filter: `
                  drop-shadow(0 0 30px ${colors.warmWhite}40)
                  drop-shadow(0 0 60px ${colors.amber}20)
                `,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Brand name */}
            <motion.h1
              className="mt-8 text-3xl md:text-5xl font-light tracking-[0.3em] text-white"
              style={{
                textShadow: `0 0 40px ${colors.warmWhite}30`,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              FUKE'S MEDIA
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="mt-4 text-xs md:text-sm text-white/40 tracking-[0.5em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Visual Effects Studio
            </motion.p>
          </motion.div>

          {/* Elegant loading bar */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'done' ? 1 : 0 }}
          >
            <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/60 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Skip button */}
          <motion.button
            className="absolute bottom-8 right-8 text-white/20 hover:text-white/50 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'done' ? 1 : 0 }}
            transition={{ delay: 1 }}
          >
            Skip
          </motion.button>

          {/* Cinematic letterbox bars */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[8%] bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[8%] bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Subtle scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015] z-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                rgba(255, 255, 255, 0.03) 1px,
                rgba(255, 255, 255, 0.03) 2px
              )`,
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIntro;
