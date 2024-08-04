import { describe, test, expectTypeOf } from "vitest"
import type { 
    Merge, 
    Properties, 
    ExtractToObject, 
    PublicType,
    HasKeyObjects,
    DeepReadonly,
    TupleToUnion,
    RequiredByKeys,
    Filter,
    MergeKeyObjects,
    Mutable,
    DeepMutable,
    MergeAll,
    ToUnion,
    Without
} from "../src/utility-types"


describe("Readonly", () => {
    test("DeepReadonly for objects", () => {
        expectTypeOf<DeepReadonly<{ foo: string, bar: number }>>().toEqualTypeOf<{ readonly foo: string, readonly bar: number }>()
        expectTypeOf<DeepReadonly<{ foo: string, bar: { foo: number } }>>().toEqualTypeOf<{ readonly foo: string, readonly bar: { readonly foo: number } }>()
        expectTypeOf<DeepReadonly<{ foo: { bar: string }, bar: { foo: number } }>>().toEqualTypeOf<{ readonly foo: { readonly bar: string }, readonly bar: { readonly foo: number } }>()
    })
})


describe("TupleToUnion", () => {
    test("Create union type", () => {
        expectTypeOf<TupleToUnion<["foo", "bar"]>>().toEqualTypeOf<"foo" | "bar">()
        expectTypeOf<TupleToUnion<[1, 2]>>().toEqualTypeOf<1 | 2>()
        expectTypeOf<TupleToUnion<["foo", 1, "bar", 2]>>().toEqualTypeOf<"foo" | "bar" | 1 | 2>()
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


describe("RequiredByKeys", () => {
    test("Convert required properties in an object", () => {
        expectTypeOf<RequiredByKeys<{ foo?: string, bar?: number }, "foo">>().toEqualTypeOf<{ foo: string, bar?: number }>()
        expectTypeOf<RequiredByKeys<{ foo?: string, bar?: number }, "bar">>().toEqualTypeOf<{ foo?: string, bar: number }>()
        expectTypeOf<RequiredByKeys<{ foo?: string, bar?: number }>>().toEqualTypeOf<{ foo: string, bar: number }>()
    })
})


describe("Filter", () => {
    test("Filter the elements based in the predicate", () => {
        expectTypeOf<Filter<[0, 1, 2, 3, 4], 0>>().toEqualTypeOf<[0]>()
        expectTypeOf<Filter<[0, 1, 2, 3, 4], 0 | 4>>().toEqualTypeOf<[0, 4]>()
        expectTypeOf<Filter<[0, 0, 1, 1, 1], 1>>().toEqualTypeOf<[1, 1, 1]>()
        expectTypeOf<Filter<["foo", "bar", "foobar"], "bar">>().toEqualTypeOf<["bar"]>()
    })
})


describe("MergeKeyObjects", () => {
    test("Merge the types of the properties of two objects.", () => {
        expectTypeOf<MergeKeyObjects<{ foo: string }, { bar: string }>>().toEqualTypeOf<{ foo: string, bar: string }>()
        expectTypeOf<MergeKeyObjects<{ foo: string }, { foo: number }>>().toEqualTypeOf<{ foo: string | number }>()
        expectTypeOf<MergeKeyObjects<{ foo: string | number }, { foo: boolean }>>().toEqualTypeOf<{ foo: string | number | boolean }>()
    })
})


describe("Mutable", () => {
    test("Converts properties to non readonly only one level", () => {
        expectTypeOf<Mutable<{ readonly foo: string }>>().toEqualTypeOf<{ foo: string }>()
        expectTypeOf<Mutable<{ readonly foo: string, readonly bar: { readonly foobar: number } }>>().toEqualTypeOf<{ foo: string, bar: { readonly foobar: number } }>()
    })
})


describe("DeepMutable", () => {
    test("Converts all properties to non readonly of an object type", () => {
        interface Test5 {
            foo: [
                { bar: string },
                {
                    foobar: {
                        foofoo: number
                    }
                }
            ]
        }

        interface Test6 {
            foo: {
                bar: [
                    {
                        foobar: string,
                        barfoo: {
                            foofoo: number
                        }
                    }
                ]
            }
        }
        expectTypeOf<DeepMutable<DeepReadonly<{ foo: string }>>>().toEqualTypeOf<{ foo: string }>()
        expectTypeOf<DeepMutable<DeepReadonly<{ foo: { bar: number }}>>>().toEqualTypeOf<{ foo: { bar: number }}>()
        expectTypeOf<DeepMutable<DeepReadonly<{ foo: { bar: { foobar: number } } }>>>().toEqualTypeOf<{ foo: { bar: { foobar: number } } }>()
        expectTypeOf<DeepMutable<DeepReadonly<{ foo: [{ bar: string, foobar: number }] }>>>().toEqualTypeOf<{ foo: [{ bar: string, foobar: number }] }>()
        expectTypeOf<DeepMutable<DeepReadonly<Test5>>>().toEqualTypeOf<Test5>()
        expectTypeOf<DeepMutable<DeepReadonly<Test6>>>().toEqualTypeOf<Test6>()
    })
})


describe("MergeAll", () => {
    test("Merge the properties of a tuple of objects", () => {
        expectTypeOf<MergeAll<[{ foo: string }, { bar: number }]>>().toEqualTypeOf<{ foo: string, bar: number }>()
        expectTypeOf<MergeAll<[{ foo: string }, { bar: { foobar: number } }]>>().toEqualTypeOf<{ foo: string, bar: { foobar: number } }>()
        type Expect3 = { 
            foo: string | boolean, 
            bar: number | string, 
            foobar: string
        }
        expectTypeOf<MergeAll<[{ foo: string }, { bar: string }, { bar: number, foo: boolean, foobar: string }]>>().toEqualTypeOf<Expect3>()
    })
})


describe("ToUnion", () => {
    test("Create an union type", () => {
        expectTypeOf<ToUnion<12>>().toEqualTypeOf<12>()
        expectTypeOf<ToUnion<"foo">>().toEqualTypeOf<"foo">()
        expectTypeOf<ToUnion<12 | 21>>().toEqualTypeOf<12 | 21>()
        expectTypeOf<ToUnion<[12, 21, "foo"]>>().toEqualTypeOf<12 | 21 | "foo" | []>()
    })
})


describe("Without", () => {
    test("Removes the elements present in the predicate", () => {
        expectTypeOf<Without<[1, 2, 3, 4, 5], [4, 5]>>().toEqualTypeOf<[1, 2, 3]>
        expectTypeOf<Without<["foo", "bar", "foobar"], "foo">>().toEqualTypeOf<["bar", "foobar"]>
        expectTypeOf<Without<["foo", "bar", "foobar", 1, 2], "foo" | 2>>().toEqualTypeOf<["bar", "foobar", 1]>
        expectTypeOf<Without<[{ foo: string }, { bar: number }, { foobar: boolean }], { bar: number }>>().toEqualTypeOf<[{ foo: string }, { foobar: boolean }]>
        expectTypeOf<Without<["foo", "bar", "foobar", 1, 2, { foo: string }], { foo: string }>>().toEqualTypeOf<["foo", "bar", "foobar", 1, 2]>
    })
})