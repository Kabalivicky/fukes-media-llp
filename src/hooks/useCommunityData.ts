import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { sampleMembers, samplePortfolio, CommunityMember, PortfolioItem } from '@/data/communityData';

interface ProfileFromDB {
  id: string;
  user_id: string;
  display_name: string | null;
  title: string | null;
  avatar_url: string | null;
  location: string | null;
  skills: string[] | null;
  industries: string[] | null;
  subscription_tier: string | null;
  is_available_for_hire: boolean | null;
}

interface PortfolioFromDB {
  id: string;
  title: string;
  thumbnail_url: string | null;
  user_id: string;
  industries: string[] | null;
  views_count: number | null;
  likes_count: number | null;
}

export const useCommunityData = () => {
  const [members, setMembers] = useState<CommunityMember[]>(sampleMembers);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(samplePortfolio);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch profiles from the public view
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, user_id, display_name, title, avatar_url, location, skills, industries, subscription_tier, is_available_for_hire')
          .limit(50);

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          // Fall back to sample data
          setMembers(sampleMembers);
        } else if (profilesData && profilesData.length > 0) {
          // Transform DB data to CommunityMember format
          const transformedMembers: CommunityMember[] = profilesData.map((profile: ProfileFromDB) => ({
            id: profile.id,
            display_name: profile.display_name || 'Anonymous',
            title: profile.title || 'Creative Professional',
            avatar_url: profile.avatar_url,
            location: profile.location || 'Location not specified',
            industries: profile.industries || [],
            skills: profile.skills || [],
            is_available_for_hire: profile.is_available_for_hire || false,
            subscription_tier: profile.subscription_tier || 'free',
            portfolio_count: 0, // Will be updated with portfolio query
            followers_count: 0, // Will be updated with connections query
            featured: profile.subscription_tier === 'studio' || profile.subscription_tier === 'enterprise',
          }));

          // Combine with sample data for demo purposes
          const combinedMembers = [...transformedMembers, ...sampleMembers];
          setMembers(combinedMembers);
        } else {
          // No DB data, use sample data
          setMembers(sampleMembers);
        }

        // Fetch portfolio items
        const { data: portfolioData, error: portfolioError } = await supabase
          .from('portfolio_items')
          .select('id, title, thumbnail_url, user_id, industries, views_count, likes_count')
          .limit(20);

        if (portfolioError) {
          console.error('Error fetching portfolio:', portfolioError);
          setPortfolio(samplePortfolio);
        } else if (portfolioData && portfolioData.length > 0) {
          // Get user display names for portfolio items
          const userIds = [...new Set(portfolioData.map((p: PortfolioFromDB) => p.user_id))];
          const { data: usersData } = await supabase
            .from('profiles')
            .select('user_id, display_name')
            .in('user_id', userIds);

          const userMap = new Map(
            (usersData || []).map((u: { user_id: string; display_name: string | null }) => [u.user_id, u.display_name])
          );

          const transformedPortfolio: PortfolioItem[] = portfolioData.map((item: PortfolioFromDB) => ({
            id: item.id,
            title: item.title,
            thumbnail_url: item.thumbnail_url,
            user: { display_name: userMap.get(item.user_id) || 'Anonymous' },
            industries: item.industries || [],
            views_count: item.views_count || 0,
            likes_count: item.likes_count || 0,
          }));

          // Combine with sample data
          const combinedPortfolio = [...transformedPortfolio, ...samplePortfolio];
          setPortfolio(combinedPortfolio);
        } else {
          setPortfolio(samplePortfolio);
        }
      } catch (err) {
        console.error('Error in useCommunityData:', err);
        setError('Failed to load community data');
        // Fall back to sample data
        setMembers(sampleMembers);
        setPortfolio(samplePortfolio);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { members, portfolio, isLoading, error };
};
