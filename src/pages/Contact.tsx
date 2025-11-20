import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import SEOHelmet from '@/components/SEOHelmet';
import { useToast } from '@/hooks/use-toast';

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

    // Simulate form submission
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Fuke's Media",
    "description": "Get in touch with our professional VFX team for your next project",
    "url": "https://fukes-media.com/contact"
  };

  return (
    <>
      <SEOHelmet
        title="Contact Us - Start Your VFX Project Today"
        description="Ready to bring your vision to life? Contact our professional VFX team for consultation, quotes, and project planning. Available 24/7 for urgent projects."
        keywords="contact VFX studio, VFX consultation, project quote, visual effects inquiry, Fuke's Media contact"
        canonical="https://fukes-media.com/contact"
        structuredData={structuredData}
      />

      <MainLayout pageKey="contact">
        <section className="py-20 px-4">
          <SectionTitle
            title="Let's Create Something Extraordinary"
            subtitle="Ready to push the boundaries of visual storytelling? We're here to bring your vision to life."
          />

          <div className="container mx-auto mt-12 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">Get In Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Studio Location</p>
                        <p className="text-sm text-muted-foreground">
                          123 Creative District<br />
                          Innovation Hub, Tech City<br />
                          Los Angeles, CA 90210
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-secondary mt-1" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-FUKES</p>
                        <p className="text-xs text-muted-foreground">24/7 Emergency Line</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">hello@fukes-media.com</p>
                        <p className="text-xs text-muted-foreground">Response within 2 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-muted-foreground">
                          Mon-Fri: 9:00 AM - 8:00 PM PST<br />
                          Sat-Sun: Emergency Projects Only
                        </p>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="font-medium mb-4 text-center">Why Choose Us?</h4>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-xl font-display font-bold text-primary">24h</div>
                          <p className="text-xs text-muted-foreground">Response Time</p>
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold text-secondary">15+</div>
                          <p className="text-xs text-muted-foreground">Awards Won</p>
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold text-accent">98%</div>
                          <p className="text-xs text-muted-foreground">Client Satisfaction</p>
                        </div>
                        <div>
                          <div className="text-xl font-display font-bold text-primary">500+</div>
                          <p className="text-xs text-muted-foreground">Projects Delivered</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="border-border/50">
                  <CardHeader>
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
                          />
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="projectType">Project Type *</Label>
                          <Select value={formData.projectType} onValueChange={handleInputChange('projectType')}>
                            <SelectTrigger>
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
                            <SelectTrigger>
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
                            <SelectTrigger>
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
                          rows={6}
                          required
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
                        className="w-full bg-primary hover:bg-primary/90 font-medium"
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
              </motion.div>
            </div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16"
            >
              <Card className="overflow-hidden border-border/50">
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-to-br from-muted/50 to-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                        <p className="text-lg font-medium">Visit Our Studio</p>
                        <p className="text-sm text-muted-foreground">Los Angeles Creative District</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Contact;