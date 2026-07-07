import { createColorRoles, createColorVars, normalizeHex, type LazyColorRoles, type LazyContrast, type LazyMode } from "./color";
import {
  createComponentTheme as createComponentTokenTheme,
  type LazyComponentTheme,
  type LazyDesignStyle,
} from "./components";
import { createMotionVars, type LazyMotionPreference } from "./motion";
import { createRadiusVars, type LazyRadiusScale } from "./radius";
import { createFoundationVars, type LazyCssVars } from "./tokens";

export type { LazyComponentTheme, LazyDesignStyle } from "./components";

export type LazyThemeInput = {
  source?: string;
  seed?: string;
  mode?: LazyMode;
  contrast?: LazyContrast;
  radius?: LazyRadiusScale;
  motion?: LazyMotionPreference;
  density?: "standard" | "compact";
  style?: LazyDesignStyle;
};

export type LazyThemeSource = {
  seed: string;
  mode: LazyMode;
  contrast: LazyContrast;
  radius: LazyRadiusScale;
  motion: LazyMotionPreference;
  density: "standard" | "compact";
  style: LazyDesignStyle;
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
  return resolveTheme(input);
}

export function generateTheme(input: LazyThemeInput): LazyTheme {
  return resolveTheme(input);
}

export function resolveTheme(input: LazyThemeInput): LazyTheme {
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

export function createThemeSource(input: LazyThemeInput): LazyThemeSource {
  const style = input.style ?? "linear";

  return {
    seed: normalizeHex(input.source ?? input.seed ?? "#1f8a70"),
    mode: input.mode ?? "light",
    contrast: input.contrast ?? "normal",
    radius: input.radius ?? (style === "expressive" ? "expressive" : "professional"),
    motion: input.motion ?? "system",
    density: input.density ?? (style === "enterprise" ? "compact" : "standard"),
    style,
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
  return createComponentTokenTheme({
    color: semantic.color,
    density: source.density,
    motion: source.motion,
    style: source.style,
  });
}

export function applyTheme(theme: LazyTheme, target: HTMLElement = document.documentElement) {
  for (const [key, value] of Object.entries(theme.vars)) {
    target.style.setProperty(key, value);
  }
  target.dataset.theme = theme.source.mode;
  target.dataset.themeStyle = theme.source.style;
}

export function serializeVars(vars: LazyCssVars) {
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
}

export function createThemeVars(input: LazyThemeInput) {
  return resolveTheme(input).vars;
}
