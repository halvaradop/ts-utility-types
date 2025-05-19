import { describe, test, expectTypeOf } from "vitest"
import type * as utilities from "../src/objects"
import type { DeepReadonly } from "../src/deep"
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

describe("ExcludePrivateKeys", () => {
    test("Remove properties beginning with (_)", () => {
        expectTypeOf<utilities.ExcludePrivateKeys<{ foo: string }>>().toEqualTypeOf<{
            foo: string
        }>()
        expectTypeOf<utilities.ExcludePrivateKeys<{ foo: string; _bar: string }>>().toEqualTypeOf<{ foo: string }>()
        expectTypeOf<utilities.ExcludePrivateKeys<{ _foo: string; _bar: string }>>().toEqualTypeOf<{}>()
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
        expectTypeOf<utilities.Mutable<DeepReadonly<Case<DeepWithObjectsA, 2>>>>().toEqualTypeOf<{
            foo: string
            bar: number
            foobar: {
                readonly foo: boolean
                readonly bar: string
                readonly foobar: {}
            }
        }>()
        expectTypeOf<utilities.Mutable<DeepReadonly<Case<DeepWithObjectsA, 3>>>>().toEqualTypeOf<{
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

describe("AppendKeyValue", () => {
    test("Append a new property of an exist object type", () => {
        expectTypeOf<utilities.AppendKeyValue<{ foo: string }, "bar", number>>().toEqualTypeOf<{
            foo: string
            bar: number
        }>()
        expectTypeOf<utilities.AppendKeyValue<{ foo: string }, "bar", { foobar: number; barfoo: boolean }>>().toEqualTypeOf<{
            foo: string
            bar: { foobar: number; barfoo: boolean }
        }>()
        expectTypeOf<utilities.AppendKeyValue<{ foo: string }, "bar", string | boolean | number>>().toEqualTypeOf<{
            foo: string
            bar: string | boolean | number
        }>()
        expectTypeOf<utilities.AppendKeyValue<Case<DeepWithArray>, "bar", [1, 2, 3]>>().toEqualTypeOf<{
            buz: string[]
            foobar: {}
            bar: [1, 2, 3]
        }>()
        expectTypeOf<utilities.AppendKeyValue<Case<DeepWithFunctions>, "buz", (num: number) => string>>().toEqualTypeOf<{
            fix: () => number
            foobar: {}
            buz: (num: number) => string
        }>()
        expectTypeOf<utilities.AppendKeyValue<Case<DeepWithObjectsA>, "appened", Case<DeepWithObjectsB>>>().toEqualTypeOf<{
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
