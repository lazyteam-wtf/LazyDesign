import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";
import { isAriaInvalid, useFieldControlProps } from "./Field";
import { Icon } from "./Icon";
import { type LazyMotion } from "./types";

export type LazyCheckboxSize = "sm" | "md";
export type LazyCheckboxState = "default" | "error";

export type CheckboxProps = ComponentPropsWithoutRef<typeof RadixCheckbox.Root> & {
  size?: LazyCheckboxSize;
  state?: LazyCheckboxState;
  motion?: LazyMotion;
};

export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(function Checkbox(
  {
    children,
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
    <RadixCheckbox.Root
      {...fieldProps}
      className={cx("ld-checkbox", className)}
      data-motion={motion}
      data-size={size}
      data-validation-state={resolvedState}
      ref={ref}
    >
      {children ?? (
        <RadixCheckbox.Indicator className="ld-checkbox__indicator">
          <Icon className="ld-checkbox__check" glyph={Check} size="sm" />
          <Icon className="ld-checkbox__minus" glyph={Minus} size="sm" />
        </RadixCheckbox.Indicator>
      )}
    </RadixCheckbox.Root>
  );
});
