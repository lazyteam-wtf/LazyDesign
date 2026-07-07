# LazyDesign

LazyDesign is a modern adaptive React UI framework and interface design language for focused software work.

Current status: `v0.4.0` React component system foundation.

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

The core package layer includes:

- `src/core/tokens.ts` - semantic token references and base token values
- `src/core/theme.ts` - `createTheme`, `applyTheme`, and CSS variable serialization
- `src/core/color.ts` - Monet-powered color role generation
- `src/core/components.ts` - component-token contract without React components
- `src/core/registry.ts` - token metadata for docs, IDE hints, Figma sync, and migration tooling
- `src/core/radius.ts` - professional and expressive radius scales
- `src/core/motion.ts` - motion durations, easing, and named presets
- `src/primitives/` - Box, Stack, Text, Surface, Divider, and Spacer
- `src/components/` - Heading, Code, Icon, Button, Input, and Badge
- `src/react/` - React provider and framework entry

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

## Primitive Layer

v0.3.0 introduces the first React primitive layer. These are foundation elements, not product components.

```tsx
import { Stack, Surface, Text } from "lazydesign/primitives";
import "lazydesign/primitives/styles.css";

export function Panel() {
  return (
    <Surface level="container" padding="4">
      <Stack gap="3">
        <Text variant="heading-md">Primitive System</Text>
        <Text tone="muted">Built on LazyDesign tokens.</Text>
      </Stack>
    </Surface>
  );
}
```

Implemented primitives:

- `Box`
- `Stack`
- `Text`
- `Surface`
- `Divider`
- `Spacer`

## Component Layer

v0.4.0 introduces the first developer-facing React components.

```tsx
import { LazyProvider } from "lazydesign/react";
import { Badge, Button, Heading, Input } from "lazydesign/components";
import "lazydesign/primitives/styles.css";
import "lazydesign/components/styles.css";

export function Example() {
  return (
    <LazyProvider theme={{ seed: "#6750A4", mode: "dark" }}>
      <Heading level={1}>Launch workspace</Heading>
      <Input label="Project name" placeholder="LazyDesign" />
      <Button intent="primary" motion="soft">Launch</Button>
      <Badge intent="primary">v0.4</Badge>
    </LazyProvider>
  );
}
```

Implemented components:

- `Heading`
- `Code`
- `Icon`
- `Button`
- `Input`
- `Badge`

Larger components such as `Dialog`, `Toast`, `Table`, and `Tabs` still belong to later phases.

## Files

- `src/App.tsx` - interactive specification workspace
- `src/core/` - LazyDesign core token and theme runtime
- `src/primitives/` - foundation primitive React layer
- `src/components/` - first React component layer
- `src/react/` - provider and React framework entry
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
