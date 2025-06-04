
import SectionTitle from '@/components/SectionTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, BriefcaseBusiness, ArrowRight, MapPin, DollarSign, Clock } from 'lucide-react';

const careerRoutes = [
  {
    id: 'production',
    name: 'Production',
    description: 'Roles focused on managing the VFX production process',
    color: 'bg-green-500/20 text-green-500',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    positions: [
      {
        title: 'VFX Producer',
        level: 'Senior',
        location: 'Bangalore, India',
        type: 'Full-time',
        salary: '₹20,000-30,000/month',
        experience: '5-8 years',
      },
      {
        title: 'Production Coordinator',
        level: 'Mid-level',
        location: 'Remote',
        type: 'Contract',
        salary: '₹15,000-20,000/month',
        experience: '2-4 years',
      },
      {
        title: 'Production Runner',
        level: 'Entry-level',
        location: 'Bangalore, India',
        type: 'Full-time',
        salary: '₹10,000-15,000/month',
        experience: '0-1 years',
      }
    ]
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic and design-focused roles in our studio',
    color: 'bg-purple-500/20 text-purple-500',
    icon: <BookOpen className="h-5 w-5" />,
    positions: [
      {
        title: 'Concept Artist',
        level: 'Senior',
        location: 'Remote',
        type: 'Freelance',
        salary: '₹30-50/frame',
        experience: '4-6 years',
      },
      {
        title: 'Storyboard Artist',
        level: 'Mid-level',
        location: 'Bangalore, India',
        type: 'Full-time',
        salary: '₹18,000-25,000/month',
        experience: '2-4 years',
      },
      {
        title: 'Junior Compositor',
        level: 'Entry-level',
        location: 'Bangalore, India',
        type: 'Full-time',
        salary: '₹12,000-18,000/month',
        experience: '0-2 years',
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Technical roles focused on VFX pipeline and technology',
    color: 'bg-blue-500/20 text-blue-500',
    icon: <Search className="h-5 w-5" />,
    positions: [
      {
        title: 'Pipeline Technical Director',
        level: 'Senior',
        location: 'Bangalore, India',
        type: 'Full-time',
        salary: '₹25,000-35,000/month',
        experience: '5-8 years',
      },
      {
        title: 'Software Developer',
        level: 'Mid-level',
        location: 'Remote',
        type: 'Full-time',
        salary: '₹20,000-30,000/month',
        experience: '3-5 years',
      },
      {
        title: 'Roto Artist',
        level: 'Entry-level',
        location: 'Bangalore, India',
        type: 'Freelance',
        salary: '₹30-50/frame',
        experience: '0-2 years',
      }
    ]
  }
];

const CareersSection = () => {
  return (
    <section id="careers" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Careers" 
          subtitle="Join our team and be part of the revolution in digital media"
        />
        
        <div className="mb-12 mt-8">
          <Card className="border border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Fuke's Media Approach</CardTitle>
              <CardDescription>
                Our flexible working models and compensation structure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center">
                  <Badge variant="outline" className="mr-2 bg-primary/20 text-primary">Freelancers</Badge>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Paid per project or shot (typically ₹30-50 per frame for services like rotoscoping)
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center">
                  <Badge variant="outline" className="mr-2 bg-secondary/20 text-secondary">Contract Employees</Badge>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Fixed monthly salaries ranging from ₹20,000-30,000 based on experience and role
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center">
                  <Badge variant="outline" className="mr-2 bg-accent/20 text-accent">Part-Time Contributors</Badge>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Paid based on hours worked or tasks completed with flexible scheduling
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More About Working With Us
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Current Openings</h3>
          
          <Tabs defaultValue="production" className="w-full">
            <TabsList className="grid w-full md:w-fit mx-auto grid-cols-1 md:grid-cols-3 gap-2">
              {careerRoutes.map(route => (
                <TabsTrigger
                  key={route.id}
                  value={route.id}
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
                >
                  <div className="flex items-center">
                    {route.icon}
                    <span className="ml-2">{route.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {careerRoutes.map(route => (
              <TabsContent key={route.id} value={route.id} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {route.positions.map((position, index) => (
                    <Card key={index} className="border border-border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className={route.color}>{position.level}</Badge>
                            <CardTitle className="mt-2">{position.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <BriefcaseBusiness className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{position.type}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{position.salary}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{position.experience} experience</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="default" className="w-full">
                          Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg">
              View All Open Positions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
