/**
 * Represents a function that can accept any number of arguments of any type.
 * This type is useful for callbacks or event handlers where you don't care
 * about the specific argument types or return value.
 *
 * @example
 * function getPointsAsync(callback: ArgsFunction) {
 *   // do anything here
 *   callback((x: number, y: number, z: number) => {})
 * }
 */
export type ArgsFunction = (...args: any) => void

/**
 * Represents the absence of a value, typically `null` or `undefined`.
 * This type is useful for checking for optional values or indicating
 * a lack of data.
 */
export type Nullish = null | undefined

/**
 * Represents a primitive data type that can also be null or undefined.
 * This type is useful for situations where nullish values are allowed.
 */
export type PrimitiveNullish = number | string | boolean | bigint | symbol | Nullish

/**
 * Represents a primitive data type: number, string, boolean, bigint, or symbol.
 * This type is useful for identifying simple, immutable values.
 *
 * @remarks This type excludes nullish values (null and undefined).
 */
export type Primitive = Omit<PrimitiveNullish, "null" | "undefined">

/**
 * Represents a whitespace character: space, newline, tab, carriage return, form feed,
 * line separator, or paragraph separator.
 */
export type WhiteSpaces = " " | "\n" | "\t" | "\r" | "\f" | "\u2028" | "\u2029"

/**
 * Represents the empty values
 */
export type Falsy = Nullish | 0 | false | ""

/**
 * The odd digits
 */
export type Odd = 1 | 3 | 5 | 7 | 9

/**
 * The even digits
 */
export type Even = 0 | 2 | 4 | 6 | 8
