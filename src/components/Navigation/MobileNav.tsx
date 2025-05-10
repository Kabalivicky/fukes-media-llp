
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { mainNavLinks, homeAnchorLinks, handleAnchorClick } from '@/utils/navigationData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileNav = ({ isMenuOpen, setIsMenuOpen }: MobileNavProps) => {
  const location = useLocation();
  const currentPath = location.pathname + location.hash;
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, setIsMenuOpen]);
  
  // Function to determine if a link is active
  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    
    return location.pathname === path;
  };

  return (
    <>
      <button 
        className="lg:hidden p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted/30 transition"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div 
          className="lg:hidden absolute w-full bg-background/95 backdrop-blur-xl border-b border-border max-h-[80vh] overflow-y-auto"
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
            {/* Main Navigation Links */}
            {mainNavLinks.map((link, index) => (
              <NavLink 
                key={index}
                to={link.path} 
                className={({ isActive }) => `px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
                }`}
                onClick={(e) => link.path.startsWith('/#') && handleAnchorClick(e, link.path, currentPath)}
              >
                {link.name}
              </NavLink>
            ))}
            
            {/* Home page anchor links */}
            {location.pathname === '/' && (
              <>
                <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                  Home Page Sections
                </div>
                {homeAnchorLinks.map((link, index) => (
                  <NavLink 
                    key={`home-mobile-${index}`}
                    to={link.path} 
                    className={`px-4 py-3 rounded-md transition-colors ${
                      location.hash === link.path.substring(1)
                        ? 'text-primary bg-primary/10' 
                        : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
                    }`}
                    onClick={(e) => handleAnchorClick(e, link.path, currentPath)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </>
            )}
            
            <Button className="gradient-button w-full mt-4" asChild>
              <Link to="/#contact" onClick={(e) => handleAnchorClick(e, '/#contact', currentPath)}>
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
