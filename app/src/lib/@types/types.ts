export interface RGB {
    r: number
    g: number
    b: number
}

export interface Pointer {
    id: number
    texcoordX: number
    texcoordY: number
    prevTexcoordX: number
    prevTexcoordY: number
    deltaX: number
    deltaY: number
    down: boolean
    moved: boolean
    color: RGB
}
