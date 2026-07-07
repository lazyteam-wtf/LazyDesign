import { type LazyCssVars, lazyCompatibilityVars, lazyTokenVars } from "./tokens";

export type LazyMotionPreference = "system" | "reduced";
export type LazyMotionPreset = "fade" | "slide" | "scale" | "reveal" | "scroll";

export type LazyMotionRecipe = {
  name: LazyMotionPreset;
  duration: string;
  easing: string;
  properties: readonly string[];
  from: Record<string, string | number>;
  to: Record<string, string | number>;
};

export const lazyMotionValues = {
  duration: {
    instant: "80ms",
    fast: "150ms",
    normal: "250ms",
    emphasized: "420ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    enter: "cubic-bezier(0.16, 1, 0.3, 1)",
    exit: "cubic-bezier(0.7, 0, 0.84, 0)",
    emphasized: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

export const lazyMotionPresets: Record<
  LazyMotionPreset,
  {
    duration: keyof typeof lazyMotionValues.duration;
    easing: keyof typeof lazyMotionValues.easing;
    properties: readonly string[];
    from: Record<string, string | number>;
    to: Record<string, string | number>;
  }
> = {
  fade: {
    duration: "fast",
    easing: "standard",
    properties: ["opacity"],
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slide: {
    duration: "normal",
    easing: "enter",
    properties: ["opacity", "transform"],
    from: { opacity: 0, y: 8 },
    to: { opacity: 1, y: 0 },
  },
  scale: {
    duration: "fast",
    easing: "standard",
    properties: ["opacity", "transform"],
    from: { opacity: 0, scale: 0.98 },
    to: { opacity: 1, scale: 1 },
  },
  reveal: {
    duration: "emphasized",
    easing: "emphasized",
    properties: ["opacity", "transform"],
    from: { opacity: 0, y: 24 },
    to: { opacity: 1, y: 0 },
  },
  scroll: {
    duration: "emphasized",
    easing: "emphasized",
    properties: ["opacity", "transform", "clip-path"],
    from: { opacity: 0.4, y: 28 },
    to: { opacity: 1, y: 0 },
  },
};

export function createMotionVars(preference: LazyMotionPreference = "system"): LazyCssVars {
  const factor = preference === "reduced" ? 0.25 : 1;
  const vars: LazyCssVars = {
    [lazyTokenVars.motion.durationInstant]: scaleDuration(lazyMotionValues.duration.instant, factor),
    [lazyTokenVars.motion.durationFast]: scaleDuration(lazyMotionValues.duration.fast, factor),
    [lazyTokenVars.motion.durationNormal]: scaleDuration(lazyMotionValues.duration.normal, factor),
    [lazyTokenVars.motion.durationEmphasized]: scaleDuration(lazyMotionValues.duration.emphasized, factor),
    [lazyTokenVars.motion.easingStandard]: lazyMotionValues.easing.standard,
    [lazyTokenVars.motion.easingEnter]: lazyMotionValues.easing.enter,
    [lazyTokenVars.motion.easingExit]: lazyMotionValues.easing.exit,
    [lazyTokenVars.motion.easingEmphasized]: lazyMotionValues.easing.emphasized,
  };

  Object.assign(vars, {
    [lazyCompatibilityVars.motion.durationInstant]: vars[lazyTokenVars.motion.durationInstant],
    [lazyCompatibilityVars.motion.durationFast]: vars[lazyTokenVars.motion.durationFast],
    [lazyCompatibilityVars.motion.durationNormal]: vars[lazyTokenVars.motion.durationNormal],
    [lazyCompatibilityVars.motion.durationEmphasized]: vars[lazyTokenVars.motion.durationEmphasized],
    [lazyCompatibilityVars.motion.easingStandard]: vars[lazyTokenVars.motion.easingStandard],
    [lazyCompatibilityVars.motion.easingEnter]: vars[lazyTokenVars.motion.easingEnter],
    [lazyCompatibilityVars.motion.easingExit]: vars[lazyTokenVars.motion.easingExit],
    [lazyCompatibilityVars.motion.easingEmphasized]: vars[lazyTokenVars.motion.easingEmphasized],
  });

  return vars;
}

export function createMotionRecipe(name: LazyMotionPreset, preference: LazyMotionPreference = "system"): LazyMotionRecipe {
  const preset = lazyMotionPresets[name];
  const factor = preference === "reduced" ? 0.25 : 1;

  return {
    name,
    duration: scaleDuration(lazyMotionValues.duration[preset.duration], factor),
    easing: lazyMotionValues.easing[preset.easing],
    properties: preset.properties,
    from: preference === "reduced" ? { opacity: preset.from.opacity ?? 0 } : preset.from,
    to: preference === "reduced" ? { opacity: preset.to.opacity ?? 1 } : preset.to,
  };
}

function scaleDuration(value: string, factor: number) {
  return `${Math.round(Number.parseFloat(value) * factor)}ms`;
}
