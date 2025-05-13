
import { Link } from 'react-router-dom';
import MegaMenu from './Navigation/MegaMenu';
import AnimatedLogo from './AnimatedLogo';
import MobileNav from './Navigation/MobileNav';
import { Button } from './ui/button';
import { Headset } from 'lucide-react';
import ThemeToggle from './Navigation/ThemeToggle';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="container flex items-center justify-between h-16">
        {/* Logo & Branding */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <AnimatedLogo size="sm" />
            <span className="font-bold text-xl tracking-tight">Fuke's Media</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <MegaMenu />
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Link to="/news">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Industry News
            </Button>
          </Link>
          <Link to="/chat-assistant">
            <Button size="sm" className="gradient-button">
              <Headset className="mr-2 h-4 w-4" />
              AI Assistant
            </Button>
          </Link>
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
