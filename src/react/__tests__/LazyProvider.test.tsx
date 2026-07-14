import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LazyProvider } from "../LazyProvider";

describe("LazyProvider", () => {
  afterEach(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-theme-style");
    document.documentElement.style.removeProperty("--ld-color-primary");
  });

  it("applies theme variables to documentElement for portals and restores them on unmount", () => {
    document.documentElement.dataset.theme = "light";
    document.documentElement.dataset.themeStyle = "geist";
    document.documentElement.style.setProperty("--ld-color-primary", "existing-primary");

    const { unmount } = render(
      <LazyProvider theme={{ mode: "dark", seed: "#6d7cff" }}>
        <div>portal theme</div>
      </LazyProvider>,
    );

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.themeStyle).toBe("linear");
    expect(document.documentElement.style.getPropertyValue("--ld-color-primary")).not.toBe("existing-primary");

    unmount();

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.documentElement.dataset.themeStyle).toBe("geist");
    expect(document.documentElement.style.getPropertyValue("--ld-color-primary")).toBe("existing-primary");
  });

  it("can opt out of documentElement theme application", () => {
    render(
      <LazyProvider applyToDocument={false} theme={{ mode: "dark", seed: "#6d7cff" }}>
        <div>scoped only</div>
      </LazyProvider>,
    );

    expect(document.documentElement.dataset.theme).toBeUndefined();
    expect(document.documentElement.style.getPropertyValue("--ld-color-primary")).toBe("");
  });
});
