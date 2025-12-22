import { cn } from '@/lib/utils';
// Force TypeScript to refresh interface

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  accent?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}
const SectionTitle = ({
  title,
  subtitle,
  alignment = 'center',
  accent,
  className,
  titleClassName,
  subtitleClassName
}: SectionTitleProps) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  const getAccentColor = () => {
    switch (accent) {
      case 'primary':
        return 'from-primary via-primary/80 to-primary/60';
      case 'secondary':
        return 'from-secondary via-secondary/80 to-secondary/60';
      case 'accent':
        return 'from-accent via-accent/80 to-accent/60';
      case 'red':
        return 'from-red-600 via-red-500 to-red-400';
      case 'gold':
        return 'from-amber-500 via-amber-400 to-amber-300';
      default:
        return 'from-primary via-secondary to-accent';
    }
  };
  return <div className={cn('mb-10', alignmentClasses[alignment], className)}>
      
      {subtitle && <p className={cn('mt-4 text-lg text-muted-foreground max-w-3xl mx-auto', subtitleClassName)}>
          {subtitle}
        </p>}
    </div>;
};
export default SectionTitle;