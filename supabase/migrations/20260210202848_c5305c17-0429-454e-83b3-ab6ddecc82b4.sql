-- Fix workspace-files storage policies: restrict to actual workspace participants

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Workspace participants can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Workspace participants can view files" ON storage.objects;

-- Create secure upload policy: only workspace participants can upload
CREATE POLICY "Workspace participants can upload files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'workspace-files' AND
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM public.project_workspaces w
      WHERE (w.client_id = auth.uid() OR w.artist_id = auth.uid())
      AND name LIKE w.id::text || '/%'
    )
  );

-- Create secure view policy: only workspace participants can view files
CREATE POLICY "Workspace participants can view files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'workspace-files' AND
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM public.project_workspaces w
      WHERE (w.client_id = auth.uid() OR w.artist_id = auth.uid())
      AND name LIKE w.id::text || '/%'
    )
  );

-- Create secure delete policy: only workspace participants can delete their files
CREATE POLICY "Workspace participants can delete files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'workspace-files' AND
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM public.project_workspaces w
      WHERE (w.client_id = auth.uid() OR w.artist_id = auth.uid())
      AND name LIKE w.id::text || '/%'
    )
  );