import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";
import { Icon } from "./Icon";

export type LazyDialogMotion = "none" | "fade" | "scale" | "shift";
export type LazyDialogSize = "sm" | "md" | "lg";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogPortal = RadixDialog.Portal;
export const DialogClose = RadixDialog.Close;

export type DialogOverlayProps = ComponentPropsWithoutRef<typeof RadixDialog.Overlay>;
export type DialogContentProps = ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
  motion?: LazyDialogMotion;
  showClose?: boolean;
  size?: LazyDialogSize;
};

export const DialogOverlay = forwardRef<ElementRef<typeof RadixDialog.Overlay>, DialogOverlayProps>(
  function DialogOverlay({ className, ...props }, ref) {
    return <RadixDialog.Overlay {...props} className={cx("ld-overlay", className)} ref={ref} />;
  },
);

export const DialogContent = forwardRef<ElementRef<typeof RadixDialog.Content>, DialogContentProps>(
  function DialogContent({ children, className, motion = "scale", showClose = true, size = "md", ...props }, ref) {
    return (
      <RadixDialog.Portal>
        <DialogOverlay />
        <RadixDialog.Content
          {...props}
          className={cx("ld-dialog", className)}
          data-motion={motion}
          data-size={size}
          ref={ref}
        >
          {children}
          {showClose ? (
            <RadixDialog.Close className="ld-overlay__close" aria-label="Close">
              <Icon glyph={X} size="sm" />
            </RadixDialog.Close>
          ) : null}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  },
);

export const DialogHeader = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={cx("ld-overlay__header", className)} />
);

export const DialogFooter = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={cx("ld-overlay__footer", className)} />
);

export const DialogTitle = forwardRef<
  ElementRef<typeof RadixDialog.Title>,
  ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return <RadixDialog.Title {...props} className={cx("ld-overlay__title", className)} ref={ref} />;
});

export const DialogDescription = forwardRef<
  ElementRef<typeof RadixDialog.Description>,
  ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return <RadixDialog.Description {...props} className={cx("ld-overlay__description", className)} ref={ref} />;
});
