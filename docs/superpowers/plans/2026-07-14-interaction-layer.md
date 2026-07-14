# LazyDesign v0.7 Interaction Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the v0.7 Interaction Layer: overlay components, motion physics recipes, token contracts, and real LazyTeam.wtf workflows.

**Architecture:** Radix owns overlay behavior for focus, portals, dismissal, live regions, and keyboard semantics. LazyDesign owns public component anatomy, component tokens, motion recipe names, density, reduced-motion behavior, and the industrial visual language. Drawer is implemented on top of Radix Dialog while preserving a separate LazyDesign public API.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, jsdom, React Testing Library, Radix Dialog, Radix Popover, Radix Toast, CSS variables, LazyMotion Web Animations/GSAP adapters

---

## File Map

- Modify `package.json` and `pnpm-lock.yaml` for Radix overlay dependencies and version.
- Modify `src/core/motion.ts` for v0.7 motion recipes and optional `mass`.
- Modify `src/core/components.ts` for overlay, dialog, drawer, popover, and toast component tokens.
- Modify `src/core/__tests__/components.test.ts` for token coverage.
- Create `src/core/__tests__/motion.test.ts` for motion physics coverage.
- Create `src/components/Dialog.tsx` and `src/components/__tests__/Dialog.test.tsx`.
- Create `src/components/Drawer.tsx` and `src/components/__tests__/Drawer.test.tsx`.
- Create `src/components/Popover.tsx` and `src/components/__tests__/Popover.test.tsx`.
- Create `src/components/Toast.tsx` and `src/components/__tests__/Toast.test.tsx`.
- Modify `src/components/styles.css` for overlay visuals and animations.
- Modify `src/components/index.ts` and `src/index.ts` if export surfaces require it.
- Modify `src/App.tsx` and `src/styles.css` for LazyTeam.wtf overlay workflows.
- Modify `src/App.test.tsx` for v0.7 integration behavior.
- Modify `README.md`, `design/component-policy.md`, and `public/docs/lazydesign-spec.md` for v0.7 docs.

## Task 1: Establish overlay dependencies and motion physics tests

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `src/core/motion.ts`
- Create: `src/core/__tests__/motion.test.ts`

- [ ] **Step 1: Install Radix overlay dependencies**

Run:

```powershell
pnpm add @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-toast
```

Expected: `package.json` and `pnpm-lock.yaml` include the three packages.

- [ ] **Step 2: Write the failing motion physics test**

Create `src/core/__tests__/motion.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { createMotionRecipe } from "../motion";

const recipes = [
  "overlay-fade",
  "dialog-scale",
  "dialog-shift",
  "drawer-slide",
  "popover-scale",
  "popover-shift",
  "toast-slide",
  "toast-fade",
  "press-crisp",
  "press-soft",
  "reveal-flow",
] as const;

describe("motion physics recipes", () => {
  it("creates every v0.7 recipe with mass metadata", () => {
    for (const name of recipes) {
      const recipe = createMotionRecipe(name, "system");

      expect(recipe.name).toBe(name);
      expect(recipe.duration).toMatch(/ms$/);
      expect(recipe.properties.length).toBeGreaterThan(0);
      expect(recipe.mass).toMatch(/light|standard|heavy/);
    }
  });

  it("removes spatial transforms in reduced motion mode", () => {
    const recipe = createMotionRecipe("drawer-slide", "reduced");

    expect(recipe.properties).toEqual(["opacity"]);
    expect(recipe.from).toEqual({ opacity: 0 });
    expect(recipe.to).toEqual({ opacity: 1 });
  });
});
```

- [ ] **Step 3: Run the test and verify RED**

Run:

```powershell
pnpm test -- src/core/__tests__/motion.test.ts
```

Expected: FAIL because the new recipe names are not assignable to `LazyMotionPreset` and are missing from `lazyMotionPresets`.

- [ ] **Step 4: Expand motion recipe types and values**

Modify `src/core/motion.ts` so these exports include the v0.7 recipes:

```ts
export type LazyMotionPreset =
  | "fade"
  | "slide"
  | "scale"
  | "reveal"
  | "scroll"
  | "overlay-fade"
  | "dialog-scale"
  | "dialog-shift"
  | "drawer-slide"
  | "popover-scale"
  | "popover-shift"
  | "toast-slide"
  | "toast-fade"
  | "press-crisp"
  | "press-soft"
  | "reveal-flow";

export type LazyMotionMass = "light" | "standard" | "heavy";

export type LazyMotionRecipe = {
  name: LazyMotionPreset;
  duration: string;
  easing: string;
  properties: readonly string[];
  from: Record<string, string | number>;
  to: Record<string, string | number>;
  mass: LazyMotionMass;
};
```

Add these v0.7 entries to `lazyMotionPresets`:

```ts
"overlay-fade": {
  duration: "fast",
  easing: "standard",
  mass: "light",
  properties: ["opacity"],
  from: { opacity: 0 },
  to: { opacity: 1 },
},
"dialog-scale": {
  duration: "normal",
  easing: "enter",
  mass: "heavy",
  properties: ["opacity", "transform"],
  from: { opacity: 0, scale: 0.96, y: 6 },
  to: { opacity: 1, scale: 1, y: 0 },
},
"dialog-shift": {
  duration: "normal",
  easing: "enter",
  mass: "heavy",
  properties: ["opacity", "transform"],
  from: { opacity: 0, y: 12 },
  to: { opacity: 1, y: 0 },
},
"drawer-slide": {
  duration: "emphasized",
  easing: "enter",
  mass: "heavy",
  properties: ["opacity", "transform"],
  from: { opacity: 0, x: 28 },
  to: { opacity: 1, x: 0 },
},
"popover-scale": {
  duration: "fast",
  easing: "enter",
  mass: "light",
  properties: ["opacity", "transform"],
  from: { opacity: 0, scale: 0.98, y: 2 },
  to: { opacity: 1, scale: 1, y: 0 },
},
"popover-shift": {
  duration: "fast",
  easing: "enter",
  mass: "light",
  properties: ["opacity", "transform"],
  from: { opacity: 0, y: 6 },
  to: { opacity: 1, y: 0 },
},
"toast-slide": {
  duration: "normal",
  easing: "enter",
  mass: "standard",
  properties: ["opacity", "transform"],
  from: { opacity: 0, x: 16 },
  to: { opacity: 1, x: 0 },
},
"toast-fade": {
  duration: "fast",
  easing: "standard",
  mass: "standard",
  properties: ["opacity"],
  from: { opacity: 0 },
  to: { opacity: 1 },
},
"press-crisp": {
  duration: "fast",
  easing: "standard",
  mass: "light",
  properties: ["transform"],
  from: { scale: 1 },
  to: { scale: 0.985 },
},
"press-soft": {
  duration: "normal",
  easing: "emphasized",
  mass: "standard",
  properties: ["transform"],
  from: { scale: 1 },
  to: { scale: 0.975 },
},
"reveal-flow": {
  duration: "emphasized",
  easing: "emphasized",
  mass: "standard",
  properties: ["opacity", "transform"],
  from: { opacity: 0, y: 18 },
  to: { opacity: 1, y: 0 },
},
```

Keep existing recipe names backward compatible by adding `mass: "standard"` to old entries.

Update reduced-motion output in `createMotionRecipe()`:

```ts
const reducedFrom = { opacity: preset.from.opacity ?? 0 };
const reducedTo = { opacity: preset.to.opacity ?? 1 };

return {
  name,
  duration: scaleDuration(lazyMotionValues.duration[preset.duration], factor),
  easing: lazyMotionValues.easing[preset.easing],
  properties: preference === "reduced" ? ["opacity"] : preset.properties,
  from: preference === "reduced" ? reducedFrom : preset.from,
  to: preference === "reduced" ? reducedTo : preset.to,
  mass: preset.mass,
};
```

- [ ] **Step 5: Verify motion tests and build**

Run:

```powershell
pnpm test -- src/core/__tests__/motion.test.ts
pnpm build
```

Expected: motion tests PASS and build exits with code 0.

- [ ] **Step 6: Commit motion physics**

```powershell
git add package.json pnpm-lock.yaml src/core/motion.ts src/core/__tests__/motion.test.ts
git commit -m "Add v0.7 motion physics recipes"
git push origin main
```

## Task 2: Add overlay component-token contract

**Files:**
- Modify: `src/core/components.ts`
- Modify: `src/core/__tests__/components.test.ts`

- [ ] **Step 1: Extend the token test first**

Modify `src/core/__tests__/components.test.ts` so the existing component-token test also asserts the v0.7 namespaces:

```ts
expect(theme.vars["--ld-component-overlay-backdrop"]).toBeTruthy();
expect(theme.vars["--ld-component-overlay-background"]).toBeTruthy();
expect(theme.vars["--ld-component-overlay-z-index"]).toBeTruthy();
expect(theme.vars["--ld-component-dialog-width-md"]).toBeTruthy();
expect(theme.vars["--ld-component-drawer-width-md"]).toBeTruthy();
expect(theme.vars["--ld-component-popover-width-md"]).toBeTruthy();
expect(theme.vars["--ld-component-toast-width"]).toBeTruthy();
expect(theme.vars["--ld-component-toast-success-border"]).toBeTruthy();
```

- [ ] **Step 2: Run the token test and verify RED**

Run:

```powershell
pnpm test -- src/core/__tests__/components.test.ts
```

Expected: FAIL on the first missing overlay token.

- [ ] **Step 3: Add component token variables and theme types**

Extend `lazyComponentTokenVars` in `src/core/components.ts` with:

```ts
overlay: {
  backdrop: "--ld-component-overlay-backdrop",
  background: "--ld-component-overlay-background",
  foreground: "--ld-component-overlay-foreground",
  border: "--ld-component-overlay-border",
  radius: "--ld-component-overlay-radius",
  shadow: "--ld-component-overlay-shadow",
  padding: "--ld-component-overlay-padding",
  headerGap: "--ld-component-overlay-header-gap",
  bodyGap: "--ld-component-overlay-body-gap",
  footerGap: "--ld-component-overlay-footer-gap",
  zIndex: "--ld-component-overlay-z-index",
},
dialog: {
  widthSm: "--ld-component-dialog-width-sm",
  widthMd: "--ld-component-dialog-width-md",
  widthLg: "--ld-component-dialog-width-lg",
},
drawer: {
  widthSm: "--ld-component-drawer-width-sm",
  widthMd: "--ld-component-drawer-width-md",
  widthLg: "--ld-component-drawer-width-lg",
  heightSm: "--ld-component-drawer-height-sm",
  heightMd: "--ld-component-drawer-height-md",
  heightLg: "--ld-component-drawer-height-lg",
},
popover: {
  widthSm: "--ld-component-popover-width-sm",
  widthMd: "--ld-component-popover-width-md",
  arrowSize: "--ld-component-popover-arrow-size",
},
toast: {
  width: "--ld-component-toast-width",
  background: "--ld-component-toast-background",
  foreground: "--ld-component-toast-foreground",
  border: "--ld-component-toast-border",
  successBorder: "--ld-component-toast-success-border",
  dangerBorder: "--ld-component-toast-danger-border",
},
```

Extend `LazyComponentTheme` with matching typed groups:

```ts
overlay: Record<keyof typeof lazyComponentTokenVars.overlay, string>;
dialog: Record<keyof typeof lazyComponentTokenVars.dialog, string>;
drawer: Record<keyof typeof lazyComponentTokenVars.drawer, string>;
popover: Record<keyof typeof lazyComponentTokenVars.popover, string>;
toast: Record<keyof typeof lazyComponentTokenVars.toast, string>;
```

- [ ] **Step 4: Emit the overlay token values**

In `createComponentVars()`, add this values block and adjust only the color role property names if TypeScript reports an existing local name mismatch:

```ts
const overlayShadow = mode === "dark"
  ? "0 16px 48px rgba(0, 0, 0, 0.28)"
  : "0 16px 48px rgba(15, 23, 42, 0.12)";

Object.assign(vars, {
  [lazyComponentTokenVars.overlay.backdrop]: mode === "dark"
    ? "rgba(0, 0, 0, 0.42)"
    : "rgba(15, 23, 42, 0.18)",
  [lazyComponentTokenVars.overlay.background]: color.surfaceContainer,
  [lazyComponentTokenVars.overlay.foreground]: color.onSurface,
  [lazyComponentTokenVars.overlay.border]: color.outlineVariant,
  [lazyComponentTokenVars.overlay.radius]: style === "expressive" ? "16px" : "10px",
  [lazyComponentTokenVars.overlay.shadow]: overlayShadow,
  [lazyComponentTokenVars.overlay.padding]: density === "compact" ? "16px" : "20px",
  [lazyComponentTokenVars.overlay.headerGap]: density === "compact" ? "6px" : "8px",
  [lazyComponentTokenVars.overlay.bodyGap]: density === "compact" ? "12px" : "16px",
  [lazyComponentTokenVars.overlay.footerGap]: density === "compact" ? "8px" : "12px",
  [lazyComponentTokenVars.overlay.zIndex]: "60",
  [lazyComponentTokenVars.dialog.widthSm]: "360px",
  [lazyComponentTokenVars.dialog.widthMd]: "520px",
  [lazyComponentTokenVars.dialog.widthLg]: "720px",
  [lazyComponentTokenVars.drawer.widthSm]: "320px",
  [lazyComponentTokenVars.drawer.widthMd]: "420px",
  [lazyComponentTokenVars.drawer.widthLg]: "560px",
  [lazyComponentTokenVars.drawer.heightSm]: "320px",
  [lazyComponentTokenVars.drawer.heightMd]: "420px",
  [lazyComponentTokenVars.drawer.heightLg]: "560px",
  [lazyComponentTokenVars.popover.widthSm]: "220px",
  [lazyComponentTokenVars.popover.widthMd]: "300px",
  [lazyComponentTokenVars.popover.arrowSize]: "10px",
  [lazyComponentTokenVars.toast.width]: "360px",
  [lazyComponentTokenVars.toast.background]: color.surfaceContainer,
  [lazyComponentTokenVars.toast.foreground]: color.onSurface,
  [lazyComponentTokenVars.toast.border]: color.outlineVariant,
  [lazyComponentTokenVars.toast.successBorder]: color.primary,
  [lazyComponentTokenVars.toast.dangerBorder]: color.error,
});
```

Use the actual color role property names already present in `src/core/components.ts`.

- [ ] **Step 5: Verify token tests and build**

Run:

```powershell
pnpm test -- src/core/__tests__/components.test.ts
pnpm build
```

Expected: token tests PASS and build exits with code 0.

- [ ] **Step 6: Commit overlay token contract**

```powershell
git add src/core/components.ts src/core/__tests__/components.test.ts
git commit -m "Add overlay component token contract"
git push origin main
```

## Task 3: Implement Dialog and Drawer

**Files:**
- Create: `src/components/Dialog.tsx`
- Create: `src/components/Drawer.tsx`
- Create: `src/components/__tests__/Dialog.test.tsx`
- Create: `src/components/__tests__/Drawer.test.tsx`
- Modify: `src/components/styles.css`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Write the failing Dialog tests**

Create `src/components/__tests__/Dialog.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";

describe("Dialog", () => {
  it("opens, labels content, closes on Escape, and restores focus", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Run sequence</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run deployment sequence</DialogTitle>
            <DialogDescription>Confirm runtime changes.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    const trigger = screen.getByRole("button", { name: "Run sequence" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Run deployment sequence" });
    expect(dialog).toHaveAccessibleDescription("Confirm runtime changes.");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
```

- [ ] **Step 2: Write the failing Drawer tests**

Create `src/components/__tests__/Drawer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../Drawer";

describe("Drawer", () => {
  it("opens from the requested side and restores focus after close", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Calibrate</DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Calibrate runtime</DrawerTitle>
            <DrawerDescription>Adjust motion profile.</DrawerDescription>
          </DrawerHeader>
          <DrawerClose>Close</DrawerClose>
        </DrawerContent>
      </Drawer>,
    );

    const trigger = screen.getByRole("button", { name: "Calibrate" });
    await user.click(trigger);

    const drawer = screen.getByRole("dialog", { name: "Calibrate runtime" });
    expect(drawer).toHaveAttribute("data-side", "right");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
```

- [ ] **Step 3: Run tests and verify RED**

Run:

```powershell
pnpm test -- src/components/__tests__/Dialog.test.tsx src/components/__tests__/Drawer.test.tsx
```

Expected: FAIL because `Dialog` and `Drawer` modules do not exist.

- [ ] **Step 4: Implement Dialog wrappers**

Create `src/components/Dialog.tsx`:

```tsx
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";
import { Icon } from "./Icon";

export type LazyDialogMotion = "none" | "fade" | "scale" | "shift";
export type LazyDialogSize = "sm" | "md" | "lg";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogPortal = RadixDialog.Portal;
export const DialogClose = RadixDialog.Close;

export type DialogOverlayProps = ComponentPropsWithoutRef<typeof RadixDialog.Overlay>;
export type DialogContentProps = ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
  motion?: LazyDialogMotion;
  size?: LazyDialogSize;
  showClose?: boolean;
};

export const DialogOverlay = forwardRef<ElementRef<typeof RadixDialog.Overlay>, DialogOverlayProps>(
  function DialogOverlay({ className, ...props }, ref) {
    return <RadixDialog.Overlay {...props} className={cx("ld-overlay", className)} ref={ref} />;
  },
);

export const DialogContent = forwardRef<ElementRef<typeof RadixDialog.Content>, DialogContentProps>(
  function DialogContent({ children, className, motion = "scale", size = "md", showClose = true, ...props }, ref) {
    return (
      <RadixDialog.Portal>
        <DialogOverlay />
        <RadixDialog.Content
          {...props}
          className={cx("ld-dialog", className)}
          data-motion={motion}
          data-size={size}
          ref={ref}
        >
          {children}
          {showClose ? (
            <RadixDialog.Close className="ld-overlay__close" aria-label="Close">
              <Icon glyph={X} size="sm" />
            </RadixDialog.Close>
          ) : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  },
);
```

Add header/footer/title/description wrappers using `RadixDialog.Title` and `RadixDialog.Description` with classes:

```tsx
export const DialogHeader = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={cx("ld-overlay__header", className)} />
);
export const DialogFooter = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={cx("ld-overlay__footer", className)} />
);
export const DialogTitle = forwardRef<ElementRef<typeof RadixDialog.Title>, ComponentPropsWithoutRef<typeof RadixDialog.Title>>(
  function DialogTitle({ className, ...props }, ref) {
    return <RadixDialog.Title {...props} className={cx("ld-overlay__title", className)} ref={ref} />;
  },
);
export const DialogDescription = forwardRef<
  ElementRef<typeof RadixDialog.Description>,
  ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return <RadixDialog.Description {...props} className={cx("ld-overlay__description", className)} ref={ref} />;
});
```

- [ ] **Step 5: Implement Drawer wrappers**

Create `src/components/Drawer.tsx` by composing Radix Dialog:

```tsx
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";
import { Icon } from "./Icon";
import { DialogOverlay } from "./Dialog";

export type LazyDrawerSide = "left" | "right" | "top" | "bottom";
export type LazyDrawerMotion = "none" | "slide";
export type LazyDrawerSize = "sm" | "md" | "lg";

export const Drawer = RadixDialog.Root;
export const DrawerTrigger = RadixDialog.Trigger;
export const DrawerPortal = RadixDialog.Portal;
export const DrawerClose = RadixDialog.Close;

export type DrawerContentProps = ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
  motion?: LazyDrawerMotion;
  side?: LazyDrawerSide;
  size?: LazyDrawerSize;
  showClose?: boolean;
};

export const DrawerContent = forwardRef<ElementRef<typeof RadixDialog.Content>, DrawerContentProps>(
  function DrawerContent({ children, className, motion = "slide", side = "right", size = "md", showClose = true, ...props }, ref) {
    return (
      <RadixDialog.Portal>
        <DialogOverlay />
        <RadixDialog.Content
          {...props}
          className={cx("ld-drawer", className)}
          data-motion={motion}
          data-side={side}
          data-size={size}
          ref={ref}
        >
          {children}
          {showClose ? (
            <RadixDialog.Close className="ld-overlay__close" aria-label="Close">
              <Icon glyph={X} size="sm" />
            </RadixDialog.Close>
          ) : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  },
);
```

Add `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, and `DrawerDescription` with the same wrapper pattern as Dialog, replacing the Radix namespace:

```tsx
export const DrawerHeader = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={cx("ld-overlay__header", className)} />
);
export const DrawerFooter = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={cx("ld-overlay__footer", className)} />
);
export const DrawerTitle = forwardRef<ElementRef<typeof RadixDialog.Title>, ComponentPropsWithoutRef<typeof RadixDialog.Title>>(
  function DrawerTitle({ className, ...props }, ref) {
    return <RadixDialog.Title {...props} className={cx("ld-overlay__title", className)} ref={ref} />;
  },
);
export const DrawerDescription = forwardRef<
  ElementRef<typeof RadixDialog.Description>,
  ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function DrawerDescription({ className, ...props }, ref) {
  return <RadixDialog.Description {...props} className={cx("ld-overlay__description", className)} ref={ref} />;
});
```

- [ ] **Step 6: Add Dialog and Drawer CSS and exports**

Modify `src/components/index.ts` to export every documented Dialog and Drawer component/type.

Add CSS to `src/components/styles.css`:

```css
.ld-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--ld-component-overlay-z-index);
  background: var(--ld-component-overlay-backdrop);
}

.ld-dialog,
.ld-drawer {
  position: fixed;
  z-index: calc(var(--ld-component-overlay-z-index) + 1);
  display: grid;
  gap: var(--ld-component-overlay-body-gap);
  border: 1px solid var(--ld-component-overlay-border);
  border-radius: var(--ld-component-overlay-radius);
  background: var(--ld-component-overlay-background);
  color: var(--ld-component-overlay-foreground);
  box-shadow: var(--ld-component-overlay-shadow);
  padding: var(--ld-component-overlay-padding);
}

.ld-dialog {
  top: 50%;
  left: 50%;
  width: min(calc(100vw - var(--ld-space-8)), var(--ld-dialog-width, var(--ld-component-dialog-width-md)));
  transform: translate(-50%, -50%);
}

.ld-dialog[data-size="sm"] { --ld-dialog-width: var(--ld-component-dialog-width-sm); }
.ld-dialog[data-size="lg"] { --ld-dialog-width: var(--ld-component-dialog-width-lg); }

.ld-drawer[data-side="right"] {
  top: 0;
  right: 0;
  width: min(100vw, var(--ld-drawer-width, var(--ld-component-drawer-width-md)));
  height: 100vh;
  border-radius: 0;
  border-block: 0;
  border-inline-end: 0;
}
```

Add the remaining side positioning and shared overlay anatomy styles:

```css
.ld-drawer[data-side="left"] {
  top: 0;
  left: 0;
  width: min(100vw, var(--ld-drawer-width, var(--ld-component-drawer-width-md)));
  height: 100vh;
  border-radius: 0;
  border-block: 0;
  border-inline-start: 0;
}

.ld-drawer[data-side="top"],
.ld-drawer[data-side="bottom"] {
  left: 0;
  width: 100vw;
  height: min(100vh, var(--ld-drawer-height, var(--ld-component-drawer-height-md)));
  border-radius: 0;
  border-inline: 0;
}

.ld-drawer[data-side="top"] {
  top: 0;
  border-block-start: 0;
}

.ld-drawer[data-side="bottom"] {
  bottom: 0;
  border-block-end: 0;
}

.ld-drawer[data-size="sm"] {
  --ld-drawer-width: var(--ld-component-drawer-width-sm);
  --ld-drawer-height: var(--ld-component-drawer-height-sm);
}

.ld-drawer[data-size="lg"] {
  --ld-drawer-width: var(--ld-component-drawer-width-lg);
  --ld-drawer-height: var(--ld-component-drawer-height-lg);
}

.ld-overlay__header,
.ld-overlay__footer {
  display: grid;
  gap: var(--ld-component-overlay-header-gap);
}

.ld-overlay__footer {
  grid-auto-flow: column;
  justify-content: end;
  gap: var(--ld-component-overlay-footer-gap);
}

.ld-overlay__title {
  margin: 0;
  color: var(--ld-component-overlay-foreground);
  font: var(--ld-typography-heading-md);
}

.ld-overlay__description {
  margin: 0;
  color: var(--ld-component-text-muted);
  font: var(--ld-typography-body-sm);
}

.ld-overlay__close {
  position: absolute;
  top: var(--ld-space-3);
  right: var(--ld-space-3);
  display: inline-grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid transparent;
  border-radius: var(--ld-shape-corner-small);
  background: transparent;
  color: var(--ld-component-text-muted);
}
```

- [ ] **Step 7: Verify focused tests, full tests, and build**

Run:

```powershell
pnpm test -- src/components/__tests__/Dialog.test.tsx src/components/__tests__/Drawer.test.tsx
pnpm test
pnpm build
```

Expected: all tests PASS and build exits with code 0.

- [ ] **Step 8: Commit Dialog and Drawer**

```powershell
git add src/components/Dialog.tsx src/components/Drawer.tsx src/components/index.ts src/components/styles.css src/components/__tests__/Dialog.test.tsx src/components/__tests__/Drawer.test.tsx
git commit -m "Add Dialog and Drawer overlays"
git push origin main
```

## Task 4: Implement Popover

**Files:**
- Create: `src/components/Popover.tsx`
- Create: `src/components/__tests__/Popover.test.tsx`
- Modify: `src/components/styles.css`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Write the failing Popover test**

Create `src/components/__tests__/Popover.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "../Popover";

describe("Popover", () => {
  it("opens contextual content and closes on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Profile summary</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Runtime profile</PopoverTitle>
          <PopoverDescription>Linear density with reduced motion disabled.</PopoverDescription>
        </PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: "Profile summary" });
    await user.click(trigger);

    expect(screen.getByText("Runtime profile")).toBeInTheDocument();
    expect(screen.getByText("Linear density with reduced motion disabled.")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Runtime profile")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
pnpm test -- src/components/__tests__/Popover.test.tsx
```

Expected: FAIL because `Popover` is not exported.

- [ ] **Step 3: Implement Popover wrappers**

Create `src/components/Popover.tsx`:

```tsx
import * as RadixPopover from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";
import { Icon } from "./Icon";

export type LazyPopoverMotion = "none" | "fade" | "scale" | "shift";
export type LazyPopoverSize = "sm" | "md";

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverPortal = RadixPopover.Portal;
export const PopoverClose = RadixPopover.Close;

export type PopoverContentProps = ComponentPropsWithoutRef<typeof RadixPopover.Content> & {
  motion?: LazyPopoverMotion;
  size?: LazyPopoverSize;
  showClose?: boolean;
};

export const PopoverContent = forwardRef<ElementRef<typeof RadixPopover.Content>, PopoverContentProps>(
  function PopoverContent(
    { children, className, motion = "scale", sideOffset = 8, size = "md", showClose = false, ...props },
    ref,
  ) {
    return (
      <RadixPopover.Portal>
        <RadixPopover.Content
          {...props}
          className={cx("ld-popover", className)}
          data-motion={motion}
          data-size={size}
          ref={ref}
          sideOffset={sideOffset}
        >
          {children}
          {showClose ? (
            <RadixPopover.Close className="ld-overlay__close" aria-label="Close">
              <Icon glyph={X} size="sm" />
            </RadixPopover.Close>
          ) : null}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    );
  },
);

export const PopoverArrow = forwardRef<ElementRef<typeof RadixPopover.Arrow>, ComponentPropsWithoutRef<typeof RadixPopover.Arrow>>(
  function PopoverArrow({ className, ...props }, ref) {
    return <RadixPopover.Arrow {...props} className={cx("ld-popover__arrow", className)} ref={ref} />;
  },
);
```

Implement `PopoverTitle` and `PopoverDescription` as simple `div` wrappers with `ld-overlay__title` and `ld-overlay__description` classes. They do not need to wire ARIA manually in v0.7 because Radix Popover is non-modal and does not require a dialog role by default.

- [ ] **Step 4: Add Popover CSS and exports**

Add CSS:

```css
.ld-popover {
  z-index: calc(var(--ld-component-overlay-z-index) + 2);
  display: grid;
  gap: var(--ld-component-overlay-body-gap);
  width: var(--ld-popover-width, var(--ld-component-popover-width-md));
  max-width: calc(100vw - var(--ld-space-8));
  border: 1px solid var(--ld-component-overlay-border);
  border-radius: var(--ld-component-overlay-radius);
  background: var(--ld-component-overlay-background);
  color: var(--ld-component-overlay-foreground);
  box-shadow: var(--ld-component-overlay-shadow);
  padding: var(--ld-space-3);
  transform-origin: var(--radix-popover-content-transform-origin);
}

.ld-popover[data-size="sm"] {
  --ld-popover-width: var(--ld-component-popover-width-sm);
}

.ld-popover__arrow {
  width: var(--ld-component-popover-arrow-size);
  height: var(--ld-component-popover-arrow-size);
  fill: var(--ld-component-overlay-background);
}
```

Export Popover components and types from `src/components/index.ts`.

- [ ] **Step 5: Verify focused tests, full tests, and build**

Run:

```powershell
pnpm test -- src/components/__tests__/Popover.test.tsx
pnpm test
pnpm build
```

Expected: all tests PASS and build exits with code 0.

- [ ] **Step 6: Commit Popover**

```powershell
git add src/components/Popover.tsx src/components/index.ts src/components/styles.css src/components/__tests__/Popover.test.tsx
git commit -m "Add Popover overlay component"
git push origin main
```

## Task 5: Implement Toast

**Files:**
- Create: `src/components/Toast.tsx`
- Create: `src/components/__tests__/Toast.test.tsx`
- Modify: `src/components/styles.css`
- Modify: `src/components/index.ts`

- [ ] **Step 1: Write the failing Toast test**

Create `src/components/__tests__/Toast.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../Toast";

describe("Toast", () => {
  it("renders non-blocking status content and can dismiss", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Sequence queued</ToastTitle>
          <ToastDescription>Runtime profile Linear is ready.</ToastDescription>
          <ToastClose>Dismiss</ToastClose>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    expect(screen.getByText("Sequence queued")).toBeInTheDocument();
    expect(screen.getByText("Runtime profile Linear is ready.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByText("Sequence queued")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
pnpm test -- src/components/__tests__/Toast.test.tsx
```

Expected: FAIL because `Toast` is not exported.

- [ ] **Step 3: Implement Toast wrappers**

Create `src/components/Toast.tsx`:

```tsx
import * as RadixToast from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";
import { Icon } from "./Icon";

export type LazyToastIntent = "neutral" | "success" | "danger";
export type LazyToastMotion = "none" | "slide" | "fade";

export const ToastProvider = RadixToast.Provider;
export const ToastAction = RadixToast.Action;

export type ToastProps = ComponentPropsWithoutRef<typeof RadixToast.Root> & {
  intent?: LazyToastIntent;
  motion?: LazyToastMotion;
};

export const Toast = forwardRef<ElementRef<typeof RadixToast.Root>, ToastProps>(
  function Toast({ className, intent = "neutral", motion = "slide", ...props }, ref) {
    return (
      <RadixToast.Root
        {...props}
        className={cx("ld-toast", className)}
        data-intent={intent}
        data-motion={motion}
        ref={ref}
      />
    );
  },
);

export const ToastTitle = forwardRef<ElementRef<typeof RadixToast.Title>, ComponentPropsWithoutRef<typeof RadixToast.Title>>(
  function ToastTitle({ className, ...props }, ref) {
    return <RadixToast.Title {...props} className={cx("ld-toast__title", className)} ref={ref} />;
  },
);

export const ToastDescription = forwardRef<
  ElementRef<typeof RadixToast.Description>,
  ComponentPropsWithoutRef<typeof RadixToast.Description>
>(function ToastDescription({ className, ...props }, ref) {
  return <RadixToast.Description {...props} className={cx("ld-toast__description", className)} ref={ref} />;
});
```

Implement close and viewport:

```tsx
export const ToastClose = forwardRef<ElementRef<typeof RadixToast.Close>, ComponentPropsWithoutRef<typeof RadixToast.Close>>(
  function ToastClose({ children, className, ...props }, ref) {
    return (
      <RadixToast.Close {...props} className={cx("ld-toast__close", className)} ref={ref}>
        {children ?? <Icon glyph={X} size="sm" />}
      </RadixToast.Close>
    );
  },
);

export const ToastViewport = forwardRef<
  ElementRef<typeof RadixToast.Viewport>,
  ComponentPropsWithoutRef<typeof RadixToast.Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  return <RadixToast.Viewport {...props} className={cx("ld-toast-viewport", className)} ref={ref} />;
});
```

- [ ] **Step 4: Add Toast CSS and exports**

Add CSS:

```css
.ld-toast-viewport {
  position: fixed;
  right: var(--ld-space-4);
  bottom: var(--ld-space-4);
  z-index: calc(var(--ld-component-overlay-z-index) + 3);
  display: grid;
  gap: var(--ld-space-2);
  width: min(calc(100vw - var(--ld-space-8)), var(--ld-component-toast-width));
  margin: 0;
  padding: 0;
  list-style: none;
}

.ld-toast {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--ld-space-1) var(--ld-space-3);
  border: 1px solid var(--ld-component-toast-border);
  border-radius: var(--ld-component-overlay-radius);
  background: var(--ld-component-toast-background);
  color: var(--ld-component-toast-foreground);
  box-shadow: var(--ld-component-overlay-shadow);
  padding: var(--ld-space-3);
}

.ld-toast[data-intent="success"] {
  border-color: var(--ld-component-toast-success-border);
}

.ld-toast[data-intent="danger"] {
  border-color: var(--ld-component-toast-danger-border);
}
```

Export Toast components and types from `src/components/index.ts`.

- [ ] **Step 5: Verify focused tests, full tests, and build**

Run:

```powershell
pnpm test -- src/components/__tests__/Toast.test.tsx
pnpm test
pnpm build
```

Expected: all tests PASS and build exits with code 0.

- [ ] **Step 6: Commit Toast**

```powershell
git add src/components/Toast.tsx src/components/index.ts src/components/styles.css src/components/__tests__/Toast.test.tsx
git commit -m "Add Toast feedback component"
git push origin main
```

## Task 6: Integrate v0.7 workflows into LazyTeam.wtf

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Expand the App integration test first**

Modify `src/App.test.tsx` with a second test:

```tsx
it("opens overlay workflows and shows toast feedback", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("tab", { name: "Motion Grid" }));

  await user.click(screen.getByRole("button", { name: "Run sequence" }));
  expect(screen.getByRole("dialog", { name: "Run deployment sequence" })).toBeInTheDocument();
  expect(screen.getByText("Runtime profile")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Confirm sequence" }));
  expect(screen.queryByRole("dialog", { name: "Run deployment sequence" })).not.toBeInTheDocument();
  expect(screen.getByText("Sequence queued")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Calibrate" }));
  expect(screen.getByRole("dialog", { name: "Calibrate runtime" })).toHaveAttribute("data-side", "right");
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog", { name: "Calibrate runtime" })).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Runtime profile summary" }));
  expect(screen.getByText("Linear density profile")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run App test and verify RED**

Run:

```powershell
pnpm test -- src/App.test.tsx
```

Expected: FAIL because the overlay workflows are not rendered.

- [ ] **Step 3: Add App state and component imports**

Modify `src/App.tsx` imports:

```tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./components";
```

Add state:

```tsx
const [toastOpen, setToastOpen] = useState(false);
const [lastWorkflow, setLastWorkflow] = useState("Sequence queued");
```

Wrap the current app content in `ToastProvider` inside `LazyProvider`, keeping `TooltipProvider` inside or beside it:

```tsx
<ToastProvider>
  <TooltipProvider>
    <div className="ltw-shell">...</div>
    <Toast open={toastOpen} onOpenChange={setToastOpen} intent="success">
      <ToastTitle>{lastWorkflow}</ToastTitle>
      <ToastDescription>LazyDesign runtime state was captured.</ToastDescription>
      <ToastClose />
    </Toast>
    <ToastViewport />
  </TooltipProvider>
</ToastProvider>
```

- [ ] **Step 4: Replace Motion Grid action buttons with workflows**

Replace the plain Run sequence and Calibrate buttons in Motion Grid with:

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button intent="primary" iconStart={<Icon glyph={Play} />} motion="press">
      Run sequence
    </Button>
  </DialogTrigger>
  <DialogContent motion="scale">
    <DialogHeader>
      <DialogTitle>Run deployment sequence</DialogTitle>
      <DialogDescription>Confirm runtime changes before execution.</DialogDescription>
    </DialogHeader>
    <div className="ltw-overlay-summary">
      <span>Runtime profile</span>
      <strong>{selectedRuntimeProfile.label}</strong>
      <span>Telemetry</span>
      <strong>{telemetry ? "Enabled" : "Disabled"}</strong>
      <span>Release gate</span>
      <strong>{releaseGate || "manual approval required"}</strong>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button
          intent="primary"
          onClick={() => {
            setLastWorkflow("Sequence queued");
            setToastOpen(true);
          }}
        >
          Confirm sequence
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Add a Drawer around Calibrate:

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button iconStart={<Icon glyph={Settings2} />} variant="ghost">
      Calibrate
    </Button>
  </DrawerTrigger>
  <DrawerContent side="right" motion="slide">
    <DrawerHeader>
      <DrawerTitle>Calibrate runtime</DrawerTitle>
      <DrawerDescription>Adjust the current motion grid profile.</DrawerDescription>
    </DrawerHeader>
    <div className="ltw-overlay-summary">
      <span>Motion</span>
      <strong>{reducedMotion ? "Reduced" : "System"}</strong>
      <span>Density</span>
      <strong>{density}</strong>
    </div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Close</Button>
      </DrawerClose>
      <DrawerClose asChild>
        <Button
          intent="primary"
          onClick={() => {
            setLastWorkflow("Calibration saved");
            setToastOpen(true);
          }}
        >
          Save calibration
        </Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

- [ ] **Step 5: Add runtime profile Popover**

Near the Runtime profile setting, render:

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button aria-label="Runtime profile summary" size="sm" variant="ghost">
      <Icon glyph={Radar} />
    </Button>
  </PopoverTrigger>
  <PopoverContent size="sm">
    <PopoverTitle>Linear density profile</PopoverTitle>
    <PopoverDescription>
      Runtime surfaces stay flat, compact, and motion-aware.
    </PopoverDescription>
  </PopoverContent>
</Popover>
```

Ensure the trigger has a unique accessible name exactly matching the test.

- [ ] **Step 6: Add App CSS**

Add to `src/styles.css`:

```css
.ltw-overlay-summary {
  display: grid;
  grid-template-columns: minmax(120px, 0.45fr) minmax(0, 1fr);
  gap: var(--ld-space-2);
  padding: var(--ld-space-3);
  border: 1px solid var(--ld-component-surface-border);
  border-radius: var(--ld-shape-corner-small);
  background: var(--ld-component-surface-level-2);
}

.ltw-overlay-summary span {
  color: var(--ld-component-text-muted);
  font: var(--ld-typography-body-sm);
}

.ltw-overlay-summary strong {
  min-width: 0;
  color: var(--ld-component-text-primary);
  font: var(--ld-typography-label);
}

.ltw-setting-row--inline {
  grid-template-columns: minmax(136px, 0.42fr) minmax(0, 1fr) auto;
}
```

In the `@media (max-width: 560px)` block, add:

```css
.ltw-overlay-summary,
.ltw-setting-row--inline {
  grid-template-columns: 1fr;
}
```

- [ ] **Step 7: Verify App tests and browser behavior**

Run:

```powershell
pnpm test -- src/App.test.tsx
pnpm test
pnpm build
```

Expected: tests PASS and build exits with code 0.

Use the browser at `http://127.0.0.1:5173/` or another available Vite port to verify:

- Dialog opens from Run sequence.
- Confirm sequence closes Dialog and shows Toast.
- Drawer opens from Calibrate and fits the viewport.
- Popover opens from Runtime profile summary.
- No console errors.
- No mobile horizontal overflow.

- [ ] **Step 8: Commit LazyTeam integration**

```powershell
git add src/App.tsx src/App.test.tsx src/styles.css
git commit -m "Integrate v0.7 workflows into LazyTeam"
git push origin main
```

## Task 7: Update release documentation and version

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `design/component-policy.md`
- Modify: `public/docs/lazydesign-spec.md`

- [ ] **Step 1: Set package version**

Set `package.json`:

```json
"version": "0.7.0"
```

- [ ] **Step 2: Update README**

Add the implemented component list:

```md
v0.7.0 adds the interaction layer:

- `Dialog` for modal confirmation and editing workflows.
- `Drawer` for side-panel SaaS tasks.
- `Popover` for contextual inspection.
- `Toast` for non-blocking status feedback.
- Motion physics recipes such as `dialog-scale`, `drawer-slide`, `toast-slide`, `press-crisp`, and `reveal-flow`.
```

Add an API example:

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button intent="primary">Run sequence</Button>
  </DialogTrigger>
  <DialogContent motion="scale">
    <DialogTitle>Run deployment sequence</DialogTitle>
    <DialogDescription>Confirm runtime changes.</DialogDescription>
  </DialogContent>
</Dialog>
```

- [ ] **Step 3: Update component policy**

Change current phase:

```md
Current implementation phase: v0.7.0 Interaction Layer
```

Add overlay guidance:

```md
## Overlay Guidance

Dialog, Drawer, Popover, and Toast must use Radix behavior where available, but the public API, token contract, visual state mapping, and motion language remain LazyDesign-owned.

Overlay CSS must consume `--ld-component-overlay-*`, `--ld-component-dialog-*`, `--ld-component-drawer-*`, `--ld-component-popover-*`, and `--ld-component-toast-*` tokens before semantic tokens.

Overlay motion must use named LazyDesign recipes and must not expose GSAP, ScrollTrigger, Web Animations, or Radix internals.
```

- [ ] **Step 4: Update public spec**

Update `public/docs/lazydesign-spec.md`:

```md
Version: 0.7.0
Status: Interaction Layer and Motion Physics
```

Add runtime status rows for:

```txt
  -> Interaction Layer       v0.7.0 Dialog, Drawer, Popover, Toast
  -> Motion Physics          v0.7.0 overlay and press recipes
```

Add token groups:

```md
- `overlay`
- `dialog`
- `drawer`
- `popover`
- `toast`
```

Add the new motion recipe names in the Motion Contract section.

- [ ] **Step 5: Run documentation and release verification**

Run:

```powershell
pnpm test
pnpm build
git diff --check
```

Expected: tests PASS, build exits with code 0, and diff check has no output except possible Windows LF/CRLF warnings.

- [ ] **Step 6: Commit release docs**

```powershell
git add package.json README.md design/component-policy.md public/docs/lazydesign-spec.md
git commit -m "Document LazyDesign v0.7 interaction layer"
git push origin main
```

## Task 8: Final review, browser QA, and release commit

**Files:**
- Review all changed files from Tasks 1-7
- No new source files unless review finds a blocking issue

- [ ] **Step 1: Request code review**

Use `superpowers:requesting-code-review` with this context:

```txt
DESCRIPTION: LazyDesign v0.7 Interaction Layer with overlay components, motion recipes, tokens, and LazyTeam workflows.
PLAN_OR_REQUIREMENTS: docs/superpowers/specs/2026-07-14-interaction-layer-design.md and docs/superpowers/plans/2026-07-14-interaction-layer.md
BASE_SHA: ec1e13f
HEAD_SHA: output of `git rev-parse HEAD` after Task 7
```

Fix Critical and Important findings before continuing.

- [ ] **Step 2: Run final automated verification**

Run:

```powershell
pnpm test
pnpm build
git diff --check
git status --short --branch
```

Expected:

- All tests PASS.
- Build exits with code 0.
- Diff check has no whitespace errors.
- Working tree only contains unrelated untracked `scripts/`, or is fully clean if `scripts/` has been separately handled by the user.

- [ ] **Step 3: Run final browser QA**

Start the app when `Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:5173/' -TimeoutSec 2` does not return a 200 response:

```powershell
pnpm dev -- --port 5174
```

At the active Vite URL, verify:

- Page title is `LazyDesign`.
- LazyTeam.wtf first screen renders meaningful content.
- Console has no errors or relevant warnings.
- `Run sequence` opens Dialog.
- `Confirm sequence` closes Dialog and shows Toast.
- `Calibrate` opens Drawer and Escape closes it.
- `Runtime profile summary` opens Popover.
- Reduced motion still updates provider motion variables.
- Light and dark modes keep overlay text readable.
- Mobile viewport has no horizontal overflow.

- [ ] **Step 4: Commit any review fixes**

If Step 1-3 produced source changes, commit them:

```powershell
git add package.json pnpm-lock.yaml README.md design/component-policy.md public/docs/lazydesign-spec.md src/App.tsx src/App.test.tsx src/styles.css src/core/motion.ts src/core/components.ts src/core/__tests__/components.test.ts src/core/__tests__/motion.test.ts src/components/Dialog.tsx src/components/Drawer.tsx src/components/Popover.tsx src/components/Toast.tsx src/components/index.ts src/components/styles.css src/components/__tests__/Dialog.test.tsx src/components/__tests__/Drawer.test.tsx src/components/__tests__/Popover.test.tsx src/components/__tests__/Toast.test.tsx
git commit -m "Harden v0.7 interaction layer"
git push origin main
```

If no changes were needed, do not create an empty commit.

- [ ] **Step 5: Report release status**

Report:

- Latest commit SHA.
- Tests/build/browser QA results.
- Any remaining non-blocking warnings, such as Vite chunk-size warnings.
- Whether `origin/main` is synced.
