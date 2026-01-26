-- =====================================================
-- MESSAGES TABLE - Direct messaging between users
-- =====================================================
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages they sent or received
CREATE POLICY "Users can view their messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can send messages
CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Users can update their received messages (mark as read)
CREATE POLICY "Users can update received messages"
  ON public.messages FOR UPDATE
  USING (auth.uid() = receiver_id);

-- Users can delete their own sent messages
CREATE POLICY "Users can delete sent messages"
  ON public.messages FOR DELETE
  USING (auth.uid() = sender_id);

-- =====================================================
-- NOTIFICATIONS TABLE - System notifications
-- =====================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'follow', 'message', 'job_application', 'project_invite', 'system'
  title TEXT NOT NULL,
  content TEXT,
  reference_id UUID, -- ID of related entity (job, message, user, etc.)
  reference_type TEXT, -- 'job', 'message', 'user', 'project', etc.
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can only view their own notifications
CREATE POLICY "Users can view their notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

-- System can create notifications (via service role)
CREATE POLICY "Allow insert for authenticated users"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

-- Users can update their notifications (mark as read)
CREATE POLICY "Users can update their notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their notifications
CREATE POLICY "Users can delete their notifications"
  ON public.notifications FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- PROJECT_BRIEFS TABLE - Client work requests
-- =====================================================
CREATE TABLE public.project_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT, -- 'vfx', 'animation', 'color-grading', etc.
  industries industry_category[],
  required_skills TEXT[],
  budget_min NUMERIC,
  budget_max NUMERIC,
  budget_currency TEXT DEFAULT 'USD',
  budget_type TEXT DEFAULT 'fixed', -- 'fixed', 'hourly', 'negotiable'
  deadline DATE,
  duration_estimate TEXT, -- '1-2 weeks', '1 month', etc.
  attachments TEXT[], -- URLs to reference files
  is_remote BOOLEAN DEFAULT true,
  location TEXT,
  status TEXT DEFAULT 'open', -- 'open', 'in_progress', 'completed', 'cancelled'
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  proposals_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_briefs ENABLE ROW LEVEL SECURITY;

-- Open briefs are viewable by everyone
CREATE POLICY "Open briefs are viewable by everyone"
  ON public.project_briefs FOR SELECT
  USING (status = 'open' OR auth.uid() = client_id);

-- Clients can create briefs
CREATE POLICY "Clients can create briefs"
  ON public.project_briefs FOR INSERT
  WITH CHECK (auth.uid() = client_id);

-- Clients can update their briefs
CREATE POLICY "Clients can update their briefs"
  ON public.project_briefs FOR UPDATE
  USING (auth.uid() = client_id);

-- Clients can delete their briefs
CREATE POLICY "Clients can delete their briefs"
  ON public.project_briefs FOR DELETE
  USING (auth.uid() = client_id);

-- =====================================================
-- PROJECT_PROPOSALS TABLE - Artist proposals to briefs
-- =====================================================
CREATE TABLE public.project_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brief_id UUID NOT NULL REFERENCES public.project_briefs(id) ON DELETE CASCADE,
  artist_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cover_letter TEXT NOT NULL,
  proposed_budget NUMERIC,
  proposed_timeline TEXT,
  portfolio_samples TEXT[], -- URLs to relevant portfolio items
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected', 'withdrawn'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(brief_id, artist_id)
);

-- Enable RLS
ALTER TABLE public.project_proposals ENABLE ROW LEVEL SECURITY;

-- Artists can view their own proposals
CREATE POLICY "Artists can view their proposals"
  ON public.project_proposals FOR SELECT
  USING (auth.uid() = artist_id);

-- Clients can view proposals to their briefs
CREATE POLICY "Clients can view proposals to their briefs"
  ON public.project_proposals FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.project_briefs
    WHERE id = project_proposals.brief_id
    AND client_id = auth.uid()
  ));

-- Artists can create proposals
CREATE POLICY "Artists can create proposals"
  ON public.project_proposals FOR INSERT
  WITH CHECK (auth.uid() = artist_id);

-- Artists can update their proposals
CREATE POLICY "Artists can update proposals"
  ON public.project_proposals FOR UPDATE
  USING (auth.uid() = artist_id);

-- Clients can update proposal status
CREATE POLICY "Clients can update proposal status"
  ON public.project_proposals FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.project_briefs
    WHERE id = project_proposals.brief_id
    AND client_id = auth.uid()
  ));

-- =====================================================
-- REVIEWS TABLE - Feedback system
-- =====================================================
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewed_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_brief_id UUID REFERENCES public.project_briefs(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  is_verified BOOLEAN DEFAULT false, -- Verified if from completed project
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(reviewer_id, reviewed_user_id, project_brief_id)
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Reviews are viewable by everyone
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (true);

-- Users can create reviews
CREATE POLICY "Users can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- Users can update their reviews
CREATE POLICY "Users can update their reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = reviewer_id);

-- Users can delete their reviews
CREATE POLICY "Users can delete their reviews"
  ON public.reviews FOR DELETE
  USING (auth.uid() = reviewer_id);

-- =====================================================
-- INDEXES for performance
-- =====================================================
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX idx_messages_created ON public.messages(created_at DESC);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read);
CREATE INDEX idx_project_briefs_status ON public.project_briefs(status);
CREATE INDEX idx_project_briefs_client ON public.project_briefs(client_id);
CREATE INDEX idx_project_proposals_brief ON public.project_proposals(brief_id);
CREATE INDEX idx_project_proposals_artist ON public.project_proposals(artist_id);
CREATE INDEX idx_reviews_reviewed ON public.reviews(reviewed_user_id);

-- =====================================================
-- TRIGGERS for updated_at
-- =====================================================
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_briefs_updated_at
  BEFORE UPDATE ON public.project_briefs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_proposals_updated_at
  BEFORE UPDATE ON public.project_proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();