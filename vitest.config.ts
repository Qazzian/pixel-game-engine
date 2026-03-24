import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,          // describe/it/expect without imports
    environment: "jsdom",
		setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
    },
  },
});
