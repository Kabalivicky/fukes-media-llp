-- Fix pricing_quotes RLS policies to properly restrict access
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create quotes" ON public.pricing_quotes;
DROP POLICY IF EXISTS "Users can manage their own quotes" ON public.pricing_quotes;

-- Create new restrictive policies

-- 1. Anyone can create quotes (needed for anonymous quote generation)
CREATE POLICY "Anyone can create pricing quotes" 
ON public.pricing_quotes 
FOR INSERT 
WITH CHECK (true);

-- 2. Authenticated users can only read their own quotes
CREATE POLICY "Users can read their own quotes" 
ON public.pricing_quotes 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- 3. Authenticated users can update their own quotes
CREATE POLICY "Users can update their own quotes" 
ON public.pricing_quotes 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- 4. Authenticated users can delete their own quotes
CREATE POLICY "Users can delete their own quotes" 
ON public.pricing_quotes 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 5. Admins can read all quotes
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

-- 6. Admins can update all quotes
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

-- 7. Admins can delete all quotes
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