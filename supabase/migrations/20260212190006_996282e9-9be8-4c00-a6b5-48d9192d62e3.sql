-- Fix storage policies: use is_admin() instead of skills array check
-- Also allow authenticated users to upload to projects bucket (for portfolio items)

-- Drop old inconsistent policies
DROP POLICY IF EXISTS "Admins can upload project files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload showreel files" ON storage.objects;

-- Projects bucket: allow admins and authenticated users who own their folder
CREATE POLICY "Authenticated users can upload to projects bucket"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'projects' AND
  auth.uid() IS NOT NULL
);

-- Showreels bucket: admins only using is_admin()
CREATE POLICY "Admins can upload showreel files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'showreels' AND
  public.is_admin(auth.uid())
);

-- Fix workspace_milestones policies to require authentication (not anonymous)
DROP POLICY IF EXISTS "Workspace participants can view milestones" ON public.workspace_milestones;
DROP POLICY IF EXISTS "Participants can update milestones" ON public.workspace_milestones;
DROP POLICY IF EXISTS "Clients can create milestones" ON public.workspace_milestones;

CREATE POLICY "Workspace participants can view milestones"
ON public.workspace_milestones FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM project_workspaces w
    WHERE w.id = workspace_milestones.workspace_id
    AND (w.client_id = auth.uid() OR w.artist_id = auth.uid())
  )
);

CREATE POLICY "Participants can update milestones"
ON public.workspace_milestones FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM project_workspaces w
    WHERE w.id = workspace_milestones.workspace_id
    AND (w.client_id = auth.uid() OR w.artist_id = auth.uid())
  )
);

CREATE POLICY "Clients can create milestones"
ON public.workspace_milestones FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM project_workspaces w
    WHERE w.id = workspace_milestones.workspace_id
    AND w.client_id = auth.uid()
  )
);