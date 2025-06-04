import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Headset, Smartphone, Download, Eye, Rotate3D, Hand } from 'lucide-react';
import SEOHelmet from '@/components/SEOHelmet';

const ARVRShowroom = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState('studio');
  const [viewMode, setViewMode] = useState<'ar' | 'vr' | '360'>('360');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const environments = [
    {
      id: 'studio',
      title: 'Virtual Studio',
      description: 'Interactive VFX studio environment',
      type: 'Interior'
    },
    {
      id: 'outdoor',
      title: 'Outdoor Scene',
      description: 'Natural environment with dynamic lighting',
      type: 'Exterior'
    },
    {
      id: 'futuristic',
      title: 'Sci-Fi Environment',
      description: 'Futuristic cityscape with neon effects',
      type: 'Concept'
    }
  ];

  const features = [
    {
      icon: <Rotate3D className="h-6 w-6" />,
      title: '360° Interactive Scenes',
      description: 'Fully immersive environments you can explore'
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: 'AR Mobile Viewer',
      description: 'View assets in your real environment'
    },
    {
      icon: <Headset className="h-6 w-6" />,
      title: 'VR Ready Scenes',
      description: 'WebXR compatible for headset viewing'
    },
    {
      icon: <Hand className="h-6 w-6" />,
      title: 'Gesture Controls',
      description: 'Intuitive hand tracking and interactions'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AR/VR Showroom",
    "description": "WebXR-powered viewer for exploring VFX environments in AR and VR",
    "applicationCategory": "MultimediaApplication"
  };

  return (
    <>
      <SEOHelmet
        title="AR/VR Showroom - Fuke's Media"
        description="Explore our VFX projects in immersive AR and VR environments. WebXR-powered viewer with 360° interactive scenes."
        keywords="AR, VR, WebXR, virtual reality, augmented reality, 360 video, immersive experiences"
        canonical="https://fukes-media.com/ar-vr-showroom"
        structuredData={structuredData}
      />

      <MainLayout pageKey="ar-vr-showroom">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle
                title="AR/VR Showroom"
                subtitle="Immersive exploration of our VFX environments and projects"
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
                <div className="lg:col-span-2">
                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Environment Viewer</h3>
                      <div className="flex gap-2">
                        {(['360', 'ar', 'vr'] as const).map((mode) => (
                          <Button
                            key={mode}
                            variant={viewMode === mode ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode(mode)}
                          >
                            {mode.toUpperCase()}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Headset className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h4 className="text-lg font-semibold mb-2">
                          {environments.find(e => e.id === selectedEnvironment)?.title}
                        </h4>
                        <p className="text-muted-foreground mb-4">
                          Viewing in {viewMode.toUpperCase()} mode
                        </p>
                        <Badge variant="outline">
                          WebXR Experience Loading...
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex-1">
                        <Headset className="mr-2 h-4 w-4" />
                        Launch VR Experience
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Smartphone className="mr-2 h-4 w-4" />
                        Open in AR
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Available Environments</h3>
                  <div className="space-y-3">
                    {environments.map((env) => (
                      <Card
                        key={env.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedEnvironment === env.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedEnvironment(env.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">{env.title}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {env.type}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">
                            {env.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">AR Markers</h4>
                    <Card>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          Download AR markers to view assets on your mobile device
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Markers
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <h3 className="text-2xl font-bold text-center mb-12">WebXR Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="text-center hover:shadow-lg transition-all">
                        <CardHeader>
                          <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                            {feature.icon}
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-20 text-center">
                <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
                  <CardContent className="pt-6">
                    <Eye className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-2xl font-bold mb-4">Experience the Future</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Step into our virtual worlds and see your projects come to life in ways never before possible.
                      Compatible with all major VR headsets and mobile AR devices.
                    </p>
                    <Button size="lg" className="gradient-button">
                      Start Exploring
                    </Button>
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

export default ARVRShowroom;
