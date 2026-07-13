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
