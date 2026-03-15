import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import logoCircle from '@/assets/logo-circle-rgb.png';

type Phase = 'flicker' | 'blackout' | 'flare' | 'reveal' | 'waiting' | 'wipe' | 'done';

const BRAND = {
  red: '#C8102E',
  blue: '#0077B6',
  green: '#00A651',
} as const;

const LoadingIntro = () => {
  const [phase, setPhase] = useState<Phase>('flicker');
  const [flickerOpacity, setFlickerOpacity] = useState(0);
  const [countdownNumber, setCountdownNumber] = useState(5);
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') !== 'true';
    }
    return true;
  });

  // Film reel flicker + countdown
  useEffect(() => {
    if (!shouldShow || phase !== 'flicker') return;
    const countdownId = setInterval(() => {
      setCountdownNumber(prev => {
        if (prev <= 1) { clearInterval(countdownId); return 1; }
        return prev - 1;
      });
    }, 400);
    const flickerId = setInterval(() => {
      setFlickerOpacity(Math.random() * 0.6 + 0.4);
    }, 80);
    return () => { clearInterval(countdownId); clearInterval(flickerId); };
  }, [shouldShow, phase]);

  // Phase transitions
  useEffect(() => {
    if (!shouldShow) return;
    const timers = [
      setTimeout(() => setPhase('blackout'), 2200),
      setTimeout(() => setPhase('flare'), 2500),
      setTimeout(() => setPhase('reveal'), 4200),
      setTimeout(() => setPhase('waiting'), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [shouldShow]);

  const handleEnter = useCallback(() => {
    setPhase('wipe');
    sessionStorage.setItem('hasSeenIntro', 'true');
    setTimeout(() => {
      setPhase('done');
      setTimeout(() => setShouldShow(false), 100);
    }, 1200);
  }, []);

  const handleSkip = useCallback(() => {
    setPhase('done');
    sessionStorage.setItem('hasSeenIntro', 'true');
    setTimeout(() => setShouldShow(false), 300);
  }, []);

  if (!shouldShow) return null;

  const isPreWipe = phase !== 'wipe' && phase !== 'done';

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black w-screen h-screen overflow-hidden"
          style={{ zIndex: 10000 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'done' ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Flicker overlay */}
          <FlickerOverlay phase={phase} flickerOpacity={flickerOpacity} countdownNumber={countdownNumber} />

          {/* Film grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 50,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              opacity: phase === 'flicker' ? 0.08 : 0.04,
            }}
          />

          {/* Dust particles */}
          <DustParticles isPreWipe={isPreWipe} />

          {/* Lens flare */}
          <LensFlare phase={phase} />

          {/* Logo section — click to enter */}
          <LogoReveal phase={phase} onEnter={handleEnter} />

          {/* Wipe transition */}
          {phase === 'wipe' && <WipeTransition />}

          {/* No separate enter button — logo circle handles entry */}

          {/* Loading bar */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-40"
            style={{ bottom: '5rem', zIndex: 30 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isPreWipe && phase !== 'waiting' ? 1 : 0 }}
          >
            <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${BRAND.red}, ${BRAND.blue}, ${BRAND.green})` }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Skip */}
          <motion.button
            className="absolute text-white/20 hover:text-white/50 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
            style={{ bottom: '2rem', right: '2rem', zIndex: 80 }}
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'done' && phase !== 'wipe' ? 1 : 0 }}
            transition={{ delay: 1 }}
          >
            Skip
          </motion.button>

          {/* Letterbox bars */}
          <motion.div className="absolute top-0 left-0 right-0 h-[8%] bg-black" style={{ zIndex: 40 }}
            animate={{ opacity: phase === 'wipe' ? 0 : 1 }} />
          <motion.div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black" style={{ zIndex: 40 }}
            animate={{ opacity: phase === 'wipe' ? 0 : 1 }} />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20,
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── Sub-components ─── */

const FlickerOverlay = ({ phase, flickerOpacity, countdownNumber }: { phase: string; flickerOpacity: number; countdownNumber: number }) => {
  if (phase !== 'flicker') return null;
  return (
    <>
      <motion.div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 50,
        background: `radial-gradient(ellipse at center, 
          rgba(255,230,180,${flickerOpacity * 0.3}) 0%, 
          rgba(180,140,80,${flickerOpacity * 0.2}) 50%,
          rgba(60,40,20,${flickerOpacity * 0.4}) 100%)`,
      }} />
      {/* Sprocket holes */}
      {['left-0', 'right-0'].map(pos => (
        <div key={pos} className={`absolute ${pos} top-0 bottom-0 w-8`} style={{
          zIndex: 50,
          opacity: flickerOpacity * 0.6,
          background: `repeating-linear-gradient(180deg, transparent 0px, transparent 40px, rgba(0,0,0,0.8) 40px, rgba(0,0,0,0.8) 60px)`,
        }} />
      ))}
      {/* Countdown */}
      <motion.div className="absolute flex items-center justify-center" style={{ width: 180, height: 180, zIndex: 50 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: flickerOpacity > 0.4 ? 1 : 0.3, scale: [0.95, 1.05, 0.95] }}
        transition={{ scale: { duration: 0.4, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <div className="absolute inset-0 rounded-full" style={{ border: `3px solid rgba(255,255,255,${flickerOpacity * 0.5})` }} />
        <motion.div className="absolute inset-0 rounded-full"
          style={{ border: '3px solid transparent', borderTopColor: `rgba(255,255,255,${flickerOpacity * 0.8})` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span key={countdownNumber} className="text-white font-bold" style={{
          zIndex: 10, fontSize: 72, fontFamily: 'Georgia, serif',
          textShadow: '0 0 20px rgba(255,255,255,0.5)', opacity: flickerOpacity,
        }}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: flickerOpacity }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {countdownNumber}
        </motion.span>
      </motion.div>
    </>
  );
};

const DustParticles = ({ isPreWipe }: { isPreWipe: boolean }) => {
  const particles = [...Array(20)].map((_, i) => ({
    id: i,
    x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, opacity: Math.random() * 0.4 + 0.1,
    delay: Math.random() * 2, duration: Math.random() * 3 + 2,
  }));
  return (
    <>
      {particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full bg-white/80"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isPreWipe ? [0, p.opacity, 0] : 0, y: [0, -30, -60] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </>
  );
};

const LensFlare = ({ phase }: { phase: string }) => (
  <>
    <motion.div className="absolute" style={{
      width: 400, height: 400,
      background: `radial-gradient(circle, #FFF8F0 0%, ${BRAND.red}80 15%, ${BRAND.blue}40 35%, transparent 70%)`,
    }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: phase === 'flare' ? [0, 3, 2] : phase === 'reveal' ? [2, 0.5, 0] : 0,
        opacity: phase === 'flare' ? [0, 1, 0.8] : phase === 'reveal' ? [0.8, 0.3, 0] : 0,
      }}
      transition={{ duration: phase === 'flare' ? 1.5 : 1, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.div className="absolute h-[3px]" style={{
      width: '300vw',
      background: `linear-gradient(90deg, transparent 0%, ${BRAND.red}40 25%, ${BRAND.blue}80 40%, #FFF8F0 50%, ${BRAND.green}80 60%, ${BRAND.blue}40 75%, transparent 100%)`,
      boxShadow: `0 0 60px 15px ${BRAND.blue}50, 0 0 120px 30px ${BRAND.green}30`,
    }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: phase === 'flare' ? [0, 1.2, 1] : phase === 'reveal' ? [1, 0] : 0,
        opacity: phase === 'flare' ? [0, 0.9, 0.7] : phase === 'reveal' ? [0.7, 0] : 0,
      }}
      transition={{ duration: phase === 'flare' ? 1.2 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
  </>
);

const LogoReveal = ({ phase, onEnter }: { phase: string; onEnter: () => void }) => (
  <motion.div
    className="relative flex flex-col items-center"
    style={{ zIndex: 10 }}
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{
      scale: phase === 'reveal' || phase === 'waiting' ? 1 : phase === 'wipe' ? 0.6 : 0.5,
      opacity: phase === 'reveal' || phase === 'waiting' ? 1 : phase === 'wipe' ? 0 : 0,
    }}
    transition={{ duration: 1, delay: phase === 'reveal' ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
  >
    {/* RGB glow behind logo — seamless circle, pulsing intensity */}
    <div className="absolute" style={{ width: 420, height: 420 }}>
      <motion.div className="absolute inset-0 rounded-full" style={{
        background: `radial-gradient(circle at 30% 20%, ${BRAND.red}, ${BRAND.red}80 30%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
        animate={{ rotate: 360, opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.08, 0.95] }}
        transition={{ rotate: { duration: 6, repeat: Infinity, ease: 'linear' }, opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div className="absolute inset-0 rounded-full" style={{
        background: `radial-gradient(circle at 70% 75%, ${BRAND.blue}, ${BRAND.blue}80 30%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
        animate={{ rotate: -360, opacity: [0.4, 0.7, 0.4], scale: [1.05, 0.92, 1.05] }}
        transition={{ rotate: { duration: 8, repeat: Infinity, ease: 'linear' }, opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
      />
      <motion.div className="absolute inset-0 rounded-full" style={{
        background: `radial-gradient(circle at 50% 85%, ${BRAND.green}, ${BRAND.green}80 30%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
        animate={{ rotate: 360, opacity: [0.35, 0.65, 0.35], scale: [0.98, 1.1, 0.98] }}
        transition={{ rotate: { duration: 10, repeat: Infinity, ease: 'linear' }, opacity: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }, scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } }}
      />
    </div>

    {/* Circular logo — clickable to enter */}
    <motion.button
      onClick={phase === 'waiting' ? onEnter : undefined}
      className="relative overflow-hidden rounded-full"
      style={{
        width: 'clamp(16rem, 25vw, 20rem)',
        height: 'clamp(16rem, 25vw, 20rem)',
        zIndex: 10,
        cursor: phase === 'waiting' ? 'pointer' : 'default',
        boxShadow: `0 0 40px ${BRAND.red}60, 0 0 60px ${BRAND.blue}40, 0 0 80px ${BRAND.green}30`,
        border: 'none',
        padding: 0,
        background: 'none',
      }}
      animate={{
        boxShadow: [
          `0 0 30px ${BRAND.red}60, 0 0 50px ${BRAND.blue}30`,
          `0 0 30px ${BRAND.blue}60, 0 0 50px ${BRAND.green}30`,
          `0 0 30px ${BRAND.green}60, 0 0 50px ${BRAND.red}30`,
          `0 0 30px ${BRAND.red}60, 0 0 50px ${BRAND.blue}30`,
        ],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={phase === 'waiting' ? {
        scale: 1.08,
        boxShadow: `0 0 60px ${BRAND.red}80, 0 0 90px ${BRAND.blue}60, 0 0 120px ${BRAND.green}50`,
      } : {}}
      whileTap={phase === 'waiting' ? { scale: 0.95 } : {}}
      aria-label="Enter site"
    >
      <img
        src={logoCircle}
        alt="Fuke's Media"
        className="w-full h-full object-cover"
        style={{ display: 'block' }}
      />
    </motion.button>

    {/* Tagline */}
    <motion.p className="mt-6 text-xs md:text-sm text-white/40 tracking-[0.5em] uppercase"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'waiting' || phase === 'reveal' ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      {phase === 'waiting' ? 'Click the logo to enter' : 'End-to-End Visual Production'}
    </motion.p>
  </motion.div>
);


const WipeTransition = () => (
  <>
    <motion.div className="absolute rounded-full" style={{
      zIndex: 60,
      background: `radial-gradient(circle at 30% 30%, ${BRAND.red}, transparent 50%), radial-gradient(circle at 70% 30%, ${BRAND.blue}, transparent 50%), radial-gradient(circle at 50% 70%, ${BRAND.green}, transparent 50%)`,
    }}
      initial={{ width: 0, height: 0, opacity: 1 }}
      animate={{ width: '300vmax', height: '300vmax', opacity: [1, 1, 0.8] }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.div className="absolute inset-0 bg-white" style={{ zIndex: 70 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 0.8, 1, 0] }}
      transition={{ duration: 1.2, times: [0, 0.5, 0.7, 0.85, 1], ease: 'easeOut' }}
    />
  </>
);

export default LoadingIntro;
