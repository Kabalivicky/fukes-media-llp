-- Create project workspaces table for client-artist collaboration
CREATE TABLE public.project_workspaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brief_id UUID REFERENCES public.project_briefs(id) ON DELETE CASCADE,
  client_id UUID NOT NULL,
  artist_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
  budget NUMERIC,
  budget_currency TEXT DEFAULT 'USD',
  start_date DATE,
  deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workspace milestones table
CREATE TABLE public.workspace_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.project_workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  amount NUMERIC,
  order_index INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workspace messages table for project-specific chat
CREATE TABLE public.workspace_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.project_workspaces(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'milestone_update', 'system')),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workspace files table
CREATE TABLE public.workspace_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES public.project_workspaces(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  milestone_id UUID REFERENCES public.workspace_milestones(id) ON DELETE SET NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.project_workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_files ENABLE ROW LEVEL SECURITY;

-- RLS for project_workspaces: participants can view/manage their workspaces
CREATE POLICY "Participants can view workspaces"
  ON public.project_workspaces FOR SELECT
  USING (auth.uid() = client_id OR auth.uid() = artist_id);

CREATE POLICY "Clients can create workspaces"
  ON public.project_workspaces FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Participants can update workspaces"
  ON public.project_workspaces FOR UPDATE
  USING (auth.uid() = client_id OR auth.uid() = artist_id);

-- RLS for workspace_milestones
CREATE POLICY "Workspace participants can view milestones"
  ON public.workspace_milestones FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.project_workspaces w
    WHERE w.id = workspace_id AND (w.client_id = auth.uid() OR w.artist_id = auth.uid())
  ));

CREATE POLICY "Clients can create milestones"
  ON public.workspace_milestones FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.project_workspaces w
    WHERE w.id = workspace_id AND w.client_id = auth.uid()
  ));

CREATE POLICY "Participants can update milestones"
  ON public.workspace_milestones FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.project_workspaces w
    WHERE w.id = workspace_id AND (w.client_id = auth.uid() OR w.artist_id = auth.uid())
  ));

-- RLS for workspace_messages
CREATE POLICY "Workspace participants can view messages"
  ON public.workspace_messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.project_workspaces w
    WHERE w.id = workspace_id AND (w.client_id = auth.uid() OR w.artist_id = auth.uid())
  ));

CREATE POLICY "Participants can send messages"
  ON public.workspace_messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.project_workspaces w
      WHERE w.id = workspace_id AND (w.client_id = auth.uid() OR w.artist_id = auth.uid())
    )
  );

CREATE POLICY "Participants can update read status"
  ON public.workspace_messages FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.project_workspaces w
    WHERE w.id = workspace_id AND (w.client_id = auth.uid() OR w.artist_id = auth.uid())
  ));

-- RLS for workspace_files
CREATE POLICY "Workspace participants can view files"
  ON public.workspace_files FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.project_workspaces w
    WHERE w.id = workspace_id AND (w.client_id = auth.uid() OR w.artist_id = auth.uid())
  ));

CREATE POLICY "Participants can upload files"
  ON public.workspace_files FOR INSERT
  WITH CHECK (
    auth.uid() = uploaded_by AND
    EXISTS (
      SELECT 1 FROM public.project_workspaces w
      WHERE w.id = workspace_id AND (w.client_id = auth.uid() OR w.artist_id = auth.uid())
    )
  );

CREATE POLICY "Uploaders can delete their files"
  ON public.workspace_files FOR DELETE
  USING (auth.uid() = uploaded_by);

-- Create storage bucket for workspace files
INSERT INTO storage.buckets (id, name, public) VALUES ('workspace-files', 'workspace-files', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for workspace files
CREATE POLICY "Workspace participants can upload files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'workspace-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Workspace participants can view files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'workspace-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Uploaders can delete their files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'workspace-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Trigger for updated_at
CREATE TRIGGER update_project_workspaces_updated_at
  BEFORE UPDATE ON public.project_workspaces
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workspace_milestones_updated_at
  BEFORE UPDATE ON public.workspace_milestones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();