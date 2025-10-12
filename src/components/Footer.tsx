
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
          {/* Brand Section */}
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
              </div>
              <span className="font-bold text-lg font-display">Fuke's Media LLP</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional VFX studio combining AI technology with creative excellence since 2020.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                asChild
              >
                <a href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61575800197616" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                asChild
              >
                <a href="https://x.com/FukesMedia" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                asChild
              >
                <a href="https://www.instagram.com/fukes_media/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                asChild
              >
                <a href="https://www.linkedin.com/company/fukesmedia/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-primary/10"
                asChild
              >
                <a href="https://www.youtube.com/@FukesMedia" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">Call Us</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <span className="text-foreground">Main:</span>{' '}
                    <a href="tel:+916362281003" className="hover:text-primary transition-colors">
                      +91 636 228 1003
                    </a>
                  </li>
                  <li>
                    <span className="text-foreground">Support:</span>{' '}
                    <a href="tel:+919916254096" className="hover:text-primary transition-colors">
                      +91 991 625 4096
                    </a>
                  </li>
                  <li>
                    <span className="text-foreground">Inquiry:</span>{' '}
                    <a href="tel:+919663625519" className="hover:text-primary transition-colors">
                      +91 966 362 5519
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Email</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <a href="mailto:fukesmedia@gmail.com" className="hover:text-primary transition-colors">
                      fukesmedia@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@fukesmedia.com" className="hover:text-primary transition-colors">
                      info@fukesmedia.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Team', path: '/team' },
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
          
          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Monday – Saturday: 10:00 AM – 7:00 PM IST</li>
              <li>Sunday: Closed</li>
            </ul>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Stay Connected</h4>
              <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-background border-border flex-1 text-sm h-9" 
                />
                <Button variant="default" size="sm" className="gradient-button px-3">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-border" />
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm text-center md:text-left space-y-1">
            <p>&copy; {new Date().getFullYear()} Fuke's Media LLP. All rights reserved.</p>
            <p className="text-xs">LLP Identification Number (LLPIN): [Insert LLPIN]</p>
            <p className="text-xs">Registered: #2108, Omkara Nilaya, 7th Main, Kumaraswamy Layout, 2nd Stage, Bengaluru - 560078</p>
            <p className="text-xs">Office: #13, 2nd Floor, 10th Main, 6th Cross, Kathriguppe IV Phase, Banashankari - 560070</p>
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
