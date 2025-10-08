import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';
import SEOHelmet from '@/components/SEOHelmet';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Headset, 
  Monitor, 
  Cloud, 
  Zap, 
  Globe,
  Camera,
  Cpu,
  ArrowRight,
  Calendar,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UpcomingFeatures = () => {
  const upcomingFeatures = [
    {
      title: 'AR/VR Showroom',
      description: 'Immersive augmented and virtual reality experiences to showcase our VFX projects in a completely new dimension.',
      icon: Headset,
      status: 'In Development',
      estimatedLaunch: 'Q2 2025',
      highlights: [
        '360° project walkthroughs',
        'Interactive VFX demonstrations',
        'Virtual studio tours',
        'Real-time collaboration spaces'
      ],
      color: 'from-primary/20 to-secondary/20'
    },
    {
      title: 'Virtual Production Studio',
      description: 'State-of-the-art virtual production workflows combining real-time rendering with traditional filmmaking.',
      icon: Monitor,
      status: 'In Development',
      estimatedLaunch: 'Q3 2025',
      highlights: [
        'LED volume stages',
        'Real-time camera tracking',
        'In-camera VFX',
        'Live compositing'
      ],
      color: 'from-secondary/20 to-accent/20'
    },
    {
      title: 'Cloud Rendering in India',
      description: 'High-performance cloud rendering infrastructure located in India for faster, more cost-effective render solutions.',
      icon: Cloud,
      status: 'Planning Phase',
      estimatedLaunch: 'Q4 2025',
      highlights: [
        'Local data centers',
        'Reduced latency',
        'Competitive pricing',
        'Scalable render farm'
      ],
      color: 'from-accent/20 to-primary/20'
    },
    {
      title: 'AI-Powered Motion Capture',
      description: 'Revolutionary markerless motion capture using advanced AI and computer vision technology.',
      icon: Camera,
      status: 'Research Phase',
      estimatedLaunch: 'Q1 2026',
      highlights: [
        'No markers required',
        'Real-time processing',
        'Multi-actor support',
        'Facial performance capture'
      ],
      color: 'from-primary/20 to-accent/20'
    },
    {
      title: 'Neural Rendering Engine',
      description: 'Next-generation rendering powered by neural networks for photorealistic results in a fraction of the time.',
      icon: Cpu,
      status: 'Research Phase',
      estimatedLaunch: 'Q2 2026',
      highlights: [
        'AI-accelerated rendering',
        'Photorealistic quality',
        '10x faster renders',
        'Adaptive quality scaling'
      ],
      color: 'from-secondary/20 to-primary/20'
    },
    {
      title: 'Metaverse Studio Spaces',
      description: 'Persistent virtual spaces in the metaverse for collaborative VFX work and client presentations.',
      icon: Globe,
      status: 'Planning Phase',
      estimatedLaunch: 'Q3 2026',
      highlights: [
        'Virtual collaboration rooms',
        'Interactive presentations',
        'Cross-platform compatibility',
        'Persistent project spaces'
      ],
      color: 'from-accent/20 to-secondary/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development':
        return 'bg-secondary/20 text-secondary border-secondary/40';
      case 'Planning Phase':
        return 'bg-accent/20 text-accent border-accent/40';
      case 'Research Phase':
        return 'bg-primary/20 text-primary border-primary/40';
      default:
        return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  return (
    <MainLayout>
      <SEOHelmet
        title="Upcoming Features - Future Innovation at Fuke's Media"
        description="Explore the cutting-edge technologies and innovative features coming soon to Fuke's Media. From AR/VR showrooms to cloud rendering and AI-powered solutions."
        keywords="upcoming features, VFX innovation, virtual production, cloud rendering India, AR VR, metaverse, AI motion capture, Fuke's Media roadmap"
      />

      <div className="min-h-screen py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Rocket className="w-6 h-6 text-primary" />
              <Badge variant="outline" className="text-sm font-medium">
                Innovation Pipeline
              </Badge>
            </div>
            <SectionTitle
              title="Upcoming Features"
              subtitle="Pioneering the future of VFX and creative technology"
            />
            <p className="text-muted-foreground max-w-3xl mx-auto mt-6 leading-relaxed">
              At Fuke's Media, innovation never stops. Here's a glimpse into the groundbreaking
              technologies and features we're developing to revolutionize the VFX industry.
            </p>
          </motion.div>

          {/* Timeline Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <Zap className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-1">6</div>
                <p className="text-sm text-muted-foreground">Features in Pipeline</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <Calendar className="w-10 h-10 mx-auto mb-3 text-secondary" />
                <div className="text-3xl font-bold text-foreground mb-1">2025-2026</div>
                <p className="text-sm text-muted-foreground">Development Timeline</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="w-10 h-10 mx-auto mb-3 text-accent" />
                <div className="text-3xl font-bold text-foreground mb-1">50+</div>
                <p className="text-sm text-muted-foreground">Engineers Working</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {upcomingFeatures.map((feature, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-foreground" />
                      </div>
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Estimated Launch: <strong className="text-foreground">{feature.estimatedLaunch}</strong></span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Key Features:</p>
                      <ul className="space-y-1.5">
                        {feature.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-border/50 shadow-2xl">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Want to be the first to know when these features launch? Join our newsletter
                  or follow us on social media for exclusive updates and early access opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="shadow-lg hover:shadow-xl">
                      Get Early Access
                    </Button>
                  </Link>
                  <Link to="/news">
                    <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl">
                      Follow Our Progress
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UpcomingFeatures;
