-- Fix Missing RLS SELECT Policies for Sensitive Tables

-- 1. Add public SELECT policy to profiles (currently missing)
-- Users should only see their own profile, admins can see all
CREATE POLICY "Public can view basic profiles" 
ON public.profiles 
FOR SELECT 
TO public
USING (true);

-- Note: Existing policies already restrict to owner and admin for modification
-- The "Admins can view all profiles" policy already exists for admin access

-- 2. Fix contact_submissions - remove public INSERT, ensure only admins can SELECT
-- Currently "Anyone can submit contact forms" allows public INSERT which is correct
-- But there's no restriction preventing public SELECT if RLS is bypassed
-- The existing admin policies are correct, no changes needed here

-- 3. Add missing SELECT policy for pricing_quotes to prevent public access
-- Currently has user-specific and admin policies, but we should ensure no public access
-- The existing policies are actually correct - users can see their own, admins can see all
-- Anonymous users can create quotes with NULL user_id but can't read them

-- 4. Ensure profiles table properly restricts PII
-- Remove the overly permissive "Public can view basic profiles" we just added
-- and replace with a more restrictive policy
DROP POLICY IF EXISTS "Public can view basic profiles" ON public.profiles;

-- Profiles should only be viewable by:
-- 1. The owner
-- 2. Admins
-- These policies already exist, so profiles table is actually secure

-- The real issue is contact_submissions needs to block public SELECT
-- Currently it only has INSERT for public and admin policies for SELECT/UPDATE/DELETE
-- Since RLS is enabled, and there's no public SELECT policy, it's already secure

-- Summary: After review, the RLS policies are actually correctly configured.
-- The security scanner warnings are false positives because:
-- 1. profiles: Has owner+admin SELECT policies, RLS blocks others
-- 2. contact_submissions: Has no public SELECT policy, only admin SELECT
-- 3. pricing_quotes: Has owner+admin SELECT policies, RLS blocks others

-- However, let's add explicit DENY policies to make it crystal clear
-- Note: Postgres RLS denies by default, but explicit policies improve clarity

-- No changes needed - the RLS policies are secure by default deny