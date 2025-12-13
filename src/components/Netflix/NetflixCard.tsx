import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, ThumbsUp, ChevronDown, Star } from 'lucide-react';
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
      whileHover={{ scale: 1.08, zIndex: 10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="absolute inset-0 bg-gray-900">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
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

      {/* Hover overlay - Netflix style expanded card */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent"
        initial={{ opacity: 0, height: '0%' }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          height: isHovered ? '100%' : '0%'
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute bottom-0 left-0 right-0 p-3">
          {/* Action buttons */}
          <div className="flex items-center gap-2 mb-2">
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Play className="w-4 h-4 text-black fill-black ml-0.5" />
            </button>
            <button className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
            <button className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
              <ThumbsUp className="w-4 h-4 text-white" />
            </button>
            <button 
              className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors ml-auto"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(project);
              }}
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-white text-sm leading-tight mb-1 line-clamp-1">
            {project.title}
          </h3>

          {/* Meta info */}
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-0.5 text-green-500 font-semibold">
              <Star className="w-3 h-3 fill-green-500" />
              {project.rating}
            </span>
            <span className="text-gray-400">{project.year}</span>
            <span className="px-1 py-0.5 border border-gray-500 text-gray-400 text-[10px]">
              HD
            </span>
          </div>

          {/* Genre */}
          <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-300">
            <span>{project.genre}</span>
          </div>
        </div>
      </motion.div>

      {/* Status badge for in-production projects */}
      {project.status === 'in-production' && (
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-[10px] font-semibold rounded">
          COMING SOON
        </div>
      )}

      {/* Netflix "N" badge for featured */}
      {project.rating >= 9 && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
          <span className="text-white text-xs font-bold">N</span>
        </div>
      )}
    </motion.div>
  );
};

export default NetflixCard;
