import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Zap, Globe, ArrowRight, PhoneCall, AlertCircle } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string) => (value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!formData.name.trim()) return 'Full name is required';
        if (formData.name.trim().length < 2) return 'Name must be at least 2 characters';
        if (formData.name.trim().length > 100) return 'Name must be less than 100 characters';
        return undefined;
      case 'email':
        if (!formData.email.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) return 'Please enter a valid email address';
        return undefined;
      case 'projectType':
        if (!formData.projectType) return 'Please select a project type';
        return undefined;
      case 'message':
        if (!formData.message.trim()) return 'Project description is required';
        if (formData.message.trim().length < 10) return 'Please provide more detail (at least 10 characters)';
        if (formData.message.trim().length > 2000) return 'Message must be less than 2000 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const fields = ['name', 'email', 'projectType', 'message'];
    fields.forEach((field) => {
      const error = validateField(field);
      if (error) newErrors[field as keyof FormErrors] = error;
    });
    setErrors(newErrors);
    setTouched({ name: true, email: true, projectType: true, message: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) {
      toast({
        title: 'Please fix the errors below',
        description: 'Some required fields are missing or invalid.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || null,
        phone: formData.phone.trim() || null,
        inquiry_type: formData.projectType,
        message: `Budget: ${formData.budget || 'Not specified'}\nTimeline: ${formData.timeline || 'Not specified'}\nUrgent: ${formData.urgentProject ? 'Yes' : 'No'}\n\n${formData.message.trim()}`,
      });

      if (error) throw error;

      setSubmitSuccess(true);
      toast({
        title: 'Message Sent Successfully!',
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        duration: 5000,
      });

      setFormData({
        name: '', email: '', company: '', phone: '',
        projectType: '', budget: '', timeline: '', message: '',
        urgentProject: false, newsletter: false,
      });
      setErrors({});
      setTouched({});
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was a problem sending your message. Please try again or email us directly at info@fukesmedia.com.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FieldError = ({ field }: { field: keyof FormErrors }) => {
    if (!touched[field] || !errors[field]) return null;
    return (
      <p className="text-destructive text-sm flex items-center gap-1 mt-1">
        <AlertCircle className="h-3 w-3" />
        {errors[field]}
      </p>
    );
  };

  return (
    <SectionWrapper withDivider>
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Stats & Quick Actions */}
        <aside className="lg:col-span-2 space-y-6 lg:sticky lg:top-24" aria-label="Why choose us">
          <SectionHeading title="Why Choose Us?" badge="Stats" align="left" size="md" />

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-card/50 border border-border/30"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="font-display text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-base">Quick Response</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                For urgent projects, use our priority contact line. We guarantee a response within 2 hours during business hours.
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="cta" size="default" className="w-full" asChild>
                  <a href="tel:+916362281003">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Call Now — Free Consultation
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="mailto:info@fukesmedia.com">
                    <Globe className="w-4 h-4 mr-2" />
                    Email Us Directly
                  </a>
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
              {submitSuccess && (
                <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm">
                  ✓ Your message has been sent successfully! We'll be in touch within 24 hours.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Project inquiry form" noValidate>
                <fieldset className="space-y-4">
                  <legend className="sr-only">Your Information</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name')(e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="Your full name"
                        className={`bg-background/50 ${touched.name && errors.name ? 'border-destructive' : ''}`}
                        aria-invalid={touched.name && !!errors.name}
                      />
                      <FieldError field="name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email')(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="your@email.com"
                        className={`bg-background/50 ${touched.email && errors.email ? 'border-destructive' : ''}`}
                        aria-invalid={touched.email && !!errors.email}
                      />
                      <FieldError field="email" />
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

                <fieldset className="space-y-4">
                  <legend className="sr-only">Project Details</legend>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select value={formData.projectType} onValueChange={(v) => { handleInputChange('projectType')(v); setTouched(p => ({...p, projectType: true})); }}>
                        <SelectTrigger className={`bg-background/50 ${touched.projectType && errors.projectType ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError field="projectType" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={handleInputChange('budget')}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
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
                            <SelectItem key={tl} value={tl}>{tl}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </fieldset>

                <div className="space-y-2">
                  <Label htmlFor="message">Project Description *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message')(e.target.value)}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell us about your project vision, specific requirements, reference materials, and any special considerations..."
                    rows={5}
                    className={`bg-background/50 ${touched.message && errors.message ? 'border-destructive' : ''}`}
                    aria-invalid={touched.message && !!errors.message}
                  />
                  <FieldError field="message" />
                  <p className="text-xs text-muted-foreground text-right">{formData.message.length}/2000</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="urgent" checked={formData.urgentProject} onCheckedChange={handleInputChange('urgentProject')} />
                    <Label htmlFor="urgent" className="text-sm">This is an urgent project (Rush delivery needed)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" checked={formData.newsletter} onCheckedChange={handleInputChange('newsletter')} />
                    <Label htmlFor="newsletter" className="text-sm">Subscribe to our newsletter for industry insights and updates</Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  disabled={isSubmitting}
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
