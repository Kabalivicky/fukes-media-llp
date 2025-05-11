
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '@/components/SectionTitle';
import TeamMemberCard from './TeamMemberCard';

// Updated team member data with proper names and images
const teamMembers = [
  {
    name: 'Vikram Arjun',
    role: 'Founder & Creative Director',
    bio: 'With over 15 years in VFX, Vikram combines technical expertise with artistic vision to lead our creative direction across all projects.',
    skills: ['Creative Direction', 'VFX Supervision', 'AI Integration', 'Team Leadership'],
    email: 'vikram@fukes-media.com',
    linkedin: 'https://linkedin.com/in/vikramarjun',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VikramArjun&backgroundColor=0057B7&clothingColor=D50032'
  },
  {
    name: 'Harshith',
    role: 'Technical Director',
    bio: 'Harshith oversees all technical aspects of our productions, ensuring cutting-edge implementation of both traditional and AI-driven VFX solutions.',
    skills: ['Pipeline Development', 'Technical Direction', 'Programming', 'R&D'],
    email: 'harshith@fukes-media.com',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harshith&backgroundColor=009639&clothingColor=FFCC00'
  },
  {
    name: 'Vignesh',
    role: 'Lead AI Researcher',
    bio: 'Vignesh leads our AI research division, developing proprietary algorithms that power our next-generation visual effects tools.',
    skills: ['Machine Learning', 'Neural Networks', 'Computer Vision', 'Research'],
    email: 'vignesh@fukes-media.com',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vignesh&backgroundColor=D50032&clothingColor=0057B7'
  },
  {
    name: 'Sai Prasad',
    role: 'Production Manager',
    bio: 'Sai Prasad ensures all projects run smoothly from inception to delivery, coordinating resources and maintaining our high quality standards.',
    skills: ['Project Management', 'Resource Allocation', 'Client Relations', 'Quality Control'],
    email: 'saiprasad@fukes-media.com',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SaiPrasad&backgroundColor=00BFFF&clothingColor=D50032'
  },
  {
    name: 'Sandesh',
    role: 'Senior VFX Artist',
    bio: 'Sandesh brings over a decade of experience in high-end visual effects for feature films and streaming content.',
    skills: ['Compositing', 'Lighting', 'Texturing', 'Simulation'],
    email: 'sandesh@fukes-media.com',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sandesh&backgroundColor=0057B7&clothingColor=009639'
  },
  {
    name: 'Arjun',
    role: 'UI/UX Designer',
    bio: 'Arjun crafts intuitive user experiences for our software products and client-facing platforms, focusing on accessibility and elegant design.',
    skills: ['Interface Design', 'User Testing', 'Prototyping', 'Visual Design'],
    email: 'arjun@fukes-media.com',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=FFCC00&clothingColor=009639'
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
                title="Meet Our Team" 
                subtitle="The creative minds and technical experts behind Fuke's Media"
                accent="primary"
              />
              
              <div className="max-w-4xl mx-auto mb-16 text-center">
                <p className="text-lg text-muted-foreground">
                  Our diverse team combines decades of industry experience with cutting-edge technical expertise.
                  Together, we're redefining what's possible in visual effects and creative media.
                </p>
              </div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
              >
                {teamMembers.map((member, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <TeamMemberCard {...member} />
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-20 max-w-4xl mx-auto">
                <div className="bg-muted/20 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-center">Join Our Team</h3>
                  <p className="text-center mb-6">
                    We're always looking for talented individuals who are passionate about pushing the boundaries of visual effects and technology.
                  </p>
                  <div className="flex justify-center">
                    <a 
                      href="/#careers" 
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      View Open Positions
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
