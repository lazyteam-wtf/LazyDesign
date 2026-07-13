# LazyDesign Component Policy

Status: stable draft
Current implementation phase: v0.6.0 Form Foundation Layer

LazyDesign components are not allowed to bypass the runtime contract. They are composed from primitives, component tokens, typed props, accessible behavior, and motion recipes.

## Build Order

```txt
Primitive
  -> Component
  -> Pattern
  -> Application
```

v0.3.0 implemented primitives:

- `Box`
- `Stack`
- `Surface`
- `Text`
- `Divider`
- `Spacer`

v0.4.0 implements the first React components:

- `Heading`
- `Code`
- `Icon`
- `Button`
- `Input`
- `Badge`

v0.4.1 hardens the first component APIs before adding larger components.

v0.4.2 introduces the adapter-safe LazyMotion runtime so components can use named motion recipes without exposing GSAP, ScrollTrigger, Web Animations, or future adapter internals.

v0.5.0 expands the React component system:

- `Card`
- `Tabs`
- `Tooltip`

v0.6.0 establishes the accessible form foundation:

- `Field`
- `Checkbox`
- `Switch`
- `Select`

Behavior-heavy components should prefer Radix primitives when available. LazyDesign owns the token contract, visual state mapping, density, and motion recipe; Radix owns the interaction semantics and focus behavior.

Next component phases may add `Dialog`, `Drawer`, `Toast`, `Table`, richer form patterns, and navigation patterns.

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
<Button motion="soft" />
```

Implementation adapters may use GSAP, Web Animations API, Motion One, or Framer Motion internally. Public component APIs do not expose adapter-specific objects.

Motion values used by components should resolve through component tokens when they affect repeated control behavior, such as hover lift and press displacement.

## Primitive Guidance

`Box` handles polymorphic rendering, spacing, sizing, and data attributes.

`Stack` handles directional layout, gap, alignment, wrapping, and DOM-order preservation.

`Surface` validates flat hierarchy through surface levels, borders, and tonal roles.

`Text` centralizes typography variants, weight, tone, truncation, and semantic element mapping.

`Divider` centralizes border hierarchy, orientation, and decorative versus semantic behavior.

`Spacer` centralizes intentional empty space and must only resolve through spacing tokens.

## Form Guidance

`Field` is the accessibility composition boundary for labels, descriptions, errors, required state, invalid state, and disabled state.

Form controls must call `useFieldControlProps()` when they can participate in `Field`.

`Checkbox`, `Switch`, and `Select` may wrap Radix primitives for behavior, but their public props, data attributes, styling, and motion language remain LazyDesign-owned.

Form CSS must consume `--ld-component-field-*`, `--ld-component-checkbox-*`, `--ld-component-switch-*`, and `--ld-component-select-*` tokens before semantic color tokens.
