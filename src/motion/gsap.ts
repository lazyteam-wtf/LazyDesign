import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type LazyMotionRecipe } from "../core/motion";
import {
  type LazyMotionAdapter,
  type LazyMotionOptions,
  type LazyMotionPlayback,
  type LazyMotionTarget,
  type LazyScrollMotionOptions,
} from "./types";
import { motionFrameToGsapVars, toSeconds } from "./utils";

export type LazyGsapTween = {
  eventCallback(type: "onStart" | "onComplete", callback?: () => void): LazyGsapTween;
  kill(): void;
  pause(): void;
  play(): void;
};

export type LazyGsapLike = {
  fromTo(target: LazyMotionTarget, fromVars: Record<string, unknown>, toVars: Record<string, unknown>): LazyGsapTween;
  registerPlugin?(...plugins: unknown[]): void;
};

const defaultGsap = gsap as unknown as LazyGsapLike;

export function createGsapMotionAdapter(gsapInstance: LazyGsapLike = defaultGsap): LazyMotionAdapter {
  return {
    name: "gsap",
    animate(target, recipe, options) {
      return animateWithGsap(gsapInstance, target, recipe, options);
    },
    scroll(target, recipe, options) {
      gsapInstance.registerPlugin?.(ScrollTrigger);
      return animateWithGsap(gsapInstance, target, recipe, {
        ...options,
        scrollTrigger: {
          trigger: options?.trigger ?? target,
          start: options?.start ?? "top 82%",
          end: options?.end,
          scrub: options?.scrub,
          once: options?.once,
        },
      });
    },
  };
}

export const lazyGsapMotionAdapter = createGsapMotionAdapter();

function animateWithGsap(
  gsapInstance: LazyGsapLike,
  target: LazyMotionTarget,
  recipe: LazyMotionRecipe,
  options: (LazyMotionOptions & Record<string, unknown>) | undefined,
): LazyMotionPlayback {
  const tween = gsapInstance.fromTo(target, motionFrameToGsapVars(recipe.from), {
    ...motionFrameToGsapVars(recipe.to),
    delay: toSeconds(options?.delay, "0ms"),
    duration: toSeconds(options?.duration, recipe.duration),
    ease: toGsapEase(options?.easing ?? recipe.easing),
    scrollTrigger: options?.scrollTrigger,
  });

  let resolveFinished: () => void = () => {};
  const finished = new Promise<void>((resolve) => {
    resolveFinished = resolve;
  });

  tween.eventCallback("onStart", () => {
    options?.onStart?.();
  });
  tween.eventCallback("onComplete", () => {
    options?.onComplete?.();
    resolveFinished();
  });

  return {
    finished,
    cancel() {
      tween.kill();
      resolveFinished();
    },
    pause() {
      tween.pause();
    },
    play() {
      tween.play();
    },
  };
}

function toGsapEase(easing: string) {
  if (easing.includes("0.16, 1, 0.3, 1")) return "power3.out";
  if (easing.includes("0.7, 0, 0.84, 0")) return "power2.in";
  if (easing.includes("0.4, 0, 0.2, 1")) return "power2.inOut";
  return "power2.out";
}
