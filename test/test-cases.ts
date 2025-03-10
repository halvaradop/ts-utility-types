import type { MergeAll, DeepTruncate } from "../src/object-types"

export interface DeepWithObjectsA {
    foo: string
    bar: number
    foobar: {
        foo: boolean
        bar: string
        foobar: {
            foo: symbol
            bar: number
            foobar: {
                foo: bigint
                bar: string
                foobar: {
                    bar: number
                }
            }
        }
    }
}

export interface DeepWithObjectsB {
    bar: boolean
    fiz: string
    foobar: {
        foo: symbol
        foobar: number
        bar: {
            foo: bigint
            bar: string
            foobar: {
                foo: number
                bar: string
            }
        }
    }
}

export interface DeepWithFunctions {
    fix: () => number
    foobar: {
        fix: () => string
        foobar: {
            fix: () => boolean
            foobar: {
                fix: () => symbol
                foobar: {
                    fix: () => bigint
                }
            }
        }
    }
}

export interface DeepWithArray {
    buz: string[]
    foobar: {
        buz: number[]
        foobar: {
            buz: boolean[]
            foobar: {
                buz: symbol[]
                foobar: {
                    buz: bigint[]
                }
            }
        }
    }
}

export type MergeCases<Depth extends number = 1> = MergeAll<
    [
        DeepTruncate<DeepWithObjectsA, Depth>,
        DeepTruncate<DeepWithObjectsB, Depth>,
        DeepTruncate<DeepWithArray, Depth>,
        DeepTruncate<DeepWithFunctions, Depth>,
    ]
>

export type Case<Obj extends object, Depth extends number = 1> = DeepTruncate<Obj, Depth>
