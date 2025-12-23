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
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40"
      role="banner"
    >
      <div className="container mx-auto px-4">
        <nav 
          className="flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Logo & Branding - Left aligned */}
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              aria-label="Fuke's Media - Go to homepage"
            >
              <AnimatedLogo size="sm" showGlow={false} withParticles={false} showStrip={false} />
            </Link>
          </div>
          
          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <MegaMenu />
          </div>
          
          {/* Action Buttons - Right aligned */}
          <div className="flex items-center gap-3" role="group" aria-label="User actions">
            <ThemeToggle />
            
            <Link to="/shop" className="hidden sm:block">
              <Button variant="outline" size="sm" aria-label="Visit our shop">
                Shop
              </Button>
            </Link>
            
            <Link to="/news" className="hidden sm:block">
              <Button variant="ghost" size="sm" aria-label="Read industry news">
                Industry News
              </Button>
            </Link>
            
            <Link to="/chat-assistant">
              <Button size="sm" className="gradient-button" aria-label="Open AI Assistant chat">
                <Headset className="mr-2 h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">AI Assistant</span>
                <span className="sm:hidden" aria-hidden="true">AI</span>
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    aria-label="User menu"
                    aria-haspopup="menu"
                  >
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">
                      {user.user_metadata?.display_name || user.email?.split('@')[0] || 'Account'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/freelancer-portal')}>
                    <User className="mr-2 h-4 w-4" aria-hidden="true" />
                    Freelancer Portal
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/contract-builder')}>
                    Contract Builder
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button size="sm" variant="outline" aria-label="Sign in to your account">
                  <User className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </Link>
            )}
            
            <Button 
              size="sm" 
              className="gradient-button hidden md:flex"
              onClick={handleGetStartedClick}
              aria-label="Get started - scroll to contact section"
            >
              Get Started
            </Button>
            
            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;