
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { Button } from './ui/button';
import { ChevronRight, Zap, Film, Palette, Code, Award, FileText, User, Users, Home } from 'lucide-react';
import ListItem from './Navigation/ListItem';

const MegaMenu = () => {
  const location = useLocation();
  
  // Function to determine if link is active (for highlighting current page)
  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    
    return location.pathname === path;
  };
  
  // Handle clicking anchor links properly when not on home page
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#') && location.pathname !== '/') {
      // Don't prevent default here, let it navigate to home page with anchor
    } else if (path.startsWith('/#')) {
      e.preventDefault();
      const targetId = path.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', path);
      }
    }
  };

  return (
    <NavigationMenu className="hidden xl:flex">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <Button variant="link" className="p-0" asChild>
            <Link to="/">
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                isLinkActive('/') ? "text-primary font-medium" : ""
              )}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </NavigationMenuLink>
            </Link>
          </Button>
        </NavigationMenuItem>

        {/* About Dropdown */}
        <NavigationMenuItem>
          <div className="flex items-center">
            <Button variant="link" className="p-0" asChild>
              <Link to="/about">
                <NavigationMenuLink className={cn(
                  "group inline-flex h-10 mr-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isLinkActive('/about') ? "text-primary font-medium" : ""
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
                    className="flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md relative group"
                    to="/about"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="mb-2 mt-4 text-lg font-medium relative z-10">
                      About Fuke's Media
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground relative z-10">
                      AI-Driven VFX & Creative Studio delivering exceptional visual effects and creative solutions
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem 
                href="/team" 
                title="Our Team" 
                icon={<Users className="h-4 w-4" />}
              >
                Meet our diverse team of creative professionals and technical experts
              </ListItem>
              <ListItem 
                href="/#investors" 
                title="Investors" 
                icon={<Zap className="h-4 w-4" />}
                onClick={(e) => handleAnchorClick(e, '/#investors')}
              >
                Learn about our investment partners and funding initiatives
              </ListItem>
              <ListItem 
                href="/#careers" 
                title="Careers" 
                icon={<ChevronRight className="h-4 w-4" />}
                onClick={(e) => handleAnchorClick(e, '/#careers')}
              >
                Join our team and become part of the future of VFX
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Services Dropdown */}
        <NavigationMenuItem>
          <div className="flex items-center">
            <Button variant="link" className="p-0" asChild>
              <Link to="/services">
                <NavigationMenuLink className={cn(
                  "group inline-flex h-10 mr-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isLinkActive('/services') ? "text-primary font-medium" : ""
                )}>
                  Services
                </NavigationMenuLink>
              </Link>
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

        {/* Resources Dropdown */}
        <NavigationMenuItem>
          <div className="flex items-center">
            <Button variant="link" className="p-0" asChild>
              <Link to="/resources">
                <NavigationMenuLink className={cn(
                  "group inline-flex h-10 mr-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isLinkActive('/resources') ? "text-primary font-medium" : ""
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

        {/* Tools Dropdown */}
        <NavigationMenuItem>
          <div className="flex items-center">
            <Button variant="link" className="p-0" asChild>
              <Link to="/contract-builder">
                <NavigationMenuLink className={cn(
                  "group inline-flex h-10 mr-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isLinkActive('/contract-builder') ? "text-primary font-medium" : ""
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

        {/* Portfolio */}
        <NavigationMenuItem>
          <Button variant="link" className="p-0" asChild>
            <Link 
              to="/#portfolio"
              onClick={(e) => handleAnchorClick(e, '/#portfolio')}
            >
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                isLinkActive('/#portfolio') ? "text-primary font-medium" : ""
              )}>
                Portfolio
              </NavigationMenuLink>
            </Link>
          </Button>
        </NavigationMenuItem>

        {/* Direct Links */}
        <NavigationMenuItem>
          <Button variant="link" className="p-0" asChild>
            <Link to="/pricing">
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                isLinkActive('/pricing') ? "text-primary font-medium" : ""
              )}>
                Pricing
              </NavigationMenuLink>
            </Link>
          </Button>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Button variant="link" className="p-0" asChild>
            <Link 
              to="/#contact"
              onClick={(e) => handleAnchorClick(e, '/#contact')}
            >
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                isLinkActive('/#contact') ? "text-primary font-medium" : ""
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
