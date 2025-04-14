
import { useState, useEffect, ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '@/components/ui/theme-provider';

interface DynamicTextProps {
  children: ReactNode;
  gradient?: boolean;
  glitch?: boolean;
  holographic?: boolean;
  className?: string;
  animateOnHover?: boolean;
}

const DynamicText = ({ 
  children, 
  gradient = false, 
  glitch = false,
  holographic = false,
  className = '',
  animateOnHover = false
}: DynamicTextProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const { theme } = useTheme();
  
  const shouldAnimate = animateOnHover ? isHovered : true;
  
  useEffect(() => {
    if (glitch && shouldAnimate) {
      const startGlitchEffect = async () => {
        await controls.start({
          x: [0, -2, 3, -3, 2, 0],
          transition: { duration: 0.4 }
        });
        
        setTimeout(startGlitchEffect, Math.random() * 5000 + 2000);
      };
      
      startGlitchEffect();
    }
  }, [controls, glitch, shouldAnimate]);
  
  let textStyle: React.CSSProperties = {};
  let animationClass = '';
  
  if (gradient) {
    textStyle = {
      backgroundImage: theme === 'dark'
        ? 'linear-gradient(90deg, #0057B7, #D50032, #009639, #0057B7)'
        : 'linear-gradient(90deg, #0057B7, #D50032, #009639, #0057B7)',
      backgroundSize: '300% 100%',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    };
    animationClass = 'animate-gradient';
  }
  
  if (holographic) {
    textStyle = {
      ...textStyle,
      color: theme === 'dark' ? '#ffffff' : '#000000',
      textShadow: theme === 'dark'
        ? '0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(0,87,183,0.5), 0 0 15px rgba(213,0,50,0.3)'
        : '0 0 5px rgba(0,0,0,0.2), 0 0 10px rgba(0,87,183,0.3), 0 0 15px rgba(213,0,50,0.2)'
    };
  }
  
  return (
    <motion.span
      className={`inline-block ${animationClass} ${className}`}
      style={textStyle}
      animate={glitch ? controls : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.span>
  );
};

export default DynamicText;
