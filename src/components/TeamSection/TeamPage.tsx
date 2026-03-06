import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import SEOHelmet from '@/components/SEOHelmet';
import TeamMemberCard from './TeamMemberCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Users, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Vikram A.',
    role: 'Compositing & Pipeline Systems',
    bio: 'Founder. Builds the execution systems that keep every shot on track — from asset flow to final delivery.',
    skills: ['Compositing', 'Pipeline Architecture', 'Project Management', 'Client Relations'],
    email: 'vikram@fukesmedia.com',
    linkedin: 'https://linkedin.com/in/vikrama',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VikramA&backgroundColor=0057B7&clothingColor=D50032',
    brandColor: '#C8102E'
  },
  {
    name: 'Arjun',
    role: 'Production & Strategy',
    bio: 'Co-Founder. Oversees production strategy, resource allocation, and client delivery timelines.',
    skills: ['Production Strategy', 'Resource Planning', 'CG/VFX Lead', 'Quality Control'],
    email: 'arjun@fukesmedia.com',
    linkedin: 'https://linkedin.com/in/arjun',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunR&backgroundColor=D50032&clothingColor=009639',
    brandColor: '#0077B6'
  },
  {
    name: 'Harshith',
    role: 'Technical Supervision',
    bio: 'Partner. Manages technical supervision, tool development, and pipeline R&D across departments.',
    skills: ['Technical Direction', 'Tool Development', 'Pipeline R&D', 'Business Development'],
    email: 'harshith@fukesmedia.com',
    linkedin: 'https://linkedin.com/in/harshith',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harshith&backgroundColor=009639&clothingColor=FFCC00',
    brandColor: '#00A651'
  },
  {
    name: 'Sai Prasad',
    role: 'Operations',
    bio: 'Partner. Handles vendor coordination, outsource management, and day-to-day studio operations.',
    skills: ['Operations Management', 'Vendor Relations', 'Outsource Coordination', 'Logistics'],
    email: 'saiprasad@fukesmedia.com',
    linkedin: 'https://linkedin.com/in/saiprasad',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SaiPrasad&backgroundColor=00BFFF&clothingColor=D50032',
    brandColor: '#0077B6'
  },
  {
    name: 'Vignesh',
    role: 'Creative & Visual Systems',
    bio: 'Partner. Leads visual system design, creative direction, and brand identity across all studio output.',
    skills: ['Creative Direction', 'Visual Systems', 'Brand Identity', 'Design Leadership'],
    email: 'vignesh@fukesmedia.com',
    linkedin: 'https://linkedin.com/in/vignesh',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vignesh&backgroundColor=FFCC00&clothingColor=009639',
    brandColor: '#C8102E'
  },
];

const TeamPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fuke's Media LLP",
    "employee": teamMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role
    }))
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="Founding Partners | Fuke's Media LLP"
        description="Meet the five founding partners behind Fuke's Media LLP — built on pipeline discipline and production execution."
        keywords="VFX studio team, founding partners, Fuke's Media partners, Bengaluru VFX"
        canonical="https://fukesmedia.com/team"
        structuredData={structuredData}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-brand-blue/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-5 py-2.5 bg-surface-elevated border-border/50 text-foreground rounded-full">
              <Zap className="w-4 h-4 mr-2 text-brand-red" />
              Five Partners. One Pipeline.
            </Badge>
          </motion.div>

          <motion.h1 
            className="font-display text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Founding <span className="gradient-text">Partners</span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Each partner owns a domain. Together, we own the pipeline end-to-end.
          </motion.p>
        </div>
      </section>

      {/* Studio Info */}
      <SectionWrapper variant="dark">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { value: '5', label: 'Founding Partners' },
            { value: 'Bengaluru', label: 'Studio Location' },
            { value: 'LLP', label: 'Registered Entity' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring' }}
            >
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Team Grid */}
      <SectionWrapper withDivider>
        <SectionHeading
          title="The Team"
          subtitle="Each partner brings a specific domain expertise to the studio"
          badge="Leadership"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TeamMemberCard {...member} />
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Hiring CTA */}
      <SectionWrapper variant="gradient" withDivider>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-surface-elevated/50 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-4 h-4 text-brand-red" />
            <span className="text-sm font-medium">We're Hiring Artists</span>
          </motion.div>

          <motion.h2
            className="font-display text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join the <span className="gradient-text">Pipeline</span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We're looking for matchmove artists, roto artists, and compositors who value 
            discipline over drama.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-red to-brand-blue text-white text-lg px-8">
              <Link to="/freelancer-portal">
                Submit Your Profile
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 border-border/50">
              <Link to="/contact">
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Link>
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default TeamPage;
