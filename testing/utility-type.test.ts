import { describe, test, expectTypeOf } from "vitest"
import type { 
    Merge, 
    Properties, 
    ExtractToObject, 
    PublicType,
    HasKeyObjects
} from "../src/utility-types"


describe("Properties with keyof", () => {
    test("Combines keys of two object types", () => {
        expectTypeOf<Properties<{ a: number }, { a: string }>>().toEqualTypeOf<"a">()
        expectTypeOf<Properties<{ a: number }, { b: string }>>().toEqualTypeOf<"a" | "b">()
        expectTypeOf<Properties<{ a: number }, { b: string, c: number }>>().toEqualTypeOf<"a" | "b" | "c">()
    })
})


describe("Merge values",  () => {
    test("Union two object types", () => {
        expectTypeOf<Merge<{ a: number }, { b: string }>>().toEqualTypeOf<{ a: number, b: string }>()
        expectTypeOf<Merge<{ a: number }, { b: string, c: boolean }>>().toEqualTypeOf<{ a: number, b: string, c: boolean }>()
        expectTypeOf<Merge<{ a: number }, { a: string, b: string }>>().toEqualTypeOf<{ a: string, b: string }>()
    })
})


describe("Extract property from object", () => {
    test("Extract the key", () => {
        expectTypeOf<ExtractToObject<{ name: string, address: { street: string } }, "address">>().toEqualTypeOf<{ name: string, street: string }>()
        expectTypeOf<ExtractToObject<{ name: string, address: { street: string, avenue: string } }, "address">>().toEqualTypeOf<{ name: string, street: string, avenue: string }>()
    })
})


describe("PublicType", () => {
    test("Remove properties beginning with (_)", () => {
        expectTypeOf<PublicType<{ foo: string }>>().toEqualTypeOf<{ foo: string }>();
        expectTypeOf<PublicType<{ foo: string, _bar: string }>>().toEqualTypeOf<{ foo: string }>();
        expectTypeOf<PublicType<{ _foo: string, _bar: string }>>().toEqualTypeOf<{}>();
    })
})

describe("HasKeyObjects", () => {
    test("Exist the key within objects", () => {
        expectTypeOf<HasKeyObjects<{ foo: string }, { bar: number }, "foo">>().toEqualTypeOf<string>()
        expectTypeOf<HasKeyObjects<{ foo: string }, { bar: number }, "bar">>().toEqualTypeOf<number>()
        expectTypeOf<HasKeyObjects<{ foo: string }, { foo: number }, "foo">>().toEqualTypeOf<string>()
        expectTypeOf<HasKeyObjects<{ foo: string }, { foo: number }, "foobar">>().toEqualTypeOf<never>()
    })
})