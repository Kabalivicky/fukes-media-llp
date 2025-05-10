
import { useLocation } from 'react-router-dom';
import { Users, Zap, ChevronRight } from 'lucide-react';
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
import { megaMenuSections, handleAnchorClick } from '@/utils/navigationData';

const AboutDropdown = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.hash;
  
  const isActive = currentPath === '/about';
  
  return (
    <NavigationMenuItem>
      <div className="flex items-center">
        <Button variant="link" className="p-0" asChild>
          <Link to="/about">
            <NavigationMenuLink className={cn(
              "group inline-flex h-10 mr-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
              isActive ? "text-primary font-medium" : ""
            )}>
              About
            </NavigationMenuLink>
          </Link>
        </Button>
        <NavigationMenuTrigger className="h-10 px-2">
          <span className="sr-only">About dropdown</span>
        </NavigationMenuTrigger>
      </div>
      <NavigationMenuContent>
        <ul className="grid gap-4 p-6 md:w-[500px] lg:w-[600px] grid-cols-2">
          <li className="row-span-3 bg-muted/30 rounded-lg overflow-hidden">
            <NavigationMenuLink asChild>
              <Link
                className="flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                to="/about"
              >
                <div className="mb-2 mt-4 text-lg font-medium">
                  About Fuke's Media
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  AI-Driven VFX & Creative Studio delivering exceptional visual effects and creative solutions
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          
          <ListItem 
            href="/team" 
            title="Our Team" 
            icon={<Users className="mr-2 h-4 w-4" />}
          >
            Meet our diverse team of creative professionals and technical experts
          </ListItem>
          
          <ListItem 
            href="/#investors" 
            title="Investors" 
            icon={<Zap className="mr-2 h-4 w-4" />}
            onClick={(e) => handleAnchorClick(e, '/#investors', currentPath)}
          >
            Learn about our investment partners and funding initiatives
          </ListItem>
          
          <ListItem 
            href="/#careers" 
            title="Careers" 
            icon={<ChevronRight className="mr-2 h-4 w-4" />}
            onClick={(e) => handleAnchorClick(e, '/#careers', currentPath)}
          >
            Join our team and become part of the future of VFX
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default AboutDropdown;
