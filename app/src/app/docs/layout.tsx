import type { PropsWithChildren } from "react"
import { AsideBar } from "@/ui/docs/aside-bar"

const LayoutDocs = ({ children }: PropsWithChildren) => {
    return (
        <section className="w-11/12 mx-auto mb-20 xl:w-10/12 xl:max-w-screen-2xl" id="layout-docs">
            <AsideBar />
            <section className="mt-10">{children}</section>
        </section>
    )
}

export default LayoutDocs
