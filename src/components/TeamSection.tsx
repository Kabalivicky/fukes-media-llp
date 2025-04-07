
import { useState } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Radar } from 'recharts';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { Linkedin, Twitter, Mail, ChevronDown, Users } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Vikram',
    role: 'Creative Director & Partner',
    image: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Vikram&backgroundColor=b6e3f4',
    bio: 'Vikram leads our creative vision and strategy, with over 15 years of experience in VFX and digital media production.',
    profitShare: '25%',
    responsibilities: 'Creative direction, client relations, team leadership',
    skills: [
      { subject: 'Creative Direction', A: 90, fullMark: 100 },
      { subject: 'Project Management', A: 75, fullMark: 100 },
      { subject: 'Client Relations', A: 85, fullMark: 100 },
      { subject: 'Technical Knowledge', A: 70, fullMark: 100 },
      { subject: 'Team Leadership', A: 95, fullMark: 100 },
    ]
  },
  {
    id: 2,
    name: 'Arjun',
    role: 'Technical Director & Partner',
    image: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Arjun&backgroundColor=c8f7c5',
    bio: 'Arjun oversees all technical aspects of our productions, specializing in pipeline development and technical innovation.',
    profitShare: '25%',
    responsibilities: 'Pipeline development, technical direction, R&D leadership',
    skills: [
      { subject: 'Technical Direction', A: 95, fullMark: 100 },
      { subject: 'Pipeline Development', A: 90, fullMark: 100 },
      { subject: 'R&D', A: 85, fullMark: 100 },
      { subject: 'Problem Solving', A: 90, fullMark: 100 },
      { subject: 'Team Coordination', A: 75, fullMark: 100 },
    ]
  },
  {
    id: 3,
    name: 'Harshith',
    role: 'Operations Director & Partner',
    image: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Harshith&backgroundColor=f7d9c4',
    bio: 'Harshith manages all operational aspects of Fuke\'s Media, ensuring smooth workflow, resource allocation and project delivery.',
    profitShare: '20%',
    responsibilities: 'Operations management, resource allocation, workflow optimization',
    skills: [
      { subject: 'Operations', A: 95, fullMark: 100 },
      { subject: 'Resource Management', A: 90, fullMark: 100 },
      { subject: 'Finance', A: 85, fullMark: 100 },
      { subject: 'Workflow Optimization', A: 80, fullMark: 100 },
      { subject: 'Strategic Planning', A: 85, fullMark: 100 },
    ]
  },
  {
    id: 4,
    name: 'Sai',
    role: 'Business Development & Partner',
    image: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Sai&backgroundColor=d4c4f7',
    bio: 'Sai leads our business development efforts, building industry relationships and identifying strategic growth opportunities.',
    profitShare: '15%',
    responsibilities: 'Business development, marketing, client acquisition',
    skills: [
      { subject: 'Business Development', A: 90, fullMark: 100 },
      { subject: 'Marketing', A: 85, fullMark: 100 },
      { subject: 'Networking', A: 95, fullMark: 100 },
      { subject: 'Sales', A: 90, fullMark: 100 },
      { subject: 'Industry Knowledge', A: 80, fullMark: 100 },
    ]
  },
  {
    id: 5,
    name: 'Vignesh',
    role: 'Financial Director & Partner',
    image: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Vignesh&backgroundColor=f7c4e9',
    bio: 'Vignesh oversees all financial aspects of Fuke\'s Media, from budgeting and cost management to investor relations.',
    profitShare: '15%',
    responsibilities: 'Financial management, budgeting, investor relations',
    skills: [
      { subject: 'Financial Management', A: 95, fullMark: 100 },
      { subject: 'Budgeting', A: 90, fullMark: 100 },
      { subject: 'Investor Relations', A: 85, fullMark: 100 },
      { subject: 'Risk Management', A: 80, fullMark: 100 },
      { subject: 'Strategic Planning', A: 75, fullMark: 100 },
    ]
  }
];

const TeamSection = () => {
  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Team" 
          subtitle="Meet the partners behind Fuke's Media and their expertise"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="group">
            <Users className="mr-2 h-5 w-5" />
            View All Team Members 
            <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:-rotate-180" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const TeamMemberCard = ({ member }: { member: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="overflow-hidden border border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group card-3d">
      <CardContent className="p-6">
        <div className="flex items-center flex-col text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-primary/50 p-1">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-primary mb-3">{member.role}</p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {member.bio}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-3 p-6 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">View Profile</Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{member.name}</DialogTitle>
              <DialogDescription>{member.role}</DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 grid gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/50 p-1 shrink-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">About</h4>
                  <p className="text-muted-foreground">{member.bio}</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <h5 className="text-sm font-medium">Profit Share</h5>
                      <p className="text-foreground">{member.profitShare}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Responsibilities</h5>
                      <p className="text-foreground">{member.responsibilities}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Skill Matrix</h4>
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={member.skills}>
                      <PolarGrid stroke="rgba(255,255,255,0.2)" />
                      <PolarAngleAxis dataKey="subject" 
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} 
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} 
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} 
                      />
                      <Radar 
                        name="Skills" 
                        dataKey="A" 
                        stroke="rgba(139, 92, 246, 1)" 
                        fill="rgba(139, 92, 246, 0.6)" 
                        fillOpacity={0.6} 
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="flex justify-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TeamSection;
