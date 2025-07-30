import type { IsArray, IsFunction, IsNever, IsObject } from "./guards.js"

/**
 * Utility type that transforms an object to have each property on a new line
 * for better readability.
 *
 * It doesn't change the original object type.
 *
 * @param {object} Obj - The object to prettify
 */
export type Prettify<Obj extends object> = {
    [Property in keyof Obj]: Obj[Property]
} & {}

/**
 * Extends the values of the provided `T` type with the provided `U` type.
 * This is useful when you want to create a union type that includes specific
 * literal types along with a broader type.
 *
 * @param {T} T - The specific literal type to extend
 * @param {U} U - The broader type to extend with (defaults to `string`)
 * @example
 * interface Foo {
 *   foo: string
 *   bar: number
 * }
 *
 * // Expected: "foo" | "bar" | string
 * type ExtendedFoo = LiteralUnion<keyof Foo>
 */
export type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>)

/**
 * Conditionally excludes or includes types based on whether `Type` is assignable to `Extends`.
 * If `Reverse` is `true`, it includes types that are assignable to `Extends`, otherwise it excludes them.
 * If `Value` is provided, it returns `Value` instead of `never` when the condition is met.
 *
 * @param {Type} Type - The type to evaluate
 * @param {Extends} Extends - The type to compare against
 * @param {unknown} Value - The value to return if the condition is met (defaults to `never`)
 * @param {boolean} Reverse - If `true`, reverses the condition (defaults to `false`)
 * @example
 * // Expected: number
 * type A = Discard<string | number, string>;
 *
 * // Expected: string | number
 * type B = Discard<string | number, boolean>;
 */
export type Discard<Type, Extends, Value = never, Reverse extends boolean = false> = Reverse extends true
    ? Type extends Extends
        ? Value
        : never
    : Type extends Extends
      ? never
      : IsNever<Value> extends true
        ? Type
        : Value

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
export type WhiteSpaces =
    | " "
    | "\n"
    | "\t"
    | "\r"
    | "\f"
    | "\v"
    | "\u00A0"
    | "\u1680"
    | "\u2000"
    | "\u2001"
    | "\u2002"
    | "\u2003"
    | "\u2004"
    | "\u2005"
    | "\u2006"
    | "\u2007"
    | "\u2008"
    | "\u2009"
    | "\u200A"
    | "\u2028"
    | "\u2029"
    | "\u202F"
    | "\u205F"
    | "\u3000"

/**
 * Represents the empty values
 */
export type Falsy = Nullish | 0 | false | ""

/**
 * Determines the primitive type corresponding to the provided value.
 *
 * @param {unknown} T - The value to get the type of
 * @example
 * // Expected: number
 * type TypeOfValue = ReturnTypeOf<123>
 *
 * // Expected: string
 * type TypeOfValue = ReturnTypeOf<"hello">
 */
export type ReturnTypeOf<T> = T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : IsObject<T> extends true
          ? object
          : IsFunction<T> extends true
            ? Function
            : IsArray<T> extends true
              ? T
              : T
