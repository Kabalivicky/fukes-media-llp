import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '@/components/ui/theme-provider';

const Footer = () => {
  const { theme } = useTheme();
  
  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?viewas=100000686899395&id=61575800197616', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/FukesMedia', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/fukes_media/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/fukesmedia/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/@FukesMedia', label: 'YouTube' },
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Team', path: '/team' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'CGI & VFX', path: '/services' },
    { name: 'Creative Services', path: '/services' },
    { name: 'Digital Intermediate', path: '/services' },
    { name: 'Tech Innovation', path: '/services' },
  ];
  
  return (
    <footer className="relative overflow-hidden border-t border-border/30">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                alt="Fuke's Media Logo" 
                className="h-10 w-auto" 
                src={theme === 'dark' 
                  ? '/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png'
                  : '/lovable-uploads/c679f808-3ebc-4220-b64f-90bed70e9847.png'
                }
              />
              <span className="font-bold text-lg font-display">Fuke's Media</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional VFX studio combining AI technology with creative excellence since 2020.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-lg glass-subtle hover:bg-primary/10"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((item, index) => (
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

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((item, index) => (
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
          
          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+916362281003" className="hover:text-foreground transition-colors">
                    +91 636 228 1003
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:info@fukesmedia.com" className="hover:text-foreground transition-colors">
                    info@fukesmedia.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Bengaluru, Karnataka, India</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Subscribe to Newsletter</h4>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-card/50 border-border/50 flex-1 text-sm h-10" 
                />
                <Button size="icon" className="btn-gradient h-10 w-10">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-10 bg-border/30" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-sm text-center md:text-left">
            <p>© {new Date().getFullYear()} Fuke's Media LLP. All rights reserved.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
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
