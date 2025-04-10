
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/SectionTitle';
import { ArrowRight, LinkedIn, Mail, Phone } from 'lucide-react';

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
      image: '/placeholder.svg',
      social: {
        linkedin: 'https://linkedin.com/in/vikram',
        email: 'vikram@company.com'
      }
    },
    {
      name: 'Arjun',
      role: 'Production Head',
      bio: 'As our Production Head, Arjun oversees all creative and technical aspects of our VFX productions. With his background in both film and technology, he bridges the gap between creative vision and technical execution.',
      image: '/placeholder.svg',
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
      image: '/placeholder.svg',
      social: {
        linkedin: 'https://linkedin.com/in/vignesh',
        email: 'vignesh@company.com'
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
                        <LinkedIn size={18} />
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
