import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import SEOHelmet from '@/components/SEOHelmet';
import { CustomVideoPlayer } from '@/components/Showreel/CustomVideoPlayer';

const ShowreelCreative = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const creativeBreakdown = [
    {
      title: "Graphic Design & Branding",
      duration: "0:00 - 0:15",
      description: "Logo design, brand identity, and visual communication",
      techniques: ["Logo Design", "Brand Guidelines", "Print Design"]
    },
    {
      title: "Motion Graphics",
      duration: "0:16 - 0:30",
      description: "Dynamic motion graphics and title sequences",
      techniques: ["After Effects", "Cinema 4D", "Typography Animation"]
    },
    {
      title: "Video Editing & Post",
      duration: "0:31 - 0:45",
      description: "Professional video editing and post-production",
      techniques: ["Premiere Pro", "DaVinci Resolve", "Sound Design"]
    },
    {
      title: "Digital Marketing Content",
      duration: "0:46 - 1:00",
      description: "Social media content and digital campaigns",
      techniques: ["Social Media Graphics", "Ad Campaigns", "Content Strategy"]
    }
  ];

  const projectShowcase = [
    {
      title: "Brand Identity Package",
      category: "Graphic Design",
      description: "Complete brand identity including logo, style guide, and collateral"
    },
    {
      title: "Music Video Production",
      category: "Video Production",
      description: "Lyrical video with dynamic motion graphics and effects"
    },
    {
      title: "Motion Poster Campaign",
      category: "Motion Graphics",
      description: "Animated poster series for film promotion"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Creative Services Showreel - Design & Motion Graphics | Fuke's Media"
        description="Explore our creative services portfolio including graphic design, motion graphics, video editing, and digital marketing content."
        keywords="creative showreel, motion graphics, graphic design, video editing, branding"
        canonical="https://fukes-media.com/showreel/creative"
      />

      <MainLayout pageKey="showreel-creative">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link to="/showreel">
                <Button variant="ghost" className="group">
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Main Showreel
                </Button>
              </Link>
            </motion.div>

            <SectionTitle
              title="Creative Services Showreel"
              subtitle="Showcasing our design, motion graphics, and creative production work"
            />

            {/* Main Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-6xl mx-auto mt-12"
            >
              <CustomVideoPlayer
                src="YOUR_CREATIVE_VIDEO_URL.mp4"
                poster="/lovable-uploads/5ad66e50-d398-4c59-b672-b2d75c8149fd.png"
                title="Creative Services Showreel 2024"
              />

              <Card className="mt-4 p-4 bg-muted/50 border-dashed">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>To add your Creative Services showreel:</strong> Upload your video and update the src URL.
                </p>
              </Card>
            </motion.div>

            {/* Creative Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-display font-bold text-center mb-8">Services Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creativeBreakdown.map((section, index) => (
                  <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-display font-semibold text-lg">{section.title}</h4>
                        <Badge variant="outline">{section.duration}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{section.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {section.techniques.map((technique, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Featured Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <h3 className="text-2xl font-display font-bold text-center mb-8">Featured Creative Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {projectShowcase.map((project, index) => (
                  <Card key={index} className="text-center border-border/50 hover:border-accent/50 transition-colors">
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-accent text-accent-foreground">{project.category}</Badge>
                      <h4 className="font-display font-semibold text-lg mb-2">{project.title}</h4>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Technical Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <Card className="border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-6 text-center">Creative Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 text-accent">Design Tools</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Adobe Creative Suite (Ps, Ai, Id)</li>
                        <li>• After Effects & Cinema 4D</li>
                        <li>• Figma & Sketch</li>
                        <li>• Blender for 3D Graphics</li>
                        <li>• DaVinci Resolve & Premiere Pro</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Deliverables</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Print-Ready Files (CMYK/RGB)</li>
                        <li>• Motion Graphics (MP4/MOV)</li>
                        <li>• Web-Optimized Assets</li>
                        <li>• Social Media Formats</li>
                        <li>• Brand Guidelines & Source Files</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center mt-16"
            >
              <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20 max-w-3xl mx-auto">
                <h3 className="text-2xl font-display font-bold mb-4">Need Creative Design Services?</h3>
                <p className="text-muted-foreground mb-6">
                  From branding to motion graphics, we bring creative ideas to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-accent hover:bg-accent/90">
                      Start Your Creative Project
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button size="lg" variant="outline">
                      View Creative Services
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ShowreelCreative;
