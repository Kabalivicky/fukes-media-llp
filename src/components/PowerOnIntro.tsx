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
    // Wait for RGB animation to complete before transitioning to site
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 1000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{
            background: isPoweredOn 
              ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))' 
              : '#0a0a0a'
          }}
        >
          {/* Scanline effect for powered-off state */}
          {!isPoweredOn && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)'
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Vignette effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)'
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-8">
            {/* Power button */}
            <motion.button
              onClick={handlePowerOn}
              disabled={isPoweredOn}
              className={`relative group ${isPoweredOn ? 'cursor-default' : 'cursor-pointer'}`}
              whileHover={!isPoweredOn ? { scale: 1.1 } : {}}
              whileTap={!isPoweredOn ? { scale: 0.95 } : {}}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl"
                animate={{
                  background: isPoweredOn 
                    ? [
                        'radial-gradient(circle, rgba(255, 0, 0, 0.5) 0%, transparent 70%)',
                        'radial-gradient(circle, rgba(0, 255, 0, 0.5) 0%, transparent 70%)',
                        'radial-gradient(circle, rgba(0, 0, 255, 0.5) 0%, transparent 70%)',
                        'radial-gradient(circle, rgba(255, 0, 0, 0.5) 0%, transparent 70%)',
                      ]
                    : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                  scale: isPoweredOn ? [1, 1.2, 1.5, 1.2, 1] : 1
                }}
                transition={{
                  duration: isPoweredOn ? 2 : 0,
                  repeat: isPoweredOn ? Infinity : 0,
                }}
              />

              {/* Power icon */}
              <motion.div
                className="relative w-32 h-32 rounded-full border-4 flex items-center justify-center"
                style={{
                  borderColor: isPoweredOn ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)',
                  background: isPoweredOn 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.05)'
                }}
                animate={{
                  borderColor: isPoweredOn 
                    ? [
                        'rgba(255, 0, 0, 0.8)',
                        'rgba(0, 255, 0, 0.8)',
                        'rgba(0, 0, 255, 0.8)',
                        'rgba(255, 0, 0, 0.8)',
                      ]
                    : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: isPoweredOn
                    ? [
                        '0 0 30px rgba(255, 0, 0, 0.5)',
                        '0 0 30px rgba(0, 255, 0, 0.5)',
                        '0 0 30px rgba(0, 0, 255, 0.5)',
                        '0 0 30px rgba(255, 0, 0, 0.5)',
                      ]
                    : '0 0 10px rgba(255, 255, 255, 0.1)',
                }}
                transition={{
                  duration: isPoweredOn ? 2 : 0.3,
                  repeat: isPoweredOn ? Infinity : 0,
                }}
              >
                <Power 
                  className="w-16 h-16 transition-colors duration-300"
                  style={{
                    color: isPoweredOn ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'
                  }}
                />
              </motion.div>

              {/* Pulse rings when not powered on */}
              {!isPoweredOn && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/20"
                    animate={{
                      scale: [1, 1.5, 1.5],
                      opacity: [0.5, 0, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/20"
                    animate={{
                      scale: [1, 1.5, 1.5],
                      opacity: [0.5, 0, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 1
                    }}
                  />
                </>
              )}
            </motion.button>

            {/* Text */}
            <motion.div
              className="text-center"
              animate={{
                opacity: isPoweredOn ? [1, 0] : 1
              }}
              transition={{ duration: 0.5, delay: isPoweredOn ? 1.5 : 0 }}
            >
              <motion.p
                className="text-2xl font-display font-bold mb-2"
                style={{
                  color: isPoweredOn ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'
                }}
              >
                {isPoweredOn ? 'Powering On...' : 'Click to Power On'}
              </motion.p>
              {!isPoweredOn && (
                <motion.p
                  className="text-sm font-body"
                  style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                  animate={{
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Experience Fuke's Media
                </motion.p>
              )}
            </motion.div>

            {/* RGB color bars animation when powered on */}
            {isPoweredOn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 space-y-2"
              >
                <motion.div
                  className="h-2 rounded-full"
                  animate={{
                    background: [
                      'linear-gradient(90deg, #ff0000 0%, #ff0000 100%)',
                      'linear-gradient(90deg, #ff0000 0%, #ffffff 100%)',
                    ],
                    width: ['0%', '100%']
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <motion.div
                  className="h-2 rounded-full"
                  animate={{
                    background: [
                      'linear-gradient(90deg, #00ff00 0%, #00ff00 100%)',
                      'linear-gradient(90deg, #00ff00 0%, #ffffff 100%)',
                    ],
                    width: ['0%', '100%']
                  }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <motion.div
                  className="h-2 rounded-full"
                  animate={{
                    background: [
                      'linear-gradient(90deg, #0000ff 0%, #0000ff 100%)',
                      'linear-gradient(90deg, #0000ff 0%, #ffffff 100%)',
                    ],
                    width: ['0%', '100%']
                  }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </motion.div>
            )}
          </div>

          {/* Full screen flash transition */}
          {isPoweredOn && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.5, delay: 1 }}
              style={{
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, transparent 70%)'
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PowerOnIntro;
