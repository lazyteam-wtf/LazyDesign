import { createColorRoles, createColorVars, normalizeHex, type LazyColorRoles, type LazyContrast, type LazyMode } from "./color";
import { createMotionRecipe, createMotionVars, type LazyMotionPreference, type LazyMotionRecipe } from "./motion";
import { createRadiusVars, type LazyRadiusScale } from "./radius";
import { createFoundationVars, type LazyCssVars, lazyTokenVars } from "./tokens";

export type LazyThemeInput = {
  source: string;
  mode?: LazyMode;
  contrast?: LazyContrast;
  radius?: LazyRadiusScale;
  motion?: LazyMotionPreference;
  density?: "standard" | "compact";
};

export type LazyThemeSource = {
  seed: string;
  mode: LazyMode;
  contrast: LazyContrast;
  radius: LazyRadiusScale;
  motion: LazyMotionPreference;
  density: "standard" | "compact";
};

export type LazyBrandTheme = {
  source: string;
  mode: LazyMode;
  color: LazyColorRoles;
};

export type LazySemanticTheme = {
  color: LazyColorRoles;
  vars: LazyCssVars;
};

export type LazyComponentTheme = {
  surface: {
    level0: string;
    level1: string;
    level2: string;
    level3: string;
  };
  control: {
    radius: string;
    focusRing: string;
    hover: string;
    pressed: string;
  };
  motion: {
    enter: LazyMotionRecipe;
    reveal: LazyMotionRecipe;
  };
  vars: LazyCssVars;
};

export type LazyTheme = {
  source: LazyThemeSource;
  brand: LazyBrandTheme;
  semantic: LazySemanticTheme;
  components: LazyComponentTheme;
  vars: LazyCssVars;
  cssText: string;
  apply(target: HTMLElement): void;
};

export function createTheme(input: LazyThemeInput): LazyTheme {
  const source = createThemeSource(input);
  const brand = createBrandTheme(source);
  const semantic = createSemanticTheme(source, brand);
  const components = createComponentTheme(source, semantic);
  const vars = {
    ...semantic.vars,
    ...components.vars,
  };

  return {
    source,
    brand,
    semantic,
    components,
    vars,
    cssText: serializeVars(vars),
    apply(target) {
      applyTheme(this, target);
    },
  };
}

export function generateTheme(input: LazyThemeInput) {
  return createTheme(input);
}

export function createThemeSource(input: LazyThemeInput): LazyThemeSource {
  return {
    seed: normalizeHex(input.source),
    mode: input.mode ?? "light",
    contrast: input.contrast ?? "normal",
    radius: input.radius ?? "professional",
    motion: input.motion ?? "system",
    density: input.density ?? "standard",
  };
}

export function createBrandTheme(source: LazyThemeSource): LazyBrandTheme {
  return {
    source: source.seed,
    mode: source.mode,
    color: createColorRoles(source.seed, source.mode, source.contrast),
  };
}

export function createSemanticTheme(source: LazyThemeSource, brand: LazyBrandTheme): LazySemanticTheme {
  return {
    color: brand.color,
    vars: {
      ...createFoundationVars(),
      ...createRadiusVars(source.radius),
      ...createMotionVars(source.motion),
      ...createColorVars(source.seed, source.mode, source.contrast),
      "--ld-density": source.density === "compact" ? "0.86" : "1",
    },
  };
}

export function createComponentTheme(source: LazyThemeSource, semantic: LazySemanticTheme): LazyComponentTheme {
  const vars: LazyCssVars = {
    "--ld-component-surface-level-0": semantic.color.background,
    "--ld-component-surface-level-1": semantic.color.surface,
    "--ld-component-surface-level-2": semantic.color.surfaceContainer,
    "--ld-component-surface-level-3": semantic.color.surfaceContainerHigh,
    "--ld-component-control-radius": `var(${lazyTokenVars.shape.cornerMedium})`,
    "--ld-component-control-focus-ring": semantic.color.focusRing,
    "--ld-component-control-hover": semantic.color.stateHover,
    "--ld-component-control-pressed": semantic.color.statePressed,
  };

  return {
    surface: {
      level0: vars["--ld-component-surface-level-0"],
      level1: vars["--ld-component-surface-level-1"],
      level2: vars["--ld-component-surface-level-2"],
      level3: vars["--ld-component-surface-level-3"],
    },
    control: {
      radius: vars["--ld-component-control-radius"],
      focusRing: vars["--ld-component-control-focus-ring"],
      hover: vars["--ld-component-control-hover"],
      pressed: vars["--ld-component-control-pressed"],
    },
    motion: {
      enter: createMotionRecipe("slide", source.motion),
      reveal: createMotionRecipe("reveal", source.motion),
    },
    vars,
  };
}

export function applyTheme(theme: LazyTheme, target: HTMLElement = document.documentElement) {
  for (const [key, value] of Object.entries(theme.vars)) {
    target.style.setProperty(key, value);
  }
  target.dataset.theme = theme.source.mode;
}

export function serializeVars(vars: LazyCssVars) {
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
}

export function createThemeVars(input: LazyThemeInput) {
  return createTheme(input).vars;
}
