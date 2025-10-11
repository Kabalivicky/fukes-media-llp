import { PlayCircle, FileText, Video, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const tutorials = [
  {
    title: 'Getting Started with Fuke\'s Media',
    description: 'A comprehensive guide to working with our studio, from project submission to final delivery.',
    duration: '15 min read',
    type: 'article',
    icon: FileText,
    link: '#'
  },
  {
    title: 'How to Prepare Files for VFX Production',
    description: 'Best practices for file preparation, naming conventions, and technical specifications.',
    duration: '8 min read',
    type: 'article',
    icon: FileText,
    link: '#'
  },
  {
    title: 'Using Our Pricing Calculator',
    description: 'Step-by-step guide to getting accurate project estimates using our advanced calculator.',
    duration: '5 min video',
    type: 'video',
    icon: Video,
    link: '/advanced-pricing'
  },
  {
    title: 'Understanding Our Production Pipeline',
    description: 'Learn about our workflow from pre-production to final delivery and quality control.',
    duration: '12 min read',
    type: 'article',
    icon: FileText,
    link: '#'
  },
  {
    title: 'AI Tools Integration Guide',
    description: 'How we leverage AI in VFX production and how it benefits your project.',
    duration: '10 min video',
    type: 'video',
    icon: Video,
    link: '/ai-tools'
  },
  {
    title: 'API Documentation',
    description: 'For developers: integrate with our services programmatically.',
    duration: '20 min read',
    type: 'code',
    icon: Code,
    link: '#'
  }
];

const TutorialsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials.map((tutorial, index) => {
        const Icon = tutorial.icon;
        return (
          <Card key={index} className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Icon className="h-8 w-8 text-primary mb-2" />
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {tutorial.duration}
                </span>
              </div>
              <CardTitle className="text-lg">{tutorial.title}</CardTitle>
              <CardDescription>{tutorial.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={tutorial.link}
                className="text-sm text-primary hover:underline font-semibold"
              >
                {tutorial.type === 'video' ? 'Watch Tutorial' : 
                 tutorial.type === 'code' ? 'View Documentation' : 'Read More'} →
              </a>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TutorialsSection;
