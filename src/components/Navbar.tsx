
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from '@/components/ui/button';
import MegaMenu from './MegaMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setTheme, theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const headerClasses = isScrolled 
    ? 'bg-background/90 backdrop-blur-xl shadow-lg'
    : 'bg-transparent';

  // Updated navigation links with all required pages
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "VFX Research", path: "/vfx-research" },
    { name: "VFX Industry Insights", path: "/vfx-industry-insights" },
    { name: "Resources", path: "/resources" },
    { name: "Help Center", path: "/help-center" },
    { name: "Production Guidelines", path: "/production-guidelines" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contract Builder", path: "/contract-builder" },
    { name: "Freelancer Portal", path: "/freelancer-portal" },
    { name: "Team", path: "/team" },
  ];

  // Home page anchor links
  const homeLinks = [
    { name: "Services", path: "/#services" },
    { name: "Portfolio", path: "/#portfolio" },
    { name: "Team", path: "/#team" },
    { name: "Careers", path: "/#careers" },
    { name: "Contact", path: "/#contact" }
  ];

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
    if (path.startsWith('/#')) {
      e.preventDefault();
      const id = path.substring(2);
      const element = document.getElementById(id);
      
      if (location.pathname !== '/') {
        // If not on home page, navigate there first
        window.location.href = path;
        return;
      }
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', path);
      }
    }
    
    setIsMenuOpen(false);
  };

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
            
            {/* Classic Navigation for lg screens */}
            <nav className="hidden lg:flex xl:hidden space-x-2" aria-label="Main navigation">
              {navLinks.map((link, index) => (
                <NavLink 
                  key={index}
                  to={link.path} 
                  className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/30'
                  }`}
                  onClick={(e) => handleLinkClick(e, link.path)}
                >
                  {link.name}
                </NavLink>
              ))}
              
              {/* Only show home page anchor links when on home page */}
              {location.pathname === '/' && homeLinks.map((link, index) => (
                <NavLink 
                  key={`home-${index}`}
                  to={link.path} 
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.hash === link.path.substring(1)
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/30'
                  }`}
                  onClick={(e) => handleLinkClick(e, link.path)}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className="rounded-full"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <button 
              className="lg:hidden p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted/30 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
            
            <Button className="gradient-button hidden lg:flex" asChild>
              <Link to="/#contact" onClick={(e) => handleLinkClick(e, '/#contact')}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
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
            {navLinks.map((link, index) => (
              <NavLink 
                key={index}
                to={link.path} 
                className={({ isActive }) => `px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
                }`}
                onClick={(e) => handleLinkClick(e, link.path)}
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
                {homeLinks.map((link, index) => (
                  <NavLink 
                    key={`home-mobile-${index}`}
                    to={link.path} 
                    className={`px-4 py-3 rounded-md transition-colors ${
                      location.hash === link.path.substring(1)
                        ? 'text-primary bg-primary/10' 
                        : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
                    }`}
                    onClick={(e) => handleLinkClick(e, link.path)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </>
            )}
            
            <Button className="gradient-button w-full mt-4" asChild>
              <Link to="/#contact" onClick={(e) => handleLinkClick(e, '/#contact')}>
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
