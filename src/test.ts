/**
 * Checks if two values are strictly equal, regardless of their distribution within conditional types
 *
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
 * @example
 * // Expected: false
 * type CheckFalse = Not<true>;
 *
 * // Expected: true
 * type CheckTrue = Not<true>;
 */
export type Not<T extends boolean> = T extends true ? false : true
