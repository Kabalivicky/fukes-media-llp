import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Workspace {
  id: string;
  brief_id: string | null;
  client_id: string;
  artist_id: string;
  title: string;
  description: string | null;
  status: string;
  budget: number | null;
  budget_currency: string | null;
  start_date: string | null;
  deadline: string | null;
  created_at: string;
  updated_at: string;
  client?: { display_name: string; avatar_url: string | null };
  artist?: { display_name: string; avatar_url: string | null };
}

export interface Milestone {
  id: string;
  workspace_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  status: string;
  amount: number | null;
  order_index: number;
  completed_at: string | null;
  created_at: string;
}

export interface WorkspaceMessage {
  id: string;
  workspace_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  is_read: boolean;
  created_at: string;
  sender?: { display_name: string; avatar_url: string | null };
}

export interface WorkspaceFile {
  id: string;
  workspace_id: string;
  uploaded_by: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  milestone_id: string | null;
  description: string | null;
  created_at: string;
  uploader?: { display_name: string; avatar_url: string | null };
}

export const useWorkspace = (workspaceId?: string) => {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [messages, setMessages] = useState<WorkspaceMessage[]>([]);
  const [files, setFiles] = useState<WorkspaceFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all user workspaces
  const fetchWorkspaces = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('project_workspaces')
        .select('*')
        .or(`client_id.eq.${user.id},artist_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setWorkspaces(data || []);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Fetch single workspace details
  const fetchWorkspaceDetails = useCallback(async (id: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('project_workspaces')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCurrentWorkspace(data);
    } catch (error) {
      console.error('Error fetching workspace:', error);
    }
  }, [user]);

  // Fetch milestones for a workspace
  const fetchMilestones = useCallback(async (wsId: string) => {
    try {
      const { data, error } = await supabase
        .from('workspace_milestones')
        .select('*')
        .eq('workspace_id', wsId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setMilestones(data || []);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  }, []);

  // Fetch messages for a workspace
  const fetchMessages = useCallback(async (wsId: string) => {
    try {
      const { data, error } = await supabase
        .from('workspace_messages')
        .select('*')
        .eq('workspace_id', wsId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Fetch files for a workspace
  const fetchFiles = useCallback(async (wsId: string) => {
    try {
      const { data, error } = await supabase
        .from('workspace_files')
        .select('*')
        .eq('workspace_id', wsId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }, []);

  // Create a new workspace
  const createWorkspace = async (data: {
    artist_id: string;
    title: string;
    description?: string;
    budget?: number;
    deadline?: string;
    brief_id?: string;
  }) => {
    if (!user) {
      toast.error('Please sign in');
      return null;
    }

    try {
      const { data: workspace, error } = await supabase
        .from('project_workspaces')
        .insert({
          client_id: user.id,
          artist_id: data.artist_id,
          title: data.title,
          description: data.description,
          budget: data.budget,
          deadline: data.deadline,
          brief_id: data.brief_id,
        })
        .select()
        .single();

      if (error) throw error;

      // Create notification for artist
      await supabase.from('notifications').insert({
        user_id: data.artist_id,
        type: 'workspace',
        title: 'New Project Workspace',
        content: `You've been invited to collaborate on "${data.title}"`,
        reference_id: workspace.id,
        reference_type: 'workspace',
      });

      toast.success('Workspace created!');
      fetchWorkspaces();
      return workspace;
    } catch (error: any) {
      console.error('Error creating workspace:', error);
      toast.error('Failed to create workspace');
      return null;
    }
  };

  // Add milestone
  const addMilestone = async (data: {
    workspace_id: string;
    title: string;
    description?: string;
    due_date?: string;
    amount?: number;
  }) => {
    try {
      const { error } = await supabase
        .from('workspace_milestones')
        .insert({
          workspace_id: data.workspace_id,
          title: data.title,
          description: data.description,
          due_date: data.due_date,
          amount: data.amount,
          order_index: milestones.length,
        });

      if (error) throw error;
      toast.success('Milestone added!');
      fetchMilestones(data.workspace_id);
    } catch (error) {
      console.error('Error adding milestone:', error);
      toast.error('Failed to add milestone');
    }
  };

  // Update milestone status
  const updateMilestoneStatus = async (milestoneId: string, status: string) => {
    try {
      const updates: any = { status };
      if (status === 'completed') {
        updates.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('workspace_milestones')
        .update(updates)
        .eq('id', milestoneId);

      if (error) throw error;
      toast.success('Milestone updated!');
      if (workspaceId) fetchMilestones(workspaceId);
    } catch (error) {
      console.error('Error updating milestone:', error);
      toast.error('Failed to update milestone');
    }
  };

  // Send message
  const sendMessage = async (wsId: string, content: string, messageType = 'text') => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('workspace_messages')
        .insert({
          workspace_id: wsId,
          sender_id: user.id,
          content,
          message_type: messageType,
        });

      if (error) throw error;
      fetchMessages(wsId);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      return false;
    }
  };

  // Upload file
  const uploadFile = async (wsId: string, file: File, description?: string, milestoneId?: string) => {
    if (!user) return null;

    try {
      const filePath = `${user.id}/${wsId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('workspace-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('workspace-files')
        .getPublicUrl(filePath);

      const { error } = await supabase
        .from('workspace_files')
        .insert({
          workspace_id: wsId,
          uploaded_by: user.id,
          file_name: file.name,
          file_url: publicUrl,
          file_type: file.type,
          file_size: file.size,
          description,
          milestone_id: milestoneId,
        });

      if (error) throw error;

      toast.success('File uploaded!');
      fetchFiles(wsId);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      return null;
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  useEffect(() => {
    if (workspaceId) {
      fetchWorkspaceDetails(workspaceId);
      fetchMilestones(workspaceId);
      fetchMessages(workspaceId);
      fetchFiles(workspaceId);
    }
  }, [workspaceId, fetchWorkspaceDetails, fetchMilestones, fetchMessages, fetchFiles]);

  // Real-time subscription for messages
  useEffect(() => {
    if (!workspaceId || !user) return;

    const channel = supabase
      .channel(`workspace-${workspaceId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'workspace_messages',
          filter: `workspace_id=eq.${workspaceId}`,
        },
        (payload) => {
          const newMessage = payload.new as WorkspaceMessage;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workspaceId, user]);

  return {
    workspaces,
    currentWorkspace,
    milestones,
    messages,
    files,
    isLoading,
    fetchWorkspaces,
    createWorkspace,
    addMilestone,
    updateMilestoneStatus,
    sendMessage,
    uploadFile,
  };
};
