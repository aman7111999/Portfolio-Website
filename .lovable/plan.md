
# Premium case studies + Decap CMS

Three pillars in one pass:

1. **Content model** — move from flat JSON to **MDX + frontmatter**.
2. **Editor** — **Decap CMS** at `/admin`, auth via a **Cloudflare Worker** you deploy once.
3. **Reading UX** — a full premium case-study kit (sticky TOC, lightbox, before/after, timelines, quotes, callouts, page transitions).

---

## 1. Content architecture (MDX)

New shape:
```
content/
  projects/
    _index.json                 ← order + featured flags (CMS-managed)
    blitz-design-system/
      index.mdx                 ← frontmatter + rich body
      images/                   ← per-project uploads
    meera-ai/index.mdx
    …
  about.mdx
  experience.json
  skills.json
  testimonials.json
  site.json
  resume.pdf
```

Frontmatter per project:
```yaml
---
slug: blitz-design-system
title: "Blitz — Building a design system…"
company: Razorpay
role: Design Lead
duration: 10 months · 2024
timeline: Q1 – Q4 2024
category: Design System
cover: /content/projects/blitz-design-system/images/cover.jpg
summary: …
featured: true
order: 1
team: [Design Lead (me), 2 Product Designers, 3 Engineers, 1 PM]
constraints: […]
metrics:
  - { label: Ship time, value: "-38%" }
sections:                       # for sticky TOC
  - { id: overview, label: Overview }
  - { id: problem,  label: Problem }
  - …
---

<Hero />
## Overview
Body prose…
<PullQuote author="…">…</PullQuote>
<Gallery images={[…]} />
<BeforeAfter before="…" after="…" />
<Timeline steps={[…]} />
<Callout kind="insight">…</Callout>
```

Loader (`src/lib/content.ts`): use `import.meta.glob('/content/projects/*/index.mdx', { eager, query: '?raw' })` combined with `@mdx-js/rollup` so MDX compiles to React at build time. Frontmatter parsed via `remark-frontmatter` + `remark-mdx-frontmatter`.

Existing 4 case studies are rewritten into MDX with the new components (no content lost).

---

## 2. Rich MDX components

All available inside any `.mdx` and mapped globally through `<MDXProvider>`:

| Component | Purpose |
|---|---|
| `Hero` | Full-bleed cover with parallax |
| `Section id` | TOC anchor + reveal animation |
| `PullQuote` | Editorial quote with attribution |
| `Callout kind="insight\|decision\|warning\|learning"` | Highlight boxes |
| `MetricGrid` | Animated count-up metric row |
| `Gallery` | Masonry grid → opens lightbox |
| `Figure caption` | Single image with caption + zoom |
| `BeforeAfter` | Drag-slider comparison |
| `Timeline` | Animated vertical process timeline |
| `Prototype src` | Responsive Figma / video embed |
| `DesignSystemGrid` | Token / component showcase |
| `Steps` | Numbered decision cards |
| `TwoUp` | Side-by-side content blocks |
| `Divider label` | Animated section divider |

Lightbox: **yet-another-react-lightbox** + Zoom plugin (keyboard, swipe, Esc, pinch).

---

## 3. Premium case-study page

`src/pages/Project.tsx` gets a full rebuild:

- **Cinematic hero**: full-bleed cover image with mask reveal + slow zoom.
- **Sticky sub-nav** under the main nav: chapter title + progress bar.
- **Sticky TOC** on the left at ≥lg — animated active dot + smooth scroll.
- **Reading progress** bar (already present) refined.
- **Section reveals** with staggered fade-up per block.
- **Metrics** already animated (CountUp) — restyled as premium metric cards with hairline dividers.
- **Meta strip**: Role · Timeline · Team · Constraints in a refined 4-col hairline grid.
- **Learnings & Reflection** blocks styled distinctly (serif accent, warmer tone).
- **Next project preview**: full-bleed hover card with animated cover peek.
- **Page transitions**: mask-reveal in / fade out (already wired via AnimatePresence).

---

## 4. Homepage + shared component polish

Small refinements that flow from the new system:

- Featured projects use new cover images (from MDX frontmatter).
- Testimonials + Experience cards adopt the refined hairline / hover-lift treatment.
- Footer keeps the giant "Have a problem worth solving?" line.
- Navbar gets a subtle top hairline once scrolled + refined active-link dot.

No layout rewrites — same information architecture, tighter execution.

---

## 5. Decap CMS at `/admin`

Files:
```
public/admin/
  index.html         ← loads decap-cms 3.x
  config.yml         ← backend + collections
```

`config.yml` sketch:
```yaml
backend:
  name: github
  repo: <your-username>/<your-repo>
  branch: main
  base_url: https://<your-worker>.workers.dev
media_folder: content/uploads
public_folder: /content/uploads

collections:
  - name: projects
    folder: content/projects
    path: "{{slug}}/index"
    extension: mdx
    format: frontmatter
    create: true
    fields:
      - {label: Title,   name: title,   widget: string}
      - {label: Company, name: company, widget: string}
      - {label: Cover,   name: cover,   widget: image}
      - {label: Featured, name: featured, widget: boolean, default: false}
      - {label: Order,   name: order,   widget: number, default: 99}
      - {label: Metrics, name: metrics, widget: list, fields: [
          {label: Label, name: label, widget: string},
          {label: Value, name: value, widget: string}]}
      - {label: Body,    name: body,    widget: markdown}
  - name: site
    files:
      - {label: Site,        name: site,        file: content/site.json,        fields: […]}
      - {label: About,       name: about,       file: content/about.mdx,        fields: […]}
      - {label: Experience,  name: experience,  file: content/experience.json,  fields: […]}
      - {label: Skills,      name: skills,      file: content/skills.json,      fields: […]}
      - {label: Testimonials, name: testimonials, file: content/testimonials.json, fields: […]}
```

At `/admin`, Decap loads, calls the Worker for GitHub OAuth, then commits every save directly to your repo.

---

## 6. Cloudflare Worker (auth backend)

New folder `decap-oauth/` with:

- `worker.js` — implements the two Decap endpoints (`/auth` and `/callback`) that shake hands with GitHub OAuth.
- `wrangler.toml` — one config file.
- `README.md` — the exact 5-minute setup:
  1. Create free Cloudflare account.
  2. Create GitHub OAuth App (I give the exact form values, incl. callback URL).
  3. `npm i -g wrangler && wrangler login`.
  4. Paste `GITHUB_CLIENT_ID` + `GITHUB_CLIENT_SECRET` via `wrangler secret put`.
  5. `wrangler deploy`. Copy the Worker URL into `public/admin/config.yml → backend.base_url`.

No servers to run, no monthly cost, no framework migration.

---

## 7. GitHub Pages deploy

`.github/workflows/deploy.yml` already exists. It's updated to:
- Run `bun install`
- Run `bun run build` (which includes MDX compile + sitemap gen)
- Publish `dist/` to Pages

Result: edit in `/admin` → GitHub commit → Actions rebuild → live in ~1 min.

---

## 8. Scalability

Adding a 47th project = create a new folder in `/admin` → hit Save. Zero React changes. Same pattern later covers `content/blog/`, `content/talks/`, `content/awards/` — add a collection to `config.yml` + a route.

---

## Technical section (for reference)

**New deps**:
`@mdx-js/rollup`, `@mdx-js/react`, `remark-frontmatter`, `remark-mdx-frontmatter`, `remark-gfm`, `gray-matter`, `yet-another-react-lightbox`.

**Vite**: add `@mdx-js/rollup` plugin with remark chain; keep `base: process.env.VITE_BASE ?? '/'`; keep post-build 404.html copy.

**Types**: `content.ts` exports `Project` with `Component: React.FC` (the compiled MDX) alongside frontmatter.

**Reduced motion**: every new animation gates on `useReducedMotion()`.

**Accessibility**: lightbox is keyboard-first; TOC is a real `<nav>`; before/after slider has ARIA slider role + keyboard.

**Files created / changed** (high level):
- `content/projects/*/index.mdx` (4 rewrites)
- `content/about.mdx` (new)
- `public/admin/{index.html,config.yml}` (new)
- `decap-oauth/{worker.js,wrangler.toml,README.md}` (new)
- `src/components/mdx/*` (Hero, Gallery, Lightbox, PullQuote, Callout, MetricGrid, BeforeAfter, Timeline, Steps, Prototype, DesignSystemGrid, Figure, TwoUp, Divider, Section, Provider)
- `src/lib/content.ts` (MDX loader rewrite)
- `src/pages/Project.tsx` (premium rebuild)
- `src/pages/About.tsx` (read from about.mdx)
- `vite.config.ts` (MDX plugin + updated sitemap gen)
- `.github/workflows/deploy.yml` (unchanged flow, verified)

**Out of scope for this pass** (deferrable):
- Theme toggle
- Blog / Playground / Talks routes (structure ready, wire when needed)
- Real content — I keep the 4 existing case studies rewritten in MDX; you replace copy + images through `/admin`.

---

## What you'll need to do after I ship

1. Connect the project to GitHub (Plus menu → GitHub → Connect).
2. Run the 5-step Worker setup from `decap-oauth/README.md`.
3. Paste the Worker URL into `public/admin/config.yml`.
4. Enable GitHub Pages (or keep publishing via Lovable — both work).
5. Visit `/admin`, sign in with GitHub, start editing.

Everything else — content, images, projects, SEO — happens through `/admin` from then on.
