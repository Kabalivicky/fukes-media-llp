
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
  const currentPath = location.pathname + location.hash;
  
  return (
    <NavigationMenu className="hidden xl:flex">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <Button variant="link" className="p-0 w-full" asChild>
            <Link to="/">
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                isLinkActive(currentPath, '/') ? "text-primary font-medium" : ""
              )}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </NavigationMenuLink>
            </Link>
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
          <Button variant="link" className="p-0 w-full" asChild>
            <Link 
              to="/#portfolio"
              onClick={(e) => handleAnchorClick(e, '/#portfolio', currentPath)}
            >
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                isLinkActive(currentPath, '/#portfolio') ? "text-primary font-medium" : ""
              )}>
                Portfolio
              </NavigationMenuLink>
            </Link>
          </Button>
        </NavigationMenuItem>

        {/* Direct Links */}
        <NavigationMenuItem>
          <Button variant="link" className="p-0 w-full" asChild>
            <Link to="/pricing">
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                isLinkActive(currentPath, '/pricing') ? "text-primary font-medium" : ""
              )}>
                Pricing
              </NavigationMenuLink>
            </Link>
          </Button>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Button variant="link" className="p-0 w-full" asChild>
            <Link 
              to="/#contact"
              onClick={(e) => handleAnchorClick(e, '/#contact', currentPath)}
            >
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                isLinkActive(currentPath, '/#contact') ? "text-primary font-medium" : ""
              )}>
                Contact
              </NavigationMenuLink>
            </Link>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;
