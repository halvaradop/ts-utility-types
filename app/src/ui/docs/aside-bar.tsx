"use client"
import { Select, SelectList, SelectOption, SelectTrigger } from "@halvaradop/ui-select"
import Link from "next/link"
import { usePathname } from "next/navigation"

const entryPoints = [
    "deep",
    "arrays",
    "objects",
    "strings",
    "numbers",
    "test",
    "guards",
    "utils",
    "types",
    "utilities",
    "validate",
]

export const AsideBar = () => {
    const pathname = usePathname()
    const defaultEntryPoint = pathname.replace("/docs/", "")

    return (
        <aside className="relative mb-4">
            <Select className="mt-4 mx-0" name="entry-points" defaultValue={defaultEntryPoint}>
                <SelectTrigger className="w-full hover:border-secondary hover:bg-secondary">Entry Points</SelectTrigger>
                <SelectList className="button:hover:bg-secondary">
                    {entryPoints.map((entryPoint) => (
                        <SelectOption
                            className="p-0 text-primary aria-selected:text-primary aria-selected:bg-secondary"
                            key={entryPoint}
                            value={entryPoint}
                            tabIndex={-1}
                        >
                            <Link
                                className="w-full h-full px-[calc(var(--size-base)*0.4)] flex items-center text-left"
                                href={`/docs/${entryPoint}`}
                            >
                                {entryPoint}
                            </Link>
                        </SelectOption>
                    ))}
                </SelectList>
            </Select>
        </aside>
    )
}
