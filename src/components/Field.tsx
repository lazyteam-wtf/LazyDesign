import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { cx } from "../primitives/utils";

type AriaBoolean = boolean | "false" | "true";
type AriaInvalid = AriaBoolean | "grammar" | "spelling";

type FieldContextValue = {
  controlId: string;
  descriptionId: string;
  errorId: string;
  descriptionPresent: boolean;
  errorPresent: boolean;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  registerControlId(id: string): void;
  registerDescription(): () => void;
  registerError(): () => void;
};

const FieldContext = createContext<FieldContextValue | null>(null);

export type FieldProps = ComponentPropsWithoutRef<"div"> & {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
};

export type FieldLabelProps = ComponentPropsWithoutRef<"label">;
export type FieldDescriptionProps = ComponentPropsWithoutRef<"div">;
export type FieldErrorProps = ComponentPropsWithoutRef<"div">;

export type FieldControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: AriaInvalid;
  "aria-required"?: AriaBoolean;
  disabled?: boolean;
};

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  {
    children,
    className,
    disabled = false,
    invalid = false,
    required = false,
    ...props
  },
  ref,
) {
  const generatedId = useId().replace(/:/g, "");
  const [controlId, setControlId] = useState(`ld-field-${generatedId}-control`);
  const [descriptionPresent, setDescriptionPresent] = useState(false);
  const [errorPresent, setErrorPresent] = useState(false);
  const descriptionId = `ld-field-${generatedId}-description`;
  const errorId = `ld-field-${generatedId}-error`;

  const registerControlId = useCallback((nextControlId: string) => {
    setControlId((currentControlId) => currentControlId === nextControlId ? currentControlId : nextControlId);
  }, []);
  const registerDescription = useCallback(() => {
    setDescriptionPresent(true);
    return () => setDescriptionPresent(false);
  }, []);
  const registerError = useCallback(() => {
    setErrorPresent(true);
    return () => setErrorPresent(false);
  }, []);
  const contextValue = useMemo<FieldContextValue>(() => ({
    controlId,
    descriptionId,
    errorId,
    descriptionPresent,
    errorPresent,
    disabled,
    invalid,
    required,
    registerControlId,
    registerDescription,
    registerError,
  }), [
    controlId,
    descriptionId,
    descriptionPresent,
    disabled,
    errorId,
    errorPresent,
    invalid,
    registerControlId,
    registerDescription,
    registerError,
    required,
  ]);

  return (
    <FieldContext.Provider value={contextValue}>
      <div
        {...props}
        className={cx("ld-field", className)}
        data-disabled={disabled ? "" : undefined}
        data-invalid={invalid ? "" : undefined}
        data-required={required ? "" : undefined}
        ref={ref}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
});

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
  { className, htmlFor, ...props },
  ref,
) {
  const field = useRequiredFieldContext("FieldLabel");

  return (
    <label
      {...props}
      className={cx("ld-field__label", className)}
      htmlFor={htmlFor ?? field.controlId}
      ref={ref}
    />
  );
});

export const FieldDescription = forwardRef<HTMLDivElement, FieldDescriptionProps>(function FieldDescription(
  { className, id, ...props },
  ref,
) {
  const field = useRequiredFieldContext("FieldDescription");

  useLayoutEffect(() => field.registerDescription(), [field.registerDescription]);

  return (
    <div
      {...props}
      className={cx("ld-field__description", className)}
      id={id ?? field.descriptionId}
      ref={ref}
    />
  );
});

export const FieldError = forwardRef<HTMLDivElement, FieldErrorProps>(function FieldError(
  { className, id, ...props },
  ref,
) {
  const field = useRequiredFieldContext("FieldError");

  useLayoutEffect(() => field.registerError(), [field.registerError]);

  return (
    <div
      {...props}
      className={cx("ld-field__error", className)}
      id={id ?? field.errorId}
      ref={ref}
      role="alert"
    />
  );
});

export function useFieldControlProps<T extends FieldControlProps>(props: T): T {
  const field = useContext(FieldContext);
  const registerControlId = field?.registerControlId;
  const resolvedId = props.id ?? field?.controlId;
  const resolvedInvalid = props["aria-invalid"] ?? field?.invalid ?? undefined;
  const resolvedRequired = props["aria-required"] ?? field?.required ?? undefined;
  const resolvedDisabled = props.disabled ?? field?.disabled;
  const describedBy = mergeIds(
    props["aria-describedby"],
    field?.descriptionPresent ? field.descriptionId : undefined,
    field?.errorPresent && isAriaInvalid(resolvedInvalid) ? field.errorId : undefined,
  );

  useLayoutEffect(() => {
    if (registerControlId && resolvedId) registerControlId(resolvedId);
  }, [registerControlId, resolvedId]);

  return {
    ...props,
    id: resolvedId,
    "aria-describedby": describedBy,
    "aria-invalid": resolvedInvalid,
    "aria-required": resolvedRequired,
    disabled: resolvedDisabled,
  };
}

function useRequiredFieldContext(componentName: string) {
  const field = useContext(FieldContext);
  if (!field) {
    throw new Error(`${componentName} must be rendered inside Field.`);
  }
  return field;
}

function mergeIds(...values: Array<string | undefined>) {
  const ids = new Set(values.flatMap((value) => value?.split(/\s+/).filter(Boolean) ?? []));
  return ids.size > 0 ? Array.from(ids).join(" ") : undefined;
}

export function isAriaInvalid(value: AriaInvalid | undefined) {
  return value !== undefined && value !== false && value !== "false";
}
