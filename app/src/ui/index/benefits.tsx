"use client"
import { motion } from "motion/react"

export const Benefits = () => {
    return (
        <section className="w-11/12 mx-auto py-20 xl:w-10/12 xl:max-w-screen-2xl ">
            <motion.div
                className="text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <h2 className="text-on-surface text-fluid-3xl font-bold mb-4">What We Do</h2>
                <p className="text-muted text-fluid-base">
                    Leverage advanced TypeScript utilities to solve complex type challenges. Our tools are precision-built to
                    handle real-world scenarios and common patterns with ease.
                </p>
            </motion.div>
        </section>
    )
}
