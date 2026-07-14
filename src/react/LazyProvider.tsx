import {
  createContext,
  createElement,
  useEffect,
  useContext,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { resolveTheme, type LazyTheme, type LazyThemeInput } from "../core/theme";
import { type LazyStyle } from "../primitives";

const defaultThemeInput: LazyThemeInput = {};
const defaultResolvedTheme = resolveTheme(defaultThemeInput);

export type LazyProviderContextValue = {
  theme: LazyTheme;
};

const LazyThemeContext = createContext<LazyProviderContextValue>({
  theme: defaultResolvedTheme,
});

export type LazyProviderProps<Element extends ElementType = "div"> = {
  applyToDocument?: boolean;
  as?: Element;
  children?: ReactNode;
  theme?: LazyThemeInput | LazyTheme;
} & Omit<ComponentPropsWithoutRef<Element>, "as" | "color">;

export function LazyProvider<Element extends ElementType = "div">({
  applyToDocument = true,
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
  const contextValue = useMemo(() => ({ theme: resolvedTheme }), [resolvedTheme]);

  useEffect(() => {
    if (!applyToDocument || typeof document === "undefined") return;

    resolvedTheme.apply(document.documentElement);
  }, [applyToDocument, resolvedTheme]);

  return createElement(
    LazyThemeContext.Provider,
    { value: contextValue },
    createElement(
      Component,
      {
        ...props,
        "data-ld-provider": "",
        "data-theme": resolvedTheme.source.mode,
        "data-theme-style": resolvedTheme.source.style,
        style: providerStyle,
      },
      children,
    ),
  );
}

export function useLazyTheme() {
  return useContext(LazyThemeContext).theme;
}

export function useLazyThemeVars() {
  return useLazyTheme().vars;
}

function isLazyTheme(value: LazyThemeInput | LazyTheme): value is LazyTheme {
  return "vars" in value && "source" in value && "semantic" in value;
}
