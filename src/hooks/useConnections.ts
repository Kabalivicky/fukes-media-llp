import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { notifyNewFollower } from './useNotificationActions';

interface Connection {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export const useConnections = (targetUserId?: string) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Check if current user follows target user
  const checkFollowStatus = useCallback(async () => {
    if (!user || !targetUserId) return;

    try {
      const { data, error } = await supabase
        .from('connections')
        .select('id')
        .eq('follower_id', user.id)
        .eq('following_id', targetUserId)
        .maybeSingle();

      if (error) throw error;
      setIsFollowing(!!data);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  }, [user, targetUserId]);

  // Get follower count for a user
  const getFollowersCount = useCallback(async (userId: string) => {
    try {
      const { count, error } = await supabase
        .from('connections')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', userId);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting followers count:', error);
      return 0;
    }
  }, []);

  // Get following count for a user
  const getFollowingCount = useCallback(async (userId: string) => {
    try {
      const { count, error } = await supabase
        .from('connections')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', userId);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting following count:', error);
      return 0;
    }
  }, []);

  // Follow a user
  const follow = async (followingId: string) => {
    if (!user) {
      toast.error('Please sign in to follow users');
      return false;
    }

    if (user.id === followingId) {
      toast.error("You can't follow yourself");
      return false;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('connections')
        .insert({
          follower_id: user.id,
          following_id: followingId,
        });

      if (error) {
        if (error.code === '23505') {
          toast.info('You are already following this user');
        } else {
          throw error;
        }
        return false;
      }

      setIsFollowing(true);
      setFollowersCount(prev => prev + 1);

      // Notify the user being followed
      const { data: followerProfile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user.id)
        .single();

      await notifyNewFollower(followingId, followerProfile?.display_name || 'Someone');

      toast.success('Following!');
      return true;
    } catch (error: any) {
      console.error('Error following user:', error);
      toast.error('Failed to follow user');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Unfollow a user
  const unfollow = async (followingId: string) => {
    if (!user) {
      toast.error('Please sign in');
      return false;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', followingId);

      if (error) throw error;

      setIsFollowing(false);
      setFollowersCount(prev => Math.max(0, prev - 1));
      toast.success('Unfollowed');
      return true;
    } catch (error: any) {
      console.error('Error unfollowing user:', error);
      toast.error('Failed to unfollow user');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle follow status
  const toggleFollow = async (followingId: string) => {
    if (isFollowing) {
      return unfollow(followingId);
    } else {
      return follow(followingId);
    }
  };

  // Fetch counts on mount
  useEffect(() => {
    if (targetUserId) {
      checkFollowStatus();
      getFollowersCount(targetUserId).then(setFollowersCount);
      getFollowingCount(targetUserId).then(setFollowingCount);
    }
  }, [targetUserId, checkFollowStatus, getFollowersCount, getFollowingCount]);

  return {
    isFollowing,
    followersCount,
    followingCount,
    isLoading,
    follow,
    unfollow,
    toggleFollow,
    getFollowersCount,
    getFollowingCount,
  };
};
