import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import LiquidReveal, { StaggerReveal } from '@/components/LiquidReveal';
import { AnimatedLetters, GradientText, AnimatedWords } from '@/components/KineticText';
import SEOHelmet from '@/components/SEOHelmet';
import TeamMemberCard from './TeamMemberCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

// Updated team member data with Vignesh removed and brand colors added
const teamMembers = [
  {
    name: 'Vikram Arjun',
    role: 'Founder & Creative Director',
    bio: 'With over 15 years in VFX, Vikram combines technical expertise with artistic vision to lead our creative direction across all projects.',
    skills: ['Creative Direction', 'VFX Supervision', 'AI Integration', 'Team Leadership'],
    email: 'vikram@fukes-media.com',
    linkedin: 'https://linkedin.com/in/vikramarjun',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VikramArjun&backgroundColor=0057B7&clothingColor=D50032',
    brandColor: '#0057B7'
  },
  {
    name: 'Harshith',
    role: 'Technical Director',
    bio: 'Harshith oversees all technical aspects of our productions, ensuring cutting-edge implementation of both traditional and AI-driven VFX solutions.',
    skills: ['Pipeline Development', 'Technical Direction', 'Programming', 'R&D'],
    email: 'harshith@fukes-media.com',
    linkedin: 'https://linkedin.com/in/harshith',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harshith&backgroundColor=009639&clothingColor=FFCC00',
    brandColor: '#009639'
  },
  {
    name: 'Sai Prasad',
    role: 'Production Manager',
    bio: 'Sai Prasad ensures all projects run smoothly from inception to delivery, coordinating resources and maintaining our high quality standards.',
    skills: ['Project Management', 'Resource Allocation', 'Client Relations', 'Quality Control'],
    email: 'saiprasad@fukes-media.com',
    linkedin: 'https://linkedin.com/in/saiprasad',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SaiPrasad&backgroundColor=00BFFF&clothingColor=D50032',
    brandColor: '#00BFFF'
  },
  {
    name: 'Sandesh',
    role: 'Senior VFX Artist',
    bio: 'Sandesh brings over a decade of experience in high-end visual effects for feature films and streaming content.',
    skills: ['Compositing', 'Lighting', 'Texturing', 'Simulation'],
    email: 'sandesh@fukes-media.com',
    linkedin: 'https://linkedin.com/in/sandesh',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sandesh&backgroundColor=FFCC00&clothingColor=009639',
    brandColor: '#FFCC00'
  },
  {
    name: 'Arjun',
    role: 'UI/UX Designer',
    bio: 'Arjun crafts intuitive user experiences for our software products and client-facing platforms, focusing on accessibility and elegant design.',
    skills: ['Interface Design', 'User Testing', 'Prototyping', 'Visual Design'],
    email: 'arjun@fukes-media.com',
    linkedin: 'https://linkedin.com/in/arjun',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=D50032&clothingColor=009639',
    brandColor: '#D50032'
  }
];

const stats = [
  { value: '50+', label: 'Team Members' },
  { value: '12', label: 'Countries' },
  { value: '15+', label: 'Years Experience' },
  { value: '100%', label: 'Passion' },
];

const TeamPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fuke's Media",
    "employee": teamMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role
    }))
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="Our Team | Fuke's Media - Industry Leaders in AI-Driven VFX"
        description="Meet the creative and technical experts behind Fuke's Media, pushing the boundaries of VFX with artificial intelligence."
        keywords="VFX team, creative professionals, VFX artists, AI engineers, film production team"
        canonical="https://fukes-media.com/team"
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
              The Dream Team
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <AnimatedLetters className="block" delay={0.2}>Meet Our</AnimatedLetters>
            <span className="block mt-2">
              <GradientText>Team</GradientText>
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
              The creative minds and technical experts redefining what's possible in visual effects
            </AnimatedWords>
          </motion.div>
        </div>
      </section>

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

      {/* Team Grid */}
      <SectionWrapper withDivider>
        <SectionHeading
          title="Leadership Team"
          subtitle="Our diverse team combines decades of industry experience with cutting-edge technical expertise"
          badge="Core Team"
        />

        <StaggerReveal 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
          staggerDelay={0.1}
        >
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </StaggerReveal>
      </SectionWrapper>

      {/* Join the Team CTA */}
      <SectionWrapper variant="gradient" withDivider>
        <div className="max-w-3xl mx-auto text-center">
          <LiquidReveal direction="up">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6"
            >
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">We're Hiring</span>
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Join Our <GradientText>Growing Team</GradientText>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented individuals who are passionate about pushing 
              the boundaries of visual effects and technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 group">
                <Link to="/careers">
                  View Open Positions
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Link>
              </Button>
            </div>
          </LiquidReveal>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default TeamPage;
