import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cx } from "../primitives/utils";

export type CodeProps = Omit<ComponentPropsWithoutRef<"code">, "color"> & {
  block?: boolean;
};

export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  {
    block = false,
    children,
    className,
    ...props
  },
  ref,
) {
  if (block) {
    return (
      <pre className={cx("ld-code-block", className)}>
        <code {...props} className="ld-code" ref={ref}>
          {children}
        </code>
      </pre>
    );
  }

  return (
    <code {...props} className={cx("ld-code", className)} ref={ref}>
      {children}
    </code>
  );
});
