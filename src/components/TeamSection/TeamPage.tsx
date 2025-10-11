
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '@/components/SectionTitle';
import TeamMemberCard from './TeamMemberCard';

// Updated team member data with complete team structure
const foundingTeam = [
  {
    name: 'Vikram A',
    role: 'Founder | Project & Client Management',
    designation: 'Designated Partner',
    bio: 'Visionary leader overseeing project delivery and client relationships. 15+ years in VFX production management.',
    skills: ['Project Management', 'Client Relations', 'Business Strategy', 'Team Leadership'],
    email: 'vikram@fukesmedia.com',
    linkedin: 'https://linkedin.com/in/vikrama',
    imageUrl: '/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png',
    brandColor: '#BE1E2D'
  },
  {
    name: 'Arjun R',
    role: 'Co-Founder | Production Head, CG & VFX Lead',
    designation: 'Designated Partner',
    bio: 'Technical mastermind leading all CG and VFX operations. Award-winning VFX supervisor.',
    skills: ['VFX Supervision', 'CG Production', 'Technical Direction', 'Pipeline Development'],
    email: 'arjun@fukesmedia.com',
    linkedin: 'https://linkedin.com/in/arjunr',
    imageUrl: '/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png',
    brandColor: '#0071CE'
  },
  {
    name: 'Sai Prasad',
    role: 'Operational Manager | Vendor & Outsource Head',
    designation: 'Partner',
    bio: 'Manages all operational workflows and vendor relationships. Expert in resource optimization.',
    skills: ['Operations Management', 'Vendor Relations', 'Resource Allocation', 'Quality Control'],
    email: 'saiprasad@fukesmedia.com',
    linkedin: 'https://linkedin.com/in/saiprasad',
    imageUrl: '/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png',
    brandColor: '#00A641'
  },
  {
    name: 'Harshith Kulai',
    role: 'Creative Head & Business Development',
    designation: 'Partner',
    bio: 'Drives creative vision and business growth. 10+ years in creative direction and client acquisition.',
    skills: ['Creative Direction', 'Business Development', 'Brand Strategy', 'Client Acquisition'],
    email: 'harshith@fukesmedia.com',
    linkedin: 'https://linkedin.com/in/harshithkulai',
    imageUrl: '/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png',
    brandColor: '#FFCC00'
  },
  {
    name: 'Sandesh Naik',
    role: 'Accounts & Finance Head',
    designation: 'Partner',
    bio: 'Manages financial operations and ensures fiscal responsibility. CA with 12+ years experience.',
    skills: ['Financial Management', 'Accounting', 'Tax Planning', 'Budget Control'],
    email: 'sandesh@fukesmedia.com',
    linkedin: 'https://linkedin.com/in/sandeshnaik',
    imageUrl: '/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png',
    brandColor: '#00BFFF'
  }
];

const coreTeam = [
  {
    name: 'Sai Vinay',
    role: 'Lead FX & Simulation Artist',
    skills: ['Houdini', 'FX Simulation', 'Procedural Animation', 'Pyro FX'],
  },
  {
    name: 'Sagar Jadhav',
    role: 'Lead Matchmove Artist',
    skills: ['3D Tracking', 'Camera Solving', 'Object Tracking', 'PFTrack'],
  },
  {
    name: 'Prashanth S.K',
    role: 'Lead Motion Graphics Artist',
    skills: ['After Effects', 'Motion Design', 'Typography', 'Broadcast Graphics'],
  },
  {
    name: 'Yogesh Achar',
    role: 'Lead 3D Modeling & Texturing Artist',
    skills: ['Maya', 'ZBrush', 'Substance Painter', 'Hard Surface Modeling'],
  },
  {
    name: 'Rahul',
    role: 'Lead Video Editor',
    skills: ['Premiere Pro', 'DaVinci Resolve', 'Color Grading', 'Offline Editing'],
  }
];

const extendedTeam = [
  {
    name: 'Ranjith',
    role: 'Investor & Business Development Partner',
    bio: 'Strategic investor providing business guidance and industry connections.',
  }
];

const TeamPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Our Team | Fuke's Media - Industry Leaders in AI-Driven VFX</title>
        <meta name="description" content="Meet the creative and technical experts behind Fuke's Media, pushing the boundaries of VFX with artificial intelligence." />
      </Helmet>
      
      <main className="pt-24 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle 
                title="Leadership Team" 
                subtitle="The visionaries and partners behind Fuke's Media LLP"
                accent="primary"
              />
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
              >
                {foundingTeam.map((member, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <TeamMemberCard {...member} />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Core Team Section */}
              <div className="mt-20">
                <h3 className="text-3xl font-display font-bold text-center mb-4">Core Team</h3>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Our specialized artists bringing technical excellence to every project
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coreTeam.map((member, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                    >
                      <h4 className="font-display font-bold text-lg mb-2">{member.name}</h4>
                      <p className="text-primary text-sm mb-3">{member.role}</p>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Extended Team & Partners */}
              <div className="mt-16 bg-muted/20 rounded-lg p-8">
                <h3 className="text-2xl font-display font-bold text-center mb-8">Extended Team & Partners</h3>
                <div className="max-w-2xl mx-auto space-y-4">
                  {extendedTeam.map((member, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-4">
                      <h4 className="font-bold">{member.name}</h4>
                      <p className="text-sm text-secondary mb-1">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-20 max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg p-8 border border-primary/30">
                  <h3 className="text-3xl font-display font-bold mb-4 text-center">Join Our Team</h3>
                  <p className="text-center text-lg mb-6">
                    We're always looking for talented individuals who are passionate about pushing the boundaries of visual effects and technology.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/careers" 
                      className="px-8 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold text-center"
                    >
                      View Open Positions
                    </a>
                    <a 
                      href="/freelancer-portal" 
                      className="px-8 py-4 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors font-semibold text-center"
                    >
                      Freelancer Portal
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeamPage;
