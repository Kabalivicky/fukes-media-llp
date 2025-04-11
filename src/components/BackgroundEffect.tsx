
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
            ? "radial-gradient(circle at 25% 60%, rgba(17, 24, 39, 0), rgba(17, 24, 39, 1)), radial-gradient(circle at 75% 10%, rgba(79, 70, 229, 0.2), rgba(17, 24, 39, 0) 50%)"
            : "radial-gradient(circle at 25% 60%, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), radial-gradient(circle at 75% 10%, rgba(79, 70, 229, 0.1), rgba(255, 255, 255, 0) 50%)"
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
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
};

export default BackgroundEffect;
