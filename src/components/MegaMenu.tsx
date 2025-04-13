
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const MegaMenu = () => {
  return (
    <NavigationMenu className="hidden xl:flex">
      <NavigationMenuList>
        {/* About Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    to="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Fuke's Media
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      AI-Driven VFX & Creative Studio delivering exceptional visual effects and creative solutions
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/#team" title="Our Team">
                Meet our diverse team of creative professionals and technical experts
              </ListItem>
              <ListItem href="/#investors" title="Investors">
                Learn about our investment partners and funding initiatives
              </ListItem>
              <ListItem href="/#careers" title="Careers">
                Join our team and become part of the future of VFX
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Services Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/#services" title="VFX Services">
                Industry-leading visual effects for film, television, and digital media
              </ListItem>
              <ListItem href="/#services" title="AI Integration">
                Cutting-edge AI solutions for content creation and automation
              </ListItem>
              <ListItem href="/#services" title="Production Support">
                Comprehensive production services from pre to post
              </ListItem>
              <ListItem href="/#services" title="Creative Direction">
                Expert creative guidance to bring your vision to life
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Resources Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/vfx-research" title="VFX Research">
                In-depth analysis of the global VFX industry landscape
              </ListItem>
              <ListItem href="/vfx-industry-insights" title="Industry Insights">
                Data-driven insights into VFX industry trends and developments
              </ListItem>
              <ListItem href="/help-center" title="Help Center">
                Resources, guides, and support for partners and clients
              </ListItem>
              <ListItem href="/production-guidelines" title="Production Guidelines">
                Technical specifications and workflow guides for productions
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Direct Links */}
        <NavigationMenuItem>
          <Link to="/pricing">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/#contact">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            to={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default MegaMenu;
