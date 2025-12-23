import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  backgroundClassName?: string;
  speed?: number; // -1 to 1, negative = opposite direction
  scale?: boolean;
  rotate?: boolean;
  fade?: boolean;
  blur?: boolean;
  backgroundImage?: string;
  overlay?: boolean;
  overlayColor?: string;
}

const ParallaxSection = ({
  children,
  className = '',
  backgroundClassName = '',
  speed = 0.3,
  scale = false,
  rotate = false,
  fade = true,
  blur = false,
  backgroundImage,
  overlay = true,
  overlayColor = 'from-background/80 via-background/50 to-background/80',
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Smooth spring for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms
  const y = useTransform(smoothProgress, [0, 1], [`${-30 * speed}%`, `${30 * speed}%`]);
  const scaleValue = useTransform(smoothProgress, [0, 0.5, 1], scale ? [0.95, 1, 0.95] : [1, 1, 1]);
  const rotateValue = useTransform(smoothProgress, [0, 1], rotate ? [-2, 2] : [0, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], fade ? [0.3, 1, 1, 0.3] : [1, 1, 1, 1]);
  const blurValue = useTransform(smoothProgress, [0, 0.3, 0.7, 1], blur ? [4, 0, 0, 4] : [0, 0, 0, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background */}
      <motion.div
        className={`absolute inset-0 -z-10 ${backgroundClassName}`}
        style={{
          y,
          scale: scaleValue,
          rotate: rotateValue,
        }}
      >
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          
          {/* Floating orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            style={{ y: useTransform(smoothProgress, [0, 1], ['-20%', '20%']) }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
            style={{ y: useTransform(smoothProgress, [0, 1], ['20%', '-20%']) }}
          />
        </div>
        
        {/* Overlay */}
        {overlay && (
          <div className={`absolute inset-0 bg-gradient-to-b ${overlayColor}`} />
        )}
      </motion.div>

      {/* Content with fade and blur */}
      <motion.div
        style={{
          opacity,
          filter: useTransform(blurValue, (v) => `blur(${v}px)`),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;