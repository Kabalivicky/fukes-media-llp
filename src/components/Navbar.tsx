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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <AnimatedLogo size="sm" showGlow={true} withParticles={false} showStrip={true} />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-3xl mx-4">
            <MegaMenu />
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            
            <Link to="/news" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                News
              </Button>
            </Link>
            
            <Link to="/chat-assistant">
              <Button size="sm" className="btn-gradient btn-glow">
                <Headset className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">AI Assistant</span>
                <span className="sm:hidden">AI</span>
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="glass-subtle border-border/50">
                    <User className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">
                      {user.user_metadata?.display_name || user.email?.split('@')[0] || 'Account'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 glass border-border/50">
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
                <Button size="sm" variant="outline" className="glass-subtle border-border/50">
                  <User className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </Link>
            )}
            
            <Button 
              size="sm" 
              variant="outline"
              className="hidden md:flex border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
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
    </nav>
  );
};

export default Navbar;
