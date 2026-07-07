import { type LazyStyle } from "./types";

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function mergeStyles(vars: LazyStyle, style: LazyStyle | undefined): LazyStyle {
  return {
    ...vars,
    ...style,
  };
}

export function compactVars(vars: LazyStyle): LazyStyle {
  return Object.fromEntries(Object.entries(vars).filter(([, value]) => value != null && value !== "")) as LazyStyle;
}
