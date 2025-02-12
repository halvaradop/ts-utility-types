import type { Equals } from "./test.js"
import type { WhiteSpaces } from "./types.js"

/**
 * Removes leading whitespace characters from a string type
 *
 * @param {string} Str - The string to trim
 * @example
 * // Expected: "hello world  "
 * type TrimmedLeft = TrimLeft<"  hello world  ">;
 */
export type TrimLeft<Str extends string> = Str extends `${WhiteSpaces}${infer Characters}` ? TrimLeft<Characters> : Str

/**
 * Removes trailing whitespace characters from a string type
 *
 * @param {string} Str - The string to trim
 * @example
 * // Expected: "hello world"
 * type TrimmedRight = TrimRight<"hello world  ">;
 */
export type TrimRight<Str extends string> = Str extends `${infer Char}${WhiteSpaces}` ? TrimRight<Char> : Str

/**
 * Removes leading and trailing whitespace characters from a string type
 *
 * @param {string} Str - The string to trim
 * @example
 * // Expected: "hello world"
 * type Trimmed = Trim<"  hello world  ">;
 */
export type Trim<Str extends string> = Str extends `${WhiteSpaces}${infer Characters}`
    ? Trim<Characters>
    : Str extends `${infer Char}${WhiteSpaces}`
      ? Trim<Char>
      : Str

/**
 * TODO: add example and fix the type
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
    : Str

/**
 * @internal
 */
type JoinImplementation<Array extends unknown[], Separator extends number | string, Str extends string = ""> = Array extends [
    infer Char,
    ...infer Chars,
]
    ? JoinImplementation<Chars, Separator, `${Str}${Str extends "" ? "" : Separator}${Char & string}`>
    : Str

/**
 * Create a string type based on the values of a tuple type `T`, joining the values
 * separated by the `Separator` character. The separator can be either a string or a number.
 *
 * @param {Array} Array - The tuple to join
 * @param {string | number} Separator - The separator to use
 * @example
 * // Expected: "a-p-p-l-e"
 * type Join1 = Join<["a", "p", "p", "l", "e"], "-">
 *
 * // Expected: "Hello World"
 * type Join2 = Join<["Hello", "World"], " ">
 */
export type Join<Array extends unknown[], Separator extends number | string> = JoinImplementation<Array, Separator>

/**
 * Checks if a string type matchs start with a strig `U`
 *
 * @param {string} Str - The string to check
 * @param {string} Match - The string to match
 * @example
 * // Expected: false
 * type Test1 = StartsWith<"abc", "ac">
 *
 * // Expected: true
 * type Test2 = StartsWith<"abc", "ab">
 *
 * // Expected: false
 * type Test3 = StartsWith<"abc", "abcd">
 */
export type StartsWith<Str extends string, Match extends string> = Str extends `${Match}${string}` ? true : false

/**
 * @internal
 */
type DropCharImplementation<
    Str extends string,
    Match extends string,
    Build extends string = "",
> = Str extends `${infer Char}${infer Chars}`
    ? DropCharImplementation<Chars, Match, Char extends Match ? Build : `${Build}${Char}`>
    : Build

/**
 * Returns a new string type by removing all occurrences of the character `Match` from the string `Str`
 *
 * @param {string} Str - The string to remove characters from
 * @param {string} Match - The character to remove
 * @example
 * // Expected: butterfly!
 * type Test1 = DropChar<"butter fly!", "">
 *
 * // Expected: "butterfly!"
 * type Test2 = DropChar<" b u t t e r f l y ! ", " ">
 */
export type DropChar<Str extends string, Match extends string> = DropCharImplementation<Str, Match>

/**
 * Checks if a string type matchs start with a strig `Match`
 *
 * @param {string} Str - The string to check
 * @param {string} Match - The string to match
 * @example
 * // Expected: true
 * type Test1 = EndsWith<"abc", "bc">
 *
 * // Expected: false
 * type Test2 = EndsWith<"abc", "ac">
 */
export type EndsWith<Str extends string, Match extends string> = Str extends `${string}${Match}` ? true : false

/**
 * @internal
 */
type LengthOfStringImplementation<Str extends string, Length extends unknown[] = []> = Str extends `${infer Char}${infer Chars}`
    ? LengthOfStringImplementation<Chars, [...Length, Char]>
    : Length["length"]

/**
 * Returns the length of a string type
 *
 * @param {string} Str - The string to get the length of
 * @example
 * // Expected: 3
 * type Length2 = LengthOfString<"foo">
 *
 * // Expected: 6
 * type Length6 = LengthOfString<"foobar">
 */
export type LengthOfString<Str extends string> = LengthOfStringImplementation<Str>

/**
 * @internal
 */
type IndexOfStringImplementation<
    Str extends string,
    Match extends string,
    Index extends unknown[] = [],
> = Str extends `${infer Char}${infer Chars}`
    ? Equals<Char, Match> extends true
        ? Index["length"]
        : IndexOfStringImplementation<Chars, Match, [...Index, 1]>
    : -1

/**
 * Returns the first index of the character that matches `Match`.
 * Otherwise, it returns -1.
 *
 * @param {string} Str - The string to search
 * @example
 * // Expected: 12
 * type IndexOfA = IndexOfString<"comparator is a function", "i">
 *
 * // Expected: -1
 * type IndexOfOutBound = IndexOfString<"comparator is a function", "z">
 */
export type IndexOfString<Str extends string, Match extends string> = IndexOfStringImplementation<Str, Match>

/**
 * @internal
 */
type FirstUniqueCharIndexImplementation<
    Str extends string,
    Index extends unknown[] = [],
    Build extends string = "",
> = Str extends `${infer Char}${infer Chars}`
    ? IndexOfString<Chars, Char> extends -1
        ? Char extends Build
            ? FirstUniqueCharIndexImplementation<Chars, [...Index, 1], Char | Build>
            : Index["length"]
        : FirstUniqueCharIndexImplementation<Chars, [...Index, 1], Char | Build>
    : -1

/**
 * Returns the first index of a character that is unique within the given string.
 * If all of the characters are repeated, it returns -1.
 *
 * @param {string} Str - The string to search
 * @example
 * // Expected: 3
 * type IndexOfC = FirstUniqueCharIndex<"aabcb">
 *
 * // Expected: -1
 * type IndexOfOutBound = FirstUniqueCharIndex<"aabbcc">
 */
export type FirstUniqueCharIndex<Str extends string> = FirstUniqueCharIndexImplementation<Str>

/**
 * Replaces the first match of the substring `From` in the string `S` with the new value `To`
 *
 * @param {string} S - The string to replace
 * @param {string} From - The substring to replace
 * @param {string} To - The new value
 * @example
 * // Expected: "foofoo"
 * type Replace1 = Replace<"foobar", "bar", "foo">
 *
 * // Expected: "foofoobar"
 * type Replace2 = Replace<"foobarbar", "bar", "foo">
 */
export type Replace<S extends string, From extends string, To extends string> = From extends ""
    ? S
    : S extends `${infer Head}${From}${infer Tail}`
      ? `${Head}${To}${Tail}`
      : S

/**
 * @internal
 */
type CheckRepeatedCharsImplementation<
    Str extends string,
    Characters extends string = "",
> = Str extends `${infer Char}${infer Chars}`
    ? Char extends Characters
        ? true
        : CheckRepeatedCharsImplementation<Chars, Characters | Char>
    : false

/**
 * Check if there are repeated characters in a string type
 *
 * @param {string} Str - The string to check
 * @example
 * // Expected: false
 * type Check11 = CheckRepeatedChars<"hello">
 *
 * // Expected: true
 * type Check1 = CheckRepeatedChars<"hello world">
 */
export type CheckRepeatedChars<Str extends string> = CheckRepeatedCharsImplementation<Str>

/**
 * @internal
 */
type ParseUrlParamsImplementation<
    URLParams extends string,
    Params extends string = never,
> = URLParams extends `${infer Segment}/${infer Route}`
    ? Segment extends `:${infer WithoutDots}`
        ? ParseUrlParamsImplementation<Route, Params | WithoutDots>
        : ParseUrlParamsImplementation<Route, Params>
    : URLParams extends `:${infer WithoutDots}`
      ? Params | WithoutDots
      : Params

/**
 * eturns a union type of the dynamic route parameters in a URL pattern
 *
 * @param {string} URLParams - The URL pattern
 * @example
 * // Expected: "id"
 * type Test1 = ParseUrlParams<"users/:id">
 *
 * // Expected: "id" | "postId"
 * type Test2 = ParseUrlParams<"users/:id/posts/:postId">
 */
export type ParseUrlParams<URLParams extends string> = ParseUrlParamsImplementation<URLParams>

/**
 * @internal
 */
type FindAllImplementation<
    Str extends string,
    Match extends string,
    Index extends unknown[] = [],
    Indexes extends unknown[] = [],
> = Match extends ""
    ? Indexes
    : Str extends `${any}${infer Characters}`
      ? Str extends `${Match}${string}`
          ? FindAllImplementation<Characters, Match, [...Index, 1], [...Indexes, Index["length"]]>
          : FindAllImplementation<Characters, Match, [...Index, 1], Indexes>
      : Indexes

/**
 * Returns indexes the substring that matches `Match` in the string `Str`
 *
 * @param {string} Str - The string to search
 * @param {string} Match - The substring to search
 * @example
 * // Expected: [4, 7]
 * type Test1 = FindAll<"hello world", "o">
 *
 * // Expected: [2, 3, 9]
 * type Test2 = FindAll<"hello world", "l">
 */
export type FindAll<Str extends string, Match extends string> = FindAllImplementation<Str, Match>
