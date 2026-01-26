import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import { toast } from 'sonner';

export interface AdminStats {
  totalUsers: number;
  totalJobs: number;
  totalCompanies: number;
  totalBriefs: number;
  totalProposals: number;
  activeSubscriptions: number;
}

export interface AdminUser {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  title: string | null;
  created_at: string;
  subscription_tier: string | null;
}

export const useAdminDashboard = () => {
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    if (!isAdmin) return;

    try {
      // Fetch counts from various tables
      const [
        { count: usersCount },
        { count: jobsCount },
        { count: companiesCount },
        { count: briefsCount },
        { count: proposalsCount },
        { count: subsCount },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('jobs').select('*', { count: 'exact', head: true }),
        supabase.from('companies').select('*', { count: 'exact', head: true }),
        supabase.from('project_briefs').select('*', { count: 'exact', head: true }),
        supabase.from('project_proposals').select('*', { count: 'exact', head: true }),
        supabase.from('subscriptions').select('*', { count: 'exact', head: true }).neq('tier', 'free'),
      ]);

      setStats({
        totalUsers: usersCount || 0,
        totalJobs: jobsCount || 0,
        totalCompanies: companiesCount || 0,
        totalBriefs: briefsCount || 0,
        totalProposals: proposalsCount || 0,
        activeSubscriptions: subsCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUsers = async () => {
    if (!isAdmin) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, user_id, display_name, avatar_url, title, created_at, subscription_tier')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: 'admin' | 'moderator' | 'user') => {
    if (!isAdmin || !user) {
      toast.error('Unauthorized');
      return false;
    }

    try {
      if (role === 'user') {
        // Remove role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .neq('role', 'user');

        if (error) throw error;
      } else {
        // Upsert role
        const { error } = await supabase
          .from('user_roles')
          .upsert({
            user_id: userId,
            role,
            created_by: user.id,
          }, {
            onConflict: 'user_id,role',
          });

        if (error) throw error;
      }

      toast.success(`User role updated to ${role}`);
      return true;
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
      return false;
    }
  };

  const deleteUser = async (userId: string) => {
    if (!isAdmin) {
      toast.error('Unauthorized');
      return false;
    }

    // Note: This only deletes the profile, not the auth.users entry
    // In production, you'd use a service role or edge function
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      setUsers(prev => prev.filter(u => u.user_id !== userId));
      toast.success('User profile deleted');
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
      return false;
    }
  };

  useEffect(() => {
    if (!adminLoading && isAdmin) {
      fetchStats();
      fetchUsers();
    }
  }, [isAdmin, adminLoading]);

  return {
    isAdmin,
    isLoading: isLoading || adminLoading,
    stats,
    users,
    fetchStats,
    fetchUsers,
    updateUserRole,
    deleteUser,
  };
};
