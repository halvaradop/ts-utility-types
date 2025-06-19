import Link from "next/link"

export const Footer = () => {
    return (
        <footer className=" text-primary">
            <section className="w-11/12 mx-auto base:w-10/12 base:py-24 lg:py-32 xl:max-w-screen-2xl flex flex-col gap-10">
                <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
                    <div>
                        <h2 className="text-fluid-lg base:text-fluid-4xl font-extrabold uppercase tracking-wide">
                            @halvaradop/ts-utility-types
                        </h2>
                        <p className="text-muted mt-2 text-sm">Elegant TypeScript utilities for modern development.</p>
                    </div>
                    <nav className="flex gap-6 text-sm">
                        <Link
                            href="https://github.com/halvaradop/ts-utility-types"
                            className="hover:text-primary transition-colors"
                        >
                            GitHub
                        </Link>
                        <Link
                            href="https://www.npmjs.com/package/@halvaradop/ts-utility-types"
                            className="hover:text-primary transition-colors"
                        >
                            NPM
                        </Link>
                        <Link href="mailto:contact@halvaradop.dev" className="hover:text-primary transition-colors">
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="pt-6 flex flex-col items-center gap-2 text-xs text-muted border-t border-solid border-border md:flex-row md:justify-between ">
                    <span>&#169; 2025 halvaradop. All Rights Reserved.</span>
                </div>
            </section>
        </footer>
    )
}
