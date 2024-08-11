import type { LetterToLowercase, LetterToUppercase, WhiteSpaces } from "./types";

/**
 * Removes leading whitespace characters from a string type
 * @example
 * type Str = "  hello world  ";
 * type TrimmedLeft = TrimLeft<Str>; // TrimmedLeft = "hello world  "
 */
export type TrimLeft<S extends string> = S extends `${WhiteSpaces}${infer Characters}`
	? TrimLeft<Characters>
	: S;

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
 * Create a string type based on the values of a tuple type `T`, joining the values
 * separated by the `Separator` character. The separator can be either a string or a number.
 * 
 * @example
 * type Join1 = Join<["a", "p", "p", "l", "e"], "-"> // "a-p-p-l-e"
 * type Join2 = Join<["Hello", "World"], " "> // "Hello World"
 */
export type Join<T extends unknown[], Separator extends number | string, Str extends string = ""> = 
	T extends [infer Char, ...infer Chars]
		? Join<Chars, Separator, `${Str}${Str extends "" ? "" : Separator}${Char & string}`>
		: Str;

/**
 * Checks if a string type matchs start with a strig `U`
 * 
 * @example
 * type Test1 = StartsWith<'abc', 'ac'> // false
 * type Test2 = StartsWith<'abc', 'ab'> // true
 * type Test3 = StartsWith<'abc', 'abcd'> // false
 */
export type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false;

/**
 * Returns a new string type by removing all occurrences of the character `Match` from the string `Str`
 * 
 * @example
 * type Test1 = DropChar<'butter fly!', ''> // butterfly!
 * type Test2 = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
 */
export type DropChar<Str extends string, Match extends string, Build extends string = ""> = Str extends `${infer Char}${infer Chars}`
	? DropChar<Chars, Match, Char extends Match ? Build : `${Build}${Char}`>
	: Build;

/**
 * Checks if a string type matchs start with a strig `U`
 * 
 * @example
 * type Test1 = EndsWith<'abc', 'bc'> // true
 * type Test2 = EndsWith<'abc', 'ac'> // false
 */
export type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false;

/**
 * Returns the length of a string type
 * 
 * @example
 * type Length2 = LengthOfString<"foo"> // 3
 * type Length6 = LengthOfString<"foobar"> // 6
 */
export type LengthOfString<Str extends string, Length extends unknown[] = []> = Str extends `${infer Char}${infer Chars}`
	? LengthOfString<Chars, [...Length, Char]>
	: Length["length"];