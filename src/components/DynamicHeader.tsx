import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import MegaMenu from './Navigation/MegaMenu';
import AnimatedLogo from './AnimatedLogo';
import MobileNav from './Navigation/MobileNav';
import { Button } from './ui/button';
import { Headset, User, LogOut, LayoutDashboard, FolderOpen, MessageCircle } from 'lucide-react';
import ThemeToggle from './Navigation/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import NotificationBell from '@/components/Notifications/NotificationBell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DynamicHeader = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { scrollY } = useScroll();

  // Transform scroll position to visual properties
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);
  const blurAmount = useTransform(scrollY, [0, 100], [8, 20]);
  const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.15]);

  // Create motion templates for CSS values
  const backdropFilter = useMotionTemplate`blur(${blurAmount}px)`;
  const boxShadow = useMotionTemplate`0 4px 30px rgba(0, 0, 0, ${shadowOpacity})`;
  const bgColor = useMotionTemplate`hsl(var(--background) / ${backgroundOpacity})`;

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
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50"
      role="banner"
    >
      {/* Dynamic background layer */}
      <motion.div 
        className="absolute inset-0 border-b border-border/20"
        style={{
          backgroundColor: bgColor,
          backdropFilter,
          boxShadow,
        }}
      />
      
      {/* Gradient accent line at top */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <nav 
          className="flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Logo & Branding - Left aligned */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              aria-label="Fuke's Media - Go to homepage"
            >
              <AnimatedLogo size="sm" showGlow={false} withParticles={false} showStrip={false} />
            </Link>
          </motion.div>
          
          {/* Desktop Navigation - Center */}
          <motion.div 
            className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MegaMenu />
          </motion.div>
          
          {/* Action Buttons - Right aligned */}
          <motion.div 
            className="flex items-center gap-3" 
            role="group" 
            aria-label="User actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
              <>
                <NotificationBell />
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
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden="true" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/messages')}>
                      <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                      Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/portfolio-manager')}>
                      <FolderOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                      Portfolio
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/freelancer-portal')}>
                      <User className="mr-2 h-4 w-4" aria-hidden="true" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
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
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
};

export default DynamicHeader;
