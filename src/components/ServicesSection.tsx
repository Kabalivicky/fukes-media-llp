import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scissors, Camera, Layers, Mountain, Eye, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';

const services = [
  {
    id: 'roto',
    name: 'Rotoscopy & Paint',
    description: 'Precise isolation. Edge integrity. Hair-level detail.',
    icon: Scissors,
    color: 'text-primary',
    glowClass: 'shadow-glow-red',
    features: ['Frame-accurate isolation', 'Edge refinement', 'Hair & fine detail', 'Paint & clean-up', 'Roto-prep for comp', 'Batch pipeline delivery'],
  },
  {
    id: 'matchmove',
    name: 'Matchmove & Body Tracking',
    description: 'Camera reconstruction, 3D tracking, CG integration.',
    icon: Camera,
    color: 'text-secondary',
    glowClass: 'shadow-glow-blue',
    features: ['Camera solve & reconstruction', '3D object tracking', 'Body & face tracking', 'Survey data integration', 'Lens distortion solve', 'CG element alignment'],
  },
  {
    id: 'compositing',
    name: '3D Compositing',
    description: 'Physically accurate integration. Light matching. Depth realism.',
    icon: Layers,
    color: 'text-accent',
    glowClass: 'shadow-glow-green',
    features: ['Multi-pass rendering', 'Light & shadow matching', 'Depth integration', 'Atmospheric effects', 'Color consistency', 'Final pixel delivery'],
  },
  {
    id: 'matte',
    name: 'Matte Painting',
    description: 'Production-scale environments, not static wallpapers.',
    icon: Mountain,
    color: 'text-primary',
    glowClass: 'shadow-glow-red',
    features: ['Set extensions', 'Full CG environments', '2.5D projections', 'Sky replacements', 'Period & world building', 'Camera-ready assets'],
  },
  {
    id: 'previs',
    name: 'Previsualization',
    description: 'Shot planning to reduce on-set confusion and post chaos.',
    icon: Eye,
    color: 'text-secondary',
    glowClass: 'shadow-glow-blue',
    features: ['Shot planning', 'Camera blocking', 'Action choreography', 'VFX shot design', 'Director communication', 'Budget forecasting'],
  },
  {
    id: 'ai',
    name: 'AI-Enhanced Workflow',
    description: 'Controlled AI usage integrated into production pipelines — not random automation.',
    icon: Cpu,
    color: 'text-accent',
    glowClass: 'shadow-glow-green',
    features: ['AI-assisted roto', 'Automated QC checks', 'Smart batch processing', 'Pipeline automation', 'Version control', 'Asset tracking systems'],
  },
];

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
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                delay: index * 0.08, 
                duration: 0.5,
                type: 'spring',
                stiffness: 100,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className={`group relative h-full overflow-hidden rounded-2xl border-border/30 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-secondary/40 hover:-translate-y-2 ${isHovered ? service.glowClass : ''}`}>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.05), hsl(var(--accent) / 0.03), transparent)'
                  }}
                />

                <CardHeader className="relative z-10 pb-3">
                  <div className="flex items-start mb-3">
                    <motion.div
                      className={`p-3 rounded-2xl bg-muted/50 ${service.color}`}
                      animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                  </div>
                  
                  <CardTitle className="text-lg md:text-xl font-display group-hover:text-secondary transition-colors">
                    {service.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                </CardHeader>

                <CardContent className="relative z-10 pt-0">
                  <div className="space-y-1.5 mb-4">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0.7 }}
                        animate={isHovered ? { opacity: 1, x: 4 } : { opacity: 0.7, x: 0 }}
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
            </motion.div>
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
          <Button size="lg" className="gradient-button group text-base px-10 rounded-full">
            <span>Full Service Breakdown</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </SectionWrapper>
  );
};

export default ServicesSection;
