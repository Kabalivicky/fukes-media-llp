import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power } from 'lucide-react';

interface PowerOnIntroProps {
  onComplete: () => void;
}

const PowerOnIntro = ({ onComplete }: PowerOnIntroProps) => {
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handlePowerOn = () => {
    setIsPoweredOn(true);
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 800);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isPoweredOn 
                ? [
                    'radial-gradient(ellipse at center, hsl(0 84% 50% / 0.2) 0%, hsl(230 25% 7%) 70%)',
                    'radial-gradient(ellipse at center, hsl(217 100% 55% / 0.2) 0%, hsl(230 25% 7%) 70%)',
                    'radial-gradient(ellipse at center, hsl(145 100% 40% / 0.2) 0%, hsl(230 25% 7%) 70%)',
                  ]
                : 'hsl(230 25% 5%)'
            }}
            transition={{ duration: 2, repeat: isPoweredOn ? Infinity : 0 }}
          />

          {/* Animated gradient orbs */}
          {isPoweredOn && (
            <>
              <motion.div
                className="absolute w-96 h-96 rounded-full blur-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0.3],
                  scale: [0, 1.5, 1],
                  x: [-100, 100, -100],
                  y: [-50, 50, -50]
                }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{ background: 'hsl(0 84% 50% / 0.4)' }}
              />
              <motion.div
                className="absolute w-80 h-80 rounded-full blur-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.5, 0.3],
                  scale: [0, 1.3, 1],
                  x: [100, -100, 100],
                  y: [50, -50, 50]
                }}
                transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
                style={{ background: 'hsl(217 100% 55% / 0.4)' }}
              />
              <motion.div
                className="absolute w-72 h-72 rounded-full blur-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.4, 0.2],
                  scale: [0, 1.2, 0.8]
                }}
                transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
                style={{ background: 'hsl(145 100% 40% / 0.4)' }}
              />
            </>
          )}

          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Main content - Centered */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-8">
            {/* Power button */}
            <motion.button
              onClick={handlePowerOn}
              disabled={isPoweredOn}
              className={`relative group ${isPoweredOn ? 'cursor-default' : 'cursor-pointer'}`}
              whileHover={!isPoweredOn ? { scale: 1.05 } : {}}
              whileTap={!isPoweredOn ? { scale: 0.95 } : {}}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-[-20px] rounded-full"
                animate={{
                  background: isPoweredOn 
                    ? [
                        'radial-gradient(circle, hsl(0 84% 50% / 0.4) 0%, transparent 70%)',
                        'radial-gradient(circle, hsl(217 100% 55% / 0.4) 0%, transparent 70%)',
                        'radial-gradient(circle, hsl(145 100% 40% / 0.4) 0%, transparent 70%)',
                      ]
                    : 'radial-gradient(circle, hsl(0 0% 100% / 0.05) 0%, transparent 70%)',
                  scale: isPoweredOn ? [1, 1.3, 1] : [1, 1.1, 1]
                }}
                transition={{
                  duration: isPoweredOn ? 1.5 : 2,
                  repeat: Infinity,
                }}
              />

              {/* Power icon container */}
              <motion.div
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center"
                style={{
                  background: isPoweredOn 
                    ? 'linear-gradient(135deg, hsl(0 84% 50% / 0.2), hsl(217 100% 55% / 0.2), hsl(145 100% 40% / 0.2))'
                    : 'hsl(0 0% 100% / 0.03)',
                  border: isPoweredOn 
                    ? '2px solid hsl(0 0% 100% / 0.3)'
                    : '2px solid hsl(0 0% 100% / 0.1)'
                }}
                animate={{
                  boxShadow: isPoweredOn
                    ? [
                        '0 0 30px hsl(0 84% 50% / 0.4), inset 0 0 30px hsl(0 84% 50% / 0.1)',
                        '0 0 30px hsl(217 100% 55% / 0.4), inset 0 0 30px hsl(217 100% 55% / 0.1)',
                        '0 0 30px hsl(145 100% 40% / 0.4), inset 0 0 30px hsl(145 100% 40% / 0.1)',
                      ]
                    : '0 0 20px hsl(0 0% 100% / 0.05)'
                }}
                transition={{
                  duration: isPoweredOn ? 1.5 : 0.3,
                  repeat: isPoweredOn ? Infinity : 0,
                }}
              >
                <motion.div
                  animate={{
                    color: isPoweredOn 
                      ? ['hsl(0 84% 60%)', 'hsl(217 100% 65%)', 'hsl(145 100% 50%)']
                      : 'hsl(0 0% 100% / 0.4)'
                  }}
                  transition={{
                    duration: isPoweredOn ? 1.5 : 0.3,
                    repeat: isPoweredOn ? Infinity : 0,
                  }}
                >
                  <Power className="w-12 h-12 sm:w-16 sm:h-16" />
                </motion.div>
              </motion.div>

              {/* Pulse rings when not powered on */}
              {!isPoweredOn && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/20"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.4, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/20"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.4, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.7
                    }}
                  />
                </>
              )}
            </motion.button>

            {/* Text */}
            <motion.div
              className="text-center space-y-2"
              animate={{
                opacity: isPoweredOn ? [1, 0] : 1
              }}
              transition={{ duration: 0.5, delay: isPoweredOn ? 1.2 : 0 }}
            >
              <motion.h2
                className="text-xl sm:text-2xl font-display font-bold tracking-wider"
                style={{ color: isPoweredOn ? 'hsl(0 0% 100%)' : 'hsl(0 0% 100% / 0.7)' }}
              >
                {isPoweredOn ? 'INITIALIZING...' : 'CLICK TO POWER ON'}
              </motion.h2>
              {!isPoweredOn && (
                <motion.p
                  className="text-sm font-body tracking-wide"
                  style={{ color: 'hsl(0 0% 100% / 0.4)' }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Experience Fuke's Media
                </motion.p>
              )}
            </motion.div>

            {/* RGB Loading bars */}
            {isPoweredOn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-2 w-64 sm:w-80"
              >
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{ background: 'hsl(0 84% 50%)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{ background: 'hsl(217 100% 55%)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{ background: 'hsl(145 100% 40%)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                />
              </motion.div>
            )}
          </div>

          {/* Flash transition */}
          {isPoweredOn && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 1, delay: 1.2 }}
              style={{
                background: 'radial-gradient(circle at center, hsl(0 0% 100% / 0.8) 0%, transparent 70%)'
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PowerOnIntro;
