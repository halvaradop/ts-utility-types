import type { WordProps } from "@/lib/@types/props"
import { motion, useTransform, useMotionTemplate } from "motion/react"

export const Word = ({ children, progress, range }: WordProps) => {
    const opacity = useTransform(progress, range, [0, 1])
    const y = useTransform(progress, range, [24, 0])
    const blurValue = useTransform(progress, range, [8, 0])
    const filter = useMotionTemplate`blur(${blurValue}px)`
    const color = useTransform(progress, range, ["#52525b", "#fafafa"])

    return (
        <span className="relative mx-1 lg:mx-1.5">
            <span className="absolute opacity-10 select-none pointer-events-none text-gray-700 dark:text-gray-400 blur-sm">
                {children}
            </span>
            <motion.span
                style={{
                    opacity,
                    y,
                    filter,
                    color,
                }}
                className="font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            >
                {children}
            </motion.span>
        </span>
    )
}
