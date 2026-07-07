import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { getIcon, type LazyIconGlyph, type LazyIconGlyphProps, type LazyIconName } from "./icon-registry";
import { cx } from "../primitives/utils";

export type LazyIconTone = "primary" | "muted" | "danger" | "inherit";
export type LazyIconSize = "sm" | "md" | "lg";

export type IconProps = Omit<ComponentPropsWithoutRef<"span">, "color" | "children"> & {
  name?: LazyIconName | (string & {});
  glyph?: LazyIconGlyph;
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
    name,
    size = "md",
    tone = "inherit",
    ...props
  },
  ref,
) {
  const isDecorative = decorative ?? !label;
  const RegisteredGlyph = name ? getIcon(name) : undefined;
  const ResolvedGlyph = Glyph ?? RegisteredGlyph;

  return (
    <span
      {...props}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={isDecorative ? undefined : label}
      className={cx("ld-icon", className)}
      data-size={size}
      data-name={name}
      data-tone={tone}
      ref={ref}
      role={isDecorative ? undefined : "img"}
    >
      {ResolvedGlyph ? (
        <ResolvedGlyph aria-hidden={true} className="ld-icon__glyph" focusable="false" size="1em" />
      ) : (
        children
      )}
    </span>
  );
});

export type { LazyIconGlyph, LazyIconGlyphProps, LazyIconName };
