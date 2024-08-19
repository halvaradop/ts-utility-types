/**
 * Checks if two values are strictly equal, regardless of their distribution within conditional types
 */
export type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
        ? true
        : false

/**
 * Ensures that the parameter is true.
 */
export type Expect<T extends true> = T
