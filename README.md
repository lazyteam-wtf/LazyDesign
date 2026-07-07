# LazyDesign

LazyDesign is a modern Interface Design Language for focused software work.

Current status: `v0.2.1` runtime contract stabilization.

It combines:

- Material Design 3 / Material You for adaptive color, surfaces, accessibility, and meaningful motion
- Vercel Geist for restraint, typography, spacing, and monochrome discipline
- Linear for dense professional SaaS workflows
- HeroUI for polished component defaults
- shadcn/ui for composable component architecture
- Material You Monet for dynamic theme generation
- GSAP + ScrollTrigger for purposeful motion

LazyDesign is not a landing page or a visual demo. It is evolving from a design system specification into an executable UI framework.

## Runtime Direction

The v0.2 foundation introduces the first core package layer:

- `src/core/tokens.ts` - semantic token references and base token values
- `src/core/theme.ts` - `createTheme`, `applyTheme`, and CSS variable serialization
- `src/core/color.ts` - Monet-powered color role generation
- `src/core/radius.ts` - professional and expressive radius scales
- `src/core/motion.ts` - motion durations, easing, and named presets

The public token contract is namespaced:

- `--ld-color-*`
- `--ld-shape-corner-*`
- `--ld-motion-duration-*`
- `--ld-motion-easing-*`
- `--ld-typography-*`
- `--ld-space-*`

Short v0.2.0 variables such as `--ld-primary` and `--ld-radius-md` are generated as compatibility aliases, but new runtime and component work should use the namespaced contract. Material `--md-*` variables are internal compatibility output from the Monet color engine, not the public component contract.

## Files

- `src/App.tsx` - interactive specification workspace
- `src/core/` - LazyDesign core token and theme runtime
- `src/color.ts` - compatibility wrapper around the core theme runtime
- `src/styles.css` - flat-first LazyDesign interface styling
- `public/docs/lazydesign-spec.md` - complete written specification

## Commands

```bash
pnpm install
pnpm dev
pnpm build
```

The local preview runs at `http://127.0.0.1:5173/`.
