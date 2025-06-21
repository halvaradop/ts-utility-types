import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="w-11/12 mx-auto border-t border-solid border-border xl:w-10/12 xl:max-w-screen-2xl">
            <div className="mt-20 base:mt-0 base:py-20 base:grid base:items-start base:grid-cols-2">
                <div className="text-center base:text-left">
                    <h2 className="text-fluid-base font-extrabold uppercase tracking-wide">@halvaradop/ts-utility-types</h2>
                    <p className="text-muted mt-2 text-sm">Elegant TypeScript utilities for modern development.</p>
                </div>
                <nav className="mt-20 mb-28 flex items-start justify-around gap-6 text-muted ul:space-y-4 ul:li:hover:text-primary base:m-0 base:justify-between">
                    <ul>
                        <li className="text-primary">Home</li>
                        <li>
                            <Link href="#about-us">About Us</Link>
                        </li>
                        <li>
                            <Link href="#our-services">Our Services</Link>
                        </li>
                        <li>
                            <Link href="#type-control">Type Control</Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="text-primary">Docs</li>
                        <li>
                            <Link href="/docs#install">Install</Link>
                        </li>
                        <li>
                            <Link href="docs/#types">Types</Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="text-primary">Resources</li>
                        <li>
                            <Link
                                href="https://github.com/halvaradop/ts-utility-types"
                                className="hover:text-primary transition-colors"
                            >
                                GitHub
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://www.npmjs.com/package/@halvaradop/ts-utility-types"
                                className="hover:text-primary transition-colors"
                            >
                                NPM
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="py-6 flex flex-col items-center gap-2 text-xs text-muted border-t border-solid border-border md:flex-row md:justify-between ">
                <span>&#169; 2025 halvaradop. All Rights Reserved.</span>
            </div>
        </footer>
    )
}
