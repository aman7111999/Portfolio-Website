-- Add the Motilal Oswal Portfolio Analysis case study to the existing project
-- collection. The migration is idempotent so it can be replayed safely.

INSERT INTO public.projects (
  title,
  slug,
  short_description,
  overview,
  problem_statement,
  research,
  design_process,
  solution,
  outcome,
  learnings,
  role,
  duration,
  company,
  tools,
  tags,
  category,
  timeline,
  thumbnail_url,
  gallery,
  links,
  metrics,
  featured,
  published,
  sort_order
) VALUES (
  'Portfolio Analysis',
  'portfolio-analysis',
  'Unifying internal and externally linked portfolios into one insight-to-action experience for clearer investment decisions.',
  $content$<p>Investors rarely hold their complete wealth in one place. Their Motilal Oswal investments may be only one part of a portfolio spread across brokers, stocks, and mutual funds. The product opportunity was not another holdings view; it was a decision layer that could interpret the whole picture.</p><p>I designed Portfolio Analysis for Riise as a unified experience across <strong>internal Motilal Oswal holdings and externally imported portfolios</strong>. It brings portfolio health, risk, diversification, recommendations, and human advisory support into one continuous journey.</p><p>My role covered product framing, experience architecture, information hierarchy, interaction design, high-fidelity UI, edge states, and design-system-aligned handoff.</p>$content$,
  $content$<p>Portfolio data was fragmented by source and difficult to translate into a confident next step. A user could see what they owned, but not necessarily what the combined portfolio meant.</p><ul><li>Internal and external investments created separate mental models.</li><li>Dense financial metrics could feel diagnostic without being understandable.</li><li>Stocks and mutual funds required different analysis while still belonging to one portfolio story.</li><li>Insights risked becoming dead ends if the product did not offer an appropriate action.</li><li>Import and syncing required clear consent, trust, progress, failure, and empty states.</li></ul><p>The product goal was to turn fragmented holdings into a coherent analysis that helps investors understand risk, identify gaps, and choose an informed next step.</p>$content$,
  $content$<p>I audited the existing portfolio, import, stock-research, mutual-fund, and advisory journeys, then mapped the questions users need answered as they move from visibility to action.</p><p>The synthesis revealed four recurring needs: <strong>completeness</strong> across brokers, <strong>interpretation</strong> of complex metrics, <strong>prioritisation</strong> of what deserves attention, and <strong>support</strong> at the moment a decision becomes consequential.</p><p>These inputs shaped a product principle: keep the data source visible, but never make the user learn a different analysis model for each source.</p>$content$,
  $content$<p>I structured the experience around investor questions instead of backend data categories.</p><ol><li><strong>What is being analysed?</strong> Overall, Motilal Oswal, and External views preserve source context.</li><li><strong>Is my portfolio healthy?</strong> A concise overview surfaces allocation, risk, diversification, and attention areas.</li><li><strong>Why does it matter?</strong> Every metric is paired with interpretation and portfolio-specific context.</li><li><strong>Where is the issue?</strong> Progressive disclosure connects a diagnosis to the affected stocks or funds.</li><li><strong>What can I do next?</strong> IAP portfolios, RM support, and downloadable reports support different confidence levels.</li></ol><p>I also designed the non-ideal journey: no external portfolio, first-time connection, consent, syncing, partial data, errors, empty analysis, and light/dark states. This made the system buildable beyond the ideal happy path.</p>$content$,
  $content$<p>The final experience works as a connected six-part journey.</p><ul><li><strong>Entry and value framing:</strong> Portfolio Analysis communicates the benefit before asking users to connect more data.</li><li><strong>Unified portfolio scope:</strong> Overall, Motilal Oswal, and External tabs offer control without fragmenting the product.</li><li><strong>External portfolio connection:</strong> Consent-led broker import and visible syncing states reduce uncertainty.</li><li><strong>Stock diagnostics:</strong> Allocation, sector and stock concentration, portfolio risk, and red flags are organised by priority.</li><li><strong>Mutual-fund analysis:</strong> Risk alignment, diversification, and overlap are explained in an asset-appropriate format.</li><li><strong>Decision support:</strong> Relevant IAP mutual-fund portfolios, a relationship-manager conversation, and report download turn insight into an actionable choice.</li></ul><p>The interface uses progressive disclosure and plain-language interpretation to retain analytical depth without becoming a data dump.</p>$content$,
  $content$<p>The work established one scalable portfolio-intelligence model across internal and external investments, designed for <strong>2M+ portfolio-analysis use cases</strong>. It aligned the product around a continuous path from holdings to diagnosis to an appropriate next step.</p><p>The design system covers stocks, mutual funds, multiple portfolio sources, import states, light/dark themes, and advisory actions while keeping a consistent core interaction model.</p><p>No unverified conversion or post-launch uplift is presented. The defensible outcome is the product architecture, build-ready journey, and scale of use cases covered.</p>$content$,
  $content$<p>A portfolio score alone creates attention, not confidence. The valuable design work is the layer between the number and the action: explaining why a signal matters, showing where it comes from, and offering help without pretending the interface can replace investor judgement.</p><p>The project also reinforced that source unification is an experience problem before it is a data problem. Users can accept multiple sources as long as the product gives them one stable mental model.</p>$content$,
  'Lead product design · Product strategy · Data storytelling',
  'Discovery to build-ready handoff',
  'Motilal Oswal Financial Services',
  ARRAY['Figma', 'Prototyping', 'Design system']::text[],
  ARRAY['Fintech', 'Portfolio intelligence', 'Data visualisation', 'Advisory UX']::text[],
  'Portfolio intelligence',
  '2025–2026',
  NULL,
  '[]'::jsonb,
  '[{"label":"Figma source","url":"https://www.figma.com/design/xL2pjlUJRgR8NVAirSDS01/Important-Projects?node-id=1-3"}]'::jsonb,
  '[{"value":"2M+","label":"Portfolio-analysis use cases","hint":"Across internal and linked external investments"},{"value":"2 sources","label":"One analysis model","hint":"Motilal Oswal and externally imported portfolios"},{"value":"3 paths","label":"From insight to action","hint":"IAP portfolios, RM support, and report download"}]'::jsonb,
  true,
  true,
  1
)
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
  links = EXCLUDED.links,
  metrics = EXCLUDED.metrics,
  featured = EXCLUDED.featured,
  published = EXCLUDED.published,
  sort_order = EXCLUDED.sort_order;

UPDATE public.projects
SET sort_order = CASE slug
  WHEN 'portfolio-analysis' THEN 1
  WHEN 'riise-hyper-personalisation' THEN 2
  WHEN 'screener-stock-discovery' THEN 3
  WHEN 'portfolio-health-report' THEN 4
  WHEN 'tiqs-design-system' THEN 5
  ELSE sort_order
END
WHERE slug IN (
  'portfolio-analysis',
  'riise-hyper-personalisation',
  'screener-stock-discovery',
  'portfolio-health-report',
  'tiqs-design-system'
);

-- Preserve any CMS customisation while keeping the visible project count true.
UPDATE public.content_blocks
SET data = jsonb_set(data, '{items,2,v}', '"5"'::jsonb, false)
WHERE key = 'home_stats'
  AND jsonb_typeof(data -> 'items') = 'array'
  AND jsonb_array_length(data -> 'items') >= 3;

UPDATE public.seo_settings
SET description = 'Five product-design case studies covering portfolio intelligence, fintech personalisation, stock discovery, portfolio insights, and design systems.'
WHERE route = '/work';
