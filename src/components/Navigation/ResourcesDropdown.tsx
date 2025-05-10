
import { useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ListItem from './ListItem';

const ResourcesDropdown = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.hash;
  
  const isActive = currentPath === '/resources';
  
  return (
    <NavigationMenuItem>
      <div className="flex items-center">
        <Button variant="link" className="p-0" asChild>
          <Link to="/resources">
            <NavigationMenuLink className={cn(
              "group inline-flex h-10 mr-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
              isActive ? "text-primary font-medium" : ""
            )}>
              Resources
            </NavigationMenuLink>
          </Link>
        </Button>
        <NavigationMenuTrigger className="h-10 px-2">
          <span className="sr-only">Resources dropdown</span>
        </NavigationMenuTrigger>
      </div>
      <NavigationMenuContent>
        <ul className="grid w-[500px] gap-3 p-6 md:grid-cols-2 lg:w-[600px]">
          <ListItem 
            href="/vfx-research" 
            title="VFX Research"
            icon={<ChevronRight className="mr-2 h-4 w-4" />}
          >
            In-depth analysis of the global VFX industry landscape
          </ListItem>
          
          <ListItem 
            href="/vfx-industry-insights" 
            title="Industry Insights"
            icon={<ChevronRight className="mr-2 h-4 w-4" />}
          >
            Data-driven insights into VFX industry trends and developments
          </ListItem>
          
          <ListItem 
            href="/help-center" 
            title="Help Center"
            icon={<ChevronRight className="mr-2 h-4 w-4" />}
          >
            Resources, guides, and support for partners and clients
          </ListItem>
          
          <ListItem 
            href="/production-guidelines" 
            title="Production Guidelines"
            icon={<ChevronRight className="mr-2 h-4 w-4" />}
          >
            Technical specifications and workflow guides for productions
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ResourcesDropdown;
