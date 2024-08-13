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
    Without,
    AppendToObject,    
    Reverse,
    IndexOf,
    LastIndexOf,
    Intersection,
    Pop,
    Last,
    Size,
    PercentageParser,
    Omit,
    OmitByType,
    Parameters,
    Includes,
    ConstructTuple,
    CheckRepeatedTuple,
    Absolute,
    ObjectEntries,
    AllEquals,
    Pick,
    PickByType
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


describe("AppendToObject", () => {
    test("Append a new property of an exist object type", () => {
        expectTypeOf<AppendToObject<{ foo: string }, "bar", number>>().toEqualTypeOf<{ foo: string, bar: number }>()
        expectTypeOf<AppendToObject<{ foo: string }, "bar", { foobar: number, barfoo: boolean }>>().toEqualTypeOf<{ foo: string, bar: { foobar: number, barfoo: boolean } }>()
        expectTypeOf<AppendToObject<{ foo: string }, "bar", [1, 2, 3]>>().toEqualTypeOf<{ foo: string, bar: [1, 2, 3] }>()
        expectTypeOf<AppendToObject<{ foo: string }, "bar", string | boolean | number>>().toEqualTypeOf<{ foo: string, bar: string | boolean | number }>()
    })
})


describe("Difference", () => {
    test("Difference of properties between two objects", () => {
        expectTypeOf<Intersection<{ foo: string }, { foo: number, bar: boolean }>>().toEqualTypeOf<{ bar: boolean }>()
        expectTypeOf<Intersection<{ foo: string, bar: boolean }, { bar: number, foo: bigint }>>().toEqualTypeOf<{}>()
        expectTypeOf<Intersection<{ foo: string, bar: { bar: number } }, { barfoo: { bar: number }, foo: bigint }>>().toEqualTypeOf<{ bar: { bar: number }, barfoo: { bar: number } }>()
    })
})


describe("Tuple methods", () => {
    describe("Last", () => {    
        test("Retrieve the last element of a tuple", () => {
            expectTypeOf<Last<[]>>().toEqualTypeOf<never>()
            expectTypeOf<Last<[1, 2, 3]>>().toEqualTypeOf<3>()
            expectTypeOf<Last<["foo", "bar", "foobar"]>>().toEqualTypeOf<"foobar">()
        })
    })


    describe("Pop", () => {
        test("Remove the last element of a tuple", () => {
            expectTypeOf<Pop<[]>>().toEqualTypeOf<[]>()
            expectTypeOf<Pop<[1, 2, 3]>>().toEqualTypeOf<[1, 2]>()
            expectTypeOf<Pop<["foo", "bar", "foobar"]>>().toEqualTypeOf<["foo", "bar"]>()
        })
    })


    describe("Size", () => {
        test("Returns the size of the tuple", () => {
            expectTypeOf<Size<[]>>().toEqualTypeOf<0>()
            expectTypeOf<Size<[1, 2, 3]>>().toEqualTypeOf<3>()
            expectTypeOf<Size<["foo", "bar", "foobar", 1 , 2, never, () => void, { foo: string }]>>().toEqualTypeOf<8>()
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


    describe("Without", () => {
        test("Removes the elements present in the predicate", () => {
            expectTypeOf<Without<[1, 2, 3, 4, 5], [4, 5]>>().toEqualTypeOf<[1, 2, 3]>
            expectTypeOf<Without<["foo", "bar", "foobar"], "foo">>().toEqualTypeOf<["bar", "foobar"]>
            expectTypeOf<Without<["foo", "bar", "foobar", 1, 2], "foo" | 2>>().toEqualTypeOf<["bar", "foobar", 1]>
            expectTypeOf<Without<[{ foo: string }, { bar: number }, { foobar: boolean }], { bar: number }>>().toEqualTypeOf<[{ foo: string }, { foobar: boolean }]>
            expectTypeOf<Without<["foo", "bar", "foobar", 1, 2, { foo: string }], { foo: string }>>().toEqualTypeOf<["foo", "bar", "foobar", 1, 2]>
        })
    })


    describe("Reverse", () => {
        test("Reverse the elements of a tuple type", () => {
            expectTypeOf<Reverse<[1, 2, 3, 4]>>().toEqualTypeOf<[4, 3, 2, 1]>()
            expectTypeOf<Reverse<["a", "b", "c"]>>().toEqualTypeOf<["c", "b", "a"]>()
            expectTypeOf<Reverse<[1, "foo", 2, "bar", { foo: number }, () => void]>>().toEqualTypeOf<[() => void, { foo: number }, "bar", 2, "foo", 1]>()
        })
    })
    
    
    describe("IndexOf", () => {
        test("Get first index of an element", () => {
            expectTypeOf<IndexOf<[0, 0, 0], 2>>().toEqualTypeOf<-1>()
            expectTypeOf<IndexOf<[string, 1, number, "a"], number>>().toEqualTypeOf<2>()
            expectTypeOf<IndexOf<[string, 1, number, "a", any], any>>().toEqualTypeOf<4>()
            expectTypeOf<IndexOf<[string, "a"], "a">>().toEqualTypeOf<1>()
        })    
    
        test("Get last index of an element", () => {
            expectTypeOf<LastIndexOf<[1, 2, 3, 2, 1], 2>>().toEqualTypeOf<3>()
            expectTypeOf<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>>().toEqualTypeOf<7>()
            expectTypeOf<LastIndexOf<[string, 2, number, 'a', number, 1], number>>().toEqualTypeOf<4>()
            expectTypeOf<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>>().toEqualTypeOf<5>()
        })
    })
})


describe("PercentageParser", () => {
    test("Parses a percentage string into a tuple", () => {
        expectTypeOf<PercentageParser<"foobar">>().toEqualTypeOf<never>()
        expectTypeOf<PercentageParser<"2024">>().toEqualTypeOf<["", "2024", ""]>()
        expectTypeOf<PercentageParser<"-89">>().toEqualTypeOf<["-", "89", ""]>()
        expectTypeOf<PercentageParser<"+89%">>().toEqualTypeOf<["+", "89", "%"]>()
    })
})


describe("Omit Properties", () => {
    describe("Omit", () => {
        test("Omit the properties based on the key type", () => {
            // @ts-expect-error
            expectTypeOf<Omit<{ foo: string }, "">>().toEqualTypeOf<{ foo: string }>()
            expectTypeOf<Omit<{ foo: string, bar: number }, "foo">>().toEqualTypeOf<{ bar: number }>()
            expectTypeOf<Omit<{ foo: () => void, bar: { foobar: number } }, "foo">>().toEqualTypeOf<{ bar: { foobar: number } }>()
        })    
    })

    describe("OmitByType", () => {
        test("Omit the properties based on the type", () => {
            expectTypeOf<OmitByType<{ foo: string, bar: string, foobar: number }, string>>().toEqualTypeOf<{ foobar: number }>()
            expectTypeOf<OmitByType<{ foo: string, bar: number, foobar: boolean }, string | boolean>>().toEqualTypeOf<{ bar: number }>()
            expectTypeOf<OmitByType<{ foo: () => void, bar: () => void, foobar: { barbar: number } }, () => void>>().toEqualTypeOf<{ foobar: { barbar: number } }>()
        })
    })
})


describe("Parameters", () => {
    test("Returns the parameters of a function", () => {
        expectTypeOf<Parameters<() => void>>().toEqualTypeOf<[]>()
        expectTypeOf<Parameters<(foo: string) => void>>().toEqualTypeOf<[string]>()
        expectTypeOf<Parameters<(foo: string, bar: number) => void>>().toEqualTypeOf<[string, number]>()
        expectTypeOf<Parameters<(foo: { bar: number }) => void>>().toEqualTypeOf<[{ bar: number }]>()    
    })
})


describe("Includes", () => {
    test("Check if an element exist withins a tuple", () => {
        expectTypeOf<Includes<[], any>>().toEqualTypeOf<false>()
        expectTypeOf<Includes<[1, 2, "foo", "bar"], 2>>().toEqualTypeOf<true>()
        expectTypeOf<Includes<["foo", "bar", () => void, {}], () => void>>().toEqualTypeOf<true>()
        expectTypeOf<Includes<[string, 1, () => void, {}], string>>().toEqualTypeOf<true>()
        expectTypeOf<Includes<[string, number, () => void, {}], number>>().toEqualTypeOf<true>()
        expectTypeOf<Includes<[true, false, true], number>>().toEqualTypeOf<false>()
    })
})


describe("ConstructTuple", () => {
    test("Create a tuple with a defined size", () => {
        expectTypeOf<ConstructTuple<2>>().toEqualTypeOf<[unknown, unknown]>()
        expectTypeOf<ConstructTuple<2, string>>().toEqualTypeOf<[string, string]>()
        expectTypeOf<ConstructTuple<5, any>>().toEqualTypeOf<[any, any, any, any, any]>()        
    })
})


describe("CheckRepeatedTuple", () => {
    test("Check if there are duplicated elements", () => {
        expectTypeOf<CheckRepeatedTuple<[]>>().toEqualTypeOf<false>()
        expectTypeOf<CheckRepeatedTuple<[1, 2, 1]>>().toEqualTypeOf<true>()
        expectTypeOf<CheckRepeatedTuple<["foo", "bar", 1, 5]>>().toEqualTypeOf<false>()
        expectTypeOf<CheckRepeatedTuple<[() => void, () => void]>>().toEqualTypeOf<true>()
        expectTypeOf<CheckRepeatedTuple<[{ foo: string }, { foo: string }]>>().toEqualTypeOf<true>()
    })
})


describe("Absolute", () => {
    test("Returns the absolute version of a number", () => {
        expectTypeOf<Absolute<-100>>().toEqualTypeOf<"100">()
        expectTypeOf<Absolute<-0>>().toEqualTypeOf<"0">()
        expectTypeOf<Absolute<-999_999_999_999>>().toEqualTypeOf<"999999999999">()
        expectTypeOf<Absolute<-999_999_999_999_999n>>().toEqualTypeOf<"999999999999999">()
    })
})


describe("ObjectEntries", () => {
    test("Returns the entries from an object", () => {
        expectTypeOf<ObjectEntries<{ foo: string }>>().toEqualTypeOf<["foo", string]>()
        expectTypeOf<ObjectEntries<{ foo?: string }>>().toEqualTypeOf<["foo", string]>()
        expectTypeOf<ObjectEntries<{ foo?: string, bar?: number }>>().toEqualTypeOf<["foo", string] | [ "bar", number]>()
        expectTypeOf<ObjectEntries<{ foo?: undefined, bar: undefined | string }>>().toEqualTypeOf<["foo", undefined] | ["bar", undefined | string]>()
    })
})


describe("AllEquals", () => {
    test("Check if all elements are equal", () => {
        expectTypeOf<AllEquals<[0, 0, 0, 0], 1>>().toEqualTypeOf<false>()
        expectTypeOf<AllEquals<[0, 0, 0, 0], 0>>().toEqualTypeOf<true>()
        expectTypeOf<AllEquals<[0, 0, 1, 0], 1>>().toEqualTypeOf<false>()
        expectTypeOf<AllEquals<[number, number, number, number], number>>().toEqualTypeOf<true>()
        expectTypeOf<AllEquals<[[1], [1], [1]], [1]>>().toEqualTypeOf<true>()
        expectTypeOf<AllEquals<[{}, {}, {}], {}>>().toEqualTypeOf<true>()
        expectTypeOf<AllEquals<[1, 1, 2], 1 | 2>>().toEqualTypeOf<false>()
    })
})


describe("Pick Utilities", () => {
    describe("Pick", () => {
        test("Pick by keys", () => {
            expectTypeOf<Pick<{ foo: string, bar: number }, never>>().toEqualTypeOf<{}>()
            expectTypeOf<Pick<{ foo: string, bar: number }, "bar">>().toEqualTypeOf<{ bar: number }>()
            expectTypeOf<Pick<{ foo: string, bar: number }, "bar" | "foo">>().toEqualTypeOf<{ foo: string, bar: number }>()
        })
    })

    describe("PickByType", () => {
        test("Pick by type", () => {
            expectTypeOf<PickByType<{ foo: string, bar: number, foofoo: string }, number>>().toEqualTypeOf<{ bar: number }>()
            expectTypeOf<PickByType<{ foo: string, bar: number, foofoo: string }, string>>().toEqualTypeOf<{ foo: string, foofoo: string }>()
            expectTypeOf<PickByType<{ foo: () => {}, bar: number }, string>>().toEqualTypeOf<{}>()
            expectTypeOf<PickByType<{ foo: () => {}, bar: number, foobar: {} }, never>>().toEqualTypeOf<{}>()
            expectTypeOf<PickByType<{ foo: () => {}, bar: number, foobar: {} }, () => {}>>().toEqualTypeOf<{ foo: () => {}}>()
        })
    })
})