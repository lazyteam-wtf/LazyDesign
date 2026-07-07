import { type ComponentPropsWithoutRef, type ReactNode } from "react";

export type LazyComponentSize = "sm" | "md" | "lg";
export type LazyIntent = "neutral" | "primary" | "danger";
export type LazyMotion = "none" | "soft";

export type LazyIconSlot = ReactNode;

export type NativeButtonProps = Omit<ComponentPropsWithoutRef<"button">, "color">;
export type NativeInputProps = Omit<ComponentPropsWithoutRef<"input">, "color" | "prefix" | "size">;
