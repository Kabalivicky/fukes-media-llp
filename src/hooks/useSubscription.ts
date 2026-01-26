import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type SubscriptionTier = Database['public']['Enums']['subscription_tier'];

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingPlan {
  id: SubscriptionTier;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with basic features',
    price: 0,
    interval: 'month',
    features: [
      'Create profile',
      'Browse jobs',
      'Browse resources',
      'Up to 5 portfolio items',
      'Basic search',
      'Community access',
    ],
  },
  {
    id: 'artist',
    name: 'Artist',
    description: 'For individual creatives',
    price: 9,
    interval: 'month',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Unlimited portfolio items',
      'Featured in search results',
      'Priority job applications',
      'Advanced analytics',
      'Custom portfolio URL',
      'Verified badge',
      'Direct messaging',
    ],
  },
  {
    id: 'studio',
    name: 'Studio',
    description: 'For teams and studios',
    price: 29,
    interval: 'month',
    features: [
      'Everything in Artist',
      'Post unlimited jobs',
      'Company profile page',
      'Applicant tracking',
      'Team collaboration',
      'Priority support',
      'API access',
      'Custom branding',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: 99,
    interval: 'month',
    features: [
      'Everything in Studio',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'White-label options',
      'Advanced security',
      'Bulk hiring tools',
      'Training & onboarding',
    ],
  },
];

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // First check subscriptions_public view
      const { data, error } = await supabase
        .from('subscriptions_public')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Subscribe to a plan (demo mode - stores in database)
  const subscribe = async (planId: SubscriptionTier): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return false;
    }

    setIsProcessing(true);
    try {
      const now = new Date();
      const periodEnd = new Date(now);
      periodEnd.setMonth(periodEnd.getMonth() + 1);

      // Check if subscription exists
      const { data: existing } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        // Update existing subscription
        const { error } = await supabase
          .from('subscriptions')
          .update({
            tier: planId,
            current_period_start: now.toISOString(),
            current_period_end: periodEnd.toISOString(),
            cancel_at_period_end: false,
            updated_at: now.toISOString(),
          })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new subscription
        const { error } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user.id,
            tier: planId,
            current_period_start: now.toISOString(),
            current_period_end: periodEnd.toISOString(),
          });

        if (error) throw error;
      }

      // Also update profile subscription tier
      await supabase
        .from('profiles')
        .update({ subscription_tier: planId })
        .eq('user_id', user.id);

      await fetchSubscription();
      
      const plan = pricingPlans.find(p => p.id === planId);
      toast.success(`Successfully subscribed to ${plan?.name || planId} plan!`);
      return true;
    } catch (error: any) {
      console.error('Error subscribing:', error);
      toast.error('Failed to subscribe');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Cancel subscription
  const cancelSubscription = async (): Promise<boolean> => {
    if (!user || !subscription) {
      return false;
    }

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          cancel_at_period_end: true,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchSubscription();
      toast.success('Subscription will be cancelled at the end of the billing period');
      return true;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Check if user has access to a feature based on their tier
  const hasAccess = (requiredTier: SubscriptionTier): boolean => {
    const tiers: SubscriptionTier[] = ['free', 'artist', 'studio', 'enterprise'];
    const currentTierIndex = tiers.indexOf(subscription?.tier || 'free');
    const requiredTierIndex = tiers.indexOf(requiredTier);
    return currentTierIndex >= requiredTierIndex;
  };

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,
    currentTier: subscription?.tier || 'free',
    isLoading,
    isProcessing,
    subscribe,
    cancelSubscription,
    hasAccess,
    plans: pricingPlans,
    fetchSubscription,
  };
};
