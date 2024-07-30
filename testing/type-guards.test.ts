import { describe, test, expectTypeOf } from "vitest"
import type { IsNever } from "../src/type-guards"

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
})