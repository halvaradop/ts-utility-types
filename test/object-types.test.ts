import { describe, test, expectTypeOf } from "vitest"
import type * as utilities from "../src/object-types"

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

describe("Properties with keyof", () => {
    test("Combines keys of two object types", () => {
        expectTypeOf<utilities.Properties<{ a: number }, { a: string }>>().toEqualTypeOf<"a">()
        expectTypeOf<utilities.Properties<{ a: number }, { b: string }>>().toEqualTypeOf<"a" | "b">()
        expectTypeOf<utilities.Properties<{ a: number }, { b: string; c: number }>>().toEqualTypeOf<"a" | "b" | "c">()
        expectTypeOf<utilities.Properties<{ a: number }, { b: string }, true>>().toEqualTypeOf<never>()
    })
})

describe("Merge values", () => {
    test("Merge two object types with priority objects", () => {
        expectTypeOf<utilities.Merge<{ foo: number; bar: number }, { bar: string }>>().toEqualTypeOf<{
            foo: number
            bar: number
        }>()
        expectTypeOf<utilities.Merge<{ foo: number }, { foo: string; bar: string }>>().toEqualTypeOf<{
            foo: number
            bar: string
        }>()
        expectTypeOf<utilities.Merge<{ foo: string; bar: string }, { foo: { bar: boolean } }>>().toEqualTypeOf<{
            foo: { bar: boolean }
            bar: string
        }>()
        expectTypeOf<utilities.Merge<{ foo: string; bar: { foobar: string } }, { foo: { bar: boolean } }>>().toEqualTypeOf<{
            foo: { bar: boolean }
            bar: { foobar: string }
        }>()
        expectTypeOf<utilities.Merge<{ foo: number }, { foo: { bar: { foobar: number } } }>>().toEqualTypeOf<{
            foo: { bar: { foobar: number } }
        }>()
        expectTypeOf<
            utilities.Merge<
                { foo: { bar: { foobar: string; barfoo: boolean } }; bar: number },
                { foo: { bar: { foobar: { foo: string }; foofoo: number }; barbar: boolean }; bar: { foo: string } }
            >
        >().toEqualTypeOf<{
            foo: { bar: { foobar: { foo: string }; barfoo: boolean; foofoo: number }; barbar: boolean }
            bar: { foo: string }
        }>()
    })

    test("Union two object types without priority objects", () => {
        expectTypeOf<utilities.Merge<{ foo: number; bar: number }, { bar: string }, false, false>>().toEqualTypeOf<{
            foo: number
            bar: number
        }>()
        expectTypeOf<utilities.Merge<{ foo: number }, { foo: string; bar: string }, false, false>>().toEqualTypeOf<{
            foo: number
            bar: string
        }>()
        expectTypeOf<utilities.Merge<{ foo: string; bar: string }, { foo: { bar: boolean } }, false, false>>().toEqualTypeOf<{
            foo: string
            bar: string
        }>()
        expectTypeOf<
            utilities.Merge<{ foo: { bar: boolean } }, { foo: string; bar: { foobar: string } }, false, false>
        >().toEqualTypeOf<{
            foo: { bar: boolean }
            bar: { foobar: string }
        }>()
        expectTypeOf<utilities.Merge<{ foo: number }, { foo: { bar: { foobar: number } } }, false, false>>().toEqualTypeOf<{
            foo: number
        }>()
        expectTypeOf<
            utilities.Merge<
                { foo: { bar: { foobar: string; barfoo: boolean } }; bar: number },
                { foo: { bar: { foobar: { foo: string }; foofoo: number }; barbar: boolean }; bar: { foo: string } },
                false,
                false
            >
        >().toEqualTypeOf<{
            foo: { bar: { foobar: string; barfoo: boolean; foofoo: number }; barbar: boolean }
            bar: number
        }>()
    })

    test("Merge two object types with union enabled", () => {
        expectTypeOf<
            utilities.Merge<{ foo: number; bar: number; foobar: string[] }, { bar: string; foobar: number[] }, true>
        >().toEqualTypeOf<{
            foo: number
            bar: number | string
            foobar: string[] | number[]
        }>()
        expectTypeOf<utilities.Merge<{ foo: number }, { foo: string; bar: string }, true>>().toEqualTypeOf<{
            foo: number | string
            bar: string
        }>()
        expectTypeOf<utilities.Merge<{ foo: { bar: boolean } }, { foo: string; bar: string }, true>>().toEqualTypeOf<{
            foo: { bar: boolean } | string
            bar: string
        }>()
        expectTypeOf<utilities.Merge<{ foo: { bar: boolean } }, { foo: string; bar: { foobar: string } }, true>>().toEqualTypeOf<{
            foo: { bar: boolean } | string
            bar: { foobar: string }
        }>()
        expectTypeOf<
            utilities.Merge<
                { foo: { bar: { foobar: { barbar: number }; barfoo: boolean } } },
                { foo: { bar: { foobar: { fofo: string }; foobarfoo: number }; foofoo: boolean }; bar: { foobar: string } },
                true
            >
        >().toEqualTypeOf<{
            foo:
                | { bar: { foobar: { barbar: number }; barfoo: boolean } }
                | { bar: { foobar: { fofo: string }; foobarfoo: number }; foofoo: boolean }
            bar: { foobar: string }
        }>()
    })
})

describe("FlattenProperties", () => {
    test("Extract property from object", () => {
        expectTypeOf<utilities.FlattenProperties<{ name: string; address: { street: string } }, "address">>().toEqualTypeOf<{
            name: string
            street: string
        }>()
        expectTypeOf<
            utilities.FlattenProperties<{ name: string; address: { street: string; avenue: string } }, "address">
        >().toEqualTypeOf<{ name: string; street: string; avenue: string }>()
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

describe("RetrieveKeyValue", () => {
    test("Exist the key within objects", () => {
        expectTypeOf<utilities.RetrieveKeyValue<{ foo: string }, { bar: number }, "foo">>().toEqualTypeOf<string>()
        expectTypeOf<utilities.RetrieveKeyValue<{ foo: string }, { bar: number }, "bar">>().toEqualTypeOf<number>()
        expectTypeOf<utilities.RetrieveKeyValue<{ foo: string }, { foo: number }, "foo">>().toEqualTypeOf<string>()
        expectTypeOf<utilities.RetrieveKeyValue<{ foo: string }, { foo: number }, "foobar">>().toEqualTypeOf<never>()
    })
})

describe("RequiredByKeys", () => {
    test("Convert required properties in an object", () => {
        expectTypeOf<utilities.RequiredByKeys<{ foo?: string; bar?: number }, "foo">>().toEqualTypeOf<{
            foo: string
            bar?: number
        }>()
        expectTypeOf<utilities.RequiredByKeys<{ foo?: string; bar?: number }, "bar">>().toEqualTypeOf<{
            foo?: string
            bar: number
        }>()
        expectTypeOf<utilities.RequiredByKeys<{ foo?: string; bar?: number }>>().toEqualTypeOf<{ foo: string; bar: number }>()
    })
})

describe("Mutable", () => {
    test("Converts properties to non readonly only one level", () => {
        expectTypeOf<utilities.Mutable<{ readonly foo: string }>>().toEqualTypeOf<{
            foo: string
        }>()
        expectTypeOf<
            utilities.Mutable<{
                readonly foo: string
                readonly bar: { readonly foobar: number }
            }>
        >().toEqualTypeOf<{ foo: string; bar: { readonly foobar: number } }>()
    })
})

describe("DeepMutable", () => {
    test("Converts all properties to non readonly of an object type", () => {
        interface Test5 {
            readonly foo: [
                { readonly bar: string },
                {
                    readonly foobar: {
                        readonly foofoo: number
                    }
                },
            ]
        }

        interface Test6 {
            readonly foo: {
                readonly bar: [
                    {
                        readonly foobar: string
                        readonly barfoo: {
                            readonly foofoo: number
                        }
                    },
                ]
            }
        }
        expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<{ foo: string }>>>().toEqualTypeOf<{ foo: string }>()
        expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<{ foo: { bar: number } }>>>().toEqualTypeOf<{
            foo: { bar: number }
        }>()
        expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<{ foo: { bar: { foobar: number } } }>>>().toEqualTypeOf<{
            foo: { bar: { foobar: number } }
        }>()
        expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<{ foo: [{ bar: string; foobar: number }] }>>>().toEqualTypeOf<{
            foo: [{ bar: string; foobar: number }]
        }>()
        expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<Test5>>>().toEqualTypeOf<{
            foo: [
                { bar: string },
                {
                    foobar: {
                        foofoo: number
                    }
                },
            ]
        }>()
        expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<Test6>>>().toEqualTypeOf<{
            foo: {
                bar: [
                    {
                        foobar: string
                        barfoo: {
                            foofoo: number
                        }
                    },
                ]
            }
        }>()
    })
})

describe("MergeAll", () => {
    test("Merge the properties of a tuple of objects", () => {
        expectTypeOf<utilities.MergeAll<[{ foo: string }, { bar: number }]>>().toEqualTypeOf<{ foo: string; bar: number }>()
        expectTypeOf<utilities.MergeAll<[{ foo: string }, { bar: { foobar: number } }]>>().toEqualTypeOf<{
            foo: string
            bar: { foobar: number }
        }>()
        expectTypeOf<
            utilities.MergeAll<[{ foo: string }, { bar: string }, { bar: number; foo: boolean; foobar: string }]>
        >().toEqualTypeOf<{
            foo: string
            bar: string
            foobar: string
        }>()
        expectTypeOf<
            utilities.MergeAll<[{ foo: string }, { bar: string }, { bar: number; foo: { foobar: string }; foobar: string }]>
        >().toEqualTypeOf<{
            foo: { foobar: string }
            bar: string
            foobar: string
        }>()
    })
})

describe("AddPropertyToObject", () => {
    test("Append a new property of an exist object type", () => {
        expectTypeOf<utilities.AddPropertyToObject<{ foo: string }, "bar", number>>().toEqualTypeOf<{
            foo: string
            bar: number
        }>()
        expectTypeOf<utilities.AddPropertyToObject<{ foo: string }, "bar", { foobar: number; barfoo: boolean }>>().toEqualTypeOf<{
            foo: string
            bar: { foobar: number; barfoo: boolean }
        }>()
        expectTypeOf<utilities.AddPropertyToObject<{ foo: string }, "bar", [1, 2, 3]>>().toEqualTypeOf<{
            foo: string
            bar: [1, 2, 3]
        }>()
        expectTypeOf<utilities.AddPropertyToObject<{ foo: string }, "bar", string | boolean | number>>().toEqualTypeOf<{
            foo: string
            bar: string | boolean | number
        }>()
    })
})

describe("Intersection", () => {
    test("Intersection of properties between two objects", () => {
        expectTypeOf<utilities.Intersection<{ foo: string }, { foo: number; bar: boolean }>>().toEqualTypeOf<{ bar: boolean }>()
        expectTypeOf<utilities.Intersection<{ foo: string; bar: boolean }, { bar: number; foo: bigint }>>().toEqualTypeOf<{}>()
        expectTypeOf<
            utilities.Intersection<
                {
                    foo: string
                    bar: { bar: number }
                },
                {
                    foo: bigint
                    barfoo: { bar: number }
                }
            >
        >().toEqualTypeOf<{ bar: { bar: number }; barfoo: { bar: number } }>()
        expectTypeOf<
            utilities.Intersection<
                {
                    foo: bigint
                    barfoo: { bar: number }
                },
                {
                    foo: string
                    bar: { bar: number }
                }
            >
        >().toEqualTypeOf<{ bar: { bar: number }; barfoo: { bar: number } }>()
    })
})

describe("Omit Properties", () => {
    describe("Omit", () => {
        test("Omit the properties based on the key type", () => {
            expectTypeOf<Omit<{ foo: string }, "">>().toEqualTypeOf<{
                foo: string
            }>()
            expectTypeOf<Omit<{ foo: string; bar: number }, "foo">>().toEqualTypeOf<{ bar: number }>()
            expectTypeOf<Omit<{ foo: () => void; bar: { foobar: number } }, "foo">>().toEqualTypeOf<{
                bar: { foobar: number }
            }>()
        })
    })

    describe("OmitByType", () => {
        test("Omit the properties based on the type", () => {
            expectTypeOf<utilities.OmitByType<{ foo: string; bar: string; foobar: number }, string>>().toEqualTypeOf<{
                foobar: number
            }>()
            expectTypeOf<utilities.OmitByType<{ foo: string; bar: number; foobar: boolean }, string | boolean>>().toEqualTypeOf<{
                bar: number
            }>()
            expectTypeOf<
                utilities.OmitByType<
                    {
                        foo: () => void
                        bar: () => void
                        foobar: { barbar: number }
                    },
                    () => void
                >
            >().toEqualTypeOf<{ foobar: { barbar: number } }>()
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
    describe("Pick", () => {
        test("Pick by keys", () => {
            expectTypeOf<Pick<{ foo: string; bar: number }, never>>().toEqualTypeOf<{}>()
            expectTypeOf<Pick<{ foo: string; bar: number }, "bar">>().toEqualTypeOf<{ bar: number }>()
            expectTypeOf<Pick<{ foo: string; bar: number }, "bar" | "foo">>().toEqualTypeOf<{ foo: string; bar: number }>()
        })
    })

    describe("PickByType", () => {
        test("Pick by type", () => {
            expectTypeOf<utilities.PickByType<{ foo: string; bar: number; foofoo: string }, number>>().toEqualTypeOf<{
                bar: number
            }>()
            expectTypeOf<utilities.PickByType<{ foo: string; bar: number; foofoo: string }, string>>().toEqualTypeOf<{
                foo: string
                foofoo: string
            }>()
            expectTypeOf<utilities.PickByType<{ foo: () => {}; bar: number }, string>>().toEqualTypeOf<{}>()
            expectTypeOf<utilities.PickByType<{ foo: () => {}; bar: number; foobar: {} }, never>>().toEqualTypeOf<{}>()
            expectTypeOf<utilities.PickByType<{ foo: () => {}; bar: number; foobar: {} }, () => {}>>().toEqualTypeOf<{
                foo: () => {}
            }>()
        })
    })

    type N = utilities.PickByType<{ foo: () => {}; bar: number; foobar: {} }, () => {}>
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
        expectTypeOf<utilities.DeepOmit<{ foo: string; bar: { foobar: number } }, "foo">>().toEqualTypeOf<{
            bar: { foobar: number }
        }>()
        expectTypeOf<utilities.DeepOmit<{ foo: string; bar: { foobar: number } }, "bar.foobar">>().toEqualTypeOf<{
            foo: string
            bar: {}
        }>()
        expectTypeOf<utilities.DeepOmit<{ foo: string; bar: { foobar: number } }, "foobar">>().toEqualTypeOf<{
            foo: string
            bar: { foobar: number }
        }>()
        expectTypeOf<
            utilities.DeepOmit<{ foo: string; bar: { foobar: number; nested: { baz: string } } }, "bar.nested.baz">
        >().toEqualTypeOf<{
            foo: string
            bar: { foobar: number; nested: {} }
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
        expectTypeOf<utilities.PartialByKeys<{ foo: string; bar: number }, "foo">>().toEqualTypeOf<{
            foo?: string
            bar: number
        }>()
        expectTypeOf<utilities.PartialByKeys<{ foo: string; bar: number }, "bar">>().toEqualTypeOf<{
            foo: string
            bar?: number
        }>()
        expectTypeOf<utilities.PartialByKeys<{ foo: string; bar: number }>>().toEqualTypeOf<{ foo?: string; bar?: number }>()
    })
})
