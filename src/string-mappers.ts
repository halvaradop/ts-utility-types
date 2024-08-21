import type { Equals } from "./test";
import type { LetterToLowercase, LetterToUppercase, WhiteSpaces } from "./types";

/**
 * Removes leading whitespace characters from a string type
 * @example
 * type Str = "  hello world  ";
 * type TrimmedLeft = TrimLeft<Str>; // TrimmedLeft = "hello world  "
 */
export type TrimLeft<Str extends string> = Str extends `${WhiteSpaces}${infer Characters}` ? TrimLeft<Characters> : Str;

/**
 * Removes trailing whitespace characters from a string type
 * @example
 * type Str = "hello world  ";
 * type TrimmedRight = TrimRight<Str>; // TrimmedRight = "hello world"
 */
export type TrimRight<Str extends string> = Str extends `${infer Char}${WhiteSpaces}` ? TrimRight<Char> : Str;

/**
 * Removes leading and trailing whitespace characters from a string type
 * @example
 * type Str = "  hello world  ";
 * type Trimmed = Trim<Str>; // Trimmed = "hello world"
 */
export type Trim<Str extends string> = Str extends `${WhiteSpaces}${infer Characters}`
    ? Trim<Characters>
    : Str extends `${infer Char}${WhiteSpaces}`
      ? Trim<Char>
      : Str;

/**
 *  Converts a string to uppercase
 */
export type Uppercase<Str extends string> = Str extends `${infer Char}${infer Characters}`
    ? Char extends keyof LetterToUppercase
        ? `${LetterToUppercase[Char]}${Uppercase<Characters>}`
        : `${Char}${Uppercase<Characters>}`
    : Str;

/**
 * Converts a string to lowercase
 */
export type Lowercase<Str extends string> = Str extends `${infer Char}${infer Characters}`
    ? Char extends keyof LetterToLowercase
        ? `${LetterToLowercase[Char]}${Lowercase<Characters>}`
        : `${Char}${Lowercase<Characters>}`
    : Str;

/**
 * Capitalizes the first letter of a word and converts the rest to lowercase
 */
export type Capitalize<Str extends string, FirstWord extends boolean = true> = Str extends `${infer Char}${infer Characters}`
    ? FirstWord extends boolean
        ? FirstWord extends true
            ? `${Uppercase<Char>}${Capitalize<Characters, false>}`
            : Char extends " "
              ? ` ${Capitalize<Characters, true>}`
              : `${Lowercase<Char>}${Capitalize<Characters, false>}`
        : Str
    : Str;

/**
 * Create a string type based on the values of a tuple type `T`, joining the values
 * separated by the `Separator` character. The separator can be either a string or a number.
 *
 * @example
 * type Join1 = Join<["a", "p", "p", "l", "e"], "-"> // "a-p-p-l-e"
 * type Join2 = Join<["Hello", "World"], " "> // "Hello World"
 */
export type Join<Array extends unknown[], Separator extends number | string, Str extends string = ""> = Array extends [
    infer Char,
    ...infer Chars,
]
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
export type StartsWith<Str extends string, Match extends string> = Str extends `${Match}${string}` ? true : false;

/**
 * Returns a new string type by removing all occurrences of the character `Match` from the string `Str`
 *
 * @example
 * type Test1 = DropChar<'butter fly!', ''> // butterfly!
 * type Test2 = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
 */
export type DropChar<
    Str extends string,
    Match extends string,
    Build extends string = "",
> = Str extends `${infer Char}${infer Chars}` ? DropChar<Chars, Match, Char extends Match ? Build : `${Build}${Char}`> : Build;

/**
 * Checks if a string type matchs start with a strig `Match`
 *
 * @example
 * type Test1 = EndsWith<'abc', 'bc'> // true
 * type Test2 = EndsWith<'abc', 'ac'> // false
 */
export type EndsWith<Str extends string, Match extends string> = Str extends `${string}${Match}` ? true : false;

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

/**
 * Returns the first index of the character that matches `Match`.
 * Otherwise, it returns -1.
 *
 * @example
 * type IndexOfA = IndexOfString<"comparator is a function", "i"> // 12
 * type IndexOfOutBound = IndexOfString<"comparator is a function", "z"> // -1
 */
export type IndexOfString<
    Str extends string,
    Match extends string,
    Index extends unknown[] = [],
> = Str extends `${infer Char}${infer Chars}`
    ? Equals<Char, Match> extends true
        ? Index["length"]
        : IndexOfString<Chars, Match, [...Index, 1]>
    : -1;

/**
 * Returns the first index of a character that is unique within the given string.
 * If all of the characters are repeated, it returns -1.
 *
 * @example
 * type IndexOfC = FirstUniqueCharIndex<"aabcb"> // 3
 * type IndexOfOutBound = FirstUniqueCharIndex<"aabbcc"> // -1
 */
export type FirstUniqueCharIndex<
    Str extends string,
    Index extends unknown[] = [],
    Build extends string = "",
> = Str extends `${infer Char}${infer Chars}`
    ? IndexOfString<Chars, Char> extends -1
        ? Char extends Build
            ? FirstUniqueCharIndex<Chars, [...Index, 1], Char | Build>
            : Index["length"]
        : FirstUniqueCharIndex<Chars, [...Index, 1], Char | Build>
    : -1;

/**
 * Replaces the first match of the substring `From` in the string `S` with the new value `To`
 *
 * @example
 * type Replace1 = Replace<'foobar', 'bar', 'foo'> // 'foofoo'
 * type Replace2 = Replace<'foobarbar', 'bar', 'foo'> // 'foofoobar'
 */
export type Replace<S extends string, From extends string, To extends string> = From extends ""
    ? S
    : S extends `${infer Head}${From}${infer Tail}`
      ? `${Head}${To}${Tail}`
      : S;
