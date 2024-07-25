import type { Nullish, Primitive, PrimitiveNullish } from "./types";

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
export const isPrimitiveNullish = (value: any): value is PrimitiveNullish => isNullish(value) || isPrimitive(value);

/**
 * Checks if a value is nullish (null or undefined).
 * @param value The value to check
 * @returns `true` if the value is nullish, `false` otherwise
 */
export const isNullish = (value: any): value is Nullish => value === null || value === undefined

/**
 * Checks if a value is a boolean type
 * @param value The value to check
 * @returns {boolean} `true` if the value is a boolean, `false` otherwise
 */
export const isBoolean = (value: any): value is boolean => typeof value === "boolean";

/**
 * Checks if a value is a string type
 * @param value The value to check
 * @returns {boolean} `true` if the value is a string, `false` otherwise
 */
export const isString = (value: any): value is string => typeof value === "string";

/**
 *Checks if a value is a number type
 * @param value The value to check
 * @returns {boolean} `true` if the value is a number, `false` otherwise.
 * (Note: `NaN` is also considered a number)
 */
export const isNumber = (value: any): value is number => typeof value === "number";

/**
 * Checks if a value is a plain object type (not null, array, or function)
 * @param value The value to check
 * @returns {boolean} `true` if the value is a plain object, `false` otherwise
 */
export const isObject = (value: any): value is object => !isNullish(value) && typeof value === "object" && !isArray(value);

/**
 * Check if the value is an array value
 * @param value The value to check
 * @returns {boolean} true if the value passed is an rray
 */
export const isArray = (value: any): value is any[] => Array.isArray(value);