import { describe, test, expectTypeOf } from "vitest"
import type { 
    Capitalize, 
    Uppercase, 
    Lowercase, 
    TrimLeft, 
    TrimRight, 
    Trim, 
    Merge, 
    Properties, 
    ExtractToObject, 
    PublicType,
    HasKeyObjects
} from "../src/utility-types"


describe("String mappers", () => {
    test("TrimLeft", () => {
        expectTypeOf<TrimLeft<"  foo">>().toMatchTypeOf<"foo">()
        expectTypeOf<TrimLeft<"   foo bar">>().toMatchTypeOf<"foo bar">()
        expectTypeOf<TrimLeft<"\r\r\r\nfoo bar">>().toMatchTypeOf<"foo bar">()
    })

    test("TrimRight", () => {
        expectTypeOf<TrimRight<"foo  ">>().toMatchTypeOf<"foo">()
        expectTypeOf<TrimRight<"foo bar  ">>().toMatchTypeOf<"foo bar">()
        expectTypeOf<TrimRight<"foo bar  \n\n">>().toMatchTypeOf<"foo bar">()
    })

    test("Trim", () => {
        expectTypeOf<Trim<"  foo">>().toMatchTypeOf<"foo">()
        expectTypeOf<Trim<"foo  ">>().toMatchTypeOf<"foo">()
        expectTypeOf<Trim<"  foo  ">>().toMatchTypeOf<"foo">()
        expectTypeOf<Trim<"\r\n foo \r\n">>().toMatchTypeOf<"foo">()
    })


    test("Uppercase", () => {
        expectTypeOf<Uppercase<"foo">>().toMatchTypeOf<"FOO">()
        expectTypeOf<Uppercase<"Foo">>().toMatchTypeOf<"FOO">()
        expectTypeOf<Uppercase<"Foo bar">>().toMatchTypeOf<"FOO BAR">()
        expectTypeOf<Uppercase<"Foo Bar">>().toMatchTypeOf<"FOO BAR">()
    })

    test("Lowercase", () => {
        expectTypeOf<Lowercase<"foo">>().toMatchTypeOf<"foo">()
        expectTypeOf<Lowercase<"Foo">>().toMatchTypeOf<"foo">()
        expectTypeOf<Lowercase<"Foo bar">>().toMatchTypeOf<"foo bar">()
        expectTypeOf<Lowercase<"Foo Bar">>().toMatchTypeOf<"foo bar">()
    })

    test("Capitalize the strings", () => {
        expectTypeOf<Capitalize<"foo">>().toMatchTypeOf<"Foo">()
        expectTypeOf<Capitalize<"foo bar">>().toMatchTypeOf<"Foo Bar">()
        expectTypeOf<Capitalize<"Foo">>().toMatchTypeOf<"Foo">()
        expectTypeOf<Capitalize<"Foo bar">>().toMatchTypeOf<"Foo Bar">()
        expectTypeOf<Capitalize<"Foo Bar">>().toMatchTypeOf<"Foo Bar">()
    })
})


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