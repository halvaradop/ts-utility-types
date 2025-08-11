import type { PropsWithChildren } from "react"
import { source } from "@/src/lib/source"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { baseOptions } from "@/src/app/layout.config"

const LayoutDocs = ({ children }: Required<PropsWithChildren>) => {
    return (
        <DocsLayout tree={source.pageTree} {...baseOptions}>
            {children}
        </DocsLayout>
    )
}

export default LayoutDocs
