import { defineConfig } from "tsup"
import tsupConfig from "@halvaradop/tsup-config"

export default defineConfig({
    ...tsupConfig,
    entry: ["src", "!src/validate-types.ts"],
    format: ["esm"],
    dts: {
        only: true,
    },
})
