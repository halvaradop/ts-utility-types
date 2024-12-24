import type { Config } from "tailwindcss"

export default {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/ui/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {},
    plugins: [],
} satisfies Config
