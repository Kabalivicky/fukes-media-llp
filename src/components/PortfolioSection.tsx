
import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, ExternalLink } from 'lucide-react';
import FadeInOnScroll from '@/components/FadeInOnScroll';
import Interactive3DCard from './Interactive3DCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Updated portfolio projects with new images matching brand colors
const portfolioProjects = [
  {
    id: 1,
    title: 'Cinematic VFX Sequence',
    category: 'vfx',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1374&auto=format&fit=crop',
    description: 'Complex visual effects for a feature film including environment creation, character integration, and particle simulations.',
    details: 'This project involved creating a fully digital environment with realistic physics simulations for a major sci-fi feature film. Our team handled everything from pre-visualization to final compositing, working closely with the director to achieve their creative vision.',
    client: 'Major Film Studio',
    duration: '3 months'
  },
  {
    id: 2,
    title: 'AR Product Experience',
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=1470&auto=format&fit=crop',
    description: 'Augmented reality experience for product visualization with interactive elements and real-time lighting.',
    details: 'We developed a cutting-edge AR application allowing customers to visualize products in their own space with photorealistic rendering. The app features interactive elements, real-time lighting adjustments, and social sharing capabilities.',
    client: 'Consumer Technology Company',
    duration: '2 months'
  },
  {
    id: 3,
    title: 'Brand Identity Animation',
    category: 'creative',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1471&auto=format&fit=crop',
    description: 'Dynamic motion graphics package for brand identity featuring advanced animation techniques and visual storytelling.',
    details: 'We created a comprehensive motion graphics package that established a distinctive visual language for this emerging brand. The project included animated logos, transitions, lower thirds, and a complete style guide for future video content.',
    client: 'Startup Brand',
    duration: '1 month'
  },
  {
    id: 4,
    title: 'Film Color Grading',
    category: 'di',
    image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=1464&auto=format&fit=crop',
    description: 'Complete digital intermediate process for a feature film, including color grading, finishing, and deliverable creation.',
    details: 'Our team handled the entire DI process for this independent film. Working directly with the cinematographer, we developed a distinctive look that enhanced the storytelling while maintaining the natural beauty of the original footage.',
    client: 'Independent Filmmaker',
    duration: '6 weeks'
  },
  {
    id: 5,
    title: 'Virtual Production Setup',
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1470&auto=format&fit=crop',
    description: 'LED wall-based virtual production system with real-time rendering and camera tracking integration.',
    details: 'We designed and implemented a complete virtual production solution using LED walls and real-time rendering engines. The system allowed filmmakers to capture in-camera visual effects with authentic lighting and reflections, significantly reducing post-production time and costs.',
    client: 'Production Studio',
    duration: '4 months'
  },
  {
    id: 6,
    title: 'Character Animation',
    category: 'creative',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1632&auto=format&fit=crop',
    description: 'Full character design, rigging, and animation package for animated series featuring custom rigs and expressive movement.',
    details: 'This project involved creating a cast of characters for an animated streaming series. We handled everything from initial concept design through modeling, rigging, and animation, delivering assets ready for production use with highly optimized performance.',
    client: 'Streaming Platform',
    duration: '5 months'
  }
];

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'vfx', name: 'VFX' },
  { id: 'creative', name: 'Creative' },
  { id: 'di', name: 'Digital Intermediate' },
  { id: 'tech', name: 'Technology' }
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);
  
  const filteredProjects = activeCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);
  
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        <FadeInOnScroll>
          <SectionTitle 
            title="Our Portfolio" 
            subtitle="Explore our latest projects and creative achievements"
          />
        </FadeInOnScroll>
        
        <Tabs 
          defaultValue="all" 
          value={activeCategory} 
          onValueChange={setActiveCategory}
          className="w-full mt-12"
        >
          <FadeInOnScroll delay={200}>
            <TabsList className="grid w-full md:w-fit mx-auto grid-cols-2 md:grid-cols-5 gap-2 mb-10">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </FadeInOnScroll>
          
          <TabsContent value={activeCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <FadeInOnScroll key={project.id} delay={100 * index}>
                  <Interactive3DCard intensity={0.5} className="h-full">
                    <Card className="overflow-hidden border border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group h-full">
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="default" 
                                className="flex-1"
                                onClick={() => setSelectedProject(project)}
                              >
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              {selectedProject && (
                                <>
                                  <DialogHeader>
                                    <DialogTitle className="text-xl">{selectedProject.title}</DialogTitle>
                                    <DialogDescription>{selectedProject.description}</DialogDescription>
                                  </DialogHeader>
                                  <div className="mt-4">
                                    <img 
                                      src={selectedProject.image} 
                                      alt={selectedProject.title}
                                      className="w-full h-auto rounded-md mb-4"
                                    />
                                    <div className="space-y-4">
                                      <p>{selectedProject.details}</p>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-medium text-sm mb-1">Client</h4>
                                          <p className="text-muted-foreground">{selectedProject.client}</p>
                                        </div>
                                        <div>
                                          <h4 className="font-medium text-sm mb-1">Duration</h4>
                                          <p className="text-muted-foreground">{selectedProject.duration}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Button variant="outline" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                  </Interactive3DCard>
                </FadeInOnScroll>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found in this category.</p>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PortfolioSection;
