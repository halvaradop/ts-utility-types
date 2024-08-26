import { describe, test, expectTypeOf } from "vitest";
import type { IsNever, IsOdd } from "../src/type-guards";

describe("Utility types for type guards", () => {
	describe("IsNever", () => {
		test("should return false for non-never types", () => {
			expectTypeOf<IsNever<string>>().toEqualTypeOf<false>();
			expectTypeOf<IsNever<number>>().toEqualTypeOf<false>();
		});

		test("should return true for never type", () => {
			expectTypeOf<IsNever<never>>().toEqualTypeOf<true>();
		});
	});

	describe("IsOdd", () => {
		test("Check if a number is odd", () => {
			expectTypeOf<IsOdd<0>>().toEqualTypeOf<false>();
			expectTypeOf<IsOdd<2023>>().toEqualTypeOf<true>();
			expectTypeOf<IsOdd<2024>>().toEqualTypeOf<false>();
			expectTypeOf<IsOdd<number>>().toEqualTypeOf<false>();
			expectTypeOf<IsOdd<1234567891>>().toEqualTypeOf<true>();
			expectTypeOf<IsOdd<1234567892>>().toEqualTypeOf<false>();
		});
	});
});
