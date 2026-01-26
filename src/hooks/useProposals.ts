import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Proposal {
  id: string;
  brief_id: string;
  artist_id: string;
  cover_letter: string;
  portfolio_samples: string[] | null;
  proposed_budget: number | null;
  proposed_timeline: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  artist?: {
    display_name: string;
    avatar_url: string | null;
    title: string | null;
    hourly_rate: number | null;
  };
  brief?: {
    title: string;
    client_id: string;
  };
}

export interface ProposalInput {
  brief_id: string;
  cover_letter: string;
  portfolio_samples?: string[];
  proposed_budget?: number;
  proposed_timeline?: string;
}

export const useProposals = (briefId?: string) => {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [myProposals, setMyProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProposalsForBrief = useCallback(async () => {
    if (!briefId) return;

    try {
      const { data, error } = await supabase
        .from('project_proposals')
        .select('*')
        .eq('brief_id', briefId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch artist profiles
      const artistIds = [...new Set((data || []).map(p => p.artist_id))];
      if (artistIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles_public')
          .select('user_id, display_name, avatar_url, title, hourly_rate')
          .in('user_id', artistIds);

        const profileMap = new Map(
          (profiles || []).map(p => [p.user_id, p])
        );

        const proposalsWithArtists = (data || []).map(proposal => ({
          ...proposal,
          artist: profileMap.get(proposal.artist_id) || { display_name: 'Anonymous', avatar_url: null, title: null, hourly_rate: null },
        }));

        setProposals(proposalsWithArtists);
      } else {
        setProposals(data || []);
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setIsLoading(false);
    }
  }, [briefId]);

  const fetchMyProposals = useCallback(async () => {
    if (!user) {
      setMyProposals([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('project_proposals')
        .select('*')
        .eq('artist_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch brief info
      const briefIds = [...new Set((data || []).map(p => p.brief_id))];
      if (briefIds.length > 0) {
        const { data: briefs } = await supabase
          .from('project_briefs')
          .select('id, title, client_id')
          .in('id', briefIds);

        const briefMap = new Map(
          (briefs || []).map(b => [b.id, b])
        );

        const proposalsWithBriefs = (data || []).map(proposal => ({
          ...proposal,
          brief: briefMap.get(proposal.brief_id) || { title: 'Unknown', client_id: '' },
        }));

        setMyProposals(proposalsWithBriefs);
      } else {
        setMyProposals(data || []);
      }
    } catch (error) {
      console.error('Error fetching my proposals:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const submitProposal = async (input: ProposalInput) => {
    if (!user) {
      toast.error('Please sign in to submit a proposal');
      return null;
    }

    setIsSaving(true);
    try {
      // Check if already submitted
      const { data: existing } = await supabase
        .from('project_proposals')
        .select('id')
        .eq('brief_id', input.brief_id)
        .eq('artist_id', user.id)
        .maybeSingle();

      if (existing) {
        toast.error('You have already submitted a proposal for this project');
        return null;
      }

      const { data, error } = await supabase
        .from('project_proposals')
        .insert({
          ...input,
          artist_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Proposal submitted successfully!');
      return data;
    } catch (error: any) {
      console.error('Error submitting proposal:', error);
      toast.error('Failed to submit proposal');
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const updateProposalStatus = async (proposalId: string, status: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('project_proposals')
        .update({ status })
        .eq('id', proposalId);

      if (error) throw error;

      setProposals(prev => prev.map(p => 
        p.id === proposalId ? { ...p, status } : p
      ));

      toast.success(`Proposal ${status}`);
      return true;
    } catch (error) {
      console.error('Error updating proposal:', error);
      toast.error('Failed to update proposal');
      return false;
    }
  };

  const withdrawProposal = async (proposalId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('project_proposals')
        .update({ status: 'withdrawn' })
        .eq('id', proposalId)
        .eq('artist_id', user.id);

      if (error) throw error;

      setMyProposals(prev => prev.map(p => 
        p.id === proposalId ? { ...p, status: 'withdrawn' } : p
      ));

      toast.success('Proposal withdrawn');
      return true;
    } catch (error) {
      console.error('Error withdrawing proposal:', error);
      toast.error('Failed to withdraw proposal');
      return false;
    }
  };

  useEffect(() => {
    fetchProposalsForBrief();
    fetchMyProposals();
  }, [fetchProposalsForBrief, fetchMyProposals]);

  return {
    proposals,
    myProposals,
    isLoading,
    isSaving,
    submitProposal,
    updateProposalStatus,
    withdrawProposal,
    refreshProposals: fetchProposalsForBrief,
    refreshMyProposals: fetchMyProposals,
  };
};
