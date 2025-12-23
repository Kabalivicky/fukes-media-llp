import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import LiquidReveal, { StaggerReveal } from '@/components/LiquidReveal';
import { AnimatedLetters, GradientText, AnimatedWords } from '@/components/KineticText';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Globe, Award, Users, Lightbulb, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElements from '@/components/FloatingElements';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'Pioneering AI-driven workflows that redefine what\'s possible in visual effects.',
      color: 'from-primary to-secondary',
    },
    {
      icon: Target,
      title: 'Precision Excellence',
      description: 'Meticulous attention to every frame, every pixel, every detail.',
      color: 'from-secondary to-accent',
    },
    {
      icon: Users,
      title: 'Global Collaboration',
      description: 'A distributed network of world-class talent working seamlessly across borders.',
      color: 'from-accent to-primary',
    },
    {
      icon: Heart,
      title: 'Client Partnership',
      description: 'Your vision is our mission. We succeed when you succeed.',
      color: 'from-primary to-accent',
    },
  ];

  const milestones = [
    { year: '2020', event: 'Founded in Mumbai', description: 'Started with a vision to democratize VFX' },
    { year: '2021', event: 'AI Integration', description: 'Launched AI-assisted production pipeline' },
    { year: '2022', event: 'Global Expansion', description: 'Opened offices in London & LA' },
    { year: '2023', event: '100+ Projects', description: 'Delivered over 100 feature films & shows' },
    { year: '2024', event: 'Industry Recognition', description: 'Multiple international awards' },
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
    "url": "https://fukes-media.com",
    "description": "AI-driven VFX studio revolutionizing post-production",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Vikram Arjun"
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="About Us | Fuke's Media - AI-Driven VFX & Creative Studio"
        description="Learn about Fuke's Media, an AI-driven VFX studio revolutionizing post-production in the film and entertainment industry."
        keywords="VFX studio, visual effects company, AI VFX, creative studio, film production"
        canonical="https://fukes-media.com/about"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <ParallaxSection 
        className="relative min-h-[80vh] flex items-center justify-center"
        speed={0.3}
        fade
      >
        <FloatingElements variant="orbs" count={4} />
        
        {/* Animated background orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-3xl"
          style={{ y: y2 }}
        />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Pioneering AI-Driven VFX
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <AnimatedLetters className="block" delay={0.2}>About</AnimatedLetters>
            <span className="block mt-2">
              <GradientText>Fuke's Media</GradientText>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <AnimatedWords
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
              delay={1}
            >
              Revolutionizing visual effects through the seamless fusion of artificial intelligence and artistic mastery
            </AnimatedWords>
          </motion.div>
        </div>

      </ParallaxSection>

      {/* Vision & Mission */}
      <ParallaxSection speed={0.15} className="py-0">
        <SectionWrapper variant="gradient" withDivider>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <LiquidReveal direction="left">
            <div className="space-y-8">
              <SectionHeading
                title="Our Vision"
                badge="The Future"
                align="left"
                size="lg"
              />
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fuke's Media is pioneering the integration of artificial intelligence with traditional VFX techniques 
                to revolutionize post-production in the film and entertainment industry. We combine cutting-edge 
                technology with artistic excellence to deliver unparalleled visual experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our vision is to make Hollywood-quality VFX accessible to productions of all sizes, democratizing 
                visual effects while maintaining the highest standards of quality and creativity.
              </p>
            </div>
          </LiquidReveal>

          <LiquidReveal direction="right" delay={0.2}>
            <Card className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <CardContent className="p-8 relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Zap className="w-8 h-8 text-primary" />
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
                    <Badge key={tag} variant="secondary" className="bg-secondary/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </LiquidReveal>
        </div>
      </SectionWrapper>
      </ParallaxSection>

      {/* Stats Section */}
      <SectionWrapper variant="dark">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <LiquidReveal key={stat.label} delay={index * 0.1} direction="up">
              <div className="text-center">
                <motion.div
                  className="font-display text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            </LiquidReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper withDivider>
        <SectionHeading
          title="Our Values"
          subtitle="The principles that guide everything we do"
          badge="Core Values"
        />

        <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {values.map((value) => (
            <Card key={value.title} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border/50 hover:border-primary/30">
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </StaggerReveal>
      </SectionWrapper>

      {/* Journey Timeline */}
      <SectionWrapper variant="gradient" withDivider>
        <SectionHeading
          title="Our Journey"
          subtitle="From a small studio to a global VFX powerhouse"
          badge="Timeline"
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {milestones.map((milestone, index) => (
            <LiquidReveal key={milestone.year} delay={index * 0.15} direction={index % 2 === 0 ? 'left' : 'right'}>
              <div className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-20 md:pl-0`}>
                  <Card className="inline-block hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="font-display text-3xl font-bold text-primary mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold mb-1">{milestone.event}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10" />

                <div className="flex-1 hidden md:block" />
              </div>
            </LiquidReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper variant="dark">
        <div className="text-center max-w-3xl mx-auto">
          <LiquidReveal direction="up">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6"
            >
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Award-Winning Studio</span>
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Create <GradientText>Something Extraordinary</GradientText>?
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Join the growing list of filmmakers and studios who trust Fuke's Media 
              for their most ambitious visual effects projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                <Link to="/contact">Start Your Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </LiquidReveal>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default About;
