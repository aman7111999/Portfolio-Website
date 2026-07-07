Scope: Only the Hero section (and the fixed Navbar’s top spacing) will be touched. No layout, composition, background, animation, or color changes.

Changes:
1. Hero typography
   - Increase headline font-size slightly (e.g., `clamp(2.75rem, 8.4vw, 6.5rem)`) and tighten/keep its line-height to make it visually dominant.
   - Keep the multi-line headline structure, accent gradient, and word-per-line overflow wraps unchanged.
   - Adjust paragraph `max-width` to `max-w-[60ch]` (≈60–70 characters per line) and keep current muted styling.

2. Hero spacing rhythm
   - Increase top padding of the Hero section (`pt-28 md:pt-36`) to create more breathing room below the fixed Navbar.
   - Add more vertical space between the headline and paragraph (`mt-10 md:mt-12`), between paragraph and chips (`mt-10`), and between CTA buttons and previous content (`mt-12`).
   - Keep the dashboard / HeroStage exactly in its right-column grid position; only the left editorial column’s internal rhythm is adjusted.
   - Slightly increase the gap between the company badges and the CTA cluster (`mt-16`).

3. Navbar-to-hero spacing
   - Leave the Navbar itself unchanged except for the Hero section’s top padding, which provides the spacing between navigation and hero content.

4. Validation
   - Build the app and check the preview at desktop, tablet, and mobile viewports to ensure no layout shifts, the dashboard remains in place, and the text hierarchy feels premium.
   - Commit once the typography and spacing feel polished.