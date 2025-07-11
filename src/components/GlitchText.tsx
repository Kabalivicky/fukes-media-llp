import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  trigger?: boolean;
}

const GlitchText = ({ text, className = '', intensity = 'medium', trigger = false }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchedText, setGlitchedText] = useState(text);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const intensitySettings = {
    low: { duration: 0.1, probability: 0.1, interval: 3000 },
    medium: { duration: 0.15, probability: 0.2, interval: 2000 },
    high: { duration: 0.2, probability: 0.3, interval: 1000 }
  };

  const settings = intensitySettings[intensity];

  const glitchText = () => {
    let result = text;
    for (let i = 0; i < text.length; i++) {
      if (Math.random() < settings.probability) {
        result = result.slice(0, i) + glitchChars[Math.floor(Math.random() * glitchChars.length)] + result.slice(i + 1);
      }
    }
    return result;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (trigger || Math.random() < 0.3) {
        setIsGlitching(true);
        setGlitchedText(glitchText());
        
        setTimeout(() => {
          setGlitchedText(text);
          setIsGlitching(false);
        }, settings.duration * 1000);
      }
    }, settings.interval);

    return () => clearInterval(interval);
  }, [text, trigger, settings]);

  return (
    <motion.span
      className={`${className} ${isGlitching ? 'animate-glitch' : ''}`}
      style={{
        textShadow: isGlitching 
          ? `2px 0 hsl(var(--neon-red)), -2px 0 hsl(var(--neon-blue))` 
          : 'none',
        filter: isGlitching ? 'blur(0.5px)' : 'none'
      }}
      animate={{
        scale: isGlitching ? [1, 1.02, 1] : 1,
        skew: isGlitching ? [0, 2, 0] : 0
      }}
      transition={{ duration: 0.1 }}
    >
      {glitchedText}
    </motion.span>
  );
};

export default GlitchText;