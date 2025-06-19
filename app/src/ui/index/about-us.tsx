"use client"
import Image from "next/image"
import { motion } from "motion/react"
import { Button } from "@halvaradop/ui-button"
import { TextReveal } from "@/ui/motion/text-reveal"
import star from "@/assets/star.svg"
import Link from "next/link"

export const AboutUs = () => {
    return (
        <section className="w-11/12 min-h-screen mx-auto content-center text-center relative rounded-md base:w-10/12 xl:max-w-screen-2xl">
            <motion.div
                className="flex items-center justify-center gap-4 mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <span className="flex-1 h-px bg-border" />
                <h2 className="text-fluid-4xl font-bold uppercase">about us</h2>
                <span className="flex-1 h-px bg-border" />
            </motion.div>
            <TextReveal className="text-fluid-4xl font-bold uppercase base:text-fluid-5xl">
                We build intelligent and scalable TypeScript types that bring safety and clarity to your codebase. Our mission is
                to simplify complex type scenarios and empower developers with robust type recognition.
            </TextReveal>
            <Image className="mx-auto -rotate-45" src={star} alt="Star Icon" />
            <motion.p
                className="mt-20 mb-8 text-fluid-xl text-muted base:max-w-screen-md base:mx-auto"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                We combine common and advanced utility types to deliver strong type safety without sacrificing development speed.
            </motion.p>
            <Button variant="secondary" size="md" asChild>
                <Link href="/docs">Get Started</Link>
            </Button>
        </section>
    )
}
