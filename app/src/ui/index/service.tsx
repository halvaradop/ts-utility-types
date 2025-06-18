import { ServiceProps } from "@/lib/@types/props"

export const Service = ({ index, title, paragraph }: ServiceProps) => {
    return (
        <article className="group py-5 px-4 flex items-start gap-x-10 border-y border-solid border-border sticky top-2/5 hover:cursor-pointer bg-white">
            <span className="min-w-fit">S/ 0{index + 1}</span>
            <div>
                <h3 className="text-fluid-2xl font-bold uppercase">{title}</h3>
                <p className="mt-4">{paragraph}</p>
            </div>
        </article>
    )
}
