import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { type LazyComponentSize, type LazyIconSlot, type LazyIntent } from "./types";
import { cx } from "../primitives/utils";

export type LazyBadgeVariant = "soft" | "outline" | "solid";

export type BadgeProps = Omit<ComponentPropsWithoutRef<"span">, "color"> & {
  intent?: LazyIntent;
  variant?: LazyBadgeVariant;
  size?: Exclude<LazyComponentSize, "lg">;
  iconStart?: LazyIconSlot;
  iconEnd?: LazyIconSlot;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    children,
    className,
    iconEnd,
    iconStart,
    intent = "neutral",
    size = "md",
    variant = "soft",
    ...props
  },
  ref,
) {
  return (
    <span
      {...props}
      className={cx("ld-badge", className)}
      data-intent={intent}
      data-size={size}
      data-variant={variant}
      ref={ref}
    >
      {iconStart}
      {children ? <span className="ld-badge__content">{children}</span> : null}
      {iconEnd}
    </span>
  );
});
