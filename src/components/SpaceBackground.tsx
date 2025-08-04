import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Points, BufferGeometry, BufferAttribute, Vector3, Mesh, TextureLoader, SphereGeometry, MeshBasicMaterial } from 'three';
import { motion } from 'framer-motion';

const Stars = () => {
  const pointsRef = useRef<Points>(null);
  const starCount = 2000;

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Distribute stars in a sphere
      const radius = Math.random() * 100 + 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Star colors (blue, white, yellow tints)
      const intensity = Math.random() * 0.5 + 0.5;
      const colorVariation = Math.random();
      
      if (colorVariation < 0.1) {
        // Blue stars
        colors[i3] = 0.4 * intensity;
        colors[i3 + 1] = 0.7 * intensity;
        colors[i3 + 2] = 1.0 * intensity;
      } else if (colorVariation < 0.2) {
        // Yellow stars
        colors[i3] = 1.0 * intensity;
        colors[i3 + 1] = 0.9 * intensity;
        colors[i3 + 2] = 0.6 * intensity;
      } else {
        // White stars
        colors[i3] = intensity;
        colors[i3 + 1] = intensity;
        colors[i3 + 2] = intensity;
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, colors, sizes };
  }, [starCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.0001;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.00005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={starCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        size={2}
      />
    </points>
  );
};

const Comet = ({ position, speed }: { position: Vector3; speed: number }) => {
  const cometRef = useRef<Mesh>(null);
  const tailRef = useRef<Points>(null);

  const tailParticles = useMemo(() => {
    const particles = 50;
    const positions = new Float32Array(particles * 3);
    const colors = new Float32Array(particles * 3);

    for (let i = 0; i < particles; i++) {
      const i3 = i * 3;
      const offset = i / particles;
      
      positions[i3] = position.x - offset * 5;
      positions[i3 + 1] = position.y - offset * 2;
      positions[i3 + 2] = position.z - offset * 3;

      const alpha = 1 - offset;
      colors[i3] = 0.8 * alpha;
      colors[i3 + 1] = 0.9 * alpha;
      colors[i3 + 2] = 1.0 * alpha;
    }

    return { positions, colors };
  }, [position]);

  useFrame((state) => {
    if (cometRef.current) {
      const time = state.clock.elapsedTime * speed;
      cometRef.current.position.x = position.x + Math.cos(time) * 20;
      cometRef.current.position.y = position.y + Math.sin(time * 0.7) * 10;
      cometRef.current.position.z = position.z + Math.sin(time) * 15;
    }
  });

  return (
    <group>
      <mesh ref={cometRef}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#87CEEB" />
      </mesh>
      <points ref={tailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={tailParticles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={50}
            array={tailParticles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          opacity={0.6}
          size={1}
        />
      </points>
    </group>
  );
};

const Asteroid = ({ position, size, rotationSpeed }: { position: Vector3; size: number; rotationSpeed: number }) => {
  const asteroidRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.x += rotationSpeed;
      asteroidRef.current.rotation.y += rotationSpeed * 0.7;
      asteroidRef.current.rotation.z += rotationSpeed * 0.3;
    }
  });

  return (
    <mesh ref={asteroidRef} position={position}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshBasicMaterial color="#696969" wireframe />
    </mesh>
  );
};

const NebulaCloud = () => {
  const cloudRef = useRef<Points>(null);
  const particleCount = 500;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Create cloud-like distribution
      const radius = Math.random() * 30 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Purple/blue nebula colors
      const intensity = Math.random() * 0.3 + 0.1;
      colors[i3] = 0.6 * intensity; // Red
      colors[i3 + 1] = 0.2 * intensity; // Green
      colors[i3 + 2] = 1.0 * intensity; // Blue
    }

    return { positions, colors };
  }, [particleCount]);

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.elapsedTime * 0.0002;
    }
  });

  return (
    <points ref={cloudRef}>
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
        vertexColors
        transparent
        opacity={0.4}
        size={3}
        sizeAttenuation={false}
      />
    </points>
  );
};

const SpaceBackground = () => {
  const comets = useMemo(() => [
    { position: new Vector3(-30, 10, -40), speed: 0.3 },
    { position: new Vector3(25, -15, -50), speed: 0.2 },
    { position: new Vector3(-10, 30, -60), speed: 0.4 },
  ], []);

  const asteroids = useMemo(() => [
    { position: new Vector3(40, -20, -30), size: 2, rotationSpeed: 0.01 },
    { position: new Vector3(-35, 25, -45), size: 1.5, rotationSpeed: 0.015 },
    { position: new Vector3(20, 40, -55), size: 3, rotationSpeed: 0.008 },
    { position: new Vector3(-50, -10, -35), size: 1.8, rotationSpeed: 0.012 },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -10 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'linear-gradient(180deg, #000011 0%, #001122 50%, #000033 100%)' }}
      >
        <ambientLight intensity={0.1} />
        
        <Stars />
        <NebulaCloud />
        
        {comets.map((comet, index) => (
          <Comet
            key={`comet-${index}`}
            position={comet.position}
            speed={comet.speed}
          />
        ))}
        
        {asteroids.map((asteroid, index) => (
          <Asteroid
            key={`asteroid-${index}`}
            position={asteroid.position}
            size={asteroid.size}
            rotationSpeed={asteroid.rotationSpeed}
          />
        ))}
      </Canvas>
    </motion.div>
  );
};

export default SpaceBackground;