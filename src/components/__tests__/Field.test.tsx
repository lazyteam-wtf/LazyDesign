import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field, FieldDescription, FieldError, FieldLabel } from "../Field";
import { Input } from "../Input";

describe("Field", () => {
  it("connects its label, description, error, invalid, and required state", () => {
    render(
      <Field invalid required>
        <FieldLabel>Project slug</FieldLabel>
        <Input />
        <FieldDescription>Lowercase letters only.</FieldDescription>
        <FieldError>Slug is unavailable.</FieldError>
      </Field>,
    );

    const control = screen.getByRole("textbox", { name: "Project slug" });

    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAttribute("aria-required", "true");
    expect(control).toHaveAccessibleDescription("Lowercase letters only. Slug is unavailable.");
  });

  it("preserves explicit control ids and aria state while merging descriptions", () => {
    render(
      <Field disabled invalid required>
        <FieldLabel>Project name</FieldLabel>
        <Input
          aria-describedby="external-description"
          aria-invalid="false"
          aria-required="false"
          disabled={false}
          id="project-name"
        />
        <span id="external-description">Visible to the whole team.</span>
        <FieldDescription>Used in workspace navigation.</FieldDescription>
        <FieldError>Name is unavailable.</FieldError>
      </Field>,
    );

    const control = screen.getByRole("textbox", { name: "Project name" });

    expect(control).toHaveAttribute("id", "project-name");
    expect(control).toHaveAttribute("aria-invalid", "false");
    expect(control).toHaveAttribute("aria-required", "false");
    expect(control).not.toBeDisabled();
    expect(control).toHaveAccessibleDescription("Visible to the whole team. Used in workspace navigation.");
  });

  it("treats grammar and spelling aria-invalid values as invalid states", () => {
    render(
      <Field invalid>
        <FieldLabel>Release note</FieldLabel>
        <Input aria-invalid="grammar" />
        <FieldError>Review the release note grammar.</FieldError>
      </Field>,
    );

    const control = screen.getByRole("textbox", { name: "Release note" });

    expect(control).toHaveAttribute("aria-invalid", "grammar");
    expect(control).toHaveAccessibleDescription("Review the release note grammar.");
  });
});
