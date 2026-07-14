import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";
import { Icon } from "./Icon";

export type LazyDrawerMotion = "none" | "fade" | "slide";
export type LazyDrawerSide = "top" | "right" | "bottom" | "left";
export type LazyDrawerSize = "sm" | "md" | "lg";

export const Drawer = RadixDialog.Root;
export const DrawerTrigger = RadixDialog.Trigger;
export const DrawerPortal = RadixDialog.Portal;
export const DrawerClose = RadixDialog.Close;

export type DrawerOverlayProps = ComponentPropsWithoutRef<typeof RadixDialog.Overlay>;
export type DrawerContentProps = ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
  motion?: LazyDrawerMotion;
  showClose?: boolean;
  side?: LazyDrawerSide;
  size?: LazyDrawerSize;
};

export const DrawerOverlay = forwardRef<ElementRef<typeof RadixDialog.Overlay>, DrawerOverlayProps>(
  function DrawerOverlay({ className, ...props }, ref) {
    return <RadixDialog.Overlay {...props} className={cx("ld-overlay", className)} ref={ref} />;
  },
);

export const DrawerContent = forwardRef<ElementRef<typeof RadixDialog.Content>, DrawerContentProps>(
  function DrawerContent(
    { children, className, motion = "slide", showClose = true, side = "right", size = "md", ...props },
    ref,
  ) {
    return (
      <RadixDialog.Portal>
        <DrawerOverlay />
        <RadixDialog.Content
          {...props}
          className={cx("ld-drawer", className)}
          data-motion={motion}
          data-side={side}
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

export const DrawerHeader = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={cx("ld-overlay__header", className)} />
);

export const DrawerFooter = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={cx("ld-overlay__footer", className)} />
);

export const DrawerTitle = forwardRef<
  ElementRef<typeof RadixDialog.Title>,
  ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(function DrawerTitle({ className, ...props }, ref) {
  return <RadixDialog.Title {...props} className={cx("ld-overlay__title", className)} ref={ref} />;
});

export const DrawerDescription = forwardRef<
  ElementRef<typeof RadixDialog.Description>,
  ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function DrawerDescription({ className, ...props }, ref) {
  return <RadixDialog.Description {...props} className={cx("ld-overlay__description", className)} ref={ref} />;
});
