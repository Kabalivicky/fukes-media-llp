import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from "@/components/ui/theme-provider";

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

  const headerStyle = {
    backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none'
  };

  // Navigation links - update to add the VFX Industry Insights
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#services" },
    { name: "Portfolio", path: "/#portfolio" },
    { name: "Team", path: "/#team" },
    { name: "VFX Research", path: "/vfx-research" },
    { name: "VFX Industry Insights", path: "/vfx-industry-insights" },
    { name: "Pricing", path: "/pricing" },
    { name: "Careers", path: "/#careers" },
    { name: "Contact", path: "/#contact" }
  ];

  return <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300" style={headerStyle}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                alt="Fuke's Media Logo" 
                className="h-10" 
                src="/lovable-uploads/a0ad627e-2387-4f68-9856-c313d6d46f87.png"
              />
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map(link => (
                <NavLink to={link.path} className={({isActive}) => `nav-link ${isActive ? 'text-primary' : 'text-white/80 hover:text-white'}`}>
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-md hover:bg-white/10 transition">
              {theme === "dark" ? <Sun className="h-5 w-5 text-white/80" /> : <Moon className="h-5 w-5 text-white/80" />}
            </button>
            
            <button className="md:hidden p-2 text-white/80 hover:text-white transition" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <button className="gradient-button px-4 py-2 rounded-full text-white/90 hover:text-white hidden md:block">
              Get Started
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-black/90 backdrop-blur-lg border-b border-white/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map(link => (
              <NavLink to={link.path} className={({isActive}) => `${isActive ? 'text-primary' : 'text-white/80'} py-2`} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}
            <button className="gradient-button px-4 py-2 rounded-full text-white/90 hover:text-white">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>;
};

export default Navbar;
