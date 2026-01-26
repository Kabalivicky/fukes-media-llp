import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type IndustryCategory = Database['public']['Enums']['industry_category'];

export interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  project_url: string | null;
  client: string | null;
  role: string | null;
  year: number | null;
  industries: IndustryCategory[] | null;
  tools_used: string[] | null;
  is_featured: boolean;
  views_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioItemInput {
  title: string;
  description?: string;
  thumbnail_url?: string;
  video_url?: string;
  project_url?: string;
  client?: string;
  role?: string;
  year?: number;
  industries?: IndustryCategory[];
  tools_used?: string[];
  is_featured?: boolean;
}

export const usePortfolioItems = (userId?: string) => {
  const { user } = useAuth();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const targetUserId = userId || user?.id;

  const fetchItems = useCallback(async () => {
    if (!targetUserId) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', targetUserId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [targetUserId]);

  const createItem = async (input: PortfolioItemInput) => {
    if (!user) {
      toast.error('Please sign in to add portfolio items');
      return null;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .insert({
          ...input,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setItems(prev => [data, ...prev]);
      toast.success('Portfolio item added!');
      return data;
    } catch (error: any) {
      console.error('Error creating portfolio item:', error);
      toast.error('Failed to add portfolio item');
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const updateItem = async (id: string, input: Partial<PortfolioItemInput>) => {
    if (!user) {
      toast.error('Please sign in');
      return false;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchItems();
      toast.success('Portfolio item updated!');
      return true;
    } catch (error: any) {
      console.error('Error updating portfolio item:', error);
      toast.error('Failed to update portfolio item');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!user) {
      toast.error('Please sign in');
      return false;
    }

    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== id));
      toast.success('Portfolio item deleted');
      return true;
    } catch (error: any) {
      console.error('Error deleting portfolio item:', error);
      toast.error('Failed to delete portfolio item');
      return false;
    }
  };

  const uploadThumbnail = async (file: File): Promise<string | null> => {
    if (!user) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('projects').getPublicUrl(fileName);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      toast.error('Failed to upload image');
      return null;
    }
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    isLoading,
    isSaving,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    uploadThumbnail,
  };
};
