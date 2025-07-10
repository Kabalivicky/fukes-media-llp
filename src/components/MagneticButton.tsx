import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  scaleOnHover?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const MagneticButton = ({ 
  children, 
  className = '',
  magneticStrength = 0.3,
  scaleOnHover = true,
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  disabled = false
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(springY, [-1, 1], [10, -10]);
  const rotateY = useTransform(springX, [-1, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(deltaX * magneticStrength);
    mouseY.set(deltaY * magneticStrength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Button
        ref={ref}
        variant={variant}
        size={size}
        type={type}
        disabled={disabled}
        className={cn(
          'relative overflow-hidden cursor-pointer transition-all duration-300',
          scaleOnHover && 'hover:scale-105',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
        style={{
          filter: isHovered && !disabled ? 'brightness(1.1)' : 'brightness(1)',
          boxShadow: isHovered && !disabled ? '0 20px 40px rgba(0,87,183,0.3)' : '0 0 0 rgba(0,87,183,0)',
        }}
      >
        <motion.span
          className="relative z-10"
          animate={{
            scale: isHovered && !disabled ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
        
        {/* Ripple effect */}
        {isHovered && !disabled && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default MagneticButton;