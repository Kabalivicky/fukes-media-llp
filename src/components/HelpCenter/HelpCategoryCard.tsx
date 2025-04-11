
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
  
  // Generate a unique icon SVG based on the category name
  const generateIcon = (name: string) => {
    // Use first letter to get a consistent color based on the category name
    const hue = name.charCodeAt(0) % 360;
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='8' fill='hsl(${hue}, 70%25, 60%25)'/%3E%3Ctext x='20' y='25' font-family='Arial' font-size='16' font-weight='bold' fill='white' text-anchor='middle'%3E${name.charAt(0)}%3C/text%3E%3C/svg%3E`;
  };
  
  const linkPath = customLink || `/help-center/${id}`;
  
  return (
    <Link 
      to={linkPath}
      className="block p-6 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
    >
      <div className="flex items-center mb-4">
        <div className="w-14 h-14 rounded-md bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center shrink-0 mr-4 border border-primary/10">
          <img src={generateIcon(name)} alt={name} className="w-8 h-8 object-contain" />
        </div>
        <h3 className="text-xl font-medium">{name}</h3>
      </div>
      
      <p className="text-muted-foreground text-base line-clamp-2 mb-4">{description}</p>
      
      <div className="flex items-center text-primary text-sm font-medium">
        <span>View resources</span>
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default HelpCategoryCard;
