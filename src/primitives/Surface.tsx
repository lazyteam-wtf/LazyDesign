import { forwardRef, type ElementType, type ForwardedRef } from "react";
import { Box, type BoxOwnProps, type BoxProps } from "./Box";
import { type LazyRadius, type LazySurfaceRole } from "./tokens";
import { type LazyPrimitiveComponent, type LazyPrimitiveProps } from "./types";
import { cx } from "./utils";

export type LazySurfaceLevel = 0 | 1 | 2 | 3 | "canvas" | "surface" | "container" | "elevated" | "overlay";

export type SurfaceOwnProps = Omit<BoxOwnProps, "surface" | "border"> & {
  level?: LazySurfaceLevel;
  border?: boolean;
  interactive?: boolean;
};

export type SurfaceProps<Element extends ElementType = "section"> = LazyPrimitiveProps<Element, SurfaceOwnProps>;

export const Surface = forwardRef(function Surface(
  {
    as,
    border,
    className,
    interactive = false,
    level = "surface",
    radius,
    ...props
  }: SurfaceProps<ElementType>,
  ref: ForwardedRef<HTMLElement>,
) {
  const surface = resolveSurfaceLevel(level);
  const hasBorder = border ?? (surface !== "canvas" && surface !== "level-0");
  const resolvedRadius = radius ?? resolveSurfaceRadius(level);

  return (
    <Box
      {...(props as BoxProps)}
      as={as ?? "section"}
      border={hasBorder}
      className={cx("ld-surface", interactive && "ld-surface--interactive", className)}
      data-interactive={interactive ? "" : undefined}
      data-ld-primitive="surface"
      data-level={String(level)}
      radius={resolvedRadius}
      ref={ref}
      surface={surface}
    />
  );
}) as LazyPrimitiveComponent<SurfaceOwnProps, "section">;

function resolveSurfaceLevel(level: LazySurfaceLevel): LazySurfaceRole {
  if (level === 0 || level === "canvas") return "canvas";
  if (level === 1 || level === "surface") return "surface";
  if (level === 2 || level === "container") return "container";
  if (level === 3 || level === "elevated") return "elevated";
  return "overlay";
}

function resolveSurfaceRadius(level: LazySurfaceLevel): LazyRadius {
  if (level === 0 || level === "canvas") return "none";
  if (level === "overlay") return "large";
  return "medium";
}
