import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from './ui/theme-provider';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
}

const EnhancedCursor = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const trailY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Create particle trail
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: Math.random() * 4 + 2,
        color: theme === 'dark' ? 
          `hsl(${210 + Math.random() * 30}, ${70 + Math.random() * 30}%, ${60 + Math.random() * 20}%)` :
          `hsl(${210 + Math.random() * 30}, ${60 + Math.random() * 20}%, ${40 + Math.random() * 20}%)`
      };

      setParticles(prev => [...prev.slice(-15), newParticle]);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mouseleave', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mouseleave', handleMouseOut);
    };
  }, [cursorX, cursorY, theme]);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            opacity: particle.opacity - 0.05,
            size: particle.size * 0.98
          }))
          .filter(particle => particle.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Custom cursor style */}
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            cursor: none !important;
          }
          
          a, button, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
        `
      }} />

      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-full h-full bg-primary rounded-full" />
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] mix-blend-difference opacity-30"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <div className="w-full h-full border-2 border-primary rounded-full" />
      </motion.div>

      {/* Particle trail */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[9997] rounded-full mix-blend-screen"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            opacity: particle.opacity,
            scale: [1, 0],
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}

      {/* Spotlight effect */}
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[9996]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            opacity: isHovering ? 0.1 : 0.05,
          }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,87,183,0.05)'} 0%, transparent 70%)`
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default EnhancedCursor;