
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

interface TopArticlesProps {
  articles: string[];
}

const TopArticles = ({ articles }: TopArticlesProps) => {
  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-lg font-medium mb-4">TOP ARTICLES</h2>
      <div className="space-y-1">
        {articles.map((article, index) => (
          <div key={index}>
            <Link 
              to="#" 
              className="text-sm md:text-base py-1.5 block hover:underline"
            >
              {article}
            </Link>
            {index < articles.length - 1 && (
              <Separator className="bg-white/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArticles;
