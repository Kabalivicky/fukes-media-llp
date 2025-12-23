import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CursorFollowerProps {
  size?: number;
  color?: string;
  mixBlendMode?: 'difference' | 'exclusion' | 'normal';
}

/**
 * Magnetic cursor follower - inspired by Bruno Simon's interactive elements
 */
const CursorFollower = ({
  size = 20,
  color = 'hsl(var(--primary))',
  mixBlendMode = 'difference',
}: CursorFollowerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnterInteractive = () => {
      setIsHovering(true);
    };

    const handleMouseLeaveInteractive = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [mouseX, mouseY, size]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        width: size,
        height: size,
        backgroundColor: color,
        mixBlendMode,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        opacity: { duration: 0.2 },
      }}
    />
  );
};

export default CursorFollower;
