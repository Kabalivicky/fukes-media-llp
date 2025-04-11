
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
  const { id, name, icon, description, customLink } = category;
  
  const linkPath = customLink || `/help-center/${id}`;
  
  return (
    <Link 
      to={linkPath}
      className="block p-6 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
    >
      <div className="flex items-center mb-4">
        <div className="w-14 h-14 rounded-md bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center shrink-0 mr-4 border border-primary/10">
          <img src={icon} alt={name} className="w-8 h-8 object-contain" />
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
