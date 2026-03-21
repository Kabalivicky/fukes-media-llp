import { useLocation, useNavigate } from 'react-router-dom';
import {
  NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Home, Palette, Users, Newspaper } from 'lucide-react';
import { handleAnchorClick, isLinkActive } from '@/utils/navigationData';
import AboutDropdown from './AboutDropdown';
import ServicesDropdown from './ServicesDropdown';
import ToolsDropdown from './ToolsDropdown';

const MegaMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.hash;
  
  const handleNavigation = (path: string) => {
    if (path.includes('#')) {
      handleAnchorClick({ preventDefault: () => {} } as any, path, currentPath);
    } else {
      navigate(path);
    }
  };
  
  return (
    <NavigationMenu className="hidden lg:flex" aria-label="Main navigation">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(navigationMenuTriggerStyle(), "cursor-pointer rounded-full", isLinkActive(currentPath, '/') ? "text-brand-red font-medium" : "")}
            onClick={() => handleNavigation('/')}
          >
            <Home className="mr-2 h-4 w-4" />Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <AboutDropdown />
        <ServicesDropdown />
        <ToolsDropdown />
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(navigationMenuTriggerStyle(), "cursor-pointer rounded-full", isLinkActive(currentPath, '/portfolio') ? "text-brand-red font-medium" : "")}
            onClick={() => handleNavigation('/portfolio')}
          >
            <Palette className="mr-2 h-4 w-4" />Portfolio
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(navigationMenuTriggerStyle(), "cursor-pointer rounded-full", isLinkActive(currentPath, '/news') ? "text-brand-red font-medium" : "")}
            onClick={() => handleNavigation('/news')}
          >
            <Newspaper className="mr-2 h-4 w-4" />News
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(navigationMenuTriggerStyle(), "cursor-pointer rounded-full", isLinkActive(currentPath, '/#contact') ? "text-brand-red font-medium" : "")}
            onClick={() => handleNavigation('/#contact')}
          >
            <Users className="mr-2 h-4 w-4" />Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;
