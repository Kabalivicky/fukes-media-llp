import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ContentCarousel from './ContentCarousel';
import SectionTitle from './SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Star, Calendar, Users } from 'lucide-react';
import { projects, type Project } from './ProjectsData';

const AnimatedProjectsSection = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  // Auto-rotate projects
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevProject = () => {
    setIsAutoPlaying(false);
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNextProject = () => {
    setIsAutoPlaying(false);
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handleProjectSelect = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentProjectIndex(index);
  };

  const currentProject = projects[currentProjectIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto relative z-10"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <SectionTitle
            title="Featured Projects"
            subtitle="Showcase of our award-winning VFX and post-production work"
          />
        </motion.div>

        {/* Main Project Display */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto mb-16">
          {/* Project Image */}
          <div className="relative">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={currentProject.poster}
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Rating Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-accent text-accent-foreground font-bold px-3 py-1">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {currentProject.rating}
                </Badge>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <Badge 
                  variant={currentProject.status === 'completed' ? 'default' : 'secondary'}
                  className="font-medium"
                >
                  {currentProject.status === 'completed' ? 'Completed' : 
                   currentProject.status === 'in-production' ? 'In Production' : 'Upcoming'}
                </Badge>
              </div>

              {/* Play Button */}
              <div className="absolute bottom-4 right-4">
                <Button size="lg" className="rounded-full bg-primary/90 backdrop-blur-sm hover:bg-primary">
                  <Play className="w-5 h-5 ml-1" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Project Details */}
          <motion.div
            key={`details-${currentProject.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-4xl font-display font-bold mb-2">{currentProject.title}</h3>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {currentProject.year}
                </span>
                <span>•</span>
                <span>{currentProject.genre}</span>
                <span>•</span>
                <span>{currentProject.budget}</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentProject.description}
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Director</h4>
                <p className="text-muted-foreground">{currentProject.director}</p>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">Our Role</h4>
                <p className="text-muted-foreground">{currentProject.role}</p>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">Cast</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.cast.slice(0, 3).map((actor, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {actor}
                    </Badge>
                  ))}
                  {currentProject.cast.length > 3 && (
                    <Badge variant="outline" className="text-sm">
                      +{currentProject.cast.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1 sm:flex-none">
                View Case Study
              </Button>
              <Button size="lg" variant="outline" className="flex-1 sm:flex-none">
                <Play className="w-4 h-4 mr-2" />
                Watch Reel
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Project Navigation */}
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          {/* Project Thumbnails */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-3 overflow-x-auto pb-4 max-w-full">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => handleProjectSelect(index)}
                  className={`relative flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentProjectIndex 
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  whileHover={{ scale: index === currentProjectIndex ? 1.05 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={project.poster}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/40" />
                  {index === currentProjectIndex && (
                    <div className="absolute inset-0 bg-primary/20 border-2 border-primary/50" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="space-y-2">
              <div className="text-3xl font-display font-bold text-primary">{projects.length}+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-display font-bold text-secondary">₹2000+</div>
              <div className="text-sm text-muted-foreground">Crores Box Office</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-display font-bold text-accent">15+</div>
              <div className="text-sm text-muted-foreground">Awards Won</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-display font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-bold mb-4">Ready to Create Your Next Blockbuster?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the ranks of successful filmmakers who trust us with their vision. 
              Let's create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Users className="w-4 h-4 mr-2" />
                Start Your Project
              </Button>
              <Button size="lg" variant="outline">
                View All Projects
              </Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AnimatedProjectsSection;