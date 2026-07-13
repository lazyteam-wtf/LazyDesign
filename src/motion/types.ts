import { type LazyMotionPreference, type LazyMotionPreset, type LazyMotionRecipe } from "../core/motion";

export type LazyMotionTarget = Element | Element[] | NodeListOf<Element> | string;

export type LazyMotionOptions = {
  delay?: number | string;
  duration?: number | string;
  easing?: string;
  preference?: LazyMotionPreference;
  onStart?: () => void;
  onComplete?: () => void;
};

export type LazyScrollMotionOptions = LazyMotionOptions & {
  trigger?: Element | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
};

export type LazyMotionPlayback = {
  finished: Promise<void>;
  cancel(): void;
  pause(): void;
  play(): void;
};

export type LazyMotionAdapter = {
  name: string;
  animate(target: LazyMotionTarget, recipe: LazyMotionRecipe, options?: LazyMotionOptions): LazyMotionPlayback;
  scroll?(target: LazyMotionTarget, recipe: LazyMotionRecipe, options?: LazyScrollMotionOptions): LazyMotionPlayback;
};

export type LazyMotionRuntime = {
  adapter: LazyMotionAdapter;
  preference: LazyMotionPreference;
  recipe(name: LazyMotionPreset, preference?: LazyMotionPreference): LazyMotionRecipe;
  animate(target: LazyMotionTarget, name: LazyMotionPreset, options?: LazyMotionOptions): LazyMotionPlayback;
  scroll(target: LazyMotionTarget, name: LazyMotionPreset, options?: LazyScrollMotionOptions): LazyMotionPlayback;
};
