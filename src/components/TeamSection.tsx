
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/SectionTitle';
import FadeInOnScroll from '@/components/FadeInOnScroll';
import { ArrowRight, Linkedin, Mail, Phone } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  brandColor: string;
  social?: {
    linkedin?: string;
    email?: string;
    phone?: string;
  };
}

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Updated team members with Vignesh removed and brand colors added
  const teamMembers: TeamMember[] = [
    {
      name: 'Vikram',
      role: 'Project Management',
      bio: 'With extensive experience in VFX project coordination, Vikram ensures that all our projects are delivered on time and within budget. His exceptional organizational skills and attention to detail help maintain the highest standards of quality.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram&backgroundColor=0057B7&clothingColor=D50032&gender=male&hair=short01,short02,short03&facialHair=blank,light&accessories=blank',
      brandColor: 'bg-[#0057B7]',
      social: {
        linkedin: 'https://linkedin.com/in/vikram',
        email: 'vikram@fukesmedia.com'
      }
    },
    {
      name: 'Arjun',
      role: 'Production Head',
      bio: 'As our Production Head, Arjun oversees all creative and technical aspects of our VFX productions. With his background in both film and technology, he bridges the gap between creative vision and technical execution.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=D50032&clothingColor=0057B7&gender=male&hair=short04,short05,short06&facialHair=blank,light&accessories=blank',
      brandColor: 'bg-[#D50032]',
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
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harshith&backgroundColor=009639&clothingColor=FFCC00&gender=male&hair=short10,short11,short12&facialHair=blank,light&accessories=blank',
      brandColor: 'bg-[#009639]',
      social: {
        linkedin: 'https://linkedin.com/in/harshith',
        email: 'harshith@fukesmedia.com'
      }
    },
    {
      name: 'Sai Prasad',
      role: 'Operational Manager',
      bio: 'Sai Prasad optimizes our workflow processes and resource allocation. His systematic approach to operations ensures smooth collaboration between departments and maximizes productivity across all projects.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SaiPrasad&backgroundColor=00BFFF&clothingColor=D50032&gender=male&hair=short13,short14,short15&facialHair=blank,light&accessories=blank',
      brandColor: 'bg-[#00BFFF]',
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
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sandesh&backgroundColor=FFCC00&clothingColor=009639&gender=male&hair=short16,short17,short18&facialHair=blank,light&accessories=blank',
      brandColor: 'bg-[#FFCC00]',
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
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
                  <div className={`w-32 h-32 rounded-full overflow-hidden mb-6 border-4 ${member.brandColor} border-opacity-30 shadow-lg relative`}>
                    <img 
                      src={member.image} 
                      alt={`${member.name}, ${member.role}`} 
                      className="w-full h-full object-cover"
                      loading="lazy" 
                    />
                    <div className={`absolute inset-0 ${member.brandColor} opacity-10 rounded-full`}></div>
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
