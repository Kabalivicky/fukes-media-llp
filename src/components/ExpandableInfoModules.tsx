import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, Zap, Target, DollarSign, Clock, Sparkles } from 'lucide-react';

interface ModuleData {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  content: {
    description: string;
    options: string[];
    pricing?: string;
    timeline?: string;
    features?: string[];
  };
}

const modules: ModuleData[] = [
  {
    id: 'project-type',
    title: 'Project Type',
    icon: <Target className="w-5 h-5" />,
    summary: 'Define your vision',
    content: {
      description: 'Choose the type of VFX project that matches your creative vision',
      options: [
        'Feature Film VFX',
        'Commercial/Advertising',
        'Music Video Effects',
        'Virtual Production',
        'AR/VR Experiences',
        'Real-time Graphics'
      ],
      features: ['Custom pipeline', 'Industry-standard tools', 'Collaborative workflow']
    }
  },
  {
    id: 'industry',
    title: 'Industry Focus',
    icon: <Sparkles className="w-5 h-5" />,
    summary: 'Tailored for your sector',
    content: {
      description: 'Industry-specific expertise and workflows optimized for your market',
      options: [
        'Entertainment & Media',
        'Automotive',
        'Architecture & Real Estate',
        'Gaming & Interactive',
        'Education & Training',
        'Healthcare & Medical'
      ],
      features: ['Compliance standards', 'Industry partnerships', 'Specialized tools']
    }
  },
  {
    id: 'budget',
    title: 'Budget Range',
    icon: <DollarSign className="w-5 h-5" />,
    summary: 'Flexible investment options',
    content: {
      description: 'Transparent pricing tiers designed to maximize your ROI',
      options: [
        'Startup: $5K - $25K',
        'Professional: $25K - $100K',
        'Enterprise: $100K - $500K',
        'Premium: $500K+'
      ],
      pricing: 'Custom quotes available',
      features: ['Flexible payment terms', 'Milestone-based billing', 'Value optimization']
    }
  },
  {
    id: 'deliverables',
    title: 'Deliverables',
    icon: <Zap className="w-5 h-5" />,
    summary: 'Complete production package',
    content: {
      description: 'End-to-end deliverables from concept to final render',
      options: [
        'Concept Art & Previsualization',
        '3D Models & Animation',
        'Compositing & Color',
        'Motion Graphics',
        'Interactive Experiences',
        'Technical Documentation'
      ],
      timeline: '2-16 weeks depending on scope',
      features: ['Multiple format delivery', 'Revision cycles included', 'Archive & backup']
    }
  }
];

const ExpandableInfoModules = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleModuleToggle = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleOptionSelect = (moduleId: string, option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [moduleId]: option
    }));
  };

  const generateQuote = () => {
    const hasAllSelections = modules.every(module => selectedOptions[module.id]);
    
    if (hasAllSelections) {
      toast.success('Quote generated! A detailed proposal will be sent to your email.');
    } else {
      toast.error('Please select an option from each module to generate a quote.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Configure Your VFX Project
        </h2>
        <p className="text-muted-foreground">
          Build your custom solution step by step
        </p>
      </motion.div>

      <div className="grid gap-4 mb-8">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => handleModuleToggle(module.id)}
              >
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {module.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{module.title}</h3>
                      <p className="text-sm text-muted-foreground font-normal">
                        {module.summary}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedOptions[module.id] && (
                      <Badge variant="secondary" className="text-xs">
                        Selected
                      </Badge>
                    )}
                    <motion.div
                      animate={{ rotate: expandedModule === module.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <AnimatePresence>
                {expandedModule === module.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          {module.content.description}
                        </p>
                        
                        <div className="grid gap-2">
                          <h4 className="font-medium">Choose an option:</h4>
                          <div className="grid gap-2">
                            {module.content.options.map((option) => (
                              <motion.button
                                key={option}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOptionSelect(module.id, option)}
                                className={`p-3 rounded-lg border-2 text-left transition-all ${
                                  selectedOptions[module.id] === option
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                {option}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {module.content.features && (
                          <div>
                            <h4 className="font-medium mb-2">Included Features:</h4>
                            <div className="flex flex-wrap gap-2">
                              {module.content.features.map((feature) => (
                                <Badge key={feature} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {module.content.pricing && (
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">
                              {module.content.pricing}
                            </span>
                          </div>
                        )}

                        {module.content.timeline && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">
                              {module.content.timeline}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Button 
          onClick={generateQuote}
          size="lg"
          className="px-8 py-4 text-lg font-semibold"
          disabled={!Object.keys(selectedOptions).length}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Custom Quote & Timeline
        </Button>
        
        {Object.keys(selectedOptions).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 rounded-lg bg-primary/10 border"
          >
            <h4 className="font-medium mb-2">Your Current Selection:</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.entries(selectedOptions).map(([moduleId, option]) => {
                const module = modules.find(m => m.id === moduleId);
                return (
                  <Badge key={moduleId} variant="secondary">
                    {module?.title}: {option.split(':')[0]}
                  </Badge>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ExpandableInfoModules;