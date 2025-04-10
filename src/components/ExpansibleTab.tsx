
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpansibleTabProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  titleClassName?: string;
}

const ExpansibleTab = ({ 
  title, 
  children, 
  defaultOpen = false,
  className = '',
  titleClassName = ''
}: ExpansibleTabProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className={cn("w-full border rounded-lg mb-4 overflow-hidden transition-all duration-300", className)}
    >
      <div className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className={cn("text-lg font-medium", titleClassName)}>
          {title}
        </h3>
        <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="p-4 transition-all duration-300">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ExpansibleTab;
