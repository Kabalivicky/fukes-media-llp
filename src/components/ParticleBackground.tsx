
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
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
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorObj = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 15;  // x
      positions[i3 + 1] = (Math.random() - 0.5) * 15;  // y
      positions[i3 + 2] = (Math.random() - 0.5) * 10;  // z

      // Set random color
      colorObj.set(getRandomColor());
      colors[i3] = colorObj.r;
      colors[i3 + 1] = colorObj.g;
      colors[i3 + 2] = colorObj.b;
    }

    return { positions, colors };
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<THREE.BufferAttribute>(null);
  const velocities = useRef<number[]>([]);

  useEffect(() => {
    // Initialize velocities
    velocities.current = Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 0.01);
  }, [count]);
  
  useFrame((state) => {
    if (!pointsRef.current || !positionsRef.current) return;

    const positions = positionsRef.current.array as Float32Array;
    
    // Update positions based on velocities and boundaries
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Update positions
      positions[i3] += velocities.current[i3];
      positions[i3 + 1] += velocities.current[i3 + 1];
      positions[i3 + 2] += velocities.current[i3 + 2];
      
      // Boundary check with wrapping
      if (positions[i3] < -7.5) positions[i3] = 7.5;
      if (positions[i3] > 7.5) positions[i3] = -7.5;
      if (positions[i3 + 1] < -7.5) positions[i3 + 1] = 7.5;
      if (positions[i3 + 1] > 7.5) positions[i3 + 1] = -7.5;
      if (positions[i3 + 2] < -5) positions[i3 + 2] = 5;
      if (positions[i3 + 2] > 5) positions[i3 + 2] = -5;
      
      // Mouse interaction
      if (mouse.current) {
        const mouseX = mouse.current.x;
        const mouseY = mouse.current.y;
        
        const dx = mouseX - positions[i3];
        const dy = mouseY - positions[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 1.5) {
          velocities.current[i3] += dx * 0.001;
          velocities.current[i3 + 1] += dy * 0.001;
        }
      }
    }
    
    positionsRef.current.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          ref={positionsRef as any}
          attach="attributes-position"
          array={positions.positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={positions.colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.15}
        vertexColors
        transparent
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
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
        <Particles count={isMobile ? 250 : 500} mouse={mousePos} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
