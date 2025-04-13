
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ui/theme-provider';

interface GlowEffectProps {
  className?: string;
}

const GlowEffect = ({ className = '' }: GlowEffectProps) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create glow effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Calculate position relative to the container
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // Update CSS variables to position the glow
      container.style.setProperty('--glow-x', `${x}px`);
      container.style.setProperty('--glow-y', `${y}px`);
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%',
      } as React.CSSProperties}
    >
      {/* Subtle moving glow effect */}
      <div 
        className="absolute pointer-events-none"
        style={{
          left: 'var(--glow-x)',
          top: 'var(--glow-y)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(0, 87, 183, 0.15) 0%, rgba(213, 0, 50, 0.1) 35%, rgba(0, 150, 57, 0.05) 70%, transparent 100%)'
            : 'radial-gradient(circle, rgba(0, 87, 183, 0.1) 0%, rgba(213, 0, 50, 0.05) 35%, rgba(0, 150, 57, 0.03) 70%, transparent 100%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Random floating elements - brand colors */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={`glow-orb-${index}`}
          className="absolute rounded-full opacity-40 blur-xl"
          style={{
            width: `${Math.floor(Math.random() * 300) + 100}px`,
            height: `${Math.floor(Math.random() * 300) + 100}px`,
            left: `${Math.floor(Math.random() * 100)}%`,
            top: `${Math.floor(Math.random() * 100)}%`,
            backgroundColor: [
              'rgba(0, 87, 183, 0.2)',  // blue
              'rgba(213, 0, 50, 0.2)',   // red
              'rgba(0, 150, 57, 0.2)',   // green
              'rgba(255, 204, 0, 0.15)', // gold
              'rgba(0, 191, 255, 0.2)',  // cyan
            ][index],
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 15,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

export default GlowEffect;
