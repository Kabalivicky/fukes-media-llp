import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import LiquidReveal, { StaggerReveal } from '@/components/LiquidReveal';
import { AnimatedLetters, GradientText, AnimatedWords } from '@/components/KineticText';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Briefcase, Sparkles, Zap, Globe, Heart, ArrowRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented artists and engineers from around the world',
      color: 'from-primary to-secondary',
    },
    {
      icon: Briefcase,
      title: 'Cutting-Edge Projects',
      description: 'Work on blockbuster films and innovative VFX projects',
      color: 'from-secondary to-accent',
    },
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Remote work options and international collaboration',
      color: 'from-accent to-primary',
    },
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Flexible hours and comprehensive wellness programs',
      color: 'from-primary to-accent',
    },
  ];

  const jobOpenings = [
    {
      title: 'Senior VFX Artist',
      department: 'Visual Effects',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead complex VFX sequences using cutting-edge AI-assisted tools and workflows.',
      tags: ['Nuke', 'Maya', 'Houdini', 'AI Tools'],
    },
    {
      title: '3D Generalist',
      department: '3D Department',
      location: 'Remote',
      type: 'Contract',
      experience: '3+ years',
      description: 'Create stunning 3D assets and animations for feature films and commercials.',
      tags: ['Maya', 'ZBrush', 'Substance Painter'],
    },
    {
      title: 'AI/ML Engineer',
      department: 'Technology',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Develop AI solutions for automated VFX workflows and real-time rendering.',
      tags: ['Python', 'PyTorch', 'TensorFlow', 'Computer Vision'],
    },
    {
      title: 'Compositing Artist',
      department: 'Post-Production',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Master the art of seamless compositing for high-end feature films.',
      tags: ['Nuke', 'After Effects', 'Fusion'],
    },
    {
      title: 'Technical Director',
      department: 'R&D',
      location: 'Remote',
      type: 'Full-time',
      experience: '6+ years',
      description: 'Drive technical innovation and pipeline development across productions.',
      tags: ['Pipeline', 'Python', 'USD', 'Shotgrid'],
    },
    {
      title: 'Motion Graphics Designer',
      department: 'Creative',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Create dynamic motion graphics for titles, commercials, and digital content.',
      tags: ['After Effects', 'Cinema 4D', 'Illustrator'],
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Fuke's Media LLP"
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="Careers - Join Fuke's Media Team"
        description="Join our innovative team of VFX artists, engineers, and creative professionals. Explore career opportunities at Fuke's Media."
        keywords="VFX careers, visual effects jobs, 3D artist jobs, AI engineer positions, remote work"
        canonical="https://fukes-media.com/careers"
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
              Join Our Team
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <AnimatedLetters className="block" delay={0.2}>Build The</AnimatedLetters>
            <span className="block mt-2">
              <GradientText>Future of VFX</GradientText>
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
              Join a team of innovators pushing the boundaries of what's possible in visual effects
            </AnimatedWords>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <SectionWrapper variant="dark">
        <SectionHeading
          title="Why Work With Us"
          subtitle="More than a job – a career in innovation"
          badge="Benefits"
        />

        <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border/50 hover:border-primary/30 bg-card/50">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </StaggerReveal>
      </SectionWrapper>

      {/* Job Openings */}
      <SectionWrapper withDivider>
        <SectionHeading
          title="Open Positions"
          subtitle="Find your perfect role in our growing team"
          badge="Opportunities"
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {jobOpenings.map((job, index) => (
            <LiquidReveal key={job.title} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
              <Card className="group h-full hover:shadow-2xl transition-all duration-500 hover:border-primary/30 border-border/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-display font-bold mb-1 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                      {job.type}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-background/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-secondary" />
                      {job.experience}
                    </div>
                  </div>

                  <Button className="w-full group/btn">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </LiquidReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper variant="gradient" withDivider>
        <div className="max-w-3xl mx-auto text-center">
          <LiquidReveal direction="up">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Open Application</span>
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Don't See <GradientText>Your Role</GradientText>?
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for exceptional talent. Send us your portfolio 
              and tell us how you can contribute to our mission.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 group">
                <Send className="w-5 h-5 mr-2" />
                Send Your Portfolio
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </LiquidReveal>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Careers;
