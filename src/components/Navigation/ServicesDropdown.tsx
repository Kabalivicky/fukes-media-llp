
import { useLocation, useNavigate } from 'react-router-dom';
import { Film, Code, Palette, Scissors, SunMedium, Globe, Video } from 'lucide-react';
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
        <ul className="grid w-[600px] gap-3 p-6 md:grid-cols-2 lg:w-[700px]">
          <ListItem href="/services#roto" title="CGI & VFX" icon={<Scissors className="mr-2 h-4 w-4" />}>
            Rotoscopy, compositing, matchmove, matte painting, FX & simulations
          </ListItem>
          <ListItem href="/services#concept-art" title="Creative Services" icon={<Palette className="mr-2 h-4 w-4" />}>
            Concept art, storyboarding, motion graphics, art direction
          </ListItem>
          <ListItem href="/services#film-editing" title="Editing & Post" icon={<Video className="mr-2 h-4 w-4" />}>
            Film editing, showreels, promos, sound design, voiceover
          </ListItem>
          <ListItem href="/services#color-grading" title="Digital Intermediate" icon={<SunMedium className="mr-2 h-4 w-4" />}>
            Color grading, conforming, mastering, HDR/SDR deliverables
          </ListItem>
          <ListItem href="/services#ai" title="AI & Innovation" icon={<Code className="mr-2 h-4 w-4" />}>
            AI workflows, virtual production, cloud pipelines
          </ListItem>
          <ListItem href="/services#virtual-production" title="Virtual Production" icon={<Globe className="mr-2 h-4 w-4" />}>
            LED walls, real-time rendering, in-camera VFX
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ServicesDropdown;
