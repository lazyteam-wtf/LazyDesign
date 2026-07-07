import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from "@material/material-color-utilities";

const schemeKeys = [
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

export function createLazyVars(source: string, mode: LazyMode) {
  const theme = themeFromSourceColor(argbFromHex(source));
  const scheme = theme.schemes[mode].toJSON() as Record<string, number>;
  const vars: Record<string, string> = {};

  for (const key of schemeKeys) {
    vars[`--md-${toKebab(key)}`] = hexFromArgb(scheme[key]);
  }

  vars["--lazy-source"] = source;
  vars["--lazy-accent-a"] = hexFromArgb(theme.palettes.tertiary.tone(mode === "dark" ? 80 : 42));
  vars["--lazy-accent-b"] = mode === "dark" ? "#ffc857" : "#7c4d00";
  vars["--lazy-accent-c"] = mode === "dark" ? "#ffb4ab" : "#ba1a1a";
  vars["--md-surface-container-low"] = hexFromArgb(theme.palettes.neutral.tone(mode === "dark" ? 10 : 96));
  vars["--md-surface-container"] = hexFromArgb(theme.palettes.neutral.tone(mode === "dark" ? 14 : 94));
  vars["--md-surface-container-high"] = hexFromArgb(theme.palettes.neutral.tone(mode === "dark" ? 20 : 90));
  vars["--lazy-surface-glass"] =
    mode === "dark" ? "rgba(19, 21, 24, 0.72)" : "rgba(255, 255, 255, 0.76)";
  vars["--lazy-state-hover"] =
    mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.055)";
  vars["--lazy-state-pressed"] =
    mode === "dark" ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.1)";

  return vars;
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

function toKebab(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
