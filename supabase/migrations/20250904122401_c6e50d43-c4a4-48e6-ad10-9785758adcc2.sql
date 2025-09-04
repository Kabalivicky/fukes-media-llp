-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Users can manage their own contracts" ON public.contracts;

-- Create specific policies for contract access control
CREATE POLICY "Users can view their own contracts" 
ON public.contracts 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all contracts" 
ON public.contracts 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND 'admin' = ANY(profiles.skills)
  )
);

CREATE POLICY "Users can create their own contracts" 
ON public.contracts 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contracts" 
ON public.contracts 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all contracts" 
ON public.contracts 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND 'admin' = ANY(profiles.skills)
  )
);

CREATE POLICY "Users can delete their own contracts" 
ON public.contracts 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete all contracts" 
ON public.contracts 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND 'admin' = ANY(profiles.skills)
  )
);