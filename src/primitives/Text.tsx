import { forwardRef, type ElementType, type ForwardedRef } from "react";
import {
  resolveTextTone,
  resolveTextVariant,
  type LazyTextTone,
  type LazyTextVariant,
} from "./tokens";
import { type LazyPrimitiveComponent, type LazyPrimitiveProps, type LazyStyle } from "./types";
import { compactVars, cx, mergeStyles } from "./utils";

export type LazyTextAlign = "start" | "center" | "end";

export type TextOwnProps = {
  variant?: LazyTextVariant;
  tone?: LazyTextTone;
  align?: LazyTextAlign;
  truncate?: boolean;
  balance?: boolean;
  lineClamp?: number;
};

export type TextProps<Element extends ElementType = "span"> = LazyPrimitiveProps<Element, TextOwnProps>;

export const Text = forwardRef(function Text(
  {
    align = "start",
    as,
    balance = false,
    className,
    lineClamp,
    style,
    tone = "primary",
    truncate = false,
    variant = "body-md",
    ...props
  }: TextProps<ElementType>,
  ref: ForwardedRef<HTMLElement>,
) {
  const Component = as ?? getDefaultTextElement(variant);
  const vars = compactVars({
    "--ld-text-font": resolveTextVariant(variant),
    "--ld-text-color": resolveTextTone(tone),
    "--ld-text-align": align,
    "--ld-text-line-clamp": lineClamp,
  });

  return (
    <Component
      {...props}
      className={cx("ld-text", truncate && "ld-text--truncate", lineClamp != null && "ld-text--clamp", className)}
      data-balance={balance ? "" : undefined}
      data-ld-primitive="text"
      data-tone={tone}
      data-variant={variant}
      ref={ref}
      style={mergeStyles(vars, style as LazyStyle | undefined)}
    />
  );
}) as LazyPrimitiveComponent<TextOwnProps, "span">;

function getDefaultTextElement(variant: LazyTextVariant): ElementType {
  if (variant === "display" || variant === "heading-xl") return "h1";
  if (variant === "heading-lg") return "h2";
  if (variant === "heading-md") return "h3";
  if (variant === "body-lg" || variant === "body-md" || variant === "body-sm") return "p";
  if (variant === "code") return "code";
  return "span";
}
