import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  glareEnabled?: boolean;
  scaleOnHover?: number;
}

const TiltCard = ({
  children,
  className = '',
  tiltIntensity = 15,
  glareEnabled = true,
  scaleOnHover = 1.02,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tiltIntensity}deg`, `-${tiltIntensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tiltIntensity}deg`, `${tiltIntensity}deg`]);

  // Glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
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
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        scale: isHovered ? scaleOnHover : 1,
      }}
      transition={{ scale: { duration: 0.2 } }}
      className={`relative ${className}`}
    >
      {/* Glare effect */}
      {glareEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] overflow-hidden"
          style={{
            opacity: isHovered ? 0.15 : 0,
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, hsl(var(--primary) / 0.4), transparent 50%)`,
            }}
          />
        </motion.div>
      )}

      {/* Content with 3D depth */}
      <div
        style={{
          transform: 'translateZ(20px)',
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {children}
      </div>

      {/* Shadow effect */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-[inherit]"
        style={{
          boxShadow: isHovered
            ? '0 25px 50px -12px hsl(var(--primary) / 0.25)'
            : '0 10px 30px -15px hsl(var(--foreground) / 0.1)',
          transition: 'box-shadow 0.3s ease',
        }}
      />
    </motion.div>
  );
};

export default TiltCard;
