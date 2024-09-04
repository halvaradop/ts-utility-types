import type { DropChar } from "./string-mappers";
import type { Equals } from "./test";
import type { ArgsFunction, ReturnTypeOf } from "./types";

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
 * Creates a union type from the literal values of a constant string or number array.
 * This is useful for representing a set of allowed values based on the array elements
 *
 * @example
 * // Expected: "1" | "2" | "3"
 * type Union = TypleToUnion<["1", "2", "3"]>;
 */
export type TupleToUnion<Array extends readonly unknown[]> = Array extends [infer Item, ...infer Spread]
	? Item | TupleToUnion<Spread>
	: never;

/**
 * Gets the length (size) of an array.
 *
 * @example
 * const numbers: number[] = [1, 2, 3, 4, 5];
 * // Expected: 5
 * type SizeOfNumbers = Size<typeof numbers>;
 */
export type Size<Array extends unknown[]> = Array extends unknown[] ? Array["length"] : 0;

/**
 * Gets the type of the last element in an array, or `never` if the array is empty.
 *
 * @example
 * // Expected: 4
 * type LastItem = Last<1, 2, 3, 4>;
 */
export type Last<Array extends unknown[]> = Array extends [...any, infer Last] ? Last : never;

/**
 * Removes the last element from an array and returns a new array type with all elements
 * except the last. If the array is empty, returns an empty array type
 *
 * @example
 * // Expected: ["a", "b"]
 * type PopStr = Pop<["a", "b", "c"]>;
 *
 * // Expected: [1, 2]
 * type PopNums = Pop<[1, 2, 3]>;
 */
export type Pop<Array extends unknown[]> = Array extends [...infer Spread, unknown] ? Spread : [];

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

type FilterImplementation<Array extends unknown[], Predicate, Build extends unknown[] = []> = Array extends [
	infer Item,
	...infer Spread,
]
	? FilterImplementation<Spread, Predicate, Item extends Predicate ? [...Build, Item] : [...Build]>
	: Build;

/**
 * Filter the items of a tuple of elements based in the predicate provided in the
 * generic type.
 *
 * @example
 * // Expected: [2]
 * type Filter1 = Filter<[0, 1, 2], 2>
 *
 * // Expected: [0, 1]
 * type Filter2 = Filter<[0, 1, 2], 0 | 1>
 */
export type Filter<Array extends unknown[], Predicate> = FilterImplementation<Array, Predicate, []>;

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

type FilterOutImplementation<Array extends readonly unknown[], Predicate, Build extends unknown[] = []> = Array extends [
	infer Item,
	...infer Spread,
]
	? FilterOutImplementation<Spread, Predicate, Item extends ToUnion<Predicate> ? Build : [...Build, Item]>
	: Build;

/**
 * Cleans the elements of a tuple based in the predicated, it returns the values that
 * does not match with the predicated
 *
 * @example
 * // Expected: [1, 2, 3]
 * type CleanNumbers = FilterOut<[1, 2, 3, 4, 5], [4, 5]>;
 *
 * // Expected: ["bar", "foobar"]
 * type CleanStrings = FilterOut<["foo", "bar", "foobar"], "foo">;
 */
export type FilterOut<Array extends readonly unknown[], Predicate> = FilterOutImplementation<Array, Predicate, []>;

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
 * Change the relative ordern of the elements of a tuple type, reversing
 * its order
 *
 * @example
 * // Expected: [1, 2, 3, 4]
 * type ReverseNumbers = Reverse<[1, 2, 3, 4]>;
 *
 * // Expected: ["a", "b", "c"]
 * type ReverseStrings = Reverse<["a", "b", "c"]>;
 *
 * // Expected: [() => void, { foo: number }, "bar", 2, "foo", 1]
 * type ReverseArray = Reverse<[1, "foo", 2, "bar", { foo: number }, () => void]>;
 */
export type Reverse<Array extends unknown[]> = Array extends [infer Item, ...infer Spread] ? [...Reverse<Spread>, Item] : Array;

type IndexOfImplementation<Array extends unknown[], Match, Index extends unknown[] = []> = Array extends [
	infer Item,
	...infer Spread,
]
	? Equals<Item, Match> extends true
		? Index["length"]
		: IndexOfImplementation<Spread, Match, [...Index, Item]>
	: -1;

/**
 * Returns the first index where the element `Match` appears in the tuple type `Array`.
 * If the element `Match` does not appear, it returns `-1`.
 *
 * @example
 * // Expected: -1
 * type IndexOf1 = IndexOf<[0, 0, 0], 2>;
 *
 * // Expected: 2
 * type IndexOf2 = IndexOf<[string, 1, number, "a"], number>;
 *
 * // Expected: 4
 * type IndexOf3 = IndexOf<[string, 1, number, "a", any], any>;
 *
 * // Expected: 1
 * type IndexOf4 = IndexOf<[string, "a"], "a">;
 */
export type IndexOf<Array extends unknown[], Match> = IndexOfImplementation<Array, Match, []>;

type LastIndexOfImplementation<
	Array extends unknown[],
	Match,
	Index extends unknown[] = [],
	IndexOf extends unknown[] = [],
> = Array extends [infer Item, ...infer Spread]
	? LastIndexOfImplementation<
			Spread,
			Match,
			[...Index, Item],
			Equals<Item, Match> extends true ? [...IndexOf, Index["length"]] : IndexOf
		>
	: IndexOf extends [...any, infer LastIndex]
		? LastIndex
		: -1;

/**
 * Returns the last index where the element `Match` appears in the tuple type `Array`.
 * If the element `Match` does not appear, it returns `-1`.
 *
 * @example
 * // Expected: 3
 * type LastIndexOf1 = LastIndexOf<[1, 2, 3, 2, 1], 2> ;
 *
 * // Expected: 7
 * type LastIndexOf2 = LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>;
 *
 * // Expected: 4
 * type LastIndexOf3 = LastIndexOf<[string, 2, number, "a", number, 1], number>;
 *
 * // Expected: 5
 * type LastIndexOf4 = LastIndexOf<[string, any, 1, number, "a", any, 1], any>;
 */
export type LastIndexOf<Array extends unknown[], Match> = LastIndexOfImplementation<Array, Match, [], []>;

/**
 * Parses a percentage string into a tuple of [Sign, Number, Unit].
 * - `Sign` can be "+" or "-" or an empty string if no sign is present.
 * - `Number` is the numerical part of the percentage.
 * - `Unit` is the percentage symbol "%" or an empty string if no unit is present.
 *
 * @example
 * // Expected: ["-", "12", ""]
 * type Test1 = PercentageParser<"-12">;
 *
 * // Expected: ["+", "89", "%"]
 * type Test2 = PercentageParser<"+89%">;
 */
export type PercentageParser<
	Percentage extends string,
	Sign extends string = "",
	Num extends string = "",
	Unit extends string = "",
> = Percentage extends `${infer Char}${infer Chars}`
	? Char extends "+" | "-"
		? PercentageParser<Chars, Char, Num, Unit>
		: Char extends "%"
			? PercentageParser<Chars, Sign, Num, "%">
			: Char extends `${number}`
				? PercentageParser<Chars, Sign, `${Num}${Char}`, Unit>
				: Char extends "." | ","
					? PercentageParser<Char, Sign, `${Num}${Char}`, Unit>
					: never
	: [Sign, Num, Unit];

/**
 * Helper type to create a tuple with a specific length, repeating a given value
 * Avoids the `Type instantiation is excessively deep and possibly infinite` error
 */
type RepeatConstructTuple<
	Length extends number,
	Value extends unknown = unknown,
	Array extends unknown[] = [],
> = Array["length"] extends Length ? Array : RepeatConstructTuple<Length, Value, [...Array, Value]>;

/**
 * reate a tuple with a defined size, where each element is of a specified type
 *
 * @example
 * // Expected: [unknown, unknown]
 * type TupleSize2 = ConstructTuple<2>;
 *
 * // Expected: ["", ""]
 * type TupleSize3 = ConstructTuple<2, "">;
 */
export type ConstructTuple<
	Length extends number,
	Value extends unknown = unknown,
	Array extends unknown[] = [],
> = RepeatConstructTuple<Length, Value, Array>;

type CheckRepeatedTupleImplementation<Array extends unknown[], Build extends unknown = never> = Array extends [
	infer Item,
	...infer Spread,
]
	? Item extends Build
		? true
		: CheckRepeatedTupleImplementation<Spread, Build | Item>
	: false;

/**
 * Check if there are duplidated elements inside the tuple
 *
 * @example
 * // Expected: false
 * type TupleNumber1 = CheckRepeatedTuple<[1, 2, 3]>;
 *
 * // Expected: true
 * type TupleNumber2 = CheckRepeatedTuple<[1, 2, 1]>;
 */
export type CheckRepeatedTuple<Tuple extends unknown[]> = CheckRepeatedTupleImplementation<Tuple>;

/**
 * Returns the absolute version of a number, string or bigint as a string
 */
export type Absolute<Expression extends number | string | bigint> = DropChar<`${Expression}`, "-" | "n">;

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
 * Returns true if all elements within the tuple are equal to `Comparator` otherwise, returns false
 *
 * @example
 * // Expected: true
 * type Test1 = AllEquals<[number, number, number], number>;
 *
 * // Expected: true
 * type Test2 = AllEquals<[[1], [1], [1]], [1]>;
 */
export type AllEquals<Array extends unknown[], Comparator> = Array extends [infer Item, ...infer Spread]
	? Equals<Item, Comparator> extends true
		? AllEquals<Spread, Comparator>
		: false
	: true;

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
 * Truncates a number to its integer part.
 *
 * @example
 * // Expected: 3
 * type Truncated = Trunc<3.14>;
 *
 * // Expected: -2
 * type TruncatedNegative = Trunc<-2.99>;
 */
export type Trunc<Math extends string | number | bigint> = `${Math}` extends `.${number}`
	? "0"
	: `${Math}` extends `${infer Chars}.${number}`
		? Chars extends `-0${string}`
			? "0"
			: Chars
		: `${Math}`;

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

type ChunkImplementation<
	Array extends unknown[],
	Size extends number,
	Build extends unknown[] = [],
	Partition extends unknown[] = [],
> = Array extends [infer Item, ...infer Spread]
	? [...Partition, Item]["length"] extends Size
		? ChunkImplementation<Spread, Size, [...Build, [...Partition, Item]], []>
		: ChunkImplementation<Spread, Size, Build, [...Partition, Item]>
	: Partition["length"] extends 0
		? Build
		: [...Build, Partition];

export type Chunk<Array extends unknown[], Size extends number> = ChunkImplementation<Array, Size, [], []>;

type ZipImplementation<T, U, Build extends unknown[] = []> = T extends [infer ItemT, ...infer SpreadT]
	? U extends [infer ItemU, ...infer SpreadU]
		? ZipImplementation<SpreadT, SpreadU, [...Build, [ItemT, ItemU]]>
		: Build
	: Build;

/**
 * Join the elements of two arrays in a tuple of arrays
 *
 * @example
 * // Expected: [[1, "a"], [2, "b"], [3, "c"]]
 * type Zip1 = Zip<[1, 2, 3], ["a", "b", "c"]>;
 *
 * // Expected: [[1, "a"], [2, "b"]]
 * type Zip2 = Zip<[1, 2, 3], ["a", "b"]>;
 */
export type Zip<Array1 extends unknown[], Array2 extends unknown[]> = ZipImplementation<Array1, Array2>;

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

/**
 * Creates a series of numbers between the range of `Low` and `High`. This utility type
 * is internally used by `NumberRange`.
 *
 * @link `NumberRange`
 */
type NumberRangeImplementation<
	Low extends number,
	High extends number,
	Range extends unknown = never,
	Index extends unknown[] = [],
	LowRange extends boolean = false,
> = Index["length"] extends Low
	? NumberRangeImplementation<Low, High, Range | Index["length"], [...Index, 1], true>
	: Index["length"] extends High
		? Range | Index["length"]
		: LowRange extends true
			? NumberRangeImplementation<Low, High, Range | Index["length"], [...Index, 1], LowRange>
			: NumberRangeImplementation<Low, High, Range, [...Index, 1], LowRange>;

/**
 * Creates a range of numbers that starts from `Low` and ends in `High`. The range is inclusive
 * and the values should be positive numbers. If the `Low` or `High` values are negative numbers
 * it returns `never`.
 *
 * @example
 * // Expected: 1 | 2 | 3 | 4 | 5
 * type Range1 = NumberRange<1, 5>;
 *
 * // Expected: never
 * type Range2 = NumberRange<-1, 5>;
 */
export type NumberRange<Low extends number, High extends number> = `${Low}` extends `-${number}`
	? never
	: `${High}` extends `-${number}`
		? never
		: Low extends High
			? Low
			: NumberRangeImplementation<Low, High>;
