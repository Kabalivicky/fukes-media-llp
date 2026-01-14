-- Create a secure view for subscriptions that hides Stripe IDs
CREATE VIEW public.subscriptions_public
WITH (security_invoker=on) AS
  SELECT 
    id,
    user_id,
    tier,
    current_period_start,
    current_period_end,
    cancel_at_period_end,
    created_at,
    updated_at
  FROM public.subscriptions;
  -- Excludes stripe_customer_id and stripe_subscription_id

-- Drop existing policies on subscriptions to recreate with stricter access
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can create their subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can update their subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Admins can manage subscriptions" ON public.subscriptions;

-- Deny direct SELECT access to base table (users should use the view)
CREATE POLICY "Deny direct select on subscriptions base table"
  ON public.subscriptions FOR SELECT
  USING (false);

-- Allow admins full access (they may need Stripe IDs for support)
CREATE POLICY "Admins have full access to subscriptions"
  ON public.subscriptions FOR ALL
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Users can still insert their own subscription
CREATE POLICY "Users can create their subscription"
  ON public.subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own subscription
CREATE POLICY "Users can update their subscription"
  ON public.subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- Grant SELECT on the view to authenticated users
GRANT SELECT ON public.subscriptions_public TO authenticated;

-- Add comment explaining the security pattern
COMMENT ON VIEW public.subscriptions_public IS 'Secure view that hides Stripe IDs. Use this instead of querying subscriptions directly.';