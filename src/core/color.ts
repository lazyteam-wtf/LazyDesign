import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import { type LazyCssVars, lazyCompatibilityVars, lazyTokenVars } from "./tokens";

const materialSchemeKeys = [
  "primary",
  "onPrimary",
  "primaryContainer",
  "onPrimaryContainer",
  "secondary",
  "onSecondary",
  "secondaryContainer",
  "onSecondaryContainer",
  "tertiary",
  "onTertiary",
  "tertiaryContainer",
  "onTertiaryContainer",
  "error",
  "onError",
  "errorContainer",
  "onErrorContainer",
  "background",
  "onBackground",
  "surface",
  "onSurface",
  "surfaceVariant",
  "onSurfaceVariant",
  "outline",
  "outlineVariant",
  "shadow",
  "scrim",
  "inverseSurface",
  "inverseOnSurface",
  "inversePrimary",
] as const;

export type LazyMode = "light" | "dark";
export type LazyContrast = "normal" | "high";

export type LazyColorRoles = {
  source: string;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  error: string;
  onError: string;
  focusRing: string;
  borderMuted: string;
  stateHover: string;
  statePressed: string;
  stateSelected: string;
};

export function createColorRoles(source: string, mode: LazyMode, contrast: LazyContrast = "normal"): LazyColorRoles {
  const normalizedSource = normalizeHex(source);
  const theme = themeFromSourceColor(argbFromHex(normalizedSource));
  const scheme = theme.schemes[mode].toJSON() as Record<string, number>;
  const neutral = theme.palettes.neutral;
  const contrastOffset = contrast === "high" ? (mode === "dark" ? 6 : -6) : 0;
  const primary = hexFromArgb(scheme.primary);
  const outlineVariant = hexFromArgb(scheme.outlineVariant);

  return {
    source: normalizedSource,
    primary,
    onPrimary: hexFromArgb(scheme.onPrimary),
    primaryContainer: hexFromArgb(scheme.primaryContainer),
    onPrimaryContainer: hexFromArgb(scheme.onPrimaryContainer),
    secondary: hexFromArgb(scheme.secondary),
    onSecondary: hexFromArgb(scheme.onSecondary),
    secondaryContainer: hexFromArgb(scheme.secondaryContainer),
    onSecondaryContainer: hexFromArgb(scheme.onSecondaryContainer),
    tertiary: hexFromArgb(scheme.tertiary),
    onTertiary: hexFromArgb(scheme.onTertiary),
    tertiaryContainer: hexFromArgb(scheme.tertiaryContainer),
    onTertiaryContainer: hexFromArgb(scheme.onTertiaryContainer),
    background: hexFromArgb(scheme.background),
    onBackground: hexFromArgb(scheme.onBackground),
    surface: hexFromArgb(scheme.surface),
    onSurface: hexFromArgb(scheme.onSurface),
    surfaceVariant: hexFromArgb(scheme.surfaceVariant),
    onSurfaceVariant: hexFromArgb(scheme.onSurfaceVariant),
    surfaceContainerLow: hexFromArgb(neutral.tone(clampTone((mode === "dark" ? 10 : 96) + contrastOffset))),
    surfaceContainer: hexFromArgb(neutral.tone(clampTone((mode === "dark" ? 14 : 94) + contrastOffset))),
    surfaceContainerHigh: hexFromArgb(neutral.tone(clampTone((mode === "dark" ? 20 : 90) + contrastOffset))),
    outline: hexFromArgb(scheme.outline),
    outlineVariant,
    inverseSurface: hexFromArgb(scheme.inverseSurface),
    inverseOnSurface: hexFromArgb(scheme.inverseOnSurface),
    error: hexFromArgb(scheme.error),
    onError: hexFromArgb(scheme.onError),
    focusRing: `0 0 0 3px color-mix(in srgb, ${primary}, transparent ${contrast === "high" ? "66%" : "76%"})`,
    borderMuted: `color-mix(in srgb, ${outlineVariant}, transparent ${contrast === "high" ? "8%" : "22%"})`,
    stateHover: mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.055)",
    statePressed: mode === "dark" ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.1)",
    stateSelected: hexFromArgb(scheme.secondaryContainer),
  };
}

export function createColorVars(source: string, mode: LazyMode, contrast: LazyContrast = "normal"): LazyCssVars {
  const normalizedSource = normalizeHex(source);
  const theme = themeFromSourceColor(argbFromHex(normalizedSource));
  const scheme = theme.schemes[mode].toJSON() as Record<string, number>;
  const roles = createColorRoles(normalizedSource, mode, contrast);
  const vars: LazyCssVars = {};

  for (const key of materialSchemeKeys) {
    vars[`--md-${toKebab(key)}`] = hexFromArgb(scheme[key]);
  }

  Object.assign(vars, {
    "--md-surface-container-low": roles.surfaceContainerLow,
    "--md-surface-container": roles.surfaceContainer,
    "--md-surface-container-high": roles.surfaceContainerHigh,
    [lazyTokenVars.color.source]: roles.source,
    [lazyTokenVars.color.primary]: roles.primary,
    [lazyTokenVars.color.onPrimary]: roles.onPrimary,
    [lazyTokenVars.color.primaryContainer]: roles.primaryContainer,
    [lazyTokenVars.color.onPrimaryContainer]: roles.onPrimaryContainer,
    [lazyTokenVars.color.secondary]: roles.secondary,
    [lazyTokenVars.color.onSecondary]: roles.onSecondary,
    [lazyTokenVars.color.secondaryContainer]: roles.secondaryContainer,
    [lazyTokenVars.color.onSecondaryContainer]: roles.onSecondaryContainer,
    [lazyTokenVars.color.tertiary]: roles.tertiary,
    [lazyTokenVars.color.onTertiary]: roles.onTertiary,
    [lazyTokenVars.color.tertiaryContainer]: roles.tertiaryContainer,
    [lazyTokenVars.color.onTertiaryContainer]: roles.onTertiaryContainer,
    [lazyTokenVars.color.background]: roles.background,
    [lazyTokenVars.color.onBackground]: roles.onBackground,
    [lazyTokenVars.color.surface]: roles.surface,
    [lazyTokenVars.color.onSurface]: roles.onSurface,
    [lazyTokenVars.color.surfaceVariant]: roles.surfaceVariant,
    [lazyTokenVars.color.onSurfaceVariant]: roles.onSurfaceVariant,
    [lazyTokenVars.color.surfaceContainerLow]: roles.surfaceContainerLow,
    [lazyTokenVars.color.surfaceContainer]: roles.surfaceContainer,
    [lazyTokenVars.color.surfaceContainerHigh]: roles.surfaceContainerHigh,
    [lazyTokenVars.color.outline]: roles.outline,
    [lazyTokenVars.color.outlineVariant]: roles.outlineVariant,
    [lazyTokenVars.color.inverseSurface]: roles.inverseSurface,
    [lazyTokenVars.color.inverseOnSurface]: roles.inverseOnSurface,
    [lazyTokenVars.color.error]: roles.error,
    [lazyTokenVars.color.onError]: roles.onError,
    [lazyTokenVars.color.focusRing]: roles.focusRing,
    [lazyTokenVars.color.borderMuted]: roles.borderMuted,
    [lazyTokenVars.color.stateHover]: roles.stateHover,
    [lazyTokenVars.color.statePressed]: roles.statePressed,
    [lazyTokenVars.color.stateSelected]: roles.stateSelected,
  });

  Object.assign(vars, createColorCompatibilityVars(vars));

  return vars;
}

export function createColorCompatibilityVars(vars: LazyCssVars): LazyCssVars {
  return {
    [lazyCompatibilityVars.color.source]: vars[lazyTokenVars.color.source],
    [lazyCompatibilityVars.color.primary]: vars[lazyTokenVars.color.primary],
    [lazyCompatibilityVars.color.onPrimary]: vars[lazyTokenVars.color.onPrimary],
    [lazyCompatibilityVars.color.primaryContainer]: vars[lazyTokenVars.color.primaryContainer],
    [lazyCompatibilityVars.color.onPrimaryContainer]: vars[lazyTokenVars.color.onPrimaryContainer],
    [lazyCompatibilityVars.color.secondary]: vars[lazyTokenVars.color.secondary],
    [lazyCompatibilityVars.color.onSecondary]: vars[lazyTokenVars.color.onSecondary],
    [lazyCompatibilityVars.color.secondaryContainer]: vars[lazyTokenVars.color.secondaryContainer],
    [lazyCompatibilityVars.color.onSecondaryContainer]: vars[lazyTokenVars.color.onSecondaryContainer],
    [lazyCompatibilityVars.color.tertiary]: vars[lazyTokenVars.color.tertiary],
    [lazyCompatibilityVars.color.onTertiary]: vars[lazyTokenVars.color.onTertiary],
    [lazyCompatibilityVars.color.tertiaryContainer]: vars[lazyTokenVars.color.tertiaryContainer],
    [lazyCompatibilityVars.color.onTertiaryContainer]: vars[lazyTokenVars.color.onTertiaryContainer],
    [lazyCompatibilityVars.color.background]: vars[lazyTokenVars.color.background],
    [lazyCompatibilityVars.color.onBackground]: vars[lazyTokenVars.color.onBackground],
    [lazyCompatibilityVars.color.surface]: vars[lazyTokenVars.color.surface],
    [lazyCompatibilityVars.color.onSurface]: vars[lazyTokenVars.color.onSurface],
    [lazyCompatibilityVars.color.surfaceVariant]: vars[lazyTokenVars.color.surfaceVariant],
    [lazyCompatibilityVars.color.onSurfaceVariant]: vars[lazyTokenVars.color.onSurfaceVariant],
    [lazyCompatibilityVars.color.surfaceContainerLow]: vars[lazyTokenVars.color.surfaceContainerLow],
    [lazyCompatibilityVars.color.surfaceContainer]: vars[lazyTokenVars.color.surfaceContainer],
    [lazyCompatibilityVars.color.surfaceContainerHigh]: vars[lazyTokenVars.color.surfaceContainerHigh],
    [lazyCompatibilityVars.color.outline]: vars[lazyTokenVars.color.outline],
    [lazyCompatibilityVars.color.outlineVariant]: vars[lazyTokenVars.color.outlineVariant],
    [lazyCompatibilityVars.color.inverseSurface]: vars[lazyTokenVars.color.inverseSurface],
    [lazyCompatibilityVars.color.inverseOnSurface]: vars[lazyTokenVars.color.inverseOnSurface],
    [lazyCompatibilityVars.color.error]: vars[lazyTokenVars.color.error],
    [lazyCompatibilityVars.color.onError]: vars[lazyTokenVars.color.onError],
    [lazyCompatibilityVars.color.focusRing]: vars[lazyTokenVars.color.focusRing],
    [lazyCompatibilityVars.color.borderMuted]: vars[lazyTokenVars.color.borderMuted],
    [lazyCompatibilityVars.color.stateHover]: vars[lazyTokenVars.color.stateHover],
    [lazyCompatibilityVars.color.statePressed]: vars[lazyTokenVars.color.statePressed],
    [lazyCompatibilityVars.color.stateSelected]: vars[lazyTokenVars.color.stateSelected],
  };
}

export function normalizeHex(value: string) {
  const trimmed = value.trim();
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
    return trimmed;
  }
  return "#1f8a70";
}

export function rgbToHex(red: number, green: number, blue: number) {
  return `#${[red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function clampTone(value: number) {
  return Math.max(0, Math.min(100, value));
}

function toKebab(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
