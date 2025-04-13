
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/components/ui/theme-provider';

interface ParallaxLinesProps {
  count?: number;
  color?: string;
  opacity?: number;
  thickness?: number;
  speed?: number;
  className?: string;
}

const ParallaxLines = ({ 
  count = 10, 
  color,
  opacity = 0.05, 
  thickness = 1, 
  speed = 1,
  className = '' 
}: ParallaxLinesProps) => {
  const ref = useRef(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Default colors based on theme
  const defaultColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const lineColor = color || defaultColor;

  const lines = Array(count).fill(0).map((_, i) => {
    // Create varying speeds for different lines
    const lineSpeed = speed * (0.8 + (i / count) * 0.4);
    
    // Transform each line with a different rate
    const y = useTransform(
      scrollYProgress, 
      [0, 1], 
      [0, -100 * lineSpeed]
    );
    
    // Calculate positions across viewport with spacing
    const position = `${(i / count) * 100}%`;
    
    return (
      <motion.div
        key={`parallax-line-${i}`}
        className="absolute h-full"
        style={{
          left: position,
          width: `${thickness}px`,
          backgroundColor: lineColor,
          opacity: opacity * (0.5 + (i / count) * 0.5), // Varying opacity
          y
        }}
      />
    );
  });

  return (
    <div 
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {lines}
    </div>
  );
};

export default ParallaxLines;
