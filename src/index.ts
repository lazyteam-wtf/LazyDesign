export * from "./core";
export {
  animateWithWebAnimations,
  createLazyMotion,
  createScopedMotion,
  lazyMotion,
  lazyWebMotionAdapter,
  type LazyMotionAdapter,
  type LazyMotionOptions,
  type LazyMotionPlayback,
  type LazyMotionRuntime,
  type LazyMotionRuntimeOptions,
  type LazyMotionTarget,
  type LazyScrollMotionOptions,
} from "./motion";
export { useLazyMotionPreference, useLazyMotionRecipe, useLazyMotionStyle } from "./motion/react";
export * from "./primitives";
export * from "./components";
export * from "./react/LazyProvider";
