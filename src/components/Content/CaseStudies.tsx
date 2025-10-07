
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Play, Clock, Users, Award } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  video: string;
  duration: string;
  team: number;
  budget: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  awards: string[];
  technologies: string[];
}

const CaseStudies = () => {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'film', name: 'Film & TV' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'vr', name: 'VR/AR' }
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'Epic Space Battle Sequence',
      client: 'Major Studio Production',
      category: 'film',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      video: 'https://example.com/video1.mp4',
      duration: '6 months',
      team: 25,
      budget: '$2.5M',
      challenges: [
        'Complex space ship dynamics',
        'Realistic explosion effects',
        'Large-scale environment creation'
      ],
      solutions: [
        'Custom physics simulation system',
        'Advanced particle systems',
        'Procedural space environment generation'
      ],
      results: [
        '150+ VFX shots delivered',
        '99% client satisfaction',
        'Zero delivery delays'
      ],
      awards: ['VFX Society Award', 'Technical Achievement Award'],
      technologies: ['Houdini', 'Maya', 'Nuke', 'Custom Tools']
    },
    {
      id: '2',
      title: 'Fantasy Creature Animation',
      client: 'Streaming Platform Original',
      category: 'film',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      video: 'https://example.com/video2.mp4',
      duration: '4 months',
      team: 18,
      budget: '$1.8M',
      challenges: [
        'Photorealistic creature design',
        'Complex fur simulation',
        'Seamless integration with live action'
      ],
      solutions: [
        'AI-assisted creature modeling',
        'Advanced hair/fur pipeline',
        'Real-time lighting match'
      ],
      results: [
        '85 creature shots completed',
        'Emmy nomination',
        'Viral social media response'
      ],
      awards: ['Emmy Nomination', 'Animation Guild Award'],
      technologies: ['ZBrush', 'Maya', 'Arnold', 'Mari']
    },
    {
      id: '3',
      title: 'Virtual Product Launch',
      client: 'Fortune 500 Tech Company',
      category: 'commercial',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
      video: 'https://example.com/video3.mp4',
      duration: '2 months',
      team: 12,
      budget: '$800K',
      challenges: [
        'Real-time rendering requirements',
        'Interactive product visualization',
        'Multi-platform deployment'
      ],
      solutions: [
        'Unreal Engine real-time pipeline',
        'Interactive UI/UX design',
        'Cloud-based streaming solution'
      ],
      results: [
        '500K+ virtual attendees',
        '40% increase in pre-orders',
        'Industry benchmark set'
      ],
      awards: ['Digital Marketing Award'],
      technologies: ['Unreal Engine', 'WebGL', 'Cloud Rendering']
    }
  ];

  const filteredStudies = activeCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeCategory);

  const handleViewDetails = (study: CaseStudy) => {
    setSelectedStudy(study);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 gradient-text">Case Studies</h2>
        <p className="text-muted-foreground mb-8">
          Explore our successful projects and the innovative solutions we delivered
        </p>
      </motion.div>

      {/* Category Filter */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudies.map((study) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img
                  src={study.thumbnail}
                  alt={study.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => handleViewDetails(study)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
                <Badge className="absolute top-2 left-2" variant="secondary">
                  {study.category}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{study.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{study.client}</p>
                
                <div className="flex justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {study.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {study.team} team members
                  </div>
                </div>
                
                {study.awards.length > 0 && (
                  <div className="flex items-center gap-1 mb-3">
                    <Award className="h-3 w-3 text-primary" />
                    <span className="text-xs">{study.awards[0]}</span>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1">
                  {study.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {study.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{study.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedStudy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedStudy(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{selectedStudy.title}</CardTitle>
                    <CardDescription className="text-lg">{selectedStudy.client}</CardDescription>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedStudy(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <img
                  src={selectedStudy.thumbnail}
                  alt={selectedStudy.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Challenges</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedStudy.challenges.map((challenge, index) => (
                        <li key={index}>• {challenge}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Solutions</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedStudy.solutions.map((solution, index) => (
                        <li key={index}>• {solution}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Results</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedStudy.results.map((result, index) => (
                        <li key={index}>• {result}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Budget: {selectedStudy.budget}</Badge>
                  <Badge variant="outline">Duration: {selectedStudy.duration}</Badge>
                  <Badge variant="outline">Team: {selectedStudy.team} members</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CaseStudies;
