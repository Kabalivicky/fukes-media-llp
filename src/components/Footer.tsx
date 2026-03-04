import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { useTheme } from '@/components/ui/theme-provider';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import logoBlack from '@/assets/logo-black.png';
import logoWhite from '@/assets/logo-white.png';

const footerLinks = {
  services: [
    { name: 'CGI & VFX Solutions', path: '/services#vfx' },
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
  const logoSrc = theme === 'dark' ? logoWhite : logoBlack;

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setIsSubscribing(true);
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', { body: { email } });
      if (error) throw error;
      toast({ title: "Subscribed!", description: data?.message || "Welcome to our newsletter!" });
      setEmail('');
    } catch (error: any) {
      toast({ title: "Subscription failed", description: error?.message || "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubscribing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-card/30 backdrop-blur-xl border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/[0.02] pointer-events-none" />
      
      <motion.div
        className="container mx-auto px-4 pt-16 pb-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block">
              <img src={logoSrc} alt="Fuke's Media" className="h-12 w-auto object-contain" />
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              End-to-End Visual Production Studio. Expert VFX & CGI at the Core — crafting complete visual experiences for film, brand, television, and digital.
            </p>

            <div className="space-y-2">
              <a href="mailto:info@fukesmedia.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors">
                <Mail className="w-4 h-4" /> info@fukesmedia.com
              </a>
              <a href="tel:+916362281003" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors">
                <Phone className="w-4 h-4" /> +91 636 228 1003
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" /> Bengaluru, Karnataka, India
              </div>
            </div>

            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-muted/50 hover:bg-secondary/20 hover:text-secondary transition-all"
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
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
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
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
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
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Get the latest news and insights.</p>
            <form className="space-y-2" onSubmit={handleNewsletterSubmit}>
              <Input 
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-secondary rounded-xl"
                disabled={isSubscribing}
              />
              <Button type="submit" className="w-full gradient-button rounded-xl" disabled={isSubscribing}>
                {isSubscribing ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Subscribing...</>
                ) : (
                  <>Subscribe <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Fuke's Media LLP. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link key={link.name} to={link.path} className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RGB accent line at bottom */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #C8102E, #0077B6, #00A651)' }} />
    </footer>
  );
};

export default Footer;
