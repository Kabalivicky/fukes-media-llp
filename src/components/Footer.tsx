import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?viewas=100000686899395&id=61575800197616', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/FukesMedia', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/fukes_media/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/fukesmedia/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/@FukesMedia', label: 'YouTube' },
  ];

  const footerLinks = [
    [
      { name: 'About Us', path: '/about' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Services', path: '/services' },
      { name: 'Contact', path: '/contact' },
    ],
    [
      { name: 'Showreel', path: '/showreel' },
      { name: 'Team', path: '/team' },
      { name: 'Help Center', path: '/help-center' },
      { name: 'Resources', path: '/resources' },
    ],
    [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Legal', path: '/legal' },
      { name: 'Cookie Preferences', path: '/privacy' },
    ],
  ];
  
  return (
    <footer className="bg-background border-t border-gray-800 py-12">
      <div className="px-4 md:px-12 max-w-7xl mx-auto">
        {/* Social Links */}
        <div className="flex gap-4 mb-8">
          {socialLinks.map((social, index) => (
            <a 
              key={index}
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={social.label}
              className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
        
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {footerLinks.map((column, colIndex) => (
            <ul key={colIndex} className="space-y-3">
              {column.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
          
          {/* Contact Column */}
          <div className="space-y-3">
            <p className="text-sm text-gray-400">Contact Us</p>
            <a 
              href="tel:+916362281003" 
              className="block text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              +91 636 228 1003
            </a>
            <a 
              href="mailto:info@fukesmedia.com" 
              className="block text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              info@fukesmedia.com
            </a>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png" 
              alt="Fuke's Media" 
              className="h-6 w-auto opacity-50"
            />
          </div>
          
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Fuke's Media LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
