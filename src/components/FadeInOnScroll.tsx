import { useRef, ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
}

const FadeInOnScroll = ({ 
  children, 
  className = '', 
  threshold = 0.1,
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 0.7,
  once = true
}: FadeInOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold,
    margin: "-30px 0px"
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { x: 0, y: distance };
      case 'down': return { x: 0, y: -distance };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      case 'none': return { x: 0, y: 0 };
      default: return { x: 0, y: distance };
    }
  };

  const initialPos = getInitialPosition();

  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      x: initialPos.x, 
      y: initialPos.y,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        delay: delay / 1000, // Convert ms to seconds
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div 
      ref={ref} 
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
