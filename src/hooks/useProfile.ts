import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type IndustryCategory = Database['public']['Enums']['industry_category'];

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  location: string | null;
  skills: string[] | null;
  industries: IndustryCategory[] | null;
  is_available_for_hire: boolean | null;
  subscription_tier: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  hourly_rate: number | null;
  years_experience: number | null;
  availability: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateData {
  display_name?: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  cover_url?: string;
  location?: string;
  skills?: string[];
  industries?: IndustryCategory[];
  is_available_for_hire?: boolean;
  portfolio_url?: string;
  linkedin_url?: string;
  hourly_rate?: number;
  years_experience?: number;
  availability?: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch current user's profile
  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Update profile
  const updateProfile = async (updates: ProfileUpdateData) => {
    if (!user) {
      toast.error('Please sign in to update your profile');
      return false;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Refresh profile data
      await fetchProfile();
      toast.success('Profile updated successfully!');
      return true;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Upload avatar
  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!user) {
      toast.error('Please sign in');
      return null;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    try {
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar');
      return null;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    isSaving,
    fetchProfile,
    updateProfile,
    uploadAvatar,
  };
};
