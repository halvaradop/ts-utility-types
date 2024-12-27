"use client"
import { useState } from "react"
import { approachData } from "@/lib/utils"
import { Approach } from "./approach"

export const OurApproach = () => {
    const [selectedId, setSelectedId] = useState<number>(-1)

    const handleClick = (index: number) => {
        setSelectedId((previous) => (previous === index ? -1 : index))
    }

    return (
        <section className="w-11/12 mx-auto base:w-10/12 xl:max-w-screen-2xl">
            <div className="py-20 text-center md:w-11/12 md:mx-auto base:w-10/12">
                <h2 className="fluency-4xl font-bold base:fluency-5xl">OUR APPROACH</h2>
                <p className="mt-6 fluency-base base:mt-8">
                    A comprehensive set of utility types designed to handle complex type scenarios with ease and precision. Solve
                    common patterns and tackle challenging cases in TypeScript development. Eliminate duplicate code and boost
                    productivity in your projects.
                </p>
            </div>
            <div className="">
                {approachData.map(({ title, paragraph }, key) => (
                    <Approach
                        index={key}
                        title={title}
                        paragraph={paragraph}
                        selectedId={selectedId}
                        onClick={() => handleClick(key)}
                        key={key}
                    />
                ))}
            </div>
        </section>
    )
}
