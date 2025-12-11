import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, VolumeX, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project, projects } from '@/components/ProjectsData';

interface BillboardProps {
  onMoreInfo?: (project: Project) => void;
}

const Billboard = ({ onMoreInfo }: BillboardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  // Featured projects for billboard rotation
  const featuredProjects = projects.filter(p => p.rating >= 8.5).slice(0, 5);
  const currentProject = featuredProjects[currentIndex];

  // Auto-rotate featured projects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 10000);
    
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  return (
    <div className="billboard">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={currentProject.poster}
            alt={currentProject.title}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="billboard-gradient absolute inset-0" />
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              className="max-w-2xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category badge */}
              <motion.div
                className="inline-flex items-center gap-2 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-primary font-semibold text-sm tracking-wider">
                  FUKE'S MEDIA PRODUCTION
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-4 leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentProject.title}
              </motion.h1>

              {/* Meta info */}
              <motion.div
                className="flex items-center gap-3 mb-4 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-primary font-semibold">{currentProject.rating} Rating</span>
                <span className="text-muted-foreground">{currentProject.year}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{currentProject.genre}</span>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-muted-foreground text-base md:text-lg max-w-xl mb-6 line-clamp-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {currentProject.description}
              </motion.p>

              {/* Role badge */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Our Role:</span>
                <span className="ml-2 text-sm text-white">{currentProject.role}</span>
              </motion.div>

              {/* Buttons */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/showreel">
                  <button className="btn-netflix-primary">
                    <Play className="w-5 h-5 fill-black" />
                    Play Showreel
                  </button>
                </Link>
                <button 
                  className="btn-netflix-secondary"
                  onClick={() => onMoreInfo?.(currentProject)}
                >
                  <Info className="w-5 h-5" />
                  More Info
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Volume toggle (decorative) */}
      <button
        className="absolute bottom-24 right-4 md:right-12 btn-netflix-icon"
        onClick={() => setIsMuted(!isMuted)}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Progress indicators */}
      <div className="absolute bottom-20 left-4 md:left-12 flex items-center gap-2">
        {featuredProjects.map((_, index) => (
          <button
            key={index}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary' : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Billboard;
