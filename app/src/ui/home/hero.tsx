"use client"
import { motion } from "motion/react"
import { Button } from "@halvaradop/ui-button"
import Link from "next/link"

export const Hero = () => {
    const handleInstallClick = async () => {
        await navigator.clipboard.writeText("pnpm install @halvaradop/ts-utility-types@latest")
    }

    return (
        <section className="w-11/12 h-[calc(100vh-5rem)] mx-auto content-center text-center relative xl:w-10/12 xl:max-w-screen-2xl">
            <div className="base:w-3/4 base:mx-auto">
                <motion.h1
                    className="text-on-surface text-fluid-5xl font-bold uppercase sm:text-fluid-6xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                    Discover the Power of Advanced TypeScript Types
                </motion.h1>
                <motion.p
                    className="mt-6 mb-8 text-muted"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                    The future of intelligent types in TypeScript is here — built to simplify your development with precision and
                    clarity.
                </motion.p>
            </div>
            <motion.div
                className="flex items-center justify-center gap-x-5"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
                <Button className="" size="md" onClick={handleInstallClick}>
                    Install
                </Button>
                <Button variant="secondary" size="md" asChild>
                    <Link href="/docs">Get Started</Link>
                </Button>
            </motion.div>
        </section>
    )
}
