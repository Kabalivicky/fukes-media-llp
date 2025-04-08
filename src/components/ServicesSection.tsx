
import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Palette, Video, MonitorPlay, Code } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DynamicPrice from './DynamicPrice';

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
    image: '/lovable-uploads/9a2e5c45-aeb7-45ad-b39b-514912f1f206.png',
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
    image: '/lovable-uploads/11a20677-57d8-49be-bcf7-4b2587f38450.png',
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
    image: '/lovable-uploads/6083bf38-2b22-44b8-be5a-40e5463692f2.png',
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
    image: '/lovable-uploads/f960e5fd-76d0-443b-aac2-38d463aedb20.png',
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
                  <Card className="border border-border bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="mb-4">{service.icon}</div>
                      <CardTitle className="text-2xl md:text-3xl font-bold">{service.name}</CardTitle>
                      <CardDescription className="text-muted-foreground text-base">
                        {service.description}
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
                              {service.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
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
                              {service.pricing.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b border-border pb-2">
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
