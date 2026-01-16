-- Fix: Drop existing admin policy first, then recreate subscription policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Recreate admin policy for profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Ensure subscription policy exists
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;

CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));