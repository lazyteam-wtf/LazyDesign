import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Field, FieldLabel } from "../Field";
import { Switch } from "../Switch";

describe("Switch", () => {
  it("toggles through pointer and keyboard interaction", async () => {
    const user = userEvent.setup();
    render(
      <Field>
        <Switch />
        <FieldLabel>Reduced motion</FieldLabel>
      </Field>,
    );

    const control = screen.getByRole("switch", { name: "Reduced motion" });

    await user.click(control);
    expect(control).toBeChecked();

    control.focus();
    await user.keyboard(" ");
    expect(control).not.toBeChecked();
  });

  it("supports controlled state", async () => {
    const user = userEvent.setup();

    function ControlledSwitch() {
      const [checked, setChecked] = useState(false);
      return (
        <Field>
          <Switch checked={checked} onCheckedChange={setChecked} />
          <FieldLabel>Auto deploy</FieldLabel>
        </Field>
      );
    }

    render(<ControlledSwitch />);

    const control = screen.getByRole("switch", { name: "Auto deploy" });
    await user.click(control);
    expect(control).toBeChecked();
  });

  it("inherits invalid and disabled state from Field", async () => {
    const user = userEvent.setup();
    render(
      <Field disabled invalid>
        <Switch />
        <FieldLabel>Protected automation</FieldLabel>
      </Field>,
    );

    const control = screen.getByRole("switch", { name: "Protected automation" });

    expect(control).toBeDisabled();
    expect(control).toHaveAttribute("aria-invalid", "true");
    await user.click(control);
    expect(control).not.toBeChecked();
  });
});
