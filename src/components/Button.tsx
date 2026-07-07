import { forwardRef } from "react";
import { type LazyComponentSize, type LazyIconSlot, type LazyIntent, type LazyMotion, type NativeButtonProps } from "./types";
import { cx } from "../primitives/utils";

export type LazyButtonVariant = "solid" | "soft" | "outline" | "ghost";

export type ButtonProps = NativeButtonProps & {
  intent?: LazyIntent;
  variant?: LazyButtonVariant;
  size?: LazyComponentSize;
  motion?: LazyMotion;
  loading?: boolean;
  iconStart?: LazyIconSlot;
  iconEnd?: LazyIconSlot;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    disabled,
    iconEnd,
    iconStart,
    intent = "neutral",
    loading = false,
    motion = "soft",
    size = "md",
    type = "button",
    variant = "solid",
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={cx("ld-button", className)}
      data-intent={intent}
      data-loading={loading ? "" : undefined}
      data-motion={motion}
      data-size={size}
      data-variant={variant}
      disabled={isDisabled}
      ref={ref}
      type={type}
    >
      {loading ? <span aria-hidden="true" className="ld-button__spinner" /> : iconStart}
      {children ? <span className="ld-button__content">{children}</span> : null}
      {iconEnd}
    </button>
  );
});
