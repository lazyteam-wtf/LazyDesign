import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "../Popover";

describe("Popover", () => {
  it("opens contextual content, closes on Escape, and restores focus", async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Runtime profile summary</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Linear density profile</PopoverTitle>
          <PopoverDescription>Runtime surfaces stay flat and compact.</PopoverDescription>
          <PopoverClose>Dismiss</PopoverClose>
        </PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: "Runtime profile summary" });
    await user.click(trigger);

    expect(screen.getByText("Linear density profile")).toBeInTheDocument();
    expect(screen.getByText("Runtime surfaces stay flat and compact.")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByText("Linear density profile")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
