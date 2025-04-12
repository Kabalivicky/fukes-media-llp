
import { useRef, useEffect } from 'react';
import { useTheme } from "@/components/ui/theme-provider";
import { useIsMobile } from '@/hooks/use-mobile';

const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollY = window.scrollY;
      const elements = containerRef.current.querySelectorAll('.parallax-element');
      
      elements.forEach((element, index) => {
        const speed = index % 3 === 0 ? 0.05 : index % 3 === 1 ? 0.08 : 0.03;
        const yPos = scrollY * speed;
        
        if (element instanceof HTMLElement) {
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate a set of elements for the parallax effect
  const generateParallaxElements = () => {
    const elements = [];
    const colors = [
      'fukes-blue', 'fukes-red', 'fukes-green', 'fukes-gold', 'fukes-cyan'
    ];
    
    // Create fewer elements on mobile
    const count = isMobile ? 5 : 12;
    
    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.random() * 200) + 50;
      const opacity = (Math.random() * 0.08) + 0.02;
      const colorClass = colors[i % colors.length];
      
      elements.push(
        <div
          key={i}
          className={`parallax-element absolute rounded-full bg-${colorClass} blur-3xl`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${(Math.random() * 200) + 10}%`,
            opacity: opacity,
            transform: 'translateY(0)',
            zIndex: -1
          }}
          aria-hidden="true"
        />
      );
    }
    
    return elements;
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: -1
      }}
    >
      {generateParallaxElements()}
    </div>
  );
};

export default ParallaxBackground;
