import type { Even, Odd } from "./types.js"

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
export type IsNever<T> = [T] extends [never] ? true : false

/**
 * Check if the number provided is odd or not
 *
 * @example
 * // Expected: true
 * type CheckOdd = IsOdd<2023>;
 *
 * // Expected: false
 * type CheckEven = IsOdd<2024>;
 */
export type IsOdd<T extends number> = `${T}` extends `${string}${Odd}` ? true : false

/**
 * Check if the number provided is even or not
 *
 * @example
 * // Expected: true
 * type CheckEven = IsEven<2024>;
 *
 * // Expected: false
 * type CheckOdd = IsEven<2023>;
 */
export type IsEven<T extends number> = `${T}` extends `${string}${Even}` ? false : true

/**
 * Check if the number provided is negative or not
 *
 * @example
 * // Expected: true
 * type CheckNegative = IsNegative<-2024>;
 *
 * // Expected: false
 * type CheckPositive = IsNegative<2024>;
 */
export type IsNegative<T extends number> = `${T}` extends `-${number}` ? true : false

/**
 * Check if the number provided is positive or not
 *
 * @example
 * // Expected: true
 * type CheckPositive = IsPositive<2024>;
 *
 * // Expected: false
 * type CheckNegative = IsPositive<-2024>;
 */
export type IsPositive<T extends number> = `${T}` extends `-${number}` ? false : true
