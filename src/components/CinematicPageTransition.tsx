import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import gsap from 'gsap';

interface CinematicPageTransitionProps {
  children: ReactNode;
}

const TransitionEnvironment = ({ stage }: { stage: 'entering' | 'exiting' | 'stable' }) => {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    }
  });

  const getEnvironmentColor = () => {
    switch (stage) {
      case 'entering': return '#0057B7'; // Fuke's blue
      case 'exiting': return '#D50032'; // Fuke's red
      default: return '#009639'; // Fuke's green
    }
  };

  return (
    <group>
      {/* Studio Environment */}
      <mesh ref={meshRef} position={[0, 0, -10]}>
        <boxGeometry args={[viewport.width * 2, viewport.height * 2, 0.1]} />
        <meshBasicMaterial color={getEnvironmentColor()} transparent opacity={0.1} />
      </mesh>
      
      {/* LED Wall Simulation */}
      <mesh position={[0, 0, -15]}>
        <planeGeometry args={[viewport.width * 3, viewport.height * 3]} />
        <meshBasicMaterial color={getEnvironmentColor()} transparent opacity={0.05} />
      </mesh>
      
      {/* VR Stage Boundaries */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 20,
            Math.sin((i / 8) * Math.PI * 2) * 20,
            -20
          ]}
        >
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshBasicMaterial color={getEnvironmentColor()} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotateY: -15,
    filter: 'blur(10px)',
  },
  in: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
  },
  out: {
    opacity: 0,
    scale: 1.2,
    rotateY: 15,
    filter: 'blur(10px)',
  }
};

const wipeVariants = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
  },
  in: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
  },
  out: {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
  }
};

const CinematicPageTransition = ({ children }: CinematicPageTransitionProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger integration for smooth transitions
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { 
          y: 50, 
          opacity: 0,
          rotationX: -10 
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }
  }, [location.pathname]);

  const getTransitionType = () => {
    const path = location.pathname;
    if (path.includes('services')) return 'studio';
    if (path.includes('portfolio')) return 'gallery';
    if (path.includes('team')) return 'pods';
    if (path.includes('contact')) return 'holographic';
    return 'default';
  };

  return (
    <div className="relative">
      {/* 3D Environment Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -5 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <TransitionEnvironment stage="stable" />
        </Canvas>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          ref={containerRef}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{
            type: 'tween',
            ease: 'anticipate',
            duration: 0.8
          }}
          className="min-h-screen relative"
          style={{ 
            transformOrigin: 'center',
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Section-to-section wipe overlay */}
          <motion.div
            variants={wipeVariants}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 pointer-events-none"
            style={{ zIndex: 1 }}
          />
          
          {/* Main content with cinematic effects */}
          <motion.div
            initial={{ filter: "brightness(0.7) contrast(1.2)" }}
            animate={{ filter: "brightness(1) contrast(1)" }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CinematicPageTransition;