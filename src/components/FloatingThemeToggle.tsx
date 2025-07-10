import { useTheme } from "@/components/ui/theme-provider";
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const FloatingThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show theme toggle after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Show immediately on mount for better UX
    setIsVisible(true);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-[60] md:bottom-8 md:right-8"
        style={{ 
          // Ensure it's above scroll-to-top button which is z-50
          transform: isVisible ? 'translateY(-60px)' : 'translateY(0px)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleToggle}
            className="relative overflow-hidden bg-background/80 backdrop-blur-lg border-border/50 hover:bg-background/90 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl w-12 h-12 md:w-14 md:h-14 rounded-full group"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20"
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Ripple effect on click */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 1.5, opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Moon Icon */}
            <motion.div
              initial={false}
              animate={{ 
                rotate: theme === "dark" ? 0 : 180,
                opacity: theme === "dark" ? 1 : 0,
                scale: theme === "dark" ? 1 : 0.5,
              }}
              transition={{ 
                duration: 0.5, 
                ease: "easeInOut",
                opacity: { duration: 0.3 }
              }}
              className="absolute"
            >
              <Moon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </motion.div>
            
            {/* Sun Icon */}
            <motion.div
              initial={false}
              animate={{ 
                rotate: theme === "dark" ? 180 : 0,
                opacity: theme === "dark" ? 0 : 1,
                scale: theme === "dark" ? 0.5 : 1,
              }}
              transition={{ 
                duration: 0.5, 
                ease: "easeInOut",
                opacity: { duration: 0.3 }
              }}
              className="absolute"
            >
              <Sun className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </motion.div>
            
            {/* Magnetic hover effect indicator */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/0 group-hover:border-primary/30"
              animate={{
                borderColor: isHovered ? "hsl(var(--primary) / 0.3)" : "hsl(var(--primary) / 0)",
              }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingThemeToggle;