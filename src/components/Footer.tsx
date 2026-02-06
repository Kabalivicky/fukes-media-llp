import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Mail, MapPin, Loader2 } from 'lucide-react';
import { useTheme } from '@/components/ui/theme-provider';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import logoDarkTheme from '@/assets/logo-dark-theme.png';
import logoLightTheme from '@/assets/logo-light-theme.png';
import MarqueeText from './MarqueeText';

const footerLinks = {
  services: [
    { name: 'VFX Solutions', path: '/services#vfx' },
    { name: 'Creative Services', path: '/services#creative' },
    { name: 'Digital Intermediate', path: '/services#di' },
    { name: 'Tech Innovation', path: '/services#tech' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Team', path: '/team' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ],
  resources: [
    { name: 'Help Center', path: '/help-center' },
    { name: 'AI Tools', path: '/ai-tools' },
    { name: 'Industry News', path: '/news' },
    { name: 'VFX Research', path: '/vfx-research' },
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Legal', path: '/legal' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?viewas=100000686899395&id=61575800197616', label: 'Facebook' },
  { icon: Twitter, href: 'https://x.com/FukesMedia', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/fukes_media/', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/fukesmedia/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@FukesMedia', label: 'YouTube' },
];

const Footer = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubscribing(true);
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "Subscribed!",
        description: data?.message || "Welcome to our newsletter!",
      });
      setEmail('');
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error?.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <footer className="relative bg-card/50 backdrop-blur-xl border-t border-border/50 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-primary/[0.05] pointer-events-none" />
      
      {/* Main Footer Content */}
      <motion.div
        className="container mx-auto px-4 pt-16 pb-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative flex-shrink-0"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <img 
                  alt="Fuke's Media Logo" 
                  className="h-10 w-auto" 
                  src={theme === 'dark' ? logoLightTheme : logoDarkTheme}
                />
              </motion.div>
              <span className="font-display font-bold text-xl group-hover:text-primary transition-colors">
                Fuke's Media
              </span>
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Pioneering AI-driven VFX and creative services for the digital media landscape. 
              Award-winning excellence in every frame.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:Fukesmedia@gmail.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                Fukesmedia@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Global Operations
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-muted/50 hover:bg-primary/20 hover:text-primary transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest news and insights.
            </p>
            <form className="space-y-2" onSubmit={handleNewsletterSubmit}>
              <Input 
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary"
                disabled={isSubscribing}
              />
              <Button type="submit" className="w-full group" disabled={isSubscribing}>
                {isSubscribing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} Fuke's Media LLP. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Footer Accent */}
      <div className="border-t border-border/30 py-3 bg-muted/20">
        <MarqueeText speed={20} className="text-xs font-medium text-muted-foreground/50 uppercase tracking-widest">
          <span>Visual Effects</span>
          <span>•</span>
          <span>AI Technology</span>
          <span>•</span>
          <span>Creative Excellence</span>
          <span>•</span>
          <span>Award-Winning</span>
          <span>•</span>
          <span>Global Reach</span>
          <span>•</span>
          <span>Innovation</span>
          <span>•</span>
        </MarqueeText>
      </div>
    </footer>
  );
};

export default Footer;
