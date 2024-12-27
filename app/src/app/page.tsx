import { Hero } from "@/ui/index/hero"
import { Power } from "@/ui/index/power"
import { OurApproach } from "@/ui/index/our-approach"
import { Untyped } from "@/ui/index/untyped"

const IndexPage = () => {
    return (
        <main className="w-semi mx-auto">
            <Hero />
            <Power />
            <OurApproach />
            <Untyped />
        </main>
    )
}

export default IndexPage
