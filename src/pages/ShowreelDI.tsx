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

const ShowreelDI = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const diBreakdown = [
    {
      title: "Basic Color Grading",
      duration: "0:00 - 0:15",
      description: "Primary color correction and shot matching",
      techniques: ["Primary Grading", "Shot Matching", "Exposure Balance"]
    },
    {
      title: "Advanced Color Grading",
      duration: "0:16 - 0:30",
      description: "Secondary corrections, power windows, and look development",
      techniques: ["Secondary Grading", "Power Windows", "Vignetting"]
    },
    {
      title: "HDR Grading",
      duration: "0:31 - 0:45",
      description: "High dynamic range grading for HDR10 and Dolby Vision",
      techniques: ["HDR10", "Dolby Vision", "Tone Mapping"]
    },
    {
      title: "Look Development",
      duration: "0:46 - 1:00",
      description: "Custom LUT creation and cinematic look design",
      techniques: ["LUT Creation", "Film Emulation", "Color Science"]
    }
  ];

  const beforeAfterGrades = [
    {
      beforeImage: "/lovable-uploads/6f4b1c81-acc3-4ad7-b5bb-fc537f6f91eb.png",
      afterImage: "/lovable-uploads/7aa001b2-00ae-4aed-9551-897de83da325.png",
      title: "Cinematic Color Grade",
      description: "From flat log footage to cinematic final grade",
      category: "Color Grading"
    },
    {
      beforeImage: "/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png",
      afterImage: "/lovable-uploads/944a6085-c5b4-40f4-9860-cd0c9bf5f682.png",
      title: "HDR Transformation",
      description: "SDR to HDR grading with enhanced dynamic range",
      category: "HDR"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="DI Services Showreel - Color Grading & Digital Intermediate | Fuke's Media"
        description="Explore our digital intermediate and color grading work. Professional color correction, HDR grading, and look development services."
        keywords="DI showreel, color grading, digital intermediate, HDR grading, color correction"
        canonical="https://fukes-media.com/showreel/di"
      />

      <MainLayout pageKey="showreel-di">
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
              title="DI Services Showreel"
              subtitle="Professional color grading and digital intermediate services"
            />

            {/* Main Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-6xl mx-auto mt-12"
            >
              <CustomVideoPlayer
                src="YOUR_DI_VIDEO_URL.mp4"
                poster="/lovable-uploads/98a66a3b-d5b0-4b14-891c-e5ee0f6dcbc3.png"
                title="DI Services Showreel 2024"
              />

              <Card className="mt-4 p-4 bg-muted/50 border-dashed">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>To add your DI Services showreel:</strong> Upload your video and update the src URL.
                </p>
              </Card>
            </motion.div>

            {/* DI Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-display font-bold text-center mb-8">DI Services Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {diBreakdown.map((section, index) => (
                  <Card key={index} className="border-border/50 hover:border-secondary/50 transition-colors">
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

            {/* Before/After Grades */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <h3 className="text-2xl font-display font-bold text-center mb-8">Before & After Grading</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {beforeAfterGrades.map((example, index) => (
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
                  <h3 className="text-2xl font-display font-bold mb-6 text-center">DI Technical Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 text-secondary">Grading Software</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• DaVinci Resolve Studio</li>
                        <li>• Baselight</li>
                        <li>• FilmLight Daylight</li>
                        <li>• ACES Color Pipeline</li>
                        <li>• Custom LUT Development</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Supported Formats</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• HDR10, HDR10+, Dolby Vision</li>
                        <li>• 2K, 4K, 6K, 8K Resolution</li>
                        <li>• ProRes, DNxHD, EXR, DPX</li>
                        <li>• IMF & DCP Mastering</li>
                        <li>• Broadcast & Theatrical Standards</li>
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
              <Card className="p-8 bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20 max-w-3xl mx-auto">
                <h3 className="text-2xl font-display font-bold mb-4">Need Professional Color Grading?</h3>
                <p className="text-muted-foreground mb-6">
                  Transform your footage with professional DI services and cinematic color grading.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                      Start Your DI Project
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button size="lg" variant="outline">
                      View DI Services
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

export default ShowreelDI;
