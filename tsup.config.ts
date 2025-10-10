import { defineConfig } from "tsup"
import { tsupConfig } from "@halvaradop/tsup-config"

/**
 * Configuration for the tsup bundler. This configuration specifies two main entry points
 * for building the package. The first entry point builds the utility types, generating only
 * the .d.ts files. The second entry point handles files that need to be built in both .js and
 * .cjs formats.
 */
export default defineConfig({
    ...tsupConfig,
    entry: ["src", "!src/validate-types.ts"],
    format: ["esm"],
    dts: {
        only: true,
    },
})
