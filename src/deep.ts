import type { Equals } from "./test.js"
import type { IsObject } from "./guards.js"
import type { Properties } from "./objects.js"
import type { FilterNonNullish } from "./arrays.js"
import type { LiteralUnion, Prettify, Nullish } from "./utils.js"

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
export type DeepMerge<
    Obj1 extends object,
    Obj2 extends object,
    ByUnion extends boolean = false,
    PriorityObject extends boolean = true,
> = {
    [Property in Properties<Obj1, Obj2>]: Property extends keyof Obj1
        ? Property extends keyof Obj2
            ? ByUnion extends true
                ? Obj1[Property] | Obj2[Property]
                : PriorityObject extends true
                  ? IsObject<Obj1[Property]> | IsObject<Obj2[Property]> extends true
                      ? Prettify<DeepMerge<Obj1[Property] & {}, Obj2[Property] & {}>>
                      : IsObject<Obj1[Property]> extends true
                        ? Obj1[Property]
                        : IsObject<Obj2[Property]> extends true
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
    ? InternalMerge<Spread extends object[] ? Spread : never, DeepMerge<Obj, Item & object, ByUnion, PriorityObject>>
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
export type DeepMergeAll<
    Array extends readonly object[],
    ByUnion extends boolean = false,
    PriorityObject extends boolean = true,
> = InternalMerge<Array, {}, ByUnion, PriorityObject>

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
    -readonly [Property in keyof Obj]: IsObject<Obj[Property]> extends true
        ? Obj[Property] extends object
            ? Prettify<DeepMutable<Obj[Property]>>
            : never
        : Obj[Property]
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
    readonly [Property in keyof Obj]: IsObject<Obj[Property]> extends true
        ? Obj[Property] extends object
            ? Prettify<DeepReadonly<Obj[Property]>>
            : never
        : Obj[Property]
}

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
    [Property in keyof Obj]: IsObject<Obj[Property]> extends true
        ? // @ts-ignore
          ArrayToUnion<[Property, `${Property & string}.${DeepKeys<Obj[Property]>}`]>
        : Property extends number
          ? `${Property & number}`
          : Property
}[keyof Obj]

/**
 * @internal
 */
type DiscardLeft<T extends string> = {
    [Property in T]: Property extends `${string}.${infer Right}` ? Right : never
}[T]

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
    [Property in Exclude<keyof Obj, Path>]: IsObject<Obj[Property]> extends true
        ? Prettify<DeepOmit<Obj[Property] & {}, DiscardLeft<Exclude<Path, keyof Obj>>>>
        : Obj[Property]
}

/**
 *
 *
 * @internal
 */
type InternalDeepGet<Obj, Path extends string> = Path extends `${infer Left}.${infer Right}`
    ? Left extends keyof Obj
        ? InternalDeepGet<Obj[Left], Right>
        : unknown
    : Path extends keyof Obj
      ? Obj[Path]
      : unknown

/**
 * Get the value of a property in an object at any depth based on the provided path string
 * @param {object} Obj - The object to get the value from
 * @param {string} Path - The path to get the value
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
 * // Expected: string
 * type UserName = DeepGet<User, "name">
 *
 * // Expected: string
 * type UserStreet = DeepGet<User, "address.street">
 */
export type DeepGet<Obj, Path extends LiteralUnion<DeepKeys<Obj extends object ? Obj : never> & string>> = InternalDeepGet<
    Obj,
    Path
>

/**
 * @internal
 */
type DeepTruncateInternal<Obj extends object, Depth extends number, Level extends unknown[]> = {
    [Property in keyof Obj]: IsObject<Obj[Property]> extends true
        ? [1, ...Level]["length"] extends Depth
            ? {}
            : Obj[Property] extends object
              ? Prettify<DeepTruncateInternal<Obj[Property], Depth, [1, ...Level]>>
              : never
        : Obj[Property]
}

/**
 * Truncates an object at any depth based on the provided depth.
 *
 * @param {object} Obj - The object to truncate
 * @param {number} Depth - The depth to truncate the object
 * @example
 *
 * interface Foo {
 *   foo: string
 *   bar: number
 *   foobar: {
 *     foo: boolean
 *     bar: string
 *     foobar: {
 *       foo: number
 *     }
 *   }
 * }
 *
 * // Expected: { foo: string, bar: number, foobar: {} }
 * type TruncatedFoo = DeepTruncate<Foo, 1>
 */
export type DeepTruncate<Obj extends object, Depth extends number> =
    IsObject<Obj> extends true ? DeepTruncateInternal<Obj, Depth, []> : never

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
    [Property in keyof Obj]?: IsObject<Obj[Property]> extends true ? Prettify<DeepPartial<Obj[Property] & {}>> : Obj[Property]
}

/**
 * @internal
 */
type DeepRequiredInternal<Obj extends object, RequiredObj = Required<Obj>> = {
    [Property in keyof RequiredObj]-?: IsObject<RequiredObj[Property]> extends true
        ? Prettify<DeepRequired<RequiredObj[Property] & {}>>
        : RequiredObj[Property]
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
export type DeepRequired<Obj extends object> = DeepRequiredInternal<Obj>

/**
 * @internal
 */
type DiscardRight<T extends string> = {
    [Property in T]: Property extends `${infer Left}.${string}` ? Left : never
}[T]

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
export type DeepPick<Obj extends object, Path extends LiteralUnion<DeepKeys<Obj> & string>> = {
    [Property in Extract<keyof Obj, Path | DiscardRight<Path>>]: IsObject<Obj[Property]> extends true
        ? Prettify<DeepPick<Obj[Property] & {}, DiscardLeft<Exclude<Path, keyof Obj>>>>
        : Obj[Property]
}

/**
 * Append a null value to all properties of an object at any depth.
 * This is the opposite of `DeepNonNullable`.
 *
 * @param {object} Obj - The object to append the null value
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
 * // Expected: { name: string | null, address: { street: string | null, avenue: string | null } }
 * type UserNullable = DeepNullable<User>
 */
export type DeepNullable<Obj extends object> = {
    [Property in keyof Obj]: IsObject<Obj[Property]> extends true
        ? Prettify<DeepNullable<Obj[Property] & {}>> | null
        : Obj[Property] | null
}

/**
 * Removes the null value from all properties of an object at any depth.
 * This is the opposite of `DeepNullable`.
 *
 * @param {object} Obj - The object to remove the null value
 * @example
 *
 * interface User {
 *   name: string | null,
 *   address: {
 *     street: string | null,
 *     avenue: string | null
 *   } | null
 * }
 *
 * // Expected: { name: string, address: { street: string, avenue: string } }
 * type UserNonNullable = DeepNonNullable<User>
 */
export type DeepNonNullable<Obj extends object> = {
    [Property in keyof Obj]: IsObject<Exclude<Obj[Property], null>> extends true
        ? Prettify<DeepNonNullable<Exclude<Obj[Property] & {}, null>>>
        : Exclude<Obj[Property], null>
}

/**
 * Removes the key-value pairs of an object that are nullish (null or undefined).
 *
 * @param {object} Obj - The object to remove the nullish values
 * @example
 *
 * interface User {
 *   name: string | null,
 *   address: {
 *     zip: string
 *     street: string | null,
 *     avenue: undefined
 *   }
 * }
 *
 * // Expected: { address: { zip: string } }
 * type UserNonNullish = DeepNonNullish<User>
 */
export type DeepNonNullish<Obj extends object> = {
    [Property in keyof Obj as Obj[Property] extends Nullish ? never : Property]: IsObject<Obj[Property]> extends true
        ? Prettify<DeepNonNullish<Obj[Property] & {}>>
        : Obj[Property] extends unknown[]
          ? FilterNonNullish<Obj[Property]>
          : Obj[Property]
}

/**
 * Filters the properties of an object at any depth based on the provided predicate.
 *
 * @unstable Currently, this type is not working deeply as expected.
 * @param {object} Obj - The object to filter the properties from
 * @param {Predicate} Predicate - The predicate to filter the properties
 * @example
 *
 * interface User {
 *   name: string,
 *   age: number
 *   address: {
 *     street: string,
 *     avenue: string
 *   }
 * }
 *
 */
export type DeepFilter<Obj extends object, Predicate> = {
    [Property in keyof Obj as Equals<Obj[Property], Predicate> extends true ? Property : never]: IsObject<
        Obj[Property]
    > extends true
        ? Prettify<DeepFilter<Obj[Property] & {}, Predicate>>
        : Obj[Property]
}

/**
 * Replaces the values of the properties of an object at any depth based on the provided `From` and `To` types.
 *
 * @param {object} Obj - The object to replace the values
 * @param {From} From - The type to replace
 * @param {To} To - The new type to replace
 * @example
 */
export type DeepReplace<Obj extends object, From, To> = {
    [Property in keyof Obj]: Equals<Obj[Property], From> extends true
        ? To
        : IsObject<Obj[Property]> extends true
          ? Prettify<DeepReplace<Obj[Property] & {}, From, To>>
          : Obj[Property]
}

/**
 * Update the value of a property in an object at any depth based on the provided path string.
 *
 * @param {object} Obj - The object to update the value
 * @param {Path} Path - The path to update the value
 * @param {Value} Value - The new value to update
 * @example
 */
export type DeepSet<Obj extends object, Path extends LiteralUnion<DeepKeys<Obj> & string>, Value> = {
    [Property in keyof Obj]: Property extends Path
        ? Value
        : IsObject<Obj[Property]> extends true
          ? Prettify<DeepSet<Obj[Property] & {}, DiscardLeft<Exclude<Path, keyof Obj>>, Value>>
          : Obj[Property]
}
