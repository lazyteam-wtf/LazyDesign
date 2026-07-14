import { describe, expect, it } from "vitest";
import { resolveTheme } from "../theme";

describe("form component tokens", () => {
  it("emits the v0.6 form token namespaces across modes and densities", () => {
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
      expect(theme.vars["--ld-component-overlay-backdrop"]).toBeTruthy();
      expect(theme.vars["--ld-component-overlay-background"]).toBeTruthy();
      expect(theme.vars["--ld-component-overlay-z-index"]).toBeTruthy();
      expect(theme.vars["--ld-component-dialog-width-md"]).toBeTruthy();
      expect(theme.vars["--ld-component-drawer-width-md"]).toBeTruthy();
      expect(theme.vars["--ld-component-popover-width-md"]).toBeTruthy();
      expect(theme.vars["--ld-component-toast-width"]).toBeTruthy();
      expect(theme.vars["--ld-component-toast-success-border"]).toBeTruthy();
    }
  });
});
