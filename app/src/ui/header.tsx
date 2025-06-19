import { Button } from "@halvaradop/ui-button"
import Link from "next/link"

export const Header = () => {
    return (
        <header>
            <nav className="w-11/12 h-20 mx-auto flex items-center justify-between font-medium border-b border-solid border-border xl:w-10/12 xl:max-w-screen-2xl">
                <p>
                    <Link className="sm:hidden" href="/">
                        ts-utility-types
                    </Link>
                    <Link className="hidden sm:block" href="/">
                        @halvaradop/ts-utility-types
                    </Link>
                </p>
                <aside>
                    <ul className="flex items-center uppercase gap-x-5 sm:gap-x-8 md:gap-x-10">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/docs">Docs</Link>
                        </li>
                        <li>
                            <Button variant="secondary" asChild>
                                <Link href="https://github.com/halvaradop/ts-utility-types" target="_blank">
                                    Github
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </aside>
            </nav>
        </header>
    )
}
