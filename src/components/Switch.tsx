import * as RadixSwitch from "@radix-ui/react-switch";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";
import { isAriaInvalid, useFieldControlProps } from "./Field";
import { type LazyMotion } from "./types";

export type LazySwitchSize = "sm" | "md";
export type LazySwitchState = "default" | "error";

export type SwitchProps = ComponentPropsWithoutRef<typeof RadixSwitch.Root> & {
  size?: LazySwitchSize;
  state?: LazySwitchState;
  motion?: LazyMotion;
};

export const Switch = forwardRef<ElementRef<typeof RadixSwitch.Root>, SwitchProps>(function Switch(
  {
    className,
    motion = "press",
    size = "md",
    state = "default",
    ...props
  },
  ref,
) {
  const fieldProps = useFieldControlProps(props);
  const resolvedState = state === "error" || isAriaInvalid(fieldProps["aria-invalid"]) ? "error" : "default";

  return (
    <RadixSwitch.Root
      {...fieldProps}
      className={cx("ld-switch", className)}
      data-motion={motion}
      data-size={size}
      data-validation-state={resolvedState}
      ref={ref}
    >
      <RadixSwitch.Thumb className="ld-switch__thumb" />
    </RadixSwitch.Root>
  );
});
