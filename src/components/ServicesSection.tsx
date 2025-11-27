import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Palette, MonitorPlay, Code, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'vfx',
    name: 'CGI & VFX',
    description: 'From basic compositing to complex 3D integration, we deliver high-quality visual effects for film, TV, and digital content.',
    icon: Video,
    color: 'primary',
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
    name: 'Creative',
    description: 'Our creative team brings your vision to life with cutting-edge design, animation, and conceptual development.',
    icon: Palette,
    color: 'secondary',
    features: [
      'Graphic & Logo Design',
      'Motion Posters & MGFX',
      'Video Editing',
      'Title Sequence Design',
      'Motion Graphics',
      'Digital Marketing'
    ],
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: 'di',
    name: 'Digital Intermediate',
    description: 'Complete end-to-end DI solutions including color grading, conforming, mastering and delivery for all formats.',
    icon: MonitorPlay,
    color: 'accent',
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
    icon: Code,
    color: 'neon-cyan',
    features: [
      'AI-Assisted Workflows',
      'Custom Pipeline Development',
      'Automation Solutions',
      'Cloud Rendering',
      'Real-time Collaboration',
      'Asset Management Systems'
    ],
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1170&auto=format&fit=crop'
  }
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState('vfx');
  
  const activeService = services.find(s => s.id === activeTab);
  
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title="Our Services" 
          subtitle="Comprehensive solutions powered by AI and creative excellence"
        />
        
        <Tabs defaultValue="vfx" value={activeTab} onValueChange={setActiveTab} className="w-full mt-12">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto p-0">
            {services.map((service) => {
              const IconComponent = service.icon;
              const isActive = activeTab === service.id;
              return (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className={`
                    flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'glass-card shadow-glow' 
                      : 'bg-card/30 hover:bg-card/50 border border-border/30'
                    }
                  `}
                >
                  <IconComponent className={`h-6 w-6 ${isActive ? `text-${service.color}` : 'text-muted-foreground'}`} />
                  <span className="text-xs sm:text-sm font-medium">{service.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                {/* Content */}
                <div className="order-2 lg:order-1">
                  <Card className="glass-card border-border/30 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-${service.color}/10 flex items-center justify-center`}>
                          <service.icon className={`h-7 w-7 text-${service.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-2xl md:text-3xl font-bold">{service.name}</CardTitle>
                          <CardDescription className="text-muted-foreground mt-1">
                            Professional Solutions
                          </CardDescription>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {service.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                          >
                            <div className={`w-5 h-5 rounded-full bg-${service.color}/20 flex items-center justify-center flex-shrink-0`}>
                              <Check className={`w-3 h-3 text-${service.color}`} />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-4">
                      <Link to="/services" className="w-full">
                        <Button className="w-full btn-gradient group">
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Learn More
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Image */}
                <div className="order-1 lg:order-2">
                  <motion.div 
                    className="relative rounded-2xl overflow-hidden glass-card hover-lift"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="aspect-video relative">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      
                      {/* Floating badge */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="glass-card p-4 rounded-xl">
                          <p className="text-sm font-medium">{service.name} Solutions</p>
                          <p className="text-xs text-muted-foreground mt-1">Professional quality, delivered on time</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ServicesSection;
