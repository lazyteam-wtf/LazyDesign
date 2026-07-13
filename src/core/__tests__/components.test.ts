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
    }
  });
});
