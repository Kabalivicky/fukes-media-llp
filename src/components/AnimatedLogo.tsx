
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const AnimatedLogo = ({ className = '', size = 'md' }: AnimatedLogoProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  
  // Size mapping
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${sizeMap[size]} ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } },
      }}
    >
      <div className="relative w-full h-full perspective-1000">
        <motion.div
          className="absolute inset-0"
          initial={{ rotateY: 0 }}
          animate={{ 
            rotateY: [0, 10, -10, 0],
            rotateX: [0, -10, 5, 0],
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            repeat: Infinity,
          }}
        >
          <img 
            src="/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png"
            alt="Fuke's Media Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        {/* Glowing effects */}
        <motion.div
          className="absolute inset-0 -z-10 blur-xl opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(0,87,183,0.4) 0%, rgba(213,0,50,0.3) 100%)'
          }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3], 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 4, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        />
        
        {/* Particles around logo */}
        <div className="absolute inset-0 -z-10">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-primary/60 blur-sm"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedLogo;
