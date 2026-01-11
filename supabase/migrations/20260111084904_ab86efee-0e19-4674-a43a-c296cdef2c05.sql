-- Add order_index column to projects table for admin reordering
ALTER TABLE public.projects 
ADD COLUMN order_index integer DEFAULT 0;

-- Update existing projects with sequential order based on year
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY year DESC NULLS LAST, created_at DESC) as rn
  FROM public.projects
)
UPDATE public.projects p
SET order_index = n.rn
FROM numbered n
WHERE p.id = n.id;

-- Create index for faster ordering
CREATE INDEX idx_projects_order_index ON public.projects(order_index);