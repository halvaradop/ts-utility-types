import type { EntryPointProps } from "@/lib/@types/props"

const EntryPointPage = async ({ params }: EntryPointProps) => {
    const { slug } = await params
    const { default: Content } = await import(`@/content/${slug}.mdx`)
    return <Content />
}

export default EntryPointPage
