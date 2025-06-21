"use client"
import { Select, SelectList, SelectOption, SelectTrigger } from "@halvaradop/ui-select"
import Link from "next/link"

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
    return (
        <aside className="relative mb-4">
            <Select className="mt-4" name="entry-points">
                <SelectTrigger className="w-full hover:border-secondary hover:bg-secondary">Entry Points</SelectTrigger>
                <SelectList className="button:hover:bg-secondary">
                    {entryPoints.map((entryPoint) => (
                        <SelectOption
                            className="text-primary aria-selected:text-primary aria-selected:bg-secondary"
                            key={entryPoint}
                            value={entryPoint}
                        >
                            <Link className="w-full text-left" href={`/docs/${entryPoint}`}>
                                {entryPoint}
                            </Link>
                        </SelectOption>
                    ))}
                </SelectList>
            </Select>
        </aside>
    )
}
