import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import LiquidReveal, { StaggerReveal } from '@/components/LiquidReveal';
import { AnimatedLetters, GradientText, AnimatedWords } from '@/components/KineticText';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Sparkles, Film, Palette, Layers, Code, Lightbulb, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';

const Services = () => {
  const services = [
    {
      id: "vfx",
      title: "VFX Solutions",
      description: "Full-spectrum visual effects from concept to final delivery",
      icon: Film,
      features: [
        "2D & 3D Compositing",
        "Rotoscoping & Clean-up",
        "Digital Matte Painting",
        "3D Modeling & Animation",
        "Simulation & FX",
        "Match Move & Tracking"
      ],
      color: "from-primary to-secondary"
    },
    {
      id: "creative",
      title: "Creative Services",
      description: "Artistic solutions to elevate your visual storytelling",
      icon: Palette,
      features: [
        "Poster Design",
        "Motion Posters",
        "Lyrical Video Creation",
        "Video Editing",
        "Title Sequence Design",
        "Motion Graphics"
      ],
      color: "from-secondary to-accent"
    },
    {
      id: "di",
      title: "Digital Intermediate",
      description: "Professional color grading and finishing services",
      icon: Layers,
      features: [
        "Basic & Advanced Color Grading",
        "HDR Grading",
        "Look Development",
        "VFX Supervision during DI",
        "Final Delivery Masters",
        "Quality Control"
      ],
      color: "from-accent to-primary"
    },
    {
      id: "tech",
      title: "Tech Innovation",
      description: "Cutting-edge technology solutions for content creation",
      icon: Code,
      features: [
        "AI-Assisted Workflows",
        "Custom Pipeline Development",
        "Automation Solutions",
        "Cloud Rendering",
        "Real-time Collaboration Tools",
        "Asset Management Systems"
      ],
      color: "from-primary to-accent"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation & Brief",
      description: "We start by understanding your project needs, creative vision, and technical requirements.",
      icon: Lightbulb
    },
    {
      step: "02",
      title: "Planning & Estimation",
      description: "Our team creates a customized production plan with transparent pricing based on your specific needs.",
      icon: ArrowRight
    },
    {
      step: "03",
      title: "Production & Iteration",
      description: "Our artists and engineers bring your vision to life with regular updates and feedback sessions.",
      icon: Sparkles
    },
    {
      step: "04",
      title: "Delivery & Support",
      description: "We deliver the final assets in your required formats and provide ongoing support as needed.",
      icon: Check
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "VFX and Creative Services",
    "provider": {
      "@type": "Organization",
      "name": "Fuke's Media LLP",
      "url": "https://fukes-media.com"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "VFX Services",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="Services | Fuke's Media - AI-Driven VFX & Creative Studio"
        description="Explore our comprehensive range of VFX, creative, digital intermediate, and technology innovation services."
        keywords="VFX services, visual effects, creative services, digital intermediate, tech innovation, film production"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-secondary/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Enhanced Solutions
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <AnimatedLetters className="block" delay={0.2}>Our</AnimatedLetters>
            <span className="block mt-2">
              <GradientText>Services</GradientText>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <AnimatedWords
              className="text-xl text-muted-foreground"
              delay={1}
            >
              Comprehensive creative solutions powered by AI and human expertise
            </AnimatedWords>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <SectionWrapper withDivider>
        <StaggerReveal className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/50 hover:border-primary/30 overflow-hidden">
              <div className={`h-1.5 w-full bg-gradient-to-r ${service.color}`} />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-display">{service.title}</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-background/50">
                    <Zap className="w-3 h-3 mr-1" />
                    AI-Enhanced
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-2">{service.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start group/item"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button asChild className="w-full group/btn">
                  <Link to="/pricing">
                    View Pricing 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </StaggerReveal>
      </SectionWrapper>

      {/* Process Section */}
      <SectionWrapper variant="gradient" withDivider>
        <SectionHeading
          title="Our Process"
          subtitle="How we bring your vision to life through our collaborative workflow"
          badge="Workflow"
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-8 md:left-[calc(4rem-1px)] w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
          
          {processSteps.map((phase, index) => (
            <LiquidReveal key={phase.step} delay={index * 0.15} direction="left">
              <motion.div 
                className="flex mb-12 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="mr-8 relative">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-lg relative z-10"
                    whileHover={{ scale: 1.1 }}
                  >
                    {phase.step}
                  </motion.div>
                  <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-primary/20 animate-ping opacity-30" style={{ animationDuration: '2s' }} />
                </div>
                <Card className="flex-1 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display font-bold text-primary mb-2 flex items-center">
                      <phase.icon className="w-5 h-5 mr-2" />
                      {phase.title}
                    </h3>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </LiquidReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper variant="dark">
        <div className="max-w-3xl mx-auto text-center">
          <LiquidReveal direction="up">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to <GradientText>Get Started</GradientText>?
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss your project and create something extraordinary together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 group">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </LiquidReveal>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Services;
