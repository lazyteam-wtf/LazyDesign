# LazyDesign Component Policy

Status: stable draft
Current implementation phase: v0.3.0 Component Foundation Layer

LazyDesign components are not allowed to bypass the runtime contract. They are composed from primitives, component tokens, typed props, accessible behavior, and motion recipes.

## Build Order

The first real component phase is primitives, not product components.

```txt
Primitive
  -> Component
  -> Pattern
  -> Application
```

v0.3.0 implements:

- `Box`
- `Stack`
- `Surface`
- `Text`
- `Divider`
- `Spacer`

Then:

- `Button`
- `Input`
- `Card`

## Component Requirements

Every component must define:

- API and controlled/uncontrolled behavior
- Variants and sizes
- States through `data-*` attributes
- Accessibility contract
- Dark-mode behavior
- Reduced-motion behavior
- Component tokens consumed by CSS
- Theme switching behavior

## Styling Rules

Component CSS consumes `--ld-component-*` tokens first.

Allowed:

```css
.ld-surface {
  background: var(--ld-component-surface-background);
  color: var(--ld-component-surface-foreground);
  border-color: var(--ld-component-surface-border);
}
```

Forbidden:

```css
.ld-surface {
  background: #ffffff;
  border-color: var(--md-outline-variant);
}
```

## Motion Rules

Component APIs use named recipes:

```tsx
<Surface motion="enter" />
```

Implementation adapters may use GSAP, Web Animations API, Motion One, or Framer Motion internally. Public component APIs do not expose adapter-specific objects.

## Primitive Guidance

`Box` handles polymorphic rendering, spacing, sizing, and data attributes.

`Stack` handles directional layout, gap, alignment, wrapping, and DOM-order preservation.

`Surface` validates flat hierarchy through surface levels, borders, and tonal roles.

`Text` centralizes typography variants, weight, tone, truncation, and semantic element mapping.

`Divider` centralizes border hierarchy, orientation, and decorative versus semantic behavior.

`Spacer` centralizes intentional empty space and must only resolve through spacing tokens.
