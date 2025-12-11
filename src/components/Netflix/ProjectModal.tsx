import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Star, Calendar, Users, Film } from 'lucide-react';
import { Project } from '@/components/ProjectsData';
import { Link } from 'react-router-dom';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-10 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-4xl bg-card rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 flex items-center justify-center hover:bg-card transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Hero Image */}
          <div className="relative aspect-video">
            <img
              src={project.poster}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link to="/showreel">
                <button className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors group">
                  <Play className="w-8 h-8 text-black fill-black ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title and meta */}
            <div className="mb-6">
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
                {project.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-primary font-semibold">
                  <Star className="w-4 h-4 fill-primary" />
                  {project.rating}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {project.year}
                </span>
                <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                  {project.genre}
                </span>
                <span className="text-muted-foreground">{project.status}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Details grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Director</h3>
                <p className="text-foreground">{project.director}</p>
              </div>
              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Budget</h3>
                <p className="text-foreground">{project.budget}</p>
              </div>
              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Our Role</h3>
                <p className="text-primary">{project.role}</p>
              </div>
              <div>
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Status</h3>
                <p className="text-foreground capitalize">{project.status.replace('-', ' ')}</p>
              </div>
            </div>

            {/* Cast */}
            <div className="mb-6">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Cast
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.cast.map((actor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <Link to="/showreel" className="flex-1">
                <button className="btn-netflix-primary w-full justify-center">
                  <Play className="w-5 h-5 fill-black" />
                  Watch VFX Breakdown
                </button>
              </Link>
              <Link to="/portfolio">
                <button className="btn-netflix-secondary">
                  <Film className="w-5 h-5" />
                  View Portfolio
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
