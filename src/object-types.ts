import type { Equals } from "./test.js"
import type { IsNever } from "./type-guards.d.ts"
import type { ArgsFunction } from "./types.js"
import type { ReturnTypeOf } from "./array-types.js"

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
 * It creates a new type based on your object but marks every property as readonly
 *
 * @param {object} Obj - The object to make readonly
 * @example
 * interface User {
 *   name: string,
 *   address: {
 *     street: string,
 *     avenue: string
 *   }
 * };
 *
 * // Expected: { readonly name: string, readonly address: { readonly street: string, readonly avenue: string } }
 * type ReadonlyUser = DeepReadonly<User>;
 */
export type DeepReadonly<Obj extends object> = {
    readonly [Property in keyof Obj]: Obj[Property] extends Function
        ? Obj[Property]
        : Obj[Property] extends object
          ? DeepReadonly<Obj[Property]>
          : Obj[Property]
}

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
 * Get the type of the resolved value of a PromiseLike object.
 *
 * @param {PromiseLike<unknown>} T - The PromiseLike object to resolve
 * @example
 * // Expected: string
 * type A = Awaited<Promise<string>>;
 *
 * // Expected: boolean
 * type B = Awaited<Promise<Promise<boolean>>>;
 */
export type Awaited<T extends PromiseLike<unknown>> =
    T extends PromiseLike<infer ResolveType>
        ? ResolveType extends PromiseLike<unknown>
            ? Awaited<ResolveType>
            : ResolveType
        : never

/**
 * Creates a union of the keys of two objects
 *
 * @param {object} Obj1 - The first object to get the keys from
 * @param {object} Obj2 - The second object to get the keys from
 * @param {boolean} Extends - If `true`, it returns the intersection of the keys (defaults to `false`)
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
export type Properties<Obj1 extends object, Obj2 extends object, Extends extends boolean = false> = Extends extends true
    ? keyof Obj1 & keyof Obj2
    : keyof Obj1 | keyof Obj2

/**
 * Creates a new object by merging two objects. Properties from `Obj1` override properties
 * from `Obj2` if they have the same key
 *
 * @param {object} Obj1 - The first object to merge
 * @param {object} Obj2 - The second object to merge
 * @example
 * interface Config {
 *   storePaths: string[],
 *   hooks: unknown[]
 * };
 *
 * interface AppStore {
 *   path: string,
 *   hooks: ArgsFunction[]
 * };
 *
 * // Expected: { storePaths: string[], path: string, hooks: ArgsFunction[] }
 * type MergeConfig = Merge<Config, AppStore>;
 */
export type Merge<Obj1 extends object, Obj2 extends object> = {
    [Property in Properties<Obj1, Obj2>]: RetrieveKeyValue<Obj2, Obj1, Property>
}

/**
 * @internal
 */
type IntersectionImplementation<Obj1 extends object, Obj2 extends object, Keys = Properties<Obj1, Obj2, true>> = {
    [Property in Properties<Obj1, Obj2> as Discard<Property, Keys>]: RetrieveKeyValue<Obj1, Obj2, Property>
}

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
export type Intersection<Obj1 extends object, Obj2 extends object> = IntersectionImplementation<Obj1, Obj2>

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
 * type PublicUser = PublicOnly<User>;
 */
export type PublicOnly<Obj extends object> = {
    [Property in keyof Obj as Discard<Property, `_${string}`>]: Obj[Property]
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
 * type FooValue = RetrieveKeyValue<Foo, Bar, "foo">;
 *
 * // Expected: number
 * type BarValue = RetrieveKeyValue<Foo, Bar, "bar">;
 */
export type RetrieveKeyValue<Obj1 extends object, Obj2 extends object, Key> = Key extends keyof Obj1
    ? Obj1[Key]
    : Key extends keyof Obj2
      ? Obj2[Key]
      : never

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
 *
 * Merge the properties of two objects and it the properties are repeated the types create an union
 *
 * @param {object} Obj1 - The first object to merge
 * @param {object} Obj2 - The second object to merge
 * @example
 * interface Foo {
 *   bar: string
 * };
 *
 * interface Bar {
 *   bar: number
 * };
 *
 * // Expected: { bar: string | number }
 * type MergeFooBar = UnionMerge<Foo, Bar>;
 */
export type UnionMerge<Obj1 extends object, Obj2 extends object> = {
    [Prop in Properties<Obj1, Obj2>]: Prop extends keyof Obj1
        ? Prop extends keyof Obj2
            ? Obj1[Prop] | Obj2[Prop]
            : Obj1[Prop]
        : Prop extends keyof Obj2
          ? Obj2[Prop]
          : never
}

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
 * Converts all properties to non-readonly of alls levels of the object type,
 * This is an advanced utility type of `Mutable`
 *
 * @param {object} Obj - The object to convert
 * @example
 * interface Foo {
 *   readonly foo: {
 *     readonly bar: {
 *       readonly foobar: number
 *     }
 *   }
 * };
 *
 * // Expected: { foo: { bar: { foobar: number } } }
 * type NonReadonlyFoo = DeepMutable<Foo>;
 */
export type DeepMutable<Obj extends object> = {
    -readonly [Property in keyof Obj]: Obj[Property] extends object ? DeepMutable<Obj[Property]> : Obj[Property]
}

/**
 * @internal
 */
type MergeAllImplementation<Array extends readonly object[], Merge extends object = {}> = Array extends [
    infer Item,
    ...infer Spread,
]
    ? MergeAllImplementation<Spread extends object[] ? Spread : never, UnionMerge<Merge, Item extends object ? Item : {}>>
    : Merge

/**
 * Create a new object type based in the tuple of object types, if the properties
 * are duplicated will create an union type.
 *
 * @param {T[]} Array - The tuple of object types to merge
 * @example
 * interface Foo {
 *   foo: string
 * };
 *
 * interface Bar {
 *   bar: string
 * };
 *
 * interface FooBar {
 *   bar: number,
 *   foo: boolean,
 *   foobar: string
 * };
 *
 * // Expected: { foo: string | boolean, bar: string | number, foobar: string }
 * type Merge = MergeAll<[Foo, Bar, FooBar]>;
 */
export type MergeAll<Array extends readonly object[]> = MergeAllImplementation<Array, {}>

/**
 * Create a new object type appending a new property with its value
 *
 * @param {object} Obj - The object to append the property
 * @param {string} NewProp - The new property to append
 * @param {TypeValue} TypeValue - The type of the new property
 * @example
 * interface User {
 *   name: string
 * };
 *
 * // Expected: { name: string, lastname: string }
 * type UserAppendLastname = AddPropertyToObject<User, "lastname", string>;
 */
export type AddPropertyToObject<Obj extends object, NewProp extends string, TypeValue> = {
    [Property in keyof Obj | NewProp]: Property extends keyof Obj ? Obj[Property] : TypeValue
}

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
export type ReplaceKeys<Obj extends object, Keys extends string, Replace extends object, Default = unknown> = {
    [Property in keyof Obj]: Property extends Keys
        ? Property extends keyof Replace
            ? Replace[Property]
            : Default
        : Obj[Property]
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
    [Property in keyof Obj]: Obj[Property] extends Mapper["from"]
        ? Mapper extends { from: infer From; to: infer To }
            ? Obj[Property] extends From
                ? To
                : never
            : Obj[Property]
        : Obj[Property]
}

/**
 * Omits properties of an object at any depth based on the provided pattern string that
 * is a dot-separated path to the property.
 *
 * @param {object} Obj - The object to omit the properties from
 * @param {string} Pattern - The pattern to omit the properties
 * @example
 * type User = {
 *   name: string,
 *   address: {
 *     street: string,
 *     avenue: string
 *   }
 * };
 *
 * // Expected: { name: string, address: { street: string } }
 * type OmitAvenueUser = DeepOmit<User, "addresss.avenue">;
 *
 * // Expected: { address: { street: string, avenue: string } }
 * type OmitNameUser = DeepOmit<User, "name">;
 */
export type DeepOmit<Obj extends object, Pattern extends string> = {
    [Property in keyof Obj as Pattern extends `${string}.${string}`
        ? Property
        : Property extends Pattern
          ? never
          : Property]: Pattern extends `${infer StartsWith}.${infer Spread}`
        ? Property extends StartsWith
            ? Obj[Property] extends object
                ? DeepOmit<Obj[Property], Spread>
                : Obj[Property]
            : Obj[Property]
        : Obj[Property]
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
    [Property in keyof Obj]: Obj[Property] extends object
        ? Obj[Property] extends Function
            ? Function
            : ToPrimitive<Obj[Property]>
        : ReturnTypeOf<Obj[Property]>
}

/**
 * @internal
 */
type GetRequiredImplementation<Obj extends object, RequiredKeys extends object = Required<Obj>> = {
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
export type GetRequired<Obj extends object> = GetRequiredImplementation<Obj>

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

/**
 * Get the value of a key from an object without worrying about the nested properties
 * of the object only should separate the keys with a dot.
 *
 * @param {object} T - The object to get the value from
 * @param {string} K - The key to get the value from
 * @example
 * interface User {
 *   foo: {
 *     bar: {
 *       foobar: "Hello"
 *     },
 *     barfoo: "World"
 *   },
 *   age: number
 * }
 *
 * // Expected: "Hello"
 * type FooBar = GetValue<User, "foo.bar.foobar">
 *
 * // Expected: "World"
 * type FooBar = GetValue<User, "foo.barfoo">
 */
export type Get<T, K extends string> = K extends keyof T
    ? T[K]
    : K extends `${infer Char extends keyof T & string}.${infer Substr}`
      ? Get<T[Char], Substr>
      : never

/**
 * TODO: This type is the same as `Get` type, but it should be removed in the future or just
 * update the logic to make it different from `Get` type.
 *
 * Picks the properties of an object at any depth based on the provided pattern.
 *
 * @param {object} Obj - The object to pick the properties from
 * @param {string} Pattern - The pattern to pick the properties
 * @example
 * interface User {
 *   name: string,
 *   address: {
 *     street: string,
 *     avenue: string
 *   }
 * }
 *
 * // Expected: string
 * type UserPick = DeepPick<User, "address.street">
 *
 */
export type DeepPick<Obj, Pattern> = Pattern extends `${infer Left}.${infer Right}`
    ? Left extends keyof Obj
        ? DeepPick<Obj[Left], Right>
        : unknown
    : Pattern extends keyof Obj
      ? Obj[Pattern]
      : unknown
