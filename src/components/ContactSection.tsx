import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100).regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters'),
  email: z.string().trim().min(1, 'Email is required').max(255).email('Please enter a valid email address'),
  phone: z.string().trim().max(20).regex(/^[\d\s\+\-\(\)]*$/, 'Invalid phone').optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
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
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
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
      toast({ title: "Validation Error", description: "Please check the form for errors.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: validatedData.name, email: validatedData.email, phone: validatedData.phone || null, message: validatedData.message, inquiry_type: 'general'
      });
      if (error) { toast({ title: "Error", description: "Please try again or contact us at fukesmedia@gmail.com", variant: "destructive" }); return; }
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setName(''); setEmail(''); setPhone(''); setMessage(''); setErrors({});
    } catch { toast({ title: "Error", description: "Please try again.", variant: "destructive" }); }
    finally { setIsSubmitting(false); }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <SectionHeading title="Contact Us" subtitle="Get in touch with our team to discuss your project" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          {/* Form Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="border-border/30 bg-surface-elevated/50 backdrop-blur-xl rounded-3xl">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Send Us a Message</CardTitle>
                <CardDescription>Get in touch for project inquiries or support</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required className={`rounded-xl bg-background/50 border-border/30 ${errors.name ? 'border-destructive' : ''}`} />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} required className={`rounded-xl bg-background/50 border-border/30 ${errors.email ? 'border-destructive' : ''}`} />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Your phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} className={`rounded-xl bg-background/50 border-border/30 ${errors.phone ? 'border-destructive' : ''}`} />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} required className={`rounded-xl bg-background/50 border-border/30 ${errors.message ? 'border-destructive' : ''}`} />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    <p className="text-xs text-muted-foreground text-right">{message.length}/2000</p>
                  </div>
                  <Button type="submit" className="w-full rounded-full bg-gradient-to-r from-brand-red to-brand-blue text-white border-0 h-12 text-base" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-full bg-surface-elevated border border-border/30 p-1">
                <TabsTrigger value="contact" className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-red data-[state=active]:to-brand-blue data-[state=active]:text-white">Contact Info</TabsTrigger>
                <TabsTrigger value="inquiries" className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-blue data-[state=active]:to-brand-green data-[state=active]:text-white">Inquiries</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact" className="space-y-4">
                {[
                  { icon: MapPin, color: 'text-brand-red', bg: 'bg-brand-red/10', title: 'Our Locations', content: (
                    <div className="space-y-3">
                      <div><h4 className="font-medium text-sm text-brand-red mb-1">Register Address:</h4><p className="text-muted-foreground text-sm">Kumaraswamy Layout, 2nd Stage, Bengaluru, Karnataka – 560078</p></div>
                      <div><h4 className="font-medium text-sm text-brand-blue mb-1">Office Address:</h4><p className="text-muted-foreground text-sm">Kathriguppe IV Phase, Banashankari, Bengaluru, Karnataka – 560070</p></div>
                    </div>
                  )},
                  { icon: Mail, color: 'text-brand-blue', bg: 'bg-brand-blue/10', title: 'Email Us', content: (
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-sm">General: <a href="mailto:fukesmedia@gmail.com" className="text-brand-blue hover:underline">fukesmedia@gmail.com</a></p>
                      <p className="text-muted-foreground text-sm">Business: <a href="mailto:business@fukesmedia.com" className="text-brand-blue hover:underline">business@fukesmedia.com</a></p>
                      <p className="text-muted-foreground text-sm">Projects: <a href="mailto:projects@fukesmedia.com" className="text-brand-blue hover:underline">projects@fukesmedia.com</a></p>
                      <p className="text-muted-foreground text-sm">Careers: <a href="mailto:hr@fukesmedia.com" className="text-brand-blue hover:underline">hr@fukesmedia.com</a></p>
                    </div>
                  )},
                  { icon: Phone, color: 'text-brand-green', bg: 'bg-brand-green/10', title: 'Call Us', content: (
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-sm">Main: <a href="tel:+916362281003" className="text-brand-green hover:underline">+91 636 228 1003</a></p>
                      <p className="text-muted-foreground text-sm">Support: <a href="tel:+919916254096" className="text-brand-green hover:underline">+91 991 625 4096</a></p>
                      <p className="text-muted-foreground text-sm">Inquiry: <a href="tel:+919663625519" className="text-brand-green hover:underline">+91 966 362 5519</a></p>
                    </div>
                  )},
                ].map((item, i) => (
                  <Card key={i} className="border-border/30 bg-surface-elevated/50 backdrop-blur-sm rounded-2xl">
                    <CardContent className="p-5">
                      <div className="flex items-start space-x-4">
                        <div className={`${item.bg} ${item.color} p-3 rounded-2xl`}><item.icon className="h-5 w-5" /></div>
                        <div className="flex-1"><h3 className="font-semibold text-base mb-2">{item.title}</h3>{item.content}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="inquiries" className="space-y-4">
                <Card className="border-border/30 bg-surface-elevated/50 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-4">
                      <div className="bg-brand-red/10 text-brand-red p-3 rounded-2xl"><MessageSquare className="h-5 w-5" /></div>
                      <div>
                        <h3 className="font-semibold text-base mb-3">Department Contacts</h3>
                        <div className="space-y-3">
                          {[
                            { dept: 'VFX Production', email: 'vfx@fukesmedia.com', color: 'text-brand-red' },
                            { dept: 'Creative Services', email: 'creative@fukesmedia.com', color: 'text-brand-blue' },
                            { dept: 'Digital Intermediate', email: 'di@fukesmedia.com', color: 'text-brand-green' },
                            { dept: 'Tech Innovation', email: 'tech@fukesmedia.com', color: 'text-brand-blue' },
                          ].map((d) => (
                            <div key={d.dept}><h4 className="font-medium text-sm">{d.dept}</h4><a href={`mailto:${d.email}`} className={`text-sm ${d.color} hover:underline`}>{d.email}</a></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/30 bg-surface-elevated/50 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-base mb-3">Operating Hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b border-border/30"><span className="text-sm">Monday - Friday</span><span className="text-sm text-brand-red font-medium">9:30 AM - 6:30 PM</span></div>
                      <div className="flex justify-between items-center pb-2 border-b border-border/30"><span className="text-sm">Saturday</span><span className="text-sm text-brand-blue font-medium">10:00 AM - 4:00 PM</span></div>
                      <div className="flex justify-between items-center"><span className="text-sm">Sunday</span><span className="text-sm text-muted-foreground">Closed</span></div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
