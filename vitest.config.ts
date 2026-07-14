import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    css: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "**/.worktrees/**"],
    setupFiles: ["./src/test/setup.ts"],
  },
});
