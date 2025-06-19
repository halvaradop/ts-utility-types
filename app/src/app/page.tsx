import { Hero } from "@/ui/index/hero"
import { AboutUs } from "@/ui/index/about-us"
import { ServiceSection } from "@/ui/index/our-service"
import { Untyped } from "@/ui/index/untyped"

const IndexPage = () => {
    return (
        <main>
            <Hero />
            <AboutUs />
            <ServiceSection />
            <Untyped />
        </main>
    )
}

export default IndexPage
