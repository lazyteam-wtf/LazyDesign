# LazyDesign Specification

Version: 0.6.0
Status: Form Foundation and LazyTeam.wtf Stateful Settings
Scope: Design language, token runtime, theme resolver, component-token contract, executable motion runtime, primitive React layer, production-facing React components, product example interface

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
  -> Motion Runtime           v0.4.2 adapter-safe execution layer
  -> Product Components       v0.5.0 Card, Tabs, Tooltip
  -> Form Foundation          v0.6.0 Field, Checkbox, Switch, Select
  -> Example Interface        v0.6.0 LazyTeam.wtf stateful settings console
  -> Production Library       not started
```

Current evaluation:

| Area | Status |
| --- | --- |
| Core Runtime | 100% |
| Token Architecture | 100% |
| Theme Engine | 88% |
| Motion Architecture | 80% |
| Primitive System | 58% |
| Component System | 45% |
| Documentation | 82% |

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
- `card`
- `tabs`
- `tooltip`
- `field`
- `checkbox`
- `switch`
- `select`
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

v0.4.2 adds an executable runtime:

```ts
import { createLazyMotion } from "lazydesign/motion";

const motion = createLazyMotion();
motion.animate(node, "reveal");
```

The default adapter uses the Web Animations API. GSAP and ScrollTrigger are available through a separate adapter entry:

```ts
import { createLazyMotion } from "lazydesign/motion";
import { lazyGsapMotionAdapter } from "lazydesign/motion/gsap";

const motion = createLazyMotion({ adapter: lazyGsapMotionAdapter });
motion.scroll(".section", "reveal", { start: "top 82%", scrub: 0.4 });
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

This layer is intentionally small. Larger behavior-heavy components such as `Dialog`, `Toast`, `Table`, and `Menu` come after the first component API settles.

v0.4.1 hardens the first component layer:

- `Button` supports `neutral`, `primary`, `secondary`, and `danger` intent.
- `Button` supports `motion="none | soft | press"` without exposing an animation adapter.
- `Input` supports explicit `state="default | error"` while keeping `error` and `invalid` ergonomic.
- `Icon` supports a registry-backed `name` API plus `registerIcon()` and `glyph` escape hatches.

v0.4.2 introduces the LazyMotion runtime layer:

- `createLazyMotion()` executes named recipes through an adapter contract.
- `lazyWebMotionAdapter` is the default lightweight adapter.
- `lazyGsapMotionAdapter` lives behind `lazydesign/motion/gsap`.
- React hooks such as `useLazyMotionRecipe()` read `LazyProvider` theme and reduced-motion preferences.

v0.5.0 expands the product component layer:

- `Card` provides a flat-first product container pattern over surface and spacing tokens.
- `Tabs` uses Radix Tabs behavior with LazyDesign trigger, focus, density, and indicator tokens.
- `Tooltip` uses Radix Tooltip behavior with restrained overlay tokens and reduced-motion support.
- The local preview now renders a LazyTeam.wtf industrial command console built from LazyDesign primitives and components.

v0.6.0 establishes the form foundation:

- `Field` centralizes accessible label, description, error, required, invalid, and disabled relationships.
- `Checkbox` wraps Radix Checkbox behavior while preserving LazyDesign size, state, motion, and component tokens.
- `Switch` wraps Radix Switch behavior with the same token and Field integration contract.
- `Select` exposes composable trigger, value, content, item, label, separator, and viewport pieces without exposing Radix as the product API.
- LazyTeam.wtf now includes a stateful Motion Grid settings surface for runtime profile, reduced motion, telemetry, and release gate validation.

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
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Field,
  FieldDescription,
  FieldLabel,
  Heading,
  Icon,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  Tooltip,
} from "lazydesign/components";
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

`Input` owns label, description, error, invalid state, and ARIA relationships. It also participates in `Field` when composed inside a form boundary.

```tsx
<Input label="Project name" state="error" error="Required" />
```

`Field` owns shared form semantics for labels, descriptions, errors, required, invalid, and disabled state.

```tsx
<Field invalid required>
  <FieldLabel>Release gate</FieldLabel>
  <Input />
  <FieldDescription>Choose a gate before deployment.</FieldDescription>
</Field>
```

`Checkbox`, `Switch`, and `Select` wrap behavior primitives while keeping LazyDesign's token, density, and motion contract in control.

```tsx
<Field>
  <Switch />
  <FieldLabel>Reduced interface motion</FieldLabel>
</Field>

<Field>
  <Checkbox defaultChecked />
  <FieldLabel>Runtime telemetry</FieldLabel>
</Field>

<Select defaultValue="linear">
  <SelectTrigger aria-label="Runtime profile">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="linear">Linear</SelectItem>
    <SelectItem value="material">Material</SelectItem>
  </SelectContent>
</Select>
```

`Icon` resolves registry names instead of exposing a specific icon package as public API.

```tsx
<Icon name="search" />
```

`Badge`, `Icon`, `Heading`, and `Code` are the first typography and feedback-adjacent building blocks.

`Card`, `Tabs`, `Tooltip`, `Field`, `Checkbox`, `Switch`, and `Select` are the first production-facing composition and behavior components.

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
- `src/motion/`: LazyMotion runtime, Web Animations adapter, GSAP adapter, and React hooks
- `src/primitives/`: primitive React layer
- `src/components/`: first React component layer
- `src/App.tsx`: LazyTeam.wtf example interface
- `src/react/`: React provider and framework entry
- `design/constitution.md`: non-negotiable rules
- `design/token-policy.md`: token governance policy
- `design/component-policy.md`: component implementation policy
