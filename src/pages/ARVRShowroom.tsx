import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text3D, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Headset, Camera, Play, Maximize, RotateCcw } from 'lucide-react';
import { Mesh } from 'three';

interface ShowroomItemProps {
  position: [number, number, number];
  title: string;
  description: string;
  onSelect: () => void;
  isSelected: boolean;
}

const ShowroomItem = ({ position, title, description, onSelect, isSelected }: ShowroomItemProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onSelect}
        scale={isSelected ? 1.2 : 1}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={isSelected ? '#0057B7' : '#4A90E2'} 
          transparent 
          opacity={0.8}
          wireframe={!isSelected}
        />
      </mesh>
      
      <Html distanceFactor={10} position={[0, 2, 0]}>
        <div className="bg-background/90 backdrop-blur-sm p-3 rounded-lg border min-w-[200px] text-center">
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
          {isSelected && (
            <Button size="sm" className="mt-2">
              Enter Scene
            </Button>
          )}
        </div>
      </Html>
    </group>
  );
};

const VirtualStudio = () => {
  return (
    <group>
      {/* LED Wall */}
      <mesh position={[0, 2, -8]} rotation={[0, 0, 0]}>
        <planeGeometry args={[16, 8]} />
        <meshBasicMaterial color="#1a1a2e" opacity={0.8} transparent />
      </mesh>
      
      {/* Studio Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Lighting Rigs */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 8,
            4,
            Math.sin((i / 6) * Math.PI * 2) * 8
          ]}
        >
          <cylinderGeometry args={[0.2, 0.2, 1]} />
          <meshStandardMaterial color="#ffff80" emissive="#ffff40" />
        </mesh>
      ))}
    </group>
  );
};

const ARVRShowroom = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'vr' | '360'>('3d');
  const [isLoading, setIsLoading] = useState(false);

  const showroomItems = [
    {
      id: 'led-studio',
      title: 'LED Wall Studio',
      description: 'Virtual production environment with real-time backgrounds',
      position: [-6, 0, 0] as [number, number, number]
    },
    {
      id: 'vr-stage',
      title: 'VR Capture Stage',
      description: 'Motion capture and VR content creation space',
      position: [0, 0, 0] as [number, number, number]
    },
    {
      id: 'rendering-farm',
      title: 'Render Farm',
      description: 'High-performance computing cluster visualization',
      position: [6, 0, 0] as [number, number, number]
    }
  ];

  const handleItemSelect = (id: string) => {
    setSelectedItem(selectedItem === id ? null : id);
  };

  const enterVRMode = () => {
    setIsLoading(true);
    setViewMode('vr');
    // Simulate VR initialization
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">AR/VR Showroom</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take a virtual tour of our state-of-the-art facilities and explore our production environments in immersive 3D.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={viewMode === '3d' ? 'default' : 'outline'}
            onClick={() => setViewMode('3d')}
          >
            <Camera className="w-4 h-4 mr-2" />
            3D View
          </Button>
          <Button
            variant={viewMode === 'vr' ? 'default' : 'outline'}
            onClick={enterVRMode}
            disabled={isLoading}
          >
            <Headset className="w-4 h-4 mr-2" />
            {isLoading ? 'Initializing...' : 'VR Mode'}
          </Button>
          <Button
            variant={viewMode === '360' ? 'default' : 'outline'}
            onClick={() => setViewMode('360')}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            360° Tour
          </Button>
        </div>

        {/* 3D Showroom */}
        <div className="h-[600px] rounded-lg overflow-hidden border bg-muted/5">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 5, 15]} />
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={25}
            />
            
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            
            <Suspense fallback={null}>
              <Environment preset="studio" />
              
              {/* Virtual Studio Environment */}
              <VirtualStudio />
              
              {/* Showroom Items */}
              {showroomItems.map((item) => (
                <ShowroomItem
                  key={item.id}
                  position={item.position}
                  title={item.title}
                  description={item.description}
                  onSelect={() => handleItemSelect(item.id)}
                  isSelected={selectedItem === item.id}
                />
              ))}
            </Suspense>
          </Canvas>
        </div>

        {/* Information Panel */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>
                    {showroomItems.find(item => item.id === selectedItem)?.title}
                  </CardTitle>
                  <CardDescription>
                    {showroomItems.find(item => item.id === selectedItem)?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Start Tour
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Maximize className="w-4 h-4 mr-2" />
                      Fullscreen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-lg font-medium">Initializing VR Experience...</p>
                <p className="text-sm text-muted-foreground">Please put on your VR headset</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ARVRShowroom;