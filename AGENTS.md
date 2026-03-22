# AGENTS.md

## Project purpose
Vegan Hypertrophy is a science-backed vegan muscle-building website. The repo currently ships a static HTML/CSS site focused on educational fitness/nutrition content and is evolving toward a conversion-oriented business website.

## Brand + product goals
- Core model: content-led funnel into lead capture, digital products, and affiliate monetization.
- Prioritize: clarity, trust, usefulness, and conversion.
- Required site feel: minimalist, polished, credible, practical.
- Avoid hype, gimmicks, bro-science tone, or spammy sales patterns.

## Tone and copy rules
- Keep copy clear, concise, science-backed, and action-oriented.
- Use specific claims and practical guidance; avoid exaggerated promises.
- Prefer plain language over slang (e.g., avoid “gainz/hackz” style phrasing unless explicitly requested).
- CTAs should be confident but not pushy.

## Current technical conventions (observed)
- Site is flat/static: top-level `*.html` pages and image assets.
- Styling is mixed: many pages contain inline `<style>` blocks; `styles.css` exists and should be the preferred shared style source for new work.
- Navigation/footer are duplicated across pages (no templating system yet).
- No framework/build tooling is required for basic edits.

## Preferred approach for new pages/components
1. Reuse shared patterns in `styles.css` first; only add page-local CSS when truly page-specific.
2. Keep global navigation/footer structure consistent across all relevant pages.
3. Build reusable content sections (hero, CTA, guide cards, “who this is for”, lead magnet blocks) with composable class names.
4. Keep information architecture business-oriented: Home, Start Here, Guides, Resources, About, Contact (+ product/tools areas).
5. If proposing larger structural changes (templating, framework migration), provide rationale, scope, and migration plan before implementation.

## Content preservation rules
- Do **not** rewrite or delete existing long-form article content unless explicitly asked.
- For polish tasks, prefer layout, headings, summaries, metadata, and CTA placement updates that preserve original meaning.
- Flag factual concerns with proposed edits, but do not silently replace author intent.

## Responsiveness and accessibility
- Mobile-first layouts; verify common breakpoints (at minimum ~375px, 768px, 1024px+).
- Maintain readable contrast, semantic heading order, and descriptive alt text.
- Ensure keyboard-focus visibility and usable tap targets for nav/CTAs.
- Avoid motion-heavy effects; respect reduced-motion preferences.

## Definition of done for UI tasks
A UI task is done when:
- The page is visually consistent with the brand principles above.
- Navigation/footer/CTA patterns are coherent with the rest of the site.
- Copy is clear, science-backed in tone, and conversion-oriented without being salesy.
- Responsive behavior is verified and no obvious layout breakage remains.
- Links are validated (no intentional dead ends).
- Changes are minimal, targeted, and documented.

## Dependency and rewrite policy
- Avoid unnecessary dependencies, tooling churn, or major rewrites.
- Prefer incremental refactors over full rebuilds unless a rewrite is explicitly requested or clearly justified by maintainability/business impact.
