import type { Equals } from "./test.js"
import type { IsObject } from "./guards.js"
import type { Prettify, LiteralUnion, Discard, ReturnTypeOf } from "./utils.js"
import type { DeepMerge as Merge, DeepMergeAll as MergeAll } from "./deep.js"

/**
 * Re-exports the `Merge` and `MergeAll` types from the `deep` module to avoid
 * mismatching with the previous version of the library.
 */
export type { Merge, MergeAll }

/**
 * Creates a union of the keys of two objects
 *
 * @param {object} Obj1 - The first object to get the keys from
 * @param {object} Obj2 - The second object to get the keys from
 * @param {Common} Common - If `true`, returns the common keys between the two objects
 * @example
 * interface Foo {
 *   foo: string,
 * };
 *
 * interface Bar {
 *   bar: number
 * };
 *
 * // Expected: "foo" | "bar"
 * type PropsFooBar = Properties<Foo, Bar>;
 */
export type Properties<Obj1 extends object, Obj2 extends object, Common extends boolean = false> = Common extends true
    ? keyof Obj1 & keyof Obj2
    : keyof Obj1 | keyof Obj2

/**
 * Create a new object based in the difference keys between the objects.
 *
 * @param {object} Obj1 - The first object to compare
 * @param {object} Obj2 - The second object to compare
 * @example
 * interface Foo {
 *   name: string
 *   age: string
 * };
 *
 * interface Bar {
 *   name: string
 *   age: string
 *   gender: number
 * };
 *
 * // Expected: { gender: number }
 * type DiffFoo = Intersection<Foo, Bar>;
 */
export type Intersection<Obj1 extends object, Obj2 extends object> = Prettify<Omit<Obj1, keyof Obj2> & Omit<Obj2, keyof Obj1>>

/**
 * Create a new object based in the keys that are assignable of type `Type`
 *
 * @param {object} Obj - The object to pick the keys from
 * @param {Type} Type - The type to compare against
 * @example
 * interface User {
 *   name: string,
 *   lastname: string,
 *   age: number
 * };
 *
 * // Expected: { name: string, lastname: string }
 * type UserStr = PickByType<User, string>;
 */
export type PickByType<Obj extends object, Type> = {
    [Property in keyof Obj as Discard<Obj[Property], Type, Property, true>]: Obj[Property]
}

/**
 * Converts the specified `Keys` of an object type into optional ones, By default it makes
 * all properties optional.
 *
 * @param {object} Obj - The object to convert
 * @param {string} Keys - The keys to make optional
 * @example
 * interface User {
 *   name: string,
 *   lastname: string,
 *   age: number
 * };
 *
 * // Expected: { name?: string, lastname: string, age: number }
 * type UserPartialName = PartialByKeys<User, "name">;
 */
export type PartialByKeys<Obj extends object, Keys extends keyof Obj = keyof Obj> = Prettify<
    Partial<Pick<Obj, Keys>> & Omit<Obj, Keys>
>

/**
 * Create a new object based in the keys that are not assignable of type `Type`
 *
 * @param {object} Obj - The object to pick the keys from
 * @param {Type} Type - The type to compare against
 * @example
 * interface User {
 *   name: string,
 *   lastname: string,
 *   age: number
 * };
 *
 * // Expected: { age: number }
 * type UserExcludeStrings = OmitByType<User, string>;
 */
export type OmitByType<Obj extends object, Type> = {
    [Property in keyof Obj as Obj[Property] extends Type ? never : Property]: Obj[Property]
}

/**
 * @unstable
 * The type is unstable and may be removed in the future.
 * The behavior of this type is not the expected one.
 *
 * Extracts the value of a key from an object and returns a new object with that value,
 * while keeping the other values unchanged.
 *
 * @param {object} Obj - The object to extract the value from
 * @param {string} Key - The key to extract the value from
 * @example
 * interface User {
 *   name: string,
 *   lastname: string,
 *   address: {
 *     street: string,
 *     avenue: string
 *   }
 * }
 *
 * // Expected: { name: string, lastname: string, street: string, avenue: string }
 * type UserAddress = ExtractValue<User, "address">;
 *
 * TODO: Implement a version that allows extracting nested values
 */
export type FlattenProperties<Obj extends object, Keys extends keyof Obj> = Prettify<
    {
        [Property in keyof Obj as Discard<Property, Keys>]: Obj[Property]
    } & Obj[Keys]
>

/**
 * Removes the properties whose keys start with an underscore (_).
 *
 * @param {object} Obj - The object to remove the properties from
 * @example
 * interface User {
 *   name: string,
 *   _lastname: string,
 *   _age: number
 * }
 *
 * // Expected: { name: string }
 * type PublicUser = ExcludePrivateKeys<User>;
 */
export type ExcludePrivateKeys<Obj extends object> = Omit<Obj, `_${string}`>

/**
 * Convert to required the keys speficied in the type `Keys`, and the others fields mantein
 * their definition. When `Keys` is not provided, it should make all properties required. By default
 * it makes all properties required.
 *
 * @param {object} Obj - The object to convert
 * @param {string} Keys - The keys to make required
 * @example
 * interface User {
 *   name?: string,
 *   age?: number,
 *   address?: string
 * };
 *
 * // Expected: { name: string, age?: number, address?: string }
 * type UserRequiredName = RequiredByKeys<User, "name">;
 */
export type RequiredByKeys<Obj extends object, Keys extends keyof Obj = keyof Obj> = Prettify<
    Required<Pick<Obj, Keys>> & Omit<Obj, Keys>
>

/**
 * Converts top-level readonly properties of an object to mutable properties.
 *
 * **Important:** Only affects top-level properties, not nested properties.
 *
 * @param {object} Obj - The object to convert
 * @example
 * interface User {
 *   readonly name: string;
 *   readonly lastname: string;
 *   readonly age: number;
 * };
 *
 * // Expected: { name: string, lastname: string, age: number }
 * type NonReadonlyUser = Mutable<User>;
 */
export type Mutable<Obj extends object> = {
    -readonly [Property in keyof Obj]: Obj[Property]
}

/**
 * Create a new object type appending a new property with its value
 *
 * @param {object} Obj - The object to append the property
 * @param {string} Property - The new property to append
 * @param {TypeValue} value - The type of the new property
 * @example
 * interface User {
 *   name: string
 * };
 *
 * // Expected: { name: string, lastname: string }
 * type UserAppendLastname = AppendKeyValue<User, "lastname", string>;
 */
export type AppendKeyValue<Obj extends object, Property extends string, value> = Prettify<Obj & { [Prop in Property]: value }>

/**
 * Returns a union type of the entries of the provided object
 *
 * @param {object} Obj - The object to get the entries from
 * @example
 * interface Foo {
 *   foo: string,
 *   bar: number,
 *   foobar?: boolean
 * };
 *
 * // Expected: ["foo", string] | ["bar", number] | ["foobar", boolean]
 * type FooEntries = ObjectEntries<Foo>;
 */
export type ObjectEntries<Obj extends object, RequiredObj extends object = Required<Obj>> = {
    [Property in keyof RequiredObj]: [Property, RequiredObj[Property] extends undefined ? undefined : RequiredObj[Property]]
}[keyof RequiredObj]

/**
 * Replaces the types of the keys in an object with new types defined in the `Replace` object.
 * If a key in `Keys` is not found in `Replace`, it defaults to the `Default` type.
 *
 * @param {object} Obj - The object to replace the keys
 * @param {string} Keys - The keys to replace
 * @param {object} Replace - The new types to replace the keys
 * @param {unknown} Default - The default type if the key is not found in `Replace`
 * @example
 * interface Foo {
 *     foo: string,
 *     bar: number,
 *     foobar: boolean
 * };
 *
 * //Expected: { foo: number, bar: number, foobar: number }
 * type ReplaceStrings = ReplaceKeys<Foo, "foo" | "foobar", { foo: number, foobar: number }>;
 */
export type ReplaceKeys<Obj extends object, Keys extends keyof Obj, Replace extends Record<Keys, any>> = {
    [Property in keyof Obj]: Property extends Keys ? (Property extends keyof Replace ? Replace[Property] : never) : Obj[Property]
}

/**
 * Transforms the types of the keys in an object that match the `from` type in the `Mapper`,
 * replacing them with the `to` type in the `Mapper`.
 *
 * @param {object} Obj - The object to map the types
 * @param {object} Mapper - The types to map
 * @example
 * // Expected: { foo: string, bar: boolean }
 * type ReplaceTypesI = MapTypes<{ foo: string, bar: number }, { from: number, to: boolean }>;
 *
 * // Expected: { foo: number, bar: number  }
 * type ReplaceTypesII = MapTypes<{ foo: string, bar: string }, { from: string, bar: number }>;
 */
export type MapTypes<Obj extends object, Mapper extends { from: unknown; to: unknown }> = {
    [Property in keyof Obj]: Equals<Obj[Property], Mapper["from"]> extends true ? Mapper["to"] : Obj[Property]
}

/**
 * Transforms the object properties to their primitive types. If the properties are objects,
 * it recursively transforms their properties to their primitive types, and so on.
 *
 * @param {object} Obj - The object to transform
 * @example
 * interface User {
 *   name: "Foo",
 *   lastname: "Bar",
 *   age: 30
 * };
 *
 * // Expected: { name: string, lastname: string, age: number }
 * type UserPrimitive = ToPrimitive<User>;
 */
export type ToPrimitive<Obj extends object> = {
    [Property in keyof Obj]: IsObject<Obj[Property]> extends true
        ? Obj[Property] extends object
            ? Prettify<ToPrimitive<Obj[Property]>>
            : never
        : ReturnTypeOf<Obj[Property]>
}

/**
 * Checks if a key exists in either of the two objects and returns its value.
 * If the key does not exist in either object, it returns `never`.
 *
 * @param {object} Obj1 - The first object to check
 * @param {object} Obj2 - The second object to check
 * @param {string} Key - The key to check
 * @example
 * interface Foo {
 *   foo: string
 * }
 *
 * interface Bar {
 *   bar: number
 * }
 *
 * // Expected: string
 * type FooValue = Get<Foo, Bar, "foo">;
 *
 * // Expected: number
 * type BarValue = Get<Foo, Bar, "bar">;
 */
export type Get<
    Obj1 extends object,
    Obj2 extends object,
    Key extends LiteralUnion<Properties<Obj1, Obj2> & string>,
> = Key extends keyof Obj1 ? Obj1[Key] : Key extends keyof Obj2 ? Obj2[Key] : never

/**
 * @internal
 */
type InternalGetRequired<Obj extends object, RequiredKeys extends object = Required<Obj>> = {
    [Property in keyof RequiredKeys as Equals<
        RequiredKeys[Property],
        Property extends keyof Obj ? Obj[Property] : null
    > extends true
        ? Property
        : never]-?: RequiredKeys[Property]
}

/**
 * Get only the keys of an object that are required in the object type otherwise
 * remove them from the object type.
 *
 * @param {object} Obj - The object to get the required keys from
 * @example
 * interface User {
 *   name: string
 *   age?: number
 *   address?: string
 * }
 *
 * // Expected: { name: string }
 * type UserRequired = GetRequired<User>
 */
export type GetRequired<Obj extends object> = InternalGetRequired<Obj>

/**
 * Get only the keys of an object that are optional in the object type otherwise
 * remove them from the object type
 *
 * @param {object} Obj - The object to get the optional keys from
 * @example
 * interface User {
 *   name: string
 *   age?: number
 *   address?: string
 * }
 *
 * // Expected: { age?: number, address?: string }
 * type UserOptional = GetOptional<User>
 */
export type GetOptional<T extends object> = {
    [Key in keyof T as T[Key] extends Required<T>[Key] ? never : Key]: T[Key]
}
