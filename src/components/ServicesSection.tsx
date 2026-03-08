import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scissors, Camera, Layers, Mountain, Eye, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';

const services = [
  { id: 'roto', name: 'Rotoscopy & Paint', description: 'Precise isolation. Edge integrity. Hair-level detail.', icon: Scissors, color: 'text-primary', features: ['Frame-accurate isolation', 'Edge refinement', 'Hair & fine detail', 'Paint & clean-up', 'Roto-prep for comp', 'Batch pipeline delivery'] },
  { id: 'matchmove', name: 'Matchmove & Body Tracking', description: 'Camera reconstruction, 3D tracking, CG integration.', icon: Camera, color: 'text-secondary', features: ['Camera solve & reconstruction', '3D object tracking', 'Body & face tracking', 'Survey data integration', 'Lens distortion solve', 'CG element alignment'] },
  { id: 'compositing', name: '3D Compositing', description: 'Physically accurate integration. Light matching. Depth realism.', icon: Layers, color: 'text-accent', features: ['Multi-pass rendering', 'Light & shadow matching', 'Depth integration', 'Atmospheric effects', 'Color consistency', 'Final pixel delivery'] },
  { id: 'matte', name: 'Matte Painting', description: 'Production-scale environments, not static wallpapers.', icon: Mountain, color: 'text-primary', features: ['Set extensions', 'Full CG environments', '2.5D projections', 'Sky replacements', 'Period & world building', 'Camera-ready assets'] },
  { id: 'previs', name: 'Previsualization', description: 'Shot planning to reduce on-set confusion and post chaos.', icon: Eye, color: 'text-secondary', features: ['Shot planning', 'Camera blocking', 'Action choreography', 'VFX shot design', 'Director communication', 'Budget forecasting'] },
  { id: 'ai', name: 'AI-Enhanced Workflow', description: 'Controlled AI usage integrated into production pipelines — not random automation.', icon: Cpu, color: 'text-accent', features: ['AI-assisted roto', 'Automated QC checks', 'Smart batch processing', 'Pipeline automation', 'Version control', 'Asset tracking systems'] },
];

const Tilt3DCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateX: (0.5 - y) * 20,
      rotateY: (x - 0.5) * 20,
      scale: 1.03,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.6, type: 'spring', stiffness: 80 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
      }}
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

  return (
    <SectionWrapper id="services" variant="gradient" withDivider>
      <SectionHeading
        title="Our Departments"
        subtitle="Structured execution across every VFX discipline — no vague deliverables"
        badge="What We Execute"
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => {
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
                {/* 3D Glare overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.08), transparent 60%, hsl(var(--accent) / 0.05))',
                  }}
                />

                {/* Depth shadow on hover */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl opacity-0 blur-xl -z-10"
                  animate={{ opacity: isHovered ? 0.15 : 0 }}
                  style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))' }}
                />

                <CardHeader className="relative z-10 pb-3" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-start mb-3">
                    <motion.div
                      className={`p-3 rounded-2xl bg-muted/50 ${service.color}`}
                      animate={isHovered ? { scale: 1.15, rotateY: 10, rotateZ: 5 } : { scale: 1, rotateY: 0, rotateZ: 0 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                  </div>
                  
                  <CardTitle className="text-lg md:text-xl font-display group-hover:text-secondary transition-colors">
                    {service.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                </CardHeader>

                <CardContent className="relative z-10 pt-0" style={{ transform: 'translateZ(20px)' }}>
                  <div className="space-y-1.5 mb-4">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0.7 }}
                        animate={isHovered ? { opacity: 1, x: 6 } : { opacity: 0.7, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${service.color} bg-current flex-shrink-0`} />
                        <span className="line-clamp-1">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <Link to={`/services#${service.id}`}>
                    <Button 
                      variant="ghost" 
                      className="group/btn w-full justify-between hover:bg-muted/50 rounded-xl text-sm"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
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
