# LazyDesign Specification

Version: 0.2.2
Status: Core Contract Freeze
Scope: Design language, token runtime, theme resolver, component-token contract, motion recipes

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
  -> Component Runtime        not started
  -> Production Library       not started
```

Current evaluation:

| Area | Status |
| --- | --- |
| Core Runtime | 100% |
| Token Architecture | 100% |
| Theme Engine | 85% |
| Motion Architecture | 70% |
| Component System | 0% |
| Documentation | 75% |

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

The registry enables documentation generation, Figma token export, IDE hints, migration checks, and AI-readable design rules.

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

Do not start with `Button`.

v0.3.0 begins with the foundation primitives:

- `Box`
- `Stack`
- `Surface`
- `Text`
- `Divider`

These primitives validate the runtime contract. Product components such as `Button`, `Input`, and `Card` come after primitives prove that tokens, theme switching, density, shape, and motion remain stable.

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
- `design/constitution.md`: non-negotiable rules
- `design/token-policy.md`: token governance policy
- `design/component-policy.md`: component implementation policy
