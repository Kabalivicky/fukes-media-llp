-- Create enum types for the platform
CREATE TYPE public.job_type AS ENUM ('full-time', 'part-time', 'contract', 'freelance', 'internship', 'remote');
CREATE TYPE public.experience_level AS ENUM ('entry', 'junior', 'mid', 'senior', 'lead', 'executive');
CREATE TYPE public.industry_category AS ENUM ('vfx', 'animation', 'film', 'tv', 'gaming', 'advertising', 'virtual-production', 'ar-vr', 'youtube', 'ai-ml');
CREATE TYPE public.resource_type AS ENUM ('software', 'plugin', 'asset', 'tutorial', 'template', 'stock-footage', 'stock-image', 'stock-audio', '3d-model');
CREATE TYPE public.subscription_tier AS ENUM ('free', 'artist', 'studio', 'enterprise');

-- Companies/Studios table
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_url TEXT,
  website TEXT,
  location TEXT,
  city TEXT,
  country TEXT,
  size TEXT, -- '1-10', '11-50', '51-200', '201-500', '500+'
  founded_year INTEGER,
  industries industry_category[] DEFAULT '{}',
  is_verified BOOLEAN DEFAULT false,
  is_hiring BOOLEAN DEFAULT false,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Job listings table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  posted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[],
  responsibilities TEXT[],
  skills TEXT[],
  job_type job_type DEFAULT 'full-time',
  experience_level experience_level DEFAULT 'mid',
  industries industry_category[] DEFAULT '{}',
  location TEXT,
  is_remote BOOLEAN DEFAULT false,
  salary_min NUMERIC,
  salary_max NUMERIC,
  salary_currency TEXT DEFAULT 'USD',
  application_url TEXT,
  application_email TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(company_id, slug)
);

-- Resources/Tools directory
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  resource_type resource_type NOT NULL,
  industries industry_category[] DEFAULT '{}',
  website_url TEXT,
  download_url TEXT,
  image_url TEXT,
  pricing_type TEXT DEFAULT 'free', -- 'free', 'paid', 'freemium', 'subscription'
  price NUMERIC,
  price_currency TEXT DEFAULT 'USD',
  tags TEXT[],
  features TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  rating NUMERIC DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Portfolio items for users
CREATE TABLE public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  project_url TEXT,
  industries industry_category[] DEFAULT '{}',
  tools_used TEXT[],
  role TEXT,
  client TEXT,
  year INTEGER,
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Job applications
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  applicant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cover_letter TEXT,
  resume_url TEXT,
  portfolio_url TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'shortlisted', 'rejected', 'hired'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_id, applicant_id)
);

-- User subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tier subscription_tier DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User connections/follows
CREATE TABLE public.connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Saved/bookmarked items
CREATE TABLE public.saved_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_type TEXT NOT NULL, -- 'job', 'resource', 'portfolio', 'company'
  item_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

-- Enable RLS on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

-- Companies policies
CREATE POLICY "Companies are viewable by everyone" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Users can create companies" ON public.companies FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update their companies" ON public.companies FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete their companies" ON public.companies FOR DELETE USING (auth.uid() = owner_id);

-- Jobs policies
CREATE POLICY "Active jobs are viewable by everyone" ON public.jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Company owners can create jobs" ON public.jobs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.companies WHERE id = company_id AND owner_id = auth.uid())
);
CREATE POLICY "Company owners can update their jobs" ON public.jobs FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.companies WHERE id = company_id AND owner_id = auth.uid())
);
CREATE POLICY "Company owners can delete their jobs" ON public.jobs FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.companies WHERE id = company_id AND owner_id = auth.uid())
);
CREATE POLICY "Admins can manage all jobs" ON public.jobs FOR ALL USING (public.is_admin(auth.uid()));

-- Resources policies
CREATE POLICY "Approved resources are viewable by everyone" ON public.resources FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can submit resources" ON public.resources FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "Submitters can update their resources" ON public.resources FOR UPDATE USING (auth.uid() = submitted_by);
CREATE POLICY "Admins can manage all resources" ON public.resources FOR ALL USING (public.is_admin(auth.uid()));

-- Portfolio items policies
CREATE POLICY "Portfolio items are viewable by everyone" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Users can create their portfolio items" ON public.portfolio_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their portfolio items" ON public.portfolio_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their portfolio items" ON public.portfolio_items FOR DELETE USING (auth.uid() = user_id);

-- Job applications policies
CREATE POLICY "Applicants can view their own applications" ON public.job_applications FOR SELECT USING (auth.uid() = applicant_id);
CREATE POLICY "Company owners can view applications to their jobs" ON public.job_applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.jobs j JOIN public.companies c ON j.company_id = c.id WHERE j.id = job_id AND c.owner_id = auth.uid())
);
CREATE POLICY "Users can create applications" ON public.job_applications FOR INSERT WITH CHECK (auth.uid() = applicant_id);
CREATE POLICY "Applicants can update their applications" ON public.job_applications FOR UPDATE USING (auth.uid() = applicant_id);
CREATE POLICY "Company owners can update application status" ON public.job_applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.jobs j JOIN public.companies c ON j.company_id = c.id WHERE j.id = job_id AND c.owner_id = auth.uid())
);

-- Subscriptions policies
CREATE POLICY "Users can view their own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their subscription" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their subscription" ON public.subscriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage subscriptions" ON public.subscriptions FOR ALL USING (public.is_admin(auth.uid()));

-- Connections policies
CREATE POLICY "Connections are viewable by everyone" ON public.connections FOR SELECT USING (true);
CREATE POLICY "Users can create connections" ON public.connections FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete their connections" ON public.connections FOR DELETE USING (auth.uid() = follower_id);

-- Saved items policies
CREATE POLICY "Users can view their saved items" ON public.saved_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save items" ON public.saved_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unsave items" ON public.saved_items FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX idx_jobs_industries ON public.jobs USING GIN(industries);
CREATE INDEX idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX idx_resources_type ON public.resources(resource_type);
CREATE INDEX idx_resources_industries ON public.resources USING GIN(industries);
CREATE INDEX idx_portfolio_user_id ON public.portfolio_items(user_id);
CREATE INDEX idx_connections_follower ON public.connections(follower_id);
CREATE INDEX idx_connections_following ON public.connections(following_id);

-- Update profiles table with additional fields for the platform
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS industries industry_category[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS cover_url TEXT,
  ADD COLUMN IF NOT EXISTS is_available_for_hire BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS subscription_tier subscription_tier DEFAULT 'free';