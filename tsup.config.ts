import { defineConfig } from "tsup";

export const tsup = defineConfig([
	{
		entry: ["src/*.ts"],
        format: ["cjs"],
        outDir: "dist",
		dts: {
			only: true,
		},
		minify: true,
		clean: true
	},
	{
		entry: ["src/validate-types.ts"],
        format: ["cjs", "esm"],
        outDir: "dist/utils",
        dts: true,
		minify: true,
		clean: true
	},
]);
