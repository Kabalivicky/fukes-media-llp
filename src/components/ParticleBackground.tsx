
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useIsMobile } from '@/hooks/use-mobile';

const ParticleBackground = () => {
  const isMobile = useIsMobile();
  
  // Use significantly reduced counts for better performance
  const starCount = isMobile ? 500 : 1000;
  
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <Stars 
          radius={50}
          depth={50}
          count={starCount}
          factor={4}
          saturation={0.6}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
