import type { NextConfig } from "next"
import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX({})

const config: NextConfig = {
    reactStrictMode: true,
    serverExternalPackages: ["typescript", "twoslash"],
    compress: true,
    poweredByHeader: false,
    trailingSlash: false,
}

export default withMDX(config)
