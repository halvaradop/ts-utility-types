import { describe, test, expectTypeOf } from "vitest"
import type { IsOdd, IsEven, IsPositive, IsNegative, Absolute, NumberRange, Trunc } from "../src/numbers"

describe("IsOdd", () => {
    test("Check if a number is odd", () => {
        expectTypeOf<IsOdd<0>>().toEqualTypeOf<false>()
        expectTypeOf<IsOdd<2023>>().toEqualTypeOf<true>()
        expectTypeOf<IsOdd<2024>>().toEqualTypeOf<false>()
        expectTypeOf<IsOdd<number>>().toEqualTypeOf<false>()
        expectTypeOf<IsOdd<1234567891>>().toEqualTypeOf<true>()
        expectTypeOf<IsOdd<1234567892>>().toEqualTypeOf<false>()
    })
})

describe("IsEven", () => {
    test("Check if a number is even", () => {
        expectTypeOf<IsEven<0>>().toEqualTypeOf<true>()
        expectTypeOf<IsEven<2024>>().toEqualTypeOf<true>()
        expectTypeOf<IsEven<2023>>().toEqualTypeOf<false>()
        expectTypeOf<IsEven<number>>().toEqualTypeOf<false>()
        expectTypeOf<IsEven<1234567891>>().toEqualTypeOf<false>()
        expectTypeOf<IsEven<1234567892>>().toEqualTypeOf<true>()
    })
})

describe("IsPositive", () => {
    test("Check if a number is positive", () => {
        expectTypeOf<IsPositive<0>>().toEqualTypeOf<true>()
        expectTypeOf<IsPositive<-2024>>().toEqualTypeOf<false>()
        expectTypeOf<IsPositive<2024>>().toEqualTypeOf<true>()
        expectTypeOf<IsPositive<-0>>().toEqualTypeOf<true>()
        expectTypeOf<IsPositive<number>>().toEqualTypeOf<true>()
    })
})

describe("IsNegative", () => {
    test("Check if a number is negative", () => {
        expectTypeOf<IsNegative<0>>().toEqualTypeOf<false>()
        expectTypeOf<IsNegative<-2024>>().toEqualTypeOf<true>()
        expectTypeOf<IsNegative<2024>>().toEqualTypeOf<false>()
        expectTypeOf<IsNegative<-0>>().toEqualTypeOf<false>()
        expectTypeOf<IsNegative<number>>().toEqualTypeOf<false>()
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

describe("Trunc", () => {
    test("Truncate a number to its integer part", () => {
        expectTypeOf<Trunc<3.14159>>().toEqualTypeOf<"3">()
        expectTypeOf<Trunc<-3.14159>>().toEqualTypeOf<"-3">()
        expectTypeOf<Trunc<42.1>>().toEqualTypeOf<"42">()
        expectTypeOf<Trunc<0>>().toEqualTypeOf<"0">()
        expectTypeOf<Trunc<1289n>>().toEqualTypeOf<"1289">()
        expectTypeOf<Trunc<-0.98>>().toEqualTypeOf<"0">()
        expectTypeOf<Trunc<-90000.98>>().toEqualTypeOf<"-90000">()
    })
})

describe("NumberRange", () => {
    test("Create a union type with a range of numbers", () => {
        expectTypeOf<NumberRange<1, 5>>().toEqualTypeOf<1 | 2 | 3 | 4 | 5>()
        expectTypeOf<NumberRange<9, 14>>().toEqualTypeOf<9 | 10 | 11 | 12 | 13 | 14>()
        expectTypeOf<NumberRange<-5, 5>>().toEqualTypeOf<never>()
        expectTypeOf<NumberRange<0, 0>>().toEqualTypeOf<0>()
        expectTypeOf<NumberRange<-5, -5>>().toEqualTypeOf<never>()
        expectTypeOf<NumberRange<-5, 0>>().toEqualTypeOf<never>()
    })
})
