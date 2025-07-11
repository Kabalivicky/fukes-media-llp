import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface Enhanced3DHoverCardsProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

const Enhanced3DHoverCards = ({ 
  children, 
  className = '', 
  intensity = 1,
  glowColor = 'hsl(var(--primary))' 
}: Enhanced3DHoverCardsProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const translateZ = useTransform(mouseXSpring, [-0.5, 0.5], [0, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct * intensity);
    y.set(yPct * intensity);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-lg opacity-0 transition-opacity duration-300 blur-lg"
        style={{
          background: `linear-gradient(90deg, ${glowColor}, transparent, ${glowColor})`,
          opacity: isHovered ? 0.4 : 0,
        }}
      />

      {/* Floating particles */}
      {isHovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-60"
              style={{
                background: glowColor,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}

      {/* Content with 3D transform */}
      <Card
        className="relative border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden"
        style={{
          transform: `translateZ(${translateZ.get()}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Holographic overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(45deg, 
              transparent 0%, 
              ${glowColor}20 30%, 
              transparent 50%, 
              ${glowColor}20 70%, 
              transparent 100%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Scan line effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                ${glowColor}40 50%, 
                transparent 100%)`,
              height: '2px',
            }}
            animate={{
              y: [0, 300, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        <CardContent className="relative z-10">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Enhanced3DHoverCards;