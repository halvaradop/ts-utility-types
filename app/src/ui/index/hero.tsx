"use client"
import { Button } from "@halvaradop/ui-button"

export const Hero = () => {
    return (
        <section className="w-11/12 h-[calc(100vh-5rem)] mx-auto content-center text-center relative base:w-10/12 xl:max-w-screen-2xl">
            <h1 className="text-fluid-5xl font-bold uppercase sm:text-fluid-6xl">
                Discover the power of advanced TypeScript types
            </h1>
            <p>The future of intelligent types of typescript is here to streamline your development</p>
            <div className="mt-6 flex items-center justify-center gap-x-5">
                <Button size="md">Install</Button>
                <Button size="md">Get Started</Button>
            </div>
            <span className="uppercase absolute left-0 bottom-5">scroll now</span>
        </section>
    )
}
