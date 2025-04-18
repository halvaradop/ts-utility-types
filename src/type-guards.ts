import type { Equals, Not } from "./test.js"
import type { Even, Odd } from "./types.js"

/**
 * Check if the parameter is a never value
 *
 * @param T - The type to check
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
 * @param {number} T - The number to check
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
 * @param {number} T - The number to check
 * @example
 * // Expected: true
 * type CheckEven = IsEven<2024>;
 *
 * // Expected: false
 * type CheckOdd = IsEven<2023>;
 */
export type IsEven<T extends number> = `${T}` extends `${string}${Even}` ? true : false

/**
 * Check if the number provided is negative or not
 *
 * @param {number} T - The number to check
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
 * @param {number} T - The number to check
 * @example
 * // Expected: true
 * type CheckPositive = IsPositive<2024>;
 *
 * // Expected: false
 * type CheckNegative = IsPositive<-2024>;
 */
export type IsPositive<T extends number> = Not<IsNegative<T>>

/**
 * Check if the type provided is any
 *
 * @param T - The type to check
 * @example
 * // Expected: true
 * type CheckAny = IsAny<any>;
 *
 * // Expected: false
 * type CheckStr = IsAny<string>;
 */
export type IsAny<T> = Equals<T, any>

/**
 * @internal
 */
type False = "" | false | [] | null | undefined | 0 | { [P: string]: never }

/**
 * Checks if any value in the tuple is true
 *
 * @param {unknown[]} T - The tuple to check
 * @example
 * // Expected: true
 * type Test1 = AnyOf<[0, "", false, [], {}, undefined, null, true]>
 *
 * // Expected: false
 * type Test2 = AnyOf<[0, "", false, [], {}, undefined, null]>
 */
export type AnyOf<T extends readonly any[]> = T extends [infer Item, ...infer Spread]
    ? Item extends False
        ? AnyOf<Spread>
        : true
    : false

/**
 * Checks if all values in the tuple are true
 *
 * @param {unknown[]} T - The tuple to check
 * @example
 * // Expected: true
 * type Test1 = IsArray<[1, 2, 3]>
 *
 * // Expected: false
 * type Test2 = IsArray<{ key: string }>
 */
export type IsArray<T> = T extends unknown[] ? true : false

/**
 * Checks if the type provided is an object
 *
 * @param T - The type to check
 * @example
 * // Expected: true
 * type Test1 = IsObject<{ key: string }>
 *
 * // Expected: false
 * type Test2 = IsObject<[1, 2, 3]>
 */
export type IsObject<T> = T extends object ? (IsArray<T> extends true ? false : IsFunction<T> extends true ? false : true) : false

/**
 * Checks if the type provided is a function
 *
 * @param T - The type to check
 * @example
 * // Expected: true
 * type Test1 = IsFunction<() => void>
 *
 * // Expected: false
 * type Test2 = IsFunction<{ key: string }>
 */
export type IsFunction<T> = T extends Function ? true : false
