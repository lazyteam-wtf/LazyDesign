import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cx } from "../primitives/utils";

export type LazyTabsVariant = "line" | "contained";
export type LazyTabsSize = "sm" | "md";

export type TabsProps = ComponentPropsWithoutRef<typeof RadixTabs.Root>;
export type TabsListProps = ComponentPropsWithoutRef<typeof RadixTabs.List> & {
  variant?: LazyTabsVariant;
  size?: LazyTabsSize;
};
export type TabsTriggerProps = ComponentPropsWithoutRef<typeof RadixTabs.Trigger> & {
  size?: LazyTabsSize;
};
export type TabsContentProps = ComponentPropsWithoutRef<typeof RadixTabs.Content>;

export const Tabs = forwardRef<ElementRef<typeof RadixTabs.Root>, TabsProps>(function Tabs(
  { className, ...props },
  ref,
) {
  return <RadixTabs.Root {...props} className={cx("ld-tabs", className)} ref={ref} />;
});

export const TabsList = forwardRef<ElementRef<typeof RadixTabs.List>, TabsListProps>(function TabsList(
  {
    className,
    size = "md",
    variant = "contained",
    ...props
  },
  ref,
) {
  return (
    <RadixTabs.List
      {...props}
      className={cx("ld-tabs__list", className)}
      data-size={size}
      data-variant={variant}
      ref={ref}
    />
  );
});

export const TabsTrigger = forwardRef<ElementRef<typeof RadixTabs.Trigger>, TabsTriggerProps>(function TabsTrigger(
  {
    className,
    size = "md",
    ...props
  },
  ref,
) {
  return <RadixTabs.Trigger {...props} className={cx("ld-tabs__trigger", className)} data-size={size} ref={ref} />;
});

export const TabsContent = forwardRef<ElementRef<typeof RadixTabs.Content>, TabsContentProps>(function TabsContent(
  { className, ...props },
  ref,
) {
  return <RadixTabs.Content {...props} className={cx("ld-tabs__content", className)} ref={ref} />;
});
