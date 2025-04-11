
import { useTheme } from "@/components/ui/theme-provider";

interface BackgroundEffectProps {
  className?: string;
}

const BackgroundEffect = ({ className = "" }: BackgroundEffectProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Abstract gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background to-background/80"
        style={{
          backgroundImage: theme === "dark" 
            ? "radial-gradient(circle at 15% 50%, rgba(17, 24, 39, 0), rgba(17, 24, 39, 1)), radial-gradient(circle at 85% 30%, rgba(79, 70, 229, 0.25), rgba(17, 24, 39, 0) 50%), radial-gradient(circle at 75% 80%, rgba(236, 72, 153, 0.15), rgba(17, 24, 39, 0) 50%)"
            : "radial-gradient(circle at 15% 50%, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), radial-gradient(circle at 85% 30%, rgba(79, 70, 229, 0.15), rgba(255, 255, 255, 0) 50%), radial-gradient(circle at 75% 80%, rgba(236, 72, 153, 0.1), rgba(255, 255, 255, 0) 50%)"
        }}
      />
      
      {/* Animated gradient overlay for subtle movement */}
      <div 
        className="absolute inset-0 opacity-30 animate-gradient"
        style={{
          backgroundImage: theme === "dark"
            ? "linear-gradient(120deg, rgba(79, 70, 229, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(79, 70, 229, 0.1) 100%)"
            : "linear-gradient(120deg, rgba(79, 70, 229, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(79, 70, 229, 0.05) 100%)"
        }}
      />
      
      {/* Fine grid pattern */}
      <div 
        className="absolute inset-0 bg-grid-pattern bg-16 opacity-5"
        style={{
          backgroundImage: theme === "dark"
            ? "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)"
            : "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)"
        }}
      />
      
      {/* Soft noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      
      {/* Animated particle dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.floor(Math.random() * 8) + 4}px`,
              height: `${Math.floor(Math.random() * 8) + 4}px`,
              left: `${Math.floor(Math.random() * 100)}%`,
              top: `${Math.floor(Math.random() * 100)}%`,
              backgroundColor: theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(79, 70, 229, 0.5)",
              animationDuration: `${Math.floor(Math.random() * 10) + 6}s`,
              animationDelay: `${Math.floor(Math.random() * 5)}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundEffect;
