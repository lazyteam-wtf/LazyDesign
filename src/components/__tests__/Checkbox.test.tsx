import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../Checkbox";
import { Field, FieldLabel } from "../Field";

describe("Checkbox", () => {
  it("toggles through pointer and keyboard interaction", async () => {
    const user = userEvent.setup();
    render(
      <Field>
        <Checkbox />
        <FieldLabel>Runtime telemetry</FieldLabel>
      </Field>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Runtime telemetry" });

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    checkbox.focus();
    await user.keyboard(" ");
    expect(checkbox).not.toBeChecked();
  });

  it("preserves the indeterminate state and reports state changes", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Field>
        <Checkbox checked="indeterminate" onCheckedChange={onCheckedChange} />
        <FieldLabel>Partial rollout</FieldLabel>
      </Field>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Partial rollout" });

    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    await user.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("inherits invalid and disabled state from Field", async () => {
    const user = userEvent.setup();
    render(
      <Field disabled invalid>
        <Checkbox />
        <FieldLabel>Protected setting</FieldLabel>
      </Field>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Protected setting" });

    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
