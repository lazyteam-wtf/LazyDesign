import { type LazyColorRoles } from "./color";
import { createMotionRecipe, type LazyMotionPreference, type LazyMotionRecipe } from "./motion";
import { type LazyCssVars, lazyTokenVars } from "./tokens";

export type LazyDesignStyle = "linear" | "geist" | "material" | "expressive" | "enterprise";
export type LazyComponentDensity = "standard" | "compact";

export type LazyComponentThemeInput = {
  color: LazyColorRoles;
  density?: LazyComponentDensity;
  motion?: LazyMotionPreference;
  style?: LazyDesignStyle;
};

export const lazyComponentTokenVars = {
  surface: {
    background: "--ld-component-surface-background",
    foreground: "--ld-component-surface-foreground",
    border: "--ld-component-surface-border",
    level0: "--ld-component-surface-level-0",
    level1: "--ld-component-surface-level-1",
    level2: "--ld-component-surface-level-2",
    level3: "--ld-component-surface-level-3",
  },
  text: {
    primary: "--ld-component-text-primary",
    muted: "--ld-component-text-muted",
    link: "--ld-component-text-link",
    code: "--ld-component-text-code",
  },
  control: {
    radius: "--ld-component-control-radius",
    heightSm: "--ld-component-control-height-sm",
    heightMd: "--ld-component-control-height-md",
    heightLg: "--ld-component-control-height-lg",
    paddingXSm: "--ld-component-control-padding-x-sm",
    paddingXMd: "--ld-component-control-padding-x-md",
    paddingXLg: "--ld-component-control-padding-x-lg",
    gap: "--ld-component-control-gap",
    border: "--ld-component-control-border",
    focusRing: "--ld-component-control-focus-ring",
    hover: "--ld-component-control-hover",
    pressed: "--ld-component-control-pressed",
  },
  button: {
    background: "--ld-component-button-background",
    foreground: "--ld-component-button-foreground",
    border: "--ld-component-button-border",
    backgroundHover: "--ld-component-button-background-hover",
    backgroundPressed: "--ld-component-button-background-pressed",
    primaryBackground: "--ld-component-button-primary-background",
    primaryForeground: "--ld-component-button-primary-foreground",
    primaryBackgroundHover: "--ld-component-button-primary-background-hover",
    primaryBackgroundPressed: "--ld-component-button-primary-background-pressed",
    radius: "--ld-component-button-radius",
    height: "--ld-component-button-height",
    paddingX: "--ld-component-button-padding-x",
    gap: "--ld-component-button-gap",
  },
  input: {
    background: "--ld-component-input-background",
    foreground: "--ld-component-input-foreground",
    placeholder: "--ld-component-input-placeholder",
    border: "--ld-component-input-border",
    borderFocus: "--ld-component-input-border-focus",
    radius: "--ld-component-input-radius",
    height: "--ld-component-input-height",
    paddingX: "--ld-component-input-padding-x",
  },
} as const;

export const lazyComponentTokens = {
  surface: toRefs(lazyComponentTokenVars.surface),
  text: toRefs(lazyComponentTokenVars.text),
  control: toRefs(lazyComponentTokenVars.control),
  button: toRefs(lazyComponentTokenVars.button),
  input: toRefs(lazyComponentTokenVars.input),
} as const;

export type LazyComponentTheme = {
  style: LazyDesignStyle;
  surface: {
    background: string;
    foreground: string;
    border: string;
    level0: string;
    level1: string;
    level2: string;
    level3: string;
  };
  text: {
    primary: string;
    muted: string;
    link: string;
    code: string;
  };
  control: {
    radius: string;
    heightSm: string;
    heightMd: string;
    heightLg: string;
    paddingXSm: string;
    paddingXMd: string;
    paddingXLg: string;
    gap: string;
    border: string;
    focusRing: string;
    hover: string;
    pressed: string;
  };
  button: {
    background: string;
    foreground: string;
    border: string;
    backgroundHover: string;
    backgroundPressed: string;
    primaryBackground: string;
    primaryForeground: string;
    primaryBackgroundHover: string;
    primaryBackgroundPressed: string;
    radius: string;
    height: string;
    paddingX: string;
    gap: string;
  };
  input: {
    background: string;
    foreground: string;
    placeholder: string;
    border: string;
    borderFocus: string;
    radius: string;
    height: string;
    paddingX: string;
  };
  motion: {
    enter: LazyMotionRecipe;
    reveal: LazyMotionRecipe;
  };
  vars: LazyCssVars;
};

export function createComponentTheme(input: LazyComponentThemeInput): LazyComponentTheme {
  const style = input.style ?? "linear";
  const density = input.density ?? "standard";
  const motion = input.motion ?? "system";
  const vars = createComponentVars({ ...input, density, motion, style });

  return {
    style,
    surface: {
      background: vars[lazyComponentTokenVars.surface.background],
      foreground: vars[lazyComponentTokenVars.surface.foreground],
      border: vars[lazyComponentTokenVars.surface.border],
      level0: vars[lazyComponentTokenVars.surface.level0],
      level1: vars[lazyComponentTokenVars.surface.level1],
      level2: vars[lazyComponentTokenVars.surface.level2],
      level3: vars[lazyComponentTokenVars.surface.level3],
    },
    text: {
      primary: vars[lazyComponentTokenVars.text.primary],
      muted: vars[lazyComponentTokenVars.text.muted],
      link: vars[lazyComponentTokenVars.text.link],
      code: vars[lazyComponentTokenVars.text.code],
    },
    control: {
      radius: vars[lazyComponentTokenVars.control.radius],
      heightSm: vars[lazyComponentTokenVars.control.heightSm],
      heightMd: vars[lazyComponentTokenVars.control.heightMd],
      heightLg: vars[lazyComponentTokenVars.control.heightLg],
      paddingXSm: vars[lazyComponentTokenVars.control.paddingXSm],
      paddingXMd: vars[lazyComponentTokenVars.control.paddingXMd],
      paddingXLg: vars[lazyComponentTokenVars.control.paddingXLg],
      gap: vars[lazyComponentTokenVars.control.gap],
      border: vars[lazyComponentTokenVars.control.border],
      focusRing: vars[lazyComponentTokenVars.control.focusRing],
      hover: vars[lazyComponentTokenVars.control.hover],
      pressed: vars[lazyComponentTokenVars.control.pressed],
    },
    button: {
      background: vars[lazyComponentTokenVars.button.background],
      foreground: vars[lazyComponentTokenVars.button.foreground],
      border: vars[lazyComponentTokenVars.button.border],
      backgroundHover: vars[lazyComponentTokenVars.button.backgroundHover],
      backgroundPressed: vars[lazyComponentTokenVars.button.backgroundPressed],
      primaryBackground: vars[lazyComponentTokenVars.button.primaryBackground],
      primaryForeground: vars[lazyComponentTokenVars.button.primaryForeground],
      primaryBackgroundHover: vars[lazyComponentTokenVars.button.primaryBackgroundHover],
      primaryBackgroundPressed: vars[lazyComponentTokenVars.button.primaryBackgroundPressed],
      radius: vars[lazyComponentTokenVars.button.radius],
      height: vars[lazyComponentTokenVars.button.height],
      paddingX: vars[lazyComponentTokenVars.button.paddingX],
      gap: vars[lazyComponentTokenVars.button.gap],
    },
    input: {
      background: vars[lazyComponentTokenVars.input.background],
      foreground: vars[lazyComponentTokenVars.input.foreground],
      placeholder: vars[lazyComponentTokenVars.input.placeholder],
      border: vars[lazyComponentTokenVars.input.border],
      borderFocus: vars[lazyComponentTokenVars.input.borderFocus],
      radius: vars[lazyComponentTokenVars.input.radius],
      height: vars[lazyComponentTokenVars.input.height],
      paddingX: vars[lazyComponentTokenVars.input.paddingX],
    },
    motion: {
      enter: createMotionRecipe("slide", motion),
      reveal: createMotionRecipe("reveal", motion),
    },
    vars,
  };
}

export function createComponentVars(input: LazyComponentThemeInput): LazyCssVars {
  const color = input.color;
  const density = input.density ?? "standard";
  const style = input.style ?? "linear";
  const dimensions = createDimensionScale(density);
  const radius = getControlRadius(style);
  const vars: LazyCssVars = {
    [lazyComponentTokenVars.surface.background]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.surface.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.surface.border]: `var(${lazyTokenVars.color.outlineVariant})`,
    [lazyComponentTokenVars.surface.level0]: `var(${lazyTokenVars.color.background})`,
    [lazyComponentTokenVars.surface.level1]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.surface.level2]: `var(${lazyTokenVars.color.surfaceContainer})`,
    [lazyComponentTokenVars.surface.level3]: `var(${lazyTokenVars.color.surfaceContainerHigh})`,
    [lazyComponentTokenVars.text.primary]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.text.muted]: `var(${lazyTokenVars.color.onSurfaceVariant})`,
    [lazyComponentTokenVars.text.link]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.text.code]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.control.radius]: radius,
    [lazyComponentTokenVars.control.heightSm]: dimensions.heightSm,
    [lazyComponentTokenVars.control.heightMd]: dimensions.heightMd,
    [lazyComponentTokenVars.control.heightLg]: dimensions.heightLg,
    [lazyComponentTokenVars.control.paddingXSm]: dimensions.paddingXSm,
    [lazyComponentTokenVars.control.paddingXMd]: dimensions.paddingXMd,
    [lazyComponentTokenVars.control.paddingXLg]: dimensions.paddingXLg,
    [lazyComponentTokenVars.control.gap]: `var(${lazyTokenVars.space[2]})`,
    [lazyComponentTokenVars.control.border]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.control.focusRing]: `var(${lazyTokenVars.color.focusRing})`,
    [lazyComponentTokenVars.control.hover]: `var(${lazyTokenVars.color.stateHover})`,
    [lazyComponentTokenVars.control.pressed]: `var(${lazyTokenVars.color.statePressed})`,
    [lazyComponentTokenVars.button.background]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.button.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.button.border]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.button.backgroundHover]: `var(${lazyTokenVars.color.stateHover})`,
    [lazyComponentTokenVars.button.backgroundPressed]: `var(${lazyTokenVars.color.statePressed})`,
    [lazyComponentTokenVars.button.primaryBackground]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.button.primaryForeground]: `var(${lazyTokenVars.color.onPrimary})`,
    [lazyComponentTokenVars.button.primaryBackgroundHover]: mixWith(color.primary, color.onPrimary, 8),
    [lazyComponentTokenVars.button.primaryBackgroundPressed]: mixWith(color.primary, color.onPrimary, 14),
    [lazyComponentTokenVars.button.radius]: radius,
    [lazyComponentTokenVars.button.height]: dimensions.heightMd,
    [lazyComponentTokenVars.button.paddingX]: dimensions.paddingXMd,
    [lazyComponentTokenVars.button.gap]: `var(${lazyTokenVars.space[2]})`,
    [lazyComponentTokenVars.input.background]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.input.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.input.placeholder]: `var(${lazyTokenVars.color.onSurfaceVariant})`,
    [lazyComponentTokenVars.input.border]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.input.borderFocus]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.input.radius]: radius,
    [lazyComponentTokenVars.input.height]: dimensions.heightMd,
    [lazyComponentTokenVars.input.paddingX]: dimensions.paddingXMd,
  };

  return vars;
}

function createDimensionScale(density: LazyComponentDensity) {
  if (density === "compact") {
    return {
      heightSm: "28px",
      heightMd: "32px",
      heightLg: "36px",
      paddingXSm: "8px",
      paddingXMd: "10px",
      paddingXLg: "12px",
    };
  }

  return {
    heightSm: "32px",
    heightMd: "38px",
    heightLg: "44px",
    paddingXSm: "10px",
    paddingXMd: "12px",
    paddingXLg: "14px",
  };
}

function getControlRadius(style: LazyDesignStyle) {
  if (style === "material" || style === "expressive") {
    return `var(${lazyTokenVars.shape.cornerMedium})`;
  }

  return `var(${lazyTokenVars.shape.cornerSmall})`;
}

function mixWith(base: string, overlay: string, amount: number) {
  return `color-mix(in srgb, ${base}, ${overlay} ${amount}%)`;
}

function toRefs<T extends Record<string, string>>(vars: T) {
  return Object.fromEntries(Object.entries(vars).map(([key, value]) => [key, `var(${value})`])) as {
    readonly [Key in keyof T]: `var(${T[Key]})`;
  };
}
