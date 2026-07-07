import { lazyComponentTokens } from "../core/components";
import { lazyTokens } from "../core/tokens";

export type LazySpace =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "12"
  | "16"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";

export type LazyRadius =
  | "none"
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large"
  | "full"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl";

export type LazySurfaceRole =
  | "none"
  | "canvas"
  | "default"
  | "surface"
  | "container"
  | "elevated"
  | "overlay"
  | "level-0"
  | "level-1"
  | "level-2"
  | "level-3";

export type LazyTextVariant =
  | "display"
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "label"
  | "code";

export type LazyTextTone = "primary" | "muted" | "link" | "code" | "inherit";

export const lazySpaceMap: Record<LazySpace, string> = {
  "0": "0px",
  "1": lazyTokens.space[1],
  "2": lazyTokens.space[2],
  "3": lazyTokens.space[3],
  "4": lazyTokens.space[4],
  "6": lazyTokens.space[6],
  "8": lazyTokens.space[8],
  "12": lazyTokens.space[12],
  "16": lazyTokens.space[16],
  "2xs": lazyTokens.space[1],
  xs: lazyTokens.space[2],
  sm: lazyTokens.space[3],
  md: lazyTokens.space[4],
  lg: lazyTokens.space[6],
  xl: lazyTokens.space[8],
  "2xl": lazyTokens.space[12],
  "3xl": lazyTokens.space[16],
};

export const lazyRadiusMap: Record<LazyRadius, string> = {
  none: "0px",
  "extra-small": lazyTokens.shape.cornerExtraSmall,
  small: lazyTokens.shape.cornerSmall,
  medium: lazyTokens.shape.cornerMedium,
  large: lazyTokens.shape.cornerLarge,
  "extra-large": lazyTokens.shape.cornerExtraLarge,
  full: lazyTokens.shape.cornerFull,
  xs: lazyTokens.shape.cornerExtraSmall,
  sm: lazyTokens.shape.cornerSmall,
  md: lazyTokens.shape.cornerMedium,
  lg: lazyTokens.shape.cornerLarge,
  xl: lazyTokens.shape.cornerExtraLarge,
};

export const lazySurfaceMap: Record<
  LazySurfaceRole,
  {
    background: string;
    foreground: string;
    border: string;
  }
> = {
  none: {
    background: "transparent",
    foreground: "inherit",
    border: "transparent",
  },
  canvas: {
    background: lazyComponentTokens.surface.level0,
    foreground: lazyComponentTokens.surface.foreground,
    border: "transparent",
  },
  default: {
    background: lazyComponentTokens.surface.background,
    foreground: lazyComponentTokens.surface.foreground,
    border: lazyComponentTokens.surface.border,
  },
  surface: {
    background: lazyComponentTokens.surface.level1,
    foreground: lazyComponentTokens.surface.foreground,
    border: lazyComponentTokens.surface.border,
  },
  container: {
    background: lazyComponentTokens.surface.level2,
    foreground: lazyComponentTokens.surface.foreground,
    border: lazyComponentTokens.surface.border,
  },
  elevated: {
    background: lazyComponentTokens.surface.level3,
    foreground: lazyComponentTokens.surface.foreground,
    border: lazyComponentTokens.surface.border,
  },
  overlay: {
    background: lazyComponentTokens.surface.level3,
    foreground: lazyComponentTokens.surface.foreground,
    border: lazyComponentTokens.surface.border,
  },
  "level-0": {
    background: lazyComponentTokens.surface.level0,
    foreground: lazyComponentTokens.surface.foreground,
    border: "transparent",
  },
  "level-1": {
    background: lazyComponentTokens.surface.level1,
    foreground: lazyComponentTokens.surface.foreground,
    border: lazyComponentTokens.surface.border,
  },
  "level-2": {
    background: lazyComponentTokens.surface.level2,
    foreground: lazyComponentTokens.surface.foreground,
    border: lazyComponentTokens.surface.border,
  },
  "level-3": {
    background: lazyComponentTokens.surface.level3,
    foreground: lazyComponentTokens.surface.foreground,
    border: lazyComponentTokens.surface.border,
  },
};

export const lazyTextVariantMap: Record<LazyTextVariant, string> = {
  display: lazyTokens.typography.display,
  "heading-xl": lazyTokens.typography.headingXl,
  "heading-lg": lazyTokens.typography.headingLg,
  "heading-md": lazyTokens.typography.headingMd,
  "body-lg": lazyTokens.typography.bodyLg,
  "body-md": lazyTokens.typography.bodyMd,
  "body-sm": lazyTokens.typography.bodySm,
  label: lazyTokens.typography.label,
  code: lazyTokens.typography.code,
};

export const lazyTextToneMap: Record<LazyTextTone, string> = {
  primary: lazyComponentTokens.text.primary,
  muted: lazyComponentTokens.text.muted,
  link: lazyComponentTokens.text.link,
  code: lazyComponentTokens.text.code,
  inherit: "inherit",
};

export function resolveSpace(value: LazySpace | undefined) {
  return value == null ? undefined : lazySpaceMap[value];
}

export function resolveRadius(value: LazyRadius | undefined) {
  return value == null ? undefined : lazyRadiusMap[value];
}

export function resolveSurface(value: LazySurfaceRole | undefined) {
  return lazySurfaceMap[value ?? "none"];
}

export function resolveTextVariant(value: LazyTextVariant | undefined) {
  return lazyTextVariantMap[value ?? "body-md"];
}

export function resolveTextTone(value: LazyTextTone | undefined) {
  return lazyTextToneMap[value ?? "primary"];
}
