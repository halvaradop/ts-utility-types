import type { PropsWithChildren } from "react"
import { source } from "@/src/lib/source"
import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/notebook"
import { baseOptions } from "@/src/app/layout.config"
import { GithubInfo } from "fumadocs-ui/components/github-info"

const docsOptions: DocsLayoutProps = {
    ...baseOptions,
    tree: source.pageTree,
    links: [
        {
            type: "custom",
            children: <GithubInfo owner="halvaradop" repo="ts-utility-types" className="lg:-mx-2" />,
        },
    ],
}

const LayoutDocs = ({ children }: Required<PropsWithChildren>) => {
    return <DocsLayout {...docsOptions}>{children}</DocsLayout>
}

export default LayoutDocs
