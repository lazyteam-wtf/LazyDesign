import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";

describe("Dialog", () => {
  it("opens, labels content, closes on Escape, and restores focus", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Run sequence</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run deployment sequence</DialogTitle>
            <DialogDescription>Confirm runtime changes.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    const trigger = screen.getByRole("button", { name: "Run sequence" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Run deployment sequence" });
    expect(dialog).toHaveAccessibleDescription("Confirm runtime changes.");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
