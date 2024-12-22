import type { Equals, Not } from "./test.js"
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
export type IsEven<T extends number> = `${T}` extends `${string}${Even}` ? true : false

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
export type IsPositive<T extends number> = Not<IsNegative<T>>

/**
 * Check if the type provided is any
 *
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

type Nose = AnyOf<[0, "", false, [], {}, undefined, null]>
