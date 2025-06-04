
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Eye, Check, Clock, Zap, GitBranch, Play } from 'lucide-react';
import SEOHelmet from '@/components/SEOHelmet';

const RealTimePipeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [simulationRunning, setSimulationRunning] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pipelineSteps = [
    {
      id: 'upload',
      title: 'Upload Brief',
      description: 'Submit project requirements and reference materials',
      icon: <Upload className="h-6 w-6" />,
      status: 'completed',
      duration: '2 min'
    },
    {
      id: 'preview',
      title: 'Real-time 3D Preview',
      description: 'AI generates initial scene layout and previews',
      icon: <Eye className="h-6 w-6" />,
      status: 'current',
      duration: '5 min'
    },
    {
      id: 'adjust',
      title: 'Collaborative Adjustments',
      description: 'Real-time editing and feedback integration',
      icon: <GitBranch className="h-6 w-6" />,
      status: 'pending',
      duration: '10 min'
    },
    {
      id: 'approve',
      title: 'Final Approval',
      description: 'Client approval and production kickoff',
      icon: <Check className="h-6 w-6" />,
      status: 'pending',
      duration: '3 min'
    }
  ];

  const features = [
    {
      title: 'Live Camera Tracking',
      description: 'Real-time camera movement synchronization',
      icon: <Eye className="h-5 w-5" />
    },
    {
      title: 'WebSocket Integration',
      description: 'Instant updates across all connected devices',
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: 'Timeline Simulation',
      description: 'Predictive project timeline and milestone tracking',
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const startSimulation = () => {
    setSimulationRunning(true);
    let step = 0;
    const interval = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step > pipelineSteps.length) {
        clearInterval(interval);
        setSimulationRunning(false);
        setActiveStep(0);
      }
    }, 2000);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Real-time VFX Pipeline",
    "description": "Visual workflow for VFX production with real-time previews and collaboration"
  };

  return (
    <>
      <SEOHelmet
        title="Real-time Pipeline - Fuke's Media"
        description="Experience our revolutionary real-time VFX pipeline with live previews, collaborative editing, and instant feedback integration."
        keywords="real-time VFX, pipeline visualization, live previews, collaborative editing, WebSocket, camera tracking"
        canonical="https://fukes-media.com/real-time-pipeline"
        structuredData={structuredData}
      />

      <MainLayout pageKey="real-time-pipeline">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle
                title="Real-time Pipeline"
                subtitle="Visual workflow of our revolutionary VFX production process"
              />

              <div className="mt-16">
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Pipeline Simulation</CardTitle>
                      <Button 
                        onClick={startSimulation}
                        disabled={simulationRunning}
                        className="gradient-button"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {simulationRunning ? 'Running...' : 'Start Demo'}
                      </Button>
                    </div>
                    <CardDescription>
                      Watch how our real-time pipeline transforms your brief into production-ready previews
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                  {pipelineSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className={`relative ${index < pipelineSteps.length - 1 ? 'lg:after:absolute lg:after:top-8 lg:after:left-full lg:after:w-6 lg:after:h-0.5 lg:after:bg-gradient-to-r lg:after:from-primary lg:after:to-muted lg:after:z-0' : ''}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: activeStep === index ? 1.05 : 1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Card className={`relative z-10 transition-all duration-300 ${
                        activeStep === index 
                          ? 'ring-2 ring-primary shadow-lg' 
                          : step.status === 'completed' 
                            ? 'bg-primary/5 border-primary/30' 
                            : ''
                      }`}>
                        <CardHeader className="text-center">
                          <div className={`mx-auto p-3 rounded-full w-fit transition-colors ${
                            activeStep === index 
                              ? 'bg-primary text-primary-foreground animate-pulse' 
                              : step.status === 'completed'
                                ? 'bg-primary/20 text-primary'
                                : 'bg-muted text-muted-foreground'
                          }`}>
                            {step.icon}
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {step.description}
                          </CardDescription>
                          <Badge 
                            variant={activeStep === index ? 'default' : 'secondary'}
                            className="w-fit mx-auto"
                          >
                            {step.duration}
                          </Badge>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Live Preview Window</CardTitle>
                      <CardDescription>
                        Real-time 3D scene generation and preview
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          {simulationRunning ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <Zap className="h-12 w-12 text-primary" />
                            </motion.div>
                          ) : (
                            <Eye className="h-12 w-12 text-muted-foreground" />
                          )}
                          <p className="mt-2 text-muted-foreground">
                            {simulationRunning ? 'Generating Preview...' : '3D Preview Window'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Pipeline Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {features.map((feature, index) => (
                          <div key={feature.title} className="flex items-start space-x-3">
                            <div className="p-2 bg-primary/10 rounded-full">
                              {feature.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold">{feature.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-16 text-center">
                  <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
                    <CardContent className="pt-6">
                      <Zap className="h-12 w-12 mx-auto mb-4 text-green-500" />
                      <h3 className="text-2xl font-bold mb-4">Experience Lightning-Fast Production</h3>
                      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Our real-time pipeline reduces traditional VFX timelines by up to 70%, 
                        giving you instant previews and collaborative editing capabilities.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="gradient-button">
                          Try the Pipeline
                        </Button>
                        <Button size="lg" variant="outline">
                          Schedule Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default RealTimePipeline;
