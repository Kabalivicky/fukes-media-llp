
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  skills?: string[];
  email?: string;
  linkedin?: string;
}

const TeamMemberCard = ({ name, role, bio, imageUrl, skills = [], email, linkedin }: TeamMemberProps) => {
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
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              {imageUrl ? (
                <AvatarImage src={imageUrl} alt={name} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{bio}</p>
          
          {skills.length > 0 && (
            <div className="mt-auto">
              <p className="text-xs font-medium mb-2">Key Skills:</p>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
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
