import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  description?: string;
  category?: string;
}

export const BeforeAfterSlider = ({ 
  beforeImage, 
  afterImage, 
  title,
  description,
  category 
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState([50]);

  return (
    <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {/* After Image (Full width) */}
          <img 
            src={afterImage} 
            alt={`${title} - After`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ 
              clipPath: `inset(0 ${100 - sliderPosition[0]}% 0 0)`
            }}
          >
            <img 
              src={beforeImage} 
              alt={`${title} - Before`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Slider Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-primary z-10"
            style={{ left: `${sliderPosition[0]}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-background rounded-full"></div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 z-20">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              Before
            </Badge>
          </div>
          <div className="absolute top-4 right-4 z-20">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              After
            </Badge>
          </div>
        </div>

        {/* Slider Control */}
        <div className="p-4 bg-card">
          <Slider
            value={sliderPosition}
            onValueChange={setSliderPosition}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Info */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-display font-semibold text-lg">{title}</h4>
            {category && (
              <Badge variant="outline">{category}</Badge>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
