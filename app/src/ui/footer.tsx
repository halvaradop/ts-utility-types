"use client"
import Link from "next/link"
import Image from "next/image"
import arrowIcon from "@/assets/arrow.svg"
import { Button } from "@halvaradop/ui-button"

export const Footer = () => {
    return (
        <footer className="text-white bg-black">
            <section className="w-11/12 mx-auto py-20 space-y-20 base:w-10/12 base:py-28 lg:py-36 xl:max-w-screen-2xl">
                <div>
                    <h2 className="text-fluid-4xl font-bold sm:w-3/4 base:text-fluid-5xl lg:w-1/2">
                        GET A POWERFUL SET OF UTILITY TYPES
                    </h2>
                    <p className="mt-6 text-fluid-base">
                        Ready to simplify your TypeScript development? Explore our utilities today and transform your workflow.
                    </p>
                </div>
                <div className="w-full flex items-center justify-between">
                    <span className="text-fluid-4xl font-bold base:text-fluid-5xl">TOP</span>
                    <Button className="size-11 p-0 rounded-full border border-white" variant="ghost">
                        <Link href="/">
                            <Image className="-rotate-90 invert" src={arrowIcon} alt="arrow icion" priority draggable={false} />
                        </Link>
                    </Button>
                </div>
            </section>
        </footer>
    )
}
