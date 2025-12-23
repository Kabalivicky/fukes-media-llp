import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface CursorFollowerProps {
  size?: number;
  color?: string;
  mixBlendMode?: 'difference' | 'exclusion' | 'normal';
}

/**
 * Magnetic cursor follower with smooth spring physics
 */
const CursorFollower = ({
  size = 20,
  color = 'hsl(var(--primary))',
  mixBlendMode = 'difference',
}: CursorFollowerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverTarget, setHoverTarget] = useState<DOMRect | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Outer ring with slower follow
  const outerSpringConfig = { damping: 30, stiffness: 200, mass: 1 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  // Rotate based on velocity
  const rotation = useTransform(
    [cursorX, cursorY],
    ([x, y]: number[]) => {
      const vx = x - mouseX.get();
      return vx * 0.5;
    }
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    let targetX = e.clientX - size / 2;
    let targetY = e.clientY - size / 2;

    // Magnetic effect when hovering interactive elements
    if (hoverTarget) {
      const centerX = hoverTarget.left + hoverTarget.width / 2 - size / 2;
      const centerY = hoverTarget.top + hoverTarget.height / 2 - size / 2;
      const distX = e.clientX - (hoverTarget.left + hoverTarget.width / 2);
      const distY = e.clientY - (hoverTarget.top + hoverTarget.height / 2);
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDist = Math.max(hoverTarget.width, hoverTarget.height);
      
      if (distance < maxDist) {
        const magnetStrength = 0.4;
        targetX = targetX + (centerX - targetX) * magnetStrength;
        targetY = targetY + (centerY - targetY) * magnetStrength;
      }
    }

    mouseX.set(targetX);
    mouseY.set(targetY);
    setIsVisible(true);
  }, [mouseX, mouseY, size, hoverTarget]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  useEffect(() => {
    const handleMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      setHoverTarget(target.getBoundingClientRect());
    };

    const handleMouseLeaveInteractive = () => {
      setIsHovering(false);
      setHoverTarget(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover detection for interactive elements
    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-magnetic]';
    const interactiveElements = document.querySelectorAll(interactiveSelector);
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const elements = node.querySelectorAll(interactiveSelector);
            elements.forEach((el) => {
              el.addEventListener('mouseenter', handleMouseEnterInteractive);
              el.addEventListener('mouseleave', handleMouseLeaveInteractive);
            });
            if (node.matches(interactiveSelector)) {
              node.addEventListener('mouseenter', handleMouseEnterInteractive);
              node.addEventListener('mouseleave', handleMouseLeaveInteractive);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseDown, handleMouseUp]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block border-2"
        style={{
          x: outerX,
          y: outerY,
          width: size * 2.5,
          height: size * 2.5,
          marginLeft: -(size * 0.75),
          marginTop: -(size * 0.75),
          borderColor: color,
        }}
        animate={{
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      />
      
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          width: size,
          height: size,
          backgroundColor: color,
          mixBlendMode,
          rotate: rotation,
        }}
        animate={{
          scale: isHovering ? 0.5 : isClicking ? 0.7 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 400, damping: 15 },
          opacity: { duration: 0.15 },
        }}
      />
    </>
  );
};

export default CursorFollower;
