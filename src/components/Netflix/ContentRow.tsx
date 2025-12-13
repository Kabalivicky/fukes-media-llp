import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/components/ProjectsData';
import NetflixCard from './NetflixCard';

interface ContentRowProps {
  title: string;
  projects: Project[];
  onProjectSelect?: (project: Project) => void;
}

const ContentRow = ({ title, projects, onProjectSelect }: ContentRowProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    const newPosition = direction === 'left'
      ? sliderRef.current.scrollLeft - scrollAmount
      : sliderRef.current.scrollLeft + scrollAmount;
    
    sliderRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  if (projects.length === 0) return null;

  return (
    <div className="content-row group relative">
      {/* Row Title */}
      <h2 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
        {title}
        <span className="text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          Explore All →
        </span>
      </h2>

      {/* Slider Container */}
      <div className="relative -mx-4 md:-mx-12 px-4 md:px-12">
        {/* Left Arrow */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 bottom-4 z-20 w-12 md:w-16 bg-gradient-to-r from-background via-background/80 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Content Slider */}
        <div
          ref={sliderRef}
          className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollBehavior: 'smooth' }}
          onScroll={handleScroll}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
            >
              <NetflixCard
                project={project}
                variant="poster"
                onSelect={onProjectSelect}
              />
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <AnimatePresence>
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-0 bottom-4 z-20 w-12 md:w-16 bg-gradient-to-l from-background via-background/80 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContentRow;
