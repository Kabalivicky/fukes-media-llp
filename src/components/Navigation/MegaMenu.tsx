
import { useLocation, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { handleAnchorClick, isLinkActive } from '@/utils/navigationData';
import AboutDropdown from './AboutDropdown';
import ServicesDropdown from './ServicesDropdown';
import ResourcesDropdown from './ResourcesDropdown';
import ToolsDropdown from './ToolsDropdown';

const MegaMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.hash;
  
  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>, path: string) => {
    e.preventDefault();
    
    if (path.includes('#')) {
      handleAnchorClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, path, currentPath);
    } else {
      navigate(path);
    }
  };
  
  return (
    <NavigationMenu className="hidden xl:flex">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <Button 
            variant="link" 
            className="p-0 w-full" 
            onClick={(e) => handleNavigation(e, '/')}
          >
            <NavigationMenuLink className={cn(
              navigationMenuTriggerStyle(),
              isLinkActive(currentPath, '/') ? "text-primary font-medium" : ""
            )}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </NavigationMenuLink>
          </Button>
        </NavigationMenuItem>

        {/* About Dropdown */}
        <AboutDropdown />

        {/* Services Dropdown */}
        <ServicesDropdown />

        {/* Resources Dropdown */}
        <ResourcesDropdown />

        {/* Tools Dropdown */}
        <ToolsDropdown />

        {/* Portfolio */}
        <NavigationMenuItem>
          <Button 
            variant="link" 
            className="p-0 w-full" 
            onClick={(e) => handleNavigation(e, '/#portfolio')}
          >
            <NavigationMenuLink className={cn(
              navigationMenuTriggerStyle(),
              isLinkActive(currentPath, '/#portfolio') ? "text-primary font-medium" : ""
            )}>
              Portfolio
            </NavigationMenuLink>
          </Button>
        </NavigationMenuItem>

        {/* Direct Links */}
        <NavigationMenuItem>
          <Button 
            variant="link" 
            className="p-0 w-full" 
            onClick={(e) => handleNavigation(e, '/pricing')}
          >
            <NavigationMenuLink className={cn(
              navigationMenuTriggerStyle(),
              isLinkActive(currentPath, '/pricing') ? "text-primary font-medium" : ""
            )}>
              Pricing
            </NavigationMenuLink>
          </Button>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Button 
            variant="link" 
            className="p-0 w-full" 
            onClick={(e) => handleNavigation(e, '/#contact')}
          >
            <NavigationMenuLink className={cn(
              navigationMenuTriggerStyle(),
              isLinkActive(currentPath, '/#contact') ? "text-primary font-medium" : ""
            )}>
              Contact
            </NavigationMenuLink>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;
