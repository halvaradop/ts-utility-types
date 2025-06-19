import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export const Code = ({ children }: { children: string }) => {
    return (
        <SyntaxHighlighter language="typescript" showLineNumbers style={vscDarkPlus}>
            {children}
        </SyntaxHighlighter>
    )
}
