import type { Equals } from "./test.js"
import type { IsNever } from "./type-guards.d.ts"
import type { ReturnTypeOf, TupleToUnion } from "./array-types.js"

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
 * Merges two objects into a new object at any depth. Properties from `Obj1` override properties from `Obj2` if they have the same key.
 * Additionally, it has two optional parameters:
 *   - `ByUnion` - If `true`, it creates a union type for properties with the same key, ignoring priority.
 *   - `PriorityObject` - If `true`, it prioritizes the values which are objects over the values of the first object.
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
 *   hooks: ArgsFunction[],
 *   storePath: {
 *     path: string
 *   }
 * };
 *
 * // Expected: { storePaths: string[], path: string, hooks: ArgsFunction[] }
 * type MergeConfig = Merge<Config, AppStore>;
 *
 * // Expected: { storePaths: string[], path: string, hooks: ArgsFunction[], storePath: { path: string } }
 * type MergeConfigWithPriority = Merge<Config, AppStore, false, true>;
 *
 * // Expected: { storePaths: string[], path: string, hooks: ArgsFunction[] | unknown[], storePath: { path: string } }
 * type MergeConfigWithUnion = Merge<Config, AppStore, true>;
 */
export type Merge<
    Obj1 extends object,
    Obj2 extends object,
    ByUnion extends boolean = false,
    PriorityObject extends boolean = true,
> = {
    [Property in Properties<Obj1, Obj2>]: Property extends keyof Obj1
        ? Obj1[Property] extends object
            ? Property extends keyof Obj2
                ? ByUnion extends true
                    ? Obj1[Property] | Obj2[Property]
                    : Obj2[Property] extends object
                      ? Prettify<Merge<Obj1[Property], Obj2[Property], ByUnion, PriorityObject>>
                      : Obj1[Property]
                : Obj1[Property]
            : Property extends keyof Obj2
              ? ByUnion extends true
                  ? Obj1[Property] | Obj2[Property]
                  : PriorityObject extends true
                    ? Obj2[Property] extends object
                        ? Obj2[Property]
                        : Obj1[Property]
                    : Obj1[Property]
              : Obj1[Property]
        : Property extends keyof Obj2
          ? Obj2[Property]
          : never
}

/**
 * @internal
 */
type InternalMerge<
    Array extends readonly object[],
    Obj extends object,
    ByUnion extends boolean = false,
    PriorityObject extends boolean = true,
> = Array extends [infer Item, ...infer Spread]
    ? InternalMerge<Spread extends object[] ? Spread : never, Merge<Obj, Item & object, ByUnion, PriorityObject>>
    : Obj

/**
 * Create a new object type based in the tuple of object types, if the properties
 * are duplicated will create an union type. It is an implementation of `Merge` type.
 * It is useful when you have a tuple of object types and you want to merge them into a single object type.
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
 * type Merge = MergeAll<[Foo, Bar, FooBar], true>;
 */
export type MergeAll<
    Array extends readonly object[],
    ByUnion extends boolean = false,
    PriorityObject extends boolean = true,
> = InternalMerge<Array, {}, ByUnion, PriorityObject>

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
export type PublicOnly<Obj extends object> = Omit<Obj, `_${string}`>

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
 * type UserAppendLastname = Append<User, "lastname", string>;
 */
export type Append<Obj extends object, Property extends string, value> = Prettify<Obj & { [Prop in Property]: value }>

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
    [Property in keyof Obj]: Obj[Property] extends Mapper["from"]
        ? Mapper extends { from: infer From; to: infer To }
            ? Obj[Property] extends From
                ? To
                : never
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
 * Omits properties of an object at any depth based on the provided path string that
 * is a dot-separated path to the property.
 *
 * @param {object} Obj - The object to omit the properties from
 * @param {string} Path - The path to omit the properties
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
export type DeepOmit<Obj extends object, Path extends LiteralUnion<DeepKeys<Obj> & string>> = {
    [Property in keyof Obj as Path extends `${string}.${string}`
        ? Property
        : Property extends Path
          ? never
          : Property]: Path extends `${infer StartsWith}.${infer Spread}`
        ? Property extends StartsWith
            ? Obj[Property] extends object
                ? DeepOmit<Obj[Property], Spread>
                : Obj[Property]
            : Obj[Property]
        : Obj[Property]
}

/**
 * @internal
 */
type InternalDeepPick<Obj, Path extends string> = Path extends `${infer Left}.${infer Right}`
    ? Left extends keyof Obj
        ? InternalDeepPick<Obj[Left], Right>
        : unknown
    : Path extends keyof Obj
      ? Obj[Path]
      : unknown

/**
 * Picks the properties of an object at any depth based on the provided path.
 *
 * @param {object} Obj - The object to pick the properties from
 * @param {string} Path - The path to pick the properties
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
export type DeepPick<Obj, Path extends LiteralUnion<DeepKeys<Obj extends object ? Obj : never> & string>> = InternalDeepPick<
    Obj,
    Path
>

/**
 * Returns the keys of an object of any depth of an object
 *
 * @param {object} Obj - The object to get the keys from
 * @example
 *
 * interface User {
 *   name: string,
 *   address: {
 *     street: string,
 *     avenue: string
 *   }
 * }
 *
 * // Expected: "name" | "address" | "address.street" | "address.avenue"
 * type UserKeys = DeepKeys<User>
 */
export type DeepKeys<Obj extends object> = {
    [Property in keyof Obj]: Obj[Property] extends object
        ? // @ts-ignore
          TupleToUnion<[Property, `${Property & string}.${DeepKeys<Obj[Property]>}`]>
        : Property extends number
          ? `${Property & number}`
          : Property
}[keyof Obj]

/**
 * Create a new object type with all properties being optional at any depth.
 *
 * @param {object} Obj - The object to make optional
 * @example
 *
 * interface User {
 *   name: string,
 *   address: {
 *     street: string,
 *     avenue: string
 *   }
 * }
 *
 * // Expected: { name?: string, address?: { street?: string, avenue?: string } }
 * type UserOptional = DeepPartial<User>
 */
export type DeepPartial<Obj extends object> = {
    [Property in keyof Obj]?: Obj[Property] extends object ? Prettify<DeepPartial<Obj[Property]>> : Obj[Property]
}

/**
 * Create a new object type with all properties being required at any depth.
 *
 * @param {object} Obj - The object to make required
 * @example
 *
 * interface User {
 *   name?: string,
 *   address?: {
 *     street?: string,
 *     avenue?: string
 *   }
 * }
 *
 * // Expected: { name: string, address: { street: string, avenue: string } }
 * type UserRequired = DeepRequired<User>
 */
export type DeepRequired<Obj extends object> = {
    [Property in keyof Obj]-?: Obj[Property] extends object ? Prettify<DeepRequired<Obj[Property]>> : Obj[Property]
}
