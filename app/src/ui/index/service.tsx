import { motion } from "motion/react"
import { Code } from "@/ui/code"
import type { ServiceProps } from "@/lib/@types/props"

export const Service = ({ title, paragraph, code }: ServiceProps) => {
    return (
        <article className="group pt-10 p-4 border border-solid border-border rounded-2xl overflow-hidden bg-secondary hover:cursor-pointer hover:shadow-2xl base:h-[65dvh] base:col-span-2 base:first:col-span-3 base:nth-[4]:col-span-3 base:nth-[5]:col-span-3 base:nth-[8]:col-span-3">
            <h3 className="text-on-surface text-fluid-3xl font-bold group-hover:text-primary transition-colors duration-300">
                {title}
            </h3>
            <p className="mt-4 mb-6 text-muted text-fluid-base base:line-clamp-2 group-hover:text-on-surface transition-colors duration-300">
                {paragraph}
            </p>
            <div className="relative">
                <Code className="translate-x-[5%] base:w-[100vw] base:absolute base:translate-x-[2%] group-hover:brightness-110 group-hover:scale-105 transition-all duration-500">
                    {code}
                </Code>
            </div>
        </article>
    )
}
