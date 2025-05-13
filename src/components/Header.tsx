
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";
import MegaMenu from './Navigation/MegaMenu';
import ThemeToggle from './Navigation/ThemeToggle';
import { handleAnchorClick } from '@/utils/navigationData';
import AnimatedLogo from './AnimatedLogo';
import AnimatedIcon from './AnimatedIcon';
import { Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.hash;
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants for header
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  const headerClasses = isScrolled 
    ? 'bg-background/90 backdrop-blur-xl shadow-lg'
    : 'bg-transparent';
    
  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Create a mock anchor element event or use a different navigation approach
    navigate('/#contact');
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 rainbow-border ${headerClasses}`} 
      role="banner"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 mr-6" aria-label="Fuke's Media Home">
              <AnimatedLogo size="sm" className="mr-2" showGlow withParticles={false} />
              <motion.div 
                className="hidden md:block font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-fukes-blue via-fukes-green to-fukes-red"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Fuke's Media
              </motion.div>
            </Link>
            
            {/* Using the refactored MegaMenu from Navigation folder */}
            <MegaMenu />
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div 
              className="hidden md:flex items-center mr-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedIcon 
                icon={<Bell />} 
                withPulse 
                size="md"
                hoverColor={theme === 'dark' ? '#9b87f5' : '#8B5CF6'}
              />
            </motion.div>
            
            <ThemeToggle />
            
            <Button 
              className="gradient-button hidden lg:flex items-center gap-2" 
              onClick={handleContactClick}
            >
              Get Started
              <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
