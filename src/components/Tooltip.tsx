import * as RadixTooltip from "@radix-ui/react-tooltip";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";

export type TooltipProviderProps = ComponentPropsWithoutRef<typeof RadixTooltip.Provider>;
export type TooltipProps = ComponentPropsWithoutRef<typeof RadixTooltip.Root>;
export type TooltipTriggerProps = ComponentPropsWithoutRef<typeof RadixTooltip.Trigger>;
export type TooltipContentProps = ComponentPropsWithoutRef<typeof RadixTooltip.Content>;

export function TooltipProvider({
  delayDuration = 350,
  skipDelayDuration = 120,
  ...props
}: TooltipProviderProps) {
  return (
    <RadixTooltip.Provider
      {...props}
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    />
  );
}

export const Tooltip = RadixTooltip.Root;

export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent = forwardRef<ElementRef<typeof RadixTooltip.Content>, TooltipContentProps>(
  function TooltipContent(
    {
      children,
      className,
      sideOffset = 6,
      ...props
    },
    ref,
  ) {
    return (
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          {...props}
          className={cx("ld-tooltip", className)}
          ref={ref}
          sideOffset={sideOffset}
        >
          {children}
          <RadixTooltip.Arrow className="ld-tooltip__arrow" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    );
  },
);
