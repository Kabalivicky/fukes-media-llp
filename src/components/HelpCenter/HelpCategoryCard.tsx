
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HelpCategoryProps {
  category: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
  className?: string;
}

const HelpCategoryCard = ({ category, className }: HelpCategoryProps) => {
  return (
    <Link to={`/help-center/${category.id}`}>
      <Card className={cn("transition-all duration-200 hover:shadow-lg hover:border-primary/50 h-full", className)}>
        <CardContent className="p-5 flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-lg bg-muted/30 w-16 h-16 flex items-center justify-center">
            <img 
              src={category.icon} 
              alt={`${category.name} icon`} 
              className="w-10 h-10 object-contain"
            />
          </div>
          
          <h3 className="font-semibold mb-2">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HelpCategoryCard;
