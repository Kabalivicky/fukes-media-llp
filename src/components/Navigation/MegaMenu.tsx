
import { useLocation, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Home, Calculator, Palette, FileText, Users } from 'lucide-react';
import { handleAnchorClick, isLinkActive } from '@/utils/navigationData';
import AboutDropdown from './AboutDropdown';
import ServicesDropdown from './ServicesDropdown';
import ResourcesDropdown from './ResourcesDropdown';
import ToolsDropdown from './ToolsDropdown';

const MegaMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.hash;
  
  const handleNavigation = (path: string) => {
    if (path.includes('#')) {
      handleAnchorClick(
        { preventDefault: () => {} } as any,
        path,
        currentPath
      );
    } else {
      navigate(path);
    }
  };
  
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(
              navigationMenuTriggerStyle(),
              "cursor-pointer",
              isLinkActive(currentPath, '/') ? "text-primary font-medium" : ""
            )}
            onClick={() => handleNavigation('/')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </NavigationMenuLink>
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
          <NavigationMenuLink 
            className={cn(
              navigationMenuTriggerStyle(),
              "cursor-pointer",
              isLinkActive(currentPath, '/portfolio') ? "text-primary font-medium" : ""
            )}
            onClick={() => handleNavigation('/portfolio')}
          >
            <Palette className="mr-2 h-4 w-4" />
            Portfolio
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        {/* Contact */}
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(
              navigationMenuTriggerStyle(),
              "cursor-pointer",
              isLinkActive(currentPath, '/#contact') ? "text-primary font-medium" : ""
            )}
            onClick={() => handleNavigation('/#contact')}
          >
            <Users className="mr-2 h-4 w-4" />
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;
