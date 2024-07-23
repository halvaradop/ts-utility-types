import { Equals } from "./test";
import { WhiteSpaces } from "./types";

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
export type TupleToUnion<T extends readonly any[]> = T extends [infer Item, ...infer Spreed]
    ? Item | TupleToUnion<Spreed>
    : never;


/**
 * Gets the length (size) of an array.
 *
 * @example
 * const numbers: number[] = [1, 2, 3, 4, 5];
 * type SizeOfNumbers = Size<typeof numbers>; // SizeOfNumbers = 5
 */
export type Size<T extends any[]> = T extends any[] ? T["length"] : 0;


/**
 * Gets the type of the last element in an array, or `never` if the array is empty.
 * @example
 * type LastItem = Last<1, 2, 3, 4> // 4
 */
export type Last<T extends any[]> = T extends [...any, infer Last] ? Last : never;

/**
 * Removes the last element from an array and returns a new array type with all elements 
 * except the last. If the array is empty, returns an empty array type
 * @example
 * type PopStr = Pop<["a", "b", "c"]> // ["a", "b"]
 * type PopNums = Pop<[1, 2, 3]> // [1, 2]
 */
export type Pop<T extends any[]> = T extends [...infer Items, any] ? Items : [];

/**
 * Exclude properties of type `U` from type `T`
 */
export type Exclude<T, U> = T extends U ? never : T;

/**
 * Get the type of the resolved value of a PromiseLike object.
 */
export type Awaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R> 
	? R extends PromiseLike<any> 
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
export type Parameters<T extends (...args: any) => void> = T extends (...args: infer P) => void ? P : never;

/**
 * Create a new type with a subset of properties from an object
 */
export type Pick<T extends object, K extends keyof T> = {
	[Property in K]: T[Property]
};

/**
 * Check if a value exists within a tuple and is equal to a specific value.as
 */
export type Includes<T extends any[], U> = T extends [infer Compare, ...infer Items]
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