
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/ui/theme-provider';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="bg-card/30 backdrop-blur-md border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section - Fixed alignment */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="relative flex-shrink-0">
                <img 
                  alt="Fuke's Media Logo" 
                  className="h-10 w-auto" 
                  src={theme === 'dark' 
                    ? '/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png'
                    : '/lovable-uploads/c679f808-3ebc-4220-b64f-90bed70e9847.png'
                  }
                />
                {/* Design strip element */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5">
                  <img 
                    src="/lovable-uploads/de05f56b-a2c6-43b6-b516-77732a316239.png"
                    alt="Design Accent"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <span className="font-bold text-lg">Fuke's Media</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Pioneering AI-driven VFX and creative services for the digital media landscape.
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                asChild
              >
                <a href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61575800197616" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                asChild
              >
                <a href="https://x.com/FukesMedia" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                asChild
              >
                <a href="https://www.instagram.com/fukes_media/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                asChild
              >
                <a href="https://www.linkedin.com/company/fukesmedia/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                asChild
              >
                <a href="https://www.youtube.com/@FukesMedia" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-3">
              {[
                { name: 'VFX Solutions', path: '/services/vfx' },
                { name: 'Creative Services', path: '/services/creative' },
                { name: 'Digital Intermediate', path: '/services/di' },
                { name: 'Tech Innovation', path: '/services/tech' },
                { name: 'Pricing', path: '/pricing' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Careers', path: '/careers' },
                { name: 'Investors', path: '/investors' },
                { name: 'Contact', path: '/contact' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter Section - Fixed alignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input 
                placeholder="Your email address" 
                className="bg-background border-border flex-1" 
              />
              <Button variant="default" className="gradient-button px-3 sm:px-4">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-border" />
        
        {/* Bottom section - Fixed alignment */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Fuke's Media LLP. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            {[
              { name: 'Privacy Policy', path: '/privacy' },
              { name: 'Terms of Service', path: '/terms' },
              { name: 'Legal', path: '/legal' }
            ].map((item, index) => (
              <Link 
                key={index}
                to={item.path} 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
