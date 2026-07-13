import { forwardRef, useId, type ReactNode } from "react";
import { type LazyComponentSize, type LazyIconSlot, type NativeInputProps } from "./types";
import { cx } from "../primitives/utils";
import { isAriaInvalid, useFieldControlProps } from "./Field";

export type LazyInputState = "default" | "error";

export type InputProps = NativeInputProps & {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  invalid?: boolean;
  state?: LazyInputState;
  inputSize?: LazyComponentSize;
  iconStart?: LazyIconSlot;
  iconEnd?: LazyIconSlot;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    description,
    disabled,
    error,
    iconEnd,
    iconStart,
    id,
    inputSize = "md",
    invalid,
    label,
    state = "default",
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const fieldControlProps = useFieldControlProps({ ...props, disabled, id });
  const inputId = fieldControlProps.id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const fieldInvalid = isAriaInvalid(fieldControlProps["aria-invalid"]);
  const resolvedState: LazyInputState = invalid || error || fieldInvalid ? "error" : state;
  const isInvalid = resolvedState === "error";
  const describedBy = mergeIds(fieldControlProps["aria-describedby"], descriptionId, errorId);

  return (
    <div
      className={cx("ld-field", className)}
      data-disabled={fieldControlProps.disabled ? "" : undefined}
      data-invalid={isInvalid ? "" : undefined}
      data-state={resolvedState}
    >
      {label ? (
        <label className="ld-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className="ld-input" data-size={inputSize} data-state={resolvedState}>
        {iconStart ? <span className="ld-input__icon">{iconStart}</span> : null}
        <input
          {...fieldControlProps}
          aria-describedby={describedBy}
          aria-invalid={fieldControlProps["aria-invalid"] ?? (isInvalid ? true : undefined)}
          className="ld-input__control"
          id={inputId}
          ref={ref}
        />
        {iconEnd ? <span className="ld-input__icon">{iconEnd}</span> : null}
      </div>
      {description ? (
        <div className="ld-field__description" id={descriptionId}>
          {description}
        </div>
      ) : null}
      {error ? (
        <div className="ld-field__error" id={errorId}>
          {error}
        </div>
      ) : null}
    </div>
  );
});

function mergeIds(...values: Array<string | undefined>) {
  const ids = new Set(values.flatMap((value) => value?.split(/\s+/).filter(Boolean) ?? []));
  return ids.size > 0 ? Array.from(ids).join(" ") : undefined;
}
