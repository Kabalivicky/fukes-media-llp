import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSectionDividerProps {
  variant?: 'wave' | 'geometric' | 'diagonal' | 'dots' | 'hexagon';
  className?: string;
  inverted?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'muted';
}

const AnimatedSectionDivider = ({ 
  variant = 'wave', 
  className = '',
  inverted = false,
  color = 'primary'
}: AnimatedSectionDividerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const colorClasses = {
    primary: 'text-primary/20',
    secondary: 'text-secondary/30',
    accent: 'text-accent/25',
    muted: 'text-muted/40'
  };

  const renderWave = () => (
    <svg
      className={`w-full h-24 md:h-32 ${inverted ? 'rotate-180' : ''}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--fukes-blue))" stopOpacity="0.3" />
          <stop offset="50%" stopColor="hsl(var(--fukes-red))" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(var(--fukes-green))" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {/* Background wave */}
      <motion.path
        d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"
        fill="url(#waveGradient)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Animated wave line */}
      <motion.path
        d="M0,80 C240,40 480,100 720,60 C960,20 1200,80 1440,40"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
      />
      
      {/* Second animated line */}
      <motion.path
        d="M0,50 C360,90 720,30 1080,70 C1260,90 1380,50 1440,70"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.6 }}
      />
    </svg>
  );

  const renderGeometric = () => (
    <svg
      className={`w-full h-20 md:h-28 ${inverted ? 'rotate-180' : ''}`}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="geoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Triangular pattern */}
      {[...Array(12)].map((_, i) => (
        <motion.polygon
          key={i}
          points={`${i * 120},100 ${i * 120 + 60},${30 + (i % 2) * 40} ${i * 120 + 120},100`}
          fill="url(#geoGradient)"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        />
      ))}
      
      {/* Connecting lines */}
      <motion.path
        d="M0,100 L60,30 L120,100 L180,70 L240,100 L300,40 L360,100 L420,60 L480,100 L540,30 L600,100 L660,70 L720,100 L780,40 L840,100 L900,60 L960,100 L1020,30 L1080,100 L1140,70 L1200,100 L1260,40 L1320,100 L1380,60 L1440,100"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeOpacity="0.4"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );

  const renderDiagonal = () => (
    <svg
      className={`w-full h-16 md:h-24 ${inverted ? 'rotate-180' : ''}`}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="diagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--fukes-blue))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--fukes-green))" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Diagonal stripes */}
      {[...Array(20)].map((_, i) => (
        <motion.line
          key={i}
          x1={i * 80 - 40}
          y1="0"
          x2={i * 80 + 40}
          y2="80"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: i * 0.03 }}
        />
      ))}
      
      {/* Main diagonal */}
      <motion.polygon
        points="0,80 0,40 1440,0 1440,80"
        fill="url(#diagGradient)"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      />
    </svg>
  );

  const renderDots = () => (
    <div className={`w-full h-16 md:h-20 relative overflow-hidden ${inverted ? 'rotate-180' : ''}`}>
      <svg className="w-full h-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
        {[...Array(36)].map((_, i) => (
          <motion.circle
            key={i}
            cx={i * 40 + 20}
            cy={40 + Math.sin(i * 0.5) * 15}
            r={4 + Math.sin(i * 0.3) * 2}
            fill={`hsl(var(--${i % 3 === 0 ? 'fukes-blue' : i % 3 === 1 ? 'fukes-red' : 'fukes-green'}))`}
            fillOpacity={0.4}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.4 } : {}}
            transition={{ duration: 0.5, delay: i * 0.02 }}
          />
        ))}
        
        {/* Connecting curved line */}
        <motion.path
          d="M0,40 Q180,20 360,40 T720,40 T1080,40 T1440,40"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2 }}
        />
      </svg>
    </div>
  );

  const renderHexagon = () => (
    <svg
      className={`w-full h-20 md:h-28 ${inverted ? 'rotate-180' : ''}`}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--fukes-blue))" stopOpacity="0.2" />
          <stop offset="50%" stopColor="hsl(var(--fukes-red))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--fukes-green))" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Hexagonal pattern */}
      {[...Array(18)].map((_, i) => {
        const x = i * 80 + (i % 2) * 40;
        const y = 50;
        const size = 25;
        const points = Array.from({ length: 6 }, (_, j) => {
          const angle = (j * 60 - 30) * (Math.PI / 180);
          return `${x + size * Math.cos(angle)},${y + size * Math.sin(angle)}`;
        }).join(' ');
        
        return (
          <motion.polygon
            key={i}
            points={points}
            fill="url(#hexGradient)"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeOpacity="0.3"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.04 }}
          />
        );
      })}
    </svg>
  );

  const renderDivider = () => {
    switch (variant) {
      case 'wave': return renderWave();
      case 'geometric': return renderGeometric();
      case 'diagonal': return renderDiagonal();
      case 'dots': return renderDots();
      case 'hexagon': return renderHexagon();
      default: return renderWave();
    }
  };

  return (
    <div 
      ref={ref}
      className={`relative w-full overflow-hidden ${colorClasses[color]} ${className}`}
    >
      {renderDivider()}
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
    </div>
  );
};

export default AnimatedSectionDivider;
