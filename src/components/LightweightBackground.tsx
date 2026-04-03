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
      
      {/* RGB ambient orbs - subtle, slow-drifting */}
      <div 
        className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{
          background: 'hsl(354 87% 50% / 0.08)',
          animation: 'rgb-orb-drift-1 20s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute top-[55%] left-[5%] w-[450px] h-[450px] rounded-full blur-[120px]"
        style={{
          background: 'hsl(200 100% 45% / 0.06)',
          animation: 'rgb-orb-drift-2 25s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute top-[75%] right-[20%] w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{
          background: 'hsl(150 100% 40% / 0.05)',
          animation: 'rgb-orb-drift-3 22s ease-in-out infinite',
        }}
      />
    </div>
  );
};

export default LightweightBackground;
