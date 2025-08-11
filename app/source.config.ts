import { defineDocs, defineConfig, frontmatterSchema } from "fumadocs-mdx/config"

export const docs = defineDocs({
    dir: "src/content/docs",
    docs: {
        schema: frontmatterSchema,
    },
})

export default defineConfig()
