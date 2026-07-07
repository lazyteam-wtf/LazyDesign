import {
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactElement,
} from "react";

export type LazyStyle = CSSProperties & Record<`--${string}`, string | number | undefined>;

export type LazyPrimitiveProps<Element extends ElementType, Props = object> = Props & {
  as?: Element;
} & Omit<ComponentPropsWithoutRef<Element>, keyof Props | "as" | "color">;

export type LazyPrimitiveComponent<Props, DefaultElement extends ElementType> = <
  Element extends ElementType = DefaultElement,
>(
  props: LazyPrimitiveProps<Element, Props> & {
    ref?: ComponentPropsWithRef<Element>["ref"];
  },
) => ReactElement | null;
