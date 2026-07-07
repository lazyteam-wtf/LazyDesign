import { forwardRef, type ElementType, type ForwardedRef } from "react";
import { type LazyPrimitiveComponent, type LazyPrimitiveProps } from "./types";
import { cx } from "./utils";

export type LazyDividerOrientation = "horizontal" | "vertical";

export type DividerOwnProps = {
  orientation?: LazyDividerOrientation;
  decorative?: boolean;
};

export type DividerProps<Element extends ElementType = "div"> = LazyPrimitiveProps<Element, DividerOwnProps>;

export const Divider = forwardRef(function Divider(
  {
    as,
    className,
    decorative = true,
    orientation = "horizontal",
    role,
    ...props
  }: DividerProps<ElementType>,
  ref: ForwardedRef<HTMLElement>,
) {
  const Component = as ?? "div";

  return (
    <Component
      {...props}
      aria-hidden={decorative ? true : undefined}
      aria-orientation={decorative ? undefined : orientation}
      className={cx("ld-divider", className)}
      data-ld-primitive="divider"
      data-orientation={orientation}
      ref={ref}
      role={decorative ? "presentation" : (role ?? "separator")}
    />
  );
}) as LazyPrimitiveComponent<DividerOwnProps, "div">;
