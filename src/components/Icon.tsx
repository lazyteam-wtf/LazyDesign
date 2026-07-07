import { forwardRef, type ComponentPropsWithoutRef, type ComponentType, type ReactNode } from "react";
import { cx } from "../primitives/utils";

export type LazyIconTone = "primary" | "muted" | "danger" | "inherit";
export type LazyIconSize = "sm" | "md" | "lg";

export type IconGlyphProps = {
  "aria-hidden"?: boolean;
  className?: string;
  focusable?: boolean | "false" | "true";
  size?: number | string;
  strokeWidth?: number | string;
};

export type IconProps = Omit<ComponentPropsWithoutRef<"span">, "color" | "children"> & {
  glyph?: ComponentType<IconGlyphProps>;
  children?: ReactNode;
  label?: string;
  tone?: LazyIconTone;
  size?: LazyIconSize;
  decorative?: boolean;
};

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  {
    children,
    className,
    decorative,
    glyph: Glyph,
    label,
    size = "md",
    tone = "inherit",
    ...props
  },
  ref,
) {
  const isDecorative = decorative ?? !label;

  return (
    <span
      {...props}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={isDecorative ? undefined : label}
      className={cx("ld-icon", className)}
      data-size={size}
      data-tone={tone}
      ref={ref}
      role={isDecorative ? undefined : "img"}
    >
      {Glyph ? <Glyph aria-hidden={true} className="ld-icon__glyph" focusable="false" size="1em" /> : children}
    </span>
  );
});
