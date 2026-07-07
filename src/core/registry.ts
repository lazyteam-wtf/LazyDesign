import { lazyComponentTokenVars } from "./components";
import { lazyCompatibilityVars, lazyTokenVars } from "./tokens";

export type LazyTokenType = "color" | "space" | "shape" | "motion" | "typography" | "component" | "density";
export type LazyTokenCategory = "source" | "foundation" | "semantic" | "component" | "runtime" | "compatibility";
export type LazyTokenStatus = "stable" | "experimental" | "deprecated";

export type LazyTokenMetadata = {
  name: string;
  variable: string;
  value: string;
  type: LazyTokenType;
  category: LazyTokenCategory;
  status: LazyTokenStatus;
  description: string;
  replacement?: string;
  introducedIn: string;
};

const currentContractVersion = "0.2.2";

const tokenDescriptions: Record<string, string> = {
  "color.source": "Normalized seed color used by the dynamic theme engine.",
  "color.primary": "Main interactive color for primary action and active state.",
  "color.on-primary": "Foreground content placed on the primary color.",
  "color.primary-container": "Lower-emphasis primary container surface.",
  "color.on-primary-container": "Foreground content placed on the primary container.",
  "color.secondary": "Supporting action and filter color.",
  "color.tertiary": "Contextual accent for metadata and product state.",
  "color.background": "Application canvas.",
  "color.on-background": "Primary content placed on the application canvas.",
  "color.surface": "Base component surface.",
  "color.on-surface": "Primary content placed on surfaces.",
  "color.on-surface-variant": "Secondary content placed on surfaces.",
  "color.outline": "Strong divider and border color.",
  "color.outline-variant": "Subtle divider and border color.",
  "color.error": "Destructive action and validation color.",
  "color.focus-ring": "Accessible focus indicator.",
  "space.1": "4px base unit.",
  "shape.corner-medium": "Default professional corner radius.",
  "motion.duration-fast": "Fast feedback duration.",
  "motion.easing-standard": "Default UI easing curve.",
  "typography.body-md": "Default interface body text.",
  "component.surface.background": "Default surface background consumed by surface primitives.",
  "component.surface.border": "Default surface border consumed by surface primitives.",
  "component.text.primary": "Primary text color consumed by typography primitives.",
  "component.text.muted": "Muted text color consumed by typography primitives.",
  "component.button.background": "Default neutral button background.",
  "component.button.primary-background": "Primary button background.",
  "component.button.radius": "Button radius resolved from the active style mode.",
  "component.input.background": "Input field background.",
  "component.input.border-focus": "Input border color in focus state.",
  "density.scale": "Runtime density multiplier for compact and standard layouts.",
};

const compatibilityReplacements = {
  color: lazyTokenVars.color,
  shape: lazyTokenVars.shape,
  motion: lazyTokenVars.motion,
  space: {
    "2xs": lazyTokenVars.space[1],
    xs: lazyTokenVars.space[2],
    sm: lazyTokenVars.space[3],
    md: lazyTokenVars.space[4],
    lg: lazyTokenVars.space[6],
    xl: lazyTokenVars.space[8],
    "2xl": lazyTokenVars.space[12],
    "3xl": lazyTokenVars.space[16],
  },
  typography: lazyTokenVars.typography,
} as const;

export const lazyPublicTokenRegistry = [
  ...defineTokenGroup("color", lazyTokenVars.color, "color", "semantic"),
  ...defineTokenGroup("space", lazyTokenVars.space, "space", "foundation"),
  ...defineTokenGroup("shape", lazyTokenVars.shape, "shape", "foundation"),
  ...defineTokenGroup("motion", lazyTokenVars.motion, "motion", "foundation"),
  ...defineTokenGroup("typography", lazyTokenVars.typography, "typography", "foundation"),
  {
    name: "density.scale",
    variable: "--ld-density",
    value: "var(--ld-density)",
    type: "density",
    category: "runtime",
    status: "stable",
    description: tokenDescriptions["density.scale"],
    introducedIn: currentContractVersion,
  },
] as const satisfies readonly LazyTokenMetadata[];

export const lazyComponentTokenRegistry = Object.entries(lazyComponentTokenVars).flatMap(([group, tokens]) =>
  defineTokenGroup(`component.${group}`, tokens, "component", "component"),
) as readonly LazyTokenMetadata[];

export const lazyCompatibilityTokenRegistry = Object.entries(lazyCompatibilityVars).flatMap(([group, tokens]) =>
  defineCompatibilityGroup(group, tokens),
) as readonly LazyTokenMetadata[];

export const lazyTokenRegistry = [
  ...lazyPublicTokenRegistry,
  ...lazyComponentTokenRegistry,
] as const satisfies readonly LazyTokenMetadata[];

export const lazyAllTokenRegistry = [
  ...lazyTokenRegistry,
  ...lazyCompatibilityTokenRegistry,
] as const satisfies readonly LazyTokenMetadata[];

export function getLazyToken(nameOrVariable: string): LazyTokenMetadata | undefined {
  return lazyAllTokenRegistry.find((token) => token.name === nameOrVariable || token.variable === nameOrVariable);
}

export function getLazyTokensByCategory(category: LazyTokenCategory) {
  return lazyAllTokenRegistry.filter((token) => token.category === category);
}

export function getLazyTokensByType(type: LazyTokenType) {
  return lazyAllTokenRegistry.filter((token) => token.type === type);
}

function defineTokenGroup(
  group: string,
  tokens: Record<string, string>,
  type: LazyTokenType,
  category: LazyTokenCategory,
): LazyTokenMetadata[] {
  return Object.entries(tokens).map(([key, variable]) => {
    const name = `${group}.${toKebab(key)}`;

    return {
      name,
      variable,
      value: `var(${variable})`,
      type,
      category: name === "color.source" ? "source" : category,
      status: "stable",
      description: describeToken(name, category),
      introducedIn: currentContractVersion,
    };
  });
}

function defineCompatibilityGroup(group: string, tokens: Record<string, string>): LazyTokenMetadata[] {
  return Object.entries(tokens).map(([key, variable]) => {
    const name = `${group}.${toKebab(key)}`;
    const replacement = getCompatibilityReplacement(group, key);

    return {
      name,
      variable,
      value: replacement ? `var(${replacement})` : `var(${variable})`,
      type: toTokenType(group),
      category: "compatibility",
      status: "deprecated",
      replacement,
      description: `Compatibility alias for ${replacement ?? "the public LazyDesign token contract"}.`,
      introducedIn: "0.2.1",
    };
  });
}

function getCompatibilityReplacement(group: string, key: string) {
  const replacements = compatibilityReplacements[group as keyof typeof compatibilityReplacements] as
    | Record<string, string>
    | undefined;
  return replacements?.[key];
}

function describeToken(name: string, category: LazyTokenCategory) {
  return tokenDescriptions[name] ?? `${sentenceCase(category)} token ${name}.`;
}

function toTokenType(group: string): LazyTokenType {
  if (group === "color" || group === "space" || group === "shape" || group === "motion" || group === "typography") {
    return group;
  }

  return "component";
}

function sentenceCase(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function toKebab(value: string) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
