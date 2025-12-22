import { useTheme } from "@/components/ui/theme-provider";

interface BackgroundEffectProps {
  className?: string;
}

/**
 * Lightweight CSS-only background effect for better performance
 */
const BackgroundEffect = ({ className = "" }: BackgroundEffectProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Simple gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === "dark" 
            ? "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.15) 0%, transparent 50%)"
            : "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.08) 0%, transparent 50%)"
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: theme === "dark"
            ? "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)"
            : "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default BackgroundEffect;
