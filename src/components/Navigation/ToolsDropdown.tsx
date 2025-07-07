
import { Link } from 'react-router-dom';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import ListItem from './ListItem';
import { Calculator, FileVideo, FileImage, FileAudio, FileText, Code, Palette, Zap } from 'lucide-react';

const ToolsDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="cursor-pointer">
        <Zap className="mr-2 h-4 w-4" />
        Tools
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
          <div className="space-y-3">
            <h4 className="text-sm font-medium leading-none text-muted-foreground">Pricing & Calculators</h4>
            <ListItem href="/advanced-pricing" title="Advanced Pricing Calculator">
              <Calculator className="mr-2 h-4 w-4" />
              Professional project estimation tool
            </ListItem>
            <ListItem href="/pricing" title="Basic Pricing">
              <Calculator className="mr-2 h-4 w-4" />
              Quick pricing estimates
            </ListItem>
            
            <h4 className="text-sm font-medium leading-none text-muted-foreground mt-4">Format Converters</h4>
            <ListItem href="/tools/video-converter" title="Video Converter">
              <FileVideo className="mr-2 h-4 w-4" />
              Convert between video formats
            </ListItem>
            <ListItem href="/tools/image-converter" title="Image Converter">
              <FileImage className="mr-2 h-4 w-4" />
              Convert and optimize images
            </ListItem>
            <ListItem href="/tools/audio-converter" title="Audio Converter">
              <FileAudio className="mr-2 h-4 w-4" />
              Convert audio files and formats
            </ListItem>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium leading-none text-muted-foreground">Development Tools</h4>
            <ListItem href="/tools/code-converter" title="Code Converter">
              <Code className="mr-2 h-4 w-4" />
              Convert between programming languages
            </ListItem>
            <ListItem href="/tools/color-converter" title="Color Converter">
              <Palette className="mr-2 h-4 w-4" />
              Convert color formats (HEX, RGB, HSL)
            </ListItem>
            <ListItem href="/tools/text-converter" title="Text Converter">
              <FileText className="mr-2 h-4 w-4" />
              Convert text formats and encoding
            </ListItem>
            
            <h4 className="text-sm font-medium leading-none text-muted-foreground mt-4">AI Tools</h4>
            <ListItem href="/ai-tools" title="AI Tools Suite">
              <Zap className="mr-2 h-4 w-4" />
              Complete AI toolkit for creators
            </ListItem>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ToolsDropdown;
