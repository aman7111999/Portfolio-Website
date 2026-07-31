-- Make Supabase the source of truth for the portfolio CMS while preserving the
-- current senior-role content as the initial managed dataset.
BEGIN;

UPDATE public.site_settings
SET
  name = 'Aman Mishra',
  tagline = 'Senior Product Designer with 4.5+ years of experience across fintech, AI-assisted products, 0-to-1 launches, and design systems.',
  bio = 'I’m a product designer with 4.5+ years of experience designing fintech and investment products across Motilal Oswal and Trinkerr.

At Motilal Oswal, I work across Riise’s hyper-personalised homepage, 0-to-1 stock discovery, and AI-assisted investing experiences. Previously at Trinkerr, I designed portfolio and advisory products and contributed to the TIQS design system across iOS and Android.

My work sits at the intersection of product strategy, interaction design, and systems thinking. I’m strongest when the problem is ambiguous, the information is dense, and the experience must balance user needs, business goals, and regulatory constraints.

I work closely with product, engineering, research, and compliance from problem framing and prototyping through handoff, validation, and launch. I’m currently exploring Senior Product Designer opportunities across fintech, AI, consumer products, and complex digital platforms.',
  email = 'aman755559@gmail.com',
  location = 'Mumbai, India',
  socials = '[{"label":"LinkedIn","url":"https://www.linkedin.com/in/amanmishra7"},{"label":"Behance","url":"https://www.behance.net/aman-mishra7"}]'::jsonb,
  resume_url = COALESCE(resume_url, '/Aman_Mishra_Senior_Product_Designer_Resume.pdf')
WHERE id = 1;

INSERT INTO public.content_blocks (key, data) VALUES
  ('nav', '{"links":[{"label":"Work","to":"/work"},{"label":"About","to":"/about"},{"label":"Résumé","to":"/resume"}],"cta_label":"Contact","cta_to":"/contact","role_line":"Senior Product Designer"}'::jsonb),
  ('footer', '{"copyright_suffix":"All rights reserved","back_to_top_label":"Top"}'::jsonb),
  ('hero', '{"available_label":"Open to Senior Product Designer opportunities","headline_before":"Making complex","headline_accent":"financial products","headline_after":"clear and trustworthy.","subline":"I’m Aman, a product designer with 4.5+ years across Motilal Oswal and Trinkerr. I lead 0-to-1 products, platform revamps, AI experiences, and design systems from problem framing through launch.","cta_label":"View selected work","cta_to":"/work","secondary_cta_label":"View résumé","secondary_cta_to":"/resume","brands":["Fintech","0-to-1 products","AI-assisted UX","Design systems"],"tools":[{"icon":"Figma","tint":"accent","pos":{"top":"6%","left":"-14%"}},{"icon":"Diamond","tint":"text","pos":{"top":"18%","right":"-14%"}},{"icon":"Shield","tint":"text","pos":{"top":"48%","right":"-18%"}},{"icon":"Framer","tint":"accent","pos":{"top":"56%","left":"-16%"}},{"icon":"PenTool","tint":"text","pos":{"bottom":"12%","left":"-8%"}}],"badge_text":"FINTECH • AI • PRODUCT SYSTEMS •"}'::jsonb),
  ('home_featured', '{"eyebrow":"Selected work","heading_line1":"Complex problems. Clear decisions.","heading_line2":"Evidence over decoration.","view_all_label":"View all projects","view_all_to":"/work"}'::jsonb),
  ('home_experience', '{"eyebrow":"Experience","heading_line1":"4.5+ years simplifying","heading_line2":"complex financial products."}'::jsonb),
  ('home_stats', '{"eyebrow":"About","heading_line1":"From 0-to-1 launches","heading_accent":"to systems at scale","items":[{"v":"4.5+","l":"Years in product design"},{"v":"9×","l":"Portfolio import growth"},{"v":"4","l":"Focused case studies"}],"body":"I’m {name}, a product designer focused on fintech, AI-assisted experiences, and scalable product systems. I turn dense workflows and ambiguous requirements into clear journeys that users can understand and teams can ship.","quote":"The strongest design decisions make complexity feel inevitable, not visible."}'::jsonb),
  ('home_faq', '{"eyebrow":"Working together","heading_line1":"How I","heading_accent":"work","heading_line2":"on complex products","subline":"A concise view of the ownership and collaboration I bring to a senior product-design role.","items":[{"q":"What problems do you work best on?","a":"Complex B2C products where information is dense, the problem is ambiguous, and design must balance user needs, business goals, technical constraints, and compliance."},{"q":"What does end-to-end ownership mean in your work?","a":"I contribute from problem framing and product discovery through information architecture, prototyping, validation, visual design, handoff, implementation reviews, and post-launch iteration."},{"q":"How do you collaborate with product and engineering?","a":"I align early on the problem, constraints, and success criteria; make trade-offs visible; prototype decisions quickly; and stay involved through development so the shipped experience retains its intent."},{"q":"What roles are you exploring?","a":"Senior Product Designer opportunities across fintech, AI, consumer products, and platform experiences where I can own meaningful product areas and help raise the quality bar."}]}'::jsonb),
  ('home_cta', '{"heading_line1":"Let’s make","heading_accent":"complexity","heading_line2":"feel simple.","subline":"I’m exploring Senior Product Designer opportunities across fintech, AI, and product platforms. If you’re building something complex and meaningful, I’d love to hear about it.","cta_label":"Email me"}'::jsonb),
  ('about_hero', '{"badge":"About Aman","heading_before":"I turn complex product problems into","heading_accent":"clear, scalable","heading_after":"experiences.","meta":[{"k":"Based in","v":"Mumbai, India"},{"k":"Experience","v":"4.5+ years"},{"k":"Focus","v":"Fintech · AI · Systems"},{"k":"Currently","v":"Open to senior roles"}],"bio_eyebrow":"My approach","say_hello":"Email"}'::jsonb),
  ('about_timeline', '{"badge":"Career timeline","heading":"Growing from execution to product ownership.","subline":"A progression across foundational investing journeys, measurable product outcomes, 0-to-1 launches, and platform-level design."}'::jsonb),
  ('about_experience', '{"badge":"Experience","heading":"The products and teams I’ve helped move forward.","subline":"Open each role to see the scope, decisions, and outcomes I owned or influenced."}'::jsonb),
  ('about_education', '{"badge":"Education","heading":"A technical foundation, redirected into product design."}'::jsonb),
  ('about_tools', '{"badge":"Capabilities","heading":"Strategy, craft, research, and systems."}'::jsonb),
  ('about_philosophy', '{"badge":"Design principles","heading":"Four principles I use when the answer is not obvious.","items":[{"k":"Clarity before novelty","v":"A distinctive interface still needs to make the next decision obvious."},{"k":"Evidence before preference","v":"Research, product data, constraints, and user behaviour should shape the direction."},{"k":"Systems before isolated screens","v":"Reusable patterns make both the experience and the team more consistent."},{"k":"Shipping is part of design","v":"I stay close to engineering through implementation, QA, and iteration."}]}'::jsonb),
  ('about_working_style', '{"badge":"Working style","heading":"How I move work from ambiguity to release.","items":[{"k":"Frame the problem","v":"Align on the user, business goal, constraints, assumptions, and success signals before polishing screens."},{"k":"Prototype the decision","v":"Use the smallest useful prototype to expose gaps, compare directions, and build alignment."},{"k":"Make trade-offs visible","v":"Document what changed, why it changed, and what the team is deliberately not solving yet."},{"k":"Stay through implementation","v":"Review builds with engineering and protect the intent without ignoring technical reality."}]}'::jsonb),
  ('about_books', '{"items":[]}'::jsonb),
  ('about_values', '{"badge":"What I bring","heading":"The qualities behind the output.","items":[{"k":"Ownership","v":"I stay accountable for the outcome, not only the design file."},{"k":"Clarity","v":"I make decisions and their reasoning easy for teams to understand."},{"k":"Curiosity","v":"I keep testing assumptions until the real problem becomes visible."},{"k":"Craft","v":"I care about the details because they shape trust in the product."}]}'::jsonb),
  ('about_fun_facts', '{"items":[]}'::jsonb),
  ('contact_page', '{"eyebrow":"Start a conversation","heading_before":"Let’s simplify","heading_accent":"something complex","heading_after":".","copy_email_label":"Copy email","copied_label":"Copied","form_labels":{"name":"Name","email":"Email","message":"Message","send":"Send message","sending":"Sending"},"success_toast":"Message sent — I’ll get back to you soon.","elsewhere_label":"Elsewhere","based_in_label":"Based in"}'::jsonb),
  ('resume_page', '{"eyebrow":"Résumé","heading":"4.5+ years across fintech products, AI, and design systems.","subline":"A concise view of my product scope, progression, and core capabilities. Download the PDF for applications and recruiter conversations.","download_label":"Download résumé","experience_heading":"Experience","education_heading":"Education","skills_heading":"Capabilities"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;

INSERT INTO public.projects (
  title, slug, short_description, overview, problem_statement, research,
  design_process, solution, outcome, learnings, role, duration, company,
  tools, tags, category, timeline, thumbnail_url, gallery, links, metrics,
  featured, published, sort_order
) VALUES
  ('Riise Hyper-personalisation', 'riise-hyper-personalisation', 'Re-architecting a complex investment homepage around behaviour, lifecycle stage, and portfolio activity.', '<p>Riise brings together Stocks, F&amp;O, Mutual Funds, US Stocks, and Algo Trading in one investment platform. As the product expanded, its homepage became a dense collection of entry points competing for attention.</p><p>As Assistant Manager, Product Design, I lead design across the homepage revamp and related personalisation initiatives. My scope includes problem framing, information architecture, interaction models, high-fidelity design, stakeholder alignment, and implementation review.</p><p>This is current product work. Confidential screens and internal data are intentionally omitted; the case study focuses on the product decisions and reusable framework.</p>', '<p>The homepage treated every product as equally important for every user. A first-time investor, an active trader, and a mutual-fund customer saw similar prominence across modules, increasing cognitive load and weakening discoverability.</p><ul><li>Too many products competed above the fold.</li><li>Static ordering ignored user behaviour and lifecycle.</li><li>New capabilities were repeatedly added without a scalable hierarchy.</li><li>Multiple teams needed a shared framework for deciding what appears, when, and why.</li></ul>', '<p>I audited the existing homepage, mapped entry points and dependencies, reviewed available behaviour and portfolio signals, and worked with product stakeholders across business lines.</p><p>The key insight was that personalisation was not only a recommendation problem. It was an information-architecture problem: the platform needed stable rules for relevance, priority, continuity, and discovery.</p>', '<p>I reframed the homepage as a system of prioritised zones rather than a fixed sequence of cards.</p><ol><li>Mapped user states across new, returning, invested, and active cohorts.</li><li>Separated persistent utilities from behaviour-led modules and discovery content.</li><li>Defined prioritisation rules using recent activity, holdings, lifecycle, and product eligibility.</li><li>Created responsive templates so teams could add modules without breaking the hierarchy.</li><li>Reviewed states with product, engineering, and compliance before high-fidelity handoff.</li></ol>', '<p>The proposed architecture gives each user a clearer starting point while preserving access to the wider product ecosystem.</p><ul><li>A contextual top section for the user’s most relevant tasks and holdings.</li><li>Behaviour-led continuation modules that help users resume meaningful activity.</li><li>Lifecycle-aware discovery for products the user has not yet adopted.</li><li>Reusable module rules and component patterns for scalable future additions.</li><li>Dedicated new-user states that build understanding before promoting advanced products.</li></ul>', '<p>The work created a shared personalisation framework across multiple product teams and shifted the conversation from adding homepage cards to managing relevance. It reduced structural ambiguity for design and engineering and established a scalable direction for implementation.</p><p>Because this work is current, outcome claims are limited to what can be stated honestly without exposing internal performance data.</p>', '<p>Personalisation fails when it becomes a collection of isolated recommendations. The stronger approach is to define a coherent hierarchy first, then use signals to adapt it. Senior design ownership here meant making product rules, dependencies, and trade-offs visible—not only producing the final UI.</p>', 'Lead product design · Product strategy · Information architecture', 'Current product work', 'Motilal Oswal Financial Services', ARRAY['Figma', 'Prototyping', 'Design system']::text[], ARRAY['Fintech', 'Personalisation', 'Platform', 'Product strategy']::text[], 'Platform redesign', '2025–Present', NULL, '[]'::jsonb, '[]'::jsonb, '[{"value":"5","label":"Financial product lines","hint":"Stocks, F&O, Mutual Funds, US Stocks, and Algo Trading"},{"value":"System","label":"Personalisation framework","hint":"Rules for priority, continuity, and discovery"},{"value":"E2E","label":"Design ownership","hint":"Framing through implementation review"}]'::jsonb, true, true, 1),
  ('Screener — 0-to-1 Stock Discovery', 'screener-stock-discovery', 'Defining a new stock-discovery product across filtering, comparison, saved workflows, and AI-assisted decisions.', '<p>Riise needed a structured way for investors to discover stocks beyond search, tips, and isolated research content. Screener was defined as a new product line rather than a single filter screen.</p><p>I led the experience from early architecture through interaction design and developer handoff, working with product and engineering to balance beginner accessibility with the depth expected by experienced investors.</p>', '<p>Stock discovery tools often force a trade-off: simple experiences lack depth, while advanced screeners overwhelm less experienced users. The product also needed to support repeated workflows, comparison, and a clear path from discovery to decision.</p><ul><li>Users needed meaningful starting points instead of an empty filter builder.</li><li>Beginner and advanced workflows required different levels of control.</li><li>Comparison needed to explain differences, not only display more numbers.</li><li>Saved screeners needed to be easy to duplicate, edit, and reuse.</li></ul>', '<p>I reviewed existing research and discovery journeys, audited common screener patterns, mapped the financial attributes available in the platform, and worked with product stakeholders to define the minimum useful 0-to-1 scope.</p><p>The opportunity was to treat filters as reusable investment questions: value stocks, momentum opportunities, dividend candidates, sector leaders, and other recognisable goals.</p>', '<p>The architecture was developed around two complementary entry points.</p><ol><li>Curated and trending screeners for faster discovery.</li><li>A guided builder for users who want to create their own criteria.</li><li>Easy and advanced modes to progressively expose complexity.</li><li>Comparison patterns that combine key ratios, visual hierarchy, and an AI-assisted verdict.</li><li>Saved workflows with duplicate and edit actions for repeat use.</li></ol><p>I used prototypes to test hierarchy, edge cases, and the transition from discovery to comparison before finalising the component model.</p>', '<p>The resulting product system supports exploration without hiding expert capability.</p><ul><li>Category-led landing page with trending and ready-made screeners.</li><li>Progressive filter builder with clear active criteria and result feedback.</li><li>Stock comparison that highlights meaningful differences before showing full data.</li><li>AI-assisted explanation designed as decision support, not a substitute for judgement.</li><li>Reusable saved screeners that users can revisit, duplicate, and refine.</li></ul>', '<p>The work established the foundational experience and reusable architecture for a new product line. It aligned product and engineering around a shared scope, clarified the novice-to-advanced progression, and produced a build-ready interaction model.</p><p>No adoption or conversion figures are claimed because verified post-launch data is not yet available for publication.</p>', '<p>The strongest way to simplify an advanced tool is not to remove capability. It is to provide meaningful starting points, reveal complexity progressively, and make every added control explain its effect.</p>', '0-to-1 product design · IA · Interaction design', 'Concept to developer handoff', 'Motilal Oswal Financial Services', ARRAY['Figma', 'Interactive prototypes', 'Design system']::text[], ARRAY['Fintech', '0-to-1', 'Discovery', 'AI-assisted UX']::text[], '0-to-1 product', '2026', NULL, '[]'::jsonb, '[]'::jsonb, '[{"value":"0→1","label":"Product definition","hint":"From architecture to developer handoff"},{"value":"2","label":"Discovery entry points","hint":"Curated screeners and custom creation"},{"value":"Easy + Advanced","label":"Progressive complexity","hint":"One product for different confidence levels"}]'::jsonb, true, true, 2),
  ('Portfolio Health Report', 'portfolio-health-report', 'Turning a low-value portfolio-import flow into an insight-led experience that gave users a reason to connect their investments.', '<p>Trinkerr allowed users to import a portfolio, but the feature offered limited value after connection—especially for users with a single broker. Importing financial data required trust and effort, while the immediate benefit was unclear.</p><p>I redesigned the experience around a Portfolio Health Report: a clear, actionable view of performance, valuation, risk, allocation, and portfolio red flags.</p>', '<p>The original flow optimised the act of importing rather than the reason to import.</p><ul><li>Users could already view holdings in their broker app.</li><li>Connecting a broker introduced trust and privacy concerns.</li><li>The product did not preview the value users would receive.</li><li>Complex financial metrics risked becoming a dense data dump.</li></ul><p>The business goal was to improve portfolio imports; the user goal was to understand whether their portfolio was healthy and what deserved attention.</p>', '<p>I mapped the existing journey, reviewed user friction around broker connection, and worked with product stakeholders to identify the insights that could make an imported portfolio meaningfully different from a holdings list.</p><p>The central insight was that users did not need more numbers. They needed comparisons, interpretation, and prioritisation: Am I outperforming? Am I overvalued? Is risk concentrated? Which holdings need attention?</p>', '<p>I organised the report around a sequence of investor questions rather than internal data categories.</p><ol><li>Performance: XIRR compared with NIFTY 50.</li><li>Valuation: PE, PB, and PEG in market context.</li><li>Risk: beta explained through an approachable visual.</li><li>Allocation: stocks, sectors, and market-cap views with balanced versus concentrated interpretation.</li><li>Attention: a red-flag summary that leads users to the affected holdings.</li></ol><p>Broker pills let users view individual portfolios or a combined picture. Progressive disclosure kept the overview scannable while allowing deeper inspection.</p>', '<p>The redesigned experience connected import directly to a valuable outcome.</p><ul><li>An insight-led health report immediately after portfolio connection.</li><li>Benchmarks and interpretation beside financial metrics.</li><li>Allocation views that explain concentration rather than only showing a chart.</li><li>Red flags framed as prioritised areas to investigate.</li><li>A demo health report that previews the value before users connect a broker.</li></ul>', '<p>The Portfolio Health Report contributed to a 9× increase in portfolio imports after launch. Introducing the demo report—so users could understand the value before connecting a broker—contributed a further 1.2× lift.</p><p>The project demonstrated that adoption improved when the experience made the promised outcome visible before asking users for effort and trust.</p>', '<p>The initial instinct was to optimise the import flow. The more important product decision was to improve the value proposition after import. Showing a credible preview reduced uncertainty more effectively than adding more persuasion to the connection step.</p>', 'End-to-end product design · Data storytelling · Adoption', 'Discovery through post-launch iteration', 'Trinkerr', ARRAY['Figma', 'Prototyping', 'Usability testing']::text[], ARRAY['Fintech', 'Portfolio', 'Data visualisation', 'Growth']::text[], 'Growth & insights', '2023–2024', NULL, '[]'::jsonb, '[]'::jsonb, '[{"value":"9×","label":"Increase in portfolio imports","hint":"After launching the insight-led report"},{"value":"1.2×","label":"Further lift","hint":"After adding a demo report"},{"value":"5","label":"Insight areas","hint":"Performance, valuation, risk, allocation, and red flags"}]'::jsonb, true, true, 3),
  ('TIQS 2.0 Design System', 'tiqs-design-system', 'Creating reusable foundations across mobile platforms to improve consistency and design-engineering alignment.', '<p>As Trinkerr and TIQS expanded, screens created by multiple designers began to diverge in spacing, components, states, naming, and behaviour. The inconsistency affected both product quality and handoff efficiency.</p><p>I contributed to TIQS 2.0 as a cross-platform design-system initiative covering foundations, reusable components, documentation, accessibility, and alignment with development.</p>', '<p>The system had grown reactively around individual features.</p><ul><li>Similar patterns existed as separate components.</li><li>Light and dark themes were difficult to maintain consistently.</li><li>Naming differences made components harder to discover and map to code.</li><li>States, accessibility guidance, and usage rules were not consistently documented.</li><li>Design and Storybook could drift during handoff.</li></ul>', '<p>We audited repeated patterns across core investing journeys, grouped inconsistencies by foundation and component, and prioritised the areas creating the most rework for design and engineering.</p><p>The audit showed that the problem was not a lack of components. It was a lack of shared rules for when to reuse, extend, or create one.</p>', '<p>The system was approached as a product rather than a one-time library clean-up.</p><ol><li>Defined colour, typography, spacing, elevation, and semantic state foundations.</li><li>Adopted reusable component properties instead of duplicating components for every variation.</li><li>Aligned light and dark themes through shared tokens and variables.</li><li>Standardised naming to improve discoverability and code mapping.</li><li>Documented anatomy, states, accessibility, content guidance, and usage boundaries.</li><li>Reviewed implementation with developers and compared Figma patterns with Storybook.</li></ol>', '<p>TIQS 2.0 provided a clearer shared language across product surfaces.</p><ul><li>Tokenised foundations for theme-aware design.</li><li>Reusable components with structured variants and properties.</li><li>Touch targets, contrast, disabled states, and interaction guidance.</li><li>Consistent iconography and numerical typography for fintech data.</li><li>Documentation and handoff patterns designed for asynchronous collaboration.</li></ul>', '<p>The system reduced avoidable inconsistency, made component decisions easier to review, and improved the shared understanding between design and engineering. It also created a stronger base for scaling new product modules without recreating common patterns.</p><p>No percentage reduction is presented because a verified measurement source is not available for publication.</p>', '<p>A design system scales through governance and adoption, not the size of its library. Component properties, naming, documentation, and code alignment often create more value than adding another set of polished variants.</p>', 'Design systems · Cross-platform UX · Documentation', 'System audit through adoption', 'Trinkerr / TIQS', ARRAY['Figma variables', 'Component properties', 'Storybook']::text[], ARRAY['Design systems', 'Fintech', 'iOS', 'Android']::text[], 'Design system', '2023–2025', NULL, '[]'::jsonb, '[]'::jsonb, '[{"value":"2","label":"Platform themes","hint":"Shared light and dark foundations"},{"value":"iOS + Android","label":"Cross-platform scope","hint":"Reusable patterns across mobile products"},{"value":"System","label":"Design-to-code alignment","hint":"Naming, documentation, and Storybook reviews"}]'::jsonb, true, true, 4)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  overview = EXCLUDED.overview,
  problem_statement = EXCLUDED.problem_statement,
  research = EXCLUDED.research,
  design_process = EXCLUDED.design_process,
  solution = EXCLUDED.solution,
  outcome = EXCLUDED.outcome,
  learnings = EXCLUDED.learnings,
  role = EXCLUDED.role,
  duration = EXCLUDED.duration,
  company = EXCLUDED.company,
  tools = EXCLUDED.tools,
  tags = EXCLUDED.tags,
  category = EXCLUDED.category,
  timeline = EXCLUDED.timeline,
  thumbnail_url = COALESCE(public.projects.thumbnail_url, EXCLUDED.thumbnail_url),
  gallery = CASE
    WHEN jsonb_array_length(public.projects.gallery) > 0 THEN public.projects.gallery
    ELSE EXCLUDED.gallery
  END,
  links = CASE
    WHEN jsonb_array_length(public.projects.links) > 0 THEN public.projects.links
    ELSE EXCLUDED.links
  END,
  metrics = EXCLUDED.metrics,
  featured = EXCLUDED.featured,
  published = EXCLUDED.published,
  sort_order = EXCLUDED.sort_order;

DELETE FROM public.experience;
INSERT INTO public.experience (
  role, company, location, start_date, end_date, description, highlights, sort_order, published
) VALUES
  ('Assistant Manager, Product Design', 'Motilal Oswal Financial Services', 'Mumbai, India', 'Aug 2025', NULL, 'Leading product design across high-impact Riise initiatives spanning homepage personalisation, stock discovery, AI-assisted investing, and scalable platform experiences.', ARRAY['Re-architected the Riise homepage to prioritise relevant financial products using behaviour, lifecycle, and portfolio signals.', 'Led the 0-to-1 product definition of Screener, covering discovery, filters, comparison, saved workflows, and AI-assisted decisions.', 'Shaping Mira AI as a unified layer across support, research, portfolio analysis, market briefs, and actionable recommendations.', 'Partner with product, engineering, and compliance to move multiple complex workstreams from problem framing to implementation.']::text[], 1, true),
  ('Product Designer', 'Trinkerr', 'Bengaluru, India', 'Feb 2023', 'Apr 2025', 'Designed investing and advisory experiences for a SEBI-registered platform, with a focus on data storytelling, product adoption, and cross-platform consistency.', ARRAY['Turned portfolio import into an insight-led Portfolio Health Report, contributing to a 9× increase in imports after launch.', 'Introduced a demo report that helped users understand the value before connecting a broker, contributing a further 1.2× lift.', 'Designed actionable advisory formats covering entry, exit, and stop-loss information for clearer investment decisions.', 'Contributed to TIQS 2.0, aligning tokens, components, accessibility, and design-engineering handoff across iOS and Android.']::text[], 2, true),
  ('Associate Product Designer', 'Trinkerr', 'Bengaluru, India', 'Jan 2022', 'Feb 2023', 'Owned foundational investing experiences across portfolio tracking, watchlists, stock details, and transaction flows for mobile users.', ARRAY['Mapped complex investment information into clearer mobile flows and reusable interaction patterns.', 'Used interviews, usability testing, and heuristic reviews to identify friction and guide iteration.', 'Worked closely with product and engineering to maintain consistency across iOS and Android releases.']::text[], 3, true);

DELETE FROM public.education;
INSERT INTO public.education (
  institution, degree, field, start_date, end_date, description, sort_order, published
) VALUES
  ('Masai School', 'Full Stack UI/UX Designer', 'Product Design & Frontend Development', 'Jun 2021', 'Jan 2022', 'Bengaluru, India', 1, true),
  ('Thakur College of Engineering & Technology', 'Bachelor of Engineering', 'Mechanical Engineering', '2018', '2022', 'Mumbai, India', 2, true);

DELETE FROM public.skills;
INSERT INTO public.skills (group_name, name, sort_order) VALUES
  ('Product strategy', '0-to-1 product design', 1),
  ('Product strategy', 'Problem framing', 2),
  ('Product strategy', 'Information architecture', 3),
  ('Product strategy', 'Product discovery', 4),
  ('Product strategy', 'Data-informed design', 5),
  ('Product strategy', 'Stakeholder alignment', 6),
  ('Research & execution', 'User interviews', 7),
  ('Research & execution', 'Usability testing', 8),
  ('Research & execution', 'Rapid prototyping', 9),
  ('Research & execution', 'Interaction design', 10),
  ('Research & execution', 'Visual design', 11),
  ('Research & execution', 'Developer handoff', 12),
  ('Fintech & systems', 'WealthTech', 13),
  ('Fintech & systems', 'Stock broking', 14),
  ('Fintech & systems', 'SEBI-aware UX', 15),
  ('Fintech & systems', 'Hyper-personalisation', 16),
  ('Fintech & systems', 'AI integration', 17),
  ('Fintech & systems', 'Design systems', 18),
  ('Tools', 'Figma', 19),
  ('Tools', 'Framer', 20),
  ('Tools', 'ProtoPie', 21),
  ('Tools', 'Figma AI', 22),
  ('Tools', 'After Effects', 23),
  ('Tools', 'Maze', 24);

INSERT INTO public.seo_settings (route, title, description, keywords) VALUES
  ('/', 'Aman Mishra — Senior Product Designer', 'Senior Product Designer specialising in fintech, AI-assisted experiences, 0-to-1 products, and design systems.', ARRAY['Senior Product Designer', 'Fintech UX', 'Product Design', 'Design Systems']::text[]),
  ('/work', 'Selected Work — Aman Mishra', 'Four product-design case studies covering fintech personalisation, stock discovery, portfolio insights, and design systems.', ARRAY['Product Design Case Studies', 'Fintech UX', '0-to-1 Product Design']::text[]),
  ('/about', 'About — Aman Mishra', 'Product designer with 4.5+ years of experience across Motilal Oswal, Trinkerr, fintech products, AI, and design systems.', ARRAY['Aman Mishra', 'Senior Product Designer', 'Fintech Designer']::text[]),
  ('/resume', 'Résumé — Aman Mishra', 'Experience, capabilities, and education for Senior Product Designer Aman Mishra.', ARRAY['Product Designer Resume', 'Senior Product Designer']::text[]),
  ('/contact', 'Contact — Aman Mishra', 'Contact Aman Mishra for Senior Product Designer opportunities across fintech, AI, and complex product platforms.', ARRAY['Contact Product Designer', 'Senior Product Designer']::text[])
ON CONFLICT (route) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  keywords = EXCLUDED.keywords;

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

-- Ensure every media destination used by the CMS exists on a freshly
-- provisioned project. Objects stay private and are served through signed URLs.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES
  ('project-images', 'project-images', false, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]),
  ('thumbnails', 'thumbnails', false, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]),
  ('profile', 'profile', false, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]),
  ('resume', 'resume', false, 10485760, ARRAY['application/pdf']::text[])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Promote the existing portfolio owner account when this migration is applied
-- to a replacement project. If the Auth user is created later, this insert can
-- be re-run safely from the SQL editor.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE lower(email) = lower('aman755559@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;

-- Keep the project gate self-contained in Postgres. This avoids a separate
-- Edge Function deployment while preserving password hashing, expiring
-- sessions, revocation and a small persistent brute-force throttle.
CREATE TABLE IF NOT EXISTS public.project_access_tokens (
  token_hash text PRIMARY KEY,
  password_version integer NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.project_access_tokens TO service_role;
ALTER TABLE public.project_access_tokens ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS project_access_tokens_expiry_idx
ON public.project_access_tokens (expires_at);

CREATE OR REPLACE FUNCTION public.verify_project_password(_password text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  s_enabled boolean;
  s_password_hash text;
  s_password_version integer;
  s_session_hours integer;
  request_headers jsonb;
  request_key text;
  request_key_hash text;
  recent_failures integer;
  raw_token text;
  raw_token_hash text;
  token_expiry timestamptz;
BEGIN
  SELECT enabled, password_hash, password_version, session_duration_hours
  INTO s_enabled, s_password_hash, s_password_version, s_session_hours
  FROM public.project_access_settings
  WHERE id = 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'not_configured');
  END IF;

  request_headers := COALESCE(
    NULLIF(current_setting('request.headers', true), '')::jsonb,
    '{}'::jsonb
  );
  request_key := COALESCE(
    request_headers ->> 'cf-connecting-ip',
    request_headers ->> 'x-real-ip',
    request_headers ->> 'x-forwarded-for',
    'unknown'
  ) || '|' || COALESCE(request_headers ->> 'user-agent', 'unknown');
  request_key_hash := encode(digest(request_key || ':' || COALESCE(s_password_hash, ''), 'sha256'), 'hex');

  DELETE FROM public.project_access_attempts
  WHERE created_at < now() - interval '24 hours';
  DELETE FROM public.project_access_tokens
  WHERE expires_at <= now();

  IF s_enabled THEN
    IF s_password_hash IS NULL THEN
      RETURN jsonb_build_object('error', 'not_configured');
    END IF;

    SELECT count(*)::integer
    INTO recent_failures
    FROM public.project_access_attempts
    WHERE key_hash = request_key_hash
      AND success = false
      AND created_at >= now() - interval '15 minutes';

    IF recent_failures >= 5 THEN
      RETURN jsonb_build_object('error', 'rate_limited');
    END IF;

    IF _password IS NULL OR crypt(_password, s_password_hash) <> s_password_hash THEN
      INSERT INTO public.project_access_attempts (key_hash, success)
      VALUES (request_key_hash, false);
      RETURN jsonb_build_object('error', 'invalid_password');
    END IF;

    INSERT INTO public.project_access_attempts (key_hash, success)
    VALUES (request_key_hash, true);
    token_expiry := now() + make_interval(hours => s_session_hours);
  ELSE
    token_expiry := now() + interval '1 hour';
  END IF;

  raw_token := encode(gen_random_bytes(32), 'hex');
  raw_token_hash := encode(digest(raw_token, 'sha256'), 'hex');

  INSERT INTO public.project_access_tokens (token_hash, password_version, expires_at)
  VALUES (raw_token_hash, s_password_version, token_expiry);

  RETURN jsonb_build_object(
    'token', raw_token,
    'expires_at', (extract(epoch FROM token_expiry) * 1000)::bigint,
    'disabled', NOT s_enabled
  );
END;
$$;

REVOKE ALL ON FUNCTION public.verify_project_password(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_project_password(text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_protected_project(
  _slug text,
  _token text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  s_enabled boolean;
  s_password_version integer;
  supplied_token_hash text;
  token_is_valid boolean := false;
  project_data jsonb;
BEGIN
  SELECT enabled, password_version
  INTO s_enabled, s_password_version
  FROM public.project_access_settings
  WHERE id = 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'not_configured');
  END IF;

  DELETE FROM public.project_access_tokens
  WHERE expires_at <= now();

  IF s_enabled THEN
    IF _token IS NULL OR length(_token) = 0 THEN
      RETURN jsonb_build_object('error', 'unauthorized');
    END IF;

    supplied_token_hash := encode(digest(_token, 'sha256'), 'hex');
    SELECT EXISTS (
      SELECT 1
      FROM public.project_access_tokens
      WHERE token_hash = supplied_token_hash
        AND password_version = s_password_version
        AND expires_at > now()
    ) INTO token_is_valid;

    IF NOT token_is_valid THEN
      RETURN jsonb_build_object('error', 'unauthorized');
    END IF;
  END IF;

  SELECT to_jsonb(p)
  INTO project_data
  FROM public.projects p
  WHERE p.slug = _slug
    AND p.published = true;

  IF project_data IS NULL THEN
    RETURN jsonb_build_object('error', 'not_found');
  END IF;

  RETURN jsonb_build_object('project', project_data);
END;
$$;

REVOKE ALL ON FUNCTION public.get_protected_project(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_protected_project(text, text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.set_project_password(
  _password text DEFAULT NULL,
  _enabled boolean DEFAULT NULL,
  _session_duration_hours integer DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  current_enabled boolean;
  invalidate_sessions boolean := false;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501';
  END IF;

  IF _password IS NOT NULL AND length(_password) < 8 THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Password must be at least 8 characters');
  END IF;

  IF _session_duration_hours IS NOT NULL
     AND _session_duration_hours NOT IN (1, 8, 24, 72) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Invalid session duration');
  END IF;

  SELECT enabled INTO current_enabled
  FROM public.project_access_settings
  WHERE id = 1;

  invalidate_sessions := _password IS NOT NULL
    OR (_enabled IS NOT NULL AND _enabled IS DISTINCT FROM current_enabled);

  UPDATE public.project_access_settings
  SET
    enabled = COALESCE(_enabled, enabled),
    session_duration_hours = COALESCE(_session_duration_hours, session_duration_hours),
    password_hash = CASE
      WHEN _password IS NOT NULL THEN crypt(_password, gen_salt('bf', 10))
      ELSE password_hash
    END,
    password_version = password_version + CASE WHEN invalidate_sessions THEN 1 ELSE 0 END,
    updated_at = now(),
    updated_by = auth.uid()
  WHERE id = 1;

  IF invalidate_sessions THEN
    DELETE FROM public.project_access_tokens;
  END IF;

  RETURN jsonb_build_object('ok', true);
END;
$$;

REVOKE ALL ON FUNCTION public.set_project_password(text, boolean, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.set_project_password(text, boolean, integer) TO authenticated;

COMMIT;
