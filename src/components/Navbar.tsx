import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Showreel', path: '/showreel' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background' 
            : 'bg-gradient-to-b from-background/80 via-background/40 to-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-12 h-16 md:h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png" 
              alt="Fuke's Media" 
              className="h-7 md:h-8 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5 ml-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-white font-medium'
                    : 'text-gray-300 hover:text-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative hidden md:block"
                >
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Titles, projects, genres"
                    className="w-full bg-black/80 border border-white pl-10 pr-4 py-1.5 text-sm text-white placeholder:text-gray-400 focus:outline-none"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </motion.div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </AnimatePresence>
            
            {/* Notifications */}
            <Link to="/news" className="hidden md:block">
              <button 
                className="text-white hover:text-gray-300 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
            </Link>
            
            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                      <span className="text-white text-sm font-bold">FM</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-black/95 border-gray-700">
                  <DropdownMenuItem 
                    onClick={() => navigate('/freelancer-portal')}
                    className="text-white hover:bg-gray-800"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate('/contract-builder')}
                    className="text-white hover:bg-gray-800"
                  >
                    Contract Builder
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="text-white hover:bg-gray-800"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden md:flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                      <span className="text-white text-sm font-bold">FM</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white group-hover:rotate-180 transition-transform" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-black/95 border-gray-700">
                  <DropdownMenuItem 
                    onClick={() => navigate('/auth')}
                    className="text-white hover:bg-gray-800"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/90"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-16 left-0 right-0 bg-background border-t border-gray-800 p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg py-2 transition-colors ${
                      location.pathname === link.path
                        ? 'text-white font-medium'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {!user && (
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg py-2 text-gray-400 hover:text-white"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
