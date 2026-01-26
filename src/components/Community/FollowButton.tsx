import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface FollowButtonProps {
  targetUserId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onFollowChange?: (isFollowing: boolean) => void;
}

const FollowButton = ({
  targetUserId,
  variant = 'default',
  size = 'sm',
  className = '',
  onFollowChange,
}: FollowButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check initial follow status
  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!user || !targetUserId) {
        setIsChecking(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('connections')
          .select('id')
          .eq('follower_id', user.id)
          .eq('following_id', targetUserId)
          .maybeSingle();

        if (!error) {
          setIsFollowing(!!data);
        }
      } catch (error) {
        console.error('Error checking follow status:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkFollowStatus();
  }, [user, targetUserId]);

  const handleClick = async () => {
    if (!user) {
      toast.error('Please sign in to follow users');
      navigate('/auth');
      return;
    }

    if (user.id === targetUserId) {
      toast.error("You can't follow yourself");
      return;
    }

    setIsLoading(true);

    try {
      if (isFollowing) {
        // Unfollow
        const { error } = await supabase
          .from('connections')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', targetUserId);

        if (error) throw error;

        setIsFollowing(false);
        onFollowChange?.(false);
        toast.success('Unfollowed');
      } else {
        // Follow
        const { error } = await supabase
          .from('connections')
          .insert({
            follower_id: user.id,
            following_id: targetUserId,
          });

        if (error) {
          if (error.code === '23505') {
            toast.info('Already following');
            setIsFollowing(true);
          } else {
            throw error;
          }
        } else {
          setIsFollowing(true);
          onFollowChange?.(true);
          toast.success('Following!');
        }
      }
    } catch (error: any) {
      console.error('Error toggling follow:', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show button for own profile
  if (user?.id === targetUserId) {
    return null;
  }

  if (isChecking) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  return (
    <Button
      variant={isFollowing ? 'outline' : variant}
      size={size}
      className={className}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isFollowing ? (
        <>
          <UserMinus className="w-4 h-4 mr-1" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-1" />
          Follow
        </>
      )}
    </Button>
  );
};

export default FollowButton;
