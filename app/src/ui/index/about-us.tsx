"use client"
import Image from "next/image"
import { Button } from "@halvaradop/ui-button"
import star from "@/assets/star.svg"
import { TextReveal } from "@/ui/motion/text-reveal"

export const AboutUs = () => {
    return (
        <section className="w-11/12 min-h-screen mx-auto content-center text-center relative rounded-md base:w-10/12 xl:max-w-screen-2xl">
            <h2 className="uppercase">about us</h2>
            <TextReveal className="text-fluid-4xl font-bold base:text-fluid-5xl">
                We are creating type safety to your apps providing advance intelligence types and type recognition, and our job is
                simplify the process and reduce the type scenarios in the most impactful way possible
            </TextReveal>
            <Image className="mx-auto -rotate-45" src={star} alt="Star Icon" />
            <p className="mt-6 mb-8 text-fluid-base">
                We combine common and advance types for deliver type safety for simplicity the development with typescript
            </p>
            <Button size="md">Get Started</Button>
        </section>
    )
}
