
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
        className="lg:hidden p-3 min-w-[44px] min-h-[44px] rounded-md text-foreground/70 hover:text-foreground hover:bg-muted/30 transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>
      
      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu panel */}
          <div 
            className="lg:hidden fixed w-full bg-background/95 backdrop-blur-xl border-b border-border max-h-[80vh] overflow-y-auto left-0 top-16 z-50 animate-slide-in-right"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1" role="navigation">
              {/* Main Navigation Links - Mobile optimized with larger touch targets */}
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
                  className={`px-4 py-4 min-h-[48px] rounded-md transition-colors flex items-center text-base focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    isLinkActive(link.path)
                      ? 'text-primary bg-primary/10 font-medium' 
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/30 active:bg-muted/50'
                  }`}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  aria-current={isLinkActive(link.path) ? 'page' : undefined}
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
                      className={`px-4 py-4 min-h-[48px] rounded-md transition-colors flex items-center text-base focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        location.hash === link.path.substring(1)
                          ? 'text-primary bg-primary/10 font-medium' 
                          : 'text-foreground/70 hover:text-foreground hover:bg-muted/30 active:bg-muted/50'
                      }`}
                      onClick={(e) => handleLinkClick(e, link.path)}
                      aria-current={location.hash === link.path.substring(1) ? 'page' : undefined}
                    >
                      {link.name}
                    </a>
                  ))}
                </>
              )}
              
              <Button 
                className="gradient-button w-full mt-4 min-h-[48px] text-base" 
                onClick={handleGetStartedClick}
                aria-label="Get started - scroll to contact section"
              >
                Get Started
              </Button>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default MobileNav;
