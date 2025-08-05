import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { ChevronRight, Play, Zap, Users, Clock, DollarSign } from 'lucide-react';

interface ModuleData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  layers: InfoLayer[];
  color: string;
}

interface InfoLayer {
  id: string;
  title: string;
  content: string;
  visual?: React.ReactNode;
  options?: string[];
  nextLayer?: string;
}

const FloatingElement = ({ isActive }: { isActive: boolean }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
      meshRef.current.scale.setScalar(isActive ? 1.2 : 0.8);
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshBasicMaterial color="#0057B7" transparent opacity={0.6} wireframe />
    </mesh>
  );
};

const modules: ModuleData[] = [
  {
    id: 'project-type',
    title: 'Project Type',
    description: 'Define your creative vision',
    icon: <Play className="w-6 h-6" />,
    color: '#0057B7',
    layers: [
      {
        id: 'type-selection',
        title: 'Choose Project Type',
        content: 'What type of project are you planning?',
        options: ['Film/TV VFX', 'Commercial/Advertising', 'Gaming Assets', 'Virtual Production', 'R&D/Experimental'],
        nextLayer: 'industry-focus'
      },
      {
        id: 'industry-focus',
        title: 'Industry Focus',
        content: 'Which industry best describes your project?',
        options: ['Entertainment', 'Automotive', 'Architecture', 'Medical', 'Education', 'Technology'],
        nextLayer: 'budget-range'
      },
      {
        id: 'budget-range',
        title: 'Budget Range',
        content: 'What\'s your estimated budget range?',
        options: ['$5K - $15K', '$15K - $50K', '$50K - $150K', '$150K+', 'Enterprise'],
        nextLayer: 'timeline'
      }
    ]
  },
  {
    id: 'deliverables',
    title: 'Deliverables',
    description: 'Specify your requirements',
    icon: <Zap className="w-6 h-6" />,
    color: '#D50032',
    layers: [
      {
        id: 'output-format',
        title: 'Output Formats',
        content: 'What formats do you need?',
        options: ['4K/8K Video', '3D Models', 'Real-time Assets', 'VR/AR Content', 'Interactive Media'],
        nextLayer: 'quality-level'
      },
      {
        id: 'quality-level',
        title: 'Quality Level',
        content: 'Choose your quality requirements',
        options: ['Broadcast Quality', 'Cinema Quality', 'Web Optimized', 'Mobile Optimized', 'Custom'],
        nextLayer: 'technical-specs'
      }
    ]
  },
  {
    id: 'timeline',
    title: 'Timeline',
    description: 'Plan your production schedule',
    icon: <Clock className="w-6 h-6" />,
    color: '#009639',
    layers: [
      {
        id: 'project-duration',
        title: 'Project Duration',
        content: 'How long is your project timeline?',
        options: ['Rush (1-2 weeks)', 'Standard (1-2 months)', 'Extended (3-6 months)', 'Ongoing Partnership'],
        nextLayer: 'milestone-planning'
      }
    ]
  },
  {
    id: 'team-assignment',
    title: 'Team Assignment',
    description: 'Match with the perfect team',
    icon: <Users className="w-6 h-6" />,
    color: '#00FF88',
    layers: [
      {
        id: 'team-size',
        title: 'Team Size',
        content: 'How many specialists do you need?',
        options: ['Solo Expert', 'Small Team (2-4)', 'Full Production (5-10)', 'Enterprise Team (10+)'],
        nextLayer: 'expertise-areas'
      }
    ]
  }
];

const EnhancedModularInfo = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [currentLayer, setCurrentLayer] = useState<string>('');
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [expandedPath, setExpandedPath] = useState<string[]>([]);

  const handleModuleClick = (moduleId: string) => {
    if (activeModule === moduleId) {
      setActiveModule(null);
      setCurrentLayer('');
      setExpandedPath([]);
    } else {
      setActiveModule(moduleId);
      const module = modules.find(m => m.id === moduleId);
      if (module && module.layers.length > 0) {
        setCurrentLayer(module.layers[0].id);
        setExpandedPath([module.layers[0].id]);
      }
    }
  };

  const handleOptionSelect = (layerId: string, option: string) => {
    setSelections(prev => ({ ...prev, [layerId]: option }));
    
    const module = modules.find(m => m.id === activeModule);
    const layer = module?.layers.find(l => l.id === layerId);
    
    if (layer?.nextLayer) {
      setCurrentLayer(layer.nextLayer);
      setExpandedPath(prev => [...prev, layer.nextLayer!]);
    }
  };

  const getCurrentLayer = () => {
    const module = modules.find(m => m.id === activeModule);
    return module?.layers.find(l => l.id === currentLayer);
  };

  const moduleVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: { duration: 0.3 }
    }
  };

  const layerVariants = {
    hidden: { opacity: 0, x: 50, rotateX: -10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      x: -50, 
      rotateX: 10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Interactive Project Builder
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Navigate through our intelligent system to build your perfect project specification
          </p>
        </motion.div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              variants={moduleVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className={`relative p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  activeModule === module.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted bg-card hover:border-primary/50'
                }`}
                onClick={() => handleModuleClick(module.id)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Background Element */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <Canvas camera={{ position: [0, 0, 5] }}>
                    <FloatingElement isActive={activeModule === module.id} />
                  </Canvas>
                </div>

                <motion.div
                  style={{ color: module.color }}
                  className="mb-4 relative z-10"
                  animate={{ 
                    scale: activeModule === module.id ? 1.2 : 1,
                    rotate: activeModule === module.id ? 360 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {module.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold mb-2 relative z-10">{module.title}</h3>
                <p className="text-muted-foreground text-sm relative z-10">{module.description}</p>
                
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ rotate: activeModule === module.id ? 90 : 0 }}
                >
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.div>

                {/* Selection indicator */}
                <AnimatePresence>
                  {Object.keys(selections).some(key => 
                    modules.find(m => m.id === module.id)?.layers.some(l => l.id === key)
                  ) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Layer Content */}
        <AnimatePresence mode="wait">
          {activeModule && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card rounded-xl border border-primary/30 p-8 overflow-hidden"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 mb-6 text-sm text-muted-foreground">
                  <span>{modules.find(m => m.id === activeModule)?.title}</span>
                  {expandedPath.map((pathItem, index) => (
                    <React.Fragment key={pathItem}>
                      <ChevronRight className="w-4 h-4" />
                      <span className={index === expandedPath.length - 1 ? 'text-primary' : ''}>
                        {modules.find(m => m.id === activeModule)?.layers.find(l => l.id === pathItem)?.title}
                      </span>
                    </React.Fragment>
                  ))}
                </div>

                {/* Current Layer */}
                <AnimatePresence mode="wait">
                  {getCurrentLayer() && (
                    <motion.div
                      key={currentLayer}
                      variants={layerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <h3 className="text-2xl font-bold mb-4">{getCurrentLayer()?.title}</h3>
                      <p className="text-lg text-muted-foreground mb-8">{getCurrentLayer()?.content}</p>

                      {/* Options Grid */}
                      {getCurrentLayer()?.options && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getCurrentLayer()?.options.map((option, index) => (
                            <motion.button
                              key={option}
                              initial={{ opacity: 0, y: 20, rotateX: -15 }}
                              animate={{ opacity: 1, y: 0, rotateX: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ 
                                scale: 1.05, 
                                rotateY: 5,
                                boxShadow: '0 10px 30px rgba(0, 87, 183, 0.3)'
                              }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                                selections[currentLayer] === option
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-muted bg-background hover:border-primary/50'
                              }`}
                              onClick={() => handleOptionSelect(currentLayer, option)}
                              style={{ transformStyle: 'preserve-3d' }}
                            >
                              <div className="font-medium">{option}</div>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Project Summary */}
                {Object.keys(selections).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20"
                  >
                    <h4 className="text-lg font-bold mb-4 text-primary">Your Project Configuration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(selections).map(([layerId, selection]) => {
                        const layer = modules.flatMap(m => m.layers).find(l => l.id === layerId);
                        return layer ? (
                          <div key={layerId} className="flex justify-between">
                            <span className="text-muted-foreground">{layer.title}:</span>
                            <span className="font-medium">{selection}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                    
                    <motion.button
                      className="mt-6 w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Generate Detailed Quote
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EnhancedModularInfo;