
import { useLocation, useNavigate } from 'react-router-dom';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { megaMenuSections, isLinkActive } from '@/utils/navigationData';
import ListItem from './ListItem';

const ImmersiveDropdown = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname + location.hash;
  const immersiveSection = megaMenuSections.immersive;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger 
        className={cn(
          isLinkActive(currentPath, immersiveSection.path) ? "text-primary font-medium" : ""
        )}
      >
        Immersive
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
          <div className="col-span-1">
            <NavigationMenuLink 
              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
              onClick={() => navigate(immersiveSection.path)}
            >
              <div className="mb-2 mt-4 text-lg font-medium">
                {immersiveSection.title} Experiences
              </div>
              <p className="text-sm leading-tight text-muted-foreground">
                Step into the future of VFX with AR, VR, and metaverse technologies
              </p>
            </NavigationMenuLink>
          </div>
          <div className="col-span-1">
            {immersiveSection.items.map((item) => (
              <ListItem
                key={item.title}
                title={item.title}
                href={item.href}
                icon={item.icon}
                isAnchor={item.isAnchor}
              >
                {item.description}
              </ListItem>
            ))}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ImmersiveDropdown;
