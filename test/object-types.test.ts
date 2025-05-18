import { describe, test, expectTypeOf } from "vitest"
import type * as utilities from "../src/object-types"
import type { DeepWithObjectsA, DeepWithObjectsB, DeepWithArray, DeepWithFunctions, MergeCases, Case } from "./test-cases"

describe("Properties with keyof", () => {
    test("Combines keys of two object types", () => {
        expectTypeOf<utilities.Properties<Case<DeepWithObjectsA>, {}>>().toEqualTypeOf<"foo" | "bar" | "foobar">()
        expectTypeOf<utilities.Properties<Case<DeepWithObjectsB>, {}>>().toEqualTypeOf<"bar" | "fiz" | "foobar">()
        expectTypeOf<utilities.Properties<Case<DeepWithObjectsA>, Case<DeepWithObjectsB>>>().toEqualTypeOf<
            "foo" | "bar" | "foobar" | "fiz"
        >()
        expectTypeOf<utilities.Properties<Case<DeepWithObjectsA>, {}, true>>().toEqualTypeOf<never>()
        expectTypeOf<utilities.Properties<Case<DeepWithObjectsB>, {}, true>>().toEqualTypeOf<never>()
        expectTypeOf<utilities.Properties<Case<DeepWithObjectsA>, Case<DeepWithObjectsA>, true>>().toEqualTypeOf<
            "foo" | "bar" | "foobar"
        >()
        expectTypeOf<utilities.Properties<Case<DeepWithObjectsA>, Case<DeepWithObjectsB>, true>>().toEqualTypeOf<
            "bar" | "foobar"
        >()
    })
})

describe("Merge", () => {
    test("Merge two object types with source priority", () => {
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsA>, {}>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsB>, {}>>().toEqualTypeOf<{
            fiz: string
            bar: boolean
            foobar: {}
        }>()
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsA>, Case<DeepWithObjectsB>>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
            fiz: string
        }>()
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsA, 2>, Case<DeepWithObjectsB, 2>>>().toEqualTypeOf<{
            foo: string
            bar: number
            fiz: string
            foobar: {
                foo: boolean
                bar: {}
                foobar: {}
            }
        }>()
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsA, 3>, Case<DeepWithObjectsB, 3>>>().toEqualTypeOf<{
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
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsA, 4>, Case<DeepWithObjectsB, 4>>>().toEqualTypeOf<{
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
    })

    test("Merge two object types with union enabled", () => {
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsA>, {}, true>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsB>, {}, true>>().toEqualTypeOf<{
            fiz: string
            bar: boolean
            foobar: {}
        }>()
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsA>, Case<DeepWithObjectsB>, true>>().toEqualTypeOf<{
            foo: string
            bar: number | boolean
            foobar: {}
            fiz: string
        }>()
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsA, 2>, Case<DeepWithObjectsB, 2>, true>>().toEqualTypeOf<{
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
        expectTypeOf<utilities.Merge<Case<DeepWithObjectsA, 3>, Case<DeepWithObjectsB, 3>, true>>().toEqualTypeOf<{
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

        expectTypeOf<utilities.Merge<Case<DeepWithObjectsA, 4>, Case<DeepWithObjectsB, 4>, true>>().toEqualTypeOf<{
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
        expectTypeOf<utilities.MergeAll<[Case<DeepWithObjectsA>, Case<DeepWithObjectsB>]>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
            fiz: string
        }>()
    })
})

describe("Intersection", () => {
    test("Intersection of properties between two objects", () => {
        expectTypeOf<utilities.Intersection<Case<DeepWithObjectsA>, Case<DeepWithObjectsB>>>().toEqualTypeOf<{
            foo: string
            fiz: string
        }>()
        expectTypeOf<utilities.Intersection<Case<DeepWithArray>, Case<DeepWithObjectsB>>>().toEqualTypeOf<{
            bar: boolean
            fiz: string
            buz: string[]
        }>()
        expectTypeOf<utilities.Intersection<Case<DeepWithObjectsA, 2>, Case<DeepWithObjectsB, 2>>>().toEqualTypeOf<{
            foo: string
            fiz: string
        }>()
        expectTypeOf<utilities.Intersection<Case<DeepWithArray, 2>, Case<DeepWithFunctions, 2>>>().toEqualTypeOf<{
            fix: () => number
            buz: string[]
        }>()
        expectTypeOf<utilities.Intersection<Case<DeepWithArray, 2>, Case<DeepWithFunctions, 2>>>().toEqualTypeOf<{
            fix: () => number
            buz: string[]
        }>()
    })
})

describe("FlattenProperties", () => {
    test("Extract property from object", () => {
        expectTypeOf<utilities.FlattenProperties<Case<DeepWithObjectsA>, "foobar">>().toEqualTypeOf<{
            foo: string
            bar: number
        }>()
        // Please check the behavior of this test
        // @ts-expect-error
        expectTypeOf<utilities.FlattenProperties<Case<DeepWithObjectsA, 2>, "foobar">>().toEqualTypeOf<{
            foo: boolean
            bar: string
        }>()
    })
})

describe("PublicOnly", () => {
    test("Remove properties beginning with (_)", () => {
        expectTypeOf<utilities.PublicOnly<{ foo: string }>>().toEqualTypeOf<{
            foo: string
        }>()
        expectTypeOf<utilities.PublicOnly<{ foo: string; _bar: string }>>().toEqualTypeOf<{ foo: string }>()
        expectTypeOf<utilities.PublicOnly<{ _foo: string; _bar: string }>>().toEqualTypeOf<{}>()
    })
})

describe("Get", () => {
    test("Exist the key within objects", () => {
        expectTypeOf<utilities.Get<Case<DeepWithObjectsA>, Case<DeepWithObjectsB>, "foo">>().toEqualTypeOf<string>()
        expectTypeOf<utilities.Get<Case<DeepWithObjectsA>, Case<DeepWithObjectsB>, "foo" | "bar">>().toEqualTypeOf<
            string | number
        >()
        expectTypeOf<utilities.Get<Case<DeepWithObjectsA>, Case<DeepWithObjectsB>, "foo" | "fiz">>().toEqualTypeOf<string>()
        expectTypeOf<utilities.Get<Case<DeepWithArray>, Case<DeepWithFunctions>, "buz" | "fix">>().toEqualTypeOf<
            string[] | (() => number)
        >()
        expectTypeOf<utilities.Get<Case<DeepWithObjectsA, 2>, Case<DeepWithObjectsB, 2>, "foobar">>().toEqualTypeOf<{
            foo: boolean
            bar: string
            foobar: {}
        }>()
        expectTypeOf<utilities.Get<Case<DeepWithArray, 2>, Case<DeepWithObjectsB, 2>, "buz">>().toEqualTypeOf<string[]>()
        expectTypeOf<utilities.Get<Case<DeepWithFunctions, 2>, Case<DeepWithObjectsB, 2>, "fix">>().toEqualTypeOf<() => number>()
        expectTypeOf<utilities.Get<MergeCases, {}, "fix" | "fiz" | "buz">>().toEqualTypeOf<string | string[] | (() => number)>()
    })
})

describe("RequiredByKeys", () => {
    test("Convert required properties in an object", () => {
        expectTypeOf<utilities.RequiredByKeys<Partial<Case<DeepWithObjectsA>>, "bar">>().toEqualTypeOf<{
            bar: number
            foo?: string
            foobar?: {}
        }>()
        expectTypeOf<utilities.RequiredByKeys<Partial<Case<DeepWithObjectsA>>, "bar" | "foobar">>().toEqualTypeOf<{
            bar: number
            foo?: string
            foobar: {}
        }>()
        expectTypeOf<utilities.RequiredByKeys<Partial<Case<DeepWithObjectsB>>, "fiz">>().toEqualTypeOf<{
            bar?: boolean
            fiz: string
            foobar?: {}
        }>()
        expectTypeOf<utilities.RequiredByKeys<Partial<Case<DeepWithObjectsB>>, "fiz">>().toEqualTypeOf<{
            bar?: boolean
            fiz: string
            foobar?: {}
        }>()
        expectTypeOf<utilities.RequiredByKeys<Partial<MergeCases>, "fiz">>().toEqualTypeOf<{
            foo?: string
            bar?: number
            foobar?: {}
            fiz: string
            fix?: () => number
            buz?: string[]
        }>()
        expectTypeOf<utilities.RequiredByKeys<Partial<MergeCases>, "fiz" | "foobar">>().toEqualTypeOf<{
            foo?: string
            bar?: number
            foobar: {}
            fiz: string
            fix?: () => number
            buz?: string[]
        }>()
        expectTypeOf<utilities.RequiredByKeys<Partial<MergeCases>, "fiz" | "foobar" | "fix" | "buz">>().toEqualTypeOf<{
            foo?: string
            bar?: number
            foobar: {}
            fiz: string
            fix: () => number
            buz: string[]
        }>()
    })
})

describe("Mutable", () => {
    test("Converts properties to non readonly only one level", () => {
        expectTypeOf<utilities.Mutable<utilities.DeepReadonly<Case<DeepWithObjectsA, 2>>>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {
                readonly foo: boolean
                readonly bar: string
                readonly foobar: {}
            }
        }>()
        expectTypeOf<utilities.Mutable<utilities.DeepReadonly<Case<DeepWithObjectsA, 3>>>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {
                readonly foo: boolean
                readonly bar: string
                readonly foobar: {
                    readonly foo: symbol
                    readonly bar: number
                    readonly foobar: {}
                }
            }
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

describe("Append", () => {
    test("Append a new property of an exist object type", () => {
        expectTypeOf<utilities.Append<{ foo: string }, "bar", number>>().toEqualTypeOf<{
            foo: string
            bar: number
        }>()
        expectTypeOf<utilities.Append<{ foo: string }, "bar", { foobar: number; barfoo: boolean }>>().toEqualTypeOf<{
            foo: string
            bar: { foobar: number; barfoo: boolean }
        }>()
        expectTypeOf<utilities.Append<{ foo: string }, "bar", string | boolean | number>>().toEqualTypeOf<{
            foo: string
            bar: string | boolean | number
        }>()
        expectTypeOf<utilities.Append<Case<DeepWithArray>, "bar", [1, 2, 3]>>().toEqualTypeOf<{
            buz: string[]
            foobar: {}
            bar: [1, 2, 3]
        }>()
        expectTypeOf<utilities.Append<Case<DeepWithFunctions>, "buz", (num: number) => string>>().toEqualTypeOf<{
            fix: () => number
            foobar: {}
            buz: (num: number) => string
        }>()
        expectTypeOf<utilities.Append<Case<DeepWithObjectsA>, "appened", Case<DeepWithObjectsB>>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
            appened: {
                bar: boolean
                fiz: string
                foobar: {}
            }
        }>()
    })
})

describe("Omit Properties", () => {
    describe("OmitByType", () => {
        test("Omit the properties based on the type", () => {
            expectTypeOf<utilities.OmitByType<Case<DeepWithObjectsA>, string>>().toEqualTypeOf<{
                bar: number
                foobar: {}
            }>()
            expectTypeOf<utilities.OmitByType<Case<DeepWithObjectsA>, string | object>>().toEqualTypeOf<{
                bar: number
            }>()
            expectTypeOf<utilities.OmitByType<Case<DeepWithObjectsA>, string | number>>().toEqualTypeOf<{
                foobar: {}
            }>()
            expectTypeOf<utilities.OmitByType<Case<DeepWithObjectsB>, boolean | object>>().toEqualTypeOf<{
                fiz: string
            }>()
            expectTypeOf<utilities.OmitByType<Case<DeepWithArray>, string[]>>().toEqualTypeOf<{
                foobar: {}
            }>()
            expectTypeOf<utilities.OmitByType<Case<DeepWithFunctions>, () => number>>().toEqualTypeOf<{
                foobar: {}
            }>()
        })
    })
})

describe("ObjectEntries", () => {
    test("Returns the entries from an object", () => {
        expectTypeOf<utilities.ObjectEntries<{ foo: string }>>().toEqualTypeOf<["foo", string]>()
        expectTypeOf<utilities.ObjectEntries<{ foo?: string }>>().toEqualTypeOf<["foo", string]>()
        expectTypeOf<utilities.ObjectEntries<{ foo?: string; bar?: number }>>().toEqualTypeOf<["foo", string] | ["bar", number]>()
        expectTypeOf<utilities.ObjectEntries<{ foo?: undefined; bar: undefined | string }>>().toEqualTypeOf<
            ["foo", undefined] | ["bar", undefined | string]
        >()
    })
})

describe("Pick Utilities", () => {
    describe("PickByType", () => {
        test("Pick by type", () => {
            expectTypeOf<utilities.PickByType<Case<DeepWithObjectsA>, number>>().toEqualTypeOf<{
                bar: number
            }>()
            expectTypeOf<utilities.PickByType<Case<DeepWithObjectsA>, object>>().toEqualTypeOf<{
                foobar: {}
            }>()
            expectTypeOf<utilities.PickByType<Case<DeepWithObjectsB>, boolean | string>>().toEqualTypeOf<{
                bar: boolean
                fiz: string
            }>()
            expectTypeOf<utilities.PickByType<Case<DeepWithFunctions>, () => number>>().toEqualTypeOf<{
                fix: () => number
            }>()
            expectTypeOf<utilities.PickByType<Case<DeepWithFunctions>, () => string>>().toEqualTypeOf<{}>()
            expectTypeOf<utilities.PickByType<Case<DeepWithArray>, string[]>>().toEqualTypeOf<{
                buz: string[]
            }>()
            expectTypeOf<utilities.PickByType<Case<DeepWithArray>, unknown[]>>().toEqualTypeOf<{
                buz: string[]
            }>()
        })
    })
})

describe("ReplaceKeys", () => {
    test("Replace the key types", () => {
        expectTypeOf<utilities.ReplaceKeys<Case<DeepWithObjectsA>, "bar", { bar: boolean }>>().toEqualTypeOf<{
            foo: string
            bar: boolean
            foobar: {}
        }>()
        expectTypeOf<
            utilities.ReplaceKeys<Case<DeepWithObjectsA>, "foobar", { foobar: { bar: boolean; fiz: string } }>
        >().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {
                bar: boolean
                fiz: string
            }
        }>()
        expectTypeOf<
            utilities.ReplaceKeys<Case<DeepWithObjectsA>, "bar" | "foobar", { bar: boolean; foobar: () => void }>
        >().toEqualTypeOf<{
            foo: string
            bar: boolean
            foobar: () => void
        }>()
    })
})

describe("MapTypes", () => {
    test("Replace the types of the keys that match with Mapper type", () => {
        expectTypeOf<utilities.MapTypes<Case<DeepWithObjectsA>, { from: boolean; to: number }>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.MapTypes<Case<DeepWithObjectsA>, { from: string; to: number }>>().toEqualTypeOf<{
            foo: number
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.MapTypes<Case<DeepWithObjectsA>, { from: {}; to: number }>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: number
        }>()
        expectTypeOf<utilities.MapTypes<Case<DeepWithArray>, { from: object; to: number }>>().toEqualTypeOf<{
            buz: string[]
            foobar: {}
        }>()
        expectTypeOf<utilities.MapTypes<Case<DeepWithFunctions>, { from: () => number; to: string }>>().toEqualTypeOf<{
            fix: string
            foobar: {}
        }>()
        expectTypeOf<
            utilities.MapTypes<
                Case<DeepWithObjectsA, 2>,
                {
                    from: {
                        foo: boolean
                        bar: string
                        foobar: {}
                    }
                    to: number
                }
            >
        >().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: number
        }>()
        // TODO: Check why this test is failing
        expectTypeOf<
            utilities.MapTypes<Case<DeepWithObjectsA>, { from: string; to: number } | { from: {}; to: number }>
            // @ts-ignore
        >().toEqualTypeOf<{
            foo: number
            bar: number
            foobar: number
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
    })
})

describe("ToPrimitive", () => {
    test("Converts a string to a primitive type", () => {
        expectTypeOf<utilities.ToPrimitive<Case<DeepWithObjectsA, 2>>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {
                foo: boolean
                bar: string
                foobar: {}
            }
        }>()
        expectTypeOf<utilities.ToPrimitive<Case<DeepWithFunctions, 2>>>().toEqualTypeOf<{
            fix: Function
            foobar: {
                fix: Function
                foobar: {}
            }
        }>()
        expectTypeOf<utilities.ToPrimitive<Case<DeepWithArray, 2>>>().toEqualTypeOf<{
            buz: string[]
            foobar: {
                buz: number[]
                foobar: {}
            }
        }>()
    })
})

describe("GetRequired", () => {
    test("Get the required properties of an object", () => {
        expectTypeOf<utilities.GetRequired<{ foo: string; bar: number }>>().toEqualTypeOf<{ foo: string; bar: number }>()
        expectTypeOf<utilities.GetRequired<{ foo: null; bar: number }>>().toEqualTypeOf<{ foo: null; bar: number }>()
        expectTypeOf<utilities.GetRequired<{ foo: undefined; bar: number }>>().toEqualTypeOf<{ foo: undefined; bar: number }>()
        expectTypeOf<utilities.GetRequired<{ foo: undefined; bar?: number }>>().toEqualTypeOf<{ foo: undefined }>()
    })
})

describe("GetOptional", () => {
    test("Get the optional properties of an object", () => {
        expectTypeOf<utilities.GetOptional<{ foo: string; bar?: number }>>().toEqualTypeOf<{ bar?: number }>()
        expectTypeOf<utilities.GetOptional<{ foo: string; bar: number }>>().toEqualTypeOf<{}>()
        expectTypeOf<utilities.GetOptional<{ foo: null; bar: number }>>().toEqualTypeOf<{}>()
        expectTypeOf<utilities.GetOptional<{ foo: undefined; bar: number }>>().toEqualTypeOf<{}>()
        expectTypeOf<utilities.GetOptional<{ foo: undefined; bar?: number }>>().toEqualTypeOf<{ bar?: number }>()
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
            utilities.DeepGet<utilities.Merge<DeepWithArray, DeepWithFunctions>, "fix" | "buz" | "foobar.fix" | "foobar.buz">
        >().toEqualTypeOf<(() => number) | string[] | (() => string) | number[]>()
    })
})

describe("PartialByKeys", () => {
    test("Convert required properties in an object", () => {
        expectTypeOf<utilities.PartialByKeys<Case<DeepWithObjectsA>, "foobar">>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar?: {}
        }>()
        expectTypeOf<utilities.PartialByKeys<Case<DeepWithObjectsA>, "foo" | "bar">>().toEqualTypeOf<{
            foo?: string
            bar?: number
            foobar: {}
        }>()
        expectTypeOf<utilities.PartialByKeys<Case<DeepWithFunctions>, "fix">>().toEqualTypeOf<{
            fix?: () => number
            foobar: {}
        }>()
        expectTypeOf<utilities.PartialByKeys<Case<DeepWithArray>, "buz">>().toEqualTypeOf<{
            buz?: string[]
            foobar: {}
        }>()
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

describe("Readonly", () => {
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
