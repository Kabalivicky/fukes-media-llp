
import { useLocation } from 'react-router-dom';
import { FileText, User } from 'lucide-react';
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

const ToolsDropdown = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.hash;
  
  const isActive = currentPath === '/contract-builder';
  
  return (
    <NavigationMenuItem>
      <div className="flex items-center">
        <Button variant="link" className="p-0" asChild>
          <Link to="/contract-builder">
            <NavigationMenuLink className={cn(
              "group inline-flex h-10 mr-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
              isActive ? "text-primary font-medium" : ""
            )}>
              Tools
            </NavigationMenuLink>
          </Link>
        </Button>
        <NavigationMenuTrigger className="h-10 px-2">
          <span className="sr-only">Tools dropdown</span>
        </NavigationMenuTrigger>
      </div>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-6 md:grid-cols-1 lg:w-[500px]">
          <ListItem 
            href="/contract-builder" 
            title="Contract Builder"
            icon={<FileText className="mr-2 h-4 w-4" />}
          >
            Create customized VFX contracts with our AI-powered builder
          </ListItem>
          
          <ListItem 
            href="/freelancer-portal" 
            title="Freelancer Portal"
            icon={<User className="mr-2 h-4 w-4" />}
          >
            Access your freelancer dashboard, projects and payments
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ToolsDropdown;
