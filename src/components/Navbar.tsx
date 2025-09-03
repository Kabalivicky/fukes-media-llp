import { Link, useNavigate } from 'react-router-dom';
import MegaMenu from './Navigation/MegaMenu';
import AnimatedLogo from './AnimatedLogo';
import MobileNav from './Navigation/MobileNav';
import { Button } from './ui/button';
import { Headset, User, LogOut } from 'lucide-react';
import ThemeToggle from './Navigation/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleGetStartedClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/#contact');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding - Left aligned */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <AnimatedLogo size="sm" showGlow={false} withParticles={false} showStrip={false} />
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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {user.user_metadata?.display_name || user.email?.split('@')[0] || 'Account'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/freelancer-portal')}>
                    <User className="mr-2 h-4 w-4" />
                    Freelancer Portal
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/contract-builder')}>
                    Contract Builder
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button size="sm" variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </Link>
            )}
            
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