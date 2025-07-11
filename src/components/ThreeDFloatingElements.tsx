import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Mesh, Vector3, Group } from 'three';
import { motion } from 'framer-motion';

interface FloatingShapeProps {
  position: Vector3;
  color: string;
  scale: number;
  speed: number;
}

const FloatingShape = ({ position, color, scale, speed }: FloatingShapeProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<Group>(null);
  
  const particleData = useMemo(() => {
    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        position: new Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ),
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      });
    }
    return particles;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={particlesRef}>
      {particleData.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#0057B7" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const ThreeDFloatingElements = () => {
  const shapes = useMemo(() => [
    { position: new Vector3(-3, 2, -2), color: '#0057B7', scale: 0.8, speed: 0.5 },
    { position: new Vector3(3, -1, -3), color: '#D50032', scale: 1.2, speed: 0.3 },
    { position: new Vector3(-2, -2, -1), color: '#009639', scale: 1.0, speed: 0.7 },
    { position: new Vector3(2, 3, -4), color: '#FFCC00', scale: 0.6, speed: 0.4 },
    { position: new Vector3(0, 1, -5), color: '#00BFFF', scale: 0.9, speed: 0.6 },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {shapes.map((shape, index) => (
          <FloatingShape
            key={index}
            position={shape.position}
            color={shape.color}
            scale={shape.scale}
            speed={shape.speed}
          />
        ))}
        
        <ParticleField />
      </Canvas>
    </motion.div>
  );
};

export default ThreeDFloatingElements;