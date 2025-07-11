import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Points, BufferGeometry, BufferAttribute, PointsMaterial, Vector3 } from 'three';
import { motion } from 'framer-motion';

const ParticleSystem = () => {
  const pointsRef = useRef<Points>(null);
  const { viewport } = useThree();

  const particleCount = 1000;
  
  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Fuke's Media brand colors in RGB
    const brandColors = [
      [0.0, 0.34, 0.72], // Blue #0057B7
      [0.84, 0.0, 0.2],  // Red #D50032
      [0.0, 0.58, 0.22], // Green #009639
      [1.0, 0.8, 0.0],   // Gold #FFCC00
      [0.0, 0.75, 1.0]   // Cyan #00BFFF
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * viewport.width * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
      
      // Random brand colors
      const color = brandColors[Math.floor(Math.random() * brandColors.length)];
      colors[i3] = color[0];
      colors[i3 + 1] = color[1];
      colors[i3 + 2] = color[2];
    }
    
    return { positions, velocities, colors };
  }, [viewport, particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const positionAttribute = pointsRef.current.geometry.getAttribute('position') as BufferAttribute;
    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Update positions with velocities and sine wave motion
      positions[i3] += velocities[i3] + Math.sin(time + i * 0.01) * 0.001;
      positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time + i * 0.01) * 0.001;
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Wrap around screen boundaries
      if (positions[i3] > viewport.width) positions[i3] = -viewport.width;
      if (positions[i3] < -viewport.width) positions[i3] = viewport.width;
      if (positions[i3 + 1] > viewport.height) positions[i3 + 1] = -viewport.height;
      if (positions[i3 + 1] < -viewport.height) positions[i3 + 1] = viewport.height;
      if (positions[i3 + 2] > 5) positions[i3 + 2] = -5;
      if (positions[i3 + 2] < -5) positions[i3 + 2] = 5;
    }
    
    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

const ConnectionLines = () => {
  const linesRef = useRef<any>(null);
  const { viewport } = useThree();

  const lineCount = 50;
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(lineCount * 6); // 2 points per line, 3 coords per point
    const colors = new Float32Array(lineCount * 6);
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      
      // Line start
      positions[i6] = (Math.random() - 0.5) * viewport.width;
      positions[i6 + 1] = (Math.random() - 0.5) * viewport.height;
      positions[i6 + 2] = (Math.random() - 0.5) * 5;
      
      // Line end
      positions[i6 + 3] = (Math.random() - 0.5) * viewport.width;
      positions[i6 + 4] = (Math.random() - 0.5) * viewport.height;
      positions[i6 + 5] = (Math.random() - 0.5) * 5;
      
      // Colors (blue gradient)
      colors[i6] = 0.0;     colors[i6 + 1] = 0.34;   colors[i6 + 2] = 0.72;
      colors[i6 + 3] = 0.0; colors[i6 + 4] = 0.58;   colors[i6 + 5] = 0.22;
    }
    
    return { positions, colors };
  }, [viewport, lineCount]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineCount * 2}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineCount * 2}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
};

const WebGLParticleBackground = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem />
        <ConnectionLines />
      </Canvas>
    </motion.div>
  );
};

export default WebGLParticleBackground;