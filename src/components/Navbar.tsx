import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from "@/components/ui/theme-provider"

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
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
  };
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300" style={headerStyle}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-white">
                Fuke Media
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <NavLink 
                to="/"
                className={({isActive}) => 
                  `nav-link ${isActive ? 'text-primary' : 'text-white/80 hover:text-white'}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/vfx-research"
                className={({isActive}) => 
                  `nav-link ${isActive ? 'text-primary' : 'text-white/80 hover:text-white'}`
                }
              >
                VFX Research
              </NavLink>
              <a href="#" className="text-white/80 hover:text-white transition">
                Services
              </a>
              <a href="#" className="text-white/80 hover:text-white transition">
                Portfolio
              </a>
              <a href="#" className="text-white/80 hover:text-white transition">
                Contact
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-md hover:bg-white/10 transition">
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-white/80" />
              ) : (
                <Moon className="h-5 w-5 text-white/80" />
              )}
            </button>
            
            <button 
              className="md:hidden p-2 text-white/80 hover:text-white transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
            <NavLink 
              to="/"
              className={({isActive}) => 
                `${isActive ? 'text-primary' : 'text-white/80'} py-2`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/vfx-research"
              className={({isActive}) => 
                `${isActive ? 'text-primary' : 'text-white/80'} py-2`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              VFX Research
            </NavLink>
            <a href="#" className="text-white/80 py-2" onClick={() => setIsMenuOpen(false)}>
              Services
            </a>
            <a href="#" className="text-white/80 py-2" onClick={() => setIsMenuOpen(false)}>
              Portfolio
            </a>
            <a href="#" className="text-white/80 py-2" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
            <button className="gradient-button px-4 py-2 rounded-full text-white/90 hover:text-white">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
