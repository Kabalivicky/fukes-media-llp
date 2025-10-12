
import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Palette, Video, MonitorPlay, Code } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TypewriterText from './TypewriterText';
import Enhanced3DHoverCards from './Enhanced3DHoverCards';

const services = [
  {
    id: 'vfx',
    name: 'CGI & VFX Solutions',
    description: 'From basic compositing to complex 3D integration, we deliver high-quality visual effects for film, TV, and digital content.',
    icon: <Video className="h-10 w-10 text-primary" />,
    features: [
      '2D & 3D Compositing',
      'Rotoscoping & Clean-up',
      'Digital Matte Painting',
      '3D Modeling & Animation',
      'Simulation & FX',
      'Match Move & Tracking'
    ],
    image: 'https://images.unsplash.com/photo-1626428091984-427d4209b3fa?q=80&w=1287&auto=format&fit=crop'
  },
  {
    id: 'creative',
    name: 'Creative Services',
    description: 'Our creative team brings your vision to life with cutting-edge design, animation, and conceptual development.',
    icon: <Palette className="h-10 w-10 text-secondary" />,
    features: [
      'Graphic Design',
      'Logo Design',
      'Poster Design',
      'Motion Posters MGFX',
      'Lyrical Video',
      'Video Editing',
      'Title Sequence Design',
      'Motion Graphics',
      'Podcast',
      'Digital Marketing'
    ],
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'di',
    name: 'Digital Intermediate (DI)',
    description: 'Complete end-to-end DI solutions including color grading, conforming, mastering and delivery for all formats.',
    icon: <MonitorPlay className="h-10 w-10 text-accent" />,
    features: [
      'Basic & Advanced Colour Grading',
      'HDR Grading',
      'Look Development',
      'VFX Supervision during DI',
      'Final Delivery Masters',
      'Quality Control'
    ],
    image: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?q=80&w=1171&auto=format&fit=crop'
  },
  {
    id: 'tech',
    name: 'Tech Innovation',
    description: 'Cutting-edge technology solutions and AI integration to enhance creative workflows and production efficiency.',
    icon: <Code className="h-10 w-10 text-neon-green" />,
    features: [
      'AI-Assisted Workflows',
      'Custom Pipeline Development',
      'Automation Solutions',
      'Cloud Rendering',
      'Real-time Collaboration Tools',
      'Asset Management Systems'
    ],
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1170&auto=format&fit=crop'
  }
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState('vfx');
  
  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Services" 
          subtitle="Comprehensive solutions powered by AI and creative excellence"
        />
        
        <Tabs defaultValue="vfx" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-fit mx-auto grid-cols-2 md:grid-cols-4 gap-2">
            {services.map((service) => (
              <TabsTrigger
                key={service.id}
                value={service.id}
                className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
              >
                {service.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <Enhanced3DHoverCards intensity={0.8} glowColor={service.id === 'vfx' ? 'hsl(var(--primary))' : service.id === 'creative' ? 'hsl(var(--secondary))' : service.id === 'di' ? 'hsl(var(--accent))' : 'hsl(var(--neon-green))'}>
                    <Card className="border border-border bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="mb-4">{service.icon}</div>
                        <CardTitle className="text-2xl md:text-3xl font-bold">{service.name}</CardTitle>
                        <CardDescription className="text-muted-foreground text-base">
                          <TypewriterText 
                            text={service.description}
                            delay={500}
                            speed={30}
                          />
                        </CardDescription>
                      </CardHeader>
                    
                    <CardContent>
                      <Accordion 
                        type="single" 
                        collapsible 
                        defaultValue="features"
                      >
                        <AccordionItem value="features">
                          <AccordionTrigger className="text-lg font-medium">
                            Key Features
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                              {service.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    
                    <CardFooter>
                      <Button variant="default" className="w-full">
                        Learn more about {service.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                    </Card>
                  </Enhanced3DHoverCards>
                </div>
                
                <div className="relative">
                  <div className="card-3d rounded-lg overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ServicesSection;
