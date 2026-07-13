import { createMotionRecipe, type LazyMotionPreference, type LazyMotionPreset } from "../core/motion";
import { type LazyMotionAdapter, type LazyMotionRuntime, type LazyMotionTarget } from "./types";
import { lazyWebMotionAdapter } from "./web";

export type LazyMotionRuntimeOptions = {
  adapter?: LazyMotionAdapter;
  preference?: LazyMotionPreference;
};

export function createLazyMotion(options: LazyMotionRuntimeOptions = {}): LazyMotionRuntime {
  const adapter = options.adapter ?? lazyWebMotionAdapter;
  const preference = options.preference ?? "system";

  return {
    adapter,
    preference,
    recipe(name, recipePreference = preference) {
      return createMotionRecipe(name, recipePreference);
    },
    animate(target, name, animationOptions) {
      const recipePreference = animationOptions?.preference ?? preference;
      return adapter.animate(target, createMotionRecipe(name, recipePreference), animationOptions);
    },
    scroll(target, name, scrollOptions) {
      const recipePreference = scrollOptions?.preference ?? preference;
      const recipe = createMotionRecipe(name, recipePreference);
      return adapter.scroll ? adapter.scroll(target, recipe, scrollOptions) : adapter.animate(target, recipe, scrollOptions);
    },
  };
}

export function createScopedMotion(target: LazyMotionTarget, options: LazyMotionRuntimeOptions = {}) {
  const runtime = createLazyMotion(options);

  return {
    runtime,
    animate(name: LazyMotionPreset, animationOptions?: Parameters<LazyMotionRuntime["animate"]>[2]) {
      return runtime.animate(target, name, animationOptions);
    },
    scroll(name: LazyMotionPreset, scrollOptions?: Parameters<LazyMotionRuntime["scroll"]>[2]) {
      return runtime.scroll(target, name, scrollOptions);
    },
  };
}

export const lazyMotion = createLazyMotion();
