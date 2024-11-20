import { describe, test, expectTypeOf } from "vitest"
import type * as utilities from "../src/utils"

describe("PercentageParser", () => {
    test("Parses a percentage string into a tuple", () => {
        expectTypeOf<utilities.PercentageParser<"foobar">>().toEqualTypeOf<never>()
        expectTypeOf<utilities.PercentageParser<"2024">>().toEqualTypeOf<["", "2024", ""]>()
        expectTypeOf<utilities.PercentageParser<"-89">>().toEqualTypeOf<["-", "89", ""]>()
        expectTypeOf<utilities.PercentageParser<"+89%">>().toEqualTypeOf<["+", "89", "%"]>()
    })
})

describe("Absolute", () => {
    test("Returns the absolute version of a number", () => {
        expectTypeOf<utilities.Absolute<-100>>().toEqualTypeOf<"100">()
        expectTypeOf<utilities.Absolute<-0>>().toEqualTypeOf<"0">()
        expectTypeOf<utilities.Absolute<-999_999_999_999>>().toEqualTypeOf<"999999999999">()
        expectTypeOf<utilities.Absolute<-999_999_999_999_999n>>().toEqualTypeOf<"999999999999999">()
    })
})

describe("Trunc", () => {
    test("Truncate a number to its integer part", () => {
        expectTypeOf<utilities.Trunc<3.14159>>().toEqualTypeOf<"3">()
        expectTypeOf<utilities.Trunc<-3.14159>>().toEqualTypeOf<"-3">()
        expectTypeOf<utilities.Trunc<42.1>>().toEqualTypeOf<"42">()
        expectTypeOf<utilities.Trunc<0>>().toEqualTypeOf<"0">()
        expectTypeOf<utilities.Trunc<1289n>>().toEqualTypeOf<"1289">()
        expectTypeOf<utilities.Trunc<-0.98>>().toEqualTypeOf<"0">()
        expectTypeOf<utilities.Trunc<-90000.98>>().toEqualTypeOf<"-90000">()
    })
})

describe("NumberRange", () => {
    test("Create a union type with a range of numbers", () => {
        expectTypeOf<utilities.NumberRange<1, 5>>().toEqualTypeOf<1 | 2 | 3 | 4 | 5>()
        expectTypeOf<utilities.NumberRange<9, 14>>().toEqualTypeOf<9 | 10 | 11 | 12 | 13 | 14>()
        expectTypeOf<utilities.NumberRange<-5, 5>>().toEqualTypeOf<never>()
        expectTypeOf<utilities.NumberRange<0, 0>>().toEqualTypeOf<0>()
        expectTypeOf<utilities.NumberRange<-5, -5>>().toEqualTypeOf<never>()
        expectTypeOf<utilities.NumberRange<-5, 0>>().toEqualTypeOf<never>()
    })
})
