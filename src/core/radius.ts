import { type LazyCssVars, lazyCompatibilityVars, lazyTokenVars } from "./tokens";

export type LazyRadiusScale = "professional" | "expressive";

export const lazyRadiusValues = {
  professional: {
    cornerExtraSmall: "4px",
    cornerSmall: "6px",
    cornerMedium: "8px",
    cornerLarge: "12px",
    cornerExtraLarge: "16px",
    cornerFull: "999px",
  },
  expressive: {
    cornerExtraSmall: "6px",
    cornerSmall: "8px",
    cornerMedium: "12px",
    cornerLarge: "16px",
    cornerExtraLarge: "20px",
    cornerFull: "999px",
  },
} as const;

export function createRadiusVars(scale: LazyRadiusScale = "professional"): LazyCssVars {
  const values = lazyRadiusValues[scale];
  const vars: LazyCssVars = {
    [lazyTokenVars.shape.cornerExtraSmall]: values.cornerExtraSmall,
    [lazyTokenVars.shape.cornerSmall]: values.cornerSmall,
    [lazyTokenVars.shape.cornerMedium]: values.cornerMedium,
    [lazyTokenVars.shape.cornerLarge]: values.cornerLarge,
    [lazyTokenVars.shape.cornerExtraLarge]: values.cornerExtraLarge,
    [lazyTokenVars.shape.cornerFull]: values.cornerFull,
  };

  Object.assign(vars, {
    [lazyCompatibilityVars.shape.cornerExtraSmall]: vars[lazyTokenVars.shape.cornerExtraSmall],
    [lazyCompatibilityVars.shape.cornerSmall]: vars[lazyTokenVars.shape.cornerSmall],
    [lazyCompatibilityVars.shape.cornerMedium]: vars[lazyTokenVars.shape.cornerMedium],
    [lazyCompatibilityVars.shape.cornerLarge]: vars[lazyTokenVars.shape.cornerLarge],
    [lazyCompatibilityVars.shape.cornerExtraLarge]: vars[lazyTokenVars.shape.cornerExtraLarge],
    [lazyCompatibilityVars.shape.cornerFull]: vars[lazyTokenVars.shape.cornerFull],
  });

  return vars;
}
