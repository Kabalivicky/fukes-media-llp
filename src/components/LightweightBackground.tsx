import { useTheme } from '@/components/ui/theme-provider';

/**
 * A lightweight CSS-only background that performs well on all devices.
 * Replaces heavy WebGL/Canvas backgrounds for better performance.
 */
const LightweightBackground = () => {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(ellipse 80% 80% at 50% -20%, hsl(var(--primary) / 0.15) 0%, transparent 50%), linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 100%)'
            : 'radial-gradient(ellipse 80% 80% at 50% -20%, hsl(var(--primary) / 0.08) 0%, transparent 50%), linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 100%)'
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: theme === 'dark'
            ? 'linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)'
            : 'linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Accent glow spots - pure CSS, no animation */}
      <div 
        className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'hsl(var(--primary) / 0.08)'
        }}
      />
      <div 
        className="absolute top-2/3 -left-20 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'hsl(var(--secondary) / 0.06)'
        }}
      />
    </div>
  );
};

export default LightweightBackground;
