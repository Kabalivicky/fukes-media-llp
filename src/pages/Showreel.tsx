import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowLeft, Download, Share2 } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import SEOHelmet from '@/components/SEOHelmet';
import showreelThumbnail from '@/assets/projects/kalki-2898-ad.png';

const SHOWREEL_EMBED_URL = "https://drive.google.com/file/d/1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk/preview";
const SHOWREEL_VIEW_URL = "https://drive.google.com/file/d/1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk/view";
const SHOWREEL_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk";

const Showreel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showreelSections = [
    {
      title: "AI-Driven VFX",
      duration: "0:00 - 0:15",
      description: "Showcasing our neural rendering and AI-assisted visual effects",
      techniques: ["Neural Rendering", "AI Compositing", "Machine Learning VFX"]
    },
    {
      title: "Cinematic Storytelling",
      duration: "0:16 - 0:30",
      description: "Emotional narrative sequences demonstrating our storytelling prowess",
      techniques: ["Character Animation", "Environmental Design", "Lighting"]
    },
    {
      title: "Technical Innovation",
      duration: "0:31 - 0:45",
      description: "Cutting-edge techniques and breakthrough VFX achievements",
      techniques: ["Volumetric Rendering", "Procedural Animation", "Real-time VFX"]
    },
    {
      title: "Award-Winning Projects",
      duration: "0:46 - 1:00",
      description: "Highlights from our most celebrated and recognized work",
      techniques: ["Feature Films", "Commercials", "Music Videos"]
    }
  ];

  const projectHighlights = [
    {
      title: "Neural Depths",
      category: "Short Film",
      award: "Best VFX 2024",
      description: "Revolutionary underwater world creation using AI-driven volumetric lighting"
    },
    {
      title: "Quantum Horizons", 
      category: "Commercial",
      award: "Gold Award",
      description: "Multi-dimensional compositing breakthrough for tech brand"
    },
    {
      title: "Biomechanical Symphony",
      category: "Music Video", 
      award: "Best Animation",
      description: "Full 3D procedural creatures with ML-driven animation"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Fuke's Media Official Showreel 2024",
    "description": "Award-winning VFX showreel featuring AI-driven visual effects and cinematic storytelling",
    "duration": "PT1M",
    "uploadDate": "2024-01-01",
    "creator": {
      "@type": "Organization",
      "name": "Fuke's Media LLP"
    }
  };

  return (
    <>
      <SEOHelmet
        title="Official Showreel 2024 - Fuke's Media VFX Excellence"
        description="Watch our award-winning showreel featuring breakthrough AI-driven VFX, cinematic storytelling, and technical innovation. 60 seconds of pure visual excellence."
        keywords="VFX showreel, visual effects demo, AI-driven VFX, award-winning projects, cinematic VFX"
        canonical="https://fukes-media.com/showreel"
        structuredData={structuredData}
      />

      <MainLayout pageKey="showreel">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            {/* Back Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link to="/portfolio">
                <Button variant="ghost" className="group">
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Portfolio
                </Button>
              </Link>
            </motion.div>

            <SectionTitle
              title="Official Showreel 2024"
              subtitle="60 seconds of pure visual excellence showcasing our award-winning work"
            />

            {/* Main Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-6xl mx-auto mt-12"
            >
              <Card className="overflow-hidden border-2 border-primary/20">
                <div className="relative aspect-video bg-black">
                  {isPlaying ? (
                    <>
                      <iframe
                        src={SHOWREEL_EMBED_URL}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="Fuke's Media Official Showreel 2024"
                      />
                      {/* Fallback link */}
                      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
                        <a 
                          href={SHOWREEL_VIEW_URL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-white text-sm underline bg-black/50 px-3 py-1 rounded"
                        >
                          Video not loading? Click here to watch on Google Drive
                        </a>
                      </div>
                    </>
                  ) : (
                    <div 
                      className="absolute inset-0 cursor-pointer group"
                      onClick={() => setIsPlaying(true)}
                    >
                      {/* Thumbnail Image */}
                      <img 
                        src={showreelThumbnail} 
                        alt="Showreel Thumbnail" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-8 group-hover:scale-110 transition-transform duration-300"
                        >
                          <Play className="h-12 w-12 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Video Controls Overlay */}
                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : ''}`}>
                    <div className="flex justify-between items-center text-white">
                      <div>
                        <h3 className="text-2xl font-display font-bold">Fuke's Media - Official Showreel 2024</h3>
                        <p className="text-white/80">Award-caliber VFX excellence in 60 seconds</p>
                      </div>
                      <div className="flex gap-2">
                        <a href={SHOWREEL_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="secondary">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </a>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => {
                            navigator.clipboard.writeText(SHOWREEL_VIEW_URL);
                          }}
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Showreel Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-display font-bold text-center mb-8">Showreel Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {showreelSections.map((section, index) => (
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
              <h3 className="text-2xl font-display font-bold text-center mb-8">Featured in Showreel</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {projectHighlights.map((project, index) => (
                  <Card key={index} className="text-center border-border/50 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-accent text-accent-foreground">{project.award}</Badge>
                      <h4 className="font-display font-semibold text-lg mb-2">{project.title}</h4>
                      <p className="text-primary text-sm font-medium mb-3">{project.category}</p>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </CardContent>
                  </Card>
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
                  <h3 className="text-2xl font-display font-bold mb-6 text-center">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Video Specifications</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Resolution: 4K UHD (3840×2160)</li>
                        <li>• Frame Rate: 24fps (Cinematic)</li>
                        <li>• Duration: 60 seconds</li>
                        <li>• Format: MP4 / WebM</li>
                        <li>• Color Space: Rec. 2020</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-secondary">Production Details</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• AI-Enhanced Rendering: 100%</li>
                        <li>• Neural Network Integration: Advanced</li>
                        <li>• Compositing Layers: 200+</li>
                        <li>• 3D Elements: Volumetric & Procedural</li>
                        <li>• Production Time: 3 months</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center mt-16"
            >
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 max-w-3xl mx-auto">
                <h3 className="text-2xl font-display font-bold mb-4">Inspired by Our Work?</h3>
                <p className="text-muted-foreground mb-6">
                  Let's create something extraordinary together. Experience the future of VFX with our award-winning team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Start Your Project
                    </Button>
                  </Link>
                  <Link to="/portfolio">
                    <Button size="lg" variant="outline">
                      View Full Portfolio
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

export default Showreel;