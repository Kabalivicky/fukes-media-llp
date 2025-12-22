-- Drop the anonymous quote creation policy to require authentication
DROP POLICY IF EXISTS "Anonymous users can create quotes" ON public.pricing_quotes;