
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Get a random color from our palette
function getRandomColor() {
  const colors = [
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#0EA5E9', // Blue
    '#10B981', // Green
    '#F97316', // Orange
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

interface ParticlesProps {
  count: number;
}

// The Particles component has been simplified to avoid errors
function Particles({ count }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create positions and colors for particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Position
      positions[i3] = (Math.random() - 0.5) * 15;     // x
      positions[i3 + 1] = (Math.random() - 0.5) * 15; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 10; // z
      
      // Color
      color.set(getRandomColor());
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, [count]);
  
  // Simple rotation animation that doesn't rely on updating buffer geometry
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      // Simple rotation animation that doesn't modify geometry attributes
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      pointsRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

const ParticleBackground = () => {
  const isMobile = useIsMobile();
  
  // Reduced particle count for better performance and stability
  const particleCount = isMobile ? 50 : 100;
  
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles count={particleCount} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
