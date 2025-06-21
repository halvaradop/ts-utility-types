import { Hero } from "@/ui/home/hero"
import { AboutUs } from "@/ui/home/about-us"
import { ServiceSection } from "@/ui/home/our-service"
import { Untyped } from "@/ui/home/untyped"
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
