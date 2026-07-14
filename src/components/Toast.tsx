import * as RadixToast from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";
import { Icon } from "./Icon";

export type LazyToastIntent = "neutral" | "success" | "danger";
export type LazyToastMotion = "none" | "slide" | "fade";

export const ToastProvider = RadixToast.Provider;
export const ToastAction = RadixToast.Action;

export type ToastProps = ComponentPropsWithoutRef<typeof RadixToast.Root> & {
  intent?: LazyToastIntent;
  motion?: LazyToastMotion;
};

export const Toast = forwardRef<ElementRef<typeof RadixToast.Root>, ToastProps>(
  function Toast({ className, intent = "neutral", motion = "slide", ...props }, ref) {
    return (
      <RadixToast.Root
        {...props}
        className={cx("ld-toast", className)}
        data-intent={intent}
        data-motion={motion}
        ref={ref}
      />
    );
  },
);

export const ToastTitle = forwardRef<
  ElementRef<typeof RadixToast.Title>,
  ComponentPropsWithoutRef<typeof RadixToast.Title>
>(function ToastTitle({ className, ...props }, ref) {
  return <RadixToast.Title {...props} className={cx("ld-toast__title", className)} ref={ref} />;
});

export const ToastDescription = forwardRef<
  ElementRef<typeof RadixToast.Description>,
  ComponentPropsWithoutRef<typeof RadixToast.Description>
>(function ToastDescription({ className, ...props }, ref) {
  return <RadixToast.Description {...props} className={cx("ld-toast__description", className)} ref={ref} />;
});

export const ToastClose = forwardRef<
  ElementRef<typeof RadixToast.Close>,
  ComponentPropsWithoutRef<typeof RadixToast.Close>
>(function ToastClose({ children, className, ...props }, ref) {
  return (
    <RadixToast.Close {...props} className={cx("ld-toast__close", className)} ref={ref}>
      {children ?? <Icon glyph={X} size="sm" />}
    </RadixToast.Close>
  );
});

export const ToastViewport = forwardRef<
  ElementRef<typeof RadixToast.Viewport>,
  ComponentPropsWithoutRef<typeof RadixToast.Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  return <RadixToast.Viewport {...props} className={cx("ld-toast-viewport", className)} ref={ref} />;
});
