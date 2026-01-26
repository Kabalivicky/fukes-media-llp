import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useReviews } from '@/hooks/useReviews';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import ReviewStats from './ReviewStats';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare, Loader2 } from 'lucide-react';

interface ReviewsSectionProps {
  userId: string;
  showForm?: boolean;
}

const ReviewsSection = ({ userId, showForm = true }: ReviewsSectionProps) => {
  const { user } = useAuth();
  const {
    reviews,
    stats,
    isLoading,
    isSubmitting,
    createReview,
    deleteReview,
    canReview,
    hasReviewed,
  } = useReviews(userId);

  const [showMore, setShowMore] = useState(false);
  const displayedReviews = showMore ? reviews : reviews.slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      {stats.totalReviews > 0 && <ReviewStats stats={stats} />}

      {/* Review Form */}
      {showForm && canReview && !hasReviewed && (
        <ReviewForm
          onSubmit={async (data) => {
            return createReview({
              reviewed_user_id: userId,
              ...data,
            });
          }}
          isSubmitting={isSubmitting}
        />
      )}

      {hasReviewed && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              You've already reviewed this professional
            </p>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No reviews yet</p>
            {canReview && !hasReviewed && (
              <p className="text-sm text-muted-foreground mt-2">
                Be the first to leave a review!
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isOwner={review.reviewer_id === user?.id}
              onDelete={deleteReview}
            />
          ))}

          {reviews.length > 5 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Show Less' : `Show All ${reviews.length} Reviews`}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
