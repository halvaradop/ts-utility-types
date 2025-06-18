import type { WordProps } from "@/lib/@types/props"
import { motion, useTransform, useMotionTemplate } from "motion/react"

export const Word = ({ children, progress, range }: WordProps) => {
    const opacity = useTransform(progress, range, [0, 1])
    const y = useTransform(progress, range, [20, 0])
    const blurValue = useTransform(progress, range, [4, 0])
    const filter = useMotionTemplate`blur(${blurValue}px)`
    const color = useTransform(progress, range, ["#a3a3a3", "#18181b"])

    return (
        <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
            <span className="absolute opacity-20 select-none pointer-events-none">{children}</span>
            <motion.span
                style={{
                    opacity,
                    y,
                    filter,
                    color,
                }}
                className={"text-black font-bold"}
            >
                {children}
            </motion.span>
        </span>
    )
}
