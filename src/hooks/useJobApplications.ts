import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface JobCompany {
  name: string;
  logo_url: string | null;
  is_verified: boolean;
  slug?: string;
}

export interface JobSummary {
  id: string;
  title: string;
  location: string | null;
  is_remote: boolean;
  job_type: string;
  experience_level: string;
  company?: JobCompany;
}

export interface JobApplication {
  id: string;
  job_id: string;
  applicant_id: string;
  cover_letter: string | null;
  resume_url: string | null;
  portfolio_url: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  job?: JobSummary;
}

export interface ApplyJobData {
  job_id: string;
  cover_letter?: string;
  resume_url?: string;
  portfolio_url?: string;
}

export const useJobApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user's applications
  const fetchApplications = useCallback(async () => {
    if (!user) {
      setApplications([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job:jobs(
            id, title, location, is_remote, job_type, experience_level,
            company:companies(name, logo_url, is_verified)
          )
        `)
        .eq('applicant_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Apply to a job
  const applyToJob = async (data: ApplyJobData): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to apply');
      return false;
    }

    setIsSubmitting(true);
    try {
      // Check if already applied
      const { data: existing } = await supabase
        .from('job_applications')
        .select('id')
        .eq('applicant_id', user.id)
        .eq('job_id', data.job_id)
        .maybeSingle();

      if (existing) {
        toast.error('You have already applied to this job');
        return false;
      }

      const { error } = await supabase.from('job_applications').insert({
        applicant_id: user.id,
        job_id: data.job_id,
        cover_letter: data.cover_letter || null,
        resume_url: data.resume_url || null,
        portfolio_url: data.portfolio_url || null,
        status: 'pending',
      });

      if (error) throw error;

      toast.success('Application submitted successfully!');
      await fetchApplications();
      return true;
    } catch (error: any) {
      console.error('Error applying to job:', error);
      toast.error('Failed to submit application');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if user has applied to a specific job
  const hasApplied = (jobId: string): boolean => {
    return applications.some((app) => app.job_id === jobId);
  };

  // Get application status for a job
  const getApplicationStatus = (jobId: string): string | null => {
    const app = applications.find((a) => a.job_id === jobId);
    return app?.status || null;
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    isLoading,
    isSubmitting,
    applyToJob,
    hasApplied,
    getApplicationStatus,
    fetchApplications,
  };
};
