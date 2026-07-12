# Typography audit + fixes

## What I found

Font sizes are inconsistent across pages. The site uses a mix of hardcoded pixel values (`text-[10px]` through `text-[15px]`), Tailwind presets (`text-xs`, `text-lg`, `text-3xl`…), and design-token utilities (`display-hero`, `eyebrow`). Similar UI elements use different sizes on different pages.

**Navbar (top widget bar)**
- Logo: `text-[20px]` italic serif — reads slightly small next to the 12px caps links.
- Nav links / Email button: `text-[12px]` uppercase — OK.
- Mobile "Email" pill: `text-[11px]` — should match desktop `12px`.
- Mobile menu items: `text-sm` (14px) — fine.
- Theme toggle icon: 15px — fine.

**Cross-page inconsistencies**
- Eyebrow labels: mix of `text-xs` (12px), `text-[10px]`, `text-[11px]`. The `eyebrow` utility (11px, uppercase, tracking-widest) already exists — should be the only one used.
- Body copy on Hero/Home intro: `text-[14px]`, About uses `text-lg` (18px), Contact/Work use `text-lg`. Should standardize to one lead size + one body size.
- Section H2s: About and others use `text-4xl md:text-6xl` — fine, but `display-2`/`display-3` utilities already define these.
- Small pill buttons: 10.5px / 11px / 12px / 13px — pick two: 11px chip, 12px CTA.
- Form inputs: `text-[15px]` — fine, keep as body input size.

## Proposed unified scale (used everywhere)

```
eyebrow / mono caps ....... 11px  (use .eyebrow)
chip / tag pill ........... 11px
nav link + CTA caps ....... 12px
supporting body / hint .... 13px
body base ................. 15px
lead paragraph ............ 18px  (text-lg)
input text ................ 15px
section H2 ................ display-2 (uses --font-size-4xl clamp)
page H1 / hero ............ display-hero
card title ................ inherits from ProjectCard
```

## Changes

**Navbar (`src/components/Navbar.tsx`)**
- Logo: bump to `text-[22px]` md `text-[24px]` for stronger presence.
- Mobile Email pill: `text-[11px]` → `text-[12px]` to match desktop.

**Hero (`src/components/Hero.tsx`)**
- Greeting sticker eyebrow `text-[10px]` → `text-[11px]` (matches eyebrow scale).
- "Currently designing at" eyebrow already 11px — keep.
- Buttons already 13px — keep (hero-scale CTA is intentionally 1px larger than nav).

**Home (`src/pages/Home.tsx`)**
- Intro paragraph `text-[14px]` → `text-[15px]` (body base).
- Buttons `text-[12px]` — keep.

**Footer (`src/components/Footer.tsx`)**
- Chip buttons `text-[11px]` → `text-[12px]` for parity with nav CTA size.
- Legal row `text-[11px]` — keep (metadata is intentionally smaller).

**Work (`src/pages/Work.tsx`)**
- Replace `text-xs uppercase tracking-widest` with the `.eyebrow` utility.
- Lead `text-lg` — keep.

**About (`src/pages/About.tsx`)**
- Replace loose `text-4xl md:text-6xl` section headings with `.display-2` utility for consistency with the token scale.
- Metadata `text-lg` labels — keep.
- Body `text-lg leading-relaxed` — keep.

**Contact (`src/pages/Contact.tsx`)**
- Replace three `text-xs uppercase tracking-widest` labels with `.eyebrow`.
- Form field labels `text-[11px]` → use `.eyebrow` (same 11px, same tracking).
- Submit button `text-[12px]` — keep.

**Project (`src/pages/Project.tsx`)**
- Consolidate `text-[10.5px]` / `text-[10px]` chips → `text-[11px]`.
- Body `text-lg leading-relaxed` — keep.

**ProjectCard (`src/components/ProjectCard.tsx`)**
- Chips already at 10–11px on colored cards — bump the `10px` category sticker to `11px` for consistency.
- Body `text-[13px]` — keep (supporting hint size).

## Not touched
- `display-hero`, `display-1..3` utilities in `index.css` — the scale itself is well-tuned; only usage is being normalized.
- Admin pages (out of scope for user-facing typography).
- Case-study `.prose-editorial` — self-contained, already consistent.

## Verification
- Screenshot Home, About, Work, Contact in both light and dark themes at desktop (1280px) after changes.
- Confirm nav, hero eyebrows, and section headings visually align across pages.
