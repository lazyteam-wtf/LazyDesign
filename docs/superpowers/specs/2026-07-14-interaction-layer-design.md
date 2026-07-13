# LazyDesign v0.7 Interaction Layer Design

**Status:** Approved direction for planning  
**Release target:** `v0.7.0`  
**Scope:** Overlay Foundation, Motion Physics, component tokens, motion recipes, automated tests, and LazyTeam.wtf workflow integration

## Purpose

LazyDesign v0.7 establishes the interaction layer that sits above primitives, forms, and product components. The release combines two approved directions:

1. Overlay Foundation: `Dialog`, `Drawer`, `Popover`, and `Toast`.
2. Motion Physics: named motion recipes with clearer physical mass, spring-like response, reduced-motion behavior, and adapter-safe execution.

The goal is to make LazyDesign feel like a serious SaaS framework instead of a collection of isolated controls. Users must be able to confirm operations, edit workflow settings, inspect contextual information, and receive non-blocking feedback while the interface remains flat-first, dense, accessible, and token-driven.

## Product Principles

- Overlays are work surfaces, not decorative layers.
- Hierarchy comes from surface levels, one-pixel borders, backdrop tone, and focus management.
- Motion communicates spatial relationship: where a surface came from, what state changed, and where focus returns.
- Physical quality is restrained. Components may feel crisp and weighted, but must not bounce, wobble, glow, or perform decorative tricks.
- Public APIs expose semantic motion names and component anatomy. They never expose GSAP timelines, Radix internals, or adapter-specific objects.
- All overlay components must work in light mode, dark mode, compact density, reduced motion, and dynamic Monet themes.

## Approaches Considered

### Approach A: Overlay Foundation Only

This would ship `Dialog`, `Drawer`, `Popover`, and `Toast` quickly using existing motion tokens.

Trade-off: it validates Radix behavior and product workflows, but the overlays may feel mechanically similar to v0.6 controls instead of advancing LazyDesign's physical identity.

### Approach B: Motion Physics Only

This would upgrade `LazyMotion` recipes and component motion tokens before adding more components.

Trade-off: it improves the core feel, but the user-facing framework surface grows slowly and LazyTeam.wtf would still lack critical SaaS workflows.

### Approach C: Interaction Layer

This combines overlays and motion physics in one release, with careful sequencing:

1. Define shared motion physics recipes and overlay tokens.
2. Implement overlay primitives on top of Radix behavior.
3. Apply motion recipes through LazyDesign props.
4. Integrate real workflows into LazyTeam.wtf.

Decision: v0.7 uses Approach C. It is larger than a single component release, but it is coherent: overlays are the first place where spatial motion, focus management, and product-level interaction all meet.

## Architecture

```txt
LazyProvider theme input
  -> resolveTheme()
  -> semantic color, density, radius, motion preference
  -> overlay component tokens
  -> motion physics recipes
  -> Dialog / Drawer / Popover / Toast CSS

Radix behavior primitives
  -> focus scope, portal, dismissal, keyboard behavior
  -> LazyDesign React wrappers
  -> public component anatomy
  -> app workflows

LazyMotion runtime
  -> named recipes
  -> Web Animations default adapter
  -> GSAP adapter for page-level choreography
  -> reduced-motion-safe output
```

The overlay system has three layers:

1. Shared overlay contract: tokens, z-index policy, backdrop behavior, content surface, close affordance, and motion recipes.
2. Component anatomy: Dialog, Drawer, Popover, Toast, and their named subcomponents.
3. Product patterns: confirmation dialog, workflow drawer, contextual popover, and status toast in LazyTeam.wtf.

## Component Scope

### Dialog

Dialog handles modal confirmation and focused editing tasks.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button intent="primary">Run sequence</Button>
  </DialogTrigger>
  <DialogContent motion="scale">
    <DialogHeader>
      <DialogTitle>Run deployment sequence</DialogTitle>
      <DialogDescription>
        Confirm runtime, telemetry, and release gate settings before execution.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button intent="primary">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Public anatomy:

- `Dialog`
- `DialogTrigger`
- `DialogPortal`
- `DialogOverlay`
- `DialogContent`
- `DialogHeader`
- `DialogTitle`
- `DialogDescription`
- `DialogFooter`
- `DialogClose`

`DialogContent` adds:

- `motion?: "none" | "fade" | "scale" | "shift"`
- `size?: "sm" | "md" | "lg"`

Dialog must trap focus, close on Escape by default, restore focus to the trigger, and connect title and description through Radix semantics.

### Drawer

Drawer handles side-panel workflows that should preserve page context.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Calibrate</Button>
  </DrawerTrigger>
  <DrawerContent side="right" motion="slide">
    <DrawerHeader>
      <DrawerTitle>Calibrate runtime</DrawerTitle>
      <DrawerDescription>Adjust the current motion grid profile.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>
```

Public anatomy:

- `Drawer`
- `DrawerTrigger`
- `DrawerPortal`
- `DrawerOverlay`
- `DrawerContent`
- `DrawerHeader`
- `DrawerTitle`
- `DrawerDescription`
- `DrawerFooter`
- `DrawerClose`

`DrawerContent` adds:

- `side?: "left" | "right" | "top" | "bottom"`
- `motion?: "none" | "slide"`
- `size?: "sm" | "md" | "lg"`

Drawer uses Dialog behavior under the hood where appropriate, but LazyDesign owns a separate public API because side, sizing, and motion semantics differ from Dialog.

### Popover

Popover handles small contextual surfaces. It is non-modal by default.

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost">Profile summary</Button>
  </PopoverTrigger>
  <PopoverContent motion="scale" sideOffset={8}>
    <PopoverTitle>Runtime profile</PopoverTitle>
    <PopoverDescription>Linear density with reduced motion disabled.</PopoverDescription>
  </PopoverContent>
</Popover>
```

Public anatomy:

- `Popover`
- `PopoverTrigger`
- `PopoverPortal`
- `PopoverContent`
- `PopoverArrow`
- `PopoverTitle`
- `PopoverDescription`
- `PopoverClose`

`PopoverContent` adds:

- `motion?: "none" | "fade" | "scale" | "shift"`
- `size?: "sm" | "md"`
- `sideOffset?: number`, defaulting to `8`

Popover must support outside click dismissal, Escape close, focus return, collision-aware positioning, and optional arrow rendering.

### Toast

Toast handles non-blocking feedback. It confirms state changes without stealing focus.

```tsx
<ToastProvider>
  <ToastViewport />
  <Toast open={open} onOpenChange={setOpen} intent="success">
    <ToastTitle>Sequence queued</ToastTitle>
    <ToastDescription>Runtime profile Linear is ready for deployment.</ToastDescription>
    <ToastClose />
  </Toast>
</ToastProvider>
```

Public anatomy:

- `ToastProvider`
- `ToastViewport`
- `Toast`
- `ToastTitle`
- `ToastDescription`
- `ToastAction`
- `ToastClose`

`Toast` adds:

- `intent?: "neutral" | "success" | "danger"`
- `motion?: "none" | "slide" | "fade"`

Toast must expose status text to assistive technology, support manual dismissal, support duration-based dismissal through Radix behavior, and avoid focus theft unless the user explicitly focuses an action.

## Motion Physics

v0.7 expands LazyMotion from basic named transitions into a small physical recipe system. The API remains recipe-based.

```ts
import { createMotionRecipe } from "lazydesign/motion";

const recipe = createMotionRecipe("dialog-scale", "system");
```

New recipe names:

- `overlay-fade`
- `dialog-scale`
- `dialog-shift`
- `drawer-slide`
- `popover-scale`
- `popover-shift`
- `toast-slide`
- `toast-fade`
- `press-crisp`
- `press-soft`
- `reveal-flow`

Recipes describe intent, not implementation technology.

```ts
type LazyMotionRecipe = {
  name: LazyMotionPreset;
  duration: string;
  easing: string;
  properties: readonly string[];
  from: Record<string, string | number>;
  to: Record<string, string | number>;
  mass?: "light" | "standard" | "heavy";
};
```

The optional `mass` field lets documentation and future adapters understand the feel of a recipe without exposing physical engine internals. v0.7 may map mass to duration, transform distance, and easing only; it does not need a full spring solver in the first implementation.

Reduced motion keeps opacity and state timing while removing spatial transforms.

## Component Tokens

v0.7 adds shared overlay tokens plus component-specific sizing tokens.

```txt
--ld-component-overlay-backdrop
--ld-component-overlay-background
--ld-component-overlay-foreground
--ld-component-overlay-border
--ld-component-overlay-radius
--ld-component-overlay-shadow
--ld-component-overlay-padding
--ld-component-overlay-header-gap
--ld-component-overlay-body-gap
--ld-component-overlay-footer-gap
--ld-component-overlay-z-index

--ld-component-dialog-width-sm
--ld-component-dialog-width-md
--ld-component-dialog-width-lg

--ld-component-drawer-width-sm
--ld-component-drawer-width-md
--ld-component-drawer-width-lg
--ld-component-drawer-height-sm
--ld-component-drawer-height-md
--ld-component-drawer-height-lg

--ld-component-popover-width-sm
--ld-component-popover-width-md
--ld-component-popover-arrow-size

--ld-component-toast-width
--ld-component-toast-background
--ld-component-toast-foreground
--ld-component-toast-border
--ld-component-toast-success-border
--ld-component-toast-danger-border
```

The overlay shadow token is intentionally minimal and must stay below the visual weight of traditional floating card shadows. It exists only to separate an overlay from the page when border and surface are not enough.

Overlay CSS must not use raw hex values, `--md-*` variables, arbitrary z-index values, decorative gradients, glow, or glass effects.

## Visual Language

Dialog and Drawer surfaces use `surface-container` or `surface-container-high` depending on mode and density. Popover and Toast may use the same surface ladder with a slightly stronger border because their content is smaller and more transient.

Backdrop behavior:

- Dark mode: subtle scrim that preserves page structure.
- Light mode: low-opacity zinc scrim, not a blur layer.
- Reduced motion: opacity-only entry and exit.

Close controls should use existing `Button` or `Icon` APIs when practical. Components may render a default close icon, but the public API must support `asChild` composition.

## Accessibility Contract

- Dialog and Drawer trap focus while open.
- Dialog and Drawer restore focus to the trigger when closed.
- Dialog and Drawer close on Escape by default.
- Dialog, Drawer, and Popover connect title and description IDs through Radix semantics.
- Popover closes on outside click and Escape.
- Toast announces title and description through Radix live-region behavior.
- Toast does not steal focus when it appears.
- All overlays support controlled and uncontrolled open state.
- All overlays remain reachable and dismissible through keyboard interaction.
- Every interactive close/action control has a visible focus indicator.
- Motion preference is respected through `LazyProvider theme.motion` and media queries.

## LazyTeam.wtf Integration

The product example gains real workflows instead of a component gallery:

- `Run sequence` opens a Dialog that summarizes runtime profile, telemetry, release gate, and motion preference.
- `Calibrate` opens a right-side Drawer with compact controls for motion profile and release settings.
- Runtime profile gets a Popover summary near the Select surface.
- Confirming the Dialog or Drawer creates a Toast status message.
- Toast appears in a dedicated viewport and can be dismissed.
- All workflows keep the current industrial cockpit layout dense, flat, and responsive.

The example must prove the components in context:

- Focus trap and focus restore are visible through keyboard use.
- Drawer preserves page context on desktop and fits mobile width.
- Popover anchors correctly to its trigger and does not cause horizontal overflow.
- Toast is readable in light and dark themes and does not cover critical controls.

## Automated Testing

Required unit tests:

- Theme resolution emits overlay, dialog, drawer, popover, and toast token namespaces in light, dark, standard, and compact modes.
- Motion recipe creation supports every new recipe in system and reduced modes.
- Dialog opens from trigger, sets title/description relationships, traps focus, closes on Escape, and restores focus.
- Drawer supports `side`, closes on Escape, and restores focus.
- Popover opens from trigger, closes on outside interaction or Escape, and restores focus.
- Toast renders title and description, can dismiss, and exposes an accessible live region through Radix behavior.

Required integration tests:

- LazyTeam.wtf opens the Run sequence Dialog from Motion Grid.
- LazyTeam.wtf opens the Calibrate Drawer.
- Runtime profile Popover renders contextual text.
- Confirming a workflow displays a Toast.
- Existing v0.6 form controls still pass their integration test.

Tests should assert behavior, ARIA state, focus location, and visible text. They must not test Radix implementation details.

## Dependencies

Expected new production dependencies:

- `@radix-ui/react-dialog`
- `@radix-ui/react-popover`
- `@radix-ui/react-toast`

Drawer may be implemented on top of Radix Dialog in v0.7 to avoid adding a separate dependency if its accessibility contract can be satisfied. If a future Radix drawer primitive or another accessibility primitive becomes preferable, it can be introduced behind the LazyDesign API without changing consumers.

No new animation dependency is required. LazyMotion recipes should continue to run through the current Web Animations and GSAP adapter structure.

## Release and Documentation

- Package version becomes `0.7.0` after implementation.
- README documents Overlay Foundation and Motion Physics examples.
- `design/component-policy.md` gains overlay and motion physics guidance.
- `public/docs/lazydesign-spec.md` updates runtime status, token groups, motion recipes, and component API.
- LazyTeam.wtf demonstrates the workflows without becoming a landing page or component showcase.
- Every modification is committed and pushed after verification.

## Out of Scope

- Table, DataGrid, Pagination, and navigation components.
- Command menu and menu bar.
- Full spring solver or physics engine.
- Exposing GSAP timelines, ScrollTrigger instances, or Web Animations objects through component props.
- Glassmorphism, decorative blur, glow, and heavy elevation.
- Schema-driven workflow builders.

These remain later phases built on the v0.7 interaction layer.
