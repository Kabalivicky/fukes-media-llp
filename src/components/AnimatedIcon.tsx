
import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useTheme } from '@/components/ui/theme-provider';

interface AnimatedIconProps {
  icon: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  hoverColor?: string;
  className?: string;
  withPulse?: boolean;
  withRotate?: boolean;
  withShake?: boolean;
}

const AnimatedIcon = ({
  icon,
  size = 'md',
  color,
  hoverColor,
  className = '',
  withPulse = false,
  withRotate = false,
  withShake = false
}: AnimatedIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  
  // Default colors based on theme
  const defaultColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const defaultHoverColor = 'text-primary';
  
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  
  // Define animation variants for framer-motion
  const variants = {
    initial: {},
    pulse: {
      scale: isHovered ? [1, 1.1, 1] : 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        repeat: isHovered ? Infinity : 0,
        repeatType: "reverse" as const
      }
    },
    rotate: {
      rotate: isHovered ? 360 : 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    shake: {
      x: isHovered ? [0, -2, 3, -3, 2, 0] : 0,
      transition: {
        duration: 0.4
      }
    }
  };
  
  // Determine which animation variant to use
  const animationVariant = withPulse ? "pulse" : withRotate ? "rotate" : withShake ? "shake" : "initial";
  
  return (
    <motion.div
      className={cn(
        sizeClasses[size],
        color || defaultColor,
        'transition-colors duration-200',
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        color: isHovered ? hoverColor : undefined,
      }}
      variants={variants}
      animate={animationVariant}
    >
      {icon}
    </motion.div>
  );
};

export default AnimatedIcon;
