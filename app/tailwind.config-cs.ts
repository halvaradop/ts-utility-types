import type { Config } from "tailwindcss"
import utilities from "@halvaradop/tailwindcss-utilities"

export default {
    darkMode: "class",
    future: {
        hoverOnlyWhenSupported: true,
    },
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@halvaradop/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                base: "900px",
            },
            width: {
                semi: "98%",
            },
        },
    },
    plugins: [utilities],
} satisfies Config
