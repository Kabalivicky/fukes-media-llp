import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Review {
  id: string;
  reviewer_id: string;
  reviewed_user_id: string;
  project_brief_id: string | null;
  rating: number;
  title: string | null;
  content: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  reviewer?: {
    display_name: string | null;
    avatar_url: string | null;
    title: string | null;
  };
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}

export interface CreateReviewData {
  reviewed_user_id: string;
  project_brief_id?: string;
  rating: number;
  title?: string;
  content?: string;
}

export const useReviews = (userId?: string) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch reviews for a user
  const fetchReviews = useCallback(async () => {
    if (!userId) {
      setReviews([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          reviewer:profiles!reviews_reviewer_id_fkey(display_name, avatar_url, title)
        `)
        .eq('reviewed_user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data
      const transformedReviews: Review[] = (data || []).map((r: any) => ({
        ...r,
        reviewer: r.reviewer?.[0] || r.reviewer || null,
      }));

      setReviews(transformedReviews);

      // Calculate stats
      const totalReviews = transformedReviews.length;
      const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let totalRating = 0;

      transformedReviews.forEach((review) => {
        distribution[review.rating] = (distribution[review.rating] || 0) + 1;
        totalRating += review.rating;
      });

      setStats({
        averageRating: totalReviews > 0 ? totalRating / totalReviews : 0,
        totalReviews,
        ratingDistribution: distribution,
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Create a review
  const createReview = async (data: CreateReviewData): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to leave a review');
      return false;
    }

    if (data.reviewed_user_id === user.id) {
      toast.error('You cannot review yourself');
      return false;
    }

    setIsSubmitting(true);
    try {
      // Check if user already reviewed this person
      const { data: existing } = await supabase
        .from('reviews')
        .select('id')
        .eq('reviewer_id', user.id)
        .eq('reviewed_user_id', data.reviewed_user_id)
        .maybeSingle();

      if (existing) {
        toast.error('You have already reviewed this person');
        return false;
      }

      const { error } = await supabase.from('reviews').insert({
        reviewer_id: user.id,
        reviewed_user_id: data.reviewed_user_id,
        project_brief_id: data.project_brief_id || null,
        rating: data.rating,
        title: data.title || null,
        content: data.content || null,
      });

      if (error) throw error;

      toast.success('Review submitted successfully!');
      await fetchReviews();
      return true;
    } catch (error: any) {
      console.error('Error creating review:', error);
      toast.error('Failed to submit review');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update a review
  const updateReview = async (reviewId: string, data: Partial<CreateReviewData>): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in');
      return false;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .update({
          rating: data.rating,
          title: data.title,
          content: data.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reviewId)
        .eq('reviewer_id', user.id);

      if (error) throw error;

      toast.success('Review updated!');
      await fetchReviews();
      return true;
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete a review
  const deleteReview = async (reviewId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)
        .eq('reviewer_id', user.id);

      if (error) throw error;

      toast.success('Review deleted');
      await fetchReviews();
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
      return false;
    }
  };

  // Check if current user can review
  const canReview = user && userId && user.id !== userId;

  // Check if current user has already reviewed
  const hasReviewed = reviews.some((r) => r.reviewer_id === user?.id);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    stats,
    isLoading,
    isSubmitting,
    createReview,
    updateReview,
    deleteReview,
    canReview,
    hasReviewed,
    fetchReviews,
  };
};
