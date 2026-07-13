import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Heading, type HeadingLevel } from "./Heading";
import { cx } from "../primitives/utils";

export type LazyCardPadding = "none" | "sm" | "md" | "lg";

export type CardProps = Omit<ComponentPropsWithoutRef<"article">, "title"> & {
  interactive?: boolean;
  padding?: LazyCardPadding;
};

export type CardHeaderProps = ComponentPropsWithoutRef<"div">;
export type CardContentProps = ComponentPropsWithoutRef<"div">;
export type CardFooterProps = ComponentPropsWithoutRef<"div">;
export type CardTitleProps = Omit<ComponentPropsWithoutRef<"h3">, "title"> & {
  level?: HeadingLevel;
};
export type CardDescriptionProps = ComponentPropsWithoutRef<"p">;

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  {
    className,
    interactive = false,
    padding = "md",
    ...props
  },
  ref,
) {
  return (
    <article
      {...props}
      className={cx("ld-card", className)}
      data-interactive={interactive ? "" : undefined}
      data-padding={padding}
      ref={ref}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, ...props },
  ref,
) {
  return <div {...props} className={cx("ld-card__header", className)} ref={ref} />;
});

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  {
    className,
    level = 3,
    ...props
  },
  ref,
) {
  return <Heading {...props} className={cx("ld-card__title", className)} level={level} ref={ref} size="md" />;
});

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(function CardDescription(
  { className, ...props },
  ref,
) {
  return <p {...props} className={cx("ld-card__description", className)} ref={ref} />;
});

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { className, ...props },
  ref,
) {
  return <div {...props} className={cx("ld-card__content", className)} ref={ref} />;
});

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, ...props },
  ref,
) {
  return <div {...props} className={cx("ld-card__footer", className)} ref={ref} />;
});

export function CardMeta({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <div className="ld-card__meta">{children}</div>;
}
