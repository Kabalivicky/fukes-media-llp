
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorOptions {
  size?: number;
  color?: string;
  ringSize?: number;
  ringColor?: string;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

const useCursorEffect = (options: CursorOptions = {}) => {
  const {
    size = 12,
    color = 'rgba(255,255,255,0.7)',
    ringSize = 40,
    ringColor = 'rgba(255,255,255,0.2)',
    springConfig = { stiffness: 300, damping: 25, mass: 1 }
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  // Use motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add springs for smoother motion
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  // Ring follows with delay
  const ringX = useSpring(mouseX, { ...springConfig, stiffness: 200 });
  const ringY = useSpring(mouseY, { ...springConfig, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  // Render cursor component
  const CursorComponent = () => (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          width: isPointer ? size * 1.5 : size,
          height: isPointer ? size * 1.5 : size,
          backgroundColor: color,
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      
      {/* Ring around cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          width: isPointer ? ringSize * 1.2 : ringSize,
          height: isPointer ? ringSize * 1.2 : ringSize,
          borderColor: ringColor,
          borderWidth: '1px',
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s',
          scale: isPointer ? 1.2 : 1,
        }}
      />
    </>
  );

  return { CursorComponent, isVisible };
};

export default useCursorEffect;
