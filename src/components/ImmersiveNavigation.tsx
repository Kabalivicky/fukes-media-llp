import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { Mesh, Vector3 } from 'three';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  color: string;
  position: [number, number, number];
}

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Neural Hub', path: '/', color: '#0057B7', position: [0, 0, 0] },
  { id: 'services', label: 'VFX Studio', path: '/services', color: '#0057B7', position: [-8, 2, -5] },
  { id: 'portfolio', label: 'Gallery', path: '/portfolio', color: '#D50032', position: [8, 2, -5] },
  { id: 'team', label: 'Team Pods', path: '/team', color: '#009639', position: [-8, -2, -8] },
  { id: 'contact', label: 'Hologram', path: '/contact', color: '#00FF88', position: [8, -2, -8] },
];

const NavigationSphere = ({ item, isActive, onHover, onClick }: {
  item: NavigationItem;
  isActive: boolean;
  onHover: (item: NavigationItem | null) => void;
  onClick: (path: string) => void;
}) => {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
      
      if (isActive) {
        meshRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 4) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <mesh 
      ref={meshRef}
      position={item.position}
      onPointerEnter={() => onHover(item)}
      onPointerLeave={() => onHover(null)}
      onClick={() => onClick(item.path)}
    >
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshBasicMaterial 
        color={item.color} 
        transparent 
        opacity={isActive ? 0.8 : 0.4}
        wireframe={!isActive}
      />
      
      {/* Inner glow effect */}
      <mesh scale={0.7}>
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshBasicMaterial 
          color={item.color} 
          transparent 
          opacity={0.2}
        />
      </mesh>
    </mesh>
  );
};

const ParticleConnections = ({ activeItem }: { activeItem: NavigationItem | null }) => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current && activeItem) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  if (!activeItem) return null;

  return (
    <group ref={groupRef}>
      {navigationItems
        .filter(item => item.id !== activeItem.id)
        .map((item, index) => (
          <line key={item.id}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  ...activeItem.position,
                  ...item.position
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial 
              color={activeItem.color} 
              transparent 
              opacity={0.3}
            />
          </line>
        ))
      }
    </group>
  );
};

const ImmersiveNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<NavigationItem | null>(null);
  const [activeItem, setActiveItem] = useState<NavigationItem | null>(null);
  const navigate = useNavigate();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const rotateY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateXValue = (event.clientY - centerY) / (rect.height / 2);
    const rotateYValue = (event.clientX - centerX) / (rect.width / 2);
    
    mouseX.set(rotateXValue * 10);
    mouseY.set(rotateYValue * 10);
  };

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const navigationVariants = {
    closed: {
      scale: 0,
      rotate: -180,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 35
      }
    },
    open: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { scale: 0, opacity: 0 },
    open: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    }
  };

  return (
    <>
      {/* Navigation Toggle Button */}
      <motion.button
        className="fixed top-6 right-6 z-50 w-16 h-16 rounded-full bg-black/20 backdrop-blur-md border border-primary/30 flex items-center justify-center"
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 87, 183, 0.2)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-6 h-6 relative">
            <motion.span 
              className="absolute w-6 h-0.5 bg-primary rounded"
              style={{ top: '50%', left: 0, transformOrigin: 'center' }}
              animate={{ 
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -6
              }}
            />
            <motion.span 
              className="absolute w-6 h-0.5 bg-primary rounded"
              style={{ top: '50%', left: 0 }}
              animate={{ opacity: isOpen ? 0 : 1 }}
            />
            <motion.span 
              className="absolute w-6 h-0.5 bg-primary rounded"
              style={{ top: '50%', left: 0, transformOrigin: 'center' }}
              animate={{ 
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 6
              }}
            />
          </div>
        </motion.div>
      </motion.button>

      {/* Immersive Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          >
            {/* 3D Navigation Scene */}
            <motion.div
              className="absolute inset-0"
              variants={navigationVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onMouseMove={handleMouseMove}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <motion.div
                style={{
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transformStyle: 'preserve-3d'
                }}
                className="w-full h-full"
              >
                <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  
                  {navigationItems.map(item => (
                    <NavigationSphere
                      key={item.id}
                      item={item}
                      isActive={activeItem?.id === item.id || hoveredItem?.id === item.id}
                      onHover={setHoveredItem}
                      onClick={handleNavigation}
                    />
                  ))}
                  
                  <ParticleConnections activeItem={hoveredItem} />
                </Canvas>
              </motion.div>
            </motion.div>

            {/* Navigation Labels */}
            <div className="absolute inset-0 pointer-events-none">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="absolute"
                  style={{
                    left: `${50 + (item.position[0] * 3)}%`,
                    top: `${50 + (item.position[1] * -3)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <motion.div
                    className="text-white text-center"
                    animate={{
                      scale: hoveredItem?.id === item.id ? 1.2 : 1,
                      color: hoveredItem?.id === item.id ? item.color : '#ffffff'
                    }}
                  >
                    <div className="text-lg font-semibold">{item.label}</div>
                    <div className="text-sm opacity-60 mt-1">
                      {item.path === '/' ? 'Home' : item.path.slice(1)}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Contextual Information Panel */}
            <AnimatePresence>
              {hoveredItem && (
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 300 }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-md rounded-lg p-6 border border-primary/30 max-w-sm"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {hoveredItem.label}
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    {getDescriptionForItem(hoveredItem.id)}
                  </p>
                  <motion.button
                    className="w-full py-2 px-4 bg-primary/20 hover:bg-primary/40 rounded-md text-white border border-primary/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigation(hoveredItem.path)}
                  >
                    Enter {hoveredItem.label}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Close on backdrop click */}
            <div 
              className="absolute inset-0"
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const getDescriptionForItem = (id: string): string => {
  switch (id) {
    case 'home': return 'Central command hub for Fuke\'s Media operations';
    case 'services': return 'Professional VFX studio with cutting-edge technology';
    case 'portfolio': return 'Showcase of our creative projects and achievements';
    case 'team': return 'Meet our talented team of creative professionals';
    case 'contact': return 'Connect with us through advanced communication systems';
    default: return '';
  }
};

export default ImmersiveNavigation;