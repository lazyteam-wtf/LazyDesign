import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";

export type LazyPopoverMotion = "none" | "scale" | "shift";
export type LazyPopoverSize = "sm" | "md";

export const Popover = RadixPopover.Root;
export const PopoverAnchor = RadixPopover.Anchor;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverPortal = RadixPopover.Portal;
export const PopoverClose = RadixPopover.Close;

export type PopoverContentProps = ComponentPropsWithoutRef<typeof RadixPopover.Content> & {
  motion?: LazyPopoverMotion;
  size?: LazyPopoverSize;
};
export type PopoverArrowProps = ComponentPropsWithoutRef<typeof RadixPopover.Arrow>;

export const PopoverContent = forwardRef<ElementRef<typeof RadixPopover.Content>, PopoverContentProps>(
  function PopoverContent(
    { align = "center", className, collisionPadding = 12, motion = "scale", sideOffset = 8, size = "md", ...props },
    ref,
  ) {
    return (
      <RadixPopover.Portal>
        <RadixPopover.Content
          {...props}
          align={align}
          className={cx("ld-popover", className)}
          collisionPadding={collisionPadding}
          data-motion={motion}
          data-size={size}
          ref={ref}
          sideOffset={sideOffset}
        />
      </RadixPopover.Portal>
    );
  },
);

export const PopoverArrow = forwardRef<ElementRef<typeof RadixPopover.Arrow>, PopoverArrowProps>(
  function PopoverArrow({ className, ...props }, ref) {
    return <RadixPopover.Arrow {...props} className={cx("ld-popover__arrow", className)} ref={ref} />;
  },
);

export const PopoverTitle = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={cx("ld-overlay__title", className)} />
);

export const PopoverDescription = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => (
  <div {...props} className={cx("ld-overlay__description", className)} />
);
