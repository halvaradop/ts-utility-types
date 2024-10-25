import { describe, test, expect } from "vitest";
import {
	isPrimitive,
	isPrimitiveNullish,
	isBoolean,
	isNumber,
	isString,
	isObject,
	isArray,
	isFunction,
} from "./../src/validate-types";

describe("Primitive Validation", () => {
    describe("isPrimitive", () => {
        test("should return true for primitive values", ({}) => {
            expect(isPrimitive(1)).toBeTruthy();
            expect(isPrimitive("str")).toBeTruthy();
            expect(isPrimitive(true)).toBeTruthy();
            expect(isPrimitive(BigInt(12))).toBeTruthy();
            expect(isPrimitive(Symbol("sym"))).toBeTruthy();
        });

        test("should return false for primitive values", () => {
            expect(isPrimitive(null)).toBeFalsy();
            expect(isPrimitive(undefined)).toBeFalsy();
            expect(isPrimitive({})).toBeFalsy();
            expect(isPrimitive(() => {})).toBeFalsy();
        });
    });

    describe("isPrimitiveNullish", () => {
        test("should return true for primitive values including null and undefined", () => {
            expect(isPrimitiveNullish(1)).toBeTruthy();
            expect(isPrimitiveNullish("str")).toBeTruthy();
            expect(isPrimitiveNullish(true)).toBeTruthy();
            expect(isPrimitiveNullish(BigInt(12))).toBeTruthy();
            expect(isPrimitiveNullish(Symbol("symbol"))).toBeTruthy();
            expect(isPrimitiveNullish(null)).toBeTruthy();
            expect(isPrimitiveNullish(undefined)).toBeTruthy();
        });
        test("should return false for non-primitive values", () => {
            expect(isPrimitive({})).toBeFalsy();
            expect(isPrimitive(() => {})).toBeFalsy();
        });
    });
});

describe("Types validation", () => {
    describe("isNumber", () => {
        test("should return true for numbers", () => {
            expect(isNumber(1)).toBeTruthy();
        });

        test("should return false for non-numbers", () => {
            expect(isNumber(false)).toBeFalsy();
            expect(isNumber("str")).toBeFalsy();
            expect(isNumber(null)).toBeFalsy();
            expect(isNumber(undefined)).toBeFalsy();
            expect(isNumber({})).toBeFalsy();
        });
    });

    describe("isBoolean", () => {
        test("should return true for booleans", () => {
            expect(isBoolean(false)).toBeTruthy();
        });

        test("should return false for non-booleans", () => {
            expect(isBoolean(1)).toBeFalsy();
            expect(isBoolean("str")).toBeFalsy();
            expect(isBoolean(null)).toBeFalsy();
            expect(isBoolean(undefined)).toBeFalsy();
            expect(isBoolean({})).toBeFalsy();
        });
    });

    describe("isString", () => {
        test("should return true for strings", () => {
            expect(isString("str")).toBeTruthy();
        });

        test("should return false for non-strings", () => {
            expect(isString(1)).toBeFalsy();
            expect(isString(false)).toBeFalsy();
            expect(isString(null)).toBeFalsy();
            expect(isString(undefined)).toBeFalsy();
            expect(isString({})).toBeFalsy();
        });
    });

    describe("isObject", () => {
        test("should return true for objects", () => {
            expect(isObject({})).toBeTruthy();
        });

		test("should return false for non-objects", () => {
			expect(isObject(1)).toBeFalsy();
			expect(isObject(false)).toBeFalsy();
			expect(isObject("str")).toBeFalsy();
			expect(isObject(null)).toBeFalsy();
			expect(isObject(undefined)).toBeFalsy();
			expect(isObject(() => {})).toBeFalsy();
		});
	});

    describe("isArray", () => {
        test("should return true for arrays", () => {
            expect(isArray([])).toBeTruthy();
            expect(isArray([1, 2, 3])).toBeTruthy();
			expect(isArray(new Array(3))).toBeTruthy();
        });

		test("should return false for non-arrays", () => {
			expect(isArray(1)).toBeFalsy();
			expect(isArray(false)).toBeFalsy();
			expect(isArray("str")).toBeFalsy();
			expect(isArray(null)).toBeFalsy();
			expect(isArray(undefined)).toBeFalsy();
		});
	});

	describe("isFunction", () => {
		test("should return true for functions", () => {
			expect(isFunction(() => {})).toBeTruthy();
		});

		test("should return false for non-functions", () => {
			expect(isFunction(1)).toBeFalsy();
			expect(isFunction(false)).toBeFalsy();
			expect(isFunction("str")).toBeFalsy();
			expect(isFunction(null)).toBeFalsy();
			expect(isFunction(undefined)).toBeFalsy();
		});
	});
});
