# LazyDesign v0.6 Form Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship an accessible, token-driven form foundation with Field, Checkbox, Switch, Select, automated tests, and a working LazyTeam.wtf settings surface.

**Architecture:** Radix primitives own interaction semantics for Checkbox, Switch, and Select. LazyDesign wrappers curate the public API, consume the shared Field context, expose stable data attributes, and render exclusively through `--ld-component-*` tokens resolved by `resolveTheme()`.

**Tech Stack:** React 19, TypeScript, Radix UI, CSS variables, Vitest, jsdom, React Testing Library, user-event, Vite

---

## File Map

- Create `src/test/setup.ts` for jest-dom matchers and DOM cleanup.
- Create `vitest.config.ts` for jsdom component tests.
- Create `src/components/Field.tsx` for field context and accessible text relationships.
- Create `src/components/Checkbox.tsx` for Radix Checkbox composition.
- Create `src/components/Switch.tsx` for Radix Switch composition.
- Create `src/components/Select.tsx` for Radix Select composition.
- Create `src/components/__tests__/Field.test.tsx` for field relationships.
- Create `src/components/__tests__/Checkbox.test.tsx` for checkbox interaction.
- Create `src/components/__tests__/Switch.test.tsx` for switch interaction.
- Create `src/components/__tests__/Select.test.tsx` for select keyboard behavior.
- Create `src/core/__tests__/components.test.ts` for theme token emission.
- Modify `src/core/components.ts` to add field, checkbox, switch, and select tokens.
- Modify `src/components/styles.css` for form-control visuals and motion.
- Modify `src/components/index.ts` and `src/index.ts` only where exports require it.
- Modify `src/components/Input.tsx` to consume optional Field context without breaking its convenience API.
- Modify `src/App.tsx` and `src/styles.css` to add a real settings surface.
- Modify `package.json`, `pnpm-lock.yaml`, `README.md`, `design/component-policy.md`, and `public/docs/lazydesign-spec.md` for the v0.6 release.

### Task 1: Establish the automated test runtime

**Files:**
- Create: `src/test/setup.ts`
- Create: `vitest.config.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Test: `src/core/__tests__/components.test.ts`

- [ ] **Step 1: Install the test runtime and Radix form dependencies**

Run:

```powershell
pnpm add @radix-ui/react-checkbox @radix-ui/react-switch @radix-ui/react-select
pnpm add -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

Expected: package metadata and lockfile include the three Radix packages and five test packages.

- [ ] **Step 2: Add the test scripts and jsdom setup**

Add to `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Create `vitest.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());
```

- [ ] **Step 3: Write a failing token-contract smoke test**

Create `src/core/__tests__/components.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { resolveTheme } from "../theme";

describe("form component tokens", () => {
  it("emits the v0.6 form token namespaces", () => {
    const theme = resolveTheme({ seed: "#1f8a70", mode: "dark", density: "compact" });

    expect(theme.vars["--ld-component-field-label-foreground"]).toBeTruthy();
    expect(theme.vars["--ld-component-checkbox-background-checked"]).toBeTruthy();
    expect(theme.vars["--ld-component-switch-track-background-checked"]).toBeTruthy();
    expect(theme.vars["--ld-component-select-trigger-background"]).toBeTruthy();
  });
});
```

- [ ] **Step 4: Run the test and verify the RED state**

Run: `pnpm test -- src/core/__tests__/components.test.ts`

Expected: FAIL because the v0.6 form variables do not exist.

- [ ] **Step 5: Commit the test foundation**

```powershell
git add package.json pnpm-lock.yaml vitest.config.ts src/test/setup.ts src/core/__tests__/components.test.ts
git commit -m "Establish LazyDesign component tests"
git push origin main
```

### Task 2: Add the form component-token contract

**Files:**
- Modify: `src/core/components.ts`
- Test: `src/core/__tests__/components.test.ts`

- [ ] **Step 1: Expand the test across mode and density combinations**

Replace the smoke assertion body with a loop over these inputs:

```ts
const combinations = [
  { mode: "light", density: "standard" },
  { mode: "light", density: "compact" },
  { mode: "dark", density: "standard" },
  { mode: "dark", density: "compact" },
] as const;

for (const input of combinations) {
  const theme = resolveTheme({ seed: "#1f8a70", ...input });
  expect(theme.vars["--ld-component-field-label-foreground"]).toBeTruthy();
  expect(theme.vars["--ld-component-checkbox-background-checked"]).toBeTruthy();
  expect(theme.vars["--ld-component-switch-track-background-checked"]).toBeTruthy();
  expect(theme.vars["--ld-component-select-trigger-background"]).toBeTruthy();
}
```

- [ ] **Step 2: Run the test and verify it still fails for missing tokens**

Run: `pnpm test -- src/core/__tests__/components.test.ts`

Expected: FAIL on the first missing form token.

- [ ] **Step 3: Add token variable names, typed theme groups, references, and values**

Extend `lazyComponentTokenVars`, `lazyComponentTokens`, `LazyComponentTheme`, `createComponentTheme()`, and `createComponentVars()` with the exact namespaces in the design specification.

Use semantic mappings equivalent to:

```ts
const formTokens = {
  fieldLabel: color.onSurface,
  fieldDescription: color.onSurfaceVariant,
  fieldError: color.error,
  controlBackground: color.surfaceContainerLow,
  controlBorder: color.borderMuted,
  checkedBackground: color.primary,
  checkedForeground: color.onPrimary,
  invalidBorder: color.error,
  overlayBackground: color.surfaceContainer,
  overlayShadow: "0 12px 32px rgba(0, 0, 0, 0.18)",
};
```

All final values must be returned through `LazyComponentTheme.vars`; component CSS must not calculate its own brand colors.

- [ ] **Step 4: Run token tests and the TypeScript build**

Run:

```powershell
pnpm test -- src/core/__tests__/components.test.ts
pnpm build
```

Expected: token tests PASS and build exits with code 0.

- [ ] **Step 5: Commit the token contract**

```powershell
git add src/core/components.ts src/core/__tests__/components.test.ts
git commit -m "Add form component token contract"
git push origin main
```

### Task 3: Implement Field composition and Input integration

**Files:**
- Create: `src/components/Field.tsx`
- Create: `src/components/__tests__/Field.test.tsx`
- Modify: `src/components/Input.tsx`
- Modify: `src/components/index.ts`
- Modify: `src/components/styles.css`

- [ ] **Step 1: Write failing Field relationship tests**

Create tests that render:

```tsx
<Field invalid required>
  <FieldLabel>Project slug</FieldLabel>
  <Input />
  <FieldDescription>Lowercase letters only.</FieldDescription>
  <FieldError>Slug is unavailable.</FieldError>
</Field>
```

Assert:

```ts
const control = screen.getByRole("textbox", { name: "Project slug" });
expect(control).toHaveAttribute("aria-invalid", "true");
expect(control).toHaveAttribute("aria-required", "true");
expect(control).toHaveAccessibleDescription("Lowercase letters only. Slug is unavailable.");
```

Add a second test proving explicit `id`, `aria-describedby`, and disabled props are preserved.

- [ ] **Step 2: Run the Field test and verify the RED state**

Run: `pnpm test -- src/components/__tests__/Field.test.tsx`

Expected: FAIL because `Field` exports do not exist.

- [ ] **Step 3: Implement Field context and optional control mapping**

`Field.tsx` must export:

```ts
export type FieldProps = ComponentPropsWithoutRef<"div"> & {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
};

export function useFieldControlProps<T extends {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "false" | "true";
  "aria-required"?: boolean | "false" | "true";
  disabled?: boolean;
}>(props: T): T;
```

The helper merges explicit and context descriptions with a Set so IDs are not duplicated. It includes the error ID only when invalid. `FieldLabel`, `FieldDescription`, and `FieldError` use context IDs and throw a descriptive error outside `Field`.

- [ ] **Step 4: Integrate Input and Field CSS**

`Input` calls `useFieldControlProps()` for its native input props while preserving the existing convenience wrapper. Add `.ld-field`, `.ld-field__label`, `.ld-field__description`, and `.ld-field__error` styles that consume only field component tokens and typography tokens.

- [ ] **Step 5: Run focused and full tests**

Run:

```powershell
pnpm test -- src/components/__tests__/Field.test.tsx
pnpm test
pnpm build
```

Expected: all commands exit with code 0.

- [ ] **Step 6: Commit Field composition**

```powershell
git add src/components/Field.tsx src/components/Input.tsx src/components/index.ts src/components/styles.css src/components/__tests__/Field.test.tsx
git commit -m "Introduce accessible Field composition"
git push origin main
```

### Task 4: Implement Checkbox and Switch through Radix behavior

**Files:**
- Create: `src/components/Checkbox.tsx`
- Create: `src/components/Switch.tsx`
- Create: `src/components/__tests__/Checkbox.test.tsx`
- Create: `src/components/__tests__/Switch.test.tsx`
- Modify: `src/components/index.ts`
- Modify: `src/components/styles.css`

- [ ] **Step 1: Write the failing Checkbox tests**

Render an uncontrolled checkbox with an accessible label and assert:

```ts
await user.click(screen.getByRole("checkbox", { name: "Runtime telemetry" }));
expect(screen.getByRole("checkbox", { name: "Runtime telemetry" })).toBeChecked();
```

Add tests for Space-key toggling, `checked="indeterminate"`, invalid ARIA state through `Field`, and disabled interaction.

- [ ] **Step 2: Run Checkbox tests and verify the RED state**

Run: `pnpm test -- src/components/__tests__/Checkbox.test.tsx`

Expected: FAIL because `Checkbox` is not exported.

- [ ] **Step 3: Implement Checkbox and verify GREEN**

Wrap `@radix-ui/react-checkbox`, render a default check or minus indicator, call `useFieldControlProps()`, and expose `size`, `state`, and `motion` as data attributes.

Run: `pnpm test -- src/components/__tests__/Checkbox.test.tsx`

Expected: all Checkbox tests PASS.

- [ ] **Step 4: Write the failing Switch tests**

Test pointer and Space-key toggling, controlled state, disabled interaction, and invalid ARIA state through `Field`.

Run: `pnpm test -- src/components/__tests__/Switch.test.tsx`

Expected: FAIL because `Switch` is not exported.

- [ ] **Step 5: Implement Switch and verify GREEN**

Wrap `@radix-ui/react-switch`, render the thumb internally, call `useFieldControlProps()`, and expose `size`, `state`, and `motion` as data attributes.

Run: `pnpm test -- src/components/__tests__/Switch.test.tsx`

Expected: all Switch tests PASS.

- [ ] **Step 6: Add token-driven control CSS**

Checkbox and Switch CSS must consume the corresponding component tokens for background, border, size, selected state, invalid state, focus ring, and disabled opacity. Use duration/easing tokens for indicator and thumb transitions and remove transforms under `prefers-reduced-motion`.

- [ ] **Step 7: Run the full suite and build**

Run:

```powershell
pnpm test
pnpm build
```

Expected: all tests PASS and build exits with code 0.

- [ ] **Step 8: Commit the binary controls**

```powershell
git add src/components/Checkbox.tsx src/components/Switch.tsx src/components/index.ts src/components/styles.css src/components/__tests__/Checkbox.test.tsx src/components/__tests__/Switch.test.tsx
git commit -m "Add accessible Checkbox and Switch"
git push origin main
```

### Task 5: Implement composable Select

**Files:**
- Create: `src/components/Select.tsx`
- Create: `src/components/__tests__/Select.test.tsx`
- Modify: `src/components/index.ts`
- Modify: `src/components/styles.css`

- [ ] **Step 1: Write failing Select keyboard tests**

Render a Select with Linear, Material, and disabled Enterprise items. Assert that the trigger opens with keyboard input, ArrowDown changes the highlighted item, Enter commits the value, Escape closes without changing the current value, disabled items cannot be selected, and focus returns to the trigger.

- [ ] **Step 2: Run Select tests and verify the RED state**

Run: `pnpm test -- src/components/__tests__/Select.test.tsx`

Expected: FAIL because Select exports do not exist.

- [ ] **Step 3: Implement the composable Select wrappers**

Export the anatomy listed in the design specification. `SelectTrigger` calls `useFieldControlProps()`. `SelectContent` portals by default, includes viewport and scroll buttons, accepts `motion="none | scale | slide"`, and sets a default side offset of 6 pixels.

Use Lucide `Check` and `ChevronDown` through the existing `Icon` API or direct internal glyph composition without adding a new public icon dependency.

- [ ] **Step 4: Add Select CSS**

Style trigger, content, viewport, group label, item, indicator, separator, and scroll buttons. Use component tokens for all colors and dimensions. Position animations follow Radix transform-origin variables and retain opacity-only behavior under reduced motion.

- [ ] **Step 5: Run focused tests, full suite, and build**

Run:

```powershell
pnpm test -- src/components/__tests__/Select.test.tsx
pnpm test
pnpm build
```

Expected: all tests PASS and build exits with code 0.

- [ ] **Step 6: Commit Select**

```powershell
git add src/components/Select.tsx src/components/index.ts src/components/styles.css src/components/__tests__/Select.test.tsx
git commit -m "Add composable Select component"
git push origin main
```

### Task 6: Integrate the form system into LazyTeam.wtf and release v0.6

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Modify: `README.md`
- Modify: `design/component-policy.md`
- Modify: `public/docs/lazydesign-spec.md`
- Modify: `package.json`

- [ ] **Step 1: Add stateful product settings to the Motion Grid**

Add module-level option arrays and component state for:

```ts
const [runtimeProfile, setRuntimeProfile] = useState("linear");
const [reducedMotion, setReducedMotion] = useState(false);
const [telemetry, setTelemetry] = useState(true);
```

Render the Select, Switch, and Checkbox inside a compact settings surface. Changing reduced motion updates the `LazyProvider` theme motion preference. The invalid Field example uses real state and accessible error text.

- [ ] **Step 2: Add responsive product styling**

Create stable grid tracks for setting rows, keep labels and controls from resizing the layout, and collapse to a single column at the existing mobile breakpoint. Do not add gradients, glass effects, or decorative shadows.

- [ ] **Step 3: Update release documentation and version**

Set package version to `0.6.0`. Add Field, Checkbox, Switch, and Select to the implemented component lists and document one composable form example. Update the component policy phase to v0.6.0.

- [ ] **Step 4: Run fresh automated verification**

Run:

```powershell
pnpm test
pnpm build
git diff --check
```

Expected: tests report zero failures, build exits with code 0, and diff check has no output.

- [ ] **Step 5: Verify the browser experience**

At `http://127.0.0.1:5173/`, verify:

- LazyTeam.wtf loads without console errors.
- Runtime profile Select supports pointer and keyboard selection.
- Reduced-motion Switch updates provider state.
- Telemetry Checkbox toggles and retains visible focus.
- Invalid Field exposes error text to the active control.
- Light and dark mode keep readable contrast.
- Desktop and mobile viewports have no horizontal overflow or overlapping text.

- [ ] **Step 6: Request code review and resolve all critical or important findings**

Review the final diff against the design specification, component policy, React performance guidance, and accessibility contract. Re-run the focused test for every behavior changed during review.

- [ ] **Step 7: Commit and push the v0.6 release**

```powershell
git add src/App.tsx src/styles.css README.md design/component-policy.md public/docs/lazydesign-spec.md package.json
git commit -m "Ship LazyDesign v0.6 form foundation"
git push origin main
```
