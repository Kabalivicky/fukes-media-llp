
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from '@/components/ui/button';
import MegaMenu from './Navigation/MegaMenu';
import MobileNav from './Navigation/MobileNav';
import ThemeToggle from './Navigation/ThemeToggle';
import { handleAnchorClick } from '@/utils/navigationData';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClasses = isScrolled 
    ? 'bg-background/90 backdrop-blur-xl shadow-lg'
    : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 rainbow-border ${headerClasses}`} role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 mr-6" aria-label="Fuke's Media Home">
              <img 
                alt="Fuke's Media Logo" 
                className="h-8 md:h-10" 
                src="/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png"
              />
            </Link>
            
            {/* Mega Menu for XL screens */}
            <MegaMenu />
            
            {/* Classic Navigation for lg screens - hidden in xl, visible in lg */}
            <nav className="hidden lg:flex xl:hidden space-x-2" aria-label="Main navigation">
              {/* This will be handled by MegaMenu in XL screens */}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <MobileNav 
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
            
            <Button className="gradient-button hidden lg:flex" asChild>
              <Link to="/#contact" onClick={(e) => handleAnchorClick(e, '/#contact', currentPath)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
