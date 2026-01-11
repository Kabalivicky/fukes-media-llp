import { memo } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, ExternalLink, GripVertical } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

interface Project {
  id: string;
  title: string;
  description: string | null;
  client: string | null;
  category: string | null;
  year: number | null;
  image_url: string | null;
  video_url: string | null;
  imdb_url: string | null;
  featured: boolean | null;
  status: string | null;
  order_index: number | null;
}

interface DraggableProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export const DraggableProjectCard = memo(({ project, onEdit, onDelete }: DraggableProjectCardProps) => {
  const controls = useDragControls();

  const handleImdbClick = () => {
    if (project.imdb_url) {
      window.open(project.imdb_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Reorder.Item
      value={project}
      id={project.id}
      dragListener={false}
      dragControls={controls}
      className="relative"
      whileDrag={{ 
        scale: 1.02, 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        zIndex: 50,
      }}
    >
      <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-primary/50 relative">
        {/* Drag handle */}
        <div
          className="absolute top-2 left-2 z-20 p-2 bg-background/90 backdrop-blur-sm rounded-lg cursor-grab active:cursor-grabbing border border-border/50 hover:border-primary/50 transition-colors"
          onPointerDown={(e) => controls.start(e)}
        >
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </div>

        <div 
          className={`relative aspect-video overflow-hidden ${project.imdb_url ? 'cursor-pointer' : ''}`}
          onClick={project.imdb_url ? handleImdbClick : undefined}
        >
          <OptimizedImage
            src={project.image_url || '/placeholder.svg'}
            alt={project.title}
            aspectRatio="16/9"
            placeholder="shimmer"
            hoverScale={1.1}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* IMDB indicator */}
          {project.imdb_url && (
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Badge className="bg-yellow-500 text-black font-bold">
                <ExternalLink className="w-3 h-3 mr-1" />
                IMDB
              </Badge>
            </div>
          )}

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-14">
              <Badge className="bg-accent text-accent-foreground shadow-lg">
                Featured
              </Badge>
            </div>
          )}

          {/* Admin controls */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 
                className={`text-xl font-display font-bold mb-1 group-hover:text-primary transition-colors ${project.imdb_url ? 'cursor-pointer hover:underline' : ''}`}
                onClick={project.imdb_url ? handleImdbClick : undefined}
              >
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {project.client && `${project.client} • `}{project.year}
              </p>
            </div>
            {project.category && (
              <Badge variant="outline" className="bg-background/50">{project.category}</Badge>
            )}
          </div>
          
          {project.description && (
            <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          )}

          {project.status && project.status !== 'completed' && (
            <Badge variant="secondary" className="text-xs">
              {project.status.replace('_', ' ')}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Reorder.Item>
  );
});

DraggableProjectCard.displayName = 'DraggableProjectCard';