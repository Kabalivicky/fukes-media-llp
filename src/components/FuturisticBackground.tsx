import { useTheme } from '@/components/ui/theme-provider';

interface FuturisticBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

/**
 * Lightweight CSS-only futuristic background.
 * Removed all animations for better performance.
 */
const FuturisticBackground = ({
  className = '',
  intensity = 'medium'
}: FuturisticBackgroundProps) => {
  const { theme } = useTheme();
  
  const gridOpacity = {
    low: 0.02,
    medium: 0.03,
    high: 0.05
  };
  
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle at 50% 50%, hsl(var(--background)) 0%, hsl(var(--background)) 100%)'
            : 'radial-gradient(circle at 50% 50%, hsl(var(--background)) 0%, hsl(var(--background)) 100%)'
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: theme === 'dark'
            ? `linear-gradient(to right, hsl(var(--foreground) / 0.05) 1px, transparent 1px), 
               linear-gradient(to bottom, hsl(var(--foreground) / 0.05) 1px, transparent 1px)`
            : `linear-gradient(to right, hsl(var(--foreground) / 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, hsl(var(--foreground) / 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: gridOpacity[intensity]
        }}
      />
      
      {/* Static accent glows */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-1/2 blur-3xl"
        style={{
          background: 'radial-gradient(circle at 100% 0%, hsl(var(--primary) / 0.08) 0%, transparent 50%)',
        }}
      />
      
      <div 
        className="absolute bottom-0 left-0 w-1/2 h-1/2 blur-3xl"
        style={{
          background: 'radial-gradient(circle at 0% 100%, hsl(var(--secondary) / 0.06) 0%, transparent 50%)',
        }}
      />
    </div>
  );
};

export default FuturisticBackground;