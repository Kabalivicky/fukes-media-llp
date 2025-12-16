-- Create news/announcements table for homepage
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'announcement',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Public can view published news
CREATE POLICY "Anyone can view published news"
ON public.news
FOR SELECT
USING (published = true);

-- Admins can manage all news
CREATE POLICY "Admins can manage news"
ON public.news
FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial news items
INSERT INTO public.news (title, slug, excerpt, category, published, published_at) VALUES
('New AI-Powered VFX Pipeline Launched', 'ai-vfx-pipeline-launch', 'We are excited to announce our new AI-assisted VFX pipeline that reduces turnaround time by 40%.', 'announcement', true, now()),
('Fuke''s Media Partners with Major Studios', 'major-studio-partnership', 'Expanding our reach with new partnerships to deliver world-class visual effects.', 'news', true, now() - interval '3 days'),
('Cloud Rendering Infrastructure Upgrade', 'cloud-rendering-upgrade', 'Our cloud rendering capacity has been increased to handle larger productions seamlessly.', 'update', true, now() - interval '7 days');