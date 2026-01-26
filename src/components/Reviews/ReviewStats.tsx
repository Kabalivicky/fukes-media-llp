import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { ReviewStats as Stats } from '@/hooks/useReviews';

interface ReviewStatsProps {
  stats: Stats;
}

const ReviewStats = ({ stats }: ReviewStatsProps) => {
  const { averageRating, totalReviews, ratingDistribution } = stats;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.round(rating)
            ? 'fill-amber-400 text-amber-400'
            : 'fill-muted text-muted'
        }`}
      />
    ));
  };

  const getPercentage = (count: number) => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row gap-8 p-6 bg-muted/30 rounded-xl"
    >
      {/* Average Rating */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-5xl font-bold mb-2">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex mb-2">{renderStars(averageRating)}</div>
        <p className="text-sm text-muted-foreground">
          {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
        </p>
      </div>

      {/* Rating Distribution */}
      <div className="flex-1 space-y-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-12 text-sm">
              <span>{star}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </div>
            <Progress
              value={getPercentage(ratingDistribution[star] || 0)}
              className="h-2 flex-1"
            />
            <span className="text-sm text-muted-foreground w-8 text-right">
              {ratingDistribution[star] || 0}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ReviewStats;
