export interface TestDeepWithObjectsA {
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

export interface TestDeepWithObjectsB {
    bar: boolean
    biz: string
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

export interface TestDeepWithFunctions {
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

export interface TestDeepWithArray {
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

type CaseWithDeepInternal<Obj extends object, Depth extends number, Level extends unknown[]> = Depth extends Level["length"]
    ? Obj
    : {
          [Property in keyof Obj]: Obj[Property] extends object
              ? CaseWithDeepInternal<Obj[Property], Depth, [...Level, Property]>
              : Obj[Property]
      }

export type CaseWithDeep<Obj extends object, Depth extends number> = CaseWithDeepInternal<Obj, Depth, []>
