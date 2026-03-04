import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Film, Palette, MonitorPlay, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';

const services = [
  {
    id: 'vfx',
    name: 'CGI & VFX Solutions',
    description: '2D & 3D Compositing, Rotoscoping & Clean-up, Digital Matte Painting, 3D Modeling & Animation, Simulation & FX, Match Move & Tracking',
    icon: Film,
    color: 'text-primary',
    glowClass: 'shadow-glow-red',
    features: ['2D & 3D Compositing', 'Rotoscoping & Clean-up', 'Digital Matte Painting', '3D Modeling & Animation', 'Simulation & FX', 'Match Move & Tracking'],
  },
  {
    id: 'creative',
    name: 'Creative Services',
    description: 'Graphic Design, Logo Design, Poster Design, Motion Posters, MGFX, Lyrical Video, Video Editing, Title Sequence Design, Motion Graphics, Podcast, Digital Marketing',
    icon: Palette,
    color: 'text-secondary',
    glowClass: 'shadow-glow-blue',
    features: ['Graphic & Logo Design', 'Motion Posters & MGFX', 'Video Editing', 'Title Sequence Design', 'Motion Graphics', 'Digital Marketing'],
  },
  {
    id: 'di',
    name: 'Digital Intermediate DI',
    description: 'Basic & Advanced Colour Grading, HDR Grading, Look Development, VFX Supervision during DI, Final Delivery Masters, Quality Control',
    icon: MonitorPlay,
    color: 'text-accent',
    glowClass: 'shadow-glow-green',
    features: ['Basic & Advanced Colour Grading', 'HDR Grading', 'Look Development', 'VFX Supervision during DI', 'Final Delivery Masters', 'Quality Control'],
  },
  {
    id: 'tech',
    name: 'Tech Innovation',
    description: 'AI-Assisted Workflows, Custom Pipeline Development, Automation Solutions, Cloud Rendering, Real-time Collaboration Tools, Asset Management Systems',
    icon: Cpu,
    color: 'text-secondary',
    glowClass: 'shadow-glow-blue',
    features: ['AI-Assisted Workflows', 'Custom Pipeline Development', 'Automation Solutions', 'Cloud Rendering', 'Real-time Collaboration', 'Asset Management Systems'],
  },
];

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="services" variant="gradient" withDivider>
      <SectionHeading
        title="Our Expertise"
        subtitle="From concept to final render, we deliver world-class visual storytelling"
        badge="What We Do"
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
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
                delay: index * 0.1, 
                duration: 0.5,
                type: 'spring',
                stiffness: 100,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className={`group relative h-full overflow-hidden rounded-2xl border-border/30 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-secondary/40 hover:-translate-y-2 ${isHovered ? service.glowClass : ''}`}>
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.05), hsl(var(--accent) / 0.03), transparent)'
                  }}
                />

                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`p-3.5 rounded-2xl bg-muted/50 ${service.color}`}
                      animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                  </div>
                  
                  <CardTitle className="text-xl md:text-2xl font-display group-hover:text-secondary transition-colors">
                    {service.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 pt-0">
                  {/* Features grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
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
                      className="group/btn w-full justify-between hover:bg-muted/50 rounded-xl"
                    >
                      <span>Learn More</span>
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
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/services">
          <Button size="lg" className="gradient-button group text-base px-10 rounded-full">
            <span>Explore All Services</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </SectionWrapper>
  );
};

export default ServicesSection;
