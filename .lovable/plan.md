## Ambient motion & personality pass (Home + global)

All motion stays subtle and slow. No new colors, fonts, layout structure, illustrations, videos, or emoji.

### 1. Custom cursor (global) — `src/components/CursorFollower.tsx`
Replace the current outlined/mix-blend cursor with a solid accent-red dot:
- Small solid dot (~8px) filled with `var(--color-accent)`, no border, no mix-blend.
- Trailing delay via softer `useSpring` (lower stiffness, higher damping) so it lags behind the pointer.
- Scale to 1.5x when hovering `a, button, [role="button"], [data-cursor], .group` (cards).
- Keep the pointer-fine + reduced-motion guards. Drop the contextual label pill to keep it quiet.

### 2. Hero headline word reveal — `src/pages/Home.tsx`
The three words ("Product", "you can", "feel.") already animate in; tune to the spec:
- Stagger delay ~80ms between words.
- Each word rises ~12px into place with fade, easing `[0.22, 1, 0.36, 1]`, ~0.7s.

### 3. Hero mockup card — `src/components/HeroStage.tsx`
- Card 2 ("−38%") SVG line: animate `strokeDasharray` / `pathLength` from 0→1 once on mount (~1.4s, ease-out), then leave static.
- Wrap the whole Card 2 in a `motion.div` with a continuous `y: [0, -2.5, 0]` loop, ~6s, ease-in-out, infinite.

### 4. Dot-grid parallax — `src/components/BackgroundFX.tsx`
- In `DotGrid`, use `useScroll` + `useTransform` to translate the grid a few px (`-8px → 8px`) as the page scrolls. Smooth with `useSpring`. Respect reduced motion.

### 5. Pulsing status dot in hero — `src/pages/Home.tsx`
- Prepend a small accent-red dot before "Product Designer · Bengaluru, India" with a slow pulse (`animate={{ opacity: [1, 0.4, 1], scale: [1, 1.15, 1] }}`, ~2.4s loop).

### 6. Project cards ambient + hover — `src/components/ProjectCard.tsx`
- Add a continuous slow "breathe" on the parallax background layer: `scale: [1, 1.015, 1]` over ~8s infinite (only when gradient bg, not user image, to avoid image jitter — safe either way but keep subtle).
- Replace linear hover with spring: on hover scale card to 1.03 and rotate the corner arrow +45°, both via `whileHover` with `transition={{ type: "spring", stiffness: 220, damping: 18 }}`.

### 7. New "00 / How I got here" section — `src/pages/Home.tsx`
Insert between hero and "01 / Selected work". Matches existing section pattern (label / heading / paragraph) used for Experience & Craft:
```
00 / How I got here
Built to fix things, not decorate them.
[paragraph copy from the request]
```
Uses `Reveal`, `container-page`, `font-display`, `text-xs uppercase tracking-widest text-[var(--color-muted)]`, same spacing as sibling sections.

### 8. Testimonial rotation variance — `src/pages/Home.tsx`
- Give each testimonial card a deterministic tilt in `[-1°, 1°]` (based on index) via inline `style={{ rotate: … }}` on a wrapping `motion.div`. Slight hover reset to 0° for readability.

### 9. Nav underline hover — `src/components/Navbar.tsx`
- Add an animated underline that grows from left on hover for Work / About / Contact (and Index), using framer-motion spring (`stiffness: 260, damping: 22`). Keep the existing active-route `layoutId` underline.

### 10. Scroll-arrow bounce — `src/pages/Home.tsx`
- Wrap the `ArrowDown` icon next to "Scroll for selected work" in a `motion.span` with `y: [0, 4, 0]`, ~1.8s ease-in-out infinite.

### 11. Duplicate testimonial byline fix — `src/pages/Home.tsx`
- Root cause: the testimonials block renders both `t.author` and `[t.role, t.company]`; seed data appears to have the full "Priya Rao / Director of Design · Razorpay" string stored in `author` (and again reconstructed from role+company), producing two visually identical lines.
- Fix in the presentation layer only: render `author` once and only show the `role · company` line when it isn't already contained in `author` (case-insensitive substring / normalized compare). Trim whitespace. No DB writes.

### Technical notes
- All new motion honors `useReducedMotion()` — falls back to static.
- No color/font/layout token changes; only motion + one new section + one conditional render tweak.
- Files touched: `CursorFollower.tsx`, `HeroStage.tsx`, `BackgroundFX.tsx`, `ProjectCard.tsx`, `Navbar.tsx`, `pages/Home.tsx`.

### Out of scope
- No changes to routing, admin, data model, or CMS.
- No new dependencies.
