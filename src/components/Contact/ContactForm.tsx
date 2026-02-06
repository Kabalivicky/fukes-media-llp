import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Zap, Globe, ArrowRight, PhoneCall } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import { useToast } from '@/hooks/use-toast';

const projectTypes = [
  'VFX for Film/TV',
  'Commercial VFX',
  'Music Video',
  'Corporate Video',
  'Documentary',
  'AI-Assisted Production',
  'Virtual Production',
  'Training/Consultation',
  'Other',
];

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $250,000',
  '$250,000+',
  "Let's Discuss",
];

const timelines = [
  'Rush (1-2 weeks)',
  'Standard (3-4 weeks)',
  'Extended (1-2 months)',
  '2-3 months',
  '3+ months',
  'Flexible',
];

const stats = [
  { value: '24h', label: 'Response Time' },
  { value: '15+', label: 'Awards Won' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '500+', label: 'Projects Delivered' },
];

const ContactForm = () => {
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
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string) => (value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: 'Message Sent Successfully!',
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
      newsletter: false,
    });

    setIsSubmitting(false);
  };

  return (
    <SectionWrapper withDivider>
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Stats & Quick Actions */}
        <aside className="lg:col-span-2 space-y-8" aria-label="Why choose us">
          <SectionHeading
            title="Why Choose Us?"
            badge="Stats"
            align="left"
            size="md"
          />

          <div className="grid grid-cols-2 gap-6">
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

          {/* Priority CTA Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="font-display font-bold text-lg">Quick Response</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                For urgent projects, use our priority contact line. We guarantee a response within 2 hours during business hours.
              </p>
              <div className="flex flex-col gap-3">
                <Button variant="cta" size="lg" className="w-full" asChild>
                  <a href="tel:+916362281003">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Call Now — Free Consultation
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Globe className="w-4 h-4 mr-2" />
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <Card className="border-border/50 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-2xl">Start Your Project</CardTitle>
              <p className="text-muted-foreground">
                Tell us about your vision and we'll provide a detailed proposal within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Project inquiry form">
                {/* Basic Information */}
                <fieldset className="space-y-4">
                  <legend className="sr-only">Your Information</legend>
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
                        placeholder="+91 XXX XXX XXXX"
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Project Details */}
                <fieldset className="space-y-4">
                  <legend className="sr-only">Project Details</legend>
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
                          {timelines.map((tl) => (
                            <SelectItem key={tl} value={tl}>
                              {tl}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </fieldset>

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

                {/* Submit CTA */}
                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  disabled={
                    isSubmitting ||
                    !formData.name ||
                    !formData.email ||
                    !formData.projectType ||
                    !formData.message
                  }
                  className="w-full font-semibold text-base group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Get Your Free Quote Now
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy. We'll never share your information with third parties.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactForm;
