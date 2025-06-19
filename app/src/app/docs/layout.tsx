import { PropsWithChildren } from "react"

const LayoutDocs = ({ children }: PropsWithChildren) => {
    return (
        <section className="w-11/12 mt-20 mx-auto xl:w-10/12 xl:max-w-screen-2xl" id="layout-docs">
            {children}
        </section>
    )
}

export default LayoutDocs
