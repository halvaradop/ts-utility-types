import { describe, test, expect } from "vitest"
import { isPrimitive, isPrimitiveNullish } from './../src/validate-types';


describe("Primitive Validation", () => {

    describe("isPrimitive", () => {
        test("should return true for primitive values", () => {
            expect(isPrimitive(1)).toBeTruthy()
            expect(isPrimitive("str")).toBeTruthy()
            expect(isPrimitive(true)).toBeTruthy()
            expect(isPrimitive(BigInt(12))).toBeTruthy()
            expect(isPrimitive(Symbol("sym"))).toBeTruthy()
        })

        test("should return false for primitive values", () => {
            expect(isPrimitive(null)).toBeFalsy()
            expect(isPrimitive(undefined)).toBeFalsy()
            expect(isPrimitive({})).toBeFalsy()
            expect(isPrimitive(() => {})).toBeFalsy()
        })
    })

    describe("isPrimitiveNullish", () => {
        test("should return true for primitive values including null and undefined", () => {
            expect(isPrimitiveNullish(1)).toBeTruthy()
            expect(isPrimitiveNullish("str")).toBeTruthy()
            expect(isPrimitiveNullish(true)).toBeTruthy()
            expect(isPrimitiveNullish(BigInt(12))).toBeTruthy()
            expect(isPrimitiveNullish(Symbol("symbol"))).toBeTruthy()
            expect(isPrimitiveNullish(null)).toBeTruthy()
            expect(isPrimitiveNullish(undefined)).toBeTruthy()
        })
    })
    test("should return false for non-primitive values", () => {
        expect(isPrimitive({})).toBeFalsy()
        expect(isPrimitive(() => {})).toBeFalsy()
    })
})