import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Globe, Zap, ArrowRight } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import LiquidReveal, { StaggerReveal } from '@/components/LiquidReveal';
import { AnimatedLetters, GradientText, AnimatedWords } from '@/components/KineticText';
import SEOHelmet from '@/components/SEOHelmet';
import { useToast } from '@/hooks/use-toast';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElements from '@/components/FloatingElements';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    urgentProject: false,
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field: string) => (value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      duration: 5000,
    });

    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
      urgentProject: false,
      newsletter: false
    });

    setIsSubmitting(false);
  };

  const projectTypes = [
    'VFX for Film/TV',
    'Commercial VFX',
    'Music Video',
    'Corporate Video',
    'Documentary',
    'AI-Assisted Production',
    'Virtual Production',
    'Training/Consultation',
    'Other'
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000+',
    'Let\'s Discuss'
  ];

  const timelines = [
    'Rush (1-2 weeks)',
    'Standard (3-4 weeks)',
    'Extended (1-2 months)',
    '2-3 months',
    '3+ months',
    'Flexible'
  ];

  const contactMethods = [
    {
      icon: MapPin,
      title: 'Our Locations',
      content: ['Kumaraswamy Layout, 2nd Stage, Bengaluru – 560078', 'Kathriguppe IV Phase, Banashankari, Bengaluru – 560070'],
      color: 'from-primary to-secondary',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: ['Main Office: +91 636 228 1003', 'Support: +91 991 625 4096', 'Inquiry: +91 966 362 5519'],
      color: 'from-secondary to-accent',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: ['General: Fukesmedia@gmail.com / info@fukesmedia.com', 'Business: Business@fukesmedia.com', 'Projects: projects@fukesmedia.com', 'Careers: hr@fukesmedia.com'],
      color: 'from-accent to-primary',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: ['Mon–Sat: 10:00 AM – 7:00 PM IST', 'Sunday: Closed'],
      color: 'from-primary to-accent',
    },
  ];

  const stats = [
    { value: '24h', label: 'Response Time' },
    { value: '15+', label: 'Awards Won' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '500+', label: 'Projects Delivered' },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Fuke's Media",
    "description": "Get in touch with our award-winning VFX team for your next project",
    "url": "https://fukes-media.com/contact"
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="Contact Us - Start Your VFX Project Today"
        description="Ready to bring your vision to life? Contact our award-winning VFX team for consultation, quotes, and project planning. Available 24/7 for urgent projects."
        keywords="contact VFX studio, VFX consultation, project quote, visual effects inquiry, Fuke's Media contact"
        canonical="https://fukes-media.com/contact"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <ParallaxSection 
        className="relative pt-32 pb-20"
        speed={0.25}
        fade
      >
        <FloatingElements variant="geometric" count={5} />
        
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-secondary/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Let's Create Together
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <AnimatedLetters className="block" delay={0.2}>Get In</AnimatedLetters>
            <span className="block mt-2">
              <GradientText>Touch</GradientText>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <AnimatedWords
              className="text-xl text-muted-foreground"
              delay={1}
            >
              Ready to push the boundaries of visual storytelling? We're here to bring your vision to life.
            </AnimatedWords>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Contact Methods */}
      <SectionWrapper variant="dark">
        <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {contactMethods.map((method) => (
            <Card key={method.title} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border/50 hover:border-primary/30">
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{method.title}</h3>
                {method.content.map((line, i) => (
                  <p key={i} className="text-muted-foreground text-sm">{line}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </StaggerReveal>
      </SectionWrapper>

      {/* Main Contact Section */}
      <SectionWrapper withDivider>
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Stats & Info */}
          <div className="lg:col-span-2 space-y-8">
            <LiquidReveal direction="left">
              <SectionHeading
                title="Why Choose Us?"
                badge="Stats"
                align="left"
                size="md"
              />

              <div className="grid grid-cols-2 gap-6 mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-card/50 border border-border/30"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="font-display text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </LiquidReveal>

            <LiquidReveal direction="left" delay={0.2}>
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                    <h3 className="font-display font-bold text-lg">Quick Response</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    For urgent projects, use our priority contact line. 
                    We guarantee a response within 2 hours during business hours.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Globe className="w-4 h-4 mr-2" />
                    Schedule a Call
                  </Button>
                </CardContent>
              </Card>
            </LiquidReveal>
          </div>

          {/* Contact Form */}
          <LiquidReveal direction="right" className="lg:col-span-3">
            <Card className="border-border/50 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="font-display text-2xl">Start Your Project</CardTitle>
                <p className="text-muted-foreground">
                  Tell us about your vision and we'll provide a detailed proposal within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name')(e.target.value)}
                        placeholder="Your full name"
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email')(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company')(e.target.value)}
                        placeholder="Your company name"
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone')(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select value={formData.projectType} onValueChange={handleInputChange('projectType')}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={handleInputChange('budget')}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <Select value={formData.timeline} onValueChange={handleInputChange('timeline')}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelines.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>
                              {timeline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Project Description *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message')(e.target.value)}
                      placeholder="Tell us about your project vision, specific requirements, reference materials, and any special considerations..."
                      rows={5}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={formData.urgentProject}
                        onCheckedChange={handleInputChange('urgentProject')}
                      />
                      <Label htmlFor="urgent" className="text-sm">
                        This is an urgent project (Rush delivery needed)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={handleInputChange('newsletter')}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to our newsletter for industry insights and updates
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.projectType || !formData.message}
                    className="w-full bg-primary hover:bg-primary/90 font-medium group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Project Inquiry
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  {/* Form Footer */}
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy. We'll never share your information with third parties.
                  </p>
                </form>
              </CardContent>
            </Card>
          </LiquidReveal>
        </div>
      </SectionWrapper>

      {/* Map Section */}
      <SectionWrapper variant="dark">
        <LiquidReveal direction="up">
          <Card className="overflow-hidden border-border/50">
            <CardContent className="p-0">
              <div className="relative">
                <iframe
                  title="Fuke's Media Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6!2d77.5550!3d12.9200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBanashankari%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-display font-bold">Visit Our Studio</h3>
                      <p className="text-muted-foreground text-sm">Banashankari, Bengaluru, Karnataka</p>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/Kathriguppe+IV+Phase+Banashankari+Bengaluru+Karnataka+560070"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        Get Directions
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </LiquidReveal>
      </SectionWrapper>
    </div>
  );
};

export default Contact;
