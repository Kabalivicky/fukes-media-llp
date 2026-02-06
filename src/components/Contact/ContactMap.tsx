import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';

const ContactMap = () => {
  return (
    <SectionWrapper variant="dark" className="py-16 md:py-20">
      <Card className="overflow-hidden border-border/50">
        <CardContent className="p-0">
          <div className="relative">
            <iframe
              title="Fuke's Media Office Location - Banashankari, Bengaluru"
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
                  <p className="text-muted-foreground text-sm">
                    Banashankari, Bengaluru, Karnataka
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/Kathriguppe+IV+Phase+Banashankari+Bengaluru+Karnataka+560070"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="cta" size="default">
                    Get Directions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
};

export default ContactMap;
