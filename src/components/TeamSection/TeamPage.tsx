
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '@/components/SectionTitle';
import { Card } from '@/components/ui/card';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Aditya Shah",
    role: "Founder & Creative Director",
    bio: "With over 15 years in VFX, Aditya has worked on major Hollywood and Bollywood productions, pioneering the integration of AI into the VFX workflow.",
    image: "/lovable-uploads/4fc704b5-1f46-4dc1-855e-a6fae9184910.png",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "AI Technology Lead",
    bio: "Harvard CS graduate specialized in deep learning for visual effects. Leading our R&D efforts in neural rendering and generative VFX.",
    image: "/lovable-uploads/7aa001b2-00ae-4aed-9551-897de83da325.png",
    social: {
      linkedin: "https://linkedin.com",
      website: "https://example.com"
    }
  },
  {
    id: 3,
    name: "David Kim",
    role: "Technical Director",
    bio: "Former ILM and Weta Digital veteran with credits on major franchise films. Expert in pipeline development and production efficiency.",
    image: "/lovable-uploads/4ea8b97d-d1e3-4753-a973-13cc19993e16.png",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: 4,
    name: "Sofia Rodriguez",
    role: "Client Success Manager",
    bio: "Sofia ensures smooth project delivery and client satisfaction. Her background in production management brings structure to our processes.",
    image: "/lovable-uploads/f26d960c-bb81-4fa5-8f55-4dcf0102e774.png",
    social: {
      linkedin: "https://linkedin.com"
    }
  }
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Our Team | Fuke's Media - VFX & Creative Experts</title>
        <meta name="description" content="Meet the talented team behind Fuke's Media, leading experts in AI-driven VFX and creative technology." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle 
                title="Our Team" 
                subtitle="Meet the talent and expertise behind Fuke's Media"
                accent="primary"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {teamMembers.map((member) => (
                  <motion.div 
                    key={member.id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="glass-card overflow-hidden h-full flex flex-col">
                      <div className="relative overflow-hidden aspect-square">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                      </div>
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
                        <p className="text-muted-foreground text-sm">{member.bio}</p>
                      </div>
                      <div className="p-6 pt-0 flex gap-4">
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.website && (
                          <a href={member.social.website} className="text-muted-foreground hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10 12c0 .685-.07 1.354-.202 2h-3.853c.121-1.283.129-2.621 0-4h3.853c.132.646.202 1.315.202 2zm-.84-6h-3.262c-.749-2.057-1.714-3.22-2.898-3.696 2.531.759 4.632 2.582 6.16 5.696zm-6.296 6c.163 1.281.193 2.622 0 4h-5.728c-.193-1.388-.163-2.716 0-4h5.728zm-.84-6h-4.044c.688-1.61 1.504-3.087 2.44-3.784.936.697 1.75 2.174 2.439 3.784zm-5.304 10h4.044c-.688 1.61-1.503 3.088-2.439 3.784-.936-.696-1.75-2.174-2.44-3.784zm-4.696-10c1.529-3.114 3.63-4.937 6.161-5.696-1.184.477-2.149 1.64-2.898 3.696h-3.263zm3.262 10h-3.262c-2.057-3.98-2.044-5.849 0-10h3.262c-1.377 3.158-1.39 6.772 0 10zm.641 6c2.531-.759 4.632-2.582 6.16-5.696h-3.262c-.749 2.057-1.714 3.22-2.898 3.696zm7.555-2h3.853c-1.118 3.112-3.462 5.574-6.551 6.727 1.31-.942 2.3-3.281 2.698-6.727zm3.572-2h-3.853c1.377-3.158 1.39-6.772 0-10h3.853c.838 1.515 1.317 3.254 1.317 5s-.479 3.485-1.317 5zm-1.5-12h-3.572c-.396-3.39-1.378-5.808-2.697-6.727 3.088 1.153 5.433 3.615 6.269 6.727zm-16.128 0c.838-3.112 3.181-5.574 6.27-6.727-1.318.92-2.299 3.337-2.697 6.727h-3.573zm-1.316 2c-.132.646-.202 1.315-.202 2s.07 1.354.202 2h3.853c-.121-1.283-.129-2.621 0-4h-3.853zm1.317 10h3.572c.396 3.39 1.378 5.808 2.697 6.727-3.088-1.153-5.433-3.615-6.269-6.727z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-16 bg-muted/10 p-8 rounded-xl max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
                <p className="text-muted-foreground mb-6">
                  We're always looking for talented individuals to join our team and help shape the future of AI-driven VFX.
                </p>
                <a href="/careers" className="gradient-button inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  View Open Positions
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TeamPage;
