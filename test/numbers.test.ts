import { describe, test, expectTypeOf } from "vitest"
import type { IsOdd, IsEven, IsPositive, IsNegative } from "../src/numbers"

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
