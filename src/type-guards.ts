/**
 * Check if the parameter is a never value
 * @example
 * type CheckNever = IsNever<never> // true
 * type CheckStr = IsNever<string> // false
 */
export type IsNever<T> = [T] extends [never] ? true : false;