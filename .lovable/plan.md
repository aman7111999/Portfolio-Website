
# Redesign Strategy — Aman Mishra Portfolio

A strategy document only. No code changes proposed for this turn. Awaiting approval before Phase 1 build.

## Guardrails

- Keep Supabase (DB, Auth, Storage), the entire admin CMS, `AuthProvider`, roles, RLS, edge functions.
- Keep GitHub → Vercel deploy, `vercel.json`, `vite.config.ts`, Vite base handling, sitemap plugin.
- Keep every existing route and data hook signature. Redesign is additive/replacement inside components — no schema churn in early phases.
- Do not touch `src/integrations/supabase/*`, `.env`, `supabase/config.toml`.

---

## 1. Design audit

**Tokens** — 5 semantic colors and 2 font stacks in `src/index.css @theme` (`--color-ink/paper/muted/hairline/accent`, Geist + Inter Tight). Clean, but single-theme (light, warm paper, orange accent). No dark tokens, no `prefers-color-scheme`, no theme context.

**Type scale** — one `display-hero` utility (`clamp(3.5rem, 10.5vw, 9rem)`, tracking -0.045em, LH 0.92) is the only real display treatment. Section/body/eyebrow sizes are ad-hoc Tailwind classes per page.

**Rhythm** — spacing uses Tailwind defaults; container is `1240px`. Sections vary between `mt-40`, `pt-24 pb-32`, `py-16` — no shared vertical rhythm.

**Motion** — `useReducedMotion` is used everywhere (rare + good). Standard easing `[0.22, 1, 0.36, 1]`. `layoutId` shared-element nav underline. Lenis smooth scroll global.

**Inconsistencies** — `SectionHeading` component exists but Home rebuilds the eyebrow/heading pattern inline. `MagneticButton` primary variant is the only surface that fills with the accent color. Admin uses Tailwind `neutral-*` instead of tokens. Hero copy, "How I got here" copy, footer CTA copy, HeroStage card values are hardcoded (not CMS-driven).

## 2. UX audit

- Discovery: hero is strong on typography, but doesn't answer "who / what / how long / where / what impact" in the first 20 seconds — target audience needs that quickly.
- Work: `/work` has no filtering, no category chips, no sort — fine at ~6 projects, brittle at 20+.
- Case study: sticky TOC + parallax cover already exist, good bones. Sections render conditionally from 7 prose fields. Impact `metrics` renders as static text; the `CountUp` component exists but isn't wired here.
- About: `education` table has admin CRUD but no public UI — dead data path.
- Writing: `blogs` table + admin editor exist, but there is no `/blog` route. Same dead path.
- Contact: solid — email + copy interaction + form + socials + location. No availability indicator on Home.
- Prev/next case navigation at bottom of project page: icons `<ArrowLeft>/<ArrowRight>` lack `aria-label` and aren't `aria-hidden`.

## 3. UI audit

- Light warm paper aesthetic reads editorial but not premium-fintech-senior. The single warm accent (`#ff5a1f`) fights the "Linear/Vercel/Stripe" reference set the brief calls out.
- No dark mode — the brief explicitly asks for dual theme with independently designed light + dark, not inverted.
- Cards, badges, tags, quote blocks, metric blocks, timeline: not primitives — inlined per page. Reuse is low, drift is high.
- Testimonial tilts are a hardcoded 6-value cycle; 7th testimonial repeats the 1st tilt.
- HeroStage right-side aside contains hardcoded UI values ("−38%", "Ship time") that read as fake product screenshots to a design director.

## 4. Technical audit

- **Admin ships in the main bundle.** All 14 admin pages are eager-imported in `App.tsx`; every public visitor downloads admin JS + `RichEditor` + `ImageUploader`. Route-level `React.lazy` + `<Suspense>` would remove this.
- **`select("*")` everywhere in `cms.ts`.** Work page fetches full prose fields (`overview`, `problem_statement`, `research`, etc.) just to render a card. Field projection is trivial and high-value.
- **`dangerouslySetInnerHTML` unsanitized** on all project prose fields (`Project.tsx`). `RichEditor` output is HTML — if any editor output includes script/style/on* attrs, this is a live XSS surface. `DOMPurify` is not installed.
- **`prose prose-neutral` is likely a no-op.** `@tailwindcss/typography` isn't in `vite.config.ts` plugins — case-study prose gets no typographic treatment beyond Tailwind base.
- **Sitemap excludes project slugs.** `ghPagesStatic()` in `vite.config.ts` emits only static routes; case studies are invisible to sitemap crawlers.
- **`Seo` component doesn't emit `og:image` / `twitter:image`** despite `seo_settings.og_image_url` existing. Social previews use whatever Lovable hosting injects.
- **`ReadingProgress` runs globally** on every page, even Home where it's meaningless.
- **`NoiseOverlay` fixed + mix-blend on every scroll tick** — measurable compositing cost.
- **Anon key hardcoded fallback** in `vite.config.ts:19–22`. Safe (anon), but worth removing in favor of env-only.
- **Images lack `loading="lazy"`, `decoding="async"`, `width`/`height`** on Project gallery/cover — CLS + LCP risk.

## 5. Redesign strategy

**Positioning shift.** From "warm editorial portfolio" to "premium product-grade personal experience." Independent light + dark themes; dark is the primary demo mode.

**Visual identity direction.**
- Dark: near-black surfaces (`#0A0A0B` bg, `#111114` surface, `#17171A` card), off-white text `#F5F5F7`, muted `#9A9AA1`, borders `rgba(255,255,255,0.08)`. Never pure black.
- Light: warm off-white `#FAFAF7` (keep), surface `#F2F0EB`, card `#FFFFFF` with `rgba(0,0,0,0.06)` borders, ink `#0A0A0B`, muted `#6B6B70`.
- Single accent: **Electric Blue `#3B82F6`** (Tailwind blue-500) — used as: focus ring, active nav underline, hover glow on cards, one metric callout per section. Never as a solid button fill (removes the current MagneticButton primary treatment).
- Type: Geist Variable stays. Retire Inter Tight for body — Geist for both display and body, Geist Mono (add via `@fontsource/geist-mono`) for eyebrows/meta strips. Scale: 84 hero / 56 section / 32 card / 18 body / 15 small / 12 mono eyebrow.
- Spacing rhythm: 8-pt scale, standard section `py-32 md:py-40`, container `max-w-[1280px]`.
- Motion register: slower, quieter. Standard easing kept. Retire the breathing-scale loop on cards (reads decorative). Cursor follower stays but retinted to accent blue at 30% opacity.

**Content strategy.**
- Every section answers Why / How / What changed / Impact.
- Hero communicates identity + specialization + years + industries in the first fold, with two named recent companies.
- `/writing` is added as a public surface for the existing `blogs` table.
- About surfaces `education`.
- `projects.tags` finally rendered.
- HeroStage decorative aside is retired or replaced with a single restrained motion element (over-designed aside contradicts "the UI should disappear").

## 6. Implementation roadmap

**Phase 1 — Foundation (theme + tokens + primitives).**
- Rewrite `src/index.css` tokens: add both light and dark palettes under `[data-theme="light"]` / `[data-theme="dark"]`, keep default = dark. Add mono font. Add eyebrow, display-1/2/3, section-py utilities. Add `.glass`, `.noise`, `.hairline` re-tuned for dark.
- Add `ThemeProvider` (system detect, manual toggle, localStorage) and `ThemeToggle` in nav. Animate the swap via `view-transitions` where available, fade fallback elsewhere.
- Introduce primitives: `Button` (primary outline, secondary ghost, mono link — no filled accent), `Card`, `Metric` (wired to `CountUp`), `Tag`, `Badge`, `QuoteBlock`, `Timeline`, `SectionHeading` (adopt everywhere).

**Phase 2 — Navigation + Hero + Home shell.**
- Rebuild `Navbar` as floating glass pill (max-w 1120, mt-4, rounded-full, `backdrop-blur-xl`, shrinks on scroll). Links: Home · Work · About · Writing · Resume · Contact + `Let's Talk` CTA. Retain `layoutId` underline; retint to accent.
- Rebuild Hero: full viewport, restrained gradient mesh + dot grid + noise + mouse spotlight (single restrained ambient layer, not four stacked). Headline + supporting line from brief. Two named companies (current + previous, pulled from `experience` most-recent two). Primary + secondary CTAs. Availability chip.
- Restructure Home into: Hero → Featured Work → Impact metrics strip → Experience teaser → Testimonials → Writing teaser → CTA band. Move "How I got here", full experience, skills to `/about`.

**Phase 3 — Featured Work + Work page.**
- New `FeaturedProjectCard` (16:10 cover, group-hover scale + accent ring, meta row role · company · timeline, title, one-line summary, up to 4 tags — finally rendering `projects.tags`, up to 3 `Metric` chips, "Read case study →").
- `/work` moves to editorial single-column rhythm with alternating alignment on desktop, adds category filter chips reading distinct values from `projects.category`.

**Phase 4 — Case Study template.**
- Rework `Project.tsx` into long-form editorial template with sticky right-rail TOC (already partly there), section anchors for every existing prose field, `Metric` chips wired to `CountUp`, image gallery with lightbox, prev/next redesigned with proper `aria-label`s.
- Install `@tailwindcss/typography` + `dompurify`; wrap all `dangerouslySetInnerHTML` in `DOMPurify.sanitize`. This closes the XSS gap and makes `prose` classes actually render.
- No schema change required now. If richer editing is later desired, add optional `cover_url`, `read_time`, `color_accent` columns — flagged as a future migration, not in scope now.

**Phase 5 — About, Writing, Contact, dead-data recovery.**
- About: portrait as real `<img>` with alt (fix a11y), philosophy, `Timeline` for experience, `Timeline` for **education** (surface the dead table), values, tools, working style. Content editable via existing `site_settings` where possible; blocks that don't map get a follow-up field request.
- Writing: new `/writing` list + `/writing/:slug` post using existing `blogs` table + `useBlogs`. Sticky TOC, wide typographic measure, reading time (derived from content length until a schema field is added), syntax highlighting via `rehype-highlight` (deferred, only if any post ships code).
- Contact: keep flow; upgrade to premium editorial layout + availability status dot.

**Phase 6 — Motion, perf, a11y, SEO.**
- Route-level `React.lazy` + `<Suspense>` for `/projects/:slug`, `/writing`, and the entire admin subtree — removes admin JS from public bundle.
- Field projection in `cms.ts`: replace `select("*")` with per-hook column lists (heavy prose fields excluded from list queries).
- Retire always-mounted `ReadingProgress` — mount only inside case-study + writing post routes.
- Retune `NoiseOverlay` to a static CSS-only overlay (no fixed compositing per scroll tick), or gate it behind a "texture" toggle.
- Images: `loading="lazy"`, `decoding="async"`, explicit width/height, `srcset` for Supabase Storage URLs where the transformer supports it.
- SEO: extend `Seo` with `image` prop → `og:image` + `twitter:image` (from `seo_settings.og_image_url` and per-project `thumbnail_url`). Add `og:image` fallback in `index.html`. Update `theme-color` per active theme via meta tag. Extend `ghPagesStatic()` sitemap to include published project + blog slugs (fetch at build via Supabase anon).
- A11y: fix `Project.tsx` cover `aria-hidden`, add `aria-label`s to prev/next nav icons, convert About portrait `<div bg-image>` to `<img alt>`, verify AA contrast in both themes.

## 7. Risk analysis

- **XSS latent.** `dangerouslySetInnerHTML` on unsanitized CMS HTML. Priority to close in Phase 4; if you want it moved into Phase 1, say so.
- **Theming regression risk.** Introducing two themes rewires every hardcoded `bg-neutral-*` and `text-[var(--color-…)]` reference. Mitigated by keeping the same token names and only changing values + adding `[data-theme]` scope. Admin will need a light-only override or opt-in to dark.
- **Motion budget.** Cursor follower + Lenis + parallax + gradient mesh + noise + card breathing already stack. Redesign explicitly retires breathing loop and consolidates ambient layers.
- **Bundle-split regression.** `React.lazy` on admin means a first admin load is a chunk fetch — acceptable, but `AdminLogin` should be eager so the auth gate never flashes empty.
- **Data-shape assumptions.** Category filter chips assume clean `projects.category` strings; a mitigation is normalization in the hook, not a schema change.
- **Content gaps.** Some brief items (books, values, working style, philosophy) don't exist as CMS fields. Options: (a) hardcode until you approve schema fields, (b) add `site_settings.about_json` as a follow-up migration. Flagged, not implemented.
- **Deploy pipeline.** No changes to `vercel.json` or the GitHub workflow. Sitemap plugin extension in Phase 6 runs at Vite build time and must not require secrets beyond the anon key already present.

## 8. Estimated phases

- **Phase 1 — Foundation** (tokens, dual theme, primitives). Small–medium.
- **Phase 2 — Nav + Hero + Home shell.** Medium.
- **Phase 3 — Featured Work + Work page.** Small–medium.
- **Phase 4 — Case study template + XSS fix + prose plugin.** Medium.
- **Phase 5 — About + Writing + Contact + dead-data recovery.** Medium.
- **Phase 6 — Perf, a11y, SEO, sitemap, code-splitting.** Small–medium.

Recommended cadence: Phase 1 + 2 in one build turn (foundation without a landing surface is unreviewable), then one phase per turn with review between.

---

## Questions before Phase 1 build

1. **Confirm accent** — `#3B82F6` (Tailwind blue-500) or a specific electric blue you have in mind?
2. **Default theme on first visit** — dark (matches Vercel/Linear reference) or system-detect with no default bias?
3. **Two hero company chips** — auto-pick the two most recent from `experience`, or hardcode until you approve a CMS field?
4. **Hardcoded copy** (hero headline, "How I got here", footer CTA, HeroStage values) — okay to migrate into `site_settings` as new optional columns in Phase 1, or keep hardcoded for now?
5. **Admin theme** — keep admin light-only, or make admin also dual-theme?
