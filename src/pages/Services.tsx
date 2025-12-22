
import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Sparkles, Film, Palette, Layers, Code, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';

const Services = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        duration: 0.6 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Services data
  const services = [
    {
      id: "vfx",
      title: "VFX Solutions",
      description: "Full-spectrum visual effects from concept to final delivery",
      icon: <Film />,
      features: [
        "2D & 3D Compositing",
        "Rotoscoping & Clean-up",
        "Digital Matte Painting",
        "3D Modeling & Animation",
        "Simulation & FX",
        "Match Move & Tracking"
      ],
      color: "from-fukes-blue to-fukes-cyan"
    },
    {
      id: "creative",
      title: "Creative Services",
      description: "Artistic solutions to elevate your visual storytelling",
      icon: <Palette />,
      features: [
        "Poster Design",
        "Motion Posters",
        "Lyrical Video Creation",
        "Video Editing",
        "Title Sequence Design",
        "Motion Graphics"
      ],
      color: "from-fukes-red to-fukes-gold"
    },
    {
      id: "di",
      title: "Digital Intermediate",
      description: "Professional color grading and finishing services",
      icon: <Layers />,
      features: [
        "Basic & Advanced Color Grading",
        "HDR Grading",
        "Look Development",
        "VFX Supervision during DI",
        "Final Delivery Masters",
        "Quality Control"
      ],
      color: "from-fukes-green to-fukes-gold"
    },
    {
      id: "tech",
      title: "Tech Innovation",
      description: "Cutting-edge technology solutions for content creation",
      icon: <Code />,
      features: [
        "AI-Assisted Workflows",
        "Custom Pipeline Development",
        "Automation Solutions",
        "Cloud Rendering",
        "Real-time Collaboration Tools",
        "Asset Management Systems"
      ],
      color: "from-fukes-purple to-fukes-blue"
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
    <div className="min-h-screen bg-background text-foreground">
      <SEOHelmet
        title="Services | Fuke's Media - AI-Driven VFX & Creative Studio"
        description="Explore our comprehensive range of VFX, creative, digital intermediate, and technology innovation services."
        keywords="VFX services, visual effects, creative services, digital intermediate, tech innovation, film production"
        structuredData={structuredData}
      />
      
      <main className="pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle 
                title="Our Services" 
                subtitle="Comprehensive creative solutions powered by AI and human expertise"
              />
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {services.map((service) => (
                  <motion.div key={service.id} variants={itemVariants}>
                    <Card className="hover:border-primary/50 transition-all duration-300 overflow-hidden group">
                      <div className={`h-2 w-full bg-gradient-to-r ${service.color}`}></div>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${service.color} text-white`}>
                              {service.icon}
                            </div>
                            <CardTitle className="text-xl">{service.title}</CardTitle>
                          </div>
                          <Badge variant="outline" className="bg-muted/50">
                            AI-Enhanced
                          </Badge>
                        </div>
                        <CardDescription className="mt-2">{service.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button asChild className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                          <Link to="/pricing">
                            View Pricing <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-20">
                <SectionTitle 
                  title="Our Process" 
                  subtitle="How we bring your vision to life through our collaborative workflow"
                />
                
                <div className="max-w-4xl mx-auto mt-12 relative">
                  <div className="absolute top-0 bottom-0 left-[calc(2rem-1px)] w-0.5 bg-gradient-to-b from-primary/80 to-primary/20 hidden md:block"></div>
                  
                  {[
                    {
                      step: "01",
                      title: "Consultation & Brief",
                      description: "We start by understanding your project needs, creative vision, and technical requirements.",
                      icon: <Lightbulb className="w-5 h-5" />
                    },
                    {
                      step: "02",
                      title: "Planning & Estimation",
                      description: "Our team creates a customized production plan with transparent pricing based on your specific needs.",
                      icon: <ArrowRight className="w-5 h-5" />
                    },
                    {
                      step: "03",
                      title: "Production & Iteration",
                      description: "Our artists and engineers bring your vision to life with regular updates and feedback sessions.",
                      icon: <Sparkles className="w-5 h-5" />
                    },
                    {
                      step: "04",
                      title: "Delivery & Support",
                      description: "We deliver the final assets in your required formats and provide ongoing support as needed.",
                      icon: <Check className="w-5 h-5" />
                    }
                  ].map((phase, index) => (
                    <motion.div 
                      key={index}
                      className="flex mb-12 last:mb-0"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                      <div className="mr-8 relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-lg relative z-10">
                          {phase.step}
                        </div>
                        <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-primary/20 animate-ping opacity-30 duration-1000"></div>
                      </div>
                      <div className="flex-1 glass p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                          {phase.icon}
                          <span className="ml-2">{phase.title}</span>
                        </h3>
                        <p className="text-muted-foreground">{phase.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;
