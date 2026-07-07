import { forwardRef, type ElementType, type ForwardedRef } from "react";
import {
  resolveRadius,
  resolveSpace,
  resolveSurface,
  type LazyRadius,
  type LazySpace,
  type LazySurfaceRole,
} from "./tokens";
import { type LazyPrimitiveComponent, type LazyPrimitiveProps, type LazyStyle } from "./types";
import { compactVars, cx, mergeStyles } from "./utils";

export type BoxOwnProps = {
  padding?: LazySpace;
  paddingX?: LazySpace;
  paddingY?: LazySpace;
  margin?: LazySpace;
  marginX?: LazySpace;
  marginY?: LazySpace;
  radius?: LazyRadius;
  surface?: LazySurfaceRole;
  border?: boolean;
};

export type BoxProps<Element extends ElementType = "div"> = LazyPrimitiveProps<Element, BoxOwnProps>;

export const Box = forwardRef(function Box(
  {
    as,
    border = false,
    className,
    margin,
    marginX,
    marginY,
    padding,
    paddingX,
    paddingY,
    radius,
    style,
    surface = "none",
    "data-ld-primitive": primitive = "box",
    ...props
  }: BoxProps<ElementType>,
  ref: ForwardedRef<HTMLElement>,
) {
  const Component = as ?? "div";
  const surfaceTokens = resolveSurface(surface);
  const vars = compactVars({
    "--ld-box-padding": resolveSpace(padding),
    "--ld-box-padding-x": resolveSpace(paddingX),
    "--ld-box-padding-y": resolveSpace(paddingY),
    "--ld-box-margin": resolveSpace(margin),
    "--ld-box-margin-x": resolveSpace(marginX),
    "--ld-box-margin-y": resolveSpace(marginY),
    "--ld-box-radius": resolveRadius(radius),
    "--ld-box-background": surfaceTokens.background,
    "--ld-box-foreground": surfaceTokens.foreground,
    "--ld-box-border-color": border ? surfaceTokens.border : "transparent",
    "--ld-box-border-width": border ? "1px" : "0px",
  });

  return (
    <Component
      {...props}
      className={cx("ld-box", className)}
      data-ld-primitive={primitive}
      data-radius={radius}
      data-surface={surface}
      ref={ref}
      style={mergeStyles(vars, style as LazyStyle | undefined)}
    />
  );
}) as LazyPrimitiveComponent<BoxOwnProps, "div">;
