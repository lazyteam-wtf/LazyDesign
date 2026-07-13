import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { createMotionRecipe, type LazyMotionPreference, type LazyMotionPreset } from "../core/motion";
import { useLazyTheme } from "../react/LazyProvider";

export function useLazyMotionPreference(preference?: LazyMotionPreference): LazyMotionPreference {
  const theme = useLazyTheme();
  const requestedPreference = preference ?? theme.source.motion;
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    if (requestedPreference !== "system" || typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setSystemReduced(mediaQuery.matches);
    syncPreference();

    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, [requestedPreference]);

  return requestedPreference === "reduced" || systemReduced ? "reduced" : "system";
}

export function useLazyMotionRecipe(name: LazyMotionPreset, preference?: LazyMotionPreference) {
  const resolvedPreference = useLazyMotionPreference(preference);

  return useMemo(() => createMotionRecipe(name, resolvedPreference), [name, resolvedPreference]);
}

export function useLazyMotionStyle(name: LazyMotionPreset, preference?: LazyMotionPreference): CSSProperties {
  const recipe = useLazyMotionRecipe(name, preference);

  return useMemo(
    () => ({
      transitionDuration: recipe.duration,
      transitionProperty: recipe.properties.join(", "),
      transitionTimingFunction: recipe.easing,
    }),
    [recipe.duration, recipe.easing, recipe.properties],
  );
}
