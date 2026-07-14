import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../Drawer";

describe("Drawer", () => {
  it("opens from the requested side and restores focus after close", async () => {
    const user = userEvent.setup();

    render(
      <Drawer>
        <DrawerTrigger>Calibrate</DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Calibrate runtime</DrawerTitle>
            <DrawerDescription>Adjust motion profile.</DrawerDescription>
          </DrawerHeader>
          <DrawerClose>Close</DrawerClose>
        </DrawerContent>
      </Drawer>,
    );

    const trigger = screen.getByRole("button", { name: "Calibrate" });
    await user.click(trigger);

    const drawer = screen.getByRole("dialog", { name: "Calibrate runtime" });
    expect(drawer).toHaveAttribute("data-side", "right");

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
