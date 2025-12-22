
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mainNavLinks, homeAnchorLinks } from '@/utils/navigationData';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.hash;
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (path.includes('#')) {
      // For hash links
      const targetId = path.substring(path.includes('/#') ? 2 : 1);
      const element = document.getElementById(targetId);
      
      if (path.includes('/#') && location.pathname !== '/') {
        // Navigate to home page first, then scroll to the anchor
        navigate(path);
      } else if (element) {
        // If we're already on the correct page, just scroll to the element
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', path);
      } else {
        // If element doesn't exist, just navigate to the path
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  const handleGetStartedClick = () => {
    setIsMenuOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/#contact');
    }
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
          className="lg:hidden absolute w-full bg-background/95 backdrop-blur-xl border-b border-border max-h-[80vh] overflow-y-auto left-0 top-16"
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
            {/* Main Navigation Links - Show only most important ones for mobile */}
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "AI Tools", path: "/ai-tools" },
              { name: "Team", path: "/team" },
              { name: "Contact", path: "/#contact" }
            ].map((link, index) => (
              <a 
                key={index}
                href={link.path}
                className={`px-4 py-3 rounded-md transition-colors ${
                  isLinkActive(link.path)
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
                }`}
                onClick={(e) => handleLinkClick(e, link.path)}
              >
                {link.name}
              </a>
            ))}
            
            {/* Home page anchor links */}
            {location.pathname === '/' && (
              <>
                <div className="px-4 py-2 text-sm font-medium text-muted-foreground border-t border-border mt-2 pt-4">
                  Quick Links
                </div>
                {homeAnchorLinks.map((link, index) => (
                  <a 
                    key={`home-mobile-${index}`}
                    href={link.path}
                    className={`px-4 py-3 rounded-md transition-colors ${
                      location.hash === link.path.substring(1)
                        ? 'text-primary bg-primary/10' 
                        : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
                    }`}
                    onClick={(e) => handleLinkClick(e, link.path)}
                  >
                    {link.name}
                  </a>
                ))}
              </>
            )}
            
            <Button 
              className="gradient-button w-full mt-4" 
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
