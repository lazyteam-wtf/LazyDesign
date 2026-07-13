import { type LazyMotionTarget } from "./types";

type MotionFrame = Record<string, string | number>;

export function resolveMotionTargets(target: LazyMotionTarget): Element[] {
  if (typeof target === "string") {
    if (typeof document === "undefined") return [];
    return Array.from(document.querySelectorAll(target));
  }

  if (isElement(target)) {
    return [target];
  }

  return Array.from(target);
}

export function motionFrameToKeyframe(frame: MotionFrame): Keyframe {
  const keyframe: Keyframe = {};
  const transform = createTransform(frame);
  const opacity = frame.opacity;
  const clipPath = frame.clipPath ?? frame["clip-path"];

  if (opacity !== undefined) {
    keyframe.opacity = String(opacity);
  }

  if (transform) {
    keyframe.transform = transform;
  }

  if (clipPath !== undefined) {
    keyframe.clipPath = String(clipPath);
  }

  return keyframe;
}

export function motionFrameToGsapVars(frame: MotionFrame) {
  const vars: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(frame)) {
    vars[toGsapProperty(key)] = value;
  }

  return vars;
}

export function toMilliseconds(value: number | string | undefined, fallback: string) {
  if (value === undefined) return parseDuration(fallback);
  if (typeof value === "number") return value;
  return parseDuration(value);
}

export function toSeconds(value: number | string | undefined, fallback: string) {
  return toMilliseconds(value, fallback) / 1000;
}

export function noopPlayback(): {
  finished: Promise<void>;
  cancel(): void;
  pause(): void;
  play(): void;
} {
  return {
    finished: Promise.resolve(),
    cancel() {},
    pause() {},
    play() {},
  };
}

function parseDuration(value: string) {
  const numericValue = Number.parseFloat(value);
  if (Number.isNaN(numericValue)) return 0;
  return value.trim().endsWith("ms") ? numericValue : numericValue * 1000;
}

function createTransform(frame: MotionFrame) {
  const x = frame.x;
  const y = frame.y;
  const scale = frame.scale;
  const rotate = frame.rotate;
  const transforms: string[] = [];

  if (x !== undefined || y !== undefined) {
    transforms.push(`translate3d(${toLength(x ?? 0)}, ${toLength(y ?? 0)}, 0)`);
  }

  if (scale !== undefined) {
    transforms.push(`scale(${scale})`);
  }

  if (rotate !== undefined) {
    transforms.push(`rotate(${typeof rotate === "number" ? `${rotate}deg` : rotate})`);
  }

  return transforms.length > 0 ? transforms.join(" ") : undefined;
}

function toLength(value: string | number) {
  return typeof value === "number" ? `${value}px` : value;
}

function toGsapProperty(key: string) {
  if (key === "clip-path") return "clipPath";
  return key;
}

function isElement(value: LazyMotionTarget): value is Element {
  return typeof Element !== "undefined" && value instanceof Element;
}
