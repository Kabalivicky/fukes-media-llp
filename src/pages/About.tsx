import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Globe, Award, Users, Lightbulb, Target, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const values = [
    { icon: Lightbulb, title: 'Innovation First', description: 'Pioneering AI-driven workflows that redefine what\'s possible in visual effects.', gradient: 'from-brand-red to-brand-blue' },
    { icon: Target, title: 'Precision Excellence', description: 'Meticulous attention to every frame, every pixel, every detail.', gradient: 'from-brand-blue to-brand-green' },
    { icon: Users, title: 'Global Collaboration', description: 'A distributed network of world-class talent working seamlessly across borders.', gradient: 'from-brand-green to-brand-red' },
    { icon: Heart, title: 'Client Partnership', description: 'Your vision is our mission. We succeed when you succeed.', gradient: 'from-brand-red to-brand-green' },
  ];

  const milestones = [
    { year: '2020', event: 'Founded in Bengaluru', description: 'Started with a vision to democratize VFX' },
    { year: '2021', event: 'AI Integration', description: 'Launched AI-assisted production pipeline' },
    { year: '2022', event: 'Global Expansion', description: 'Expanded client base internationally' },
    { year: '2023', event: '100+ Projects', description: 'Delivered over 100 feature films & shows' },
    { year: '2024', event: 'Industry Recognition', description: 'Multiple international awards & partnerships' },
  ];

  const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '50+', label: 'Global Clients' },
    { value: '15+', label: 'Industry Awards' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fuke's Media LLP",
    "url": "https://fukesmedia.com",
    "description": "AI-driven VFX studio revolutionizing post-production",
    "foundingDate": "2020",
    "founder": { "@type": "Person", "name": "Vikram Arjun" }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="About Us | Fuke's Media - AI-Driven VFX & Creative Studio"
        description="Learn about Fuke's Media, an AI-driven VFX studio revolutionizing post-production in the film and entertainment industry."
        keywords="VFX studio, visual effects company, AI VFX, creative studio, film production"
        canonical="https://fukesmedia.com/about"
        structuredData={structuredData}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* RGB Orbs */}
        <motion.div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-red/15 blur-[100px]" style={{ y: y1 }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-blue/15 blur-[100px]" style={{ y: y2 }} />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-green/10 blur-[80px]" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 px-5 py-2.5 bg-surface-elevated border-border/50 text-foreground rounded-full">
              <Sparkles className="w-4 h-4 mr-2 text-brand-red" />
              Pioneering AI-Driven VFX
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            About{' '}
            <span className="gradient-text">Fuke's Media</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Revolutionizing visual effects through the seamless fusion of artificial intelligence and artistic mastery
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <SectionWrapper variant="gradient" withDivider>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div className="space-y-8" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionHeading title="Our Vision" badge="The Future" align="left" size="lg" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fuke's Media is pioneering the integration of artificial intelligence with traditional VFX techniques 
              to revolutionize post-production in the film and entertainment industry. We combine cutting-edge 
              technology with artistic excellence to deliver unparalleled visual experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our vision is to make Hollywood-quality VFX accessible to productions of all sizes, democratizing 
              visual effects while maintaining the highest standards of quality and creativity.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className="relative overflow-hidden border-border/30 bg-surface-elevated/50 backdrop-blur-xl rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-brand-blue/5 to-brand-green/5" />
              <CardContent className="p-8 relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-green">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  To democratize high-quality VFX by leveraging AI-powered tools, a distributed global talent 
                  network, and innovative pricing models. We're committed to pushing the boundaries of what's 
                  possible while making cutting-edge visual effects accessible to all.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['AI-Powered', 'Global Network', 'Transparent Pricing'].map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-surface-elevated rounded-full px-4 py-1.5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Stats */}
      <SectionWrapper variant="dark">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
            >
              <div className="font-display text-5xl md:text-6xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper withDivider>
        <SectionHeading title="Our Values" subtitle="The principles that guide everything we do" badge="Core Values" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl hover:shadow-brand-red/5 transition-all duration-500 hover:-translate-y-2 border-border/30 bg-surface-elevated/50 backdrop-blur-sm rounded-3xl h-full">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Journey Timeline */}
      <SectionWrapper variant="gradient" withDivider>
        <SectionHeading title="Our Journey" subtitle="From a small studio to a global VFX powerhouse" badge="Timeline" />
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-red via-brand-blue to-brand-green" />
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-20 md:pl-0`}>
                <Card className="inline-block hover:shadow-lg transition-shadow border-border/30 bg-surface-elevated/50 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-6">
                    <div className="font-display text-3xl font-bold gradient-text mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-1">{milestone.event}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-brand-blue rounded-full -translate-x-1/2 ring-4 ring-background z-10" />
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="dark">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-surface-elevated/50 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="w-4 h-4 text-brand-red" />
            <span className="text-sm font-medium">Award-Winning Studio</span>
          </motion.div>

          <motion.h2
            className="font-display text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ready to Create <span className="gradient-text">Something Extraordinary</span>?
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join the growing list of filmmakers and studios who trust Fuke's Media 
            for their most ambitious visual effects projects.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-red to-brand-blue hover:opacity-90 text-white text-lg px-8 shadow-lg">
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 border-border/50">
              <Link to="/portfolio">View Our Work</Link>
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default About;
