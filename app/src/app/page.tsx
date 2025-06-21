import { Hero } from "@/ui/index/hero"
import { AboutUs } from "@/ui/index/about-us"
import { ServiceSection } from "@/ui/index/our-service"
import { Untyped } from "@/ui/index/untyped"
import { Cursor } from "@/ui/motion/cursor"

const IndexPage = () => {
    return (
        <main className="mb-40">
            <Hero />
            <AboutUs />
            <ServiceSection />
            <Untyped />
            <Cursor />
        </main>
    )
}

export default IndexPage
