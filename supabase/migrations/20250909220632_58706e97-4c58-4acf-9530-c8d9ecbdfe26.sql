-- Fix contact_submissions RLS policies for security
-- Drop existing policies and create secure ones

DO $$
DECLARE
    pol RECORD;
BEGIN
    -- Drop all existing policies on contact_submissions table
    FOR pol IN 
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'contact_submissions'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', pol.policyname, pol.schemaname, pol.tablename);
    END LOOP;
END$$;

-- Create secure policies

-- 1. Allow anyone to submit contact forms (INSERT only)
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- 2. Only admins can read contact submissions
CREATE POLICY "Admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND 'admin' = ANY(profiles.skills)
  )
);

-- 3. Only admins can update contact submissions
CREATE POLICY "Admins can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND 'admin' = ANY(profiles.skills)
  )
);

-- 4. Only admins can delete contact submissions
CREATE POLICY "Admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND 'admin' = ANY(profiles.skills)
  )
);