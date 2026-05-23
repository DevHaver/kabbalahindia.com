import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    // The signup integration test boots a Nuxt server — give it room.
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
});
