import { useState } from 'react';
import { z } from 'zod';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Input validation schema
const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters'),
  email: z.string()
    .trim()
    .min(1, 'Email is required')
    .max(255, 'Email must be 255 characters or less')
    .email('Please enter a valid email address'),
  phone: z.string()
    .trim()
    .max(20, 'Phone number must be 20 characters or less')
    .regex(/^[\d\s\+\-\(\)]*$/, 'Phone number contains invalid characters')
    .optional()
    .or(z.literal('')),
  message: z.string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be 2000 characters or less'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const validateForm = (): ContactFormData | null => {
    const result = contactFormSchema.safeParse({ name, email, phone, message });
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return null;
    }
    
    setErrors({});
    return result.data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validatedData = validateForm();
    if (!validatedData) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          message: validatedData.message,
          inquiry_type: 'general'
        });

      if (error) {
        console.error('Error saving contact submission:', error);
        toast({
          title: "Error sending message",
          description: "Please try again or contact us directly at Fukesmedia@gmail.com",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setErrors({});
    } catch (error) {
      console.error('Error saving contact submission:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly at Fukesmedia@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Contact Us" 
          subtitle="Get in touch with our team to discuss your project or inquire about our services"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          <Card className="border border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>
                Get in touch with our team for project inquiries or support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={255}
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      placeholder="Your phone number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={20}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={2000}
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive">{errors.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground text-right">
                    {message.length}/2000
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full gradient-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="contact">Contact Info</TabsTrigger>
                <TabsTrigger value="inquiries">Specific Inquiries</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact" className="space-y-8">
                <Card className="border border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 text-primary p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Our Locations</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm text-primary mb-1">Register Address:</h4>
                            <p className="text-muted-foreground text-sm">
                              Kumaraswamy Layout, 2nd Stage,<br />
                              Bengaluru, Karnataka – 560078
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-primary mb-1">Office Address:</h4>
                            <p className="text-muted-foreground text-sm">
                              Kathriguppe IV Phase, Banashankari,<br />
                              Bengaluru, Karnataka – 560070
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-secondary/20 text-secondary p-3 rounded-full">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                        <p className="text-muted-foreground mb-1">
                          General: <a href="mailto:Fukesmedia@gmail.com" className="text-secondary hover:underline">Fukesmedia@gmail.com</a> / <a href="mailto:info@fukesmedia.com" className="text-secondary hover:underline">Info@fukesmedia.com</a>
                        </p>
                        <p className="text-muted-foreground mb-1">
                          Business Requests: <a href="mailto:business@fukesmedia.com" className="text-secondary hover:underline">Business@fukesmedia.com</a>
                        </p>
                        <p className="text-muted-foreground mb-1">
                          Project Requests: <a href="mailto:projects@fukesmedia.com" className="text-secondary hover:underline">projects@fukesmedia.com</a>
                        </p>
                        <p className="text-muted-foreground">
                          Careers: <a href="mailto:hr@fukesmedia.com" className="text-secondary hover:underline">hr@fukesmedia.com</a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-accent/20 text-accent p-3 rounded-full">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                        <p className="text-muted-foreground mb-1">
                          Main Office: <a href="tel:+916362281003" className="text-accent hover:underline">+91 636 228 1003</a>
                        </p>
                        <p className="text-muted-foreground mb-1">
                          Support: <a href="tel:+919916254096" className="text-accent hover:underline">+91 991 625 4096</a>
                        </p>
                        <p className="text-muted-foreground">
                          Inquiry: <a href="tel:+919663625519" className="text-accent hover:underline">+91 966 362 5519</a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="inquiries" className="space-y-8">
                <Card className="border border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 text-primary p-3 rounded-full">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Department Contacts</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">VFX Production</h4>
                            <p className="text-sm text-muted-foreground">
                              Contact: <a href="mailto:vfx@fukesmedia.com" className="text-primary hover:underline">vfx@fukesmedia.com</a>
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium">Creative Services</h4>
                            <p className="text-sm text-muted-foreground">
                              Contact: <a href="mailto:creative@fukesmedia.com" className="text-secondary hover:underline">creative@fukesmedia.com</a>
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium">Digital Intermediate</h4>
                            <p className="text-sm text-muted-foreground">
                              Contact: <a href="mailto:di@fukesmedia.com" className="text-accent hover:underline">di@fukesmedia.com</a>
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium">Tech Innovation</h4>
                            <p className="text-sm text-muted-foreground">
                              Contact: <a href="mailto:tech@fukesmedia.com" className="neon-text-green hover:underline">tech@fukesmedia.com</a>
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium">Investor Relations</h4>
                            <p className="text-sm text-muted-foreground">
                              Contact: <a href="mailto:investors@fukesmedia.com" className="neon-text-orange hover:underline">investors@fukesmedia.com</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Operating Hours</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>Monday - Friday</span>
                        <span className="text-primary">9:30 AM - 6:30 PM</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>Saturday</span>
                        <span className="text-primary">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sunday</span>
                        <span className="text-muted-foreground">Closed</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline" className="w-full">
                        Schedule a Meeting
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
