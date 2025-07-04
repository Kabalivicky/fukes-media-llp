
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/SectionTitle';
import FadeInOnScroll from '@/components/FadeInOnScroll';
import { ArrowRight, Linkedin, Mail, Phone, User } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  brandColor: string;
  initials: string;
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
      brandColor: '#0057B7',
      initials: 'VA',
      social: {
        linkedin: 'https://linkedin.com/in/vikram',
        email: 'vikram@fukesmedia.com'
      }
    },
    {
      name: 'Arjun',
      role: 'Production Head',
      bio: 'As our Production Head, Arjun oversees all creative and technical aspects of our VFX productions. With his background in both film and technology, he bridges the gap between creative vision and technical execution.',
      brandColor: '#D50032',
      initials: 'AR',
      social: {
        linkedin: 'https://linkedin.com/in/arjun',
        email: 'arjun@fukesmedia.com',
        phone: '+91 98765 43210'
      }
    },
    {
      name: 'Harshith',
      role: 'Creative Director',
      bio: 'Harshith brings creative vision and artistic excellence to our projects. With a keen eye for visual storytelling, he ensures all VFX elements enhance the narrative while maintaining the highest aesthetic standards.',
      brandColor: '#009639',
      initials: 'HA',
      social: {
        linkedin: 'https://linkedin.com/in/harshith',
        email: 'harshith@fukesmedia.com'
      }
    },
    {
      name: 'Sai Prasad',
      role: 'Operational Manager',
      bio: 'Sai Prasad optimizes our workflow processes and resource allocation. His systematic approach to operations ensures smooth collaboration between departments and maximizes productivity across all projects.',
      brandColor: '#00BFFF',
      initials: 'SP',
      social: {
        linkedin: 'https://linkedin.com/in/saiprasad',
        email: 'saiprasad@fukesmedia.com',
        phone: '+91 97654 32109'
      }
    },
    {
      name: 'Sandesh',
      role: 'Accounts & Financial Head',
      bio: 'Sandesh manages our financial planning and reporting with precision. His expertise in budgeting for VFX productions helps us deliver exceptional results while maintaining financial efficiency.',
      brandColor: '#FFCC00',
      initials: 'SA',
      social: {
        linkedin: 'https://linkedin.com/in/sandesh',
        email: 'sandesh@fukesmedia.com'
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
                className={`glass rounded-xl p-8 transition-all duration-300 cursor-pointer ${
                  activeIndex === index ? 'scale-105 shadow-lg' : 'hover:scale-102'
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
                    className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 shadow-lg relative flex items-center justify-center text-white font-bold text-2xl"
                    style={{ 
                      backgroundColor: member.brandColor,
                      borderColor: `${member.brandColor}30`
                    }}
                  >
                    <User className="w-12 h-12" />
                    <div className="absolute bottom-2 right-2 text-xs font-bold">
                      {member.initials}
                    </div>
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
