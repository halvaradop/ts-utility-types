import type { Equals } from "./test";
import type { ArgsFunction, LetterToLowercase, LetterToUppercase, WhiteSpaces } from "./types";

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
 * @example
 * type LastItem = Last<1, 2, 3, 4> // 4
 */
export type Last<T extends unknown[]> = T extends [...any, infer Last] ? Last : never;

/**
 * Removes the last element from an array and returns a new array type with all elements 
 * except the last. If the array is empty, returns an empty array type
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
 * @example
 * function add(x: number, y: number): number { 
 *     return x + y; 
 * }
 * type AddParams = Parameters<typeof add>; // AddParams = [number, number]
 */
export type Parameters<T extends ArgsFunction> = T extends (...args: infer P) => void ? P : never;

/**
 * Create a new type with a subset of properties from an object
 */
export type Pick<T extends object, K extends keyof T> = {
	[Property in K]: T[Property]
};

/**
 * Check if a value exists within a tuple and is equal to a specific value.as
 */
export type Includes<T extends unknown[], U> = T extends [infer Compare, ...infer Items]
	? Equals<Compare, U> extends true
		? true 
		: Includes<Items, U>
	: false;

/**
 * Creates a new type that omits properties from an object type based on another type
 * @example
 * type Person = { name: string; age: number; email: string };
 * type NoEmailPerson = Omit<Person, "email">;  // NoEmailPerson = { name: string; age: number }
 */
export type Omit<T extends object, U> = {
	[Property in keyof T as Property extends U ? never : Property]: T[Property]
};

/**
 * Removes leading whitespace characters from a string type
 * @example
 * type Str = "  hello world  ";
 * type TrimmedLeft = TrimLeft<Str>; // TrimmedLeft = "hello world  "
 */
export type TrimLeft<S extends string> = S extends `${WhiteSpaces}${infer Characters}`
	? TrimLeft<Characters>
	: S
/**
 * Removes trailing whitespace characters from a string type
 * @example
 * type Str = "hello world  ";
 * type TrimmedRight = TrimRight<Str>; // TrimmedRight = "hello world"
 */
export type TrimRight<S extends string> = S extends `${infer Char}${WhiteSpaces}`
	? TrimRight<Char>
	: S;

/**
 * Removes leading and trailing whitespace characters from a string type
 * @example
 * type Str = "  hello world  ";
 * type Trimmed = Trim<Str>; // Trimmed = "hello world"
 */
export type Trim<S extends string> = S extends `${WhiteSpaces}${infer Characters}`
	? Trim<Characters>
	: S extends `${infer Char}${WhiteSpaces}`
		? Trim<Char>
		: S;

/**
 *  Converts a string to uppercase
 */
export type Uppercase<S extends string> = S extends `${infer Char}${infer Characters}` 
	? Char extends keyof LetterToUppercase 
		? `${LetterToUppercase[Char]}${Uppercase<Characters>}`
		: `${Char}${Uppercase<Characters>}`
	: S;

/**
 * Converts a string to lowercase
 */
export type Lowercase<S extends string> = S extends `${infer Char}${infer Characters}` 
	? Char extends keyof LetterToLowercase 
		? `${LetterToLowercase[Char]}${Lowercase<Characters>}`
		: `${Char}${Lowercase<Characters>}`
	: S;

/**
 * Capitalizes the first letter of a word and converts the rest to lowercase
 */
export type Capitalize<S extends string, F extends boolean = true> = S extends `${infer Char}${infer Characters}`
	? F extends boolean
		? F extends true
			? `${Uppercase<Char>}${Capitalize<Characters, false>}`
			: Char extends " "
				? ` ${Capitalize<Characters, true>}`
				: `${Lowercase<Char>}${Capitalize<Characters, false>}`
		: S
	: S;

/**
 * Creates a union of the keys of two objects
 */
export type Properties<T1 extends object, T2 extends object> = keyof T1 | keyof T2;

/**
 * Creates a new object by merging two objects. Properties from `S` override properties 
 * from `F` if they have the same key
 */
export type Merge<T1 extends object, T2 extends object> = {
	[Property in Properties<T1, T2>]: Property extends keyof T2
		? T2[Property]
		: Property extends keyof T1
			? T1[Property]
			: never;
};

/**
 * Create a new object based in the difference keys between the objects.
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
	]: P extends keyof O1 
		? O1[P]
		: P extends keyof O2
			? O2[P]
			: never;
};