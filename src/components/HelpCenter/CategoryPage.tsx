
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  ChevronDown, 
  PlusCircle,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpansibleTab from '@/components/ExpansibleTab';

interface CategoryPageProps {
  categoryData: {
    title: string;
    description?: string;
    sections: {
      title: string;
      expandable?: boolean;
      isPlus?: boolean;
      links?: {
        title: string;
        url: string;
      }[];
      subsections?: {
        title: string;
        isPlus?: boolean;
        links?: {
          title: string;
          url: string;
        }[];
      }[];
    }[];
  };
}

const CategoryPage = ({ categoryData }: CategoryPageProps) => {
  const { categoryId } = useParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpanded(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/help-center" className="flex items-center text-sm text-muted-foreground mb-4 hover:text-primary">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Help Center
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryData.title}</h1>
        {categoryData.description && (
          <p className="text-muted-foreground">{categoryData.description}</p>
        )}
      </div>
      
      <div className="space-y-6">
        {categoryData.sections.map((section, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden">
            {section.expandable ? (
              <ExpansibleTab
                title={
                  <div className="flex items-center">
                    {section.isPlus && <PlusCircle className="mr-2 h-4 w-4 text-red-600" />}
                    {section.title}
                  </div>
                }
                defaultOpen={idx === 0}
                className="border-none"
                titleClassName="" /* Fixed by providing a string type instead of Element */
              >
                <div className="space-y-2">
                  {section.links?.map((link, linkIdx) => (
                    <div key={linkIdx} className="border-b border-border last:border-b-0 py-3">
                      <Link to={link.url} className="text-primary hover:underline">
                        {link.title}
                      </Link>
                    </div>
                  ))}
                  
                  {section.subsections?.map((subsection, subIdx) => (
                    <div key={subIdx} className="border-t border-border first:border-t-0 pt-4 mt-4">
                      <h4 className="text-lg font-medium mb-2 flex items-center">
                        {subsection.isPlus && <PlusCircle className="mr-2 h-4 w-4 text-red-600" />}
                        {subsection.title}
                      </h4>
                      <div className="space-y-2 pl-4">
                        {subsection.links?.map((link, linkIdx) => (
                          <div key={linkIdx} className="py-1">
                            <Link to={link.url} className="text-primary hover:underline">
                              {link.title}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ExpansibleTab>
            ) : (
              <div>
                <div 
                  className="flex justify-between items-center p-4 bg-muted/30 cursor-pointer"
                  onClick={() => toggleSection(section.title)}
                >
                  <h3 className="text-lg font-medium">
                    {section.isPlus && <PlusCircle className="inline mr-2 h-4 w-4 text-red-600" />}
                    {section.title}
                  </h3>
                  <Button variant="ghost" size="sm" className="w-9 p-0 hover:bg-primary/20">
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${expanded[section.title] ? 'rotate-180' : ''}`} 
                    />
                  </Button>
                </div>
                
                {expanded[section.title] && (
                  <div className="p-4 border-t border-border">
                    <div className="space-y-2">
                      {section.links?.map((link, linkIdx) => (
                        <div key={linkIdx} className="border-b border-border last:border-b-0 py-3">
                          <Link to={link.url} className="text-primary hover:underline">
                            {link.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        
        {categoryId === 'imaging' && (
          <div className="mt-4 text-center">
            <Button variant="outline">
              See all 10 articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
