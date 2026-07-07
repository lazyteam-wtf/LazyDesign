# LazyDesign

LazyDesign is a modern Interface Design Language for focused software work.

Current status: `v0.2.2` core contract freeze.

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
- `src/core/components.ts` - component-token contract without React components
- `src/core/registry.ts` - token metadata for docs, IDE hints, Figma sync, and AI codegen
- `src/core/radius.ts` - professional and expressive radius scales
- `src/core/motion.ts` - motion durations, easing, and named presets

The public token contract is namespaced:

- `--ld-color-*`
- `--ld-shape-corner-*`
- `--ld-motion-duration-*`
- `--ld-motion-easing-*`
- `--ld-typography-*`
- `--ld-space-*`
- `--ld-component-*`

Short v0.2.0 variables such as `--ld-primary` and `--ld-radius-md` are generated as compatibility aliases, but new runtime and component work should use the namespaced contract. Material `--md-*` variables are internal compatibility output from the Monet color engine, not the public component contract.

## Core Contract

Theme resolution is centralized:

```txt
User input
  -> resolveTheme()
  -> source
  -> brand
  -> semantic tokens
  -> component tokens
  -> CSS variables
```

`createTheme()` and `generateTheme()` remain stable aliases over `resolveTheme()`.

Component CSS consumes `--ld-component-*` tokens first. Future React components should not directly consume raw hex values, `--md-*` variables, or primitive palette values.

## Files

- `src/App.tsx` - interactive specification workspace
- `src/core/` - LazyDesign core token and theme runtime
- `design/` - constitution, principles, token policy, and component policy
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
