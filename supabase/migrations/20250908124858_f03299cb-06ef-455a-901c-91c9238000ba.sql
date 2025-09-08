-- Fix pricing_quotes RLS policies - handle existing policies properly
-- First, let's check what policies exist and drop them all
DO $$
DECLARE
    pol RECORD;
BEGIN
    -- Drop all existing policies on pricing_quotes table
    FOR pol IN 
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'pricing_quotes'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', pol.policyname, pol.schemaname, pol.tablename);
    END LOOP;
END$$;

-- Create new secure policies

-- 1. Anyone can create quotes (needed for anonymous quote generation)
CREATE POLICY "pricing_quotes_insert_policy" 
ON public.pricing_quotes 
FOR INSERT 
WITH CHECK (true);

-- 2. Authenticated users can only read their own quotes
CREATE POLICY "pricing_quotes_select_own" 
ON public.pricing_quotes 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- 3. Authenticated users can update their own quotes
CREATE POLICY "pricing_quotes_update_own" 
ON public.pricing_quotes 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- 4. Authenticated users can delete their own quotes
CREATE POLICY "pricing_quotes_delete_own" 
ON public.pricing_quotes 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 5. Admins can read all quotes
CREATE POLICY "pricing_quotes_select_admin" 
ON public.pricing_quotes 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND 'admin' = ANY(profiles.skills)
  )
);

-- 6. Admins can update all quotes
CREATE POLICY "pricing_quotes_update_admin" 
ON public.pricing_quotes 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND 'admin' = ANY(profiles.skills)
  )
);

-- 7. Admins can delete all quotes
CREATE POLICY "pricing_quotes_delete_admin" 
ON public.pricing_quotes 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND 'admin' = ANY(profiles.skills)
  )
);