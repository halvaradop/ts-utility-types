import { Primitive, PrimitiveNullish } from "./types";

/**
 * Define the types of primitive values in JavaScript and TypeScript.
 */
const primitives = ["number", "string", "boolean", "bigint", "symbol"];

/**
 * Checks if a value is a primitive data type (number, string, boolean, bigint, or symbol)
 * 
 * @param value The value to check
 * @returns {boolean} `true` if the value is a primitive type, `false` otherwise
 */
export const isPrimitive = (value: any): value is Primitive => {
    return primitives.some(primitive => typeof value === primitive)
};

/**
 * Checks if a value is a primitive data type (including null and undefined).
 * 
 * @param value The value to check
 * @returns {boolean} `true` if the value is a primitive type with nullish values, `false` otherwise
 */
export const isPrimitiveNullish = (value: any): value is PrimitiveNullish => {
    if(value === null || value === undefined) return true
    return isPrimitive(value)
};