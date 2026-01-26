import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type IndustryCategory = Database['public']['Enums']['industry_category'];

export interface ProjectBrief {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category: string | null;
  industries: IndustryCategory[] | null;
  required_skills: string[] | null;
  budget_min: number | null;
  budget_max: number | null;
  budget_currency: string;
  budget_type: string;
  deadline: string | null;
  duration_estimate: string | null;
  attachments: string[] | null;
  is_remote: boolean;
  location: string | null;
  status: string;
  is_featured: boolean;
  views_count: number;
  proposals_count: number;
  created_at: string;
  updated_at: string;
  client?: {
    display_name: string;
    avatar_url: string | null;
  };
}

export interface ProjectBriefInput {
  title: string;
  description: string;
  category?: string;
  industries?: IndustryCategory[];
  required_skills?: string[];
  budget_min?: number;
  budget_max?: number;
  budget_currency?: string;
  budget_type?: string;
  deadline?: string;
  duration_estimate?: string;
  is_remote?: boolean;
  location?: string;
}

export const useProjectBriefs = () => {
  const { user } = useAuth();
  const [briefs, setBriefs] = useState<ProjectBrief[]>([]);
  const [myBriefs, setMyBriefs] = useState<ProjectBrief[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchBriefs = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_briefs')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch client profiles
      const clientIds = [...new Set((data || []).map(b => b.client_id))];
      if (clientIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles_public')
          .select('user_id, display_name, avatar_url')
          .in('user_id', clientIds);

        const profileMap = new Map(
          (profiles || []).map(p => [p.user_id, p])
        );

        const briefsWithClients = (data || []).map(brief => ({
          ...brief,
          client: profileMap.get(brief.client_id) || { display_name: 'Anonymous', avatar_url: null },
        }));

        setBriefs(briefsWithClients);
      } else {
        setBriefs(data || []);
      }
    } catch (error) {
      console.error('Error fetching briefs:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMyBriefs = useCallback(async () => {
    if (!user) {
      setMyBriefs([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('project_briefs')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMyBriefs(data || []);
    } catch (error) {
      console.error('Error fetching my briefs:', error);
    }
  }, [user]);

  const createBrief = async (input: ProjectBriefInput) => {
    if (!user) {
      toast.error('Please sign in to post a project');
      return null;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('project_briefs')
        .insert({
          ...input,
          client_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setMyBriefs(prev => [data, ...prev]);
      toast.success('Project posted successfully!');
      return data;
    } catch (error: any) {
      console.error('Error creating brief:', error);
      toast.error('Failed to post project');
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const updateBrief = async (id: string, input: Partial<ProjectBriefInput>) => {
    if (!user) return false;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('project_briefs')
        .update(input)
        .eq('id', id)
        .eq('client_id', user.id);

      if (error) throw error;

      await fetchMyBriefs();
      toast.success('Project updated!');
      return true;
    } catch (error) {
      console.error('Error updating brief:', error);
      toast.error('Failed to update project');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteBrief = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('project_briefs')
        .delete()
        .eq('id', id)
        .eq('client_id', user.id);

      if (error) throw error;

      setMyBriefs(prev => prev.filter(b => b.id !== id));
      toast.success('Project deleted');
      return true;
    } catch (error) {
      console.error('Error deleting brief:', error);
      toast.error('Failed to delete project');
      return false;
    }
  };

  useEffect(() => {
    fetchBriefs();
    fetchMyBriefs();
  }, [fetchBriefs, fetchMyBriefs]);

  return {
    briefs,
    myBriefs,
    isLoading,
    isSaving,
    fetchBriefs,
    fetchMyBriefs,
    createBrief,
    updateBrief,
    deleteBrief,
  };
};
