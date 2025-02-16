import type { DropChar } from "./string-mappers.js"

/**
 * @internals
 */
type InternalPercentageParser<
    Percentage extends string,
    Sign extends string = "",
    Num extends string = "",
    Unit extends string = "",
> = Percentage extends `${infer Char}${infer Chars}`
    ? Char extends "+" | "-"
        ? InternalPercentageParser<Chars, Char, Num, Unit>
        : Char extends "%"
          ? InternalPercentageParser<Chars, Sign, Num, "%">
          : Char extends `${number}`
            ? InternalPercentageParser<Chars, Sign, `${Num}${Char}`, Unit>
            : Char extends "." | ","
              ? InternalPercentageParser<Char, Sign, `${Num}${Char}`, Unit>
              : never
    : [Sign, Num, Unit]

/**
 * Parses a percentage string into a tuple of [Sign, Number, Unit].
 * - `Sign` can be "+" or "-" or an empty string if no sign is present.
 * - `Number` is the numerical part of the percentage.
 * - `Unit` is the percentage symbol "%" or an empty string if no unit is present.
 *
 * @param {string} Percentage - The percentage string to parse
 * @example
 * // Expected: ["-", "12", ""]
 * type Test1 = PercentageParser<"-12">;
 *
 * // Expected: ["+", "89", "%"]
 * type Test2 = PercentageParser<"+89%">;
 */
export type PercentageParser<Percentage extends string> = InternalPercentageParser<Percentage, "", "", "">

/**
 * Returns the absolute version of a number, string or bigint as a string
 *
 * @param {number | string | bigint} Expression - The number, string or bigint to convert
 * @example
 * // Expected: "2024"
 * type Positive = Absolute<2024>;
 *
 * // Expected: "2024"
 * type PositiveString = Absolute<"-2024">;
 */
export type Absolute<Expression extends number | string | bigint> = DropChar<`${Expression}`, "-" | "n">

/**
 * Truncates a number to its integer part.
 *
 * @param {string | number | bigint} Math - The number to truncate
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
      : `${Math}`

/**
 * Creates a series of numbers between the range of `Low` and `High`. This utility type
 * is internally used by `NumberRange`.
 *
 * @link `NumberRange`
 */
type InternalNumberRange<
    Low extends number,
    High extends number,
    Range extends unknown = never,
    Index extends unknown[] = [],
    LowRange extends boolean = false,
> = Index["length"] extends Low
    ? InternalNumberRange<Low, High, Range | Index["length"], [...Index, 1], true>
    : Index["length"] extends High
      ? Range | Index["length"]
      : LowRange extends true
        ? InternalNumberRange<Low, High, Range | Index["length"], [...Index, 1], LowRange>
        : InternalNumberRange<Low, High, Range, [...Index, 1], LowRange>

/**
 * Creates a range of numbers that starts from `Low` and ends in `High`. The range is inclusive
 * and the values should be positive numbers. If the `Low` or `High` values are negative numbers
 * it returns `never`.
 *
 * @param {number} Low - The starting number of the range
 * @param {number} High - The ending number of the range
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
        : InternalNumberRange<Low, High>
