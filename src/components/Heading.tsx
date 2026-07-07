import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Text, type LazyTextAlign, type LazyTextTone } from "../primitives";
import { cx } from "../primitives/utils";

export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingSize = "xl" | "lg" | "md";

export type HeadingProps = Omit<ComponentPropsWithoutRef<"h1">, "color"> & {
  level?: HeadingLevel;
  size?: HeadingSize;
  tone?: LazyTextTone;
  align?: LazyTextAlign;
  balance?: boolean;
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  {
    balance = true,
    className,
    level = 2,
    size,
    tone = "primary",
    ...props
  },
  ref,
) {
  const resolvedSize = size ?? resolveHeadingSize(level);

  return (
    <Text
      {...props}
      as={`h${level}`}
      balance={balance}
      className={cx("ld-heading", className)}
      data-level={level}
      ref={ref}
      tone={tone}
      variant={`heading-${resolvedSize}`}
    />
  );
});

function resolveHeadingSize(level: HeadingLevel): HeadingSize {
  if (level === 1) return "xl";
  if (level === 2) return "lg";
  return "md";
}
