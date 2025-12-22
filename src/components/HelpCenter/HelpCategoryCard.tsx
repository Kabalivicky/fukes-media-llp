
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HelpCategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: string;
    description: string;
    customLink?: string;
  };
}

const HelpCategoryCard = ({ category }: HelpCategoryCardProps) => {
  const { id, name, description, customLink } = category;
  
  // Generate a unique icon SVG based on the category name using our brand colors
  const generateIcon = (name: string) => {
    // Use first letter to determine which color to use
    const colorIndex = name.charCodeAt(0) % 5;
    const colors = ['#0057B7', '#D50032', '#009639', '#FFCC00', '#00BFFF'];
    const selectedColor = colors[colorIndex];
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='8' fill='${selectedColor.replace('#', '%23')}'/%3E%3Ctext x='20' y='25' font-family='Arial' font-size='16' font-weight='bold' fill='white' text-anchor='middle'%3E${name.charAt(0)}%3C/text%3E%3C/svg%3E`;
  };
  
  const linkPath = customLink || `/help-center/${id}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: parseInt(id) * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link 
        to={linkPath}
        className="block p-6 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
        aria-labelledby={`category-title-${id}`}
        role="article"
      >
        {/* Background gradient effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0"
          initial={false}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="flex items-center mb-4 relative z-10">
          <motion.div 
            className="w-14 h-14 rounded-md bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center shrink-0 mr-4 border border-primary/10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            aria-hidden="true"
          >
            <img src={generateIcon(name)} alt={`${name} category icon`} className="w-8 h-8 object-contain" />
          </motion.div>
          <h3 id={`category-title-${id}`} className="text-xl font-medium">{name}</h3>
        </div>
        
        <p className="text-muted-foreground text-base line-clamp-2 mb-4">{description}</p>
        
        <div className="flex items-center text-primary text-sm font-medium relative z-10">
          <span>View resources</span>
          <motion.div
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HelpCategoryCard;
