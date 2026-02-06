import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionWrapper from '@/components/SectionWrapper';

const contactMethods = [
  {
    icon: MapPin,
    title: 'Our Locations',
    content: [
      'Kumaraswamy Layout, 2nd Stage, Bengaluru – 560078',
      'Kathriguppe IV Phase, Banashankari, Bengaluru – 560070',
    ],
    color: 'from-primary to-secondary',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: [
      'Main Office: +91 636 228 1003',
      'Support: +91 991 625 4096',
      'Inquiry: +91 966 362 5519',
    ],
    color: 'from-secondary to-accent',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: [
      'General: Fukesmedia@gmail.com / info@fukesmedia.com',
      'Business: Business@fukesmedia.com',
      'Projects: projects@fukesmedia.com',
      'Careers: hr@fukesmedia.com',
    ],
    color: 'from-accent to-primary',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: ['Mon–Sat: 10:00 AM – 7:00 PM IST', 'Sunday: Closed'],
    color: 'from-primary to-accent',
  },
];

const ContactMethodCards = () => {
  return (
    <SectionWrapper variant="dark" className="py-16 md:py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Contact methods">
        {contactMethods.map((method) => (
          <Card
            key={method.title}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30"
            role="listitem"
          >
            <CardContent className="p-6">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <method.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-display font-bold mb-2">{method.title}</h3>
              {method.content.map((line, i) => (
                <p key={i} className="text-muted-foreground text-sm">
                  {line}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ContactMethodCards;
