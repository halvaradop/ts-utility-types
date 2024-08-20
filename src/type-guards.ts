import type { Odd } from "./types";

/**
 * Check if the parameter is a never value
 * @example
 * type CheckNever = IsNever<never> // true
 * type CheckStr = IsNever<string> // false
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * Check if the number provided is odd or not
 *
 * @example
 * type CheckOdd = IsOdd<2023> // true
 * type CheckEven = IsOdd<2024> // false
 */
export type IsOdd<T extends number> = `${T}` extends `${string}${Odd}` ? true : false;
