import { describe, test, expectTypeOf } from "vitest"
import type {
    IsNegative,
    IsNever,
    IsOdd,
    IsPositive,
    IsAny,
    IsEven,
    AnyOf,
    IsArray,
    IsFunction,
    IsObject,
} from "../src/type-guards"

describe("Utility types for type guards", () => {
    describe("IsNever", () => {
        test("should return false for non-never types", () => {
            expectTypeOf<IsNever<string>>().toEqualTypeOf<false>()
            expectTypeOf<IsNever<number>>().toEqualTypeOf<false>()
        })

        test("should return true for never type", () => {
            expectTypeOf<IsNever<never>>().toEqualTypeOf<true>()
        })
    })

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

    describe("IsNegative", () => {
        test("Check if a number is negative", () => {
            expectTypeOf<IsNegative<0>>().toEqualTypeOf<false>()
            expectTypeOf<IsNegative<-2024>>().toEqualTypeOf<true>()
            expectTypeOf<IsNegative<2024>>().toEqualTypeOf<false>()
            expectTypeOf<IsNegative<-0>>().toEqualTypeOf<false>()
            expectTypeOf<IsNegative<number>>().toEqualTypeOf<false>()
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

    describe("IsAny", () => {
        test("Check if a type is any", () => {
            expectTypeOf<IsAny<any>>().toEqualTypeOf<true>()
            expectTypeOf<IsAny<unknown>>().toEqualTypeOf<false>()
            expectTypeOf<IsAny<never>>().toEqualTypeOf<false>()
            expectTypeOf<IsAny<undefined>>().toEqualTypeOf<false>()
            expectTypeOf<IsAny<null>>().toEqualTypeOf<false>()
            expectTypeOf<IsAny<string>>().toEqualTypeOf<false>()
            expectTypeOf<IsAny<number>>().toEqualTypeOf<false>()
            expectTypeOf<IsAny<boolean>>().toEqualTypeOf<false>()
            expectTypeOf<IsAny<bigint>>().toEqualTypeOf<false>()
            expectTypeOf<IsAny<symbol>>().toEqualTypeOf<false>()
            expectTypeOf<IsAny<Function>>().toEqualTypeOf<false>()
        })
    })

    describe("AnyOf", () => {
        test("Check if a type is true of the provided types", () => {
            expectTypeOf<AnyOf<[true, false]>>().toEqualTypeOf<true>()
            expectTypeOf<AnyOf<[true, true]>>().toEqualTypeOf<true>()
            expectTypeOf<AnyOf<[false, false]>>().toEqualTypeOf<false>()
            expectTypeOf<AnyOf<[false, true]>>().toEqualTypeOf<true>()
            expectTypeOf<AnyOf<[false, false, false, false, false, false, true]>>().toEqualTypeOf<true>()
            expectTypeOf<AnyOf<[false, false, false, false, false, false, false]>>().toEqualTypeOf<false>()
            expectTypeOf<AnyOf<[0, "", false, [], {}, undefined, null]>>().toEqualTypeOf<false>()
            expectTypeOf<AnyOf<[0, "", false, [], {}, undefined, null, true]>>().toEqualTypeOf<true>()
        })
    })

    test("IsArray", () => {
        expectTypeOf<IsArray<string>>().toEqualTypeOf<false>()
        expectTypeOf<IsArray<number>>().toEqualTypeOf<false>()
        expectTypeOf<IsArray<boolean>>().toEqualTypeOf<false>()
        expectTypeOf<IsArray<bigint>>().toEqualTypeOf<false>()
        expectTypeOf<IsArray<symbol>>().toEqualTypeOf<false>()
        expectTypeOf<IsArray<{ foo: "bar" }>>().toEqualTypeOf<false>()
        expectTypeOf<IsArray<Function>>().toEqualTypeOf<false>()
        expectTypeOf<IsArray<() => void>>().toEqualTypeOf<false>()
        expectTypeOf<IsArray<unknown[]>>().toEqualTypeOf<true>()
        expectTypeOf<IsArray<[]>>().toEqualTypeOf<true>()
    })

    test("IsFunction", () => {
        expectTypeOf<IsFunction<string>>().toEqualTypeOf<false>()
        expectTypeOf<IsFunction<number>>().toEqualTypeOf<false>()
        expectTypeOf<IsFunction<boolean>>().toEqualTypeOf<false>()
        expectTypeOf<IsFunction<bigint>>().toEqualTypeOf<false>()
        expectTypeOf<IsFunction<symbol>>().toEqualTypeOf<false>()
        expectTypeOf<IsFunction<unknown[]>>().toEqualTypeOf<false>()
        expectTypeOf<IsFunction<{ foo: "bar" }>>().toEqualTypeOf<false>()
        expectTypeOf<IsFunction<[]>>().toEqualTypeOf<false>()
        expectTypeOf<IsFunction<[string]>>().toEqualTypeOf<false>()
        expectTypeOf<IsFunction<[number]>>().toEqualTypeOf<false>()
        expectTypeOf<IsFunction<Function>>().toEqualTypeOf<true>()
        expectTypeOf<IsFunction<() => void>>().toEqualTypeOf<true>()
        expectTypeOf<IsFunction<() => void>>().toEqualTypeOf<true>()
    })

    test("IsObject", () => {
        expectTypeOf<IsObject<string>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<number>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<boolean>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<bigint>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<symbol>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<unknown[]>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<Function>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<() => void>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<[]>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<[string]>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<[number]>>().toEqualTypeOf<false>()
        expectTypeOf<IsObject<{ foo: "bar" }>>().toEqualTypeOf<true>()
    })
})
