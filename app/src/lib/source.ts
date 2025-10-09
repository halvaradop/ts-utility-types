import { docs } from "@/.source"
import { loader } from "fumadocs-core/source"

const source = loader({
    baseUrl: "/docs",
    source: docs.toFumadocsSource(),
})

export { source }
