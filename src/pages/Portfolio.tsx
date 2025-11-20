import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Eye, Award, Filter } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import AnimatedProjectsSection from '@/components/AnimatedProjectsSection';
import SEOHelmet from '@/components/SEOHelmet';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const portfolioItems = [
    {
      id: 1,
      title: "Neural Depths",
      category: "VFX",
      type: "Short Film",
      year: "2024",
      description: "AI-driven underwater world creation with volumetric lighting and neural rendering.",
      image: "/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png",
      video: "/lovable-uploads/showreel-sample.mp4",
      tags: ["Neural Rendering", "Volumetric VFX", "AI Assistance"],
      awards: ["Best VFX - Digital Arts Festival 2024"],
      challenge: "Creating photorealistic underwater environments with complex lighting",
      solution: "Implemented AI-assisted neural rendering for dynamic light caustics",
      results: "40% faster rendering times with unprecedented realism"
    },
    {
      id: 2,
      title: "Quantum Horizons",
      category: "Compositing",
      type: "Commercial",
      year: "2024",
      description: "Complex multi-dimensional compositing for futuristic tech commercial.",
      image: "/lovable-uploads/4ea8b97d-d1e3-4753-a973-13cc19993e16.png",
      video: "/lovable-uploads/commercial-sample.mp4",
      tags: ["Multi-dimensional", "Tech Commercial", "Motion Graphics"],
      awards: ["Gold - Creative Excellence Awards"],
      challenge: "Seamlessly blending multiple reality layers",
      solution: "Advanced compositing with AI-enhanced edge detection",
      results: "Achieved impossible camera movements with perfect realism"
    },
    {
      id: 3,
      title: "Biomechanical Symphony",
      category: "3D",
      type: "Music Video",
      year: "2024",
      description: "Full 3D biomechanical creatures with procedural animation.",
      image: "/lovable-uploads/6f4b1c81-acc3-4ad7-b5bb-fc537f6f91eb.png",
      video: "/lovable-uploads/music-video-sample.mp4",
      tags: ["Procedural Animation", "Biomechanical", "Character Design"],
      awards: ["Best Animation - Music Video Awards"],
      challenge: "Creating lifelike biomechanical movements",
      solution: "ML-driven procedural animation with organic motion patterns",
      results: "Revolutionary character animation praised by industry leaders"
    },
    {
      id: 4,
      title: "Digital Souls",
      category: "Roto & Paint",
      type: "Feature Film",
      year: "2024",
      description: "Precise rotoscoping and digital makeup for supernatural thriller.",
      image: "/lovable-uploads/7aa001b2-00ae-4aed-9551-897de83da325.png",
      tags: ["Precision Roto", "Digital Makeup", "Supernatural"],
      challenge: "Frame-perfect rotoscoping for complex transformation sequences",
      solution: "AI-assisted edge detection with manual refinement",
      results: "Invisible VFX that seamlessly blended practical and digital"
    },
    {
      id: 5,
      title: "Ethereal Landscapes",
      category: "Matte Painting",
      type: "TV Series",
      year: "2024",
      description: "Expansive otherworldly environments for fantasy series.",
      image: "/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png",
      tags: ["Environment Design", "Fantasy", "Digital Painting"],
      challenge: "Creating believable alien landscapes with Earth-like appeal",
      solution: "Hybrid approach combining photography and digital painting",
      results: "Breathtaking environments that became series defining imagery"
    },
    {
      id: 6,
      title: "AI Vision",
      category: "AI-Assisted",
      type: "Tech Demo",
      year: "2024",
      description: "Showcasing AI capabilities in real-time VFX generation.",
      image: "/lovable-uploads/98a66a3b-d5b0-4b14-891c-e5ee0f6dcbc3.png",
      tags: ["Real-time AI", "Tech Demo", "Innovation"],
      challenge: "Demonstrating AI VFX capabilities in real-time",
      solution: "Custom neural networks trained on VFX datasets",
      results: "Industry-first real-time AI VFX generation platform"
    }
  ];

  const categories = ['all', 'VFX', 'Compositing', '3D', 'Roto & Paint', 'Matte Painting', 'AI-Assisted'];
  
  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Fuke's Media Portfolio & Showreel",
    "description": "Professional VFX portfolio showcasing AI-driven visual effects and creative excellence",
    "creator": {
      "@type": "Organization",
      "name": "Fuke's Media LLP"
    }
  };

  return (
    <>
      <SEOHelmet
        title="Portfolio & Showreel - Professional VFX Projects"
        description="Explore our professional portfolio of VFX, AI-assisted production, and creative projects. See why we're recognized as industry leaders in visual effects."
        keywords="VFX portfolio, showreel, professional projects, visual effects gallery, AI-driven VFX"
        canonical="https://fukes-media.com/portfolio"
        structuredData={structuredData}
      />

      <MainLayout pageKey="portfolio">
        {/* Featured Projects with Animations */}
        <AnimatedProjectsSection />
        
        <section className="py-20 px-4">
          <SectionTitle
            title="Technical Showcase & Archive"
            subtitle="Detailed breakdown of our technical expertise and production capabilities"
          />

          {/* Main Showreel Video */}
          <div className="container mx-auto mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative max-w-6xl mx-auto mb-16"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-card border-2 border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-6"
                  >
                    <Play className="h-8 w-8 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Fuke's Media - Official Showreel 2024
                  </h3>
                  <p className="text-white/80">60 seconds of pure visual excellence</p>
                </div>
              </div>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full max-w-4xl">
                <TabsList className="grid grid-cols-3 lg:grid-cols-7 w-full bg-card/50">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                    >
                      {category === 'all' ? 'All Projects' : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </motion.div>

            {/* Portfolio Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-primary/50">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="lg"
                          className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-4"
                        >
                          <Play className="h-6 w-6 ml-1" />
                        </Button>
                      </div>

                      {/* Awards badge */}
                      {item.awards && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            <Award className="h-3 w-3 mr-1" />
                            Award Winner
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-display font-bold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.type} • {item.year}</p>
                        </div>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {item.awards && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-accent mb-1">Awards:</p>
                          {item.awards.map((award, awardIndex) => (
                            <p key={awardIndex} className="text-xs text-muted-foreground">{award}</p>
                          ))}
                        </div>
                      )}

                      <div className="space-y-2 text-sm">
                        {item.challenge && (
                          <div>
                            <span className="font-medium text-primary">Challenge:</span>
                            <p className="text-muted-foreground">{item.challenge}</p>
                          </div>
                        )}
                        {item.solution && (
                          <div>
                            <span className="font-medium text-secondary">Solution:</span>
                            <p className="text-muted-foreground">{item.solution}</p>
                          </div>
                        )}
                        {item.results && (
                          <div>
                            <span className="font-medium text-accent">Results:</span>
                            <p className="text-muted-foreground">{item.results}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-16"
            >
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <h3 className="text-2xl font-display font-bold mb-4">Ready to Create Exceptional Content?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Let's collaborate to bring your vision to life with our professional team and cutting-edge AI technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Your Project
                  </Button>
                  <Button size="lg" variant="outline">
                    View Pricing
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Portfolio;