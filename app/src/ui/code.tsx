"use client"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { merge } from "@halvaradop/ui-core"
import type { CodeProps } from "@/lib/@types/props"

export const Code = ({ children, className, language = "ts" }: CodeProps) => {
    return (
        <div className={merge("border border-solid border-border rounded-2xl bg-[#1e1e1e]", className)}>
            <span className="w-full h-10 px-5 flex items-center gap-x-2 border-b border-solid border-border">
                <span className="size-3.5 block rounded-full bg-border" />
                <span className="size-3.5 block rounded-full bg-border" />
                <span className="size-3.5 block rounded-full bg-border" />
            </span>
            <SyntaxHighlighter language={language} showLineNumbers style={vscDarkPlus}>
                {children.trim()}
            </SyntaxHighlighter>
        </div>
    )
}
