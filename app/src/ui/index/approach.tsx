import Image from "next/image"
import { ApproachProps } from "@/lib/@types/props"
import { Button } from "@halvaradop/ui-button"
import arrowIcon from "@/assets/arrow.svg"

export const Approach = ({ index, title, paragraph, selectedId, onClick }: ApproachProps) => {
    const isSelected = selectedId === index
    return (
        <article
            className="group approach py-5 px-4 border-b border-black/50 hover:cursor-pointer hover:text-white hover:rounded-lg hover:bg-black base:py-6 base:px-5"
            data-isselected={isSelected}
            onClick={onClick}
        >
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-x-3">
                    <span>0{index + 1}</span>
                    <h3 className="text-fluid-2xl font-bold uppercase">{title}</h3>
                </div>
                <Button
                    className="size-10 p-0 rounded-full border border-black transition-transform duration-500 ease-out group-data-[isselected='true']:-rotate-180 group-hover:border-white"
                    variant="ghost"
                >
                    <Image
                        className="rotate-90 group-hover:invert"
                        src={arrowIcon}
                        alt="arrow icion"
                        priority
                        draggable={false}
                    />
                </Button>
            </div>
            <p className="mt-4 hidden opacity-0 transition-approach">{paragraph}</p>
        </article>
    )
}
