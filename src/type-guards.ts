import type { Odd } from "./types";

/**
 * Check if the parameter is a never value
 *
 * @example
 * // Expected: true
 * type CheckNever = IsNever<never>;
 *
 * // Expected: false
 * type CheckStr = IsNever<string>;
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * Check if the number provided is odd or not
 *
 * @example
 * // Expected: true
 * type CheckOdd = IsOdd<2023>
 *
 * // Expected: false
 * type CheckEven = IsOdd<2024>
 */
export type IsOdd<T extends number> = `${T}` extends `${string}${Odd}` ? true : false;
