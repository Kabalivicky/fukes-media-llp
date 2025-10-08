import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface VideoBackgroundProps {
  videoUrl?: string;
  opacity?: number;
  showOverlay?: boolean;
}

const VideoBackground = ({ 
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playsinline=1',
  opacity = 0.15,
  showOverlay = true
}: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Create parallax effect for video
  const videoOpacity = useTransform(
    scrollY,
    [0, 300, 800],
    [opacity, opacity * 0.5, 0]
  );
  
  const videoScale = useTransform(
    scrollY,
    [0, 1000],
    [1, 1.1]
  );

  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      ref={videoRef}
      className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none"
      style={{ opacity: videoOpacity }}
    >
      {/* Video container with scale animation */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ scale: videoScale }}
      >
        {/* YouTube Embed - You can replace this with actual showreel video */}
        <iframe
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={videoUrl}
          title="Showreel Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            pointerEvents: 'none',
          }}
        />
        
        {/* Fallback/Loading state */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card animate-pulse" />
        )}
      </motion.div>
      
      {/* Overlay gradient for better content readability */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      )}
      
      {/* Additional vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/90" />
    </motion.div>
  );
};

export default VideoBackground;
