import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Loader2, Send } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: (data: { rating: number; title?: string; content?: string }) => Promise<boolean>;
  isSubmitting?: boolean;
  initialData?: {
    rating?: number;
    title?: string;
    content?: string;
  };
  submitLabel?: string;
}

const ReviewForm = ({ 
  onSubmit, 
  isSubmitting = false, 
  initialData,
  submitLabel = 'Submit Review'
}: ReviewFormProps) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    const success = await onSubmit({
      rating,
      title: title.trim() || undefined,
      content: content.trim() || undefined,
    });

    if (success) {
      setRating(0);
      setTitle('');
      setContent('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="focus:outline-none"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-muted text-muted-foreground'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="reviewTitle">Title (optional)</Label>
            <Input
              id="reviewTitle"
              placeholder="Summarize your experience"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="reviewContent">Your Review (optional)</Label>
            <Textarea
              id="reviewContent"
              placeholder="Share your experience working with this professional..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground text-right">
              {content.length}/1000
            </p>
          </div>

          <Button
            type="submit"
            disabled={rating === 0 || isSubmitting}
            className="w-full gradient-button"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {submitLabel}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
