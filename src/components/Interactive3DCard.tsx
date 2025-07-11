import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const RotatingCube = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = mouseY * 0.5 + state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = mouseX * 0.5 + state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#0057B7" 
        transparent 
        opacity={0.8}
        wireframe
      />
    </mesh>
  );
};

const Interactive3DCard = ({ 
  children, 
  className = '', 
  intensity = 1 
}: Interactive3DCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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
      className={`relative ${className}`}
    >
      {/* 3D Background Canvas */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
          <Canvas
            camera={{ position: [0, 0, 3], fov: 50 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <RotatingCube 
              mouseX={mouseXSpring.get()} 
              mouseY={mouseYSpring.get()} 
            />
          </Canvas>
        </div>
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-lg opacity-0 transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, #0057B7, #D50032, #009639, #FFCC00)",
          filter: "blur(10px)",
          opacity: isHovered ? 0.7 : 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Interactive3DCard;