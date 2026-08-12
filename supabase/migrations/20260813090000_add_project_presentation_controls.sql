-- Give the project CMS one flexible, versionable source of truth for public
-- presentation controls: card/hero rendering, journey screens, section labels,
-- gallery copy, SEO and the closing CTA.
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS presentation jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.projects
DROP CONSTRAINT IF EXISTS projects_presentation_is_object;

ALTER TABLE public.projects
ADD CONSTRAINT projects_presentation_is_object
CHECK (jsonb_typeof(presentation) = 'object');

COMMENT ON COLUMN public.projects.presentation IS
  'CMS-controlled public presentation settings for project cards and case studies.';

-- Card rendering needs the presentation style but must not expose protected
-- narrative fields. The full project continues to come from get_protected_project.
DROP VIEW IF EXISTS public.public_projects_index;
CREATE VIEW public.public_projects_index
WITH (security_invoker = false) AS
SELECT
  id,
  slug,
  title,
  category,
  short_description,
  thumbnail_url,
  presentation,
  featured,
  published,
  sort_order,
  tags,
  company,
  role,
  timeline,
  true AS locked
FROM public.projects
WHERE published = true;

ALTER VIEW public.public_projects_index OWNER TO postgres;
REVOKE ALL ON public.public_projects_index FROM PUBLIC;
GRANT SELECT ON public.public_projects_index TO anon, authenticated;
