# LazyDesign

LazyDesign is a modern Interface Design Language for focused software work.

It combines:

- Material Design 3 / Material You for adaptive color, surfaces, accessibility, and meaningful motion
- Vercel Geist for restraint, typography, spacing, and monochrome discipline
- Linear for dense professional SaaS workflows
- HeroUI for polished component defaults
- shadcn/ui for composable component architecture
- Material You Monet for dynamic theme generation
- GSAP + ScrollTrigger for purposeful motion

LazyDesign is not a landing page or a visual demo. It is a design system specification with a runnable spec workspace.

## Files

- `src/App.tsx` - interactive specification workspace
- `src/color.ts` - Monet-powered dynamic CSS variable generation
- `src/styles.css` - flat-first LazyDesign interface styling
- `public/docs/lazydesign-spec.md` - complete written specification

## Commands

```bash
pnpm install
pnpm dev
pnpm build
```

The local preview runs at `http://127.0.0.1:5173/`.
