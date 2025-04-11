
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/SectionTitle';
import { ArrowRight, Linkedin, Mail, Phone } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    email?: string;
    phone?: string;
  };
}

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const teamMembers: TeamMember[] = [
    {
      name: 'Vikram',
      role: 'Project Management',
      bio: 'With extensive experience in VFX project coordination, Vikram ensures that all our projects are delivered on time and within budget. His exceptional organizational skills and attention to detail help maintain the highest standards of quality.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram&backgroundColor=b6e3f4,c0aede,d1d4f9',
      social: {
        linkedin: 'https://linkedin.com/in/vikram',
        email: 'vikram@company.com'
      }
    },
    {
      name: 'Arjun',
      role: 'Production Head',
      bio: 'As our Production Head, Arjun oversees all creative and technical aspects of our VFX productions. With his background in both film and technology, he bridges the gap between creative vision and technical execution.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=b6e3f4,c0aede,d1d4f9',
      social: {
        linkedin: 'https://linkedin.com/in/arjun',
        email: 'arjun@company.com',
        phone: '+91 98765 43210'
      }
    },
    {
      name: 'Vignesh',
      role: 'Business Development',
      bio: 'Vignesh leads our business strategy and client relationships. His understanding of the VFX industry landscape helps us identify opportunities and build lasting partnerships with studios and production houses worldwide.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vignesh&backgroundColor=b6e3f4,c0aede,d1d4f9',
      social: {
        linkedin: 'https://linkedin.com/in/vignesh',
        email: 'vignesh@company.com'
      }
    },
    {
      name: 'Harshith',
      role: 'Creative Director',
      bio: 'Harshith brings creative vision and artistic excellence to our projects. With a keen eye for visual storytelling, he ensures all VFX elements enhance the narrative while maintaining the highest aesthetic standards.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harshith&backgroundColor=b6e3f4,c0aede,d1d4f9',
      social: {
        linkedin: 'https://linkedin.com/in/harshith',
        email: 'harshith@company.com'
      }
    },
    {
      name: 'Sai Prasad',
      role: 'Operational Manager',
      bio: 'Sai Prasad optimizes our workflow processes and resource allocation. His systematic approach to operations ensures smooth collaboration between departments and maximizes productivity across all projects.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SaiPrasad&backgroundColor=b6e3f4,c0aede,d1d4f9',
      social: {
        linkedin: 'https://linkedin.com/in/saiprasad',
        email: 'saiprasad@company.com',
        phone: '+91 97654 32109'
      }
    },
    {
      name: 'Sandesh',
      role: 'Accounts & Financial Head',
      bio: 'Sandesh manages our financial planning and reporting with precision. His expertise in budgeting for VFX productions helps us deliver exceptional results while maintaining financial efficiency.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sandesh&backgroundColor=b6e3f4,c0aede,d1d4f9',
      social: {
        linkedin: 'https://linkedin.com/in/sandesh',
        email: 'sandesh@company.com'
      }
    }
  ];

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="team" className="py-16">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Team" 
          subtitle="Meet the experts behind our exceptional VFX solutions" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={`glass rounded-xl p-6 transition-all duration-300 ${
                activeIndex === index ? 'scale-105 shadow-lg' : 'hover:scale-102'
              }`}
              onClick={() => handleClick(index)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
                
                <div className={`mt-4 transition-all duration-300 overflow-hidden ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-muted-foreground mb-4">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-4 mt-4">
                    {member.social?.linkedin && (
                      <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.social?.email && (
                      <a href={`mailto:${member.social.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                        <Mail size={18} />
                      </a>
                    )}
                    {member.social?.phone && (
                      <a href={`tel:${member.social.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                        <Phone size={18} />
                      </a>
                    )}
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`mt-4 transition-all duration-300 ${
                    activeIndex === index ? 'opacity-0' : 'opacity-100'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(index);
                  }}
                >
                  View Profile <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
