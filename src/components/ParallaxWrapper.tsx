import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number; // negative = slower, positive = faster
  direction?: 'vertical' | 'horizontal';
  className?: string;
  offset?: ['start end' | 'end start' | 'center center' | string, 'start end' | 'end start' | 'center center' | string];
}

/**
 * Wraps content with parallax scrolling effect
 * @param speed - parallax intensity (-1 to 1 recommended, negative = moves opposite to scroll)
 */
export const ParallaxWrapper = ({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
  offset = ['start end', 'end start']
}: ParallaxWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any
  });

  const yRange = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
  const xRange = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{
          y: direction === 'vertical' ? yRange : 0,
          x: direction === 'horizontal' ? xRange : 0
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  containerClassName?: string;
  scale?: boolean;
}

/**
 * Image with parallax effect - image moves within container
 */
export const ParallaxImage = ({
  src,
  alt,
  speed = 0.3,
  className = '',
  containerClassName = '',
  scale = true
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -50, speed * 50]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        style={{
          y,
          scale: scale ? scaleValue : 1
        }}
      />
    </div>
  );
};

interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number; // 0 = no parallax, higher = more parallax
  className?: string;
}

/**
 * Creates layered parallax effect - use multiple layers with different depths
 */
export const ParallaxLayer = ({
  children,
  depth = 1,
  className = ''
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [depth * -30, depth * 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, opacity }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxBackgroundProps {
  className?: string;
  variant?: 'orbs' | 'lines' | 'grid' | 'gradient';
}

/**
 * Pre-built parallax background effects
 */
export const ParallaxBackground = ({
  className = '',
  variant = 'orbs'
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  if (variant === 'orbs') {
    return (
      <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl -top-48 -left-48"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl top-1/4 -right-64"
          style={{ y: y2 }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-secondary/10 blur-2xl bottom-1/4 left-1/4"
          style={{ y: y3 }}
        />
      </div>
    );
  }

  if (variant === 'lines') {
    return (
      <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
            style={{
              y: i % 2 === 0 ? y1 : y2,
              top: `${(i + 1) * 20}%`,
              left: 0,
              right: 0
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute inset-0"
          style={{
            y: y2,
            backgroundImage: `
              linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground) / 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        <motion.div
          className="absolute w-full h-full"
          style={{ rotate }}
        >
          <div className="absolute top-1/2 left-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 h-[200%] w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-y-1/2" />
        </motion.div>
      </div>
    );
  }

  // gradient variant
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-secondary/5 to-transparent"
        style={{ y: y2 }}
      />
    </div>
  );
};

export default ParallaxWrapper;
