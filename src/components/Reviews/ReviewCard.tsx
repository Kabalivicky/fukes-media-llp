import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, CheckCircle, MoreHorizontal, Trash, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import type { Review } from '@/hooks/useReviews';

interface ReviewCardProps {
  review: Review;
  isOwner?: boolean;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
}

const ReviewCard = ({ review, isOwner, onEdit, onDelete }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'fill-amber-400 text-amber-400'
            : 'fill-muted text-muted'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={review.reviewer?.avatar_url || undefined} />
                <AvatarFallback>
                  {review.reviewer?.display_name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">
                    {review.reviewer?.display_name || 'Anonymous'}
                  </span>
                  {review.is_verified && (
                    <Badge variant="outline" className="text-xs py-0 px-1.5 bg-blue-500/10 text-blue-500 border-blue-500/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                {review.reviewer?.title && (
                  <p className="text-sm text-muted-foreground">
                    {review.reviewer.title}
                  </p>
                )}
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>

            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit?.(review)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete?.(review.id)}
                    className="text-destructive"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {review.title && (
            <h4 className="font-medium mt-4">{review.title}</h4>
          )}
          
          {review.content && (
            <p className="text-muted-foreground mt-2 whitespace-pre-wrap">
              {review.content}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReviewCard;
