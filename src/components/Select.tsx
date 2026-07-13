import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cx } from "../primitives/utils";
import { isAriaInvalid, useFieldControlProps } from "./Field";
import { Icon } from "./Icon";
import { type LazyComponentSize } from "./types";

export type LazySelectState = "default" | "error";
export type LazySelectMotion = "none" | "scale" | "slide";

export type SelectProps = ComponentPropsWithoutRef<typeof RadixSelect.Root>;
export type SelectValueProps = ComponentPropsWithoutRef<typeof RadixSelect.Value>;
export type SelectIconProps = ComponentPropsWithoutRef<typeof RadixSelect.Icon>;
export type SelectPortalProps = ComponentPropsWithoutRef<typeof RadixSelect.Portal>;
export type SelectGroupProps = ComponentPropsWithoutRef<typeof RadixSelect.Group>;
export type SelectItemTextProps = ComponentPropsWithoutRef<typeof RadixSelect.ItemText>;

export type SelectTriggerProps = ComponentPropsWithoutRef<typeof RadixSelect.Trigger> & {
  icon?: ReactNode;
  size?: LazyComponentSize;
  state?: LazySelectState;
};

export type SelectContentProps = ComponentPropsWithoutRef<typeof RadixSelect.Content> & {
  motion?: LazySelectMotion;
  portalProps?: SelectPortalProps;
};

export type SelectViewportProps = ComponentPropsWithoutRef<typeof RadixSelect.Viewport>;
export type SelectLabelProps = ComponentPropsWithoutRef<typeof RadixSelect.Label>;
export type SelectItemProps = ComponentPropsWithoutRef<typeof RadixSelect.Item>;
export type SelectSeparatorProps = ComponentPropsWithoutRef<typeof RadixSelect.Separator>;

export const Select = RadixSelect.Root;
export const SelectValue = RadixSelect.Value;
export const SelectIcon = RadixSelect.Icon;
export const SelectPortal = RadixSelect.Portal;
export const SelectGroup = RadixSelect.Group;
export const SelectItemText = RadixSelect.ItemText;

export const SelectTrigger = forwardRef<ElementRef<typeof RadixSelect.Trigger>, SelectTriggerProps>(
  function SelectTrigger(
    {
      children,
      className,
      icon = <Icon glyph={ChevronDown} size="sm" />,
      size = "md",
      state = "default",
      ...props
    },
    ref,
  ) {
    const fieldProps = useFieldControlProps(props);
    const resolvedState = state === "error" || isAriaInvalid(fieldProps["aria-invalid"]) ? "error" : "default";

    return (
      <RadixSelect.Trigger
        {...fieldProps}
        className={cx("ld-select__trigger", className)}
        data-size={size}
        data-validation-state={resolvedState}
        ref={ref}
      >
        {children}
        {icon ? (
          <RadixSelect.Icon asChild>
            <span aria-hidden="true" className="ld-select__icon">
              {icon}
            </span>
          </RadixSelect.Icon>
        ) : null}
      </RadixSelect.Trigger>
    );
  },
);

export const SelectContent = forwardRef<ElementRef<typeof RadixSelect.Content>, SelectContentProps>(
  function SelectContent(
    {
      children,
      className,
      motion = "scale",
      portalProps,
      position = "popper",
      sideOffset = 6,
      ...props
    },
    ref,
  ) {
    return (
      <RadixSelect.Portal {...portalProps}>
        <RadixSelect.Content
          {...props}
          className={cx("ld-select__content", className)}
          data-motion={motion}
          position={position}
          ref={ref}
          sideOffset={sideOffset}
        >
          <RadixSelect.ScrollUpButton className="ld-select__scroll-button">
            <Icon glyph={ChevronUp} size="sm" />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="ld-select__viewport">
            {children}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="ld-select__scroll-button">
            <Icon glyph={ChevronDown} size="sm" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    );
  },
);

export const SelectViewport = forwardRef<ElementRef<typeof RadixSelect.Viewport>, SelectViewportProps>(
  function SelectViewport({ className, ...props }, ref) {
    return <RadixSelect.Viewport {...props} className={cx("ld-select__viewport", className)} ref={ref} />;
  },
);

export const SelectLabel = forwardRef<ElementRef<typeof RadixSelect.Label>, SelectLabelProps>(function SelectLabel(
  { className, ...props },
  ref,
) {
  return <RadixSelect.Label {...props} className={cx("ld-select__label", className)} ref={ref} />;
});

export const SelectItem = forwardRef<ElementRef<typeof RadixSelect.Item>, SelectItemProps>(function SelectItem(
  { children, className, ...props },
  ref,
) {
  return (
    <RadixSelect.Item {...props} className={cx("ld-select__item", className)} ref={ref}>
      <span className="ld-select__item-indicator">
        <RadixSelect.ItemIndicator>
          <Icon glyph={Check} size="sm" />
        </RadixSelect.ItemIndicator>
      </span>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
});

export const SelectSeparator = forwardRef<ElementRef<typeof RadixSelect.Separator>, SelectSeparatorProps>(
  function SelectSeparator({ className, ...props }, ref) {
    return <RadixSelect.Separator {...props} className={cx("ld-select__separator", className)} ref={ref} />;
  },
);
