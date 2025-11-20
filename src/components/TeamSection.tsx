
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/SectionTitle';
import FadeInOnScroll from '@/components/FadeInOnScroll';
import { ArrowRight, Linkedin, Mail, Phone } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  brandColor: string;
  initials: string;
  imageUrl: string;
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
      name: 'Vikram A',
      role: 'Project Management',
      bio: '',
      brandColor: '#0071CE',
      initials: 'VA',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram&backgroundColor=0071CE',
      social: {
        linkedin: 'https://www.linkedin.com/company/fukesmedia/',
        email: 'contact@fukesmedia.com'
      }
    },
    {
      name: 'Arjun R',
      role: 'Production Head',
      bio: '',
      brandColor: '#BE1E2D',
      initials: 'AR',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=BE1E2D',
      social: {
        linkedin: 'https://www.linkedin.com/company/fukesmedia/',
        email: 'contact@fukesmedia.com'
      }
    },
    {
      name: 'Harshith Kulai',
      role: 'Creative Director',
      bio: '',
      brandColor: '#00A641',
      initials: 'HA',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harshith&backgroundColor=00A641',
      social: {
        linkedin: 'https://www.linkedin.com/company/fukesmedia/',
        email: 'contact@fukesmedia.com'
      }
    },
    {
      name: 'Sai Prasad V',
      role: 'Operational Manager',
      bio: '',
      brandColor: '#00BFFF',
      initials: 'SP',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SaiPrasad&backgroundColor=00BFFF',
      social: {
        linkedin: 'https://www.linkedin.com/company/fukesmedia/',
        email: 'contact@fukesmedia.com'
      }
    },
    {
      name: 'Sandesh Naik',
      role: 'Accounts & Financial Head',
      bio: '',
      brandColor: '#FFCC00',
      initials: 'SA',
      imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sandesh&backgroundColor=FFCC00',
      social: {
        linkedin: 'https://www.linkedin.com/company/fukesmedia/',
        email: 'contact@fukesmedia.com'
      }
    }
  ];

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="team" className="py-24" aria-labelledby="team-section-title">
      <div className="container mx-auto px-4">
        <FadeInOnScroll>
          <SectionTitle 
            title="Our Team" 
            subtitle="Meet the experts behind our exceptional VFX solutions" 
          />
          <div id="team-section-title" className="sr-only">Our Team</div>
        </FadeInOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <FadeInOnScroll key={index} delay={index * 100}>
              <div 
                className={`glass rounded-xl p-8 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl border-2 ${
                  activeIndex === index 
                    ? 'scale-105 shadow-2xl border-primary/50' 
                    : 'hover:scale-102 border-transparent hover:border-primary/20'
                }`}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={activeIndex === index}
                aria-controls={`member-bio-${index}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div 
                    className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 shadow-lg relative"
                    style={{ 
                      borderColor: `${member.brandColor}30`
                    }}
                  >
                    <img 
                      src={member.imageUrl} 
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  
                  <div 
                    id={`member-bio-${index}`}
                    className={`mt-2 transition-all duration-300 overflow-hidden ${
                      activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    
                    <div className="flex justify-center space-x-4 mt-4" role="list" aria-label="Contact options">
                      {member.social?.linkedin && (
                        <a 
                          href={member.social.linkedin} 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`${member.name}'s LinkedIn profile`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin size={18} aria-hidden="true" />
                        </a>
                      )}
                      {member.social?.email && (
                        <a 
                          href={`mailto:${member.social.email}`} 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail size={18} aria-hidden="true" />
                        </a>
                      )}
                      {member.social?.phone && (
                        <a 
                          href={`tel:${member.social.phone}`} 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`Call ${member.name}`}
                        >
                          <Phone size={18} aria-hidden="true" />
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
                    aria-label={`View ${member.name}'s profile`}
                  >
                    View Profile <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
