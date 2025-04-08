import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-card/30 backdrop-blur-md border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/lovable-uploads/f26d960c-bb81-4fa5-8f55-4dcf0102e774.png" alt="Fuke's Media Logo" className="h-10" />
              
            </Link>
            <p className="text-muted-foreground mb-4">
              Pioneering AI-driven VFX and creative services for the digital media landscape.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/vfx" className="text-muted-foreground hover:text-foreground transition-colors">VFX Solutions</Link>
              </li>
              <li>
                <Link to="/services/creative" className="text-muted-foreground hover:text-foreground transition-colors">Creative Services</Link>
              </li>
              <li>
                <Link to="/services/di" className="text-muted-foreground hover:text-foreground transition-colors">Digital Intermediate</Link>
              </li>
              <li>
                <Link to="/services/tech" className="text-muted-foreground hover:text-foreground transition-colors">Tech Innovation</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/investors" className="text-muted-foreground hover:text-foreground transition-colors">Investors</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Your email address" className="bg-background border-border" />
              <Button variant="default" className="gradient-button">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-border" />
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Fuke's Media LLP. All rights reserved.
          </div>
          
          <div className="flex space-x-4 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/legal" className="text-muted-foreground hover:text-foreground transition-colors">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;