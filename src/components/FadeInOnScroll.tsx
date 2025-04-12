
import { useRef, useEffect, useState, ReactNode } from 'react';

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  threshold?: number; // 0 to 1, percentage of element visible to trigger animation
  delay?: number; // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // pixels to travel
  duration?: number; // ms
}

const FadeInOnScroll = ({ 
  children, 
  className = '', 
  threshold = 0.1,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 700
}: FadeInOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 100); // Small delay before starting animation for smoother scrolling
          
          // Once visible, no need to observe anymore
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  // Define the initial and animated states based on direction
  const getInitialStyles = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return `opacity-0 translate-y-[${distance}px]`;
        case 'down': return `opacity-0 -translate-y-[${distance}px]`;
        case 'left': return `opacity-0 translate-x-[${distance}px]`;
        case 'right': return `opacity-0 -translate-x-[${distance}px]`;
        case 'none': return 'opacity-0';
        default: return `opacity-0 translate-y-[${distance}px]`;
      }
    }
    return 'opacity-100 translate-x-0 translate-y-0';
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all ease-out ${getInitialStyles()} ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
