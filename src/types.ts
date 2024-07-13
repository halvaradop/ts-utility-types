/**
 * Represents a function that can accept any number of arguments of any type.
 * This type is useful for callbacks or event handlers where you don't care
 * about the specific argument types or return value.
 * 
 * @example
 * function getPointsAsync(callback: ArgsFunction) {
 *  // do anything here
 *  callback((x: number, y: number, z: number) => {})
 * }
 */
export type ArgsFunction = (...args: any) => void;

/**
 * Represents the absence of a value, typically `null` or `undefined`.
 * This type is useful for checking for optional values or indicating
 * a lack of data.
 */
export type Nullish = null | undefined;

/**
 * Represents a primitive data type: number, string, boolean, bigint, or symbol.
 * This type is useful for identifying simple, immutable values.
 */
export type Primitive = number | string | boolean | bigint | symbol | Nullish;