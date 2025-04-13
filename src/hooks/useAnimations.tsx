
import { useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

type AnimationVariant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'bounce';

interface AnimationOptions {
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
  easing?: string;
}

const useAnimations = (ref: React.RefObject<HTMLElement>, options: AnimationOptions = {}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(ref, { 
    once: options.once !== undefined ? options.once : true,
    amount: options.threshold || 0.2,
  });
  
  const getAnimationVariants = (variant: AnimationVariant) => {
    const duration = options.duration || 0.5;
    const delay = options.delay || 0;
    const easing = options.easing || 'easeOut';
    
    const variants = {
      fadeUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration, 
            delay,
            ease: easing
          } 
        }
      },
      fadeIn: {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            duration, 
            delay,
            ease: easing
          } 
        }
      },
      slideLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: { 
            duration, 
            delay,
            ease: easing
          } 
        }
      },
      slideRight: {
        hidden: { opacity: 0, x: 50 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: { 
            duration, 
            delay,
            ease: easing
          } 
        }
      },
      zoomIn: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: { 
            duration, 
            delay,
            ease: easing
          } 
        }
      },
      bounce: {
        hidden: { opacity: 0, y: -20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 10,
            delay
          } 
        }
      }
    };
    
    return variants[variant];
  };
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  
  return {
    isInView,
    hasAnimated,
    getAnimationVariants,
    variants: {
      fadeUp: getAnimationVariants('fadeUp'),
      fadeIn: getAnimationVariants('fadeIn'),
      slideLeft: getAnimationVariants('slideLeft'),
      slideRight: getAnimationVariants('slideRight'),
      zoomIn: getAnimationVariants('zoomIn'),
      bounce: getAnimationVariants('bounce'),
    },
    reset: () => setHasAnimated(false),
  };
};

export default useAnimations;
