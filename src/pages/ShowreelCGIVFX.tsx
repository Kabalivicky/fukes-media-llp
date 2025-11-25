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
import { BeforeAfterSlider } from '@/components/Showreel/BeforeAfterSlider';

const ShowreelCGIVFX = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const vfxBreakdown = [
    {
      title: "2D/3D Compositing",
      duration: "0:00 - 0:20",
      description: "Multi-layer compositing with advanced color grading and lighting integration",
      techniques: ["Nuke Compositing", "Color Science", "Light Wrapping"]
    },
    {
      title: "Rotoscoping & Clean-up",
      duration: "0:21 - 0:35",
      description: "Precision rotoscoping and wire removal for seamless integration",
      techniques: ["Frame-by-Frame Roto", "Wire Removal", "Object Removal"]
    },
    {
      title: "3D Modeling & Animation",
      duration: "0:36 - 0:50",
      description: "Photorealistic 3D models with procedural texturing and animation",
      techniques: ["Maya Modeling", "Substance Painting", "Rigging & Animation"]
    },
    {
      title: "Simulation & FX",
      duration: "0:51 - 1:05",
      description: "Advanced particle systems, fluid dynamics, and destruction effects",
      techniques: ["Houdini FX", "Fluid Simulation", "Destruction"]
    }
  ];

  const beforeAfterExamples = [
    {
      beforeImage: "/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png",
      afterImage: "/lovable-uploads/3de9500c-d591-4285-a138-466eedcee6e6.png",
      title: "Environment Extension",
      description: "Digital matte painting and 3D environment integration",
      category: "Matte Painting"
    },
    {
      beforeImage: "/lovable-uploads/4ea8b97d-d1e3-4753-a973-13cc19993e16.png",
      afterImage: "/lovable-uploads/4fc704b5-1f46-4dc1-855e-a6fae9184910.png",
      title: "CG Character Integration",
      description: "Full CG character composited into live-action footage",
      category: "CGI"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="CGI & VFX Showreel - Visual Effects Demo | Fuke's Media"
        description="Explore our CGI and VFX capabilities through our comprehensive showreel. Watch advanced compositing, 3D animation, simulations, and visual effects work."
        keywords="CGI showreel, VFX demo, visual effects portfolio, 3D animation, compositing, VFX breakdown"
        canonical="https://fukes-media.com/showreel/cgi-vfx"
      />

      <MainLayout pageKey="showreel-cgi-vfx">
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
              title="CGI & VFX Solutions Showreel"
              subtitle="Comprehensive showcase of our visual effects and CGI capabilities"
            />

            {/* Main Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-6xl mx-auto mt-12"
            >
              <CustomVideoPlayer
                src="YOUR_CGI_VFX_VIDEO_URL.mp4"
                poster="/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png"
                title="CGI & VFX Showreel 2024"
              />

              {/* Video Info */}
              <Card className="mt-4 p-4 bg-muted/50 border-dashed">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>To add your CGI & VFX showreel:</strong> Upload your video and update the src URL in CustomVideoPlayer component.
                </p>
              </Card>
            </motion.div>

            {/* VFX Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-display font-bold text-center mb-8">VFX Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vfxBreakdown.map((section, index) => (
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

            {/* Before/After Comparisons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <h3 className="text-2xl font-display font-bold text-center mb-8">Before & After VFX</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {beforeAfterExamples.map((example, index) => (
                  <BeforeAfterSlider
                    key={index}
                    beforeImage={example.beforeImage}
                    afterImage={example.afterImage}
                    title={example.title}
                    description={example.description}
                    category={example.category}
                  />
                ))}
              </div>
            </motion.div>

            {/* Technical Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <Card className="border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display font-bold mb-6 text-center">Technical Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Software Stack</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Nuke: Advanced Compositing</li>
                        <li>• Maya: 3D Modeling & Animation</li>
                        <li>• Houdini: FX & Simulation</li>
                        <li>• Substance Painter: Texturing</li>
                        <li>• ZBrush: Character Sculpting</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-secondary">Delivery Formats</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 4K/8K Resolution Support</li>
                        <li>• HDR & Dolby Vision</li>
                        <li>• ACES Color Pipeline</li>
                        <li>• EXR/DPX/ProRes Formats</li>
                        <li>• Stereo 3D & VR Ready</li>
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
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 max-w-3xl mx-auto">
                <h3 className="text-2xl font-display font-bold mb-4">Need Professional VFX Services?</h3>
                <p className="text-muted-foreground mb-6">
                  Let's bring your vision to life with cutting-edge CGI and visual effects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Start Your VFX Project
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button size="lg" variant="outline">
                      View All Services
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

export default ShowreelCGIVFX;
