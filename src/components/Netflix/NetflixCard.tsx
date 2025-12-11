import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Star } from 'lucide-react';
import { Project } from '@/components/ProjectsData';

interface NetflixCardProps {
  project: Project;
  variant?: 'landscape' | 'poster';
  onSelect?: (project: Project) => void;
}

const NetflixCard = ({ project, variant = 'poster', onSelect }: NetflixCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className={variant === 'poster' ? 'netflix-card-poster' : 'netflix-card w-[280px] md:w-[320px]'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(project)}
      whileHover={{ scale: variant === 'poster' ? 1.05 : 1.1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Image */}
      <div className="absolute inset-0 bg-muted">
        {!imageLoaded && <div className="absolute inset-0 shimmer" />}
        <img
          src={project.poster}
          alt={project.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      {/* Hover overlay */}
      <motion.div
        className="card-info flex flex-col justify-end p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Title */}
        <h3 className="font-display text-lg md:text-xl text-white leading-tight mb-1">
          {project.title}
        </h3>

        {/* Meta info */}
        <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-primary fill-primary" />
            {project.rating}
          </span>
          <span className="text-white/50">•</span>
          <span>{project.year}</span>
          <span className="text-white/50">•</span>
          <span className="text-white/70">{project.genre}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors">
            <Play className="w-4 h-4 text-black fill-black" />
          </button>
          <button className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all">
            <Info className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Status badge for in-production projects */}
      {project.status === 'in-production' && (
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-[10px] font-medium rounded">
          IN PRODUCTION
        </div>
      )}
    </motion.div>
  );
};

export default NetflixCard;
