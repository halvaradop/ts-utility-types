import { describe, test, expectTypeOf } from "vitest"
import type * as utilities from "../src/arrays"

describe("ArrayToUnion", () => {
    test("Create union type", () => {
        expectTypeOf<utilities.ArrayToUnion<["foo", "bar"]>>().toEqualTypeOf<"foo" | "bar">()
        expectTypeOf<utilities.ArrayToUnion<[1, 2]>>().toEqualTypeOf<1 | 2>()
        expectTypeOf<utilities.ArrayToUnion<["foo", 1, "bar", 2]>>().toEqualTypeOf<"foo" | "bar" | 1 | 2>()
    })
})

describe("Tuple methods", () => {
    describe("Size", () => {
        test("Returns the size of the tuple", () => {
            expectTypeOf<utilities.Size<[]>>().toEqualTypeOf<0>()
            expectTypeOf<utilities.Size<[1, 2, 3]>>().toEqualTypeOf<3>()
            expectTypeOf<utilities.Size<["foo", "bar", "foobar", 1, 2, never, () => void, { foo: string }]>>().toEqualTypeOf<8>()
        })
    })

    describe("Filter", () => {
        test("Filter the elements based in the predicate", () => {
            expectTypeOf<utilities.Filter<[0, 1, 2, 3, 4], 0>>().toEqualTypeOf<[0]>()
            expectTypeOf<utilities.Filter<[0, 1, 2, 3, 4], 0 | 4>>().toEqualTypeOf<[0, 4]>()
            expectTypeOf<utilities.Filter<[0, 0, 1, 1, 1], 1>>().toEqualTypeOf<[1, 1, 1]>()
            expectTypeOf<utilities.Filter<["foo", "bar", "foobar"], "bar">>().toEqualTypeOf<["bar"]>()
            expectTypeOf<utilities.Filter<[1, 2, 3, 4, 5], [4, 5]>>().toEqualTypeOf<[4, 5]>()
        })
    })

    describe("FilterOut", () => {
        test("Removes the elements present in the predicate", () => {
            expectTypeOf<utilities.Filter<[1, 2, 3, 4, 5], [4, 5], false>>().toEqualTypeOf<[1, 2, 3]>()
            expectTypeOf<utilities.Filter<["foo", "bar", "foobar"], "foo", false>>().toEqualTypeOf<["bar", "foobar"]>()
            expectTypeOf<utilities.Filter<["foo", "bar", "foobar", 1, 2], "foo" | 2, false>>().toEqualTypeOf<
                ["bar", "foobar", 1]
            >()
            expectTypeOf<
                utilities.Filter<[{ foo: string }, { bar: number }, { foobar: boolean }], { bar: number }, false>
            >().toEqualTypeOf<[{ foo: string }, { foobar: boolean }]>()
            expectTypeOf<
                utilities.Filter<["foo", "bar", "foobar", 1, 2, { foo: string }], { foo: string }, false>
            >().toEqualTypeOf<["foo", "bar", "foobar", 1, 2]>()
        })
    })

    describe("Reverse", () => {
        test("Reverse the elements of a tuple type", () => {
            expectTypeOf<utilities.Reverse<[1, 2, 3, 4]>>().toEqualTypeOf<[4, 3, 2, 1]>()
            expectTypeOf<utilities.Reverse<["a", "b", "c"]>>().toEqualTypeOf<["c", "b", "a"]>()
            expectTypeOf<utilities.Reverse<[1, "foo", 2, "bar", { foo: number }, () => void]>>().toEqualTypeOf<
                [() => void, { foo: number }, "bar", 2, "foo", 1]
            >()
        })
    })

    describe("IndexOf", () => {
        test("Get first index of an element", () => {
            expectTypeOf<utilities.IndexOf<[0, 0, 0], 2>>().toEqualTypeOf<-1>()
            expectTypeOf<utilities.IndexOf<[string, 1, number, "a"], number>>().toEqualTypeOf<2>()
            expectTypeOf<utilities.IndexOf<[string, 1, number, "a", any], any>>().toEqualTypeOf<4>()
            expectTypeOf<utilities.IndexOf<[string, "a"], "a">>().toEqualTypeOf<1>()
        })

        test("Get last index of an element", () => {
            expectTypeOf<utilities.LastIndexOf<[1, 2, 3, 2, 1], 2>>().toEqualTypeOf<3>()
            expectTypeOf<utilities.LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>>().toEqualTypeOf<7>()
            expectTypeOf<utilities.LastIndexOf<[string, 2, number, "a", number, 1], number>>().toEqualTypeOf<4>()
            expectTypeOf<utilities.LastIndexOf<[string, any, 1, number, "a", any, 1], any>>().toEqualTypeOf<5>()
        })
    })

    describe("CompareArrayLength", () => {
        test("Compare the length of two arrays", () => {
            expectTypeOf<utilities.CompareArrayLength<[1, 2, 3], [1, 2, 3]>>().toEqualTypeOf<0>()
            expectTypeOf<utilities.CompareArrayLength<[1, 2, 3], [1, 2]>>().toEqualTypeOf<1>()
            expectTypeOf<utilities.CompareArrayLength<[1, 2], [1, 2, 3]>>().toEqualTypeOf<-1>()
        })
    })

    describe("Unique", () => {
        test("Get the unique elements of a tuple", () => {
            expectTypeOf<utilities.Uniques<[1, 1, 2, 2, 3, 3]>>().toEqualTypeOf<[1, 2, 3]>()
            expectTypeOf<utilities.Uniques<[1, 2, 3, 4, 5]>>().toEqualTypeOf<[1, 2, 3, 4, 5]>()
            expectTypeOf<utilities.Uniques<[string, number, 1, "a", 1, string, 2, "b", 2, number]>>().toEqualTypeOf<
                [string, number, 1, "a", 2, "b"]
            >()
        })
    })
})

describe("ConstructTuple", () => {
    test("Create a tuple with a defined size", () => {
        expectTypeOf<utilities.ConstructTuple<2>>().toEqualTypeOf<[unknown, unknown]>()
        expectTypeOf<utilities.ConstructTuple<2, string>>().toEqualTypeOf<[string, string]>()
        expectTypeOf<utilities.ConstructTuple<5, any>>().toEqualTypeOf<[any, any, any, any, any]>()
    })
})

describe("HasDuplicates", () => {
    test("Check if there are duplicated elements", () => {
        expectTypeOf<utilities.HasDuplicates<[]>>().toEqualTypeOf<false>()
        expectTypeOf<utilities.HasDuplicates<[1, 2, 1]>>().toEqualTypeOf<true>()
        expectTypeOf<utilities.HasDuplicates<["foo", "bar", 1, 5]>>().toEqualTypeOf<false>()
        expectTypeOf<utilities.HasDuplicates<[() => void, () => void]>>().toEqualTypeOf<true>()
        expectTypeOf<utilities.HasDuplicates<[{ foo: string }, { foo: string }]>>().toEqualTypeOf<true>()
    })
})

describe("AllEquals", () => {
    test("Check if all elements are equal", () => {
        expectTypeOf<utilities.AllEquals<[0, 0, 0, 0], 1>>().toEqualTypeOf<false>()
        expectTypeOf<utilities.AllEquals<[0, 0, 0, 0], 0>>().toEqualTypeOf<true>()
        expectTypeOf<utilities.AllEquals<[0, 0, 1, 0], 1>>().toEqualTypeOf<false>()
        expectTypeOf<utilities.AllEquals<[number, number, number, number], number>>().toEqualTypeOf<true>()
        expectTypeOf<utilities.AllEquals<[[1], [1], [1]], [1]>>().toEqualTypeOf<true>()
        expectTypeOf<utilities.AllEquals<[{}, {}, {}], {}>>().toEqualTypeOf<true>()
        expectTypeOf<utilities.AllEquals<[1, 1, 2], 1 | 2>>().toEqualTypeOf<false>()
    })
})

describe("Chunk", () => {
    test("Split an array into chunks", () => {
        expectTypeOf<utilities.Chunk<[1, 2, 3, 4, 5], 1>>().toEqualTypeOf<[[1], [2], [3], [4], [5]]>()
        expectTypeOf<utilities.Chunk<[1, 2, 3, 4, 5], 2>>().toEqualTypeOf<[[1, 2], [3, 4], [5]]>()
        expectTypeOf<utilities.Chunk<[1, 2, 3, 4, 5], 3>>().toEqualTypeOf<[[1, 2, 3], [4, 5]]>()
        expectTypeOf<utilities.Chunk<[1, 2, 3, 4, 5], 4>>().toEqualTypeOf<[[1, 2, 3, 4], [5]]>()
        expectTypeOf<utilities.Chunk<[1, 2, 3, 4, 5], 5>>().toEqualTypeOf<[[1, 2, 3, 4, 5]]>()
        expectTypeOf<utilities.Chunk<[1, 2, 3, 4, 5], 6>>().toEqualTypeOf<[[1, 2, 3, 4, 5]]>()
        expectTypeOf<utilities.Chunk<[1, 2, 3, 4, 5], -2>>().toEqualTypeOf<[[1, 2, 3, 4, 5]]>()
    })
})

describe("Zip", () => {
    test("Zip two arrays into a tuple", () => {
        expectTypeOf<utilities.Zip<[], []>>().toEqualTypeOf<[]>()
        expectTypeOf<utilities.Zip<[1, 2, 3], ["foo"]>>().toEqualTypeOf<[[1, "foo"]]>()
        expectTypeOf<utilities.Zip<[1, "bar", 3], ["foo", 2]>>().toEqualTypeOf<[[1, "foo"], ["bar", 2]]>()
        expectTypeOf<utilities.Zip<[{ foo: string }, { bar: string }], ["foo", "bar"]>>().toEqualTypeOf<
            [[{ foo: string }, "foo"], [{ bar: string }, "bar"]]
        >()
    })
})

describe("Flatten", () => {
    test("Flatten an array type", () => {
        expectTypeOf<utilities.Flatten<number[]>>().toEqualTypeOf<number>()
        expectTypeOf<utilities.Flatten<number[][]>>().toEqualTypeOf<number>()
        expectTypeOf<utilities.Flatten<number[][][]>>().toEqualTypeOf<number>()
        expectTypeOf<utilities.Flatten<string[][][][]>>().toEqualTypeOf<string>()
        expectTypeOf<utilities.Flatten<unknown[][][][]>>().toEqualTypeOf<unknown>()
    })
})

describe("ToUnion", () => {
    test("Create an union type", () => {
        expectTypeOf<utilities.ToUnion<12>>().toEqualTypeOf<12>()
        expectTypeOf<utilities.ToUnion<"foo">>().toEqualTypeOf<"foo">()
        expectTypeOf<utilities.ToUnion<12 | 21>>().toEqualTypeOf<12 | 21>()
        expectTypeOf<utilities.ToUnion<[12, 21, "foo"]>>().toEqualTypeOf<12 | 21 | "foo" | []>()
    })
})

describe("Includes", () => {
    test("Check if an element exist withins a tuple", () => {
        expectTypeOf<utilities.Includes<[], any>>().toEqualTypeOf<false>()
        expectTypeOf<utilities.Includes<[1, 2, "foo", "bar"], 2>>().toEqualTypeOf<true>()
        expectTypeOf<utilities.Includes<["foo", "bar", () => void, {}], () => void>>().toEqualTypeOf<true>()
        expectTypeOf<utilities.Includes<[string, 1, () => void, {}], string>>().toEqualTypeOf<true>()
        expectTypeOf<utilities.Includes<[string, number, () => void, {}], number>>().toEqualTypeOf<true>()
        expectTypeOf<utilities.Includes<[true, false, true], number>>().toEqualTypeOf<false>()
    })
})

describe("Take", () => {
    test("Take the first n elements of a tuple", () => {
        expectTypeOf<utilities.Take<0, [1, 2, 3, 4, 5]>>().toEqualTypeOf<[]>()
        expectTypeOf<utilities.Take<1, [1, 2, 3, 4, 5]>>().toEqualTypeOf<[1]>()
        expectTypeOf<utilities.Take<2, [1, 2, 3, 4, 5]>>().toEqualTypeOf<[1, 2]>()
        expectTypeOf<utilities.Take<3, [1, 2, 3, 4, 5]>>().toEqualTypeOf<[1, 2, 3]>()
        expectTypeOf<utilities.Take<4, [1, 2, 3, 4, 5]>>().toEqualTypeOf<[1, 2, 3, 4]>()
        expectTypeOf<utilities.Take<5, [1, 2, 3, 4, 5]>>().toEqualTypeOf<[1, 2, 3, 4, 5]>()
        expectTypeOf<utilities.Take<5, [1, 2]>>().toEqualTypeOf<[1, 2]>()
        expectTypeOf<utilities.Take<-1, [1, 2, 3, 4, 5]>>().toEqualTypeOf<[5]>()
        expectTypeOf<utilities.Take<-2, [1, 2, 3, 4, 5]>>().toEqualTypeOf<[4, 5]>()
        expectTypeOf<utilities.Take<-3, [1, 2, 3, 4, 5]>>().toEqualTypeOf<[3, 4, 5]>()
        expectTypeOf<utilities.Take<-4, [1, 2, 3, 4, 5]>>().toEqualTypeOf<[2, 3, 4, 5]>()
    })
})

describe("FilterNonNullish", () => {
    test("Filter out nullish values", () => {
        expectTypeOf<utilities.FilterNonNullish<[1, 2, null, undefined, 3]>>().toEqualTypeOf<[1, 2, 3]>()
        expectTypeOf<utilities.FilterNonNullish<[null, undefined]>>().toEqualTypeOf<[]>()
        expectTypeOf<utilities.FilterNonNullish<[1, 2, 3]>>().toEqualTypeOf<[1, 2, 3]>()
        expectTypeOf<utilities.FilterNonNullish<[null, undefined, "foo", "bar"]>>().toEqualTypeOf<["foo", "bar"]>()
        expectTypeOf<utilities.FilterNonNullish<[null, undefined, 1, 2, 3]>>().toEqualTypeOf<[1, 2, 3]>()
        expectTypeOf<utilities.FilterNonNullish<[null, undefined, {}, []]>>().toEqualTypeOf<[{}, []]>()
        expectTypeOf<utilities.FilterNonNullish<[null, undefined, { foo: string }, { bar: number }]>>().toEqualTypeOf<
            [{ foo: string }, { bar: number }]
        >()
        expectTypeOf<utilities.FilterNonNullish<[null, undefined, () => void, () => void]>>().toEqualTypeOf<
            [() => void, () => void]
        >()
        expectTypeOf<
            utilities.FilterNonNullish<
                [null, undefined, { foo: string; bar: undefined }, { bar: null; foo: { foobar: undefined } }]
            >
        >().toEqualTypeOf<[{ foo: string }, { foo: {} }]>()
        expectTypeOf<
            utilities.FilterNonNullish<
                [{ foo: string; bar: [null, undefined, { foobar: [null, undefined, { barbar: [null, undefined] }] }] }]
            >
        >().toEqualTypeOf<[{ foo: string; bar: [{ foobar: [{ barbar: [] }] }] }]>()
    })
})
