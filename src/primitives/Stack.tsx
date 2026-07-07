import { forwardRef, type ElementType, type ForwardedRef } from "react";
import { Box, type BoxOwnProps, type BoxProps } from "./Box";
import { resolveSpace, type LazySpace } from "./tokens";
import { type LazyPrimitiveComponent, type LazyPrimitiveProps, type LazyStyle } from "./types";
import { compactVars, cx, mergeStyles } from "./utils";

export type LazyStackDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type LazyStackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type LazyStackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

export type StackOwnProps = BoxOwnProps & {
  direction?: LazyStackDirection;
  gap?: LazySpace;
  rowGap?: LazySpace;
  columnGap?: LazySpace;
  align?: LazyStackAlign;
  justify?: LazyStackJustify;
  wrap?: boolean;
};

export type StackProps<Element extends ElementType = "div"> = LazyPrimitiveProps<Element, StackOwnProps>;

export const Stack = forwardRef(function Stack(
  {
    align = "stretch",
    className,
    columnGap,
    direction = "column",
    gap = "4",
    justify = "start",
    rowGap,
    style,
    wrap = false,
    ...props
  }: StackProps<ElementType>,
  ref: ForwardedRef<HTMLElement>,
) {
  const vars = compactVars({
    "--ld-stack-direction": direction,
    "--ld-stack-gap": resolveSpace(gap),
    "--ld-stack-row-gap": resolveSpace(rowGap),
    "--ld-stack-column-gap": resolveSpace(columnGap),
    "--ld-stack-align": resolveAlign(align),
    "--ld-stack-justify": resolveJustify(justify),
    "--ld-stack-wrap": wrap ? "wrap" : "nowrap",
  });

  return (
    <Box
      {...(props as BoxProps)}
      className={cx("ld-stack", className)}
      data-align={align}
      data-direction={direction}
      data-ld-primitive="stack"
      data-wrap={wrap ? "" : undefined}
      ref={ref as ForwardedRef<HTMLDivElement>}
      style={mergeStyles(vars, style as LazyStyle | undefined)}
    />
  );
}) as LazyPrimitiveComponent<StackOwnProps, "div">;

function resolveAlign(value: LazyStackAlign) {
  if (value === "start") return "flex-start";
  if (value === "end") return "flex-end";
  return value;
}

function resolveJustify(value: LazyStackJustify) {
  if (value === "start") return "flex-start";
  if (value === "end") return "flex-end";
  if (value === "between") return "space-between";
  if (value === "around") return "space-around";
  if (value === "evenly") return "space-evenly";
  return value;
}
