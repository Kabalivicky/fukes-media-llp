
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Mic, Video, Avatar, Headphones, Globe } from 'lucide-react';
import SEOHelmet from '@/components/SEOHelmet';

const MetaStudio = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [avatarSelected, setAvatarSelected] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Avatar className="h-6 w-6" />,
      title: 'Custom Avatars',
      description: 'Web3-compatible avatars for immersive presentations'
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: 'Spatial Audio',
      description: 'High-quality 3D audio for natural conversations'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Multi-User Rooms',
      description: 'Collaborate with clients and team members'
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: 'Scene Previews',
      description: 'Review and approve VFX work in virtual space'
    }
  ];

  const roomTypes = [
    {
      id: 'presentation',
      title: 'Presentation Room',
      description: 'Formal client meetings and project pitches',
      capacity: '8 participants'
    },
    {
      id: 'review',
      title: 'Review Studio',
      description: 'Scene-by-scene VFX review sessions',
      capacity: '4 participants'
    },
    {
      id: 'creative',
      title: 'Creative Lab',
      description: 'Brainstorming and concept development',
      capacity: '12 participants'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VirtualLocation",
    "name": "Meta Studio",
    "description": "Metaverse-based presentation studio for client meetings and VFX reviews"
  };

  return (
    <>
      <SEOHelmet
        title="Meta Studio - Fuke's Media"
        description="Enter our metaverse presentation studio for immersive client meetings, VFX reviews, and creative collaboration with spatial audio and custom avatars."
        keywords="metaverse, virtual meetings, avatar-based presentations, spatial audio, Web3, VFX reviews"
        canonical="https://fukes-media.com/meta-studio"
        structuredData={structuredData}
      />

      <MainLayout pageKey="meta-studio">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle
                title="Meta Studio"
                subtitle="Metaverse-based presentation studio for the future of client collaboration"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
                <div>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="mr-2 h-5 w-5" />
                        Quick Access
                      </CardTitle>
                      <CardDescription>
                        Enter the metaverse studio instantly
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!isConnected ? (
                        <div className="space-y-4">
                          <Button 
                            className="w-full"
                            onClick={() => setIsConnected(true)}
                          >
                            Connect Wallet & Enter Studio
                          </Button>
                          <Button variant="outline" className="w-full">
                            Enter as Guest
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="text-sm">Status: Connected</span>
                            <Badge variant="secondary">Online</Badge>
                          </div>
                          {!avatarSelected ? (
                            <Button 
                              className="w-full"
                              onClick={() => setAvatarSelected(true)}
                            >
                              <Avatar className="mr-2 h-4 w-4" />
                              Select Avatar
                            </Button>
                          ) : (
                            <Button className="w-full gradient-button">
                              Enter Meta Studio
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <h3 className="text-xl font-semibold mb-4">Available Rooms</h3>
                  <div className="space-y-3">
                    {roomTypes.map((room) => (
                      <Card key={room.id} className="cursor-pointer hover:shadow-lg transition-all">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{room.title}</CardTitle>
                            <Badge variant="outline">{room.capacity}</Badge>
                          </div>
                          <CardDescription>{room.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border">
                    <h4 className="text-xl font-semibold mb-4">Studio Preview</h4>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-2">
                          Immersive Metaverse Environment
                        </p>
                        <p className="text-sm text-muted-foreground">
                          3D collaborative space with spatial audio
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <Button variant="outline" size="sm">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Headphones className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button className="w-full" disabled={!isConnected || !avatarSelected}>
                      Join Presentation Room
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <h3 className="text-2xl font-bold text-center mb-12">Studio Features</h3>
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
                <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20">
                  <CardContent className="pt-6">
                    <Globe className="h-12 w-12 mx-auto mb-4 text-cyan-500" />
                    <h3 className="text-2xl font-bold mb-4">Welcome to the Future of Meetings</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Experience client presentations like never before. Our Meta Studio creates 
                      immersive environments where ideas come to life and collaboration knows no boundaries.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="gradient-button">
                        Schedule Meta Meeting
                      </Button>
                      <Button size="lg" variant="outline">
                        Learn More
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

export default MetaStudio;
