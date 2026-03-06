import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Scissors, Camera, Layers, Mountain, Eye, Cpu, FileText, Shield, Clock, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';

const Services = () => {
  const services = [
    { id: "roto", title: "Rotoscopy & Paint", description: "Precise isolation. Edge integrity. Hair-level detail.", icon: Scissors, features: ["Frame-accurate isolation", "Edge refinement & cleanup", "Hair & fine detail work", "Paint & wire removal", "Roto-prep for compositing", "Batch pipeline delivery"], gradient: "from-brand-red to-brand-blue" },
    { id: "matchmove", title: "Matchmove & Body Tracking", description: "Camera reconstruction, 3D tracking, CG integration.", icon: Camera, features: ["Camera solve & reconstruction", "3D object tracking", "Body & face tracking", "Survey data integration", "Lens distortion solve", "CG element alignment"], gradient: "from-brand-blue to-brand-green" },
    { id: "compositing", title: "3D Compositing", description: "Physically accurate integration. Light matching. Depth realism.", icon: Layers, features: ["Multi-pass rendering integration", "Light & shadow matching", "Depth & atmospheric effects", "Color consistency", "CG-live action blending", "Final pixel delivery"], gradient: "from-brand-green to-brand-red" },
    { id: "matte", title: "Matte Painting", description: "Production-scale environments, not static wallpapers.", icon: Mountain, features: ["Full CG environments", "Set extensions", "2.5D camera projections", "Sky replacements", "Period & world building", "Camera-ready asset delivery"], gradient: "from-brand-red to-brand-green" },
    { id: "previs", title: "Previsualization", description: "Shot planning to reduce on-set confusion and post chaos.", icon: Eye, features: ["Shot planning & design", "Camera blocking", "Action choreography viz", "VFX shot breakdown", "Director communication tool", "Budget forecasting aid"], gradient: "from-brand-blue to-brand-red" },
    { id: "ai", title: "AI-Enhanced Workflow", description: "Controlled AI usage integrated into production pipelines — not random automation.", icon: Cpu, features: ["AI-assisted rotoscopy", "Automated QC checks", "Smart batch processing", "Pipeline automation", "Version control systems", "Asset tracking integration"], gradient: "from-brand-green to-brand-blue" },
  ];

  const processSteps = [
    { step: "01", title: "Script & Shot Breakdown", description: "We break cost per shot, not per vague assumption. Every frame is accounted for.", icon: FileText },
    { step: "02", title: "Pipeline Mapping", description: "Department allocation, version control, asset flow clarity. No guesswork.", icon: Crosshair },
    { step: "03", title: "Milestone Delivery", description: "Fixed review cycles. Structured revisions. Predictable handoffs.", icon: Clock },
    { step: "04", title: "Final Integration", description: "Color pipeline integrity, render verification, delivery compliance.", icon: Shield },
  ];

  const structuredData = {
    "@context": "https://schema.org", "@type": "Service", "serviceType": "VFX Production Services",
    "provider": { "@type": "Organization", "name": "Fuke's Media LLP", "url": "https://fukesmedia.com" },
    "areaServed": "India",
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet title="VFX Services | Fuke's Media LLP — Production-Ready Pipeline" description="Rotoscopy, matchmove, 3D compositing, matte painting, previs, and AI-enhanced workflows. Structured VFX services with transparent per-shot costing." keywords="VFX services India, rotoscopy, matchmove, compositing, matte painting, previs, AI VFX pipeline" structuredData={structuredData} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-brand-blue/10 rounded-full blur-[120px]" animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-6 px-5 py-2.5 bg-surface-elevated border-border/50 text-foreground rounded-full">
              <Crosshair className="w-4 h-4 mr-2 text-brand-red" />Structured Execution
            </Badge>
          </motion.div>
          <motion.h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-[1.1]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Our <span className="gradient-text">VFX Departments</span>
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Every department runs on structured pipeline execution — per-shot costing, milestone delivery, zero ambiguity.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <SectionWrapper withDivider>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Card className="group hover:shadow-2xl hover:shadow-brand-red/5 transition-all duration-500 hover:-translate-y-2 border-border/30 bg-surface-elevated/50 backdrop-blur-sm rounded-3xl overflow-hidden h-full flex flex-col">
                <div className={`h-1 w-full bg-gradient-to-r ${service.gradient}`} />
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${service.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-display">{service.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">{service.description}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <motion.div key={i} className="flex items-start" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                        <Check className="h-4 w-4 text-brand-green mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full rounded-full bg-gradient-to-r from-brand-red to-brand-blue text-white border-0 group/btn">
                    <Link to="/pricing">Get Estimate <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Process — The True Differentiator */}
      <SectionWrapper variant="gradient" withDivider>
        <SectionHeading title="Our Process" subtitle="This is how we eliminate production chaos" badge="Your Differentiator" />
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
            Ready for a <span className="gradient-text">Real Breakdown</span>?
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Get per-shot costing, pipeline mapping, and a production timeline — not a vague PDF.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-red to-brand-blue text-white text-lg px-8 border-0 shadow-lg">
              <Link to="/contact">Request Project Breakdown <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 border-border/50">
              <Link to="/pricing">Shot-Level Calculator</Link>
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Services;
