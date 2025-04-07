
import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Sample portfolio projects
const portfolioProjects = [
  {
    id: 1,
    title: 'Cinematic VFX Sequence',
    category: 'vfx',
    image: '/lovable-uploads/f94709cf-c63e-43f7-a4fb-62a54bb7e25d.png',
    description: 'Complex visual effects for a feature film including environment creation, character integration, and particle simulations.',
  },
  {
    id: 2,
    title: 'AR Product Experience',
    category: 'tech',
    image: '/lovable-uploads/720a1b4f-995d-4e7c-ab53-cbcb0a2ef9f4.png',
    description: 'Augmented reality experience for product visualization with interactive elements and real-time lighting.',
  },
  {
    id: 3,
    title: 'Brand Identity Animation',
    category: 'creative',
    image: '/lovable-uploads/8b48eccf-03e8-4ce8-a718-45510fdf1b3a.png',
    description: 'Dynamic motion graphics package for brand identity featuring advanced animation techniques and visual storytelling.',
  },
  {
    id: 4,
    title: 'Film Color Grading',
    category: 'di',
    image: '/lovable-uploads/c3e0fc2f-0ae1-496c-8080-866adbd191ee.png',
    description: 'Complete digital intermediate process for a feature film, including color grading, finishing, and deliverable creation.',
  },
  {
    id: 5,
    title: 'Virtual Production Setup',
    category: 'tech',
    image: '/lovable-uploads/f960e5fd-76d0-443b-aac2-38d463aedb20.png',
    description: 'LED wall-based virtual production system with real-time rendering and camera tracking integration.',
  },
  {
    id: 6,
    title: 'Character Animation',
    category: 'creative',
    image: '/lovable-uploads/9a2e5c45-aeb7-45ad-b39b-514912f1f206.png',
    description: 'Full character design, rigging, and animation package for animated series featuring custom rigs and expressive movement.',
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
  
  const filteredProjects = activeCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);
  
  return (
    <section id="portfolio" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Portfolio" 
          subtitle="Explore our latest projects and creative achievements"
        />
        
        <Tabs 
          defaultValue="all" 
          value={activeCategory} 
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="grid w-full md:w-fit mx-auto grid-cols-2 md:grid-cols-5 gap-2">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <Card key={project.id} className="overflow-hidden border border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <Button variant="default" className="w-full gradient-button">
                          View Project <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found in this category.</p>
              </div>
            )}
            
            <div className="mt-10 text-center">
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
