
import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Palette, Video, MonitorPlay, Code } from 'lucide-react';

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
    image: '/lovable-uploads/9a2e5c45-aeb7-45ad-b39b-514912f1f206.png'
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
    image: '/lovable-uploads/11a20677-57d8-49be-bcf7-4b2587f38450.png'
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
    image: '/lovable-uploads/6083bf38-2b22-44b8-be5a-40e5463692f2.png'
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
    image: '/lovable-uploads/f960e5fd-76d0-443b-aac2-38d463aedb20.png'
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
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
