import { type LazyMotionAdapter, type LazyMotionOptions, type LazyMotionTarget } from "./types";
import { motionFrameToKeyframe, noopPlayback, resolveMotionTargets, toMilliseconds } from "./utils";
import { type LazyMotionRecipe } from "../core/motion";

export const lazyWebMotionAdapter: LazyMotionAdapter = {
  name: "web-animations",
  animate(target, recipe, options) {
    return animateWithWebAnimations(target, recipe, options);
  },
};

export function animateWithWebAnimations(
  target: LazyMotionTarget,
  recipe: LazyMotionRecipe,
  options: LazyMotionOptions = {},
) {
  const targets = resolveMotionTargets(target);

  if (typeof document === "undefined" || targets.length === 0) {
    return noopPlayback();
  }

  options.onStart?.();

  const animations = targets.map((element) =>
    element.animate([motionFrameToKeyframe(recipe.from), motionFrameToKeyframe(recipe.to)], {
      delay: toMilliseconds(options.delay, "0ms"),
      duration: toMilliseconds(options.duration, recipe.duration),
      easing: options.easing ?? recipe.easing,
      fill: "both",
    }),
  );

  const finished = Promise.all(animations.map((animation) => animation.finished.catch(() => undefined))).then(() => {
    options.onComplete?.();
  });

  return {
    finished,
    cancel() {
      animations.forEach((animation) => animation.cancel());
    },
    pause() {
      animations.forEach((animation) => animation.pause());
    },
    play() {
      animations.forEach((animation) => animation.play());
    },
  };
}
