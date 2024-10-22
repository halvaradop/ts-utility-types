import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            provider: "v8",
            include: ["test/**/*.test.ts"],
            exclude: ["node_modules", "dist"],
            reporter: ["text", "html"],
            reportsDirectory: "test/coverage",
        },
    },
});
