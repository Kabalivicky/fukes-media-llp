import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, AdditiveBlending } from 'three';

interface EnvironmentProps {
  type: 'studio' | 'gallery' | 'pods' | 'holographic' | 'neural';
  intensity?: number;
}

const AINeuraGlow = ({ intensity = 1 }: { intensity?: number }) => {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    try {
      if (meshRef.current && meshRef.current.material) {
        meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
        const material = meshRef.current.material as any;
        if (material && typeof material.opacity !== 'undefined' && material.needsUpdate !== undefined) {
          material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
          material.needsUpdate = true;
        }
      }
    } catch (error) {
      // 3D animation error suppressed
    }
  });

  return (
    <group>
      {/* AI Data Pulses */}
      <mesh ref={meshRef}>
        <torusGeometry args={[8, 0.1, 16, 100]} />
        <meshBasicMaterial 
          color="#00FF88" 
          transparent 
          opacity={0.2}
          blending={AdditiveBlending}
        />
      </mesh>
      
      {/* Neural Network Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 0.5) * 15,
            Math.cos(i * 0.3) * 10,
            Math.sin(i * 0.7) * 5
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial 
            color="#0057B7" 
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

const VFXStudioEnvironment = () => {
  const { viewport } = useThree();
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* LED Wall Simulation */}
      <mesh position={[0, 0, -15]}>
        <planeGeometry args={[viewport.width * 2, viewport.height, 32, 32]} />
        <meshBasicMaterial 
          color="#0057B7" 
          transparent 
          opacity={0.1}
          wireframe
        />
      </mesh>
      
      {/* Studio Equipment Silhouettes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 12,
            -5 + Math.random() * 3,
            Math.sin((i / 6) * Math.PI * 2) * 12
          ]}
        >
          <boxGeometry args={[1, 3, 1]} />
          <meshBasicMaterial color="#D50032" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const GalleryEnvironment = () => {
  const { viewport } = useThree();

  return (
    <group>
      {/* Gallery Frames */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (i % 4 - 1.5) * 8,
            2,
            Math.floor(i / 4) * -10 - 5
          ]}
        >
          <planeGeometry args={[6, 4]} />
          <meshBasicMaterial color="#009639" transparent opacity={0.1} />
        </mesh>
      ))}
      
      {/* Spotlight Effects */}
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-10, 5, -5]} intensity={0.3} color="#0057B7" />
      <pointLight position={[10, 5, -5]} intensity={0.3} color="#D50032" />
    </group>
  );
};

const TeamPodsEnvironment = () => {
  const { viewport } = useThree();

  return (
    <group>
      {/* Team Member Pods */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 15,
            Math.sin(i * 0.5) * 3,
            Math.sin((i / 5) * Math.PI * 2) * 15
          ]}
        >
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial 
            color={i % 3 === 0 ? "#0057B7" : i % 3 === 1 ? "#D50032" : "#009639"} 
            transparent 
            opacity={0.2}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

const HolographicEnvironment = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 2;
    }
  });

  return (
    <group>
      {/* Holographic Interface */}
      <mesh ref={meshRef}>
        <torusGeometry args={[8, 0.5, 16, 100]} />
        <meshBasicMaterial 
          color="#00FF88" 
          transparent 
          opacity={0.4}
          blending={AdditiveBlending}
        />
      </mesh>
      
      {/* Communication Arrays */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 20,
            10,
            Math.sin((i / 4) * Math.PI * 2) * 20
          ]}
        >
          <coneGeometry args={[1, 4, 8]} />
          <meshBasicMaterial color="#0057B7" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const Enhanced3DEnvironments = ({ type, intensity = 1 }: EnvironmentProps) => {
  const renderEnvironment = () => {
    switch (type) {
      case 'studio':
        return <VFXStudioEnvironment />;
      case 'gallery':
        return <GalleryEnvironment />;
      case 'pods':
        return <TeamPodsEnvironment />;
      case 'holographic':
        return <HolographicEnvironment />;
      case 'neural':
      default:
        return <AINeuraGlow intensity={intensity} />;
    }
  };

  return <>{renderEnvironment()}</>;
};

export default Enhanced3DEnvironments;