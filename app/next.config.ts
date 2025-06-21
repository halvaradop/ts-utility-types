import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import repyheHighlight from "rehype-highlight"

const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
}

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [repyheHighlight],
    },
})

export default withMDX(nextConfig)
