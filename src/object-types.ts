import type { Equals } from "./test.js";
import type { ArgsFunction, ReturnTypeOf } from "./types.js";

/**
 * Utility type that transforms an object to have each property on a new line
 * for better readability.
 *
 * It doesn't change the original object type.
 */
export type Prettify<Obj extends object> = {
	[Property in keyof Obj]: Obj[Property];
} & {};

/**
 * It creates a new type based on your object but marks every property as readonly
 *
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
			: Obj[Property];
};

/**
 * Exclude properties of type `Match` from type `T`
 */
export type Exclude<T, Match> = T extends Match ? never : T;

/**
 * Get the type of the resolved value of a PromiseLike object.
 */
export type Awaited<T extends PromiseLike<unknown>> =
	T extends PromiseLike<infer ResolveType>
		? ResolveType extends PromiseLike<unknown>
			? Awaited<ResolveType>
			: ResolveType
		: never;

/**
 * Get the type of the function's arguments
 *
 * @example
 * function add(x: number, y: number): number {
 *   return x + y;
 * };
 *
 * // Expected: [number, number]
 * type AddParams = Parameters<typeof add>;
 */
export type Parameters<Function extends ArgsFunction> = Function extends (...args: infer Params) => void ? Params : never;

/**
 * Create a new type with a subset of properties from an object
 *
 * @example
 * interface User {
 *   name: string
 *   lastname: string,
 *   age: number
 * };
 *
 * // Expected: { age: number }
 * type PickUser = Pick<User, "age">;
 */
export type Pick<Obj extends object, Keys extends keyof Obj> = {
	[Property in Keys]: Obj[Property];
};

/**
 * Check if a value exists within a tuple and is equal to a specific value
 *
 * @example
 * // Expected: true
 * type IncludesNumber = Includes<[1, 2, 3], 3>;
 *
 * // Expected: true
 * type IncludesString = Includes<["foo", "bar", "foobar"], "bar">;
 *
 * // Expected: false
 * type NoIncludes = Includes<["foo", "bar", "foofoo"], "foobar">;
 */
export type Includes<Array extends unknown[], Match> = Array extends [infer Compare, ...infer Spread]
	? Equals<Compare, Match> extends true
		? true
		: Includes<Spread, Match>
	: false;

/**
 * Creates a new type that omits properties from an object type based on another type
 *
 * @example
 * // Expected: { name: string; age: number }
 * type NoEmailPerson = Omit<{ name: string; age: number; email: string }, "email">;
 */
export type Omit<Obj extends object, Keys extends keyof Obj> = {
	[Property in keyof Obj as Property extends Keys ? never : Property]: Obj[Property];
};

/**
 * Creates a union of the keys of two objects
 *
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
export type Properties<Obj1 extends object, Obj2 extends object> = keyof Obj1 | keyof Obj2;

/**
 * Creates a new object by merging two objects. Properties from `Obj1` override properties
 * from `Obj2` if they have the same key
 *
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
	[Property in Properties<Obj1, Obj2>]: RetrieveKeyValue<Obj2, Obj1, Property>;
};

/**
 * Create a new object based in the difference keys between the objects.
 *
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
export type Intersection<Obj1 extends object, Obj2 extends object> = {
	[Property in Properties<Obj1, Obj2> as Property extends keyof Obj1 & keyof Obj2 ? never : Property]: RetrieveKeyValue<
		Obj1,
		Obj2,
		Property
	>;
};

/**
 * Create a new object based in the type of its keys
 *
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
	[Property in keyof Obj as Obj[Property] extends Type ? Property : never]: Obj[Property];
};

/**
 * Converts the specified keys of an object into optional ones
 *
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
	{
		[Property in keyof Obj as Property extends Keys ? never : Property]: Obj[Property];
	} & { [Property in Keys]?: Obj[Property] }
>;

/**
 * Create a new object based in the keys that are not assignable of type `Type`
 *
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
	[Property in keyof Obj as Obj[Property] extends Type ? never : Property]: Obj[Property];
};

/**
 * Extracts the value of a key from an object and returns a new object with that value,
 * while keeping the other values unchanged.
 */
export type FlattenProperties<Obj extends object, Keys extends keyof Obj> = Prettify<
	{
		[Property in keyof Obj as Property extends Keys ? never : Property]: Obj[Property];
	} & Obj[Keys]
>;

/**
 * Removes the properties whose keys start with an underscore (_).
 */
export type PublicOnly<Obj extends object> = {
	[Property in keyof Obj as Property extends `_${string}` ? never : Property]: Obj[Property];
};

/**
 * Checks if a key exists in either of the two objects and returns its value.
 * If the key does not exist in either object, it returns `never`.
 */
export type RetrieveKeyValue<Obj1 extends object, Obj2 extends object, Key> = Key extends keyof Obj1
	? Obj1[Key]
	: Key extends keyof Obj2
		? Obj2[Key]
		: never;

/**
 * Convert to required the keys speficied in the type `Keys`, and the others fields mantein
 * their definition. When `Keys` is not provided, it should make all properties required
 *
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
	{
		[Property in keyof Obj as Property extends Keys ? never : Property]: Obj[Property];
	} & {
		[Property in keyof Obj as Property extends Keys ? Property : never]-?: Obj[Property];
	}
>;

/**
 *
 * Merge the properties of two objects and it the properties are repeated the types create an union
 *
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
			: never;
};

/**
 * Converts top-level readonly properties of an object to mutable properties.
 *
 * **Important:** Only affects top-level properties, not nested properties.
 *
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
	-readonly [Property in keyof Obj]: Obj[Property];
};

/**
 * Converts all properties to non-readonly of alls levels of the object type,
 * This is an advanced utility type of `Mutable`
 *
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
	-readonly [Property in keyof Obj]: Obj[Property] extends object ? DeepMutable<Obj[Property]> : Obj[Property];
};

type MergeAllImplementation<Array extends readonly object[], Merge extends object = {}> = Array extends [
	infer Item,
	...infer Spread,
]
	? MergeAllImplementation<Spread extends object[] ? Spread : never, UnionMerge<Merge, Item extends object ? Item : {}>>
	: Merge;

/**
 * Create a new object type based in the tuple of object types, if the properties
 * are duplicated will create an union type.
 *
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
export type MergeAll<Array extends readonly object[]> = MergeAllImplementation<Array, {}>;

/**
 * Create an union type based in the literal values of the tuple provided.
 * This utility type is similar to `TupleToUnion` but this utility type
 * receive whatever type
 *
 * @example
 * // Expected: 1
 * type TupleNumber = ToUnion<1>;
 *
 * // Expected: "foo"
 * type TupleString = ToUnion<"foo">;
 *
 * // Expected: 1 | ["foo" | "bar"]
 * type TupleMultiple = ToUnion<1 | ["foo" | "bar"]>;
 */
export type ToUnion<T> = T extends [infer Item, ...infer Spread] ? Item | ToUnion<Spread> : T;

/**
 * Create a new object type appending a new property with its value
 *
 * @example
 * interface User {
 *   name: string
 * };
 *
 * // Expected: { name: string, lastname: string }
 * type UserAppendLastname = AddPropertyToObject<User, "lastname", string>;
 */
export type AddPropertyToObject<Obj extends object, NewProp extends string, TypeValue> = {
	[Property in keyof Obj | NewProp]: Property extends keyof Obj ? Obj[Property] : TypeValue;
};

/**
 * Returns a union type of the entries of the provided object
 *
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
	[Property in keyof RequiredObj]: [Property, RequiredObj[Property] extends undefined ? undefined : RequiredObj[Property]];
}[keyof RequiredObj];

/**
 * Replaces the types of the keys in an object with new types defined in the `Replace` object.
 * If a key in `Keys` is not found in `Replace`, it defaults to the `Default` type.
 *
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
		: Obj[Property];
};

/**
 * Transforms the types of the keys in an object that match the `from` type in the `Mapper`,
 * replacing them with the `to` type in the `Mapper`.
 *
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
		: Obj[Property];
};

/**
 * Omits properties of an object at any depth based on the provided pattern.
 *
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
		: Obj[Property];
};

/**
 * Transforms the object properties to their primitive types. If the properties are objects,
 * it recursively transforms their properties to their primitive types, and so on.
 *
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
		: ReturnTypeOf<Obj[Property]>;
};
