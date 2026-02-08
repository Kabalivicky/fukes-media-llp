import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';
import OptimizedImage from './OptimizedImage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import actual project images
import jailer from '@/assets/projects/jailer-new.jpg';
import kalki from '@/assets/projects/kalki-2898-ad-new.png';
import jawan from '@/assets/projects/jawan-new.png';
import leo from '@/assets/projects/leo-new.jpg';
import kgf from '@/assets/projects/kgf-chapter-2-new.jpg';
import indian2 from '@/assets/projects/indian-2-new.png';

// Portfolio projects with actual Fuke's Media work
const portfolioProjects = [
  {
    id: 1,
    title: 'Jailer',
    category: 'vfx',
    image: jailer,
    description: 'High-end VFX compositing, environment creation and CG integration for the blockbuster action film.',
    details: 'Complex visual effects sequences including environment extensions, CG elements, and seamless compositing for Jailer.',
    client: 'Sun Pictures',
    duration: '4 months',
    year: '2023',
  },
  {
    id: 2,
    title: 'Kalki 2898 AD',
    category: 'vfx',
    image: kalki,
    description: 'Futuristic sci-fi VFX including environment creation, particle simulations and CG character integration.',
    details: 'Our team delivered cutting-edge visual effects for Kalki 2898 AD, creating immersive futuristic environments and CG elements.',
    client: 'Vyjayanthi Movies',
    duration: '6 months',
    year: '2024',
  },
  {
    id: 3,
    title: 'Jawan',
    category: 'vfx',
    image: jawan,
    description: 'Action-packed VFX sequences with complex compositing, wire removal and environment extensions.',
    details: 'We handled multiple VFX-heavy sequences for Jawan, delivering photorealistic effects and seamless integration.',
    client: 'Red Chillies Entertainment',
    duration: '5 months',
    year: '2023',
  },
  {
    id: 4,
    title: 'Leo',
    category: 'vfx',
    image: leo,
    description: 'VFX compositing, color grading and digital intermediate for the action thriller.',
    details: 'Comprehensive post-production work including VFX and DI for Leo, ensuring cinematic quality throughout.',
    client: 'Seven Screen Studio',
    duration: '3 months',
    year: '2023',
  },
  {
    id: 5,
    title: 'KGF Chapter 2',
    category: 'vfx',
    image: kgf,
    description: 'Massive-scale VFX work including environment creation, crowd simulation and destruction effects.',
    details: 'Our team contributed to the epic scale of KGF Chapter 2 with large-scale environment extensions and destruction simulations.',
    client: 'Hombale Films',
    duration: '6 months',
    year: '2022',
  },
  {
    id: 6,
    title: 'Indian 2',
    category: 'di',
    image: indian2,
    description: 'Complete digital intermediate, color grading and VFX integration for the sequel.',
    details: 'Full DI pipeline including color grading, conforming and final delivery alongside VFX compositing work.',
    client: 'Lyca Productions',
    duration: '4 months',
    year: '2024',
  },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'vfx', name: 'VFX' },
  { id: 'creative', name: 'Creative' },
  { id: 'di', name: 'DI' },
  { id: 'tech', name: 'Tech' },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const filteredProjects = activeCategory === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeCategory);

  return (
    <SectionWrapper id="portfolio" variant="dark" withDivider>
      <SectionHeading
        title="Our Portfolio"
        subtitle="Explore our latest projects and creative achievements"
        badge="Featured Work"
        align="center"
      />

      {/* Category Filter - Pill Style */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full px-6 transition-all duration-300 ${
              activeCategory === category.id 
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                : 'hover:bg-muted'
            }`}
          >
            {category.name}
          </Button>
        ))}
      </motion.div>

      {/* Portfolio Grid with AnimatePresence */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                layout: { type: 'spring', stiffness: 300, damping: 30 },
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <TiltCard tiltIntensity={10} glareEnabled scaleOnHover={1.02}>
                <Card className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm h-full">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <OptimizedImage 
                      src={project.image} 
                      alt={project.title}
                      placeholder="shimmer"
                      aspectRatio="4/3"
                      hoverScale={hoveredId === project.id ? 1.1 : 1}
                    />
                    
                    {/* Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: hoveredId === project.id ? 0.9 : 0.3 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Year Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                      {project.year}
                    </div>

                    {/* Hover Content */}
                    <motion.div 
                      className="absolute inset-0 flex flex-col justify-end p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredId === project.id ? 1 : 0,
                        y: hoveredId === project.id ? 0 : 20,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="default"
                            className="w-full group/btn"
                            onClick={() => setSelectedProject(project)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Project
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
                          {selectedProject && (
                            <>
                              <div className="relative aspect-video">
                                <OptimizedImage 
                                  src={selectedProject.image} 
                                  alt={selectedProject.title}
                                  aspectRatio="16/9"
                                  priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                              </div>
                              <div className="p-6 -mt-16 relative z-10">
                                <DialogHeader>
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium uppercase">
                                      {selectedProject.category}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {selectedProject.year}
                                    </span>
                                  </div>
                                  <DialogTitle className="text-2xl font-display">
                                    {selectedProject.title}
                                  </DialogTitle>
                                  <DialogDescription className="text-base">
                                    {selectedProject.description}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="mt-6 space-y-4">
                                  <p className="text-muted-foreground">{selectedProject.details}</p>
                                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                    <div>
                                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Client</h4>
                                      <p className="font-medium">{selectedProject.client}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Duration</h4>
                                      <p className="font-medium">{selectedProject.duration}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-muted-foreground">No projects found in this category.</p>
        </motion.div>
      )}

      {/* View All CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/portfolio">
          <Button size="lg" variant="outline" className="group text-lg px-10 rounded-full">
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </SectionWrapper>
  );
};

export default PortfolioSection;
