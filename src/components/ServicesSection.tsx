import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Palette, MonitorPlay, Code, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import SectionWrapper from './SectionWrapper';
import LiquidReveal, { StaggerReveal } from './LiquidReveal';
import TiltCard from './TiltCard';

const services = [
  {
    id: 'vfx',
    name: 'VFX Solutions',
    shortName: 'VFX',
    description: 'From basic compositing to complex 3D integration, delivering high-quality visual effects for film, TV, and digital content.',
    icon: Video,
    color: 'text-primary',
    bgGlow: 'from-primary/20',
    features: ['3D Modeling & Animation', 'Compositing & Rotoscoping', 'Motion Graphics', 'Particle Simulations'],
    stat: '500+',
    statLabel: 'VFX Shots Delivered',
  },
  {
    id: 'creative',
    name: 'Creative Services',
    shortName: 'Creative',
    description: 'Our creative team brings your vision to life with cutting-edge design, animation, and conceptual development.',
    icon: Palette,
    color: 'text-secondary',
    bgGlow: 'from-secondary/20',
    features: ['Art Direction', 'Character Design', 'Storyboarding', 'Brand Identity'],
    stat: '200+',
    statLabel: 'Creative Projects',
  },
  {
    id: 'di',
    name: 'Digital Intermediate',
    shortName: 'DI',
    description: 'Complete end-to-end DI solutions including color grading, conforming, mastering and delivery for all formats.',
    icon: MonitorPlay,
    color: 'text-accent',
    bgGlow: 'from-accent/20',
    features: ['Color Grading', 'HDR Mastering', 'Film Restoration', 'Final Delivery'],
    stat: '150+',
    statLabel: 'Films Graded',
  },
  {
    id: 'tech',
    name: 'Tech Innovation',
    shortName: 'Tech',
    description: 'Cutting-edge technology solutions and AI integration to enhance creative workflows and production efficiency.',
    icon: Code,
    color: 'text-primary',
    bgGlow: 'from-primary/20',
    features: ['AI Pipeline Dev', 'Virtual Production', 'Custom Tools', 'Automation'],
    stat: '50+',
    statLabel: 'Custom Tools Built',
  },
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="services" variant="gradient" withDivider>
      <SectionHeading
        title="Our Services"
        subtitle="Comprehensive solutions powered by AI and creative excellence"
        badge="What We Do"
        align="center"
      />

      {/* Service Grid - Award-winning hover effects */}
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
              <TiltCard tiltIntensity={8} glareEnabled={true} scaleOnHover={1.02}>
                <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50">
                  {/* Background glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-radial ${service.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ transformOrigin: 'center' }}
                  />
                  
                  {/* Animated border gradient on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`p-3 rounded-xl bg-muted/50 ${service.color}`}
                        animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Icon className="w-8 h-8" />
                      </motion.div>
                      
                      {/* Stat badge */}
                      <div className="text-right">
                        <div className="text-2xl font-bold font-display">{service.stat}</div>
                        <div className="text-xs text-muted-foreground">{service.statLabel}</div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl md:text-2xl font-display group-hover:text-primary transition-colors">
                      {service.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features with stagger animation */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Sparkles className={`w-3 h-3 ${service.color}`} />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link to={`/services#${service.id}`}>
                      <Button 
                        variant="ghost" 
                        className="group/btn w-full justify-between hover:bg-muted/50"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/services">
          <Button size="lg" variant="cta" className="group text-lg px-10">
            <span>Explore All Services</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </SectionWrapper>
  );
};

export default ServicesSection;
