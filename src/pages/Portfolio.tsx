import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Play, Award, Sparkles, ArrowRight } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import LiquidReveal from '@/components/LiquidReveal';
import { AnimatedLetters, GradientText, AnimatedWords } from '@/components/KineticText';
import SEOHelmet from '@/components/SEOHelmet';
import { Link } from 'react-router-dom';
import showreelThumbnail from '@/assets/projects/kalki-2898-ad.png';

const SHOWREEL_EMBED_URL = "https://drive.google.com/file/d/1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk/preview";
const SHOWREEL_VIEW_URL = "https://drive.google.com/file/d/1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk/view";

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
    "description": "Award-winning VFX portfolio showcasing AI-driven visual effects and creative excellence",
    "creator": {
      "@type": "Organization",
      "name": "Fuke's Media LLP"
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="Portfolio & Showreel - Award-Winning VFX Projects"
        description="Explore our award-winning portfolio of VFX, AI-assisted production, and creative projects. See why we're recognized as industry leaders in visual effects."
        keywords="VFX portfolio, showreel, award-winning projects, visual effects gallery, AI-driven VFX"
        canonical="https://fukes-media.com/portfolio"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-secondary/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Award-Winning Work
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <AnimatedLetters className="block" delay={0.2}>Our</AnimatedLetters>
            <span className="block mt-2">
              <GradientText>Portfolio</GradientText>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <AnimatedWords
              className="text-xl text-muted-foreground"
              delay={1}
            >
              Detailed breakdown of our technical expertise and production capabilities
            </AnimatedWords>
          </motion.div>
        </div>
      </section>

      {/* Showreel Section */}
      <SectionWrapper variant="dark">
        <LiquidReveal direction="up">
          <div 
            className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden bg-card border-2 border-primary/20 cursor-pointer group shadow-2xl"
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
              <motion.div
                className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-8"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-12 w-12 ml-1" />
              </motion.div>
            </div>
            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="text-3xl font-display font-bold text-white mb-2 drop-shadow-lg">
                Fuke's Media - Official Showreel 2024
              </h3>
              <p className="text-white/90 drop-shadow-md">Click to watch our showreel</p>
            </div>
            {/* Award Badge */}
            <div className="absolute top-6 right-6">
              <Badge className="bg-accent text-accent-foreground shadow-lg">
                <Award className="w-4 h-4 mr-1" />
                Award Winning
              </Badge>
            </div>
          </div>
        </LiquidReveal>

        {/* Video Modal */}
        <Dialog open={isPlaying} onOpenChange={setIsPlaying}>
          <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black border-none">
            <DialogTitle className="sr-only">Fuke's Media Official Showreel 2024</DialogTitle>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={SHOWREEL_EMBED_URL}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Fuke's Media Official Showreel 2024"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <a 
                  href={SHOWREEL_VIEW_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white text-sm underline"
                >
                  Video not loading? Click here to watch on Google Drive
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SectionWrapper>

      {/* Portfolio Grid */}
      <SectionWrapper withDivider>
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full max-w-4xl">
            <TabsList className="grid grid-cols-3 lg:grid-cols-7 w-full bg-card/50 border border-border/30">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all duration-300"
                >
                  {category === 'all' ? 'All Projects' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-primary/50">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.div
                        className="bg-primary/90 rounded-full p-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play className="h-8 w-8 text-primary-foreground ml-1" />
                      </motion.div>
                    </div>

                    {/* Awards badge */}
                    {item.awards && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-accent text-accent-foreground shadow-lg">
                          <Award className="h-3 w-3 mr-1" />
                          Award Winner
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-display font-bold mb-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.type} • {item.year}</p>
                      </div>
                      <Badge variant="outline" className="bg-background/50">{item.category}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs bg-secondary/10">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {item.results && (
                      <div className="pt-4 border-t border-border/30">
                        <p className="text-sm">
                          <span className="font-medium text-accent">Results: </span>
                          <span className="text-muted-foreground">{item.results}</span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper variant="gradient" withDivider>
        <div className="max-w-3xl mx-auto text-center">
          <LiquidReveal direction="up">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Create <GradientText>Award-Winning Content</GradientText>?
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Let's collaborate to bring your vision to life with our award-winning team and cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 group">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </LiquidReveal>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Portfolio;
