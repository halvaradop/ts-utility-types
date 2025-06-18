"use client"
import { useRef } from "react"
import { ourServiceContent } from "@/lib/content"
import { Service } from "./service"
import { useScroll, useTransform, motion } from "motion/react"

export const ServiceSection = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef })
    const itemCount = ourServiceContent.length
    const finalStart = (itemCount - 0.5) / itemCount
    const finalEnd = 1
    const yHeader = useTransform(scrollYProgress, [finalStart, finalEnd], [0, -120])
    const opacityHeader = useTransform(scrollYProgress, [finalStart, finalEnd], [1, 0])

    return (
        <section ref={sectionRef} className="w-11/12 mx-auto hidden base:w-10/12 xl:max-w-screen-2xl">
            <motion.div
                className="py-20 grid text-center sticky top-0 md:w-11/12 md:mx-auto md:items-center md:grid-cols-2 base:w-10/12 z-10 bg-white"
                style={{ y: yHeader, opacity: opacityHeader }}
            >
                <h2 className="uppercase md:text-left">our service</h2>
                <p className="mt-6 text-fluid-base md:text-right base:mt-8">
                    With advance typescript types to handle complex scenarios with ease and precision solutions for solve common
                    patterns
                </p>
            </motion.div>
            <div className="grid grid-rows-8">
                {ourServiceContent.map(({ title, paragraph }, key) => (
                    <Service index={key} title={title} paragraph={paragraph} key={key} />
                ))}
            </div>
        </section>
    )
}
