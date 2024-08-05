import type { Equals } from "./test";
import type { ArgsFunction } from "./types";

/**
 * Utility type that transforms an object to have each property on a new line
 * for better readability. 
 * 
 * It doesn't change the original object type.
 */
export type Prettify<T extends object> = {
    [Property in keyof T]: T[Property]
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
 * }
 * type ReadonlyUser = DeepReadonly<User> // { readonly name: string,  address: { readonly street: string, readonly avenue } }
 */
export type DeepReadonly<T extends object> = {
    readonly [Property in keyof T]: T[Property] extends Function
        ? T[Property]
        : T[Property] extends object
            ? DeepReadonly<T[Property]>
            : T[Property];
};

/**
 * Creates a union type from the literal values of a constant string or number array.
 * This is useful for representing a set of allowed values based on the array elements
 * 
 * @example
 * type StringUnion = ["1", "2", "3"]
 * type Union = TypleToUnion<StringUnion> // "1" | "2" | "3"
 */
export type TupleToUnion<T extends readonly unknown[]> = T extends [infer Item, ...infer Spreed]
    ? Item | TupleToUnion<Spreed>
    : never;


/**
 * Gets the length (size) of an array.
 *
 * @example
 * const numbers: number[] = [1, 2, 3, 4, 5];
 * type SizeOfNumbers = Size<typeof numbers>; // SizeOfNumbers = 5
 */
export type Size<T extends unknown[]> = T extends unknown[] ? T["length"] : 0;


/**
 * Gets the type of the last element in an array, or `never` if the array is empty.
 * 
 * @example
 * type LastItem = Last<1, 2, 3, 4> // 4
 */
export type Last<T extends unknown[]> = T extends [...any, infer Last] ? Last : never;

/**
 * Removes the last element from an array and returns a new array type with all elements 
 * except the last. If the array is empty, returns an empty array type
 * 
 * @example
 * type PopStr = Pop<["a", "b", "c"]> // ["a", "b"]
 * type PopNums = Pop<[1, 2, 3]> // [1, 2]
 */
export type Pop<T extends unknown[]> = T extends [...infer Items, unknown] ? Items : [];

/**
 * Exclude properties of type `U` from type `T`
 */
export type Exclude<T, U> = T extends U ? never : T;

/**
 * Get the type of the resolved value of a PromiseLike object.
 */
export type Awaited<T extends PromiseLike<unknown>> = T extends PromiseLike<infer R>
	? R extends PromiseLike<unknown>
		? Awaited<R>
		: R
	: never;

/**
 * Get the type of the function's arguments
 * 
 * @example
 * function add(x: number, y: number): number {
 *     return x + y;
 * }
 * type AddParams = Parameters<typeof add>; // AddParams = [number, number]
 */
export type Parameters<T extends ArgsFunction> = T extends (...args: infer P) => void ? P : never;

/**
 * Create a new type with a subset of properties from an object
 * 
 * @example
 * interface User {
 *   name: string
 *   lastname: string,
 *   age: number
 * }
 * type PickUser = Pick<User, "age"> // { age: number }
 */
export type Pick<T extends object, K extends keyof T> = {
	[Property in K]: T[Property]
};

/**
 * Check if a value exists within a tuple and is equal to a specific value
 * 
 * @example
 * type IncludesNumber = Includes<[1, 2, 3], 3> // true
 * type IncludesString = Includes<["foo", "bar", "foobar"], "bar"> // true
 * type NoIncludes = Includes<["foo", "bar", "foofoo"], "foobar"> // false
 */
export type Includes<T extends unknown[], U> = T extends [infer Compare, ...infer Items]
	? Equals<Compare, U> extends true
		? true 
		: Includes<Items, U>
	: false;

/**
 * Creates a new type that omits properties from an object type based on another type
 * 
 * @example
 * type Person = { name: string; age: number; email: string };
 * type NoEmailPerson = Omit<Person, "email">;  // NoEmailPerson = { name: string; age: number }
 */
export type Omit<T extends object, U> = {
	[Property in keyof T as Property extends U ? never : Property]: T[Property]
};


/**
 * Creates a union of the keys of two objects
 * 
 * @example
 * interface Foo {
 *   foo: string,
 * }
 * 
 * interface Bar {
 *   bar: number
 * }
 *  
 * type PropsFooBar = Properties<Foo, Bar> // "foo" | "bar"
 */
export type Properties<T1 extends object, T2 extends object> = keyof T1 | keyof T2;

/**
 * Creates a new object by merging two objects. Properties from `S` override properties 
 * from `F` if they have the same key
 * 
 * @example
 * interface Config {
 *   storePaths: string[],
 *   hooks: unknown[]
 * }
 * 
 * interface AppStore {
 *   path: string,
 *   hooks: ArgsFunction[]
 * }
 * 
 * type MergeConfig = Merge<Config, AppStore> // { storePaths: string[], path: string, hooks: ArgsFunction[] }
 */
export type Merge<T1 extends object, T2 extends object> = {
	[Property in Properties<T1, T2>]: HasKeyObjects<T2, T1, Property>;
};

/**
 * Create a new object based in the difference keys between the objects.
 * 
 * @example
 * type Foo = {
 * 	name: string
 * 	age: string
 * }
 * 
 * type Bar = {
 * 	ame: string
 * 	age: string
 * 	gender: number
 * }
 * 
 * type DiffFoo = Diff<Foo, Bar> // { gender: number }
 */
export type Diff<O1 extends object, O2 extends object> = {
	[P in Properties<O1, O2> as 
		P extends keyof O1 & keyof O2 
			? never
			: P
	]: HasKeyObjects<O1, O2, P>;
};

/**
 * Create a new object based in the type of its keys
 * 
 * @example
 * interface User {
 * 	name: string,
 * 	lastname: string,
 * 	age: number
 * }
 * type UserStr = PickByType<User, string> // { name: string, lastname: string }
 */
export type PickByType<T extends object, U> = {
	[Property in keyof T as T[Property] extends U ? Property : never]: T[Property];
};

/**
 * Converts the specified keys of an object into optional ones
 * 
 * @example
 * interface User {
 * 	name: string,
 * 	lastname: string,
 *	age: number
 * }
 * type UserPartialName = PartialByKeys<User, "name"> // { name?: string, lastname: string, age: number }
 */
export type PartialByKeys<T extends object, K extends keyof T = keyof T> = Prettify<
	{ [Property in keyof T as Property extends K ? never : Property]: T[Property] } & 
	{ [Property in K]?: T[Property] }
>;

/**
 * Create a new object based in the keys that are not assignable of type U
 * 
 * @example
 * interface User {
 * 	name: string,
 * 	lastname: string,
 * 	age: number
 * }
 * type UserExcludeStrings = OmitByType<User, string> // { age: number }
 */
export type OmitByType<T extends object, U> = {
	[Property in keyof T as T[Property] extends U ? never : Property]: T[Property];
};

/**
 * Extracts the value of a key from an object and returns a new object with that value, 
 * while keeping the other values unchanged.
 */
export type ExtractToObject<T extends object, U extends keyof T> = Prettify<{
	[Property in keyof T as Property extends U ? never: Property]: T[Property]
} & T[U]>

/**
 * Removes the properties whose keys start with an underscore (_).
 */
export type PublicType<T extends object> = {
	[Property in keyof T as Property extends `_${string}` ? never : Property]: T[Property];
};

/**
 * Checks if a key exists in either of the two objects and returns its value.
 * If the key does not exist in either object, it returns `never`.
 */
export type HasKeyObjects<O1 extends object, O2 extends object, Key> = Key extends keyof O1
        ? O1[Key]
        : Key extends keyof O2
                ? O2[Key]
                : never;

/**
 * Convert to required the keys speficied in the type `K`, and the others fields mantein
 * their definition. When `K` is not provided, it should make all properties required 
 * 
 * @example
 * interface User {
 *   name?: string,
 *   age?: number,
 *   address?: string
 * }
 * type UserRequiredName = RequiredByKeys<User, "name"> // { name: string, age?: number, address?: string }
 */
export type RequiredByKeys<T extends object, K extends keyof T = keyof T> = Prettify<
	{ [Property in keyof T as Property extends K ? never : Property]: T[Property] } & 
	{ [Property in keyof T as Property extends K ? Property : never]-?: T[Property] }
>;

/**
 * Filter the items of a tuple of elements based in the predicate provided in the
 * generic type.
 * 
 * @example
 * type Filter1 = Filter<[0, 1, 2], 2> // [2]
 * type Filter2 = Filter<[0, 1, 2], 0 | 1> // [0, 1]
 */
export type Filter<T extends unknown[], Predicate, Array extends unknown[] = []> = T extends [infer Item, ...infer Items]
	? Filter<Items, Predicate, Item extends Predicate ? [...Array, Item] : [...Array]>
	: Array;

/**
 * 
 * Merge the properties of two objects and it the properties are repeated the types create an union
 * 
 * @example
 * interface Foo {
 *   bar: string
 * }
 * 
 * interface Bar {
 *   bar: number
 * }
 * type MergeFooBar = MergeKeyObjects<Foo, Bar> // { bar: string | number }
 */
export type MergeKeyObjects<O1 extends object, O2 extends object> = {
	[Prop in Properties<O1, O2>]: Prop extends keyof O1
		? Prop extends keyof O2
			? O1[Prop] | O2[Prop]
			: O1[Prop]
		: Prop extends keyof O2
			? O2[Prop]
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
 * }
 *
 * type NonReadonlyUser = Mutable<User>; // { name: string, lastname: string, age: number }
 */
export type Mutable<T extends object> = {
	-readonly[Property in keyof T]: T[Property]
}

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
 * }
 * type NonReadonlyFoo = DeepMutable<Foo> // { foo: { bar: { foobar: number } } }
 */
export type DeepMutable<T extends object> = {
	-readonly[Property in keyof T]: T[Property] extends object
		? DeepMutable<T[Property]>
		: T[Property];
};

/**
 * Create a new object type based in the tuple of object types, if the properties
 * are duplicated will create an union type.
 * 
 * @example
 * interface Foo {
 *   foo: string
 * }
 * interface Bar {
 *   bar: string
 * }
 * interface FooBar {
 *   bar: number,
 *   foo: boolean,
 *   foobar: string
 * }
 * type Merge = MergeAll<[Foo, Bar, FooBar]> 
 * // { foo: string | boolean, bar: string | number, foobar: string }
 */
export type MergeAll<Tuple extends readonly object[], Merge extends object = {}> =
	Tuple extends [infer Item, ...infer Items]
		? MergeAll<Items extends object[] ? Items : never, MergeKeyObjects<Merge, Item extends object ? Item : {}>>
		: Merge;

/**
 * Create an union type based in the literal values of the tuple provided.
 * This utility type is similar to `TupleToUnion` but this utility type 
 * receive whatever type
 * 
 * @example
 * type TupleNumber = ToUnion<1> // 1
 * type TupleString = ToUnion<"foo"> // foo
 * type TupleMultiple = ToUnion<1 | ["foo" | "bar"]>
 */
export type ToUnion<T> = T extends [infer Item, ...infer Items] ? Item | ToUnion<Items> : T;

/**
 * Cleans the elements of a tuple based in the predicated, it returns the values that 
 * does not match with the predicated
 * 
 * @example
 * type CleanNumbers = Without<[1, 2, 3, 4, 5], [4, 5]> // [1, 2, 3]
 * type CleanStrings = Without<["foo", "bar", "foobar"], "foo"> // ["bar", "foobar"]
 */
export type Without<T extends readonly unknown[], Predicate, Array extends unknown[] = []> = T extends [infer Item, ...infer Items]
		? Without<Items, Predicate, Item extends ToUnion<Predicate> ? Array : [...Array, Item]>
		: Array;

/**
 * Create a new object type appending a new property with its value
 * 
 * @example
 * interface User {
 *   name: string
 * }
 * type UserAppendLastname = AppendToObject<User, "lastname", string>
 */
export type AppendToObject<T extends object, U extends string, V> = {
	[Property in keyof T | U]: Property extends keyof T ? T[Property] : V
}

/**
 * Change the relative ordern of the elements of a tuple type, reversing
 * its order
 * 
 * @example
 * type ReverseNumbers = Reverse<[1, 2, 3, 4]> // [1, 2, 3, 4]
 * type ReverseStrings = Reverse<["a", "b", "c"]> // ["a", "b", "c"]
 * type ReverseArray = Reverse<[1, "foo", 2, "bar", { foo: number }, () => void]>
 * // [() => void, { foo: number }, "bar", 2, "foo", 1]
 */
export type Reverse<T extends unknown[]> = T extends [infer Item, ...infer Items]
	? [...Reverse<Items>, Item]
	: T;

/**
 * Returns the first index where the element `U` appears in the tuple type `T`.
 * If the element `U` does not appear, it returns `-1`.
 * 
 * @example
 * type IndexOf1 = IndexOf<[0, 0, 0], 2> // -1
 * type IndexOf2 = IndexOf<[string, 1, number, "a"], number> // 2
 * type IndexOf3 = IndexOf<[string, 1, number, "a", any], any> // 4
 * type IndexOf4 = IndexOf<[string, "a"], "a"> // 1
 */
export type IndexOf<T extends unknown[], U, Index extends unknown[] = []> = 
	T extends [infer Item, ...infer Items]
		? Equals<Item, U> extends true
			? Index["length"]
			: IndexOf<Items, U, [...Index, Item]>
		: -1;