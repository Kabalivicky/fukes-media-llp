
import { useLocation, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Home, Calculator, MessagesSquare, Brain } from 'lucide-react';
import { handleAnchorClick, isLinkActive } from '@/utils/navigationData';
import AboutDropdown from './AboutDropdown';
import ServicesDropdown from './ServicesDropdown';
import ImmersiveDropdown from './ImmersiveDropdown';
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
    <NavigationMenu className="hidden xl:flex">
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

        {/* AI Tools */}
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(
              navigationMenuTriggerStyle(),
              "cursor-pointer",
              isLinkActive(currentPath, '/ai-tools') ? "text-primary font-medium" : ""
            )}
            onClick={() => handleNavigation('/ai-tools')}
          >
            <Brain className="mr-2 h-4 w-4" />
            AI Tools
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Immersive Dropdown */}
        <ImmersiveDropdown />

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
              isLinkActive(currentPath, '/#portfolio') ? "text-primary font-medium" : ""
            )}
            onClick={() => handleNavigation('/#portfolio')}
          >
            Portfolio
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Advanced Pricing */}
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(
              navigationMenuTriggerStyle(),
              "cursor-pointer",
              isLinkActive(currentPath, '/advanced-pricing') ? "text-primary font-medium" : ""
            )}
            onClick={() => handleNavigation('/advanced-pricing')}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Advanced Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        {/* AI Assistant */}
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(
              navigationMenuTriggerStyle(),
              "cursor-pointer",
              isLinkActive(currentPath, '/chat-assistant') ? "text-primary font-medium" : ""
            )}
            onClick={() => handleNavigation('/chat-assistant')}
          >
            <MessagesSquare className="mr-2 h-4 w-4" />
            AI Assistant
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
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;
