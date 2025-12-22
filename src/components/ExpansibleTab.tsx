import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpansibleTabProps {
  title: ReactNode;
  children: ReactNode;
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
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <button
        className={cn(
          "flex justify-between items-center w-full p-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left",
          titleClassName
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium">{title}</div>
        <ChevronDown 
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      
      {isOpen && (
        <div className="p-4 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpansibleTab;