import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Link, useLocation } from 'react-router-dom';
import { Mesh, Vector3 } from 'three';
import { 
  Film, 
  Users, 
  Briefcase, 
  MessageCircle, 
  Sparkles,
  Camera,
  UserCircle,
  Building
} from 'lucide-react';

interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  description: string;
  environment: 'studio' | 'pods' | 'corridor' | 'holographic';
}

const navigationItems: NavigationItem[] = [
  {
    id: 'services',
    title: 'Services',
    path: '/services',
    icon: <Film className="w-6 h-6" />,
    description: 'Enter the VFX Studio',
    environment: 'studio'
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    path: '#portfolio',
    icon: <Camera className="w-6 h-6" />,
    description: 'Camera follows 3D corridor',
    environment: 'corridor'
  },
  {
    id: 'team',
    title: 'Team',
    path: '/team',
    icon: <Users className="w-6 h-6" />,
    description: 'Floating pods of avatars',
    environment: 'pods'
  },
  {
    id: 'careers',
    title: 'Careers',
    path: '#careers',
    icon: <Building className="w-6 h-6" />,
    description: 'Holographic job boards',
    environment: 'holographic'
  },
  {
    id: 'contact',
    title: 'Contact',
    path: '#contact',
    icon: <MessageCircle className="w-6 h-6" />,
    description: 'AI Assistant Narrator',
    environment: 'holographic'
  }
];

const EnvironmentPreview = ({ environment, isActive }: { environment: string; isActive: boolean }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  const getEnvironmentColor = () => {
    switch (environment) {
      case 'studio': return '#0057B7';
      case 'corridor': return '#D50032';
      case 'pods': return '#009639';
      case 'holographic': return '#FFCC00';
      default: return '#0057B7';
    }
  };

  const getEnvironmentGeometry = () => {
    switch (environment) {
      case 'studio':
        return <boxGeometry args={[2, 1, 0.5]} />;
      case 'corridor':
        return <cylinderGeometry args={[0.3, 0.3, 3, 8]} />;
      case 'pods':
        return <sphereGeometry args={[0.8, 8, 8]} />;
      case 'holographic':
        return <octahedronGeometry args={[1]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh ref={meshRef}>
      {getEnvironmentGeometry()}
      <meshBasicMaterial 
        color={getEnvironmentColor()} 
        transparent 
        opacity={isActive ? 0.8 : 0.3}
        wireframe
      />
    </mesh>
  );
};

const FloatingAvatar = ({ position, delay }: { position: Vector3; delay: number }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + delay) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 8, 8]} />
      <meshBasicMaterial color="#00BFFF" transparent opacity={0.7} />
    </mesh>
  );
};

const CinematicNavigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();

  const handleNavigation = (path: string) => {
    setIsNavigating(true);
    
    // Add cinematic transition effect
    setTimeout(() => {
      if (path.startsWith('#')) {
        // Smooth scroll to section
        const element = document.querySelector(path);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsNavigating(false);
    }, 800);
  };

  return (
    <div className="relative">
      {/* 3D Environment Preview */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-20 right-8 w-64 h-48 pointer-events-none z-50"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              
              {hoveredItem === 'team' ? (
                // Special case for team - show floating pods
                <>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FloatingAvatar
                      key={i}
                      position={new Vector3(
                        Math.cos((i / 5) * Math.PI * 2) * 2,
                        Math.sin((i / 5) * Math.PI * 2) * 2,
                        0
                      )}
                      delay={i * 0.5}
                    />
                  ))}
                </>
              ) : (
                <EnvironmentPreview 
                  environment={navigationItems.find(item => item.id === hoveredItem)?.environment || 'studio'}
                  isActive={true}
                />
              )}
            </Canvas>
            
            {/* Environment Description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border"
            >
              <p className="text-sm text-foreground font-medium">
                {navigationItems.find(item => item.id === hoveredItem)?.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Menu */}
      <nav className="flex items-center gap-2">
        {navigationItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
          >
            {item.path.startsWith('#') ? (
              <motion.button
                onClick={() => handleNavigation(item.path)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:bg-primary/10 hover:text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    rotate: hoveredItem === item.id ? 360 : 0,
                    scale: hoveredItem === item.id ? 1.2 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>
                <span className="hidden md:inline">{item.title}</span>
                
                {hoveredItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-2"
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                  </motion.div>
                )}
              </motion.button>
            ) : (
              <Link to={item.path}>
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:bg-primary/10 hover:text-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{
                      rotate: hoveredItem === item.id ? 360 : 0,
                      scale: hoveredItem === item.id ? 1.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className="hidden md:inline">{item.title}</span>
                  
                  {hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-2"
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                </motion.div>
              </Link>
            )}
          </motion.div>
        ))}
      </nav>

      {/* Navigation Transition Overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/50 backdrop-blur-lg z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-4 w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
              />
              <p className="text-lg font-medium text-foreground">
                Entering new scene...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinematicNavigation;