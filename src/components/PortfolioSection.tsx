import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';
import OptimizedImage from './OptimizedImage';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

import jailer from '@/assets/projects/jailer-new.jpg';
import kalki from '@/assets/projects/kalki-2898-ad-new.png';
import jawan from '@/assets/projects/jawan-new.png';
import leo from '@/assets/projects/leo-new.jpg';
import kgf from '@/assets/projects/kgf-chapter-2-new.jpg';
import indian2 from '@/assets/projects/indian-2-new.png';

const portfolioProjects = [
  { id: 1, title: 'Jailer', category: 'vfx', image: jailer, description: 'High-end VFX compositing, environment creation and CG integration for the blockbuster action film.', details: 'Complex visual effects sequences including environment extensions, CG elements, and seamless compositing for Jailer.', client: 'Sun Pictures', duration: '4 months', year: '2023' },
  { id: 2, title: 'Kalki 2898 AD', category: 'vfx', image: kalki, description: 'Futuristic sci-fi VFX including environment creation, particle simulations and CG character integration.', details: 'Our team delivered cutting-edge visual effects for Kalki 2898 AD, creating immersive futuristic environments and CG elements.', client: 'Vyjayanthi Movies', duration: '6 months', year: '2024' },
  { id: 3, title: 'Jawan', category: 'vfx', image: jawan, description: 'Action-packed VFX sequences with complex compositing, wire removal and environment extensions.', details: 'We handled multiple VFX-heavy sequences for Jawan, delivering photorealistic effects and seamless integration.', client: 'Red Chillies Entertainment', duration: '5 months', year: '2023' },
  { id: 4, title: 'Leo', category: 'vfx', image: leo, description: 'VFX compositing, color grading and digital intermediate for the action thriller.', details: 'Comprehensive post-production work including VFX and DI for Leo, ensuring cinematic quality throughout.', client: 'Seven Screen Studio', duration: '3 months', year: '2023' },
  { id: 5, title: 'KGF Chapter 2', category: 'vfx', image: kgf, description: 'Massive-scale VFX work including environment creation, crowd simulation and destruction effects.', details: 'Our team contributed to the epic scale of KGF Chapter 2 with large-scale environment extensions and destruction simulations.', client: 'Hombale Films', duration: '6 months', year: '2022' },
  { id: 6, title: 'Indian 2', category: 'di', image: indian2, description: 'Complete digital intermediate, color grading and VFX integration for the sequel.', details: 'Full DI pipeline including color grading, conforming and final delivery alongside VFX compositing work.', client: 'Lyca Productions', duration: '4 months', year: '2024' },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'vfx', name: 'VFX' },
  { id: 'creative', name: 'Creative' },
  { id: 'di', name: 'DI' },
  { id: 'tech', name: 'Tech' },
];

const Portfolio3DCard = ({ project, index }: { project: typeof portfolioProjects[0]; index: number }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rotateX: (0.5 - y) * 15, rotateY: (x - 0.5) * 15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, rotateY: -10 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.85, rotateY: 10 }}
      transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 80 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ perspective: '800px' }}
    >
      <motion.div
        animate={{ ...tilt, scale: isHovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Card className="group relative overflow-hidden border-border/30 bg-card/30 backdrop-blur-sm h-full rounded-3xl transition-all duration-500">
          {/* 3D depth shadow */}
          <motion.div
            className="absolute -inset-2 rounded-3xl -z-10 blur-2xl"
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5), hsl(var(--accent) / 0.3))' }}
          />

          <div className="relative aspect-[2/3] overflow-hidden rounded-t-3xl" style={{ transform: 'translateZ(10px)' }}>
            <OptimizedImage src={project.image} alt={project.title} placeholder="shimmer" aspectRatio="2/3" hoverScale={isHovered ? 1.08 : 1} />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: isHovered ? 0.85 : 0.3 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm text-xs font-medium border border-border/30" style={{ transform: 'translateZ(30px)' }}>
              {project.year}
            </div>
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              style={{ transform: 'translateZ(40px)' }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0" onClick={() => setSelectedProject(project)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden rounded-3xl border-border/30">
                  {selectedProject && (
                    <>
                      <div className="relative aspect-video">
                        <OptimizedImage src={selectedProject.image} alt={selectedProject.title} aspectRatio="16/9" priority />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      </div>
                      <div className="p-6 -mt-16 relative z-10">
                        <DialogHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium uppercase">{selectedProject.category}</span>
                            <span className="text-xs text-muted-foreground">{selectedProject.year}</span>
                          </div>
                          <DialogTitle className="text-2xl font-display">{selectedProject.title}</DialogTitle>
                          <DialogDescription className="text-base">{selectedProject.description}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-6 space-y-4">
                          <p className="text-muted-foreground">{selectedProject.details}</p>
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                            <div><h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Client</h4><p className="font-medium">{selectedProject.client}</p></div>
                            <div><h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Duration</h4><p className="font-medium">{selectedProject.duration}</p></div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
          <CardContent className="p-6" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium uppercase tracking-wider border border-border/30">{project.category}</span>
            </div>
            <h3 className="text-lg font-display font-bold mb-2 group-hover:text-secondary transition-colors">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeCategory);

  return (
    <SectionWrapper id="portfolio" variant="dark" withDivider>
      <SectionHeading title="Our Portfolio" subtitle="Explore our latest projects and creative achievements" badge="Featured Work" align="center" />

      <motion.div className="flex flex-wrap justify-center gap-2 mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        {categories.map((cat) => (
          <motion.div key={cat.id} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg border-0'
                  : 'border-border/50 hover:bg-muted'
              }`}
            >
              {cat.name}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" layout>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <Portfolio3DCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-muted-foreground">No projects found in this category.</p>
        </motion.div>
      )}

      <motion.div className="text-center mt-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        <Link to="/portfolio">
          <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
            <Button size="lg" variant="outline" className="group text-lg px-10 rounded-full border-border/50 hover:bg-muted">
              <span>View All Projects</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </SectionWrapper>
  );
};

export default PortfolioSection;
