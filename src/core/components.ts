import { type LazyColorRoles } from "./color";
import { createMotionRecipe, type LazyMotionPreference, type LazyMotionRecipe } from "./motion";
import { type LazyCssVars, lazyTokenVars } from "./tokens";

export type LazyDesignStyle = "linear" | "geist" | "material" | "expressive" | "enterprise";
export type LazyComponentDensity = "standard" | "compact";

export type LazyComponentThemeInput = {
  color: LazyColorRoles;
  density?: LazyComponentDensity;
  motion?: LazyMotionPreference;
  style?: LazyDesignStyle;
};

export const lazyComponentTokenVars = {
  surface: {
    background: "--ld-component-surface-background",
    foreground: "--ld-component-surface-foreground",
    border: "--ld-component-surface-border",
    level0: "--ld-component-surface-level-0",
    level1: "--ld-component-surface-level-1",
    level2: "--ld-component-surface-level-2",
    level3: "--ld-component-surface-level-3",
  },
  text: {
    primary: "--ld-component-text-primary",
    muted: "--ld-component-text-muted",
    link: "--ld-component-text-link",
    code: "--ld-component-text-code",
  },
  control: {
    radius: "--ld-component-control-radius",
    heightSm: "--ld-component-control-height-sm",
    heightMd: "--ld-component-control-height-md",
    heightLg: "--ld-component-control-height-lg",
    paddingXSm: "--ld-component-control-padding-x-sm",
    paddingXMd: "--ld-component-control-padding-x-md",
    paddingXLg: "--ld-component-control-padding-x-lg",
    gap: "--ld-component-control-gap",
    border: "--ld-component-control-border",
    focusRing: "--ld-component-control-focus-ring",
    hover: "--ld-component-control-hover",
    pressed: "--ld-component-control-pressed",
    motionHoverTransform: "--ld-component-control-motion-hover-transform",
    motionPressTransform: "--ld-component-control-motion-press-transform",
  },
  button: {
    background: "--ld-component-button-background",
    foreground: "--ld-component-button-foreground",
    border: "--ld-component-button-border",
    backgroundHover: "--ld-component-button-background-hover",
    backgroundPressed: "--ld-component-button-background-pressed",
    primaryBackground: "--ld-component-button-primary-background",
    primaryForeground: "--ld-component-button-primary-foreground",
    primaryBackgroundHover: "--ld-component-button-primary-background-hover",
    primaryBackgroundPressed: "--ld-component-button-primary-background-pressed",
    secondaryBackground: "--ld-component-button-secondary-background",
    secondaryForeground: "--ld-component-button-secondary-foreground",
    secondaryBackgroundHover: "--ld-component-button-secondary-background-hover",
    secondaryBackgroundPressed: "--ld-component-button-secondary-background-pressed",
    dangerBackground: "--ld-component-button-danger-background",
    dangerForeground: "--ld-component-button-danger-foreground",
    dangerBackgroundHover: "--ld-component-button-danger-background-hover",
    dangerBackgroundPressed: "--ld-component-button-danger-background-pressed",
    radius: "--ld-component-button-radius",
    height: "--ld-component-button-height",
    paddingX: "--ld-component-button-padding-x",
    gap: "--ld-component-button-gap",
  },
  input: {
    background: "--ld-component-input-background",
    foreground: "--ld-component-input-foreground",
    placeholder: "--ld-component-input-placeholder",
    border: "--ld-component-input-border",
    borderFocus: "--ld-component-input-border-focus",
    borderInvalid: "--ld-component-input-border-invalid",
    radius: "--ld-component-input-radius",
    height: "--ld-component-input-height",
    paddingX: "--ld-component-input-padding-x",
  },
  field: {
    labelForeground: "--ld-component-field-label-foreground",
    descriptionForeground: "--ld-component-field-description-foreground",
    errorForeground: "--ld-component-field-error-foreground",
    gap: "--ld-component-field-gap",
  },
  checkbox: {
    background: "--ld-component-checkbox-background",
    backgroundChecked: "--ld-component-checkbox-background-checked",
    foregroundChecked: "--ld-component-checkbox-foreground-checked",
    border: "--ld-component-checkbox-border",
    borderChecked: "--ld-component-checkbox-border-checked",
    radius: "--ld-component-checkbox-radius",
    sizeSm: "--ld-component-checkbox-size-sm",
    sizeMd: "--ld-component-checkbox-size-md",
  },
  switch: {
    trackBackground: "--ld-component-switch-track-background",
    trackBackgroundChecked: "--ld-component-switch-track-background-checked",
    trackBorder: "--ld-component-switch-track-border",
    thumbBackground: "--ld-component-switch-thumb-background",
    thumbBackgroundChecked: "--ld-component-switch-thumb-background-checked",
    widthSm: "--ld-component-switch-width-sm",
    widthMd: "--ld-component-switch-width-md",
    heightSm: "--ld-component-switch-height-sm",
    heightMd: "--ld-component-switch-height-md",
  },
  select: {
    triggerBackground: "--ld-component-select-trigger-background",
    triggerForeground: "--ld-component-select-trigger-foreground",
    triggerPlaceholder: "--ld-component-select-trigger-placeholder",
    triggerBorder: "--ld-component-select-trigger-border",
    triggerBorderFocus: "--ld-component-select-trigger-border-focus",
    triggerBorderInvalid: "--ld-component-select-trigger-border-invalid",
    contentBackground: "--ld-component-select-content-background",
    contentForeground: "--ld-component-select-content-foreground",
    contentBorder: "--ld-component-select-content-border",
    contentShadow: "--ld-component-select-content-shadow",
    itemBackgroundHighlighted: "--ld-component-select-item-background-highlighted",
    itemForegroundSelected: "--ld-component-select-item-foreground-selected",
    indicator: "--ld-component-select-indicator",
    radius: "--ld-component-select-radius",
  },
  badge: {
    background: "--ld-component-badge-background",
    foreground: "--ld-component-badge-foreground",
    border: "--ld-component-badge-border",
    primaryBackground: "--ld-component-badge-primary-background",
    primaryForeground: "--ld-component-badge-primary-foreground",
    secondaryBackground: "--ld-component-badge-secondary-background",
    secondaryForeground: "--ld-component-badge-secondary-foreground",
    dangerBackground: "--ld-component-badge-danger-background",
    dangerForeground: "--ld-component-badge-danger-foreground",
    radius: "--ld-component-badge-radius",
  },
  card: {
    background: "--ld-component-card-background",
    foreground: "--ld-component-card-foreground",
    border: "--ld-component-card-border",
    radius: "--ld-component-card-radius",
    padding: "--ld-component-card-padding",
    headerGap: "--ld-component-card-header-gap",
    bodyGap: "--ld-component-card-body-gap",
    hoverBackground: "--ld-component-card-hover-background",
  },
  tabs: {
    listBackground: "--ld-component-tabs-list-background",
    listBorder: "--ld-component-tabs-list-border",
    triggerForeground: "--ld-component-tabs-trigger-foreground",
    triggerBackgroundHover: "--ld-component-tabs-trigger-background-hover",
    triggerForegroundActive: "--ld-component-tabs-trigger-foreground-active",
    triggerBackgroundActive: "--ld-component-tabs-trigger-background-active",
    triggerBorderActive: "--ld-component-tabs-trigger-border-active",
    indicator: "--ld-component-tabs-indicator",
    radius: "--ld-component-tabs-radius",
    height: "--ld-component-tabs-height",
    paddingX: "--ld-component-tabs-padding-x",
    gap: "--ld-component-tabs-gap",
  },
  tooltip: {
    background: "--ld-component-tooltip-background",
    foreground: "--ld-component-tooltip-foreground",
    border: "--ld-component-tooltip-border",
    radius: "--ld-component-tooltip-radius",
    shadow: "--ld-component-tooltip-shadow",
    paddingX: "--ld-component-tooltip-padding-x",
    paddingY: "--ld-component-tooltip-padding-y",
  },
  overlay: {
    backdrop: "--ld-component-overlay-backdrop",
    background: "--ld-component-overlay-background",
    foreground: "--ld-component-overlay-foreground",
    border: "--ld-component-overlay-border",
    radius: "--ld-component-overlay-radius",
    shadow: "--ld-component-overlay-shadow",
    padding: "--ld-component-overlay-padding",
    headerGap: "--ld-component-overlay-header-gap",
    bodyGap: "--ld-component-overlay-body-gap",
    footerGap: "--ld-component-overlay-footer-gap",
    zIndex: "--ld-component-overlay-z-index",
  },
  dialog: {
    widthSm: "--ld-component-dialog-width-sm",
    widthMd: "--ld-component-dialog-width-md",
    widthLg: "--ld-component-dialog-width-lg",
  },
  drawer: {
    widthSm: "--ld-component-drawer-width-sm",
    widthMd: "--ld-component-drawer-width-md",
    widthLg: "--ld-component-drawer-width-lg",
    heightSm: "--ld-component-drawer-height-sm",
    heightMd: "--ld-component-drawer-height-md",
    heightLg: "--ld-component-drawer-height-lg",
  },
  popover: {
    widthSm: "--ld-component-popover-width-sm",
    widthMd: "--ld-component-popover-width-md",
    arrowSize: "--ld-component-popover-arrow-size",
  },
  toast: {
    width: "--ld-component-toast-width",
    background: "--ld-component-toast-background",
    foreground: "--ld-component-toast-foreground",
    border: "--ld-component-toast-border",
    successBorder: "--ld-component-toast-success-border",
    dangerBorder: "--ld-component-toast-danger-border",
  },
  icon: {
    foreground: "--ld-component-icon-foreground",
    muted: "--ld-component-icon-muted",
    primary: "--ld-component-icon-primary",
    danger: "--ld-component-icon-danger",
  },
  code: {
    background: "--ld-component-code-background",
    foreground: "--ld-component-code-foreground",
    border: "--ld-component-code-border",
    radius: "--ld-component-code-radius",
  },
} as const;

export const lazyComponentTokens = {
  surface: toRefs(lazyComponentTokenVars.surface),
  text: toRefs(lazyComponentTokenVars.text),
  control: toRefs(lazyComponentTokenVars.control),
  button: toRefs(lazyComponentTokenVars.button),
  input: toRefs(lazyComponentTokenVars.input),
  field: toRefs(lazyComponentTokenVars.field),
  checkbox: toRefs(lazyComponentTokenVars.checkbox),
  switch: toRefs(lazyComponentTokenVars.switch),
  select: toRefs(lazyComponentTokenVars.select),
  badge: toRefs(lazyComponentTokenVars.badge),
  card: toRefs(lazyComponentTokenVars.card),
  tabs: toRefs(lazyComponentTokenVars.tabs),
  tooltip: toRefs(lazyComponentTokenVars.tooltip),
  overlay: toRefs(lazyComponentTokenVars.overlay),
  dialog: toRefs(lazyComponentTokenVars.dialog),
  drawer: toRefs(lazyComponentTokenVars.drawer),
  popover: toRefs(lazyComponentTokenVars.popover),
  toast: toRefs(lazyComponentTokenVars.toast),
  icon: toRefs(lazyComponentTokenVars.icon),
  code: toRefs(lazyComponentTokenVars.code),
} as const;

export type LazyComponentTheme = {
  style: LazyDesignStyle;
  surface: {
    background: string;
    foreground: string;
    border: string;
    level0: string;
    level1: string;
    level2: string;
    level3: string;
  };
  text: {
    primary: string;
    muted: string;
    link: string;
    code: string;
  };
  control: {
    radius: string;
    heightSm: string;
    heightMd: string;
    heightLg: string;
    paddingXSm: string;
    paddingXMd: string;
    paddingXLg: string;
    gap: string;
    border: string;
    focusRing: string;
    hover: string;
    pressed: string;
    motionHoverTransform: string;
    motionPressTransform: string;
  };
  button: {
    background: string;
    foreground: string;
    border: string;
    backgroundHover: string;
    backgroundPressed: string;
    primaryBackground: string;
    primaryForeground: string;
    primaryBackgroundHover: string;
    primaryBackgroundPressed: string;
    secondaryBackground: string;
    secondaryForeground: string;
    secondaryBackgroundHover: string;
    secondaryBackgroundPressed: string;
    dangerBackground: string;
    dangerForeground: string;
    dangerBackgroundHover: string;
    dangerBackgroundPressed: string;
    radius: string;
    height: string;
    paddingX: string;
    gap: string;
  };
  input: {
    background: string;
    foreground: string;
    placeholder: string;
    border: string;
    borderFocus: string;
    borderInvalid: string;
    radius: string;
    height: string;
    paddingX: string;
  };
  field: {
    labelForeground: string;
    descriptionForeground: string;
    errorForeground: string;
    gap: string;
  };
  checkbox: {
    background: string;
    backgroundChecked: string;
    foregroundChecked: string;
    border: string;
    borderChecked: string;
    radius: string;
    sizeSm: string;
    sizeMd: string;
  };
  switch: {
    trackBackground: string;
    trackBackgroundChecked: string;
    trackBorder: string;
    thumbBackground: string;
    thumbBackgroundChecked: string;
    widthSm: string;
    widthMd: string;
    heightSm: string;
    heightMd: string;
  };
  select: {
    triggerBackground: string;
    triggerForeground: string;
    triggerPlaceholder: string;
    triggerBorder: string;
    triggerBorderFocus: string;
    triggerBorderInvalid: string;
    contentBackground: string;
    contentForeground: string;
    contentBorder: string;
    contentShadow: string;
    itemBackgroundHighlighted: string;
    itemForegroundSelected: string;
    indicator: string;
    radius: string;
  };
  badge: {
    background: string;
    foreground: string;
    border: string;
    primaryBackground: string;
    primaryForeground: string;
    secondaryBackground: string;
    secondaryForeground: string;
    dangerBackground: string;
    dangerForeground: string;
    radius: string;
  };
  card: {
    background: string;
    foreground: string;
    border: string;
    radius: string;
    padding: string;
    headerGap: string;
    bodyGap: string;
    hoverBackground: string;
  };
  tabs: {
    listBackground: string;
    listBorder: string;
    triggerForeground: string;
    triggerBackgroundHover: string;
    triggerForegroundActive: string;
    triggerBackgroundActive: string;
    triggerBorderActive: string;
    indicator: string;
    radius: string;
    height: string;
    paddingX: string;
    gap: string;
  };
  tooltip: {
    background: string;
    foreground: string;
    border: string;
    radius: string;
    shadow: string;
    paddingX: string;
    paddingY: string;
  };
  overlay: Record<keyof typeof lazyComponentTokenVars.overlay, string>;
  dialog: Record<keyof typeof lazyComponentTokenVars.dialog, string>;
  drawer: Record<keyof typeof lazyComponentTokenVars.drawer, string>;
  popover: Record<keyof typeof lazyComponentTokenVars.popover, string>;
  toast: Record<keyof typeof lazyComponentTokenVars.toast, string>;
  icon: {
    foreground: string;
    muted: string;
    primary: string;
    danger: string;
  };
  code: {
    background: string;
    foreground: string;
    border: string;
    radius: string;
  };
  motion: {
    enter: LazyMotionRecipe;
    reveal: LazyMotionRecipe;
  };
  vars: LazyCssVars;
};

export function createComponentTheme(input: LazyComponentThemeInput): LazyComponentTheme {
  const style = input.style ?? "linear";
  const density = input.density ?? "standard";
  const motion = input.motion ?? "system";
  const vars = createComponentVars({ ...input, density, motion, style });

  return {
    style,
    surface: {
      background: vars[lazyComponentTokenVars.surface.background],
      foreground: vars[lazyComponentTokenVars.surface.foreground],
      border: vars[lazyComponentTokenVars.surface.border],
      level0: vars[lazyComponentTokenVars.surface.level0],
      level1: vars[lazyComponentTokenVars.surface.level1],
      level2: vars[lazyComponentTokenVars.surface.level2],
      level3: vars[lazyComponentTokenVars.surface.level3],
    },
    text: {
      primary: vars[lazyComponentTokenVars.text.primary],
      muted: vars[lazyComponentTokenVars.text.muted],
      link: vars[lazyComponentTokenVars.text.link],
      code: vars[lazyComponentTokenVars.text.code],
    },
    control: {
      radius: vars[lazyComponentTokenVars.control.radius],
      heightSm: vars[lazyComponentTokenVars.control.heightSm],
      heightMd: vars[lazyComponentTokenVars.control.heightMd],
      heightLg: vars[lazyComponentTokenVars.control.heightLg],
      paddingXSm: vars[lazyComponentTokenVars.control.paddingXSm],
      paddingXMd: vars[lazyComponentTokenVars.control.paddingXMd],
      paddingXLg: vars[lazyComponentTokenVars.control.paddingXLg],
      gap: vars[lazyComponentTokenVars.control.gap],
      border: vars[lazyComponentTokenVars.control.border],
      focusRing: vars[lazyComponentTokenVars.control.focusRing],
      hover: vars[lazyComponentTokenVars.control.hover],
      pressed: vars[lazyComponentTokenVars.control.pressed],
      motionHoverTransform: vars[lazyComponentTokenVars.control.motionHoverTransform],
      motionPressTransform: vars[lazyComponentTokenVars.control.motionPressTransform],
    },
    button: {
      background: vars[lazyComponentTokenVars.button.background],
      foreground: vars[lazyComponentTokenVars.button.foreground],
      border: vars[lazyComponentTokenVars.button.border],
      backgroundHover: vars[lazyComponentTokenVars.button.backgroundHover],
      backgroundPressed: vars[lazyComponentTokenVars.button.backgroundPressed],
      primaryBackground: vars[lazyComponentTokenVars.button.primaryBackground],
      primaryForeground: vars[lazyComponentTokenVars.button.primaryForeground],
      primaryBackgroundHover: vars[lazyComponentTokenVars.button.primaryBackgroundHover],
      primaryBackgroundPressed: vars[lazyComponentTokenVars.button.primaryBackgroundPressed],
      secondaryBackground: vars[lazyComponentTokenVars.button.secondaryBackground],
      secondaryForeground: vars[lazyComponentTokenVars.button.secondaryForeground],
      secondaryBackgroundHover: vars[lazyComponentTokenVars.button.secondaryBackgroundHover],
      secondaryBackgroundPressed: vars[lazyComponentTokenVars.button.secondaryBackgroundPressed],
      dangerBackground: vars[lazyComponentTokenVars.button.dangerBackground],
      dangerForeground: vars[lazyComponentTokenVars.button.dangerForeground],
      dangerBackgroundHover: vars[lazyComponentTokenVars.button.dangerBackgroundHover],
      dangerBackgroundPressed: vars[lazyComponentTokenVars.button.dangerBackgroundPressed],
      radius: vars[lazyComponentTokenVars.button.radius],
      height: vars[lazyComponentTokenVars.button.height],
      paddingX: vars[lazyComponentTokenVars.button.paddingX],
      gap: vars[lazyComponentTokenVars.button.gap],
    },
    input: {
      background: vars[lazyComponentTokenVars.input.background],
      foreground: vars[lazyComponentTokenVars.input.foreground],
      placeholder: vars[lazyComponentTokenVars.input.placeholder],
      border: vars[lazyComponentTokenVars.input.border],
      borderFocus: vars[lazyComponentTokenVars.input.borderFocus],
      borderInvalid: vars[lazyComponentTokenVars.input.borderInvalid],
      radius: vars[lazyComponentTokenVars.input.radius],
      height: vars[lazyComponentTokenVars.input.height],
      paddingX: vars[lazyComponentTokenVars.input.paddingX],
    },
    field: {
      labelForeground: vars[lazyComponentTokenVars.field.labelForeground],
      descriptionForeground: vars[lazyComponentTokenVars.field.descriptionForeground],
      errorForeground: vars[lazyComponentTokenVars.field.errorForeground],
      gap: vars[lazyComponentTokenVars.field.gap],
    },
    checkbox: {
      background: vars[lazyComponentTokenVars.checkbox.background],
      backgroundChecked: vars[lazyComponentTokenVars.checkbox.backgroundChecked],
      foregroundChecked: vars[lazyComponentTokenVars.checkbox.foregroundChecked],
      border: vars[lazyComponentTokenVars.checkbox.border],
      borderChecked: vars[lazyComponentTokenVars.checkbox.borderChecked],
      radius: vars[lazyComponentTokenVars.checkbox.radius],
      sizeSm: vars[lazyComponentTokenVars.checkbox.sizeSm],
      sizeMd: vars[lazyComponentTokenVars.checkbox.sizeMd],
    },
    switch: {
      trackBackground: vars[lazyComponentTokenVars.switch.trackBackground],
      trackBackgroundChecked: vars[lazyComponentTokenVars.switch.trackBackgroundChecked],
      trackBorder: vars[lazyComponentTokenVars.switch.trackBorder],
      thumbBackground: vars[lazyComponentTokenVars.switch.thumbBackground],
      thumbBackgroundChecked: vars[lazyComponentTokenVars.switch.thumbBackgroundChecked],
      widthSm: vars[lazyComponentTokenVars.switch.widthSm],
      widthMd: vars[lazyComponentTokenVars.switch.widthMd],
      heightSm: vars[lazyComponentTokenVars.switch.heightSm],
      heightMd: vars[lazyComponentTokenVars.switch.heightMd],
    },
    select: {
      triggerBackground: vars[lazyComponentTokenVars.select.triggerBackground],
      triggerForeground: vars[lazyComponentTokenVars.select.triggerForeground],
      triggerPlaceholder: vars[lazyComponentTokenVars.select.triggerPlaceholder],
      triggerBorder: vars[lazyComponentTokenVars.select.triggerBorder],
      triggerBorderFocus: vars[lazyComponentTokenVars.select.triggerBorderFocus],
      triggerBorderInvalid: vars[lazyComponentTokenVars.select.triggerBorderInvalid],
      contentBackground: vars[lazyComponentTokenVars.select.contentBackground],
      contentForeground: vars[lazyComponentTokenVars.select.contentForeground],
      contentBorder: vars[lazyComponentTokenVars.select.contentBorder],
      contentShadow: vars[lazyComponentTokenVars.select.contentShadow],
      itemBackgroundHighlighted: vars[lazyComponentTokenVars.select.itemBackgroundHighlighted],
      itemForegroundSelected: vars[lazyComponentTokenVars.select.itemForegroundSelected],
      indicator: vars[lazyComponentTokenVars.select.indicator],
      radius: vars[lazyComponentTokenVars.select.radius],
    },
    badge: {
      background: vars[lazyComponentTokenVars.badge.background],
      foreground: vars[lazyComponentTokenVars.badge.foreground],
      border: vars[lazyComponentTokenVars.badge.border],
      primaryBackground: vars[lazyComponentTokenVars.badge.primaryBackground],
      primaryForeground: vars[lazyComponentTokenVars.badge.primaryForeground],
      secondaryBackground: vars[lazyComponentTokenVars.badge.secondaryBackground],
      secondaryForeground: vars[lazyComponentTokenVars.badge.secondaryForeground],
      dangerBackground: vars[lazyComponentTokenVars.badge.dangerBackground],
      dangerForeground: vars[lazyComponentTokenVars.badge.dangerForeground],
      radius: vars[lazyComponentTokenVars.badge.radius],
    },
    card: {
      background: vars[lazyComponentTokenVars.card.background],
      foreground: vars[lazyComponentTokenVars.card.foreground],
      border: vars[lazyComponentTokenVars.card.border],
      radius: vars[lazyComponentTokenVars.card.radius],
      padding: vars[lazyComponentTokenVars.card.padding],
      headerGap: vars[lazyComponentTokenVars.card.headerGap],
      bodyGap: vars[lazyComponentTokenVars.card.bodyGap],
      hoverBackground: vars[lazyComponentTokenVars.card.hoverBackground],
    },
    tabs: {
      listBackground: vars[lazyComponentTokenVars.tabs.listBackground],
      listBorder: vars[lazyComponentTokenVars.tabs.listBorder],
      triggerForeground: vars[lazyComponentTokenVars.tabs.triggerForeground],
      triggerBackgroundHover: vars[lazyComponentTokenVars.tabs.triggerBackgroundHover],
      triggerForegroundActive: vars[lazyComponentTokenVars.tabs.triggerForegroundActive],
      triggerBackgroundActive: vars[lazyComponentTokenVars.tabs.triggerBackgroundActive],
      triggerBorderActive: vars[lazyComponentTokenVars.tabs.triggerBorderActive],
      indicator: vars[lazyComponentTokenVars.tabs.indicator],
      radius: vars[lazyComponentTokenVars.tabs.radius],
      height: vars[lazyComponentTokenVars.tabs.height],
      paddingX: vars[lazyComponentTokenVars.tabs.paddingX],
      gap: vars[lazyComponentTokenVars.tabs.gap],
    },
    tooltip: {
      background: vars[lazyComponentTokenVars.tooltip.background],
      foreground: vars[lazyComponentTokenVars.tooltip.foreground],
      border: vars[lazyComponentTokenVars.tooltip.border],
      radius: vars[lazyComponentTokenVars.tooltip.radius],
      shadow: vars[lazyComponentTokenVars.tooltip.shadow],
      paddingX: vars[lazyComponentTokenVars.tooltip.paddingX],
      paddingY: vars[lazyComponentTokenVars.tooltip.paddingY],
    },
    overlay: pickComponentValues(vars, lazyComponentTokenVars.overlay),
    dialog: pickComponentValues(vars, lazyComponentTokenVars.dialog),
    drawer: pickComponentValues(vars, lazyComponentTokenVars.drawer),
    popover: pickComponentValues(vars, lazyComponentTokenVars.popover),
    toast: pickComponentValues(vars, lazyComponentTokenVars.toast),
    icon: {
      foreground: vars[lazyComponentTokenVars.icon.foreground],
      muted: vars[lazyComponentTokenVars.icon.muted],
      primary: vars[lazyComponentTokenVars.icon.primary],
      danger: vars[lazyComponentTokenVars.icon.danger],
    },
    code: {
      background: vars[lazyComponentTokenVars.code.background],
      foreground: vars[lazyComponentTokenVars.code.foreground],
      border: vars[lazyComponentTokenVars.code.border],
      radius: vars[lazyComponentTokenVars.code.radius],
    },
    motion: {
      enter: createMotionRecipe("slide", motion),
      reveal: createMotionRecipe("reveal", motion),
    },
    vars,
  };
}

export function createComponentVars(input: LazyComponentThemeInput): LazyCssVars {
  const color = input.color;
  const density = input.density ?? "standard";
  const style = input.style ?? "linear";
  const dimensions = createDimensionScale(density);
  const radius = getControlRadius(style);
  const vars: LazyCssVars = {
    [lazyComponentTokenVars.surface.background]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.surface.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.surface.border]: `var(${lazyTokenVars.color.outlineVariant})`,
    [lazyComponentTokenVars.surface.level0]: `var(${lazyTokenVars.color.background})`,
    [lazyComponentTokenVars.surface.level1]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.surface.level2]: `var(${lazyTokenVars.color.surfaceContainer})`,
    [lazyComponentTokenVars.surface.level3]: `var(${lazyTokenVars.color.surfaceContainerHigh})`,
    [lazyComponentTokenVars.text.primary]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.text.muted]: `var(${lazyTokenVars.color.onSurfaceVariant})`,
    [lazyComponentTokenVars.text.link]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.text.code]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.control.radius]: radius,
    [lazyComponentTokenVars.control.heightSm]: dimensions.heightSm,
    [lazyComponentTokenVars.control.heightMd]: dimensions.heightMd,
    [lazyComponentTokenVars.control.heightLg]: dimensions.heightLg,
    [lazyComponentTokenVars.control.paddingXSm]: dimensions.paddingXSm,
    [lazyComponentTokenVars.control.paddingXMd]: dimensions.paddingXMd,
    [lazyComponentTokenVars.control.paddingXLg]: dimensions.paddingXLg,
    [lazyComponentTokenVars.control.gap]: `var(${lazyTokenVars.space[2]})`,
    [lazyComponentTokenVars.control.border]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.control.focusRing]: `var(${lazyTokenVars.color.focusRing})`,
    [lazyComponentTokenVars.control.hover]: `var(${lazyTokenVars.color.stateHover})`,
    [lazyComponentTokenVars.control.pressed]: `var(${lazyTokenVars.color.statePressed})`,
    [lazyComponentTokenVars.control.motionHoverTransform]: "translateY(-1px)",
    [lazyComponentTokenVars.control.motionPressTransform]: "translateY(1px)",
    [lazyComponentTokenVars.button.background]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.button.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.button.border]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.button.backgroundHover]: `var(${lazyTokenVars.color.stateHover})`,
    [lazyComponentTokenVars.button.backgroundPressed]: `var(${lazyTokenVars.color.statePressed})`,
    [lazyComponentTokenVars.button.primaryBackground]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.button.primaryForeground]: `var(${lazyTokenVars.color.onPrimary})`,
    [lazyComponentTokenVars.button.primaryBackgroundHover]: mixWith(color.primary, color.onPrimary, 8),
    [lazyComponentTokenVars.button.primaryBackgroundPressed]: mixWith(color.primary, color.onPrimary, 14),
    [lazyComponentTokenVars.button.secondaryBackground]: `var(${lazyTokenVars.color.secondary})`,
    [lazyComponentTokenVars.button.secondaryForeground]: `var(${lazyTokenVars.color.onSecondary})`,
    [lazyComponentTokenVars.button.secondaryBackgroundHover]: mixWith(
      `var(${lazyTokenVars.color.secondary})`,
      `var(${lazyTokenVars.color.onSecondary})`,
      8,
    ),
    [lazyComponentTokenVars.button.secondaryBackgroundPressed]: mixWith(
      `var(${lazyTokenVars.color.secondary})`,
      `var(${lazyTokenVars.color.onSecondary})`,
      14,
    ),
    [lazyComponentTokenVars.button.dangerBackground]: `var(${lazyTokenVars.color.error})`,
    [lazyComponentTokenVars.button.dangerForeground]: `var(${lazyTokenVars.color.onError})`,
    [lazyComponentTokenVars.button.dangerBackgroundHover]: mixWith(
      `var(${lazyTokenVars.color.error})`,
      `var(${lazyTokenVars.color.onError})`,
      8,
    ),
    [lazyComponentTokenVars.button.dangerBackgroundPressed]: mixWith(
      `var(${lazyTokenVars.color.error})`,
      `var(${lazyTokenVars.color.onError})`,
      14,
    ),
    [lazyComponentTokenVars.button.radius]: radius,
    [lazyComponentTokenVars.button.height]: dimensions.heightMd,
    [lazyComponentTokenVars.button.paddingX]: dimensions.paddingXMd,
    [lazyComponentTokenVars.button.gap]: `var(${lazyTokenVars.space[2]})`,
    [lazyComponentTokenVars.input.background]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.input.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.input.placeholder]: `var(${lazyTokenVars.color.onSurfaceVariant})`,
    [lazyComponentTokenVars.input.border]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.input.borderFocus]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.input.borderInvalid]: `var(${lazyTokenVars.color.error})`,
    [lazyComponentTokenVars.input.radius]: radius,
    [lazyComponentTokenVars.input.height]: dimensions.heightMd,
    [lazyComponentTokenVars.input.paddingX]: dimensions.paddingXMd,
    [lazyComponentTokenVars.field.labelForeground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.field.descriptionForeground]: `var(${lazyTokenVars.color.onSurfaceVariant})`,
    [lazyComponentTokenVars.field.errorForeground]: `var(${lazyTokenVars.color.error})`,
    [lazyComponentTokenVars.field.gap]: `var(${lazyTokenVars.space[2]})`,
    [lazyComponentTokenVars.checkbox.background]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.checkbox.backgroundChecked]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.checkbox.foregroundChecked]: `var(${lazyTokenVars.color.onPrimary})`,
    [lazyComponentTokenVars.checkbox.border]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.checkbox.borderChecked]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.checkbox.radius]: `var(${lazyTokenVars.shape.cornerExtraSmall})`,
    [lazyComponentTokenVars.checkbox.sizeSm]: density === "compact" ? "14px" : "16px",
    [lazyComponentTokenVars.checkbox.sizeMd]: density === "compact" ? "16px" : "18px",
    [lazyComponentTokenVars.switch.trackBackground]: `var(${lazyTokenVars.color.surfaceContainerHigh})`,
    [lazyComponentTokenVars.switch.trackBackgroundChecked]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.switch.trackBorder]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.switch.thumbBackground]: `var(${lazyTokenVars.color.onSurfaceVariant})`,
    [lazyComponentTokenVars.switch.thumbBackgroundChecked]: `var(${lazyTokenVars.color.onPrimary})`,
    [lazyComponentTokenVars.switch.widthSm]: density === "compact" ? "28px" : "30px",
    [lazyComponentTokenVars.switch.widthMd]: density === "compact" ? "32px" : "36px",
    [lazyComponentTokenVars.switch.heightSm]: density === "compact" ? "16px" : "18px",
    [lazyComponentTokenVars.switch.heightMd]: density === "compact" ? "18px" : "20px",
    [lazyComponentTokenVars.select.triggerBackground]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.select.triggerForeground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.select.triggerPlaceholder]: `var(${lazyTokenVars.color.onSurfaceVariant})`,
    [lazyComponentTokenVars.select.triggerBorder]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.select.triggerBorderFocus]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.select.triggerBorderInvalid]: `var(${lazyTokenVars.color.error})`,
    [lazyComponentTokenVars.select.contentBackground]: `var(${lazyTokenVars.color.surfaceContainer})`,
    [lazyComponentTokenVars.select.contentForeground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.select.contentBorder]: `var(${lazyTokenVars.color.outlineVariant})`,
    [lazyComponentTokenVars.select.contentShadow]: `0 12px 32px color-mix(in srgb, var(${lazyTokenVars.color.onSurface}), transparent 82%)`,
    [lazyComponentTokenVars.select.itemBackgroundHighlighted]: `var(${lazyTokenVars.color.stateHover})`,
    [lazyComponentTokenVars.select.itemForegroundSelected]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.select.indicator]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.select.radius]: radius,
    [lazyComponentTokenVars.badge.background]: `var(${lazyTokenVars.color.surfaceContainer})`,
    [lazyComponentTokenVars.badge.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.badge.border]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.badge.primaryBackground]: `var(${lazyTokenVars.color.primaryContainer})`,
    [lazyComponentTokenVars.badge.primaryForeground]: `var(${lazyTokenVars.color.onPrimaryContainer})`,
    [lazyComponentTokenVars.badge.secondaryBackground]: `var(${lazyTokenVars.color.secondaryContainer})`,
    [lazyComponentTokenVars.badge.secondaryForeground]: `var(${lazyTokenVars.color.onSecondaryContainer})`,
    [lazyComponentTokenVars.badge.dangerBackground]: `color-mix(in srgb, var(${lazyTokenVars.color.error}), transparent 86%)`,
    [lazyComponentTokenVars.badge.dangerForeground]: `var(${lazyTokenVars.color.error})`,
    [lazyComponentTokenVars.badge.radius]: `var(${lazyTokenVars.shape.cornerFull})`,
    [lazyComponentTokenVars.card.background]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.card.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.card.border]: `var(${lazyTokenVars.color.outlineVariant})`,
    [lazyComponentTokenVars.card.radius]: `var(${lazyTokenVars.shape.cornerMedium})`,
    [lazyComponentTokenVars.card.padding]: density === "compact" ? `var(${lazyTokenVars.space[3]})` : `var(${lazyTokenVars.space[4]})`,
    [lazyComponentTokenVars.card.headerGap]: `var(${lazyTokenVars.space[2]})`,
    [lazyComponentTokenVars.card.bodyGap]: `var(${lazyTokenVars.space[3]})`,
    [lazyComponentTokenVars.card.hoverBackground]: `var(${lazyTokenVars.color.surfaceContainerLow})`,
    [lazyComponentTokenVars.tabs.listBackground]: `var(${lazyTokenVars.color.surfaceContainer})`,
    [lazyComponentTokenVars.tabs.listBorder]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.tabs.triggerForeground]: `var(${lazyTokenVars.color.onSurfaceVariant})`,
    [lazyComponentTokenVars.tabs.triggerBackgroundHover]: `var(${lazyTokenVars.color.stateHover})`,
    [lazyComponentTokenVars.tabs.triggerForegroundActive]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.tabs.triggerBackgroundActive]: `var(${lazyTokenVars.color.surface})`,
    [lazyComponentTokenVars.tabs.triggerBorderActive]: `var(${lazyTokenVars.color.outlineVariant})`,
    [lazyComponentTokenVars.tabs.indicator]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.tabs.radius]: radius,
    [lazyComponentTokenVars.tabs.height]: dimensions.heightSm,
    [lazyComponentTokenVars.tabs.paddingX]: dimensions.paddingXSm,
    [lazyComponentTokenVars.tabs.gap]: `var(${lazyTokenVars.space[1]})`,
    [lazyComponentTokenVars.tooltip.background]: `var(${lazyTokenVars.color.inverseSurface})`,
    [lazyComponentTokenVars.tooltip.foreground]: `var(${lazyTokenVars.color.inverseOnSurface})`,
    [lazyComponentTokenVars.tooltip.border]: `var(${lazyTokenVars.color.outlineVariant})`,
    [lazyComponentTokenVars.tooltip.radius]: `var(${lazyTokenVars.shape.cornerSmall})`,
    [lazyComponentTokenVars.tooltip.shadow]: `0 8px 24px color-mix(in srgb, var(${lazyTokenVars.color.inverseSurface}), transparent 84%)`,
    [lazyComponentTokenVars.tooltip.paddingX]: `var(${lazyTokenVars.space[2]})`,
    [lazyComponentTokenVars.tooltip.paddingY]: `var(${lazyTokenVars.space[1]})`,
    [lazyComponentTokenVars.overlay.backdrop]: `color-mix(in srgb, var(${lazyTokenVars.color.onSurface}), transparent 72%)`,
    [lazyComponentTokenVars.overlay.background]: `var(${lazyTokenVars.color.surfaceContainer})`,
    [lazyComponentTokenVars.overlay.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.overlay.border]: `var(${lazyTokenVars.color.outlineVariant})`,
    [lazyComponentTokenVars.overlay.radius]:
      style === "material" || style === "expressive"
        ? `var(${lazyTokenVars.shape.cornerLarge})`
        : `var(${lazyTokenVars.shape.cornerMedium})`,
    [lazyComponentTokenVars.overlay.shadow]: `0 16px 48px color-mix(in srgb, var(${lazyTokenVars.color.onSurface}), transparent 84%)`,
    [lazyComponentTokenVars.overlay.padding]: density === "compact" ? `var(${lazyTokenVars.space[4]})` : `var(${lazyTokenVars.space[6]})`,
    [lazyComponentTokenVars.overlay.headerGap]: density === "compact" ? `var(${lazyTokenVars.space[1]})` : `var(${lazyTokenVars.space[2]})`,
    [lazyComponentTokenVars.overlay.bodyGap]: density === "compact" ? `var(${lazyTokenVars.space[3]})` : `var(${lazyTokenVars.space[4]})`,
    [lazyComponentTokenVars.overlay.footerGap]: density === "compact" ? `var(${lazyTokenVars.space[2]})` : `var(${lazyTokenVars.space[3]})`,
    [lazyComponentTokenVars.overlay.zIndex]: "60",
    [lazyComponentTokenVars.dialog.widthSm]: "360px",
    [lazyComponentTokenVars.dialog.widthMd]: "520px",
    [lazyComponentTokenVars.dialog.widthLg]: "720px",
    [lazyComponentTokenVars.drawer.widthSm]: "320px",
    [lazyComponentTokenVars.drawer.widthMd]: "420px",
    [lazyComponentTokenVars.drawer.widthLg]: "560px",
    [lazyComponentTokenVars.drawer.heightSm]: "320px",
    [lazyComponentTokenVars.drawer.heightMd]: "420px",
    [lazyComponentTokenVars.drawer.heightLg]: "560px",
    [lazyComponentTokenVars.popover.widthSm]: "220px",
    [lazyComponentTokenVars.popover.widthMd]: "300px",
    [lazyComponentTokenVars.popover.arrowSize]: "10px",
    [lazyComponentTokenVars.toast.width]: "360px",
    [lazyComponentTokenVars.toast.background]: `var(${lazyTokenVars.color.surfaceContainer})`,
    [lazyComponentTokenVars.toast.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.toast.border]: `var(${lazyTokenVars.color.outlineVariant})`,
    [lazyComponentTokenVars.toast.successBorder]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.toast.dangerBorder]: `var(${lazyTokenVars.color.error})`,
    [lazyComponentTokenVars.icon.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.icon.muted]: `var(${lazyTokenVars.color.onSurfaceVariant})`,
    [lazyComponentTokenVars.icon.primary]: `var(${lazyTokenVars.color.primary})`,
    [lazyComponentTokenVars.icon.danger]: `var(${lazyTokenVars.color.error})`,
    [lazyComponentTokenVars.code.background]: `var(${lazyTokenVars.color.surfaceContainer})`,
    [lazyComponentTokenVars.code.foreground]: `var(${lazyTokenVars.color.onSurface})`,
    [lazyComponentTokenVars.code.border]: `var(${lazyTokenVars.color.borderMuted})`,
    [lazyComponentTokenVars.code.radius]: `var(${lazyTokenVars.shape.cornerSmall})`,
  };

  return vars;
}

function createDimensionScale(density: LazyComponentDensity) {
  if (density === "compact") {
    return {
      heightSm: "28px",
      heightMd: "32px",
      heightLg: "36px",
      paddingXSm: "8px",
      paddingXMd: "10px",
      paddingXLg: "12px",
    };
  }

  return {
    heightSm: "32px",
    heightMd: "38px",
    heightLg: "44px",
    paddingXSm: "10px",
    paddingXMd: "12px",
    paddingXLg: "14px",
  };
}

function getControlRadius(style: LazyDesignStyle) {
  if (style === "material" || style === "expressive") {
    return `var(${lazyTokenVars.shape.cornerMedium})`;
  }

  return `var(${lazyTokenVars.shape.cornerSmall})`;
}

function mixWith(base: string, overlay: string, amount: number) {
  return `color-mix(in srgb, ${base}, ${overlay} ${amount}%)`;
}

function pickComponentValues<T extends Record<string, string>>(vars: LazyCssVars, tokenVars: T) {
  return Object.fromEntries(Object.entries(tokenVars).map(([key, value]) => [key, vars[value]])) as Record<keyof T, string>;
}

function toRefs<T extends Record<string, string>>(vars: T) {
  return Object.fromEntries(Object.entries(vars).map(([key, value]) => [key, `var(${value})`])) as {
    readonly [Key in keyof T]: `var(${T[Key]})`;
  };
}
