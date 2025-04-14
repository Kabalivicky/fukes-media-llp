import { useState, useEffect } from 'react';

interface CursorOptions {
  trailLength?: number;
  trailColor?: string;
  trailSize?: number;
  hideNativeCursor?: boolean;
  blendMode?: string;
  enabled?: boolean;
}

/**
 * Custom hook for creating advanced cursor effects
 */
const useCursorEffect = ({
  trailLength = 10,
  trailColor = 'rgba(255, 255, 255, 0.5)',
  trailSize = 8, 
  hideNativeCursor = false,
  blendMode = 'normal',
  enabled = true
}: CursorOptions = {}) => {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorHistory, setCursorHistory] = useState<Array<{x: number, y: number}>>([]);
  
  useEffect(() => {
    if (!enabled) return;
    
    // Create canvas for the cursor trail
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.globalCompositeOperation = blendMode as GlobalCompositeOperation;
    }
    
    // Hide the native cursor if requested
    if (hideNativeCursor) {
      document.documentElement.style.cursor = 'none';
    }
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
      
      // Add current position to history
      setCursorHistory(prev => {
        const newHistory = [...prev, { x: e.clientX, y: e.clientY }];
        // Keep only the latest positions based on trailLength
        if (newHistory.length > trailLength) {
          return newHistory.slice(newHistory.length - trailLength);
        }
        return newHistory;
      });
    };
    
    // Mouse leave handler
    const handleMouseLeave = () => {
      setCursorVisible(false);
    };
    
    // Window resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Render loop
    const render = () => {
      if (!ctx) return;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Only draw if cursor is visible
      if (cursorVisible) {
        // Draw trail
        cursorHistory.forEach((pos, index) => {
          // Calculate size based on position in history
          const size = trailSize * (index / cursorHistory.length);
          
          // Calculate opacity based on position in history
          const opacity = index / cursorHistory.length;
          
          ctx.fillStyle = trailColor.replace(')', `, ${opacity})`);
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Draw main cursor
        ctx.fillStyle = trailColor;
        ctx.beginPath();
        ctx.arc(position.x, position.y, trailSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      requestAnimationFrame(render);
    };
    
    // Register event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    
    // Start render loop
    const animationId = requestAnimationFrame(render);
    
    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      document.body.removeChild(canvas);
      
      if (hideNativeCursor) {
        document.documentElement.style.cursor = '';
      }
    };
  }, [
    trailLength, 
    trailColor, 
    trailSize, 
    hideNativeCursor, 
    blendMode, 
    enabled
  ]);
  
  return {
    position,
    cursorVisible,
    setCursorVisible
  };
};

export default useCursorEffect;
