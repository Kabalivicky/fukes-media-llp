
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useTheme } from '@/components/ui/theme-provider';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
  withParticles?: boolean;
  showStrip?: boolean;
}

const AnimatedLogo = ({ 
  className = '', 
  size = 'md', 
  showGlow = true,
  withParticles = true,
  showStrip = true
}: AnimatedLogoProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { theme } = useTheme();
  const [logoSrc, setLogoSrc] = useState('');
  const [logoError, setLogoError] = useState(false);
  
  // Size mapping
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };
  
  // Update logo based on theme using the new transparent logos
  useEffect(() => {
    setLogoError(false);
    if (theme === 'dark') {
      // Use the white logo for dark theme
      setLogoSrc('/lovable-uploads/944a6085-c5b4-40f4-9860-cd0c9bf5f682.png');
    } else {
      // Use the black logo for light theme
      setLogoSrc('/lovable-uploads/c679f808-3ebc-4220-b64f-90bed70e9847.png');
    }
  }, [theme]);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const handleImageError = () => {
    setLogoError(true);
  };
  
  // Fallback logo component
  const FallbackLogo = () => (
    <div className={`${sizeMap[size]} flex items-center justify-center bg-gradient-to-br from-fukes-blue to-fukes-red rounded-lg text-white font-bold text-xl`}>
      FM
    </div>
  );
  
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
          className="absolute inset-0 flex items-center justify-center"
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
          {logoError ? (
            <FallbackLogo />
          ) : (
            <img 
              src={logoSrc}
              alt="Fuke's Media Logo"
              className="w-full h-full object-contain"
              onError={handleImageError}
              onLoad={() => setLogoError(false)}
            />
          )}
        </motion.div>
        
        {/* Design strip element */}
        {showStrip && (
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img 
              src="/lovable-uploads/de05f56b-a2c6-43b6-b516-77732a316239.png"
              alt="Design Accent"
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
        
        {/* Glowing effects - theme adaptive */}
        {showGlow && (
          <motion.div
            className="absolute inset-0 -z-10 blur-xl opacity-40"
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(circle, rgba(0,87,183,0.4) 0%, rgba(213,0,50,0.3) 100%)'
                : 'radial-gradient(circle, rgba(0,87,183,0.3) 0%, rgba(213,0,50,0.2) 100%)'
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
        )}
        
        {/* Particles around logo */}
        {withParticles && (
          <div className="absolute inset-0 -z-10">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute rounded-full ${theme === 'dark' ? 'bg-primary/60' : 'bg-primary/40'} blur-sm`}
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
        )}
      </div>
    </motion.div>
  );
};

export default AnimatedLogo;
