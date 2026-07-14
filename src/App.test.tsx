import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("LazyTeam.wtf form foundation", () => {
  it("exposes stateful runtime controls inside the Motion Grid workspace", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("tab", { name: "Motion Grid" }));

    const profile = screen.getByRole("combobox", { name: "Runtime profile" });
    const reducedMotion = screen.getByRole("switch", { name: "Reduced interface motion" });
    const telemetry = screen.getByRole("checkbox", { name: "Runtime telemetry" });
    const releaseGate = screen.getByRole("textbox", { name: "Release gate" });

    expect(profile).toHaveTextContent("Linear");
    expect(reducedMotion).not.toBeChecked();
    expect(telemetry).toBeChecked();
    expect(releaseGate).toHaveAttribute("aria-invalid", "true");
    expect(releaseGate).toHaveAccessibleDescription("Choose a gate before deployment.");

    await user.click(reducedMotion);
    await user.click(telemetry);

    expect(reducedMotion).toBeChecked();
    expect(telemetry).not.toBeChecked();
  });

  it("opens overlay workflows and shows toast feedback", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("tab", { name: "Motion Grid" }));

    await user.click(screen.getByRole("button", { name: "Run sequence" }));
    const sequenceDialog = screen.getByRole("dialog", { name: "Run deployment sequence" });
    expect(sequenceDialog).toBeInTheDocument();
    expect(within(sequenceDialog).getByText("Runtime profile")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Confirm sequence" }));
    expect(screen.queryByRole("dialog", { name: "Run deployment sequence" })).not.toBeInTheDocument();
    expect(screen.getByText("Sequence queued")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Calibrate" }));
    expect(screen.getByRole("dialog", { name: "Calibrate runtime" })).toHaveAttribute("data-side", "right");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Calibrate runtime" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Runtime profile summary" }));
    expect(screen.getByText("Linear density profile")).toBeInTheDocument();
  });
});
