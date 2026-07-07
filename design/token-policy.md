# LazyDesign Token Policy

Status: stable draft  
Runtime contract version: v0.2.2

Tokens are public API. LazyDesign treats token naming, metadata, and resolution order as infrastructure, not styling convenience.

## Token Layers

```txt
Source
  -> Brand
  -> Semantic
  -> Component
  -> CSS Variables
```

## Public Namespaces

Use these namespaces for new runtime and component work:

- `--ld-color-*`
- `--ld-space-*`
- `--ld-shape-corner-*`
- `--ld-motion-duration-*`
- `--ld-motion-easing-*`
- `--ld-typography-*`
- `--ld-component-*`

Compatibility aliases such as `--ld-primary`, `--ld-radius-md`, and `--ld-type-body-md` are deprecated migration helpers. New code must not depend on them.

Material `--md-*` variables are internal compatibility output from the Monet engine. They are not the LazyDesign component contract.

## Metadata Required

Every public token must have metadata:

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

The registry in `src/core/registry.ts` is the source for docs, design-token export, Figma sync, IDE hints, and AI code-generation rules.

## Consumption Rules

Foundation tokens define raw system values: spacing, shape, typography, motion.

Semantic color tokens define interface meaning: primary, surface, outline, error, state layers.

Component tokens define component contracts: surface, text, control, button, input.

Component CSS consumes component tokens first. It may consume foundation tokens for layout when no component token exists. It must not consume source colors, raw palette tones, raw hex values, or `--md-*` variables.

## Change Policy

Adding a token is minor if it does not change existing meaning.

Renaming, removing, or changing semantic meaning is breaking unless a compatibility alias and migration note exist.

Changing component-token mapping is risky even when variable names stay stable. Verify light mode, dark mode, high contrast, compact density, and reduced motion before release.
