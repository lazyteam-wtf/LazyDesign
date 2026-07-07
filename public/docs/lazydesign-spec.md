# LazyDesign Specification

Version: 0.4.1
Status: React Component Quality Hardening
Scope: Design language, token runtime, theme resolver, component-token contract, motion recipes, primitive React layer, first React components

LazyDesign is a flat-first adaptive interface language for focused software work. It is moving from a written specification into an executable design-system runtime.

LazyDesign is not trying to copy Ant Design, Material Design, HeroUI, shadcn/ui, Linear, or Vercel. It separates their useful ideas into the right layers:

- Material 3: token philosophy, surfaces, accessibility, meaningful motion
- Monet: dynamic theme generation
- Vercel and Linear: restrained visual language and productive density
- shadcn/ui: composable ownership model
- HeroUI: polished component expectations
- GSAP: implementation adapter for purposeful motion

## Runtime Status

```txt
Idea
  -> Design Philosophy        done
  -> Token System             done
  -> Theme Engine             stable runtime draft
  -> Token Governance         v0.2.2
  -> Component Token Layer    v0.2.2
  -> Primitive System         v0.3.0
  -> Component Runtime        v0.4.1 first layer hardening
  -> Production Library       not started
```

Current evaluation:

| Area | Status |
| --- | --- |
| Core Runtime | 100% |
| Token Architecture | 100% |
| Theme Engine | 85% |
| Motion Architecture | 70% |
| Primitive System | 55% |
| Component System | 25% |
| Documentation | 80% |

## Core Contract

LazyDesign resolves theme data in one direction:

```txt
User input
  -> resolveTheme()
  -> source
  -> brand
  -> semantic tokens
  -> component tokens
  -> CSS variables
  -> UI, motion, theme switching
```

Components must not decide how brand, mode, contrast, density, radius, or style map to final UI variables. That job belongs to `resolveTheme()`.

## Public Token Namespaces

Use these namespaces for new runtime and component work:

- `--ld-color-*`
- `--ld-space-*`
- `--ld-shape-corner-*`
- `--ld-motion-duration-*`
- `--ld-motion-easing-*`
- `--ld-typography-*`
- `--ld-component-*`

Short aliases such as `--ld-primary`, `--ld-radius-md`, and `--ld-type-body-md` are compatibility aliases only. New code must not depend on them.

Material `--md-*` variables are internal compatibility output from the Monet engine. They are not the LazyDesign public component contract.

## Token Governance

Every public token is represented in the registry:

```ts
type LazyTokenMetadata = {
  name: string;
  variable: string;
  value: string;
  type: "color" | "space" | "shape" | "motion" | "typography" | "component" | "density";
  category: "source" | "foundation" | "semantic" | "component" | "runtime" | "compatibility";
  status: "stable" | "experimental" | "deprecated";
  description: string;
  replacement?: string;
  introducedIn: string;
};
```

The registry enables documentation generation, Figma token export, IDE hints, migration checks, and design-token tooling.

## Theme API

```ts
import { resolveTheme, applyTheme } from "lazydesign/theme";

const theme = resolveTheme({
  source: "#6750A4",
  mode: "dark",
  contrast: "normal",
  density: "standard",
  radius: "professional",
  style: "linear",
});

applyTheme(theme);
```

Supported style modes:

- `linear`
- `geist`
- `material`
- `expressive`
- `enterprise`

Style modes are resolver inputs. They do not let components bypass tokens.

## Theme Output

```ts
type LazyTheme = {
  source: LazyThemeSource;
  brand: LazyBrandTheme;
  semantic: LazySemanticTheme;
  components: LazyComponentTheme;
  vars: Record<string, string>;
  cssText: string;
  apply(target: HTMLElement): void;
};
```

`createTheme()` and `generateTheme()` remain stable aliases over `resolveTheme()`.

## Component Token Layer

Component CSS consumes `--ld-component-*` tokens first.

Current component-token groups:

- `surface`
- `text`
- `control`
- `button`
- `input`
- `badge`
- `icon`
- `code`

Examples:

```css
.ld-surface {
  background: var(--ld-component-surface-background);
  color: var(--ld-component-surface-foreground);
  border-color: var(--ld-component-surface-border);
}

.ld-button {
  background: var(--ld-component-button-background);
  color: var(--ld-component-button-foreground);
  border-color: var(--ld-component-button-border);
}
```

Forbidden:

```css
.ld-button {
  background: #6750a4;
}

.ld-button {
  background: var(--md-primary);
}
```

## Motion Contract

LazyMotion exposes recipes, not implementation details.

Available recipe names:

- `fade`
- `slide`
- `scale`
- `reveal`
- `scroll`

Example:

```ts
import { createMotionRecipe } from "lazydesign/motion";

const recipe = createMotionRecipe("reveal", "system");
```

GSAP and ScrollTrigger may be used as adapters. Component APIs must not expose GSAP timelines directly.

## Component Roadmap

v0.3.0 implements the foundation primitives:

- `Box`
- `Stack`
- `Surface`
- `Text`
- `Divider`
- `Spacer`

These primitives validate the runtime contract. Product components such as `Button`, `Input`, and `Card` come after primitives prove that tokens, theme switching, density, shape, and motion remain stable.

v0.4.0 begins the React component layer:

- `Heading`
- `Code`
- `Icon`
- `Button`
- `Input`
- `Badge`

This layer is intentionally small. Larger behavior-heavy components such as `Dialog`, `Toast`, `Tooltip`, `Table`, `Tabs`, and `Menu` come after the first component API settles.

v0.4.1 hardens the first component layer:

- `Button` supports `neutral`, `primary`, `secondary`, and `danger` intent.
- `Button` supports `motion="none | soft | press"` without exposing an animation adapter.
- `Input` supports explicit `state="default | error"` while keeping `error` and `invalid` ergonomic.
- `Icon` supports a registry-backed `name` API plus `registerIcon()` and `glyph` escape hatches.

## Primitive API

Primitive styles are imported explicitly:

```tsx
import { Box, Stack, Surface, Text, Divider, Spacer } from "lazydesign/primitives";
import "lazydesign/primitives/styles.css";
```

`Box` is the base polymorphic container. It maps spacing, radius, surface, and border props to LazyDesign CSS variables.

```tsx
<Box padding="4" radius="medium" surface="container" border />
```

`Stack` owns flex direction, gap, alignment, justification, and wrapping.

```tsx
<Stack gap="3" direction="column" align="stretch" />
```

`Text` owns typography variants and text tones.

```tsx
<Text variant="heading-md">Contract first</Text>
<Text tone="muted">No raw typography decisions in app code.</Text>
```

`Surface` validates the flat-first hierarchy.

```tsx
<Surface level="container" padding="4" />
```

`Divider` centralizes border hierarchy and orientation. `Spacer` centralizes intentional empty space.

Primitive CSS consumes component and foundation tokens. It must not consume raw colors, `--md-*` variables, or compatibility aliases.

## Component API

Component styles are imported explicitly:

```tsx
import { LazyProvider } from "lazydesign/react";
import { Badge, Button, Heading, Icon, Input } from "lazydesign/components";
import "lazydesign/primitives/styles.css";
import "lazydesign/components/styles.css";
```

`LazyProvider` scopes the resolved theme through CSS variables.

```tsx
<LazyProvider theme={{ seed: "#6750A4", mode: "dark" }}>
  <App />
</LazyProvider>
```

`Button` uses `intent`, `variant`, `size`, and `motion` instead of Ant-style `type`.

```tsx
<Button intent="primary" size="md" motion="press" iconStart={<Icon name="upload" />}>
  Launch
</Button>
```

`Input` owns label, description, error, invalid state, and ARIA relationships.

```tsx
<Input label="Project name" state="error" error="Required" />
```

`Icon` resolves registry names instead of exposing a specific icon package as public API.

```tsx
<Icon name="search" />
```

`Badge`, `Icon`, `Heading`, and `Code` are the first typography and feedback-adjacent building blocks.

## LazyDesign Refusals

LazyDesign refuses:

- decorative glass as a default surface language
- ornamental gradients
- oversized shadow hierarchy
- meaningless glow
- Dribbble-only product screens
- motion that does not explain change
- component CSS that bypasses tokens
- public API that exposes implementation adapters
- accessibility treated as a checklist afterthought

## Source Files

- `src/core/tokens.ts`: public token variables and foundation values
- `src/core/registry.ts`: token metadata registry
- `src/core/theme.ts`: resolver, theme creation, CSS variable serialization
- `src/core/color.ts`: Monet-powered color roles
- `src/core/components.ts`: component-token contract
- `src/core/motion.ts`: motion tokens and recipes
- `src/primitives/`: primitive React layer
- `src/components/`: first React component layer
- `src/react/`: React provider and framework entry
- `design/constitution.md`: non-negotiable rules
- `design/token-policy.md`: token governance policy
- `design/component-policy.md`: component implementation policy
