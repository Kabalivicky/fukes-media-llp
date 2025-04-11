
import { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from "@/components/ui/theme-provider";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialize
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Star properties
    const starCount = isMobile ? 80 : 200;
    const stars: {x: number; y: number; size: number; speed: number; opacity: number}[] = [];
    
    // Colors based on theme
    const lightModeColor = "rgba(0, 0, 0, 0.05)";
    const darkModeColor = "rgba(255, 255, 255, 0.1)";
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.05 + 0.01,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    // Animation
    let animationId: number;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with theme-appropriate background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        // Update position
        star.y = (star.y + star.speed) % canvas.height;
        
        // Draw star with theme-appropriate color
        ctx.beginPath();
        ctx.fillStyle = theme === "dark" 
          ? `rgba(255, 255, 255, ${star.opacity})` 
          : `rgba(0, 0, 0, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile, theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{ 
        opacity: 0.8,
        mixBlendMode: theme === "dark" ? "screen" : "multiply"
      }}
    />
  );
};

export default ParticleBackground;
