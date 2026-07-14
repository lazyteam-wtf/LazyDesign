import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../Toast";

describe("Toast", () => {
  it("renders non-blocking status content and can dismiss", async () => {
    const user = userEvent.setup();

    function Fixture() {
      const [open, setOpen] = useState(true);

      return (
        <ToastProvider>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Sequence queued</ToastTitle>
            <ToastDescription>Runtime profile Linear is ready.</ToastDescription>
            <ToastClose>Dismiss</ToastClose>
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    }

    render(<Fixture />);

    expect(screen.getByText("Sequence queued")).toBeInTheDocument();
    expect(screen.getByText("Runtime profile Linear is ready.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Dismiss" }));

    await waitFor(() => {
      expect(screen.queryByText("Sequence queued")).not.toBeInTheDocument();
    });
  });
});
