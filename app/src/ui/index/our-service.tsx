"use client"
import { motion } from "motion/react"
import { ourServiceContent } from "@/lib/content"
import { Service } from "./service"

export const ServiceSection = () => {
    return (
        <section className="w-11/12 mx-auto mt-52 base:w-10/12 xl:max-w-screen-2xl">
            <motion.div className="py-20 text-center">
                <motion.div
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <span className="flex-1 h-px bg-border" />
                    <h2 className="text-fluid-4xl font-bold uppercase">our service</h2>
                    <span className="flex-1 h-px bg-border" />
                </motion.div>
                <motion.p
                    className="mt-20 text-fluid-xl text-muted"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Explore a suite of advanced TypeScript utilities designed to handle deep logic, boost safety, and streamline
                    development across a wide range of type patterns.
                </motion.p>
            </motion.div>
            <div className="mt-20 grid gap-10 base:grid-cols-2">
                {ourServiceContent.map(({ title, paragraph, code }, key) => (
                    <Service index={key} title={title} paragraph={paragraph} code={code} key={key} />
                ))}
            </div>
        </section>
    )
}
