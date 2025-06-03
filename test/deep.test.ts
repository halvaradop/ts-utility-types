import { describe, test, expectTypeOf } from "vitest"
import type * as utilities from "../src/deep"
import type { DeepWithObjectsA, DeepWithObjectsB, DeepWithArray, DeepWithFunctions, MergeCases, Case } from "./test-cases"

describe("DeepMerge", () => {
    test("Merge two object types with source priority", () => {
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsA>, {}>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsB>, {}>>().toEqualTypeOf<{
            fiz: string
            bar: boolean
            foobar: {}
        }>()
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsA>, Case<DeepWithObjectsB>>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
            fiz: string
        }>()
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsA, 2>, Case<DeepWithObjectsB, 2>>>().toEqualTypeOf<{
            foo: string
            bar: number
            fiz: string
            foobar: {
                foo: boolean
                bar: {}
                foobar: {}
            }
        }>()
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsA, 3>, Case<DeepWithObjectsB, 3>>>().toEqualTypeOf<{
            foo: string
            bar: number
            fiz: string
            foobar: {
                foo: boolean
                foobar: {
                    foo: symbol
                    bar: number
                    foobar: {}
                }
                bar: {
                    foo: bigint
                    bar: string
                    foobar: {}
                }
            }
        }>()
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsA, 4>, Case<DeepWithObjectsB, 4>>>().toEqualTypeOf<{
            foo: string
            bar: number
            fiz: string
            foobar: {
                foo: boolean
                foobar: {
                    foo: symbol
                    bar: number
                    foobar: {
                        foo: bigint
                        bar: string
                        foobar: {}
                    }
                }
                bar: {
                    foo: bigint
                    bar: string
                    foobar: {
                        foo: number
                        bar: string
                    }
                }
            }
        }>()
        expectTypeOf<
            utilities.DeepMerge<
                Case<DeepWithObjectsA, 3>,
                { foo: boolean; foobar: { bar: () => void; foobar: { foo: string[] } } }
            >
        >().toEqualTypeOf<Case<DeepWithObjectsA, 3>>()
    })

    test("Merge two object types with union enabled", () => {
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsA>, {}, true>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsB>, {}, true>>().toEqualTypeOf<{
            fiz: string
            bar: boolean
            foobar: {}
        }>()
        expectTypeOf<
            utilities.DeepMerge<
                { baseUrl: string; routes: string[] },
                { baseUrl: string[]; routes: Array<{ url: string; name: string }> },
                true
            >
        >().toEqualTypeOf<{
            baseUrl: string | string[]
            routes: string[] | Array<{ url: string; name: string }>
        }>()
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsA>, Case<DeepWithObjectsB>, true>>().toEqualTypeOf<{
            foo: string
            bar: number | boolean
            foobar: {}
            fiz: string
        }>()
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsA, 2>, Case<DeepWithObjectsB, 2>, true>>().toEqualTypeOf<{
            foo: string
            bar: number | boolean
            fiz: string
            foobar:
                | {
                      foo: boolean
                      bar: string
                      foobar: {}
                  }
                | {
                      foo: symbol
                      foobar: number
                      bar: {}
                  }
        }>()
        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsA, 3>, Case<DeepWithObjectsB, 3>, true>>().toEqualTypeOf<{
            foo: string
            bar: number | boolean
            fiz: string
            foobar:
                | {
                      foo: boolean
                      bar: string
                      foobar: {
                          foo: symbol
                          bar: number
                          foobar: {}
                      }
                  }
                | {
                      foo: symbol
                      foobar: number
                      bar: {
                          foo: bigint
                          bar: string
                          foobar: {}
                      }
                  }
        }>()

        expectTypeOf<utilities.DeepMerge<Case<DeepWithObjectsA, 4>, Case<DeepWithObjectsB, 4>, true>>().toEqualTypeOf<{
            foo: string
            bar: number | boolean
            fiz: string
            foobar:
                | {
                      foo: boolean
                      bar: string
                      foobar: {
                          foo: symbol
                          bar: number
                          foobar: {
                              foo: bigint
                              bar: string
                              foobar: {}
                          }
                      }
                  }
                | {
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
        }>()
    })
    test("Merge two object types with priority object enabled", () => {
        expectTypeOf<
            utilities.DeepMerge<
                Case<DeepWithObjectsA>,
                {
                    bar: {
                        foo: string
                    }
                }
            >
        >().toEqualTypeOf<{
            foo: string
            bar: {
                foo: string
            }
            foobar: {}
        }>()
        expectTypeOf<
            utilities.DeepMerge<
                Case<DeepWithObjectsA, 2>,
                {
                    bar: {
                        foo: string
                    }
                    foobar: {
                        bar: {
                            fix: () => boolean[]
                        }
                    }
                }
            >
        >().toEqualTypeOf<{
            foo: string
            bar: {
                foo: string
            }
            foobar: {
                foo: boolean
                bar: {
                    fix: () => boolean[]
                }
                foobar: {}
            }
        }>()
        expectTypeOf<
            utilities.DeepMerge<
                Case<DeepWithFunctions>,
                {
                    fix: {
                        fix: () => number
                    }
                }
            >
        >().toEqualTypeOf<{
            fix: {
                fix: () => number
            }
            foobar: {}
        }>()
        expectTypeOf<
            utilities.DeepMerge<
                Case<DeepWithFunctions, 2>,
                {
                    fix: {
                        fix: () => number
                    }
                    foobar: {
                        fix: {
                            bar: () => string
                        }
                    }
                }
            >
        >().toEqualTypeOf<{
            fix: {
                fix: () => number
            }
            foobar: {
                fix: {
                    bar: () => string
                }
                foobar: {}
            }
        }>()
    })
})

describe("MergeAll", () => {
    test("Merge the properties of a tuple of objects", () => {
        expectTypeOf<MergeCases>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
            fiz: string
            fix: () => number
            buz: string[]
        }>()
        expectTypeOf<utilities.DeepMergeAll<[Case<DeepWithObjectsA>, Case<DeepWithObjectsB>]>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
            fiz: string
        }>()
    })
})

describe("DeepMutable", () => {
    test("Converts all properties to non readonly of an object type", () => {
        expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<DeepWithObjectsA>>>().toEqualTypeOf<{
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
        }>()
        expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<DeepWithObjectsB>>>().toEqualTypeOf<{
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
        }>()
        expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<DeepWithFunctions>>>().toEqualTypeOf<{
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
        }>()
        expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<DeepWithArray>>>().toEqualTypeOf<{
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
        }>()
    })
})

describe("DeepReadonly", () => {
    test("DeepReadonly for objects", () => {
        expectTypeOf<utilities.DeepReadonly<Case<DeepWithObjectsA>>>().toEqualTypeOf<{
            readonly foo: string
            readonly bar: number
            readonly foobar: {}
        }>()
        expectTypeOf<utilities.DeepReadonly<DeepWithObjectsA>>().toEqualTypeOf<{
            readonly foo: string
            readonly bar: number
            readonly foobar: {
                readonly foo: boolean
                readonly bar: string
                readonly foobar: {
                    readonly foo: symbol
                    readonly bar: number
                    readonly foobar: {
                        readonly foo: bigint
                        readonly bar: string
                        readonly foobar: {
                            readonly bar: number
                        }
                    }
                }
            }
        }>()
        expectTypeOf<utilities.DeepReadonly<Case<DeepWithFunctions>>>().toEqualTypeOf<{
            readonly fix: () => number
            readonly foobar: {}
        }>()
        expectTypeOf<utilities.DeepReadonly<DeepWithFunctions>>().toEqualTypeOf<{
            readonly fix: () => number
            readonly foobar: {
                readonly fix: () => string
                readonly foobar: {
                    readonly fix: () => boolean
                    readonly foobar: {
                        readonly fix: () => symbol
                        readonly foobar: {
                            readonly fix: () => bigint
                        }
                    }
                }
            }
        }>()
        expectTypeOf<utilities.DeepReadonly<Case<DeepWithArray>>>().toEqualTypeOf<{
            readonly buz: string[]
            readonly foobar: {}
        }>()
        expectTypeOf<utilities.DeepReadonly<DeepWithArray>>().toEqualTypeOf<{
            readonly buz: string[]
            readonly foobar: {
                readonly buz: number[]
                readonly foobar: {
                    readonly buz: boolean[]
                    readonly foobar: {
                        readonly buz: symbol[]
                        readonly foobar: {
                            readonly buz: bigint[]
                        }
                    }
                }
            }
        }>()
    })
})

describe("DeepOmit", () => {
    test("Omit properties from nested objects", () => {
        expectTypeOf<utilities.DeepOmit<Case<DeepWithObjectsA, 5>, "foo">>().toEqualTypeOf<{
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
        }>()
        expectTypeOf<
            utilities.DeepOmit<DeepWithObjectsA, "foo" | "foobar.bar" | "foobar.foobar.foo" | "foobar.foobar.foobar.bar">
        >().toEqualTypeOf<{
            bar: number
            foobar: {
                foo: boolean
                foobar: {
                    bar: number
                    foobar: {
                        foo: bigint
                        foobar: {
                            bar: number
                        }
                    }
                }
            }
        }>()
        expectTypeOf<utilities.DeepOmit<Case<DeepWithFunctions>, "foobar">>().toEqualTypeOf<{ fix: () => number }>()
        expectTypeOf<utilities.DeepOmit<DeepWithFunctions, "fix" | "foobar.fix" | "foobar.foobar.fix">>().toEqualTypeOf<{
            foobar: {
                foobar: {
                    foobar: {
                        fix: () => symbol
                        foobar: {
                            fix: () => bigint
                        }
                    }
                }
            }
        }>()
        expectTypeOf<utilities.DeepOmit<Case<DeepWithArray>, "buz">>().toEqualTypeOf<{
            foobar: {}
        }>()
        expectTypeOf<
            utilities.DeepOmit<DeepWithArray, "buz" | "foobar.foobar.buz" | "foobar.foobar.foobar.foobar.buz">
        >().toEqualTypeOf<{
            foobar: {
                buz: number[]
                foobar: {
                    foobar: {
                        buz: symbol[]
                        foobar: {}
                    }
                }
            }
        }>()
    })
})

describe("DeepGet", () => {
    test("Pick properties from nested objects", () => {
        expectTypeOf<utilities.DeepGet<DeepWithObjectsA, "foo">>().toEqualTypeOf<string>()
        expectTypeOf<utilities.DeepGet<DeepWithObjectsA, "foobar">>().toEqualTypeOf<{
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
        }>()
        expectTypeOf<utilities.DeepGet<DeepWithObjectsA, "foobar.foobar">>().toEqualTypeOf<{
            foo: symbol
            bar: number
            foobar: {
                foo: bigint
                bar: string
                foobar: {
                    bar: number
                }
            }
        }>()
        expectTypeOf<utilities.DeepGet<DeepWithObjectsA, "foobar.foobar.foobar">>().toEqualTypeOf<{
            foo: bigint
            bar: string
            foobar: {
                bar: number
            }
        }>()
        expectTypeOf<utilities.DeepGet<DeepWithObjectsA, "foobar.foobar.foo" | "foobar.foobar.bar">>().toEqualTypeOf<
            symbol | number
        >()
        expectTypeOf<utilities.DeepGet<DeepWithObjectsA, "foobar.foobar" | "foobar.foobar.foobar">>().toEqualTypeOf<
            | {
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
            | {
                  foo: bigint
                  bar: string
                  foobar: {
                      bar: number
                  }
              }
        >()
        expectTypeOf<utilities.DeepGet<DeepWithFunctions, "fix" | "foobar.fix" | "foobar.foobar.fix">>().toEqualTypeOf<
            (() => number) | (() => string) | (() => boolean)
        >()
        expectTypeOf<utilities.DeepGet<DeepWithArray, "buz" | "foobar.buz" | "foobar.foobar.buz">>().toEqualTypeOf<
            string[] | number[] | boolean[]
        >()
        expectTypeOf<
            utilities.DeepGet<utilities.DeepMerge<DeepWithArray, DeepWithFunctions>, "fix" | "buz" | "foobar.fix" | "foobar.buz">
        >().toEqualTypeOf<(() => number) | string[] | (() => string) | number[]>()
    })
})

describe("DeepKeys", () => {
    test("Get the paths of an object", () => {
        expectTypeOf<utilities.DeepKeys<DeepWithObjectsA>>().toEqualTypeOf<
            | "foo"
            | "bar"
            | "foobar"
            | "foobar.foo"
            | "foobar.bar"
            | "foobar.foobar"
            | "foobar.foobar.foo"
            | "foobar.foobar.bar"
            | "foobar.foobar.foobar"
            | "foobar.foobar.foobar.foo"
            | "foobar.foobar.foobar.bar"
            | "foobar.foobar.foobar.foobar"
            | "foobar.foobar.foobar.foobar.bar"
        >()
        expectTypeOf<utilities.DeepKeys<DeepWithArray>>().toEqualTypeOf<
            | "buz"
            | "foobar"
            | "foobar.buz"
            | "foobar.foobar"
            | "foobar.foobar.buz"
            | "foobar.foobar.foobar"
            | "foobar.foobar.foobar.buz"
            | "foobar.foobar.foobar.foobar"
            | "foobar.foobar.foobar.foobar.buz"
        >()
        expectTypeOf<utilities.DeepKeys<DeepWithFunctions>>().toEqualTypeOf<
            | "fix"
            | "foobar"
            | "foobar.fix"
            | "foobar.foobar"
            | "foobar.foobar.fix"
            | "foobar.foobar.foobar"
            | "foobar.foobar.foobar.fix"
            | "foobar.foobar.foobar.foobar"
            | "foobar.foobar.foobar.foobar.fix"
        >()
    })
})

describe("DeepTruncate", () => {
    test("Truncate the properties of an object", () => {
        expectTypeOf<utilities.DeepTruncate<DeepWithObjectsA, 1>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.DeepTruncate<DeepWithObjectsA, 2>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {
                foo: boolean
                bar: string
                foobar: {}
            }
        }>()
        expectTypeOf<utilities.DeepTruncate<DeepWithObjectsB, 2>>().toEqualTypeOf<{
            bar: boolean
            fiz: string
            foobar: {
                foo: symbol
                foobar: number
                bar: {}
            }
        }>()
        expectTypeOf<utilities.DeepTruncate<DeepWithArray, 1>>().toEqualTypeOf<{
            buz: string[]
            foobar: {}
        }>()
        expectTypeOf<utilities.DeepTruncate<DeepWithArray, 2>>().toEqualTypeOf<{
            buz: string[]
            foobar: {
                buz: number[]
                foobar: {}
            }
        }>()
        expectTypeOf<utilities.DeepTruncate<DeepWithFunctions, 1>>().toEqualTypeOf<{
            fix: () => number
            foobar: {}
        }>()
        expectTypeOf<utilities.DeepTruncate<DeepWithFunctions, 2>>().toEqualTypeOf<{
            fix: () => number
            foobar: {
                fix: () => string
                foobar: {}
            }
        }>()
    })
})

describe("DeepPartial", () => {
    test("DeepPartial for objects", () => {
        expectTypeOf<utilities.DeepPartial<DeepWithObjectsA>>().toEqualTypeOf<{
            foo?: string
            bar?: number
            foobar?: {
                foo?: boolean
                bar?: string
                foobar?: {
                    foo?: symbol
                    bar?: number
                    foobar?: {
                        foo?: bigint
                        bar?: string
                        foobar?: {
                            bar?: number
                        }
                    }
                }
            }
        }>()
    })
    expectTypeOf<utilities.DeepPartial<DeepWithArray>>().toEqualTypeOf<{
        buz?: string[]
        foobar?: {
            buz?: number[]
            foobar?: {
                buz?: boolean[]
                foobar?: {
                    buz?: symbol[]
                    foobar?: {
                        buz?: bigint[]
                    }
                }
            }
        }
    }>()
    expectTypeOf<utilities.DeepPartial<DeepWithFunctions>>().toEqualTypeOf<{
        fix?: () => number
        foobar?: {
            fix?: () => string
            foobar?: {
                fix?: () => boolean
                foobar?: {
                    fix?: () => symbol
                    foobar?: {
                        fix?: () => bigint
                    }
                }
            }
        }
    }>()
})

describe("DeepRequired", () => {
    test("DeepRequired for objects", () => {
        expectTypeOf<utilities.DeepRequired<utilities.DeepPartial<DeepWithObjectsA>>>().toEqualTypeOf<{
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
        }>()
        expectTypeOf<utilities.DeepRequired<utilities.DeepPartial<DeepWithFunctions>>>().toEqualTypeOf<{
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
        }>()
        expectTypeOf<utilities.DeepRequired<utilities.DeepPartial<DeepWithArray>>>().toEqualTypeOf<{
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
        }>()
    })
})

describe("DeepPick", () => {
    test("Pick properties from nested objects", () => {
        expectTypeOf<utilities.DeepPick<DeepWithObjectsA, "foo">>().toEqualTypeOf<{ foo: string }>()
        expectTypeOf<utilities.DeepPick<DeepWithObjectsA, "foo" | "bar">>().toEqualTypeOf<{ foo: string; bar: number }>()
        expectTypeOf<
            utilities.DeepPick<DeepWithObjectsA, "foo" | "bar" | "foobar" | "foobar.foo" | "foobar.bar">
        >().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {
                foo: boolean
                bar: string
            }
        }>()
        expectTypeOf<utilities.DeepPick<DeepWithObjectsA, "foobar.foobar.foobar.foobar.bar">>().toEqualTypeOf<{
            foobar: {
                foobar: {
                    foobar: {
                        foobar: {
                            bar: number
                        }
                    }
                }
            }
        }>()
        expectTypeOf<
            utilities.DeepPick<
                DeepWithObjectsA,
                "foobar.foo" | "foobar.foobar.bar" | "foobar.foobar.foobar.foo" | "foobar.foobar.foobar.foobar.bar"
            >
        >().toEqualTypeOf<{
            foobar: {
                foo: boolean
                foobar: {
                    bar: number
                    foobar: {
                        foo: bigint
                        foobar: {
                            bar: number
                        }
                    }
                }
            }
        }>()
        expectTypeOf<utilities.DeepPick<DeepWithFunctions, "fix" | "foobar.fix" | "foobar.foobar.fix">>().toEqualTypeOf<{
            fix: () => number
            foobar: {
                fix: () => string
                foobar: {
                    fix: () => boolean
                }
            }
        }>()
        expectTypeOf<utilities.DeepPick<DeepWithArray, "buz" | "foobar.buz" | "foobar.foobar.buz">>().toEqualTypeOf<{
            buz: string[]
            foobar: {
                buz: number[]
                foobar: {
                    buz: boolean[]
                }
            }
        }>()
    })
})

describe("DeepNullable", () => {
    test("Adds null vaalues for all of the properties of an objects", () => {
        expectTypeOf<utilities.DeepNullable<Case<DeepWithObjectsA>>>().toEqualTypeOf<{
            foo: string | null
            bar: number | null
            foobar: {} | null
        }>()
        expectTypeOf<utilities.DeepNullable<DeepWithObjectsA>>().toEqualTypeOf<{
            foo: string | null
            bar: number | null
            foobar: {
                foo: boolean | null
                bar: string | null
                foobar: {
                    foo: symbol | null
                    bar: number | null
                    foobar: {
                        foo: bigint | null
                        bar: string | null
                        foobar: {
                            bar: number | null
                        } | null
                    } | null
                } | null
            } | null
        }>()
        expectTypeOf<utilities.DeepNullable<Case<DeepWithFunctions>>>().toEqualTypeOf<{
            fix: (() => number) | null
            foobar: {} | null
        }>()
        expectTypeOf<utilities.DeepNullable<DeepWithFunctions>>().toEqualTypeOf<{
            fix: (() => number) | null
            foobar: {
                fix: (() => string) | null
                foobar: {
                    fix: (() => boolean) | null
                    foobar: {
                        fix: (() => symbol) | null
                        foobar: {
                            fix: (() => bigint) | null
                        } | null
                    } | null
                } | null
            } | null
        }>()
        expectTypeOf<utilities.DeepNullable<Case<DeepWithArray>>>().toEqualTypeOf<{
            buz: string[] | null
            foobar: {} | null
        }>()
        expectTypeOf<utilities.DeepNullable<DeepWithArray>>().toEqualTypeOf<{
            buz: string[] | null
            foobar: {
                buz: number[] | null
                foobar: {
                    buz: boolean[] | null
                    foobar: {
                        buz: symbol[] | null
                        foobar: {
                            buz: bigint[] | null
                        } | null
                    } | null
                } | null
            } | null
        }>()
    })
})

describe("DeepNonNullable", () => {
    test("Removes null values for all of the properties of an objects", () => {
        expectTypeOf<utilities.DeepNonNullable<utilities.DeepNullable<DeepWithObjectsA>>>().toEqualTypeOf<{
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
        }>()
        expectTypeOf<utilities.DeepNonNullable<utilities.DeepNullable<DeepWithArray>>>().toEqualTypeOf<{
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
        }>()
        expectTypeOf<utilities.DeepNonNullable<utilities.DeepNullable<DeepWithFunctions>>>().toEqualTypeOf<{
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
        }>()
    })
})

describe("DeepNonNullish", () => {
    test("Removes null and undefined values for all of the properties of an objects", () => {
        expectTypeOf<
            utilities.DeepNonNullish<{
                foo: string
                bar: null
                foobar: {
                    foo: undefined
                    bar: string
                    foobar: {
                        foo: null
                        bar: number
                        foobar: {
                            foo: undefined
                            bar: string
                            foobar: {
                                bar: null
                            }
                        }
                    }
                }
            }>
        >().toEqualTypeOf<{
            foo: string
            foobar: {
                bar: string
                foobar: {
                    bar: number
                    foobar: {
                        bar: string
                        foobar: {}
                    }
                }
            }
        }>()
        expectTypeOf<
            utilities.DeepNonNullish<{
                foo: string
                bar: null
                foobar: {
                    foo: undefined
                    bar: string
                    foobar: [
                        {
                            foo: null
                            bar: number
                            foobar: {
                                foo: undefined
                                bar: string
                                foobar: {
                                    bar: null
                                }
                            }
                        },
                        null,
                        undefined,
                    ]
                }
            }>
        >().toEqualTypeOf<{
            foo: string
            foobar: {
                bar: string
                foobar: [
                    {
                        bar: number
                        foobar: {
                            bar: string
                            foobar: {}
                        }
                    },
                ]
            }
        }>
        expectTypeOf<
            utilities.DeepNonNullish<{
                foo: string
                bar: null
                foobar: {
                    foo: undefined
                    bar: string
                    foobar: [
                        {
                            foo: null
                            bar: number
                            foobar: {
                                foo: undefined
                                bar: string
                                foobar: {
                                    bar: null
                                }
                            }
                        },
                        null,
                        undefined,
                        {
                            foo: [null, undefined, { bar: [null, undefined] }]
                        },
                    ]
                }
            }>
        >().toEqualTypeOf<{
            foo: string
            foobar: {
                bar: string
                foobar: [
                    {
                        bar: number
                        foobar: {
                            bar: string
                            foobar: {}
                        }
                    },
                    {
                        foo: [{ bar: [] }]
                    },
                ]
            }
        }>
    })
})

describe("DeepReplace", () => {
    test("Replace properties from nested objects", () => {
        expectTypeOf<utilities.DeepReplace<Case<DeepWithObjectsA>, string, number>>().toEqualTypeOf<{
            foo: number
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.DeepReplace<Case<DeepWithObjectsA>, string, number | boolean>>().toEqualTypeOf<{
            foo: number | boolean
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.DeepReplace<Case<DeepWithObjectsA>, {}, number | boolean>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: number | boolean
        }>()
        expectTypeOf<
            utilities.DeepReplace<Case<DeepWithObjectsA, 2>, { foo: boolean; bar: string; foobar: {} }, number | boolean>
        >().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: number | boolean
        }>()
        expectTypeOf<utilities.DeepReplace<DeepWithObjectsA, string, number | boolean | string>>().toEqualTypeOf<{
            foo: number | boolean | string
            bar: number
            foobar: {
                foo: boolean
                bar: number | boolean | string
                foobar: {
                    foo: symbol
                    bar: number
                    foobar: {
                        foo: bigint
                        bar: number | boolean | string
                        foobar: {
                            bar: number
                        }
                    }
                }
            }
        }>()
        expectTypeOf<utilities.DeepReplace<DeepWithArray, number[], string[]>>().toEqualTypeOf<{
            buz: string[]
            foobar: {
                buz: string[]
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
        }>()
        expectTypeOf<utilities.DeepReplace<DeepWithFunctions, () => number, () => string>>().toEqualTypeOf<{
            fix: () => string
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
        }>()
    })
})

describe("DeepSet", () => {
    test("Set properties from nested objects", () => {
        expectTypeOf<utilities.DeepSet<Case<DeepWithObjectsA>, "foo", string>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.DeepSet<Case<DeepWithObjectsA>, "foo" | "bar", string>>().toEqualTypeOf<{
            foo: string
            bar: string
            foobar: {}
        }>()
        expectTypeOf<
            utilities.DeepSet<Case<DeepWithObjectsA, 2>, "foo" | "bar" | "foobar.foo" | "foobar.bar", string>
        >().toEqualTypeOf<{
            foo: string
            bar: string
            foobar: {
                foo: string
                bar: string
                foobar: {}
            }
        }>()
        expectTypeOf<
            utilities.DeepSet<Case<DeepWithObjectsA, 3>, "foo" | "bar" | "foobar.foo" | "foobar.bar", string>
        >().toEqualTypeOf<{
            foo: string
            bar: string
            foobar: {
                foo: string
                bar: string
                foobar: {
                    foo: symbol
                    bar: number
                    foobar: {}
                }
            }
        }>()
        expectTypeOf<
            utilities.DeepSet<DeepWithObjectsA, "foo" | "bar" | "foobar.foo" | "foobar.bar" | "foobar.foobar.foobar.foo", string>
        >().toEqualTypeOf<{
            foo: string
            bar: string
            foobar: {
                foo: string
                bar: string
                foobar: {
                    foo: symbol
                    bar: number
                    foobar: {
                        foo: string
                        bar: string
                        foobar: {
                            bar: number
                        }
                    }
                }
            }
        }>()
        expectTypeOf<
            utilities.DeepSet<DeepWithFunctions, "fix" | "foobar.fix" | "foobar.foobar.fix", () => string>
        >().toEqualTypeOf<{
            fix: () => string
            foobar: {
                fix: () => string
                foobar: {
                    fix: () => string
                    foobar: {
                        fix: () => symbol
                        foobar: {
                            fix: () => bigint
                        }
                    }
                }
            }
        }>()
        expectTypeOf<utilities.DeepSet<DeepWithArray, "buz" | "foobar.buz" | "foobar.foobar.buz", string[]>>().toEqualTypeOf<{
            buz: string[]
            foobar: {
                buz: string[]
                foobar: {
                    buz: string[]
                    foobar: {
                        buz: symbol[]
                        foobar: {
                            buz: bigint[]
                        }
                    }
                }
            }
        }>()
    })
})
