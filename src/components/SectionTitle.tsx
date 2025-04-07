
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  alignment = 'center',
  className,
  titleClassName,
  subtitleClassName,
}: SectionTitleProps) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-10', alignmentClasses[alignment], className)}>
      <h2 
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight',
          'bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent',
          'animate-gradient',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-lg text-muted-foreground max-w-3xl mx-auto', subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
