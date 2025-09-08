-- Fix pricing_quotes RLS policies to prevent data exposure
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create quotes" ON public.pricing_quotes;
DROP POLICY IF EXISTS "Users can manage their own quotes" ON public.pricing_quotes;

-- Allow anyone to create quotes (for public pricing calculator)
CREATE POLICY "Anyone can create pricing quotes"
ON public.pricing_quotes
FOR INSERT
TO public
WITH CHECK (true);

-- Authenticated users can read their own quotes
CREATE POLICY "Users can read their own quotes"
ON public.pricing_quotes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Authenticated users can update their own quotes
CREATE POLICY "Users can update their own quotes"
ON public.pricing_quotes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Authenticated users can delete their own quotes
CREATE POLICY "Users can delete their own quotes"
ON public.pricing_quotes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Admins can read all quotes
CREATE POLICY "Admins can read all quotes"
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

-- Admins can update all quotes
CREATE POLICY "Admins can update all quotes"
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

-- Admins can delete all quotes
CREATE POLICY "Admins can delete all quotes"
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