import { forwardRef, useId, type ReactNode } from "react";
import { type LazyComponentSize, type LazyIconSlot, type NativeInputProps } from "./types";
import { cx } from "../primitives/utils";

export type InputProps = NativeInputProps & {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  invalid?: boolean;
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
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const isInvalid = invalid || Boolean(error);

  return (
    <div className={cx("ld-field", className)} data-disabled={disabled ? "" : undefined} data-invalid={isInvalid ? "" : undefined}>
      {label ? (
        <label className="ld-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className="ld-input" data-size={inputSize}>
        {iconStart ? <span className="ld-input__icon">{iconStart}</span> : null}
        <input
          {...props}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
          aria-invalid={isInvalid || undefined}
          className="ld-input__control"
          disabled={disabled}
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
