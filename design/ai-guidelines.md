# LazyDesign AI Guidelines

Status: stable draft  
Applies to: AI-generated LazyDesign code, docs, specs, examples, and migrations

AI assistants working on LazyDesign must read this file with `design/constitution.md`, `design/token-policy.md`, and `design/component-policy.md` before generating code.

## AI Must

- Use existing LazyDesign primitives before creating new component structure.
- Import primitive styles explicitly when primitives are used: `import "lazydesign/primitives/styles.css";`.
- Use semantic tokens, component tokens, and primitive props.
- Preserve `resolveTheme()` as the central theme API.
- Preserve `lazyTokenRegistry` as the source for token metadata.
- Keep component CSS on `--ld-component-*` tokens first.
- Prefer `Box`, `Stack`, `Surface`, `Text`, `Divider`, and `Spacer` for foundation layout.
- Add tests or build verification when changing runtime, primitives, or public API.

## AI Must Not

- Hardcode colors, radii, spacing, typography, or shadows when a LazyDesign token exists.
- Use `--md-*` variables in component CSS.
- Depend on compatibility aliases such as `--ld-primary` or `--ld-radius-md` in new code.
- Create decorative gradients, glassmorphism, glows, or ornamental shadows.
- Expose GSAP timelines or adapter-specific animation objects as public component API.
- Add product components before the primitive layer is stable.
- Rename public tokens without compatibility aliases and migration notes.

## Preferred Primitive Patterns

Use `Surface` for hierarchy:

```tsx
<Surface level="container" padding="4">
  <Text variant="heading-md">System panel</Text>
</Surface>
```

Use `Stack` for spacing relationships:

```tsx
<Stack gap="3">
  <Text>Primary content</Text>
  <Text tone="muted">Secondary content</Text>
</Stack>
```

Use `Text` for typography:

```tsx
<Text variant="body-md" tone="primary" />
```

Do not replace these with arbitrary `div`, `h1`, or `p` elements unless the primitive cannot express the needed semantic structure.

## Escalation Rule

If a requested change requires bypassing tokens, resolver, registry, primitives, or accessibility contracts, stop and explain the design-system risk before implementing.
