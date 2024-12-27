import Link from "next/link"
import { Button } from "@halvaradop/ui-button"

export const Hero = () => {
    return (
        <section className="w-11/12 h-[calc(100vh-5rem)] mx-auto content-center text-center base:w-10/12 xl:max-w-screen-2xl">
            <h1 className="fluency-5xl font-bold uppercase sm:fluency-6xl">
                <span className="w-fit mx-auto block">TYPESCRIPT</span>
                <span className="w-fit mx-auto block">UTILITY TYPES</span>
            </h1>
            <div className="relative base:w-10/12 base:mx-auto">
                <p className="my-6 fluency-base md:mb-8 base:mb-10">
                    Discover a powerful toolkit of TypeScript utility types designed to streamline your development process. These
                    utilities simplify complex type scenarios, reduce boilerplate code, and enhance type safety in your projects.
                </p>
                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0" />
            </div>
            <div className="flex items-center justify-center gap-x-5">
                <Button>GET STARTED</Button>
                <Button className="border-black" variant="ghost">
                    <Link href="https://github.com/halvaradop/ts-utility-types" target="_blank">
                        GITHUB
                    </Link>
                </Button>
            </div>
        </section>
    )
}
