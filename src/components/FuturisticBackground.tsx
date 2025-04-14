
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/components/ui/theme-provider';
import ParallaxLines from './ParallaxLines';

interface FuturisticBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const FuturisticBackground = ({
  className = '',
  intensity = 'medium'
}: FuturisticBackgroundProps) => {
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Intensity settings
  const particleCount = {
    low: 15,
    medium: 30,
    high: 50
  };
  
  const gridOpacity = {
    low: 0.05,
    medium: 0.1,
    high: 0.15
  };
  
  // Transform values based on scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0.6]);
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br"
        style={{
          y: bgY,
          opacity: bgOpacity,
          background: theme === 'dark'
            ? 'radial-gradient(circle at 50% 50%, rgba(13, 13, 13, 1) 0%, rgba(0, 0, 0, 1) 100%)'
            : 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1) 0%, rgba(240, 240, 240, 1) 100%)'
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: theme === 'dark'
            ? `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), 
               linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: gridOpacity[intensity]
        }}
      />
      
      {/* Dynamic color gradients */}
      <motion.div 
        className="absolute w-full h-full opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 87, 183, 0.4) 0%, transparent 50%)',
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      <motion.div 
        className="absolute w-full h-full opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(213, 0, 50, 0.4) 0%, transparent 40%)',
          left: `${(1 - mousePosition.x) * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Parallax lines in different directions */}
      <ParallaxLines 
        count={10} 
        opacity={0.03} 
        thickness={1} 
        direction="vertical" 
      />
      <ParallaxLines 
        count={10} 
        opacity={0.02} 
        thickness={1} 
        direction="horizontal"
        className="opacity-30"
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array(particleCount[intensity]).fill(0).map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className={`absolute rounded-full ${
              theme === 'dark' ? 'bg-white' : 'bg-black'
            } blur-sm`}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              x: [
                0,
                Math.random() * 80 - 40,
                Math.random() * 80 - 40,
                0
              ],
              y: [
                0,
                Math.random() * 80 - 40,
                Math.random() * 80 - 40,
                0
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FuturisticBackground;
