import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FloatingElementsProps {
  className?: string;
  variant?: 'circles' | 'lines' | 'dots' | 'mixed' | 'orbs' | 'particles' | 'geometric';
  density?: 'low' | 'medium' | 'high';
  colorScheme?: 'primary' | 'accent' | 'mixed';
  count?: number;
}

const FloatingElements = ({
  className = '',
  variant = 'mixed',
  density = 'medium',
  colorScheme = 'mixed',
  count: customCount,
}: FloatingElementsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const count = customCount ?? (density === 'low' ? 5 : density === 'medium' ? 10 : 15);
  
  const getColor = (index: number) => {
    if (colorScheme === 'primary') return 'bg-primary/20';
    if (colorScheme === 'accent') return 'bg-accent/20';
    return index % 2 === 0 ? 'bg-primary/15' : 'bg-accent/15';
  };

  const elements = Array.from({ length: count }, (_, i) => {
    const baseY = useTransform(
      scrollYProgress,
      [0, 1],
      [`${(i % 3) * 20}%`, `${-((i % 3) * 20 + 40)}%`]
    );
    
    const rotation = useTransform(
      scrollYProgress,
      [0, 1],
      [0, (i % 2 === 0 ? 1 : -1) * 180]
    );

    const scale = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [0.8, 1.2, 0.8]
    );

    const size = 20 + (i % 5) * 30;
    const left = (i * 11) % 100;
    const top = (i * 17) % 100;
    const delay = i * 0.1;

    const getShape = () => {
      if (variant === 'circles' || variant === 'orbs') return 'rounded-full';
      if (variant === 'lines') return 'rounded-full h-1';
      if (variant === 'dots' || variant === 'particles') return 'rounded-full';
      if (variant === 'geometric') {
        return i % 4 === 0 ? 'rounded-full' : i % 4 === 1 ? 'rounded-lg' : i % 4 === 2 ? 'rounded-none rotate-45' : 'rounded-full';
      }
      return i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rounded-lg' : 'rounded-full';
    };

    const getWidth = () => {
      if (variant === 'dots' || variant === 'particles') return 8;
      if (variant === 'lines') return size * 2;
      if (variant === 'orbs') return size * 1.5;
      return size;
    };

    const getHeight = () => {
      if (variant === 'lines') return 4;
      if (variant === 'dots' || variant === 'particles') return 8;
      if (variant === 'orbs') return size * 1.5;
      return size;
    };

    return (
      <motion.div
        key={i}
        className={`absolute ${getColor(i)} ${getShape()} blur-sm`}
        style={{
          width: getWidth(),
          height: getHeight(),
          left: `${left}%`,
          top: `${top}%`,
          y: baseY,
          rotate: rotation,
          scale,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          opacity: {
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay,
          },
        }}
      />
    );
  });

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements}
    </div>
  );
};

export default FloatingElements;
