
import { useRef, useEffect, useState, ReactNode } from 'react';

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  threshold?: number; // 0 to 1, percentage of element visible to trigger animation
  delay?: number; // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const FadeInOnScroll = ({ 
  children, 
  className = '', 
  threshold = 0.1,
  delay = 0,
  direction = 'up'
}: FadeInOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to observe anymore
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
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
        case 'up': return 'opacity-0 translate-y-8';
        case 'down': return 'opacity-0 -translate-y-8';
        case 'left': return 'opacity-0 translate-x-8';
        case 'right': return 'opacity-0 -translate-x-8';
        case 'none': return 'opacity-0';
        default: return 'opacity-0 translate-y-8';
      }
    }
    return 'opacity-100 translate-x-0 translate-y-0';
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${getInitialStyles()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
