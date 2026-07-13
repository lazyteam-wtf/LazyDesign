export {
  createMotionRecipe,
  createMotionVars,
  lazyMotionPresets,
  lazyMotionValues,
  type LazyMotionPreference,
  type LazyMotionPreset,
  type LazyMotionRecipe,
} from "../core/motion";
export { createLazyMotion, createScopedMotion, lazyMotion, type LazyMotionRuntimeOptions } from "./runtime";
export { animateWithWebAnimations, lazyWebMotionAdapter } from "./web";
export {
  type LazyMotionAdapter,
  type LazyMotionOptions,
  type LazyMotionPlayback,
  type LazyMotionRuntime,
  type LazyMotionTarget,
  type LazyScrollMotionOptions,
} from "./types";
