import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: (query: string): MediaQueryList => ({
      addEventListener: () => undefined,
      addListener: () => undefined,
      dispatchEvent: () => false,
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: () => undefined,
      removeListener: () => undefined,
    }),
  });
}

if (!Element.prototype.scrollIntoView) {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    configurable: true,
    value: () => undefined,
  });
}

for (const method of ["hasPointerCapture", "setPointerCapture", "releasePointerCapture"] as const) {
  if (!Element.prototype[method]) {
    Object.defineProperty(Element.prototype, method, {
      configurable: true,
      value: method === "hasPointerCapture" ? () => false : () => undefined,
    });
  }
}
