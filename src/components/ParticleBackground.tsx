
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

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
  mouse: React.RefObject<THREE.Vector2>;
}

function Particles({ count, mouse }: ParticlesProps) {
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
  
  // Velocities for animation
  const velocities = useRef<number[]>([]);
  const positionsArray = useRef<Float32Array>(positions);
  
  useEffect(() => {
    // Initialize velocities
    velocities.current = Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 0.01);
  }, [count]);
  
  // Update particles on each frame
  useFrame(() => {
    if (!pointsRef.current) return;
    
    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.getAttribute('position');
    
    // Skip update if the attribute isn't properly initialized
    if (!positionAttribute || !positionAttribute.array) return;
    
    // Update positions based on velocities
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Update positions
      positionsArray.current[i3] += velocities.current[i3];
      positionsArray.current[i3 + 1] += velocities.current[i3 + 1];
      positionsArray.current[i3 + 2] += velocities.current[i3 + 2];
      
      // Boundary check with wrapping
      if (positionsArray.current[i3] < -7.5) positionsArray.current[i3] = 7.5;
      if (positionsArray.current[i3] > 7.5) positionsArray.current[i3] = -7.5;
      if (positionsArray.current[i3 + 1] < -7.5) positionsArray.current[i3 + 1] = 7.5;
      if (positionsArray.current[i3 + 1] > 7.5) positionsArray.current[i3 + 1] = -7.5;
      if (positionsArray.current[i3 + 2] < -5) positionsArray.current[i3 + 2] = 5;
      if (positionsArray.current[i3 + 2] > 5) positionsArray.current[i3 + 2] = -5;
      
      // Copy updated positions to the actual attribute array
      if (positionAttribute.array) {
        positionAttribute.array[i3] = positionsArray.current[i3];
        positionAttribute.array[i3 + 1] = positionsArray.current[i3 + 1];
        positionAttribute.array[i3 + 2] = positionsArray.current[i3 + 2];
      }
      
      // Mouse interaction
      if (mouse.current) {
        const mouseX = mouse.current.x;
        const mouseY = mouse.current.y;
        
        const dx = mouseX - positionsArray.current[i3];
        const dy = mouseY - positionsArray.current[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 1.5) {
          velocities.current[i3] += dx * 0.001;
          velocities.current[i3 + 1] += dy * 0.001;
        }
      }
    }
    
    // Only mark as needing update if the attribute is defined
    if (positionAttribute) {
      positionAttribute.needsUpdate = true;
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
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

const ParticleBackground = () => {
  const mousePos = useRef(new THREE.Vector2(0, 0));
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert to normalized coordinates (-1 to 1)
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles count={isMobile ? 150 : 300} mouse={mousePos} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
