import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Sparkles, Film, Palette, Layers, Code, Lightbulb, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';

const Services = () => {
  const services = [
    { id: "vfx", title: "CGI & VFX Solutions", description: "Full-spectrum visual effects from concept to final delivery", icon: Film, features: ["2D & 3D Compositing", "Rotoscoping & Clean-up", "Digital Matte Painting", "3D Modeling & Animation", "Simulation & FX", "Match Move & Tracking"], gradient: "from-brand-red to-brand-blue" },
    { id: "creative", title: "Creative Services", description: "Artistic solutions to elevate your visual storytelling", icon: Palette, features: ["Graphic & Logo Design", "Poster & Motion Posters", "Lyrical Video Creation", "Video Editing", "Title Sequence Design", "Motion Graphics & MGFX"], gradient: "from-brand-blue to-brand-green" },
    { id: "di", title: "Digital Intermediate", description: "Professional color grading and finishing services", icon: Layers, features: ["Basic & Advanced Color Grading", "HDR Grading", "Look Development", "VFX Supervision during DI", "Final Delivery Masters", "Quality Control"], gradient: "from-brand-green to-brand-red" },
    { id: "tech", title: "Tech Innovation", description: "Cutting-edge technology for content creation", icon: Code, features: ["AI-Assisted Workflows", "Custom Pipeline Development", "Automation Solutions", "Cloud Rendering", "Real-time Collaboration Tools", "Asset Management Systems"], gradient: "from-brand-red to-brand-green" },
  ];

  const processSteps = [
    { step: "01", title: "Consultation & Brief", description: "We start by understanding your project needs, creative vision, and technical requirements.", icon: Lightbulb },
    { step: "02", title: "Planning & Estimation", description: "Our team creates a customized production plan with transparent pricing.", icon: ArrowRight },
    { step: "03", title: "Production & Iteration", description: "Our artists bring your vision to life with regular updates and feedback.", icon: Sparkles },
    { step: "04", title: "Delivery & Support", description: "We deliver final assets in your required formats with ongoing support.", icon: Check },
  ];

  const structuredData = {
    "@context": "https://schema.org", "@type": "Service", "serviceType": "VFX and Creative Services",
    "provider": { "@type": "Organization", "name": "Fuke's Media LLP", "url": "https://fukesmedia.com" },
    "areaServed": "Worldwide",
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet title="Services | Fuke's Media - AI-Driven VFX & Creative Studio" description="Explore our comprehensive range of VFX, creative, digital intermediate, and technology innovation services." keywords="VFX services, visual effects, creative services, digital intermediate" structuredData={structuredData} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[100px]" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px]" animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-6 px-5 py-2.5 bg-surface-elevated border-border/50 text-foreground rounded-full">
              <Sparkles className="w-4 h-4 mr-2 text-brand-red" />AI-Enhanced Solutions
            </Badge>
          </motion.div>
          <motion.h1 className="font-display text-5xl md:text-7xl font-bold mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Comprehensive creative solutions powered by AI and human expertise
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <SectionWrapper withDivider>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <Card className="group hover:shadow-2xl hover:shadow-brand-red/5 transition-all duration-500 hover:-translate-y-2 border-border/30 bg-surface-elevated/50 backdrop-blur-sm rounded-3xl overflow-hidden h-full">
                <div className={`h-1 w-full bg-gradient-to-r ${service.gradient}`} />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${service.gradient} group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-display">{service.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-surface-elevated/50 rounded-full border-border/30">
                      <Zap className="w-3 h-3 mr-1" />AI
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-2">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <motion.div key={i} className="flex items-start" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                        <Check className="h-5 w-5 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full rounded-full bg-gradient-to-r from-brand-red to-brand-blue text-white border-0 group/btn">
                    <Link to="/pricing">View Pricing <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper variant="gradient" withDivider>
        <SectionHeading title="Our Process" subtitle="How we bring your vision to life" badge="Workflow" />
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-0 bottom-0 left-8 md:left-[calc(4rem-1px)] w-0.5 bg-gradient-to-b from-brand-red via-brand-blue to-brand-green" />
          {processSteps.map((phase, index) => (
            <motion.div key={phase.step} className="flex mb-12 last:mb-0" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
              <div className="mr-8 relative">
                <motion.div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-red to-brand-blue flex items-center justify-center text-white font-bold text-lg relative z-10" whileHover={{ scale: 1.1 }}>
                  {phase.step}
                </motion.div>
              </div>
              <Card className="flex-1 border-border/30 bg-surface-elevated/50 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-bold mb-2 flex items-center">
                    <phase.icon className="w-5 h-5 mr-2 text-brand-red" />{phase.title}
                  </h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="dark">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 className="font-display text-4xl md:text-5xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Ready to <span className="gradient-text">Get Started</span>?
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Let's discuss your project and create something extraordinary together.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-red to-brand-blue text-white text-lg px-8 border-0 shadow-lg">
              <Link to="/contact">Start Your Project <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 border-border/50">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Services;
