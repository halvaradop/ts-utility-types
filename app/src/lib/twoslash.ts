// Type definitions for Twoslash examples
// This file provides type definitions for all utility types in the documentation

// Array utilities
export type ArrayToUnion<Array extends readonly unknown[]> = Array[number]
export type Size<Array extends unknown[]> = Array["length"]
export type Filter<Array extends unknown[], Predicate, Includes extends boolean = true> = any[]
export type Reverse<Array extends unknown[]> = Array
export type IndexOf<Array extends unknown[], Match> = number
export type LastIndexOf<Array extends unknown[], Match> = number
export type ConstructTuple<Length extends number, Value = unknown> = unknown[]
export type HasDuplicates<Array extends unknown[]> = boolean
export type AllEquals<Array extends unknown[], Comparator> = boolean
export type Chunk<Array extends unknown[], Length extends number> = Array
export type Zip<Array1 extends unknown[], Array2 extends unknown[]> = [Array1[0], Array2[0]][]
export type Flatten<Array> = Array extends (infer U)[] ? U : Array
export type CompareArrayLength<T extends any[], U extends any[]> = 1 | -1 | 0
export type Uniques<Array extends unknown[]> = Array
export type ToUnion<T> = T extends readonly unknown[] ? T[number] : T
export type ReturnTypeOf<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : unknown
export type Take<N extends number, Array extends unknown[]> = Array
export type FilterNonNullish<Array extends unknown[]> = Array

// Object utilities
export type Properties<Obj1, Obj2, Common = false> = keyof Obj1 | keyof Obj2
export type Intersection<Obj1, Obj2> = Obj2
export type PickByType<Obj, Type> = Pick<Obj, { [K in keyof Obj]: Obj[K] extends Type ? K : never }[keyof Obj]>
export type PartialByKeys<Obj, Keys = keyof Obj> = Obj
export type OmitByType<Obj, Type> = Omit<Obj, { [K in keyof Obj]: Obj[K] extends Type ? K : never }[keyof Obj]>
export type FlattenProperties<Obj, Keys> = Obj
export type ExcludePrivateKeys<Obj> = Obj
export type RequiredByKeys<Obj, Keys = keyof Obj> = Obj
export type Mutable<Obj> = { -readonly [K in keyof Obj]: Obj[K] }
export type AppendKeyValue<Obj, Property extends string, Value> = Obj & Record<Property, Value>
export type ObjectEntries<Obj> = { [K in keyof Obj]: [K, Obj[K]] }[keyof Obj]
export type ReplaceKeys<Obj, Keys, Replace> = Obj
export type MapTypes<Obj, Mapper> = Obj
export type ToPrimitive<Obj> = Obj
export type Get<Obj1, Obj2, Key> = Key extends keyof Obj1 ? Obj1[Key] : Key extends keyof Obj2 ? Obj2[Key] : never
export type GetRequired<Obj> = Pick<Obj, { [K in keyof Obj]: Obj[K] extends Required<Obj>[K] ? K : never }[keyof Obj]>
export type GetOptional<Obj> = Pick<Obj, { [K in keyof Obj]: Obj[K] extends Required<Obj>[K] ? never : K }[keyof Obj]>

// String utilities
export type TrimLeft<Str extends string> = Str extends ` ${infer Rest}` ? TrimLeft<Rest> : Str
export type TrimRight<Str extends string> = Str extends `${infer Rest} ` ? TrimRight<Rest> : Str
export type Trim<Str extends string> = TrimLeft<TrimRight<Str>>
export type Capitalize<Str extends string> = Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Lowercase<Rest>}`
    : Str
export type Join<Array extends readonly unknown[], Separator extends string> = string
export type StartsWith<Str extends string, Match extends string> = Str extends `${Match}${string}` ? true : false
export type DropChar<Str extends string, Match extends string> = string
export type EndsWith<Str extends string, Match extends string> = Str extends `${string}${Match}` ? true : false
export type LengthOfString<Str extends string> = number
export type IndexOfString<Str extends string, Match extends string> = number

// Number utilities
export type IsOdd<T extends number> = boolean
export type IsEven<T extends number> = boolean
export type IsNegative<T extends number> = boolean
export type IsPositive<T extends number> = boolean
export type Absolute<Expression extends number | string | bigint> = string
export type Trunc<Math extends string | number | bigint> = number
export type NumberRange<Low extends number, High extends number> = number

// Deep utilities
export type DeepMerge<Obj1, Obj2, ByUnion = false, PriorityObject = true> = Obj1 & Obj2
export type DeepUnion<Obj1, Obj2> = Obj1 | Obj2
export type DeepMergeAll<Array, ByUnion = false, PriorityObject = true> = any
export type DeepMutable<Obj> = { -readonly [K in keyof Obj]: DeepMutable<Obj[K]> }
export type DeepReadonly<Obj> = { readonly [K in keyof Obj]: DeepReadonly<Obj[K]> }
export type DeepKeys<Obj, Depth = 6> = string
export type DeepOmit<Obj, Path> = Obj
export type DeepGet<Obj, Path> = any
export type DeepTruncate<Obj, Depth> = Obj
export type DeepPartial<Obj> = { [K in keyof Obj]?: DeepPartial<Obj[K]> }
export type DeepRequired<Obj> = { [K in keyof Obj]-?: DeepRequired<Obj[K]> }
export type DeepPick<Obj, Path> = any
export type DeepNullable<Obj> = { [K in keyof Obj]: DeepNullable<Obj[K]> | null }
export type DeepNonNullable<Obj> = { [K in keyof Obj]: DeepNonNullable<NonNullable<Obj[K]>> }
export type DeepFilter<Obj, Predicate> = Obj
export type DeepReplace<Obj, From, To> = Obj
export type DeepSet<Obj, Path, Value> = Obj

// Type guards
export type Equals<X, Y> = X extends Y ? (Y extends X ? true : false) : false
export type Expect<T extends true> = T
export type Not<T extends boolean> = T extends true ? false : true
export type IsNever<T> = [T] extends [never] ? true : false
export type IsAny<T> = 0 extends 1 & T ? true : false
export type AnyOf<T extends readonly any[]> = boolean
export type IsArray<T> = T extends readonly any[] ? true : false
export type IsObject<T> = T extends object ? (T extends any[] ? false : T extends Function ? false : true) : false
export type IsFunction<T> = T extends Function ? true : false

// Utils
export type Prettify<Obj extends object> = { [K in keyof Obj]: Obj[K] } & {}
export type LiteralUnion<T extends U, U = string> = T | (U & {})
export type Discard<Type, Extends, Value = never, Reverse = false> = Type
export type ArgsFunction = (...args: any[]) => any
export type Nullish = null | undefined
export type PrimitiveNullish = string | number | boolean | bigint | symbol | null | undefined
export type Primitive = string | number | boolean | bigint | symbol
export type WhiteSpaces = " " | "\t" | "\n" | "\r"
export type Falsy = null | undefined | false | 0 | ""

// Common interfaces for examples
export interface User {
    name: string
    age: number
    email?: string
}

export interface Config {
    api: { timeout: number }
    features: { darkMode: boolean }
}

export interface UserConfig {
    api: { retries: number }
    features: { analytics: boolean }
}

export interface ApiResponse {
    user: {
        profile: { name: string; email: string }
        settings: { theme: string; notifications: boolean }
    }
}
