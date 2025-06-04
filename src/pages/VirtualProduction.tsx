
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Monitor, Camera, Cpu, Zap, Eye } from 'lucide-react';
import SEOHelmet from '@/components/SEOHelmet';

const VirtualProduction = () => {
  const [selectedDemo, setSelectedDemo] = useState('led-wall');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const techStack = [
    { name: 'Unreal Engine', description: 'Real-time rendering and virtual environments', icon: <Cpu className="h-6 w-6" /> },
    { name: 'Unity', description: 'Cross-platform 3D development', icon: <Monitor className="h-6 w-6" /> },
    { name: 'Disguise', description: 'Media server and workflow solutions', icon: <Eye className="h-6 w-6" /> },
    { name: 'OptiTrack', description: 'Motion capture and camera tracking', icon: <Camera className="h-6 w-6" /> }
  ];

  const demos = [
    {
      id: 'led-wall',
      title: 'LED Wall Simulation',
      description: 'Interactive demonstration of virtual LED wall environments',
      thumbnail: '/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png'
    },
    {
      id: 'green-screen',
      title: 'Green Screen Workflow',
      description: 'Real-time compositing and background replacement',
      thumbnail: '/lovable-uploads/f26d960c-bb81-4fa5-8f55-4dcf0102e774.png'
    },
    {
      id: 'stage-setup',
      title: 'Stage-Based Shoots',
      description: 'Complete virtual production stage configurations',
      thumbnail: '/lovable-uploads/4fc704b5-1f46-4dc1-855e-a6fae9184910.png'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Virtual Production Services",
    "description": "Real-time filmmaking and green screen workflows with LED wall simulation",
    "provider": {
      "@type": "Organization",
      "name": "Fuke's Media"
    }
  };

  return (
    <>
      <SEOHelmet
        title="Virtual Production - Fuke's Media"
        description="Experience the future of filmmaking with our virtual production services. LED wall simulation, real-time rendering, and advanced green screen workflows."
        keywords="virtual production, LED wall, real-time rendering, green screen, Unreal Engine, filmmaking"
        canonical="https://fukes-media.com/virtual-production"
        structuredData={structuredData}
      />

      <MainLayout pageKey="virtual-production">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle
                title="Virtual Production"
                subtitle="Real-time filmmaking and immersive green screen workflows"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Interactive Demos</h3>
                  <div className="space-y-4">
                    {demos.map((demo) => (
                      <Card 
                        key={demo.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedDemo === demo.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedDemo(demo.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{demo.title}</CardTitle>
                            <Play className="h-5 w-5 text-primary" />
                          </div>
                          <CardDescription>{demo.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border">
                    <h4 className="text-xl font-semibold mb-4">Demo Viewer</h4>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Monitor className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {demos.find(d => d.id === selectedDemo)?.title} Demo
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Interactive 3D viewer coming soon
                        </p>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      Launch Interactive Demo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <h3 className="text-2xl font-bold text-center mb-12">Our Technology Stack</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-all">
                        <CardHeader>
                          <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                            {tech.icon}
                          </div>
                          <CardTitle className="text-lg">{tech.name}</CardTitle>
                          <CardDescription>{tech.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-20 text-center">
                <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                  <CardContent className="pt-6">
                    <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Production?</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Experience the future of filmmaking with our virtual production capabilities. 
                      From LED wall simulations to real-time rendering, we'll bring your vision to life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="gradient-button">
                        Schedule Consultation
                      </Button>
                      <Button size="lg" variant="outline">
                        View Sample Projects
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default VirtualProduction;
