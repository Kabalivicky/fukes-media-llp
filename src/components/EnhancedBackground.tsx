import { useTheme } from '@/components/ui/theme-provider';

/**
 * Lightweight CSS-only background for better performance.
 * Replaces the heavy particle animation version.
 */
const EnhancedBackground = () => {
  const { theme } = useTheme();

  return (
    <div 
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none"
      style={{ backgroundColor: theme === 'dark' ? 'hsl(var(--background))' : 'hsl(var(--background))' }}
    >
      {/* Primary gradient */}
      <div
        className="absolute inset-0"
        style={{ 
          background: theme === 'dark' 
            ? 'radial-gradient(ellipse 60% 40% at 50% 0%, hsl(var(--primary) / 0.12) 0%, transparent 50%)' 
            : 'radial-gradient(ellipse 60% 40% at 50% 0%, hsl(var(--primary) / 0.06) 0%, transparent 50%)'
        }}
      />
      
      {/* Secondary accent */}
      <div 
        className="absolute -bottom-[200px] -right-[100px] w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ 
          background: 'hsl(var(--primary) / 0.05)'
        }}
      />
      
      <div 
        className="absolute -top-[150px] -left-[100px] w-[400px] h-[400px] rounded-full blur-3xl"
        style={{ 
          background: 'hsl(var(--secondary) / 0.04)'
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(hsl(var(--foreground) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};

export default EnhancedBackground;
