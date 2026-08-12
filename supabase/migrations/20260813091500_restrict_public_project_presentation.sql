-- The public index only needs card rendering preferences. Keep hero, journey,
-- gallery, SEO and CTA presentation data behind the existing project gate.
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
  jsonb_build_object(
    'card',
    COALESCE(presentation -> 'card', '{}'::jsonb)
  ) AS presentation,
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
