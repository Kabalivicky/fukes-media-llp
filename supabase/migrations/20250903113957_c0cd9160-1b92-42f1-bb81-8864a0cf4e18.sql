-- Create user profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  company TEXT,
  phone TEXT,
  bio TEXT,
  skills TEXT[],
  portfolio_url TEXT,
  linkedin_url TEXT,
  years_experience INTEGER,
  hourly_rate DECIMAL(10,2),
  availability TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for contact submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Admin-only access for contact submissions
CREATE POLICY "Admins can manage contact submissions" 
ON public.contact_submissions 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() 
  AND 'admin' = ANY(skills)
));

-- Create pricing quotes table
CREATE TABLE public.pricing_quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  client_name TEXT,
  client_email TEXT,
  project_name TEXT NOT NULL,
  project_type TEXT NOT NULL,
  service_type TEXT NOT NULL,
  pricing_tier TEXT NOT NULL,
  project_duration INTEGER,
  complexity_level TEXT,
  frame_count INTEGER,
  estimated_cost DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  specifications JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for pricing quotes
ALTER TABLE public.pricing_quotes ENABLE ROW LEVEL SECURITY;

-- Users can manage their own quotes
CREATE POLICY "Users can manage their own quotes" 
ON public.pricing_quotes 
FOR ALL 
USING (auth.uid() = user_id);

-- Anonymous users can create quotes (for potential clients)
CREATE POLICY "Anyone can create quotes" 
ON public.pricing_quotes 
FOR INSERT 
WITH CHECK (true);

-- Create contracts table
CREATE TABLE public.contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  project_name TEXT NOT NULL,
  project_type TEXT NOT NULL,
  project_description TEXT,
  start_date DATE,
  end_date DATE,
  total_amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_terms TEXT,
  milestones JSONB,
  deliverables TEXT[],
  revision_rounds INTEGER DEFAULT 3,
  ip_rights TEXT,
  special_clauses TEXT[],
  contract_terms TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'signed', 'active', 'completed', 'cancelled')),
  signed_at TIMESTAMP WITH TIME ZONE,
  contract_file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for contracts
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

-- Users can manage their own contracts
CREATE POLICY "Users can manage their own contracts" 
ON public.contracts 
FOR ALL 
USING (auth.uid() = user_id);

-- Create projects table for portfolio management
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  client TEXT,
  category TEXT,
  services TEXT[],
  duration_months INTEGER,
  year INTEGER,
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  video_url TEXT,
  case_study_url TEXT,
  technologies TEXT[],
  team_size INTEGER,
  budget_range TEXT,
  challenges TEXT[],
  solutions TEXT[],
  results TEXT[],
  testimonial TEXT,
  testimonial_author TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('in_progress', 'completed', 'on_hold')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects are public for viewing
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects 
FOR SELECT 
USING (true);

-- Only admins can manage projects
CREATE POLICY "Admins can manage projects" 
ON public.projects 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() 
  AND 'admin' = ANY(skills)
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pricing_quotes_updated_at
  BEFORE UPDATE ON public.pricing_quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contracts_updated_at
  BEFORE UPDATE ON public.contracts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email));
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('avatars', 'avatars', true),
  ('projects', 'projects', true),
  ('contracts', 'contracts', false),
  ('showreels', 'showreels', true);

-- Create storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for projects
CREATE POLICY "Project files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'projects');

CREATE POLICY "Admins can upload project files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'projects' AND EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() 
  AND 'admin' = ANY(skills)
));

-- Create storage policies for contracts
CREATE POLICY "Users can view their own contract files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'contracts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own contract files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'contracts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for showreels
CREATE POLICY "Showreel files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'showreels');

CREATE POLICY "Admins can upload showreel files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'showreels' AND EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() 
  AND 'admin' = ANY(skills)
));