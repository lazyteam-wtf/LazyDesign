import {
  AlertCircle,
  Check,
  ChevronDown,
  Info,
  LoaderCircle,
  Minus,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  Upload,
  X,
} from "lucide-react";
import { type ComponentType } from "react";

export type LazyIconGlyphProps = {
  "aria-hidden"?: boolean;
  className?: string;
  focusable?: boolean | "false" | "true";
  size?: number | string;
  strokeWidth?: number | string;
};

export type LazyIconGlyph = ComponentType<LazyIconGlyphProps>;

export const lazyDefaultIcons = {
  alert: AlertCircle,
  check: Check,
  "chevron-down": ChevronDown,
  info: Info,
  loading: LoaderCircle,
  minus: Minus,
  moon: Moon,
  plus: Plus,
  search: Search,
  settings: Settings,
  sun: Sun,
  upload: Upload,
  x: X,
} as const satisfies Record<string, LazyIconGlyph>;

export type LazyIconName = keyof typeof lazyDefaultIcons;

const iconRegistry = new Map<string, LazyIconGlyph>(Object.entries(lazyDefaultIcons));

export function registerIcon(name: string, glyph: LazyIconGlyph) {
  iconRegistry.set(name, glyph);
}

export function getIcon(name: string): LazyIconGlyph | undefined {
  return iconRegistry.get(name);
}

export function listIcons() {
  return [...iconRegistry.keys()];
}
