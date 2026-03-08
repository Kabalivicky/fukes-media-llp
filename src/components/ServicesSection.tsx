import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scissors, Camera, Layers, Mountain, Eye, Cpu, Film, Video, Music, PenTool, SunMedium, Globe, Wand2, Cloud, Clapperboard, Crown, Megaphone, Instagram, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';

const services = [
  { id: 'roto', name: 'Rotoscopy & Paint', description: 'Precise isolation. Edge integrity. Hair-level detail.', icon: Scissors, color: 'text-primary', category: 'CGI & VFX' },
  { id: 'matchmove', name: 'Matchmove & Tracking', description: 'Camera reconstruction, 3D tracking, CG integration.', icon: Camera, color: 'text-secondary', category: 'CGI & VFX' },
  { id: 'compositing', name: '3D Compositing', description: 'Light matching. Depth realism. Final pixel delivery.', icon: Layers, color: 'text-accent', category: 'CGI & VFX' },
  { id: 'matte', name: 'Matte Painting', description: 'Production-scale environments & set extensions.', icon: Mountain, color: 'text-primary', category: 'CGI & VFX' },
  { id: 'previs', name: 'Previsualization', description: 'Shot planning to reduce on-set confusion.', icon: Eye, color: 'text-secondary', category: 'CGI & VFX' },
  { id: 'concept-art', name: 'Concept Art & Design', description: 'Visual development & creative foundation.', icon: PenTool, color: 'text-accent', category: 'Creative' },
  { id: 'motion-graphics', name: 'Motion Graphics', description: 'Title sequences, broadcast packages, logo animations.', icon: Wand2, color: 'text-primary', category: 'Creative' },
  { id: 'storyboarding', name: 'Storyboarding', description: 'Frame-by-frame narrative planning.', icon: Clapperboard, color: 'text-secondary', category: 'Creative' },
  { id: 'film-editing', name: 'Film & TV Editing', description: 'Narrative editing, pacing, and story structure.', icon: Film, color: 'text-accent', category: 'Post' },
  { id: 'reel-editing', name: 'Reels & Promos', description: 'Showreels, trailers, teasers, social edits.', icon: Video, color: 'text-primary', category: 'Post' },
  { id: 'sound-design', name: 'Sound Design', description: 'SFX, foley, dialogue cleanup, final mix.', icon: Music, color: 'text-secondary', category: 'Post' },
  { id: 'color-grading', name: 'Color Grading', description: 'Scene matching, LUT creation, HDR grading.', icon: SunMedium, color: 'text-accent', category: 'DI' },
  { id: 'ai', name: 'AI-Enhanced Workflow', description: 'Controlled AI in production pipelines.', icon: Cpu, color: 'text-primary', category: 'Tech' },
  { id: 'virtual-production', name: 'Virtual Production', description: 'LED walls, real-time rendering, in-camera VFX.', icon: Globe, color: 'text-secondary', category: 'Tech' },
  { id: 'cloud-pipeline', name: 'Cloud Pipeline', description: 'Scalable rendering, remote collaboration.', icon: Cloud, color: 'text-accent', category: 'Tech' },
];

const categories = ['All', 'CGI & VFX', 'Creative', 'Post', 'DI', 'Tech'];

const Tilt3DCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({ rotateX: (0.5 - y) * 20, rotateY: (x - 0.5) * 20, scale: 1.03 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.6, type: 'spring', stiffness: 80 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
    >
      <motion.div
        animate={transform}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? services : services.filter(s => s.category === activeCategory);

  return (
    <SectionWrapper id="services" variant="gradient" withDivider>
      <SectionHeading
        title="Our Departments"
        subtitle="Structured execution across every discipline — VFX, editing, color, sound, and beyond"
        badge="What We Execute"
        align="center"
      />

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'default' : 'outline'}
            size="sm"
            className="rounded-full text-xs"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
        {filtered.map((service, index) => {
          const Icon = service.icon;
          const isHovered = hoveredIndex === index;

          return (
            <Tilt3DCard key={service.id} index={index}>
              <Card
                className="group relative h-full overflow-hidden rounded-2xl border-border/30 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-secondary/40"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.08), transparent 60%, hsl(var(--accent) / 0.05))' }}
                />

                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-0 blur-xl -z-10"
                  animate={{ opacity: isHovered ? 0.15 : 0 }}
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))' }}
                />

                <CardHeader className="relative z-10 pb-2" style={{ transform: 'translateZ(30px)' }}>
                  <motion.div
                    className={`p-2.5 rounded-xl bg-muted/50 ${service.color} w-fit`}
                    animate={isHovered ? { scale: 1.15, rotateY: 10 } : { scale: 1, rotateY: 0 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-base font-display group-hover:text-secondary transition-colors mt-2">
                    {service.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{service.description}</p>
                </CardHeader>

                <CardContent className="relative z-10 pt-0" style={{ transform: 'translateZ(20px)' }}>
                  <Link to={`/services#${service.id}`}>
                    <Button
                      variant="ghost"
                      className="group/btn w-full justify-between hover:bg-muted/50 rounded-xl text-xs"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Tilt3DCard>
          );
        })}
      </div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/services">
          <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
            <Button size="lg" className="gradient-button group text-base px-10 rounded-full">
              <span>Full Service Breakdown</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </SectionWrapper>
  );
};

export default ServicesSection;
