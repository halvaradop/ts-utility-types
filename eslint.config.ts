import { baseConfig } from "@halvaradop/eslint-config/base"
import { nextConfig } from "@halvaradop/eslint-config/next"
import { reactConfig } from "@halvaradop/eslint-config/react"
import { prettierConfig } from "@halvaradop/eslint-config/prettier"
import { tsConfig } from "@halvaradop/eslint-config/typescript"

export default [...baseConfig, ...nextConfig, ...reactConfig, ...prettierConfig, ...tsConfig]
