import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { notifyMilestoneUpdate, notifyPaymentReleased } from './useNotificationActions';

export interface EscrowMilestone {
  id: string;
  workspace_id: string;
  title: string;
  description: string | null;
  amount: number | null;
  due_date: string | null;
  status: 'pending' | 'in_progress' | 'submitted' | 'approved' | 'paid' | 'disputed';
  order_index: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EscrowSummary {
  total: number;
  paid: number;
  pending: number;
  inEscrow: number;
}

export const useEscrow = (workspaceId: string) => {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<EscrowMilestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [workspace, setWorkspace] = useState<{
    client_id: string;
    artist_id: string;
    budget: number | null;
  } | null>(null);

  const isClient = user?.id === workspace?.client_id;
  const isArtist = user?.id === workspace?.artist_id;

  const fetchEscrowData = useCallback(async () => {
    if (!workspaceId) return;

    try {
      // Fetch workspace info
      const { data: wsData, error: wsError } = await supabase
        .from('project_workspaces')
        .select('client_id, artist_id, budget')
        .eq('id', workspaceId)
        .single();

      if (wsError) throw wsError;
      setWorkspace(wsData);

      // Fetch milestones
      const { data, error } = await supabase
        .from('workspace_milestones')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setMilestones((data || []) as EscrowMilestone[]);
    } catch (error) {
      console.error('Error fetching escrow data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  const calculateSummary = useCallback((): EscrowSummary => {
    const total = milestones.reduce((sum, m) => sum + (m.amount || 0), 0);
    const paid = milestones
      .filter(m => m.status === 'paid')
      .reduce((sum, m) => sum + (m.amount || 0), 0);
    const inEscrow = milestones
      .filter(m => m.status === 'approved')
      .reduce((sum, m) => sum + (m.amount || 0), 0);
    const pending = total - paid - inEscrow;

    return { total, paid, pending, inEscrow };
  }, [milestones]);

  const createMilestone = async (data: {
    title: string;
    description?: string;
    amount?: number;
    due_date?: string;
  }) => {
    if (!user || !isClient) {
      toast.error('Only clients can create milestones');
      return null;
    }

    try {
      const maxIndex = Math.max(...milestones.map(m => m.order_index), -1);
      
      const { data: newMilestone, error } = await supabase
        .from('workspace_milestones')
        .insert({
          workspace_id: workspaceId,
          title: data.title,
          description: data.description,
          amount: data.amount,
          due_date: data.due_date,
          order_index: maxIndex + 1,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      setMilestones(prev => [...prev, newMilestone as EscrowMilestone]);
      toast.success('Milestone created');
      return newMilestone;
    } catch (error) {
      console.error('Error creating milestone:', error);
      toast.error('Failed to create milestone');
      return null;
    }
  };

  const updateMilestoneStatus = async (
    milestoneId: string, 
    status: EscrowMilestone['status']
  ) => {
    if (!user) return false;

    // Validate status transitions
    const milestone = milestones.find(m => m.id === milestoneId);
    if (!milestone) return false;

    // Artists can: mark as in_progress, submitted
    // Clients can: approve, mark as paid, dispute
    const artistStatuses: EscrowMilestone['status'][] = ['in_progress', 'submitted'];
    const clientStatuses: EscrowMilestone['status'][] = ['approved', 'paid', 'disputed', 'pending'];

    if (isArtist && !artistStatuses.includes(status)) {
      toast.error('Invalid status transition for artist');
      return false;
    }
    if (isClient && !clientStatuses.includes(status)) {
      toast.error('Invalid status transition for client');
      return false;
    }

    try {
      const updates: Record<string, any> = { status };
      if (status === 'paid') {
        updates.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('workspace_milestones')
        .update(updates)
        .eq('id', milestoneId);

      if (error) throw error;

      setMilestones(prev => prev.map(m => 
        m.id === milestoneId ? { ...m, ...updates } : m
      ));

      const statusMessages: Record<string, string> = {
        in_progress: 'Milestone started',
        submitted: 'Work submitted for review',
        approved: 'Milestone approved',
        paid: 'Payment released',
        disputed: 'Dispute raised',
      };

      toast.success(statusMessages[status] || 'Status updated');

      // Send notification to the other party
      if (workspace) {
        const recipientId = isArtist ? workspace.client_id : workspace.artist_id;
        await notifyMilestoneUpdate(recipientId, workspaceId, milestone.title, status, !isArtist);
        
        // If payment released, also notify artist with amount
        if (status === 'paid' && milestone.amount && isClient) {
          await notifyPaymentReleased(workspace.artist_id, milestone.amount, workspaceId);
        }
      }

      return true;
    } catch (error) {
      console.error('Error updating milestone:', error);
      toast.error('Failed to update milestone');
      return false;
    }
  };

  const fundMilestone = async (milestoneId: string) => {
    if (!isClient) {
      toast.error('Only clients can fund milestones');
      return false;
    }

    // In a real app, this would integrate with a payment provider
    // For now, we simulate by marking the milestone as having funds in escrow
    toast.info('Payment simulation: Funds would be held in escrow');
    return true;
  };

  const releaseFunds = async (milestoneId: string) => {
    if (!isClient) {
      toast.error('Only clients can release funds');
      return false;
    }

    return updateMilestoneStatus(milestoneId, 'paid');
  };

  useEffect(() => {
    fetchEscrowData();
  }, [fetchEscrowData]);

  return {
    milestones,
    isLoading,
    isClient,
    isArtist,
    summary: calculateSummary(),
    createMilestone,
    updateMilestoneStatus,
    fundMilestone,
    releaseFunds,
    refresh: fetchEscrowData,
  };
};
