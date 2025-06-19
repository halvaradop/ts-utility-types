import { useEffect, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Code } from "@/ui/code"
import type { ServiceProps } from "@/lib/@types/props"

export const Service = ({ title, paragraph, code }: ServiceProps) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(ref, { margin: "-40% 0px 0px 0px" })

    useEffect(() => {
        if (isInView) return
        console.log(`Service component is in view: ${isInView}`)
    }, [isInView])

    return (
        <article className="py-10 px-4 grid border border-solid border-border rounded-2xl bg-secondary hover:cursor-pointer">
            <motion.div>
                <h3 className="text-on-surface text-fluid-3xl font-bold">{title}</h3>
                <p className="mt-4 mb-6 text-muted text-fluid-base">{paragraph}</p>
                <Code>{code.trim()}</Code>
            </motion.div>
        </article>
    )
}
