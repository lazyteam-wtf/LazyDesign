import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select";

function RuntimeProfileSelect({ onValueChange = vi.fn() }: { onValueChange?: (value: string) => void }) {
  return (
    <Select defaultValue="linear" onValueChange={onValueChange}>
      <SelectTrigger aria-label="Runtime profile">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="linear">Linear</SelectItem>
        <SelectItem value="material">Material</SelectItem>
        <SelectItem disabled value="enterprise">Enterprise</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("opens from the keyboard, commits a value, and restores trigger focus", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RuntimeProfileSelect onValueChange={onValueChange} />);

    const trigger = screen.getByRole("combobox", { name: "Runtime profile" });
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{ArrowDown}{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("material");
    expect(trigger).toHaveTextContent("Material");
    expect(trigger).toHaveFocus();
  });

  it("closes on Escape without committing and prevents disabled selection", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RuntimeProfileSelect onValueChange={onValueChange} />);

    const trigger = screen.getByRole("combobox", { name: "Runtime profile" });
    await user.click(trigger);

    const disabledOption = screen.getByRole("option", { name: "Enterprise" });
    expect(disabledOption).toHaveAttribute("aria-disabled", "true");
    await user.click(disabledOption);
    expect(onValueChange).not.toHaveBeenCalled();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent("Linear");
    expect(trigger).toHaveFocus();
  });
});
