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
  // Smoother easing curve
  const ease = [0.25, 0.1, 0.25, 1] as const;
  const baseTransition = { duration, ease };

  const variants: Record<AnimationType, Variants> = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: baseTransition }
    },
    fadeDown: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0, transition: baseTransition }
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: baseTransition }
    },
    fadeRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: baseTransition }
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: baseTransition }
    },
    zoomOut: {
      hidden: { opacity: 0, scale: 1.1 },
      visible: { opacity: 1, scale: 1, transition: baseTransition }
    },
    flipX: {
      hidden: { opacity: 0, rotateX: 60 },
      visible: { opacity: 1, rotateX: 0, transition: { ...baseTransition, duration: duration * 1.2 } }
    },
    flipY: {
      hidden: { opacity: 0, rotateY: 60 },
      visible: { opacity: 1, rotateY: 0, transition: { ...baseTransition, duration: duration * 1.2 } }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10, scale: 0.95 },
      visible: { opacity: 1, rotate: 0, scale: 1, transition: baseTransition }
    },
    // Use opacity-only instead of filter:blur for performance
    blur: {
      hidden: { opacity: 0, scale: 0.97 },
      visible: { opacity: 1, scale: 1, transition: baseTransition }
    },
    slideUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          type: 'spring', 
          stiffness: 80,
          damping: 18 
        } 
      }
    },
    bounceIn: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          type: 'spring', 
          stiffness: 300, 
          damping: 15 
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
  duration = 0.5,
  className = '',
  once = true,
  threshold = 0.15,
  staggerChildren = 0.08
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold,
    margin: "-30px 0px"
  });

  const variants = getAnimationVariants(animation, duration);

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
      style={{ willChange: isInView ? 'auto' : 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealItem = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
