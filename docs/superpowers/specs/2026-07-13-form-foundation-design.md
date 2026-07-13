# LazyDesign v0.6 Form Foundation Design

**Status:** Approved for implementation  
**Release target:** `v0.6.0`  
**Scope:** Field composition, Checkbox, Switch, Select, component tokens, automated test foundation, and LazyTeam.wtf integration

## Purpose

LazyDesign v0.6 establishes the first complete form-control subsystem. The release must prove that the frozen runtime contract can drive accessible, controlled and uncontrolled React components without bypassing semantic or component tokens.

This phase intentionally precedes overlays and data components. Dialogs, command menus, tables, and workflow editors all depend on reliable form labeling, focus behavior, selection state, density, and validation semantics.

## Product Principles

- Controls remain flat and industrial: hierarchy comes from one-pixel borders, restrained zinc surfaces, typography, and state layers.
- Brand color appears primarily in checked state, active indicators, focus rings, and validation feedback.
- Keyboard behavior and ARIA relationships are part of the public contract, not optional implementation details.
- Composition remains explicit. Field structure and Select anatomy use named subcomponents instead of configuration objects.
- Radix owns interaction semantics where its primitives fit; LazyDesign owns API curation, tokens, visual state mapping, density, and motion.
- Public APIs expose semantic states and motion recipes. They do not expose Radix or GSAP internals.

## Architecture

```txt
LazyProvider theme input
  -> resolveTheme()
  -> semantic color and density
  -> form component tokens
  -> Field / Checkbox / Switch / Select CSS

Radix behavior primitives
  -> keyboard and focus behavior
  -> controlled and uncontrolled state
  -> data-state attributes
  -> LazyDesign React wrappers
```

The form subsystem consists of four independent units:

1. `Field` creates accessible label, description, and error relationships through React context.
2. `Checkbox` wraps Radix Checkbox and supports checked, unchecked, and indeterminate states.
3. `Switch` wraps Radix Switch and provides a compact binary control with predictable keyboard behavior.
4. `Select` wraps Radix Select using composable root, trigger, content, group, item, label, and separator parts.

Each control can be used without `Field`, but `Field` is the preferred composition when visible labels, descriptions, or errors are present.

## Field API

```tsx
<Field invalid={hasError} disabled={disabled} required>
  <FieldLabel>Runtime profile</FieldLabel>
  <Select value={profile} onValueChange={setProfile}>
    <SelectTrigger>
      <SelectValue placeholder="Select a profile" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="linear">Linear</SelectItem>
      <SelectItem value="material">Material</SelectItem>
    </SelectContent>
  </Select>
  <FieldDescription>Controls density and surface behavior.</FieldDescription>
  <FieldError>Select a runtime profile.</FieldError>
</Field>
```

`Field` owns generated IDs and exposes them through context. A compatible control reads the field context and receives:

- `id` for `FieldLabel` association
- `aria-describedby` for description and error nodes
- `aria-invalid` when the field is invalid
- `aria-required` when required
- disabled state when the field disables its children

Explicit control props take precedence over context values. `FieldLabel`, `FieldDescription`, and `FieldError` remain usable only inside `Field`; development builds throw a descriptive error when the context is missing.

The existing `Input` convenience API remains backward compatible. Its current `label`, `description`, and `error` props continue to work, while its internal accessibility mapping reuses the same field-state helper where practical.

## Checkbox API

```tsx
<Field>
  <div className="settings-row">
    <Checkbox id="telemetry" checked={enabled} onCheckedChange={setEnabled} />
    <FieldLabel htmlFor="telemetry">Runtime telemetry</FieldLabel>
  </div>
  <FieldDescription>Collect anonymous performance signals.</FieldDescription>
</Field>
```

Public props extend Radix Checkbox root props and add:

- `size?: "sm" | "md"`
- `state?: "default" | "error"`
- `motion?: "none" | "soft" | "press"`

The checked value preserves Radix's `boolean | "indeterminate"` contract. The indicator is included by default and may be replaced through `children` when advanced composition is needed.

## Switch API

```tsx
<Switch checked={motionEnabled} onCheckedChange={setMotionEnabled} size="md" />
```

Public props extend Radix Switch root props and add:

- `size?: "sm" | "md"`
- `state?: "default" | "error"`
- `motion?: "none" | "soft" | "press"`

The thumb is rendered internally so the common API stays concise. The root remains styleable through `className` and state attributes.

## Select API

The Select API mirrors the composable Radix anatomy while curating visual options:

- `Select`
- `SelectTrigger`
- `SelectValue`
- `SelectIcon`
- `SelectPortal`
- `SelectContent`
- `SelectViewport`
- `SelectGroup`
- `SelectLabel`
- `SelectItem`
- `SelectItemText`
- `SelectSeparator`

`SelectTrigger` adds:

- `size?: "sm" | "md" | "lg"`
- `state?: "default" | "error"`

`SelectContent` adds:

- `motion?: "none" | "scale" | "slide"`
- `sideOffset?: number`, defaulting to `6`

The content uses a portal, collision-aware positioning, a one-pixel border, and only the minimal overlay shadow permitted by the LazyDesign constitution. Items expose selected, highlighted, and disabled states through Radix data attributes.

## Component Tokens

The component-token contract gains four namespaces.

```txt
--ld-component-field-label-foreground
--ld-component-field-description-foreground
--ld-component-field-error-foreground
--ld-component-field-gap

--ld-component-checkbox-background
--ld-component-checkbox-background-checked
--ld-component-checkbox-foreground-checked
--ld-component-checkbox-border
--ld-component-checkbox-border-checked
--ld-component-checkbox-radius
--ld-component-checkbox-size-sm
--ld-component-checkbox-size-md

--ld-component-switch-track-background
--ld-component-switch-track-background-checked
--ld-component-switch-track-border
--ld-component-switch-thumb-background
--ld-component-switch-thumb-background-checked
--ld-component-switch-width-sm
--ld-component-switch-width-md
--ld-component-switch-height-sm
--ld-component-switch-height-md

--ld-component-select-trigger-background
--ld-component-select-trigger-foreground
--ld-component-select-trigger-placeholder
--ld-component-select-trigger-border
--ld-component-select-trigger-border-focus
--ld-component-select-trigger-border-invalid
--ld-component-select-content-background
--ld-component-select-content-foreground
--ld-component-select-content-border
--ld-component-select-content-shadow
--ld-component-select-item-background-highlighted
--ld-component-select-item-foreground-selected
--ld-component-select-indicator
--ld-component-select-radius
```

Size, padding, and focus behavior reuse the shared `control` token namespace where a dedicated component token would only duplicate meaning. Component CSS must not consume raw hex colors, primitive color tokens, or Material `--md-*` variables.

## Visual States

All controls support:

- default
- hover
- focus-visible
- active or pressed
- checked or selected where applicable
- invalid
- disabled

State styling follows this order:

1. Border and surface state establish hierarchy.
2. Focus ring communicates keyboard location.
3. Brand color marks committed selection.
4. Error color replaces selection emphasis only when validation requires it.

Disabled controls reduce contrast without disappearing. Pointer events and keyboard interaction are disabled by the underlying native or Radix behavior.

## Motion

Form controls use short, purposeful transitions:

- Checkbox indicator enters with a restrained scale-and-fade response.
- Switch thumb translates with the standard enter easing and no bounce.
- Select content uses `scale` or `slide` recipes aligned to its trigger origin.
- Reduced motion removes spatial transforms and retains a short opacity transition.

Motion is resolved from LazyDesign duration and easing tokens. No component prop accepts a GSAP timeline, Radix animation object, or adapter-specific configuration.

## Accessibility Contract

- `FieldLabel` associates with the active control ID.
- Description and error IDs are merged into `aria-describedby` without discarding explicit consumer IDs.
- Invalid controls set `aria-invalid="true"`.
- Required controls expose `aria-required="true"`.
- Checkbox supports Space to toggle and preserves the indeterminate announcement.
- Switch supports Space and Enter according to Radix behavior.
- Select supports Arrow keys, Home, End, Enter, Space, Escape, typeahead, focus restoration, and disabled items.
- Every state has a visible focus indicator with sufficient contrast in light and dark themes.
- Reduced-motion preference is respected through LazyDesign motion tokens and media queries.

## Automated Testing Foundation

The release adds Vitest, jsdom, React Testing Library, `user-event`, and jest-dom matchers.

Required behavior tests:

- Field connects label, description, error, invalid, required, and disabled state.
- Checkbox toggles from keyboard, supports indeterminate state, and respects disabled state.
- Switch toggles through pointer and keyboard interaction and reports checked state.
- Select opens from keyboard, moves through options, selects a value, closes on Escape, and restores focus.
- Theme resolution emits every new component token in light, dark, standard, and compact combinations.
- Public exports expose every documented component and type.

Tests assert user-visible behavior and ARIA state rather than Radix implementation details.

## LazyTeam.wtf Integration

The existing product console gains a compact configuration surface inside the Motion Grid workspace:

- Runtime profile Select
- Reduced motion Switch
- Telemetry Checkbox
- Visible invalid Field example

The panel must remain a product interface, not a component gallery. Settings update real local page state so the controls demonstrate practical composition. Desktop and mobile layouts must remain free of horizontal overflow.

## Release and Compatibility

- Package version becomes `0.6.0` after implementation.
- Existing exports and component behavior remain backward compatible.
- New Radix packages are production dependencies; test libraries are development dependencies.
- README, component policy, and the public specification list the new subsystem and example API.
- Build, unit tests, browser interaction checks, console inspection, and responsive checks are required before the release commit is pushed.

## Out of Scope

- Dialog, Drawer, Toast, Popover, and Menu
- Table, DataGrid, and Pagination
- Form submission, schema validation, and server actions
- A form-builder abstraction or configuration-driven field renderer
- Exposing motion adapters through component props

These remain later phases built on the form foundation established here.
