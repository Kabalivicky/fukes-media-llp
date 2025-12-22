-- Add explicit deny policies for unauthenticated users on sensitive tables

-- Profiles: Ensure only authenticated users can access their own profiles
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles
FOR ALL
TO anon
USING (false);

-- Contracts: Ensure only authenticated users can access their own contracts
CREATE POLICY "Deny anonymous access to contracts"
ON public.contracts
FOR ALL
TO anon
USING (false);

-- Pricing quotes: Require authentication for creating quotes
DROP POLICY IF EXISTS "Anyone can create pricing quotes" ON public.pricing_quotes;

CREATE POLICY "Authenticated users can create their own pricing quotes"
ON public.pricing_quotes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Deny anonymous access to pricing quotes"
ON public.pricing_quotes
FOR ALL
TO anon
USING (false);

-- Contact submissions: Add explicit deny for non-admin authenticated users reading
CREATE POLICY "Deny anonymous access to contact submissions"
ON public.contact_submissions
FOR ALL
TO anon
USING (false);

-- Tool usage: Deny anonymous access to viewing usage data
CREATE POLICY "Deny anonymous viewing of tool usage"
ON public.tool_usage
FOR SELECT
TO anon
USING (false);

-- User roles: Deny anonymous access
CREATE POLICY "Deny anonymous access to user roles"
ON public.user_roles
FOR ALL
TO anon
USING (false);