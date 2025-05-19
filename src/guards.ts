/**
 * Checks if two values are strictly equal, regardless of their distribution within conditional types
 *
 * @param {X} X - The first value to compare
 * @param {Y} Y - The second value to compare
 * @example
 * // Expected: true
 * type CheckTrue = Equals<true, true>;
 *
 * // Expected: false
 * type CheckTrue = Equals<() => {}, true>;
 */
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

/**
 * Ensures that the parameter is true.
 *
 * @param {T} T - The value to expect to be true
 * @example
 * // Expected: true
 * type CheckTrue = Expect<true>;
 *
 * // Expected: false
 * type CheckFalse = Expect<false>;
 */
export type Expect<T extends true> = T

/**
 * Check if the boolean provided is false
 *
 * @param {T} T - The boolean value to negate
 * @example
 * // Expected: false
 * type CheckFalse = Not<true>;
 *
 * // Expected: true
 * type CheckTrue = Not<true>;
 */
export type Not<T extends boolean> = T extends true ? false : true

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
