
import { Link, useNavigate } from 'react-router-dom';
import MegaMenu from './Navigation/MegaMenu';
import AnimatedLogo from './AnimatedLogo';
import MobileNav from './Navigation/MobileNav';
import { Button } from './ui/button';
import { Headset } from 'lucide-react';
import ThemeToggle from './Navigation/ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/#contact');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding - Left aligned */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/98a66a3b-d5b0-4b14-891c-e5ee0f6dcbc3.png" 
                alt="Fuke's Media Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <MegaMenu />
          </div>
          
          {/* Action Buttons - Right aligned */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <Link to="/news" className="hidden sm:block">
              <Button variant="outline" size="sm">
                Industry News
              </Button>
            </Link>
            
            <Link to="/chat-assistant">
              <Button size="sm" className="gradient-button">
                <Headset className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">AI Assistant</span>
                <span className="sm:hidden">AI</span>
              </Button>
            </Link>
            
            <Button 
              size="sm" 
              className="gradient-button hidden md:flex"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
            
            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
