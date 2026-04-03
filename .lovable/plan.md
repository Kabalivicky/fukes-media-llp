

# RGB Color Treatment Across the Entire Website

## What You'll Get
A consistent, animated RGB color line/glow effect (Red #C8102E, Blue #0077B6, Green #00A651) applied as a unifying visual thread across all major UI elements sitewide -- not just the header and footer where it already exists.

## Current State
- Header: has a static RGB gradient line at the top
- Footer: has a static RGB gradient line at the bottom
- Hero: has RGB orbs (red/blue/green glows)
- SectionHeading: has a static RGB underline
- CSS: has `.gradient-text`, `.gradient-button`, `.rainbow-border`, `.rgb-glow` classes but they're underused

## Plan

### 1. Add animated RGB line to global CSS utilities
- Update the existing `.rainbow-border` class in `src/index.css` to use an animated sweeping gradient (not just bottom border -- also top, left, right variants)
- Add a new `.rgb-line-animated` utility that applies a horizontally-animating RGB gradient bar
- Add `.rgb-border-glow` for cards that shows a subtle animated RGB border on hover

### 2. Update Card component with RGB hover glow
- Modify `src/components/ui/card.tsx` to add a subtle animated RGB border-glow on hover using the existing `rgb-glow` CSS class or a new refined version

### 3. Update section dividers
- Modify `src/components/AnimatedSectionDivider.tsx` to use the RGB gradient line between all page sections

### 4. Update LightweightBackground
- Add very subtle, slow-moving RGB ambient glow orbs (red, blue, green) to the global background in `src/components/LightweightBackground.tsx` with gentle CSS animation

### 5. Apply RGB accents to key interactive elements
- **Buttons**: Add an RGB shimmer effect on hover to the CTA button variant in `src/components/ui/button.tsx`
- **Input focus**: Update `src/index.css` to give form inputs an RGB gradient ring on focus
- **Links in nav/footer**: Add RGB underline on hover

### 6. Update scrollbar with RGB gradient
- Change the scrollbar thumb in `src/index.css` to use the RGB gradient

### 7. Page-level section headings
- The `SectionHeading` component already has an RGB underline -- ensure it's consistently used and the animation is smooth

## Files to Modify
- `src/index.css` -- new RGB utility classes, scrollbar, input focus, global animations
- `src/components/ui/card.tsx` -- RGB hover border
- `src/components/ui/button.tsx` -- RGB shimmer on CTA variant
- `src/components/LightweightBackground.tsx` -- ambient RGB orbs with animation
- `src/components/AnimatedSectionDivider.tsx` -- RGB gradient divider

## Design Guardrails
- Keep effects subtle and performant (CSS-only where possible, no heavy JS)
- Dark mode: slightly brighter RGB glows; Light mode: softer/muted
- Respect reduced-motion preferences
- Maintain the brand identity (Red/Blue/Green = Fuke's Media signature)

