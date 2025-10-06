-- Fix Critical Admin Privilege Escalation and Access Control Issues

-- 1. Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4. Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin'::app_role)
$$;

-- 5. Update contact_submissions policies to use secure role check
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can delete contact submissions" ON public.contact_submissions;

CREATE POLICY "Admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- 6. Update projects policies
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;

CREATE POLICY "Admins can insert projects" 
ON public.projects 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update projects" 
ON public.projects 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete projects" 
ON public.projects 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- 7. Update contracts policies
DROP POLICY IF EXISTS "Admins can view all contracts" ON public.contracts;
DROP POLICY IF EXISTS "Admins can update all contracts" ON public.contracts;
DROP POLICY IF EXISTS "Admins can delete all contracts" ON public.contracts;

CREATE POLICY "Admins can view all contracts" 
ON public.contracts 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all contracts" 
ON public.contracts 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete all contracts" 
ON public.contracts 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- 8. Update pricing_quotes policies
DROP POLICY IF EXISTS "pricing_quotes_select_admin" ON public.pricing_quotes;
DROP POLICY IF EXISTS "pricing_quotes_update_admin" ON public.pricing_quotes;
DROP POLICY IF EXISTS "pricing_quotes_delete_admin" ON public.pricing_quotes;

CREATE POLICY "pricing_quotes_select_admin" 
ON public.pricing_quotes 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "pricing_quotes_update_admin" 
ON public.pricing_quotes 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "pricing_quotes_delete_admin" 
ON public.pricing_quotes 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- 9. Update tool_usage policies
DROP POLICY IF EXISTS "Admins can view all tool usage" ON public.tool_usage;

CREATE POLICY "Admins can view all tool usage" 
ON public.tool_usage 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

-- 10. Add admin SELECT policy to profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

-- 11. Prevent users from modifying their skills array to add 'admin'
-- Create a trigger function to prevent skill changes that add 'admin'
CREATE OR REPLACE FUNCTION public.prevent_admin_skill_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If user is trying to add 'admin' to skills and they're not already an admin
  IF 'admin' = ANY(NEW.skills) AND NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Unauthorized: Cannot add admin role through skills field';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_no_admin_skill_escalation
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_admin_skill_escalation();

-- 12. Fix tool_usage INSERT policy - require authentication
DROP POLICY IF EXISTS "Anyone can log tool usage" ON public.tool_usage;

CREATE POLICY "Authenticated users can log their tool usage" 
ON public.tool_usage 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow unauthenticated logging with NULL user_id for public tools
CREATE POLICY "Public tools can log usage anonymously" 
ON public.tool_usage 
FOR INSERT 
TO anon
WITH CHECK (user_id IS NULL);

-- 13. Fix pricing_quotes INSERT policy - require authentication
DROP POLICY IF EXISTS "pricing_quotes_insert_policy" ON public.pricing_quotes;

CREATE POLICY "Authenticated users can create their quotes" 
ON public.pricing_quotes 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow anonymous quote creation with NULL user_id
CREATE POLICY "Anonymous users can create quotes" 
ON public.pricing_quotes 
FOR INSERT 
TO anon
WITH CHECK (user_id IS NULL);

-- 14. Add RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));