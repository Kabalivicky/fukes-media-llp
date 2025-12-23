
import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Palette, Video, MonitorPlay, Code } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DynamicPrice from './DynamicPrice';
import TypewriterText from './TypewriterText';
import TiltCard from './TiltCard';
import ScrollReveal from './ScrollReveal';
import FadeInOnScroll from './FadeInOnScroll';

const services = [
  {
    id: 'vfx',
    name: 'VFX Solutions',
    description: 'From basic compositing to complex 3D integration, we deliver high-quality visual effects for film, TV, and digital content.',
    icon: <Video className="h-10 w-10 text-primary" />,
    features: [
      '3D Modeling & Animation',
      'Compositing & Rotoscoping',
      'Motion Graphics & Tracking',
      'Particle & Fluid Simulations',
      'Digital Set Extensions',
      'AI-enhanced workflows'
    ],
    image: 'https://images.unsplash.com/photo-1626428091984-427d4209b3fa?q=80&w=1287&auto=format&fit=crop',
    pricing: [
      { name: 'Basic Rotoscoping', price: 30, unit: 'per frame' },
      { name: '2D Compositing', price: 75, unit: 'per frame' },
      { name: '3D Integration', price: 250, unit: 'per shot' }
    ]
  },
  {
    id: 'creative',
    name: 'Creative Services',
    description: 'Our creative team brings your vision to life with cutting-edge design, animation, and conceptual development.',
    icon: <Palette className="h-10 w-10 text-secondary" />,
    features: [
      'Art Direction & Conceptualization',
      'Character Design & Development',
      'Environment Design',
      'Storyboarding & Previsualization',
      'UI/UX Design for AR/VR',
      'Brand Identity Development'
    ],
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1170&auto=format&fit=crop',
    pricing: [
      { name: 'Poster Design', price: 5000, unit: 'per poster' },
      { name: 'Motion Poster', price: 15000, unit: 'per design' },
      { name: 'Concept Art', price: 8000, unit: 'per piece' }
    ]
  },
  {
    id: 'di',
    name: 'Digital Intermediate (DI)',
    description: 'Complete end-to-end DI solutions including color grading, conforming, mastering and delivery for all formats.',
    icon: <MonitorPlay className="h-10 w-10 text-accent" />,
    features: [
      'Base Light & DaVinci Resolve Grading',
      'HDR/Dolby Vision Mastering',
      'Film Restoration & Enhancement',
      'LUT Development & Color Management',
      'Final Conforming & Versioning',
      'Deliverable Creation for All Platforms'
    ],
    image: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?q=80&w=1171&auto=format&fit=crop',
    pricing: [
      { name: 'Basic Color Grading', price: 25000, unit: 'per minute' },
      { name: 'Advanced Color Grading', price: 50000, unit: 'per minute' },
      { name: 'HDR Grading', price: 80000, unit: 'per minute' }
    ]
  },
  {
    id: 'tech',
    name: 'Tech Innovation',
    description: 'Cutting-edge technology solutions and AI integration to enhance creative workflows and production efficiency.',
    icon: <Code className="h-10 w-10 text-neon-green" />,
    features: [
      'Custom AI Pipeline Development',
      'Automated Rotoscoping Solutions',
      'Facial Motion Capture & Tracking',
      'Virtual Production Setup',
      'Real-time Rendering Implementation',
      'Custom Tool Development'
    ],
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1170&auto=format&fit=crop',
    pricing: [
      { name: 'AI Pipeline Integration', price: 100000, unit: 'per project' },
      { name: 'Virtual Production Setup', price: 250000, unit: 'one-time' },
      { name: 'Custom Tool Development', price: 75000, unit: 'per tool' }
    ]
  }
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState('vfx');
  const [expandedAccordion, setExpandedAccordion] = useState<string>('features');
  
  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fadeUp" duration={0.7}>
          <SectionTitle 
            title="Our Services" 
            subtitle="Comprehensive solutions powered by AI and creative excellence"
          />
        </ScrollReveal>
        
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
          
          {services.map((service, index) => (
            <TabsContent key={service.id} value={service.id} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <FadeInOnScroll direction="left" delay={100} duration={0.6}>
                  <TiltCard tiltIntensity={10} glareEnabled={true}>
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
                        value={expandedAccordion}
                        onValueChange={setExpandedAccordion}
                      >
                        <AccordionItem value="features">
                          <AccordionTrigger className="text-lg font-medium">
                            Key Features
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="pricing">
                          <AccordionTrigger className="text-lg font-medium">
                            Sample Pricing
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 mt-2">
                              {service.pricing.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-border pb-2">
                                  <span>{item.name}</span>
                                  <span><DynamicPrice priceUSD={item.price} showCode={true} /> {item.unit}</span>
                                </div>
                              ))}
                              <div className="text-sm text-muted-foreground mt-2">
                                * Prices vary based on project complexity and requirements
                              </div>
                            </div>
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
                  </TiltCard>
                </FadeInOnScroll>
                
                <FadeInOnScroll direction="right" delay={200} duration={0.6}>
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
                </FadeInOnScroll>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ServicesSection;
