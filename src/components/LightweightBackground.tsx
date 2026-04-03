import { useTheme } from '@/components/ui/theme-provider';

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
          backgroundImage: 'linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* RGB ambient orbs - GPU-accelerated with CSS animations */}
      <div 
        className="absolute top-[15%] right-[10%] w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full"
        style={{
          background: 'hsl(354 87% 50% / 0.06)',
          filter: 'blur(100px)',
          animation: 'rgb-orb-drift-1 20s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute top-[55%] left-[5%] w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full"
        style={{
          background: 'hsl(200 100% 45% / 0.05)',
          filter: 'blur(100px)',
          animation: 'rgb-orb-drift-2 25s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div 
        className="absolute top-[75%] right-[20%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full"
        style={{
          background: 'hsl(150 100% 40% / 0.04)',
          filter: 'blur(100px)',
          animation: 'rgb-orb-drift-3 22s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default LightweightBackground;
