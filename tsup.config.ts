import { defineConfig } from "tsup";

export const tsup = defineConfig([
	{
		entry: ["src/*.ts"],
		format: ["esm"],
		outDir: "dist",
		dts: {
			only: true,
		},
		minify: true,
		clean: true,
	},
]);
