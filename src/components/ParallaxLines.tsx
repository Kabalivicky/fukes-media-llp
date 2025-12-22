import { useTheme } from '@/components/ui/theme-provider';

interface ParallaxLinesProps {
  count?: number;
  color?: string;
  opacity?: number;
  thickness?: number;
  speed?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal' | 'diagonal';
}

/**
 * Lightweight CSS-only lines for subtle visual effect.
 * Removed scroll-based animations for better performance.
 */
const ParallaxLines = ({ 
  count = 5, 
  color,
  opacity = 0.03, 
  thickness = 1, 
  className = '',
  direction = 'vertical'
}: ParallaxLinesProps) => {
  const { theme } = useTheme();

  // Default colors based on theme
  const defaultColor = theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))';
  const lineColor = color || defaultColor;

  const lines = Array(Math.min(count, 8)).fill(0).map((_, i) => {
    const position = `${((i + 1) / (count + 1)) * 100}%`;
    
    if (direction === 'vertical') {
      return (
        <div
          key={`line-${i}`}
          className="absolute h-full"
          style={{
            left: position,
            width: `${thickness}px`,
            backgroundColor: lineColor,
            opacity: opacity,
          }}
        />
      );
    } else if (direction === 'horizontal') {
      return (
        <div
          key={`line-${i}`}
          className="absolute w-full"
          style={{
            top: position,
            height: `${thickness}px`,
            backgroundColor: lineColor,
            opacity: opacity,
          }}
        />
      );
    } else {
      return (
        <div
          key={`line-${i}`}
          className="absolute"
          style={{
            top: `${(i / count) * 50}%`,
            left: `${(i / count) * 50}%`,
            width: '150%',
            height: `${thickness}px`,
            backgroundColor: lineColor,
            opacity: opacity,
            transform: 'rotate(45deg)',
            transformOrigin: '0 0',
          }}
        />
      );
    }
  });

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {lines}
    </div>
  );
};

export default ParallaxLines;
