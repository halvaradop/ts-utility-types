"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { TextReveal } from "@/ui/motion/text-reveal"
import { Button } from "@halvaradop/ui-button"
import star from "@/assets/star.svg"

export const Untyped = () => {
    return (
        <section
            className="w-11/12 min-h-screen mx-auto mt-40 content-center text-center md:w-3/4 xl:max-w-screen-2xl"
            id="type-control"
        >
            <motion.div
                className="flex items-center justify-center gap-4 mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <span className="flex-1 h-px bg-border" />
                <h2 className="text-fluid-4xl font-bold uppercase">Type Control</h2>
                <span className="flex-1 h-px bg-border" />
            </motion.div>
            <TextReveal className="text-fluid-4xl uppercase font-bold base:text-fluid-5xl">
                Empower your TypeScript applications with precise, reusable, and efficient utility types — designed to simplify
                even the most advanced type scenarios.
            </TextReveal>
            <Image className="mx-auto -rotate-45" src={star} alt="Star Icon" />
            <motion.p
                className="mt-20 mb-8 text-fluid-xl text-muted base:max-w-screen-md base:mx-auto"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                typing complex data is hard — we make it simple
            </motion.p>
            <Button variant="secondary" size="md" asChild>
                <Link href="/docs">Get Started</Link>
            </Button>
        </section>
    )
}
