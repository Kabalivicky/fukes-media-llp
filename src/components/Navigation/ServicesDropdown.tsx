
import { useLocation, useNavigate } from 'react-router-dom';
import { Film, Code, Palette } from 'lucide-react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ListItem from './ListItem';

const ServicesDropdown = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.hash;
  
  const isActive = currentPath === '/services';
  
  const handleMainButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/services');
  };
  
  return (
    <NavigationMenuItem>
      <div className="flex items-center">
        <Button variant="link" className="p-0" onClick={handleMainButtonClick}>
          <NavigationMenuLink className={cn(
            "group inline-flex h-10 mr-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
            isActive ? "text-primary font-medium" : ""
          )}>
            Services
          </NavigationMenuLink>
        </Button>
        <NavigationMenuTrigger className="h-10 px-2">
          <span className="sr-only">Services dropdown</span>
        </NavigationMenuTrigger>
      </div>
      <NavigationMenuContent>
        <ul className="grid w-[500px] gap-3 p-6 md:grid-cols-2 lg:w-[600px]">
          <ListItem 
            href="/services" 
            title="VFX Services" 
            icon={<Film className="mr-2 h-4 w-4" />}
          >
            Industry-leading visual effects for film, television, and digital media
          </ListItem>
          
          <ListItem 
            href="/services" 
            title="AI Integration" 
            icon={<Code className="mr-2 h-4 w-4" />}
          >
            Cutting-edge AI solutions for content creation and automation
          </ListItem>
          
          <ListItem 
            href="/services" 
            title="Production Support" 
            icon={<Film className="mr-2 h-4 w-4" />}
          >
            Comprehensive production services from pre to post
          </ListItem>
          
          <ListItem 
            href="/services" 
            title="Creative Direction" 
            icon={<Palette className="mr-2 h-4 w-4" />}
          >
            Expert creative guidance to bring your vision to life
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ServicesDropdown;
