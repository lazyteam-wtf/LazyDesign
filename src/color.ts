import { normalizeHex, type LazyMode } from "./core/color";
import { createThemeVars } from "./core/theme";

export { normalizeHex, rgbToHex, type LazyMode } from "./core/color";

export function createLazyVars(source: string, mode: LazyMode) {
  return createThemeVars({ source: normalizeHex(source), mode });
}
