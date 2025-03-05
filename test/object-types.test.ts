import { describe, test, expectTypeOf } from "vitest"
import type * as utilities from "../src/object-types"
import type { DeepTruncate as CaseTruncate } from "../src/object-types"
import type { DeepWithObjectsA, DeepWithObjectsB, DeepWithArray, DeepWithFunctions, MergeCases } from "./test-cases"

describe("Properties with keyof", () => {
    test("Combines keys of two object types", () => {
        expectTypeOf<utilities.Properties<CaseTruncate<DeepWithObjectsA, 1>, {}>>().toEqualTypeOf<"foo" | "bar" | "foobar">()
        expectTypeOf<utilities.Properties<CaseTruncate<DeepWithObjectsB, 1>, {}>>().toEqualTypeOf<"bar" | "fiz" | "foobar">()
        expectTypeOf<utilities.Properties<CaseTruncate<DeepWithObjectsA, 1>, CaseTruncate<DeepWithObjectsB, 1>>>().toEqualTypeOf<
            "foo" | "bar" | "foobar" | "fiz"
        >()
        expectTypeOf<utilities.Properties<CaseTruncate<DeepWithObjectsA, 1>, {}, true>>().toEqualTypeOf<never>()
        expectTypeOf<utilities.Properties<CaseTruncate<DeepWithObjectsB, 1>, {}, true>>().toEqualTypeOf<never>()
        expectTypeOf<
            utilities.Properties<CaseTruncate<DeepWithObjectsA, 1>, CaseTruncate<DeepWithObjectsA, 1>, true>
        >().toEqualTypeOf<"foo" | "bar" | "foobar">()
        expectTypeOf<
            utilities.Properties<CaseTruncate<DeepWithObjectsA, 1>, CaseTruncate<DeepWithObjectsB, 1>, true>
        >().toEqualTypeOf<"bar" | "foobar">()
    })
})

describe("Merge", () => {
    test("Merge two object types with source priority", () => {
        expectTypeOf<utilities.Merge<CaseTruncate<DeepWithObjectsA, 1>, {}>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.Merge<CaseTruncate<DeepWithObjectsB, 1>, {}>>().toEqualTypeOf<{
            fiz: string
            bar: boolean
            foobar: {}
        }>()
        expectTypeOf<utilities.Merge<CaseTruncate<DeepWithObjectsA, 1>, CaseTruncate<DeepWithObjectsB, 1>>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
            fiz: string
        }>()
        expectTypeOf<utilities.Merge<CaseTruncate<DeepWithObjectsA, 2>, CaseTruncate<DeepWithObjectsB, 2>>>().toEqualTypeOf<{
            foo: string
            bar: number
            fiz: string
            foobar: {
                foo: boolean
                bar: {}
                foobar: {}
            }
        }>()
        expectTypeOf<utilities.Merge<CaseTruncate<DeepWithObjectsA, 3>, CaseTruncate<DeepWithObjectsB, 3>>>().toEqualTypeOf<{
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
        expectTypeOf<utilities.Merge<CaseTruncate<DeepWithObjectsA, 4>, CaseTruncate<DeepWithObjectsB, 4>>>().toEqualTypeOf<{
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
        expectTypeOf<utilities.Merge<CaseTruncate<DeepWithObjectsA, 1>, {}, true>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
        }>()
        expectTypeOf<utilities.Merge<CaseTruncate<DeepWithObjectsB, 1>, {}, true>>().toEqualTypeOf<{
            fiz: string
            bar: boolean
            foobar: {}
        }>()
        expectTypeOf<
            utilities.Merge<CaseTruncate<DeepWithObjectsA, 1>, CaseTruncate<DeepWithObjectsB, 1>, true>
        >().toEqualTypeOf<{
            foo: string
            bar: number | boolean
            foobar: {}
            fiz: string
        }>()
        expectTypeOf<
            utilities.Merge<CaseTruncate<DeepWithObjectsA, 2>, CaseTruncate<DeepWithObjectsB, 2>, true>
        >().toEqualTypeOf<{
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
        expectTypeOf<
            utilities.Merge<CaseTruncate<DeepWithObjectsA, 3>, CaseTruncate<DeepWithObjectsB, 3>, true>
        >().toEqualTypeOf<{
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

        expectTypeOf<
            utilities.Merge<CaseTruncate<DeepWithObjectsA, 4>, CaseTruncate<DeepWithObjectsB, 4>, true>
        >().toEqualTypeOf<{
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
        expectTypeOf<utilities.MergeAll<[CaseTruncate<DeepWithObjectsA, 1>, CaseTruncate<DeepWithObjectsB, 1>]>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {}
            fiz: string
        }>()
    })
})

describe("Intersection", () => {
    test("Intersection of properties between two objects", () => {
        expectTypeOf<
            utilities.Intersection<CaseTruncate<DeepWithObjectsA, 1>, CaseTruncate<DeepWithObjectsB, 1>>
        >().toEqualTypeOf<{ foo: string; fiz: string }>()
        expectTypeOf<utilities.Intersection<CaseTruncate<DeepWithArray, 1>, CaseTruncate<DeepWithObjectsB, 1>>>().toEqualTypeOf<{
            bar: boolean
            fiz: string
            buz: string[]
        }>()
        expectTypeOf<
            utilities.Intersection<CaseTruncate<DeepWithObjectsA, 2>, CaseTruncate<DeepWithObjectsB, 2>>
        >().toEqualTypeOf<{ foo: string; fiz: string }>()
        expectTypeOf<utilities.Intersection<CaseTruncate<DeepWithArray, 2>, CaseTruncate<DeepWithFunctions, 2>>>().toEqualTypeOf<{
            fix: () => number
            buz: string[]
        }>()
        expectTypeOf<utilities.Intersection<CaseTruncate<DeepWithArray, 2>, CaseTruncate<DeepWithFunctions, 2>>>().toEqualTypeOf<{
            fix: () => number
            buz: string[]
        }>()
    })
})

describe("FlattenProperties", () => {
    test("Extract property from object", () => {
        expectTypeOf<utilities.FlattenProperties<CaseTruncate<DeepWithObjectsA, 1>, "foobar">>().toEqualTypeOf<{
            foo: string
            bar: number
        }>()
        // Please check the behavior of this test
        // @ts-expect-error
        expectTypeOf<utilities.FlattenProperties<CaseTruncate<DeepWithObjectsA, 2>, "foobar">>().toEqualTypeOf<{
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
        expectTypeOf<
            utilities.Get<CaseTruncate<DeepWithObjectsA, 1>, CaseTruncate<DeepWithObjectsB, 1>, "foo">
        >().toEqualTypeOf<string>()
        expectTypeOf<
            utilities.Get<CaseTruncate<DeepWithObjectsA, 1>, CaseTruncate<DeepWithObjectsB, 1>, "foo" | "bar">
        >().toEqualTypeOf<string | number>()
        expectTypeOf<
            utilities.Get<CaseTruncate<DeepWithObjectsA, 1>, CaseTruncate<DeepWithObjectsB, 1>, "foo" | "fiz">
        >().toEqualTypeOf<string>()
        expectTypeOf<
            utilities.Get<CaseTruncate<DeepWithArray, 1>, CaseTruncate<DeepWithFunctions, 1>, "buz" | "fix">
        >().toEqualTypeOf<string[] | (() => number)>()
        expectTypeOf<
            utilities.Get<CaseTruncate<DeepWithObjectsA, 2>, CaseTruncate<DeepWithObjectsB, 2>, "foobar">
        >().toEqualTypeOf<{
            foo: boolean
            bar: string
            foobar: {}
        }>()
        expectTypeOf<utilities.Get<CaseTruncate<DeepWithArray, 2>, CaseTruncate<DeepWithObjectsB, 2>, "buz">>().toEqualTypeOf<
            string[]
        >()
        expectTypeOf<utilities.Get<CaseTruncate<DeepWithFunctions, 2>, CaseTruncate<DeepWithObjectsB, 2>, "fix">>().toEqualTypeOf<
            () => number
        >()
        expectTypeOf<utilities.Get<MergeCases, {}, "fix" | "fiz" | "buz">>().toEqualTypeOf<string | string[] | (() => number)>()
    })
})

describe("RequiredByKeys", () => {
    test("Convert required properties in an object", () => {
        expectTypeOf<utilities.RequiredByKeys<Partial<CaseTruncate<DeepWithObjectsA, 1>>, "bar">>().toEqualTypeOf<{
            bar: number
            foo?: string
            foobar?: {}
        }>()
        expectTypeOf<utilities.RequiredByKeys<Partial<CaseTruncate<DeepWithObjectsA, 1>>, "bar" | "foobar">>().toEqualTypeOf<{
            bar: number
            foo?: string
            foobar: {}
        }>()
        expectTypeOf<utilities.RequiredByKeys<Partial<CaseTruncate<DeepWithObjectsB, 1>>, "fiz">>().toEqualTypeOf<{
            bar?: boolean
            fiz: string
            foobar?: {}
        }>()
        expectTypeOf<utilities.RequiredByKeys<Partial<CaseTruncate<DeepWithObjectsB, 1>>, "fiz">>().toEqualTypeOf<{
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
        expectTypeOf<utilities.Mutable<utilities.DeepReadonly<CaseTruncate<DeepWithObjectsA, 2>>>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {
                readonly foo: boolean
                readonly bar: string
                readonly foobar: {}
            }
        }>()
        expectTypeOf<utilities.Mutable<utilities.DeepReadonly<CaseTruncate<DeepWithObjectsA, 3>>>>().toEqualTypeOf<{
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
        expectTypeOf<utilities.Append<CaseTruncate<DeepWithArray, 1>, "bar", [1, 2, 3]>>().toEqualTypeOf<{
            buz: string[]
            foobar: {}
            bar: [1, 2, 3]
        }>()
        expectTypeOf<utilities.Append<CaseTruncate<DeepWithFunctions, 1>, "buz", (num: number) => string>>().toEqualTypeOf<{
            fix: () => number
            foobar: {}
            buz: (num: number) => string
        }>()
        expectTypeOf<
            utilities.Append<CaseTruncate<DeepWithObjectsA, 1>, "appened", CaseTruncate<DeepWithObjectsB, 1>>
        >().toEqualTypeOf<{
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
            expectTypeOf<utilities.OmitByType<CaseTruncate<DeepWithObjectsA, 1>, string>>().toEqualTypeOf<{
                bar: number
                foobar: {}
            }>()
            expectTypeOf<utilities.OmitByType<CaseTruncate<DeepWithObjectsA, 1>, string | object>>().toEqualTypeOf<{
                bar: number
            }>()
            expectTypeOf<utilities.OmitByType<CaseTruncate<DeepWithObjectsA, 1>, string | number>>().toEqualTypeOf<{
                foobar: {}
            }>()
            expectTypeOf<utilities.OmitByType<CaseTruncate<DeepWithObjectsB, 1>, boolean | object>>().toEqualTypeOf<{
                fiz: string
            }>()
            expectTypeOf<utilities.OmitByType<CaseTruncate<DeepWithArray, 1>, string[]>>().toEqualTypeOf<{
                foobar: {}
            }>()
            expectTypeOf<utilities.OmitByType<CaseTruncate<DeepWithFunctions, 1>, () => number>>().toEqualTypeOf<{
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
            expectTypeOf<utilities.PickByType<CaseTruncate<DeepWithObjectsA, 1>, number>>().toEqualTypeOf<{
                bar: number
            }>()
            expectTypeOf<utilities.PickByType<CaseTruncate<DeepWithObjectsA, 1>, object>>().toEqualTypeOf<{
                foobar: {}
            }>()
            expectTypeOf<utilities.PickByType<CaseTruncate<DeepWithObjectsB, 1>, boolean | string>>().toEqualTypeOf<{
                bar: boolean
                fiz: string
            }>()
            expectTypeOf<utilities.PickByType<CaseTruncate<DeepWithFunctions, 1>, () => number>>().toEqualTypeOf<{
                fix: () => number
            }>()
            expectTypeOf<utilities.PickByType<CaseTruncate<DeepWithFunctions, 1>, () => string>>().toEqualTypeOf<{}>()
            expectTypeOf<utilities.PickByType<CaseTruncate<DeepWithArray, 1>, string[]>>().toEqualTypeOf<{
                buz: string[]
            }>()
            expectTypeOf<utilities.PickByType<CaseTruncate<DeepWithArray, 1>, unknown[]>>().toEqualTypeOf<{
                buz: string[]
            }>()
        })
    })
})

describe("ReplaceKeys", () => {
    test("Replace the key types", () => {
        expectTypeOf<utilities.ReplaceKeys<{ foo: string; bar: number }, "bar", { bar: string }>>().toEqualTypeOf<{
            foo: string
            bar: string
        }>()
        expectTypeOf<utilities.ReplaceKeys<{ foo: string; bar: number }, "foo", { foo: string }>>().toEqualTypeOf<{
            foo: string
            bar: number
        }>()
        expectTypeOf<utilities.ReplaceKeys<{ foo: string; bar: number }, "bar", { bar: string }>>().toEqualTypeOf<{
            foo: string
            bar: string
        }>()
        expectTypeOf<
            utilities.ReplaceKeys<{ foo: string; bar: number }, "foo" | "bar", { foo: number; bar: boolean }>
        >().toEqualTypeOf<{
            foo: number
            bar: boolean
        }>()
    })
})

describe("MapTypes", () => {
    test("Replace the types of the keys that match with Mapper type", () => {
        expectTypeOf<utilities.MapTypes<{ foo: string; bar: number }, { from: string; to: number }>>().toEqualTypeOf<{
            foo: number
            bar: number
        }>()
        expectTypeOf<utilities.MapTypes<{ foo: number; bar: number }, { from: number; to: string }>>().toEqualTypeOf<{
            foo: string
            bar: string
        }>()
        expectTypeOf<utilities.MapTypes<{ foo: string; bar: number }, { from: boolean; to: number }>>().toEqualTypeOf<{
            foo: string
            bar: number
        }>()
        expectTypeOf<utilities.MapTypes<{ foo: () => {}; bar: string }, { from: () => {}; to: never }>>().toEqualTypeOf<{
            foo: never
            bar: string
        }>()
        expectTypeOf<
            utilities.MapTypes<{ foo: string; bar: number }, { from: string; to: boolean } | { from: number; to: bigint }>
        >().toEqualTypeOf<{ foo: boolean; bar: bigint }>()
    })
})

describe("DeepOmit", () => {
    test("Omit properties from nested objects", () => {
        type TestCase = {
            foo: string
            bar: number
            foobar: {
                foo: number
                bar: boolean
                foobar: {
                    foo: string
                    bar: number
                    foobar: {
                        foo: string
                        bar: number
                        fiz: {
                            buz: number
                        }
                    }
                }
            }
        }

        expectTypeOf<utilities.DeepOmit<TestCase, "foo">>().toEqualTypeOf<{
            bar: number
            foobar: {
                foo: number
                bar: boolean
                foobar: {
                    foo: string
                    bar: number
                    foobar: {
                        foo: string
                        bar: number
                        fiz: {
                            buz: number
                        }
                    }
                }
            }
        }>()
        expectTypeOf<utilities.DeepOmit<TestCase, "foo" | "bar">>().toEqualTypeOf<{
            foobar: {
                foo: number
                bar: boolean
                foobar: {
                    foo: string
                    bar: number
                    foobar: {
                        foo: string
                        bar: number
                        fiz: {
                            buz: number
                        }
                    }
                }
            }
        }>()

        expectTypeOf<
            utilities.DeepOmit<TestCase, "foo" | "bar" | "foobar.foo" | "foobar.foobar.bar" | "foobar.foobar.foobar.fiz">
        >().toEqualTypeOf<{
            foobar: {
                bar: boolean
                foobar: {
                    foo: string
                    foobar: {
                        foo: string
                        bar: number
                    }
                }
            }
        }>()
    })
})

describe("ToPrimitive", () => {
    test("Converts a string to a primitive type", () => {
        expectTypeOf<utilities.ToPrimitive<{ foo: string; bar: string }>>().toEqualTypeOf<{ foo: string; bar: string }>()
        expectTypeOf<utilities.ToPrimitive<{ foo: "foobar"; bar: string }>>().toEqualTypeOf<{ foo: string; bar: string }>()
        expectTypeOf<utilities.ToPrimitive<{ foo: "foobar"; bar: 12 }>>().toEqualTypeOf<{ foo: string; bar: number }>()
        expectTypeOf<utilities.ToPrimitive<{ foo: { foobar: "fo"; bar: false }; bar: 12 }>>().toEqualTypeOf<{
            foo: { foobar: string; bar: boolean }
            bar: number
        }>()
    })
})

describe("GetRequired", () => {
    test("Get the required properties of an object", () => {
        expectTypeOf<utilities.GetRequired<{ foo: string; bar?: number }>>().toEqualTypeOf<{ foo: string }>()
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

describe("DeepPick", () => {
    test("Pick properties from nested objects", () => {
        type Obj = {
            foo: string
            bar: number
            foobar: {
                foofoo: number
                barbar: boolean
                foo: {
                    bar: string
                    foobar: number
                    barfoo: {
                        foobar: string
                        bar: number
                    }
                }
            }
        }

        expectTypeOf<utilities.DeepPick<Obj, "foo">>().toEqualTypeOf<string>()
        expectTypeOf<utilities.DeepPick<Obj, "bar">>().toEqualTypeOf<number>()
        expectTypeOf<utilities.DeepPick<Obj, "foobar">>().toEqualTypeOf<{
            foofoo: number
            barbar: boolean
            foo: {
                bar: string
                foobar: number
                barfoo: {
                    foobar: string
                    bar: number
                }
            }
        }>()
        expectTypeOf<utilities.DeepPick<Obj, "foobar.barbar">>().toEqualTypeOf<boolean>()
        expectTypeOf<utilities.DeepPick<Obj, "foobar.foo.barfoo">>().toEqualTypeOf<{
            foobar: string
            bar: number
        }>()
    })
})

describe("PartialByKeys", () => {
    test("Convert required properties in an object", () => {
        expectTypeOf<utilities.PartialByKeys<CaseTruncate<DeepWithObjectsA, 1>, "foobar">>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar?: {}
        }>()
        expectTypeOf<utilities.PartialByKeys<CaseTruncate<DeepWithObjectsA, 1>, "foo" | "bar">>().toEqualTypeOf<{
            foo?: string
            bar?: number
            foobar: {}
        }>()
        expectTypeOf<utilities.PartialByKeys<CaseTruncate<DeepWithFunctions, 1>, "fix">>().toEqualTypeOf<{
            fix?: () => number
            foobar: {}
        }>()
        expectTypeOf<utilities.PartialByKeys<CaseTruncate<DeepWithArray, 1>, "buz">>().toEqualTypeOf<{
            buz?: string[]
            foobar: {}
        }>()
    })
})

describe("DeepKeys", () => {
    test("Get the paths of an object", () => {
        expectTypeOf<
            utilities.DeepKeys<{
                foo: string
                bar: number
                foobar: {
                    foofoo: number
                    barbar: boolean
                    foo: {
                        bar: string
                        foobar: number
                        barfoo: {
                            foobar: string
                            bar: number
                        }
                        fn: () => {}
                    }
                }
                fn: () => {}
                123: string
                "123-foo": string
                "123-foo-bar": string
            }>
        >().toEqualTypeOf<
            | "foo"
            | "bar"
            | "foobar"
            | "foobar.foofoo"
            | "foobar.barbar"
            | "foobar.foo"
            | "foobar.foo.bar"
            | "foobar.foo.foobar"
            | "foobar.foo.barfoo"
            | "foobar.foo.barfoo.foobar"
            | "foobar.foo.barfoo.bar"
            | "foobar.foo.fn"
            | "fn"
            | "123"
            | "123-foo"
            | "123-foo-bar"
        >()
    })
})

describe("Readonly", () => {
    test("DeepReadonly for objects", () => {
        expectTypeOf<utilities.DeepReadonly<{ foo: string; bar: number }>>().toEqualTypeOf<{
            readonly foo: string
            readonly bar: number
        }>()
        expectTypeOf<utilities.DeepReadonly<{ foo: string; bar: { foo: number } }>>().toEqualTypeOf<{
            readonly foo: string
            readonly bar: { readonly foo: number }
        }>()
        expectTypeOf<utilities.DeepReadonly<{ foo: { bar: string }; bar: { foo: number } }>>().toEqualTypeOf<{
            readonly foo: { readonly bar: string }
            readonly bar: { readonly foo: number }
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
