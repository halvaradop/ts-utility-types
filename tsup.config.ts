import { defineConfig } from "tsup"

/**
 * Configuration for the tsup bundler. This configuration specifies two main entry points
 * for building the package. The first entry point builds the utility types, generating only
 * the .d.ts files. The second entry point handles files that need to be built in both .js and
 * .cjs formats.
 */
export const tsup = defineConfig({
    entry: ["src", "!src/validate-types.ts"],
    format: ["esm"],
    outDir: "dist",
    dts: {
        only: true,
    },
    minify: true,
    clean: true,
})
