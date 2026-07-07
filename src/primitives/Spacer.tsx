import { forwardRef, type ElementType, type ForwardedRef } from "react";
import { resolveSpace, type LazySpace } from "./tokens";
import { type LazyPrimitiveComponent, type LazyPrimitiveProps, type LazyStyle } from "./types";
import { compactVars, cx, mergeStyles } from "./utils";

export type LazySpacerAxis = "block" | "inline";

export type SpacerOwnProps = {
  size?: LazySpace;
  axis?: LazySpacerAxis;
};

export type SpacerProps<Element extends ElementType = "div"> = LazyPrimitiveProps<Element, SpacerOwnProps>;

export const Spacer = forwardRef(function Spacer(
  {
    as,
    axis = "block",
    className,
    size = "4",
    style,
    ...props
  }: SpacerProps<ElementType>,
  ref: ForwardedRef<HTMLElement>,
) {
  const Component = as ?? "div";
  const vars = compactVars({
    "--ld-spacer-size": resolveSpace(size),
  });

  return (
    <Component
      {...props}
      aria-hidden="true"
      className={cx("ld-spacer", className)}
      data-axis={axis}
      data-ld-primitive="spacer"
      ref={ref}
      style={mergeStyles(vars, style as LazyStyle | undefined)}
    />
  );
}) as LazyPrimitiveComponent<SpacerOwnProps, "div">;
