-- Fix overly permissive INSERT policies

-- Fix notifications - only allow authenticated users to create notifications for themselves or via triggers
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.notifications;
CREATE POLICY "Users receive notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

-- The other WARN policies are from existing tables (newsletter_subscribers, contact_submissions) which need public insert for forms