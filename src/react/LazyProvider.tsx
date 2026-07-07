import { createElement, useMemo, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { resolveTheme, type LazyTheme, type LazyThemeInput } from "../core/theme";
import { type LazyStyle } from "../primitives";

const defaultThemeInput: LazyThemeInput = {};

export type LazyProviderProps<Element extends ElementType = "div"> = {
  as?: Element;
  children?: ReactNode;
  theme?: LazyThemeInput | LazyTheme;
} & Omit<ComponentPropsWithoutRef<Element>, "as" | "color">;

export function LazyProvider<Element extends ElementType = "div">({
  as,
  children,
  theme = defaultThemeInput,
  style,
  ...props
}: LazyProviderProps<Element>) {
  const resolvedTheme = useMemo(() => {
    return isLazyTheme(theme) ? theme : resolveTheme(theme);
  }, [theme]);
  const Component = as ?? "div";
  const providerStyle = {
    ...resolvedTheme.vars,
    ...(style as LazyStyle | undefined),
  };

  return createElement(
    Component,
    {
      ...props,
      "data-ld-provider": "",
      "data-theme": resolvedTheme.source.mode,
      "data-theme-style": resolvedTheme.source.style,
      style: providerStyle,
    },
    children,
  );
}

function isLazyTheme(value: LazyThemeInput | LazyTheme): value is LazyTheme {
  return "vars" in value && "source" in value && "semantic" in value;
}
