# LazyDesign Constitution

Status: stable draft  
Applies to: core runtime, tokens, primitives, components, docs, and release tooling

LazyDesign is an interface design language before it is a component library. Every implementation must preserve the runtime contract that lets brand, accessibility, density, motion, and component behavior resolve predictably.

## Rule 001: Flat hierarchy first

Create hierarchy with semantic color, typography, spacing, borders, state layers, and content structure before shadows or effects.

Shadows are allowed for overlays that represent real spatial separation: dialog, popover, menu, drawer, tooltip. Default cards and panels do not use shadow for hierarchy.

## Rule 002: Components do not consume primitive color

Components must not directly consume palette tones, raw hex values, Material `--md-*` variables, or source colors.

Allowed consumption order:

```txt
Brand source
  -> semantic tokens
  -> component tokens
  -> component CSS
```

## Rule 003: Component tokens are the component contract

Component CSS consumes `--ld-component-*` tokens first. Semantic tokens may be used only to define component tokens or for non-component specification content.

Bad:

```css
.ld-button {
  background: var(--ld-color-primary);
}
```

Good:

```css
.ld-button {
  background: var(--ld-component-button-primary-background);
}
```

## Rule 004: Motion explains change

Motion must communicate feedback, state transition, spatial relationship, or attention. Decorative loops, bounce effects, and motion that only exists to impress are not LazyDesign.

Public APIs expose motion recipes such as `enter`, `reveal`, `fade`, `slide`, and `scroll`. They do not expose GSAP timelines as component API.

## Rule 005: Theme resolution is centralized

Theme generation goes through `resolveTheme()`. Components never decide how brand color, mode, contrast, density, radius, or style map to final CSS variables.

## Rule 006: Accessibility is part of the contract

Every interactive component must define keyboard behavior, focus behavior, ARIA contract, contrast target, disabled behavior, and reduced-motion behavior before it is considered complete.

## Rule 007: Composition beats configuration

LazyDesign components should be small, typed, composable, and ownable. Prefer explicit subcomponents, `asChild`, data attributes, and CSS variables over opaque configuration objects.

## Rule 008: No visual novelty debt

LazyDesign refuses decorative glassmorphism, ornamental gradients, oversized shadows, unbounded glow effects, and landing-page composition inside product interfaces.

## Rule 009: Token changes are breaking until proven otherwise

Token names, meanings, and component-token relationships are core API. Add metadata, aliases, and migration notes before changing public token contracts.

## Rule 010: Primitives before components

The component system starts with foundation primitives: `Box`, `Stack`, `Surface`, `Text`, and `Divider`. Product components such as `Button`, `Input`, and `Card` are composed on top of those primitives and the component token layer.
