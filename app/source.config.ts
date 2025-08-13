import { defineDocs, defineConfig, frontmatterSchema } from "fumadocs-mdx/config"
import { remarkAutoTypeTable, createGenerator } from "fumadocs-typescript"
import { transformerTwoslash } from "fumadocs-twoslash"
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins"
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs"

export const docs = defineDocs({
    dir: "src/content/docs",
    docs: {
        schema: frontmatterSchema,
    },
})

const generator = createGenerator()

export default defineConfig({
    mdxOptions: {
        remarkPlugins: [[remarkAutoTypeTable, { generator }]],
        rehypeCodeOptions: {
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
            transformers: [
                ...(rehypeCodeDefaultOptions.transformers ?? []),
                transformerTwoslash({
                    typesCache: createFileSystemTypesCache(),
                }),
            ],
        },
    },
})
