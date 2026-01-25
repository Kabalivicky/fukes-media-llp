-- Create profiles_public view to expose safe profile data for community
CREATE OR REPLACE VIEW public.profiles_public AS
SELECT 
  p.id,
  p.user_id,
  p.display_name,
  p.title,
  p.avatar_url,
  p.cover_url,
  p.bio,
  p.location,
  p.skills,
  p.industries,
  p.subscription_tier,
  p.is_available_for_hire,
  p.portfolio_url,
  p.linkedin_url,
  p.years_experience,
  p.hourly_rate,
  p.availability,
  p.created_at
FROM public.profiles p;

-- Grant select access to everyone for the public view
GRANT SELECT ON public.profiles_public TO anon, authenticated;