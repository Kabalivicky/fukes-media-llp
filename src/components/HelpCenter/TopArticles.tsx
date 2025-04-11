
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface TopArticlesProps {
  articles: string[];
}

const TopArticles = ({ articles }: TopArticlesProps) => {
  // Function to determine the link for each article
  const getArticleLink = (title: string) => {
    if (title === "Production & Post-Production Guidelines") {
      return "/production-guidelines";
    }
    
    // Default links to specific help categories
    if (title.includes("Camera") || title.includes("Image")) {
      return "/help-center/imaging";
    } else if (title.includes("Audio") || title.includes("Dubbed")) {
      return "/help-center/dubbed-audio";
    } else if (title.includes("Delivery") || title.includes("IMF")) {
      return "/help-center/delivery";
    } else if (title.includes("Security") || title.includes("Confidentiality") || title.includes("NDA")) {
      return "/help-center/content-security";
    } else {
      // Fallback
      return "/help-center";
    }
  };
  
  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-white">Popular Articles</h3>
        <Link to="/help-center" className="flex items-center text-sm text-white/80 hover:text-white">
          View all
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {articles.map((article, index) => (
          <Link 
            key={index}
            to={getArticleLink(article)}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded p-3 transition-colors"
          >
            <p className="text-sm text-white">{article}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopArticles;
