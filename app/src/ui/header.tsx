import Link from "next/link"

export const Header = () => {
    return (
        <header>
            <nav className="w-11/12 h-20 mx-auto flex items-center justify-between base:w-10/12 xl:max-w-screen-2xl">
                <p>
                    <Link className="sm:hidden" href="/">
                        ts-utility-types
                    </Link>
                    <Link className="hidden sm:block" href="/">
                        @halvaradop/ts-utility-types
                    </Link>
                </p>
                <aside>
                    <ul className="flex items-center font-medium li:ml-1">
                        <li>
                            <Link href="">Home</Link>
                        </li>
                        <span>,</span>
                        <li>
                            <Link href="">Docs</Link>
                        </li>
                        <span>,</span>
                        <li>
                            <Link href="">Github</Link>
                        </li>
                    </ul>
                </aside>
            </nav>
        </header>
    )
}
