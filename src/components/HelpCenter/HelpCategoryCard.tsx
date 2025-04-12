
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
    <Link 
      to={linkPath}
      className="block p-6 bg-card/80 backdrop-blur-sm rounded-lg border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] group animate-fade-in"
      aria-labelledby={`category-title-${id}`}
      role="article"
      style={{ animationDelay: `${parseInt(id) * 100}ms` }}
    >
      <div className="flex items-center mb-4">
        <div className="w-14 h-14 rounded-md bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center shrink-0 mr-4 border border-primary/10 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
          <img src={generateIcon(name)} alt="" className="w-8 h-8 object-contain" />
        </div>
        <h3 id={`category-title-${id}`} className="text-xl font-medium">{name}</h3>
      </div>
      
      <p className="text-muted-foreground text-base line-clamp-2 mb-4">{description}</p>
      
      <div className="flex items-center text-primary text-sm font-medium">
        <span>View resources</span>
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-2" aria-hidden="true" />
      </div>
    </Link>
  );
};

export default HelpCategoryCard;
