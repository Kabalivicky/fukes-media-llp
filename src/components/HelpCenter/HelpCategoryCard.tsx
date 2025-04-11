
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      className="block p-4 bg-card rounded-lg border border-border hover:border-primary/40 hover:shadow-md transition-all hover:scale-[1.02] group"
    >
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center shrink-0 mr-3">
          <img src={icon} alt={name} className="w-7 h-7 object-contain" />
        </div>
        <h3 className="text-lg font-medium">{name}</h3>
      </div>
      
      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{description}</p>
      
      <div className="flex items-center text-primary text-sm font-medium">
        <span>View resources</span>
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default HelpCategoryCard;
