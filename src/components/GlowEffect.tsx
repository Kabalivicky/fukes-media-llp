
import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from '@/components/ui/theme-provider';

interface GlowEffectProps {
  className?: string;
}

const GlowEffect = ({ className = '' }: GlowEffectProps) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Use springs for smoother mouse following
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // State for extra floating elements
  const [randomPos, setRandomPos] = useState<{ x: number, y: number }[]>(
    Array(8).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }))
  );
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create glow effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Calculate position relative to the viewport
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  // Colors based on theme
  const glowColors = {
    dark: {
      primary: 'rgba(0, 87, 183, 0.15)',
      secondary: 'rgba(213, 0, 50, 0.1)',
      tertiary: 'rgba(0, 150, 57, 0.05)',
    },
    light: {
      primary: 'rgba(0, 87, 183, 0.1)',
      secondary: 'rgba(213, 0, 50, 0.05)',
      tertiary: 'rgba(0, 150, 57, 0.03)',
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Cursor glow follow effect - smoother with springs */}
      <motion.div 
        className="absolute pointer-events-none"
        style={{
          left: springX,
          top: springY,
          width: '500px',
          height: '500px',
          x: '-50%',
          y: '-50%',
          borderRadius: '50%',
          background: theme === 'dark' 
            ? `radial-gradient(circle, ${glowColors.dark.primary} 0%, ${glowColors.dark.secondary} 35%, ${glowColors.dark.tertiary} 70%, transparent 100%)`
            : `radial-gradient(circle, ${glowColors.light.primary} 0%, ${glowColors.light.secondary} 35%, ${glowColors.light.tertiary} 70%, transparent 100%)`,
          filter: 'blur(40px)',
        }}
      />
      
      {/* Background ambient glow circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute blur-3xl opacity-20 bg-fukes-blue/20"
          animate={{
            left: ['0%', '30%', '0%'],
            top: ['0%', '20%', '0%'],
            width: ['30vw', '35vw', '30vw'],
            height: ['30vh', '35vh', '30vh'],
            borderRadius: '50%',
          }}
          transition={{ 
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute blur-3xl opacity-20 bg-fukes-red/20"
          animate={{
            right: ['10%', '0%', '10%'],
            bottom: ['10%', '30%', '10%'],
            width: ['40vw', '35vw', '40vw'],
            height: ['40vh', '35vh', '40vh'],
            borderRadius: '50%',
          }}
          transition={{ 
            duration: 30,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute blur-3xl opacity-20 bg-fukes-green/20"
          animate={{
            left: ['60%', '30%', '60%'],
            top: ['60%', '50%', '60%'],
            width: ['25vw', '30vw', '25vw'],
            height: ['25vh', '30vh', '25vh'],
            borderRadius: '50%',
          }}
          transition={{ 
            duration: 28,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      {/* Random floating elements - brand colors */}
      {randomPos.map((pos, index) => (
        <motion.div
          key={`glow-orb-${index}`}
          className="absolute rounded-full blur-xl"
          style={{
            width: `${Math.floor(Math.random() * 300) + 100}px`,
            height: `${Math.floor(Math.random() * 300) + 100}px`,
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            backgroundColor: [
              'rgba(0, 87, 183, 0.2)',  // blue
              'rgba(213, 0, 50, 0.2)',   // red
              'rgba(0, 150, 57, 0.2)',   // green
              'rgba(255, 204, 0, 0.15)', // gold
              'rgba(0, 191, 255, 0.2)',  // cyan
              'rgba(0, 87, 183, 0.2)',   // blue
              'rgba(213, 0, 50, 0.2)',   // red
              'rgba(0, 150, 57, 0.2)',   // green
            ][index % 8],
            opacity: theme === 'dark' ? 0.3 : 0.15,
          }}
          animate={{
            x: [0, Math.random() * 80 - 40, 0],
            y: [0, Math.random() * 80 - 40, 0],
            scale: [1, Math.random() * 0.3 + 0.8, 1],
            opacity: theme === 'dark' ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      
      {/* Grid lines overlay */}
      <motion.div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default GlowEffect;
