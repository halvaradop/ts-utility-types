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