-- Align public CMS copy with the reviewed résumé and remove confidential design links.

UPDATE public.site_settings
SET
  tagline = 'Senior Product Designer with 4.5+ years across fintech, AI-assisted products, personalisation, 0-to-1 launches, and design systems.',
  bio = $bio$I’m a Senior Product Designer with 4.5+ years of experience designing fintech and investment products across Motilal Oswal and Trinkerr.

At Motilal Oswal, I work across RIISE’s hyper-personalised homepage, 0-to-1 stock discovery, portfolio analysis, and AI-assisted investing experiences. Previously at Trinkerr, I designed portfolio and advisory products and contributed to the TIQS design system across iOS and Android.

My work sits at the intersection of product strategy, interaction design, and systems thinking. I’m strongest when the problem is ambiguous, the information is dense, and the experience must balance user needs, business goals, and regulatory constraints.

I work closely with product, engineering, research, and compliance from problem framing and prototyping through handoff, validation, and launch. I’m currently exploring Senior Product Designer opportunities across fintech, AI, personalisation, and complex product platforms.$bio$,
  profile_image_url = NULL,
  resume_url = '/Aman_Mishra_Senior_Product_Designer_Resume.pdf',
  updated_at = now()
WHERE id = 1;

UPDATE public.experience
SET
  description = 'Leading product design across high-impact RIISE initiatives spanning homepage personalisation, stock discovery, portfolio analysis, AI-assisted investing, and scalable platform experiences.',
  highlights = ARRAY[
    'Re-architected the RIISE homepage to prioritise relevant financial products using behaviour, lifecycle, and portfolio signals.',
    'Led the 0-to-1 product definition of Screener, covering discovery, filters, comparison, saved workflows, and AI-assisted decisions.',
    'Architecting an AI research and portfolio-assistance ecosystem spanning MO Genie, research support, and portfolio analysis.',
    'Partner with product, engineering, and compliance to move multiple complex workstreams from problem framing to implementation.'
  ]::text[],
  updated_at = now()
WHERE company = 'Motilal Oswal Financial Services';

UPDATE public.education
SET field = 'UI/UX Design', updated_at = now()
WHERE institution = 'Masai School';

DELETE FROM public.skills WHERE lower(name) = 'maze';
UPDATE public.skills SET name = 'Adobe After Effects' WHERE name = 'After Effects';

INSERT INTO public.content_blocks (key, data)
VALUES
  (
    'hero',
    '{"available_label":"Open to Senior Product Designer opportunities","headline_before":"Making complex","headline_accent":"financial products","headline_after":"clear and trustworthy.","subline":"I’m Aman, a Senior Product Designer with 4.5+ years across Motilal Oswal and Trinkerr. I lead fintech, AI-assisted, personalisation, and design-system work from problem framing through launch.","cta_label":"View selected work","cta_to":"/work","secondary_cta_label":"View résumé","secondary_cta_to":"/resume","brands":["Fintech","0-to-1 products","AI-assisted UX","Design systems"]}'::jsonb
  ),
  (
    'home_stats',
    '{"eyebrow":"Evidence","heading_line1":"Product work with","heading_accent":"real scale and outcomes","items":[{"v":"4.5+","l":"Years in product design"},{"v":"890K+","l":"Active clients on the current platform"},{"v":"2M+","l":"Portfolio data points designed for"},{"v":"9×","l":"Portfolio import growth"}],"body":"I’m {name}, a Senior Product Designer focused on fintech, AI-assisted experiences, personalisation, and scalable product systems. These figures come from shipped work and the product scale documented in my résumé."}'::jsonb
  ),
  (
    'home_cta',
    '{"heading_line1":"Let’s make","heading_accent":"complexity","heading_line2":"feel simple.","subline":"I’m exploring Senior Product Designer opportunities across fintech, AI, personalisation, and complex product platforms. If you’re building something meaningful at scale, I’d love to hear about it.","cta_label":"Email me"}'::jsonb
  ),
  (
    'resume_page',
    '{"eyebrow":"Résumé","heading":"4.5+ years across fintech products, AI, and design systems.","subline":"A concise view of my product scope, progression, and core capabilities. Download the PDF for applications and recruiter conversations.","download_label":"Download résumé","experience_heading":"Experience","education_heading":"Education","skills_heading":"Capabilities"}'::jsonb
  )
ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = now();

UPDATE public.projects
SET
  title = replace(title, 'Riise', 'RIISE'),
  short_description = replace(short_description, 'Riise', 'RIISE'),
  overview = replace(overview, 'Riise', 'RIISE'),
  problem_statement = replace(problem_statement, 'Riise', 'RIISE'),
  research = replace(research, 'Riise', 'RIISE'),
  design_process = replace(design_process, 'Riise', 'RIISE'),
  solution = replace(solution, 'Riise', 'RIISE'),
  outcome = replace(outcome, 'Riise', 'RIISE'),
  learnings = replace(learnings, 'Riise', 'RIISE'),
  updated_at = now();

UPDATE public.projects
SET
  overview = replace(overview, 'Portfolio Analysis for RIISE', 'Portfolio Analysis for RIISE'),
  outcome = '<p>The work established one scalable portfolio-intelligence model across internal and external investments and more than <strong>2M portfolio data points</strong>. It aligned the product around a continuous path from holdings to diagnosis to an appropriate next step.</p><p>The design system covers stocks, mutual funds, multiple portfolio sources, import states, light/dark themes, and advisory actions while keeping a consistent core interaction model.</p><p>No unverified conversion or post-launch uplift is presented. The defensible outcome is the product architecture, build-ready journey, and documented scale.</p>',
  links = '[]'::jsonb,
  metrics = '[{"value":"2M+","label":"Portfolio data points","hint":"Across internal and linked external investments"},{"value":"2 sources","label":"One analysis model","hint":"Motilal Oswal and externally imported portfolios"},{"value":"3 paths","label":"From insight to action","hint":"IAP portfolios, RM support, and report download"}]'::jsonb,
  updated_at = now()
WHERE slug = 'portfolio-analysis';
