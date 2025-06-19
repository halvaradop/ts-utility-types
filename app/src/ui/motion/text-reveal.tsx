"use client"
import { useRef } from "react"
import { useScroll } from "motion/react"
import { merge } from "@halvaradop/ui-core"
import { Word } from "@/ui/motion/word"
import type { TextRevealProps } from "@/lib/@types/props"

export const TextReveal = ({ children, className }: TextRevealProps) => {
    const targetRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({ target: targetRef })
    const words = children.split(" ")

    return (
        <div ref={targetRef} className={merge("relative z-0 h-[200vh]", className)}>
            <div className={"sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center"}>
                <span className={"flex flex-wrap justify-center font-bold text-white/20"}>
                    {words.map((word, i) => {
                        const start = i / words.length
                        const end = start + 1 / words.length
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        )
                    })}
                </span>
            </div>
        </div>
    )
}
