import { describe, test, expectTypeOf } from "vitest"
import type { Equals, Expect, Not } from "../src/test"

describe("Utility types for testing", () => {
    test("Check if two values are equal", () => {
        expectTypeOf<Equals<true, true>>().toEqualTypeOf<true>()
        expectTypeOf<Equals<() => {}, true>>().toEqualTypeOf<false>()
    })

    test("Check if a value is true", () => {
        expectTypeOf<Expect<true>>().toEqualTypeOf<true>()
        // @ts-expect-error
        expectTypeOf<Expect<false>>().toEqualTypeOf<false>()
        // @ts-expect-error
        expectTypeOf<Expect<1>>().toEqualTypeOf<1>()
        // @ts-expect-error
        expectTypeOf<Expect<true | false>>().toEqualTypeOf<true | false>()
    })

    test("Swap the booolen value", () => {
        expectTypeOf<Not<true>>().toEqualTypeOf<false>()
        expectTypeOf<Not<false>>().toEqualTypeOf<true>()
        // @ts-expect-error
        expectTypeOf<Not<1>>().toEqualTypeOf<1>()
        expectTypeOf<Not<true | false>>().toEqualTypeOf<true | false>()
    })
})
