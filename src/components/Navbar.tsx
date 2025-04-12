
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setTheme, theme } = useTheme();

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
    ? 'bg-background/80 backdrop-blur-xl shadow-lg'
    : 'bg-transparent';

  // Navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#services" },
    { name: "Portfolio", path: "/#portfolio" },
    { name: "Team", path: "/#team" },
    { name: "VFX Research", path: "/vfx-research" },
    { name: "VFX Industry Insights", path: "/vfx-industry-insights" },
    { name: "Help Center", path: "/help-center" },
    { name: "Pricing", path: "/pricing" },
    { name: "Careers", path: "/#careers" },
    { name: "Contact", path: "/#contact" }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 rainbow-border ${headerClasses}`} role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2" aria-label="Fuke's Media Home">
              <img 
                alt="Fuke's Media Logo" 
                className="h-10" 
                src="/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png"
              />
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden lg:flex space-x-4" aria-label="Main navigation">
              {navLinks.map((link, index) => (
                <NavLink 
                  key={index}
                  to={link.path} 
                  className={({isActive}) => 
                    `px-3 py-2 text-sm font-medium rounded-md transition-colors 
                     ${isActive 
                       ? 'text-primary bg-primary/10' 
                       : 'text-foreground/80 hover:text-foreground hover:bg-muted/30'}`
                  }
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
            
            <Button className="gradient-button hidden lg:flex">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div 
          className="lg:hidden absolute w-full bg-background/95 backdrop-blur-xl border-b border-border"
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
            {navLinks.map((link, index) => (
              <NavLink 
                key={index}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => 
                  `px-4 py-3 rounded-md transition-colors
                   ${isActive 
                     ? 'text-primary bg-primary/10' 
                     : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Button className="gradient-button w-full mt-4">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
