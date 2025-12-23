import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

type AnimationType = 
  | 'fadeUp' 
  | 'fadeDown' 
  | 'fadeLeft' 
  | 'fadeRight' 
  | 'zoomIn' 
  | 'zoomOut'
  | 'flipX'
  | 'flipY'
  | 'rotate'
  | 'blur'
  | 'slideUp'
  | 'bounceIn'
  | 'stagger';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  staggerChildren?: number;
}

const getAnimationVariants = (
  animation: AnimationType, 
  duration: number
): Variants => {
  const baseTransition = {
    duration,
    ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for smooth feel
  };

  const variants: Record<AnimationType, Variants> = {
    fadeUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: baseTransition }
    },
    fadeDown: {
      hidden: { opacity: 0, y: -60 },
      visible: { opacity: 1, y: 0, transition: baseTransition }
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -80 },
      visible: { opacity: 1, x: 0, transition: baseTransition }
    },
    fadeRight: {
      hidden: { opacity: 0, x: 80 },
      visible: { opacity: 1, x: 0, transition: baseTransition }
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: baseTransition }
    },
    zoomOut: {
      hidden: { opacity: 0, scale: 1.2 },
      visible: { opacity: 1, scale: 1, transition: baseTransition }
    },
    flipX: {
      hidden: { opacity: 0, rotateX: 90 },
      visible: { opacity: 1, rotateX: 0, transition: { ...baseTransition, duration: duration * 1.2 } }
    },
    flipY: {
      hidden: { opacity: 0, rotateY: 90 },
      visible: { opacity: 1, rotateY: 0, transition: { ...baseTransition, duration: duration * 1.2 } }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -15, scale: 0.9 },
      visible: { opacity: 1, rotate: 0, scale: 1, transition: baseTransition }
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(20px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transition: baseTransition }
    },
    slideUp: {
      hidden: { opacity: 0, y: 100, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          ...baseTransition, 
          type: 'spring', 
          stiffness: 100,
          damping: 15 
        } 
      }
    },
    bounceIn: {
      hidden: { opacity: 0, scale: 0.3 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          type: 'spring', 
          stiffness: 400, 
          damping: 10 
        } 
      }
    },
    stagger: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: baseTransition }
    }
  };

  return variants[animation];
};

const ScrollReveal = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  threshold = 0.2,
  staggerChildren = 0.1
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold,
    margin: "-50px 0px"
  });

  const variants = getAnimationVariants(animation, duration);

  // Add delay to the transition
  const variantsWithDelay: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as any).transition,
        delay,
        staggerChildren: animation === 'stagger' ? staggerChildren : 0
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variantsWithDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Child component for stagger animations
export const ScrollRevealItem = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
