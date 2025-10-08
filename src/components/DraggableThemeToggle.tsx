import { useTheme } from "@/components/ui/theme-provider";
import { Button } from '@/components/ui/button';
import { Sun, Moon, GripVertical } from 'lucide-react';
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const DraggableThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const dragControls = useDragControls();
  
  // Load saved position from localStorage
  const [position, setPosition] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('themeTogglePosition');
      return saved ? JSON.parse(saved) : { x: 0, y: 0 };
    }
    return { x: 0, y: 0 };
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleDragEnd = (_: any, info: any) => {
    const newPosition = { x: info.point.x, y: info.point.y };
    setPosition(newPosition);
    localStorage.setItem('themeTogglePosition', JSON.stringify(newPosition));
  };

  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-24 right-6 z-[60] md:bottom-28 md:right-8 cursor-move"
        style={{ 
          x: position.x,
          y: position.y,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative"
        >
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleToggle}
            className="relative overflow-hidden bg-background/90 backdrop-blur-lg border-border/50 hover:bg-background hover:border-primary/50 transition-all duration-300 shadow-2xl hover:shadow-primary/20 w-14 h-14 md:w-16 md:h-16 rounded-full group"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {/* Drag handle indicator */}
            <motion.div
              className="absolute top-1 left-1/2 -translate-x-1/2"
              animate={{ opacity: isHovered ? 1 : 0.3 }}
            >
              <GripVertical className="h-3 w-3 text-muted-foreground" />
            </motion.div>
            
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"
              animate={{
                opacity: isHovered ? 0.8 : 0,
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 180 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Ripple effect on click */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 2, opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.6 }}
            />
            
            {/* Moon Icon */}
            <motion.div
              initial={false}
              animate={{ 
                rotate: theme === "dark" ? 0 : 180,
                opacity: theme === "dark" ? 1 : 0,
                scale: theme === "dark" ? 1 : 0.3,
              }}
              transition={{ 
                duration: 0.5, 
                ease: "easeInOut",
              }}
              className="absolute"
            >
              <Moon className="h-6 w-6 md:h-7 md:w-7 text-primary drop-shadow-lg" />
            </motion.div>
            
            {/* Sun Icon */}
            <motion.div
              initial={false}
              animate={{ 
                rotate: theme === "dark" ? 180 : 0,
                opacity: theme === "dark" ? 0 : 1,
                scale: theme === "dark" ? 0.3 : 1,
              }}
              transition={{ 
                duration: 0.5, 
                ease: "easeInOut",
              }}
              className="absolute"
            >
              <Sun className="h-6 w-6 md:h-7 md:w-7 text-secondary drop-shadow-lg" />
            </motion.div>
            
            {/* Orbital ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: 'hsl(var(--primary))' }}
              animate={{ 
                opacity: isHovered ? 0.5 : 0,
                rotate: 360,
              }}
              transition={{ 
                opacity: { duration: 0.3 },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            />
          </Button>
          
          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-popover/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg border border-border/50"
              >
                Drag to move • Click to toggle theme
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DraggableThemeToggle;
