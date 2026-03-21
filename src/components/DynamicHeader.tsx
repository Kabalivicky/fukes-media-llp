import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import MegaMenu from './Navigation/MegaMenu';
import MobileNav from './Navigation/MobileNav';
import { Button } from './ui/button';
import { Headset, User, LogOut, LayoutDashboard, FolderOpen, MessageCircle } from 'lucide-react';
import ThemeToggle from './Navigation/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import NotificationBell from '@/components/Notifications/NotificationBell';
import { GlobalSearch } from '@/components/Search/GlobalSearch';
import { useTheme } from '@/components/ui/theme-provider';
import logoBlack from '@/assets/logo-black.png';
import logoWhite from '@/assets/logo-white.png';
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
  const { theme } = useTheme();

  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.7, 0.95]);
  const blurAmount = useTransform(scrollY, [0, 100], [12, 24]);
  const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

  const backdropFilter = useMotionTemplate`blur(${blurAmount}px) saturate(180%)`;
  const boxShadow = useMotionTemplate`0 1px 3px rgba(0, 0, 0, ${shadowOpacity})`;
  const bgColor = useMotionTemplate`hsl(var(--background) / ${backgroundOpacity})`;

  const logoSrc = theme === 'dark' ? logoWhite : logoBlack;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <motion.header className="fixed top-[30px] left-0 right-0 z-50" role="banner">
      <motion.div 
        className="absolute inset-0 border-b border-border/10"
        style={{ backgroundColor: bgColor, backdropFilter, boxShadow }}
      />
      
      {/* RGB accent line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, #C8102E, #0077B6, #00A651)' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/" 
              className="flex items-center hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              aria-label="Fuke's Media - Home"
            >
              <img src={logoSrc} alt="Fuke's Media" className="h-10 w-auto object-contain" />
            </Link>
          </motion.div>
          
          {/* Desktop Nav */}
          <motion.div 
            className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MegaMenu />
          </motion.div>
          
          {/* Actions */}
          <motion.div 
            className="flex items-center gap-2" 
            role="group" 
            aria-label="User actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlobalSearch />
            <ThemeToggle />
            
            <Link to="/chat-assistant" className="hidden sm:block">
              <Button size="sm" className="gradient-button rounded-full text-xs" aria-label="AI Assistant">
                <Headset className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden md:inline">AI Assistant</span>
              </Button>
            </Link>
            
            {user ? (
              <>
                <NotificationBell />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full" aria-label="User menu">
                      <User className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline ml-1.5">
                        {user.user_metadata?.display_name || user.email?.split('@')[0] || 'Account'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl">
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/messages')}>
                      <MessageCircle className="mr-2 h-4 w-4" /> Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/portfolio-manager')}>
                      <FolderOpen className="mr-2 h-4 w-4" /> Portfolio
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/freelancer-portal')}>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm" variant="outline" className="rounded-full" aria-label="Sign in">
                  <User className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </Link>
            )}
            
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
