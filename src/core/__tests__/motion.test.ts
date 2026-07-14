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
