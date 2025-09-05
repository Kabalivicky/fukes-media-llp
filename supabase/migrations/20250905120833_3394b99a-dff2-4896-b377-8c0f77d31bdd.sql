-- Create tools usage tracking table
CREATE TABLE public.tool_usage (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    tool_name TEXT NOT NULL,
    input_format TEXT,
    output_format TEXT,
    file_size BIGINT,
    processing_time INTEGER,
    success BOOLEAN DEFAULT true,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tool_usage ENABLE ROW LEVEL SECURITY;

-- Create policies for tool usage tracking
CREATE POLICY "Users can view their own tool usage" 
ON public.tool_usage 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can log tool usage" 
ON public.tool_usage 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view all tool usage" 
ON public.tool_usage 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND 'admin' = ANY(profiles.skills)
  )
);