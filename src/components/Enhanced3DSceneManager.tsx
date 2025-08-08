import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import Enhanced3DEnvironments from './Enhanced3DEnvironments';

interface SceneManagerProps {
  children?: React.ReactNode;
}

const Enhanced3DSceneManager = ({ children }: SceneManagerProps) => {
  const location = useLocation();
  const [currentEnvironment, setCurrentEnvironment] = useState<'neural' | 'studio' | 'gallery' | 'pods' | 'holographic'>('neural');

  useEffect(() => {
    // Map routes to environments
    const getEnvironmentType = (path: string) => {
      if (path.includes('services')) return 'studio';
      if (path.includes('portfolio')) return 'gallery';
      if (path.includes('team')) return 'pods';
      if (path.includes('contact')) return 'holographic';
      return 'neural';
    };

    setCurrentEnvironment(getEnvironmentType(location.pathname));
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Single Unified 3D Scene */}
      <motion.div
        key={currentEnvironment}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <R3FCanvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: false, 
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          onCreated={({ gl, scene }) => {
            gl.shadowMap.enabled = false;
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            scene.matrixAutoUpdate = false;
          }}
          performance={{ min: 0.1, max: 1, debounce: 200 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <Enhanced3DEnvironments type={currentEnvironment} intensity={1.2} />
          </Suspense>
        </R3FCanvas>
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Enhanced3DSceneManager;