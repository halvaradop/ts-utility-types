import type { MotionValue } from "motion"
import type { PropsWithChildren, RefObject } from "react"
import type { RGB } from "./types"

export interface ServiceProps {
    index: number
    title: string
    paragraph: string
    ref?: RefObject<HTMLDivElement | null>
}

export interface TextRevealProps {
    children: string
    className?: string
}

export interface WordProps extends PropsWithChildren {
    progress: MotionValue<number>
    range: [number, number]
}

export interface CursorProps {
    SIM_RESOLUTION?: number
    DYE_RESOLUTION?: number
    CAPTURE_RESOLUTION?: number
    DENSITY_DISSIPATION?: number
    VELOCITY_DISSIPATION?: number
    PRESSURE?: number
    PRESSURE_ITERATIONS?: number
    CURL?: number
    SPLAT_RADIUS?: number
    SPLAT_FORCE?: number
    SHADING?: boolean
    COLOR_UPDATE_SPEED?: number
    BACK_COLOR?: RGB
    TRANSPARENT?: boolean
}
