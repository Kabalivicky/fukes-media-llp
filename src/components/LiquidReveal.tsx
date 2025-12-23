import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface LiquidRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'center';
}

/**
 * Liquid mask reveal animation - inspired by Obys agency
 * Creates a fluid, paint-like reveal effect
 */
const LiquidReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: LiquidRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const clipPaths: Record<string, { hidden: string; visible: string }> = {
    up: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0% 0 0 0)',
    },
    down: {
      hidden: 'inset(0 0 100% 0)',
      visible: 'inset(0 0 0% 0)',
    },
    left: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0% 0 0)',
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0%)',
    },
    center: {
      hidden: 'inset(50% 50% 50% 50%)',
      visible: 'inset(0% 0% 0% 0%)',
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        clipPath: clipPaths[direction].hidden,
        opacity: 0,
      }}
      animate={isInView ? { 
        clipPath: clipPaths[direction].visible,
        opacity: 1,
      } : undefined}
      transition={{
        clipPath: {
          duration: 1,
          delay,
          ease: [0.65, 0, 0.35, 1],
        },
        opacity: {
          duration: 0.3,
          delay,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger reveal for grid items
 */
interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export const StaggerReveal = ({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LiquidReveal;
