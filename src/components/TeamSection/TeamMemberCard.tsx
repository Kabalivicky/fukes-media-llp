
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  skills?: string[];
  email?: string;
  linkedin?: string;
  brandColor?: string;
  designation?: string;
}

const TeamMemberCard = ({ name, role, bio, skills = [], email, linkedin, brandColor = '#0057B7' }: TeamMemberProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full glass-card overflow-hidden">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center space-x-4 mb-4">
            <div 
              className="h-16 w-16 rounded-full flex items-center justify-center text-white font-bold relative"
              style={{ backgroundColor: brandColor }}
            >
              <User className="h-8 w-8" />
              <div className="absolute bottom-0 right-0 text-xs font-bold bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">
                {initials}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
          
          {bio && <p className="text-sm text-muted-foreground mb-4 flex-grow">{bio}</p>}
          
          {skills.length > 0 && (
            <div className="mt-auto">
              <p className="text-xs font-medium mb-2">Key Skills:</p>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: brandColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {(email || linkedin) && (
            <div className="flex gap-2 mt-4">
              {email && (
                <a 
                  href={`mailto:${email}`} 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              )}
              {linkedin && (
                <a 
                  href={linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamMemberCard;
