import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import logoCircle from '@/assets/logo-circle-rgb.png';

const LoadingIntro = () => {
  const [phase, setPhase] = useState<'flicker' | 'blackout' | 'flare' | 'reveal' | 'waiting' | 'wipe' | 'done'>('flicker');
  const [flickerOpacity, setFlickerOpacity] = useState(0);
  const [countdownNumber, setCountdownNumber] = useState(5);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') !== 'true';
    }
    return true;
  });

  // Film reel flicker effect with countdown
  useEffect(() => {
    if (!shouldShow || phase !== 'flicker') return;
    const countdownInterval = setInterval(() => {
      setCountdownNumber(prev => {
        if (prev <= 1) { clearInterval(countdownInterval); return 1; }
        return prev - 1;
      });
    }, 400);
    const flickerInterval = setInterval(() => {
      setFlickerOpacity(Math.random() * 0.6 + 0.4);
    }, 80);
    return () => { clearInterval(countdownInterval); clearInterval(flickerInterval); };
  }, [shouldShow, phase]);

  useEffect(() => {
    if (!shouldShow) return;
    const t0 = setTimeout(() => setPhase('blackout'), 2200);
    const t1 = setTimeout(() => setPhase('flare'), 2500);
    const t2 = setTimeout(() => setPhase('reveal'), 4200);
    const t3 = setTimeout(() => { setPhase('waiting'); setShowEnterButton(true); }, 5500);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [shouldShow]);

  const handleEnter = useCallback(() => {
    setPhase('wipe');
    sessionStorage.setItem('hasSeenIntro', 'true');
    // After wipe animation completes, hide intro
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

  const brandColors = {
    red: '#C8102E',
    blue: '#0077B6',
    green: '#00A651',
  };

  const dustParticles = [...Array(30)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.4 + 0.1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  const isPreWipe = phase !== 'wipe' && phase !== 'done';

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black w-screen h-screen overflow-hidden z-[10000]"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'done' ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Film reel flicker overlay */}
          {phase === 'flicker' && (
            <>
              <motion.div
                className="absolute inset-0 z-50 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, 
                    rgba(255, 230, 180, ${flickerOpacity * 0.3}) 0%, 
                    rgba(180, 140, 80, ${flickerOpacity * 0.2}) 50%,
                    rgba(60, 40, 20, ${flickerOpacity * 0.4}) 100%)`,
                }}
              />
              {/* Sprocket holes */}
              <motion.div className="absolute left-0 top-0 bottom-0 w-8 z-50" style={{
                opacity: flickerOpacity * 0.6,
                background: `repeating-linear-gradient(180deg, transparent 0px, transparent 40px, rgba(0,0,0,0.8) 40px, rgba(0,0,0,0.8) 60px)`,
              }} />
              <motion.div className="absolute right-0 top-0 bottom-0 w-8 z-50" style={{
                opacity: flickerOpacity * 0.6,
                background: `repeating-linear-gradient(180deg, transparent 0px, transparent 40px, rgba(0,0,0,0.8) 40px, rgba(0,0,0,0.8) 60px)`,
              }} />
              {/* Countdown */}
              <motion.div className="absolute z-50 flex items-center justify-center" style={{ width: '180px', height: '180px' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: flickerOpacity > 0.4 ? 1 : 0.3, scale: [0.95, 1.05, 0.95] }}
                transition={{ scale: { duration: 0.4, repeat: Infinity, ease: "easeInOut" } }}
              >
                <div className="absolute inset-0 rounded-full" style={{ border: `3px solid rgba(255,255,255,${flickerOpacity * 0.5})` }} />
                <motion.div className="absolute inset-0 rounded-full"
                  style={{ border: '3px solid transparent', borderTopColor: `rgba(255,255,255,${flickerOpacity * 0.8})` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
                />
                <motion.span key={countdownNumber} className="text-white font-bold z-10"
                  style={{ fontSize: '72px', fontFamily: 'Georgia, serif', textShadow: '0 0 20px rgba(255,255,255,0.5)', opacity: flickerOpacity }}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: flickerOpacity }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {countdownNumber}
                </motion.span>
              </motion.div>
            </>
          )}

          {/* Film grain */}
          <motion.div className="absolute inset-0 pointer-events-none z-50"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              opacity: phase === 'flicker' ? 0.08 : 0.04,
            }}
          />

          {/* Dust particles */}
          {dustParticles.map((p) => (
            <motion.div key={p.id} className="absolute rounded-full bg-white/80"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isPreWipe ? [0, p.opacity, 0] : 0, y: [0, -30, -60] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {/* Lens flare burst */}
          <motion.div className="absolute" style={{
            width: '400px', height: '400px',
            background: `radial-gradient(circle, #FFF8F0 0%, ${brandColors.red}80 15%, ${brandColors.blue}40 35%, transparent 70%)`,
          }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === 'flare' ? [0, 3, 2] : phase === 'reveal' ? [2, 0.5, 0] : 0,
              opacity: phase === 'flare' ? [0, 1, 0.8] : phase === 'reveal' ? [0.8, 0.3, 0] : 0,
            }}
            transition={{ duration: phase === 'flare' ? 1.5 : 1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* RGB anamorphic streak */}
          <motion.div className="absolute w-[300vw] h-[3px]" style={{
            background: `linear-gradient(90deg, transparent 0%, ${brandColors.red}40 25%, ${brandColors.blue}80 40%, #FFF8F0 50%, ${brandColors.green}80 60%, ${brandColors.blue}40 75%, transparent 100%)`,
            boxShadow: `0 0 60px 15px ${brandColors.blue}50, 0 0 120px 30px ${brandColors.green}30`,
          }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase === 'flare' ? [0, 1.2, 1] : phase === 'reveal' ? [1, 0] : 0,
              opacity: phase === 'flare' ? [0, 0.9, 0.7] : phase === 'reveal' ? [0.7, 0] : 0,
            }}
            transition={{ duration: phase === 'flare' ? 1.2 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ==================== */}
          {/* CIRCULAR RGB LOGO - The centerpiece */}
          {/* ==================== */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: phase === 'reveal' || phase === 'waiting' ? 1 : phase === 'wipe' ? 0.6 : 0.5,
              opacity: phase === 'reveal' || phase === 'waiting' ? 1 : phase === 'wipe' ? 0 : 0,
            }}
            transition={{ duration: 1, delay: phase === 'reveal' ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Orbiting RGB glow behind logo */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '340px', height: '340px',
                background: `conic-gradient(from 0deg, ${brandColors.red}, ${brandColors.blue}, ${brandColors.green}, ${brandColors.red})`,
                filter: 'blur(40px)',
                opacity: 0.4,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* The circular logo image */}
            <motion.img
              src={logoCircle}
              alt="Fuke's Media"
              className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain relative z-10"
              style={{
                filter: `drop-shadow(0 0 40px ${brandColors.red}60) drop-shadow(0 0 60px ${brandColors.blue}40) drop-shadow(0 0 80px ${brandColors.green}30)`,
              }}
              animate={{
                filter: [
                  `drop-shadow(0 0 30px ${brandColors.red}60) drop-shadow(0 0 50px ${brandColors.blue}30)`,
                  `drop-shadow(0 0 30px ${brandColors.blue}60) drop-shadow(0 0 50px ${brandColors.green}30)`,
                  `drop-shadow(0 0 30px ${brandColors.green}60) drop-shadow(0 0 50px ${brandColors.red}30)`,
                  `drop-shadow(0 0 30px ${brandColors.red}60) drop-shadow(0 0 50px ${brandColors.blue}30)`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Tagline */}
            <motion.p
              className="mt-6 text-xs md:text-sm text-white/40 tracking-[0.5em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'waiting' || phase === 'reveal' ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              End-to-End Visual Production
            </motion.p>
          </motion.div>

          {/* ==================== */}
          {/* RGB GRADIENT WIPE - triggered on Enter click */}
          {/* ==================== */}
          {phase === 'wipe' && (
            <>
              {/* Expanding RGB ring from center */}
              <motion.div
                className="absolute z-[60] rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, ${brandColors.red}, ${brandColors.blue}, ${brandColors.green}, ${brandColors.red})`,
                }}
                initial={{ width: 0, height: 0, opacity: 1 }}
                animate={{
                  width: '300vmax',
                  height: '300vmax',
                  opacity: [1, 1, 0.8],
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* White flash at peak */}
              <motion.div
                className="absolute inset-0 z-[70] bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 0.8, 1, 0] }}
                transition={{ duration: 1.2, times: [0, 0.5, 0.7, 0.85, 1], ease: 'easeOut' }}
              />
            </>
          )}

          {/* Netflix-style Enter Button */}
          <AnimatePresence>
            {showEnterButton && phase === 'waiting' && (
              <motion.div
                className="absolute z-50 flex flex-col items-center"
                style={{ bottom: '12%' }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.button
                  onClick={handleEnter}
                  className="group relative flex items-center gap-3 px-10 py-4 rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${brandColors.red}30, ${brandColors.blue}30, ${brandColors.green}30)`,
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 40px ${brandColors.red}40, 0 0 60px ${brandColors.blue}30, 0 0 80px ${brandColors.green}20`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated RGB border sweep */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, ${brandColors.red}40, ${brandColors.blue}40, ${brandColors.green}40, transparent)`,
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMaskComposite: 'xor',
                      padding: '2px',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />

                  <Play className="w-5 h-5 text-white fill-white relative z-10" />
                  <span className="text-white text-sm md:text-base font-medium tracking-[0.2em] uppercase relative z-10">
                    Enter Site
                  </span>
                </motion.button>

                <motion.p
                  className="mt-4 text-white/30 text-xs tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Click to explore
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading bar */}
          <motion.div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: isPreWipe && phase !== 'waiting' ? 1 : 0 }}
          >
            <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${brandColors.red}, ${brandColors.blue}, ${brandColors.green})` }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Skip */}
          <motion.button
            className="absolute bottom-8 right-8 text-white/20 hover:text-white/50 text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 z-[80]"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase !== 'done' && phase !== 'wipe' ? 1 : 0 }}
            transition={{ delay: 1 }}
          >
            Skip
          </motion.button>

          {/* Letterbox bars */}
          <motion.div className="absolute top-0 left-0 right-0 h-[8%] bg-black z-40"
            animate={{ opacity: phase === 'wipe' ? 0 : 1 }} />
          <motion.div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black z-40"
            animate={{ opacity: phase === 'wipe' ? 0 : 1 }} />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none z-20"
            style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIntro;
