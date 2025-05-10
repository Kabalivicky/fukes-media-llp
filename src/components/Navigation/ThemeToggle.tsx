
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
      className="rounded-full relative overflow-hidden"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotateZ: theme === "dark" ? 0 : 180,
          opacity: theme === "dark" ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon className="h-5 w-5" aria-hidden="true" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          rotateZ: theme === "dark" ? 180 : 0,
          opacity: theme === "dark" ? 0 : 1
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className="h-5 w-5" aria-hidden="true" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
