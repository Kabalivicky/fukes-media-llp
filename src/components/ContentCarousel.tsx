
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';

interface ContentCarouselProps<T> {
  items: T[];
  title?: string;
  description?: string;
  className?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
  itemClassName?: string;
  autoplay?: boolean;
  interval?: number;
}

const ContentCarousel = <T extends {}>({
  items,
  title,
  description,
  className = '',
  renderItem,
  itemClassName = '',
  autoplay = false,
  interval = 5000
}: ContentCarouselProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update the active index when the carousel changes
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  // Handle autoplay functionality
  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(() => {
        if (api) {
          api.scrollNext();
        } else {
          setActiveIndex(prev => (prev + 1) % items.length);
        }
      }, interval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, interval, items.length, api]);

  return (
    <div className={`w-full ${className}`}>
      {(title || description) && (
        <div className="mb-6 text-center md:text-left">
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="relative">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          onSelect={() => {}}
        >
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index} className={`${itemClassName}`}>
                {renderItem(item, index)}
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="hidden md:flex -left-6 bg-background border-border" />
          <CarouselNext className="hidden md:flex -right-6 bg-background border-border" />
        </Carousel>
        
        {/* Mobile Controls */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => api?.scrollPrev()}
            aria-label="Previous item"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => api?.scrollNext()}
            aria-label="Next item"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-1.5 mt-4">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`h-1.5 rounded-full transition-all ${idx === activeIndex ? 'w-6 bg-primary' : 'w-1.5 bg-muted'}`}
              onClick={() => {
                if (api) {
                  api.scrollTo(idx);
                } else {
                  setActiveIndex(idx);
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCarousel;
