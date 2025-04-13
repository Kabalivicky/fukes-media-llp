
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/components/ui/theme-provider';

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

const EnhancedBackground = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateX = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Generate random particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Create particles once dimensions are available
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const brandColors = [
      'rgba(0, 87, 183, 0.4)', // blue
      'rgba(213, 0, 50, 0.4)',  // red
      'rgba(0, 150, 57, 0.4)',  // green
      'rgba(255, 204, 0, 0.3)', // gold
    ];
    
    const newParticles = Array(30).fill(null).map(() => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 1 + 0.5,
      color: brandColors[Math.floor(Math.random() * brandColors.length)],
    }));
    
    setParticles(newParticles);
  }, [dimensions]);

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none"
      style={{ backgroundColor: theme === 'dark' ? '#030711' : '#f8fafc' }}
    >
      {/* Floating particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute rounded-full blur-md"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            y: [particle.y, particle.y + 100, particle.y],
            x: [particle.x, particle.x + (Math.random() * 50 - 25), particle.x],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 10 / particle.speed,
            ease: "easeInOut",
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        {/* Main background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br opacity-10"
          style={{ 
            backgroundImage: theme === 'dark' 
              ? 'radial-gradient(circle at 50% 50%, rgba(0, 87, 183, 0.3) 0%, rgba(3, 7, 17, 0) 70%)' 
              : 'radial-gradient(circle at 50% 50%, rgba(0, 87, 183, 0.1) 0%, rgba(248, 250, 252, 0) 70%)'
          }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Scrolling effect elements */}
        <motion.div 
          className="absolute -bottom-[600px] -right-[300px] w-[900px] h-[900px] rounded-full opacity-20 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(0,87,183,0.3) 0%, rgba(0,87,183,0) 70%)',
            y: translateY,
            scale,
          }}
        />
        
        <motion.div 
          className="absolute -top-[400px] -left-[200px] w-[700px] h-[700px] rounded-full opacity-15 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(213,0,50,0.2) 0%, rgba(213,0,50,0) 70%)',
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
            x: translateX,
          }}
        />
        
        <motion.div 
          className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(0,150,57,0.2) 0%, rgba(0,150,57,0) 70%)',
            y: useTransform(scrollYProgress, [0, 1], [0, -150]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 0.8]),
          }}
        />
      </div>
      
      {/* Grid pattern overlay with parallax */}
      <motion.div 
        className="absolute inset-0 bg-repeat opacity-5"
        style={{
          backgroundImage: `radial-gradient(${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
        }}
      />
      
      {/* Bottom gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[200px]"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to top, rgba(3,7,17,1), rgba(3,7,17,0))'
            : 'linear-gradient(to top, rgba(248,250,252,1), rgba(248,250,252,0))'
        }}
      />
    </motion.div>
  );
};

export default EnhancedBackground;
