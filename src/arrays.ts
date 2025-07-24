import type { Equals } from "./test.js"
import type { IsNegative } from "./numbers.js"
import type { DeepNonNullish } from "./deep.js"
import type { Prettify, Nullish } from "./utils.js"
import type { IsArray, IsFunction, IsObject } from "./guards.js"

/**
 * Creates a union type from the literal values of a constant string or number array.
 * This is useful for representing a set of allowed values based on the array elements
 *
 * @param {unknown[]} Array - The array to convert to a union type
 * @example
 * // Expected: "1" | "2" | "3"
 * type Union = TypleToUnion<["1", "2", "3"]>;
 */
export type ArrayToUnion<Array extends readonly unknown[]> = Array extends [infer Item, ...infer Spread]
    ? Item | ArrayToUnion<Spread>
    : never

/**
 * Gets the length (size) of an array.
 *
 * @param {unknown[]} Array - The array to get the length of
 * @example
 * const numbers: number[] = [1, 2, 3, 4, 5];
 * // Expected: 5
 * type SizeOfNumbers = Size<typeof numbers>;
 */
export type Size<Array extends unknown[]> = Array extends unknown[] ? Array["length"] : 0

/**
 * @internal
 */
type InternalFilter<
    Array extends readonly unknown[],
    Predicate,
    Includes extends boolean = true,
    Comparator = ToUnion<Predicate>,
> = Array extends [infer Item, ...infer Spread]
    ? Includes extends true
        ? Item extends Comparator 
            ? [...InternalFilter<Spread, Predicate, Includes>, Item]
            : InternalFilter<Spread, Predicate, Includes>
        : Item extends Comparator 
            ? InternalFilter<Spread, Predicate, Includes>
            : [...InternalFilter<Spread, Predicate, Includes>, Item]
    : []

/**
 * Filter the items of a tuple of elements based in the predicate provided in the
 * generic type.
 *
 * @param {unknown[]} Array - The array to filter
 * @param {unknown} Predicate - The value to filter out
 * @param {boolean} Includes - If true, the predicate is included in the result, otherwise it is excluded
 * @example
 * // Expected: [2]
 * type Filter1 = Filter<[0, 1, 2], 2>
 *
 * // Expected: [0, 1]
 * type Filter2 = Filter<[0, 1, 2], 0 | 1>
 *
 * // Expected: [0, 1]
 * type FilterOut1 = Filter<[0, 1, 2], 2, false>
 *
 * // Expected: [1]
 * type FilterOut2 = Filter<[0, 1, 2], 0 | 2, false>
 */
export type Filter<Array extends unknown[], Predicate, Includes extends boolean = true> = InternalFilter<
    Array,
    Predicate,
    Includes
>

/**
 * Change the relative ordern of the elements of a tuple stype, reversing
 * its order
 *
 * @param {unknown[]} Array - The array to reverse
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
export type Reverse<Array extends unknown[]> = Array extends [infer Item, ...infer Spread] ? [...Reverse<Spread>, Item] : Array

/**
 * @internal
 */
type InternalIndexOf<Array extends unknown[], Match, Index extends unknown[] = []> = Array extends [infer Item, ...infer Spread]
    ? Equals<Item, Match> extends true
        ? Index["length"]
        : InternalIndexOf<Spread, Match, [...Index, Item]>
    : -1

/**
 * Returns the first index where the element `Match` appears in the tuple type `Array`.
 * If the element `Match` does not appear, it returns `-1`.
 *
 * @param {unknown[]} Array - The array to search for the element
 * @param {unknown} Match - The element to search for
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
export type IndexOf<Array extends unknown[], Match> = InternalIndexOf<Array, Match, []>

/**
 * Returns the last index where the element `Match` appears in the tuple type `Array`.
 * If the element `Match` does not appear, it returns `-1`.
 *
 * @param {unknown[]} Array - The array to search for the element
 * @param {unknown} Match - The element to search for
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
export type LastIndexOf<Array extends unknown[], Match> = IndexOf<Reverse<Array>, Match>

/**
 * Helper type to create a tuple with a specific length, repeating a given value
 * Avoids the `Type instantiation is excessively deep and possibly infinite` error
 * @interface
 */
type InternalConstructTuple<
    Length extends number,
    Value extends unknown = unknown,
    Array extends unknown[] = [],
> = Array["length"] extends Length ? Array : InternalConstructTuple<Length, Value, [...Array, Value]>

/**
 * reate a tuple with a defined size, where each element is of a specified type
 *
 * @param {number} Length - The length of the tuple
 * @param {unknown} Value - The value to fill the tuple with
 * @param {unknown[]} Array - The tuple to construct
 * @example
 * // Expected: [unknown, unknown]
 * type TupleSize2 = ConstructTuple<2>;
 *
 * // Expected: ["", ""]
 * type TupleSize3 = ConstructTuple<2, "">;
 */
export type ConstructTuple<Length extends number, Value extends unknown = unknown> = InternalConstructTuple<Length, Value, []>

/**
 * Check if there are duplidated elements inside the tuple
 *
 * @param {unknown[]} Array - The array to check for duplicates
 * @example
 * // Expected: false
 * type TupleNumber1 = HasDuplicatesTuple<[1, 2, 3]>;
 *
 * // Expected: true
 * type TupleNumber2 = HasDuplicatesTuple<[1, 2, 1]>;
 */
export type HasDuplicates<Array extends unknown[]> = Array["length"] extends Uniques<Array>["length"] ? false : true

/**
 * Returns true if all elements within the tuple are equal to `Comparator` otherwise, returns false
 *
 * @param {unknown[]} Array - The array to check if all elements are equal to `Comparator`
 * @param {unknown} Comparator - The value to compare the elements of the array to
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
    : true

/**
 * @internal
 */
type InternalChunk<
    Array extends unknown[],
    Length extends number,
    Build extends unknown[] = [],
    Partition extends unknown[] = [],
> = Array extends [infer Item, ...infer Spread]
    ? [...Partition, Item]["length"] extends Length
        ? InternalChunk<Spread, Length, [...Build, [...Partition, Item]], []>
        : InternalChunk<Spread, Length, Build, [...Partition, Item]>
    : Size<Partition> extends 0
      ? Build
      : [...Build, Partition]

/**
 * Split an array into chunks of a specific length if the last chunk is smaller than the specified length
 * it will returns the last chunk with the remaining elements
 *
 * @param {unknown[]} Array - The array to split into chunks
 * @param {number} Length - The length of each chunk
 * @example
 * // Expected: [[1, 2], [3, 4], [5]]
 * type Chunk1 = Chunk<[1, 2, 3, 4, 5], 2>;
 *
 * // Expected: [[1, 2, 3], [4, 5]]
 * type Chunk2 = Chunk<[1, 2, 3, 4, 5], 3>;
 */
export type Chunk<Array extends unknown[], Length extends number> = InternalChunk<Array, Length, [], []>

/**
 * Join the elements of two arrays in a tuple of arrays
 *
 * @param {unknown[]} Array1 - The first array to join
 * @param {unknown[]} Array2 - The second array to join
 * @example
 * // Expected: [[1, "a"], [2, "b"], [3, "c"]]
 * type Zip1 = Zip<[1, 2, 3], ["a", "b", "c"]>;
 *
 * // Expected: [[1, "a"], [2, "b"]]
 * type Zip2 = Zip<[1, 2, 3], ["a", "b"]>;
 */
export type Zip<Array1 extends unknown[], Array2 extends unknown[]> = Array1 extends [infer ItemT, ...infer SpreadT]
    ? Array2 extends [infer ItemU, ...infer SpreadU]
        ? [[ItemT, ItemU], ...InternalZip<SpreadT, SpreadU>]
        : InternalZip<SpreadT, SpreadU>
    : []

/**
 * Returns the flatten type of an array.
 *
 * @param {unknown[]} Array - The array to flatten
 * @example
 * // Expected: number
 * type Flatten1 = Flatten<number[][]>;
 *
 * // Expected: string
 * type Flatten2 = Flatten<string[][][]>;
 */
export type Flatten<Array> = Array extends (infer Type)[] ? Flatten<Type> : Array

/**
 * Compare the length of two arrays, returning 1 if the first array is longer,
 * -1 if the second array is longer, and 0 if they are equal
 *
 * @param {unknown[]} T - The first array to compare
 * @param {unknown[]} U - The second array to compare
 * @example
 * // Expected: 1
 * type Compare1 = CompareArrayLength<[1, 2, 3], [1, 2]>;
 *
 * // Expected: -1
 * type Compare2 = CompareArrayLength<[1, 2], [1, 2, 3]>;
 *
 * // Expected: 0
 * type Compare3 = CompareArrayLength<[1, 2, 3], [1, 2, 3]>;
 */
export type CompareArrayLength<T extends any[], U extends any[]> = T extends [any, ...infer SpreadT]
    ? U extends [any, ...infer SpreadU]
        ? CompareArrayLength<SpreadT, SpreadU>
        : 1
    : Size<U> extends 0
      ? 0
      : -1

/**
 * @internal
 */
type InternalUniques<Array extends unknown[], Uniques extends unknown = never, Set extends unknown[] = []> = Array extends [
    infer Item,
    ...infer Spread,
]
    ? Includes<Set, Item> extends true
        ? InternalUniques<Spread, Uniques, Set>
        : InternalUniques<Spread, Uniques | Item, [...Set, Item]>
    : Set

/**
 * Returns the uniques values of an array
 *
 * @param {unknown[]} Array - The array to get the unique values from
 * @example
 * // Expected: [1, 2, 3, 4, 5]
 * type Uniques1 = Unique<[1, 2, 3, 3, 4, 4, 5]>;
 *
 * // Expected: ["a", "b", "c"]
 * type Uniques2 = Unique<["a", "b", "c", "a", "b"]>;
 */
export type Uniques<Array extends unknown[]> = InternalUniques<Array>

/**
 * Create an union type based in the literal values of the tuple provided.
 * This utility type is similar to `ArrayToUnion` but this utility type
 * receive whatever type
 *
 * @param {unknown} T - The tuple to convert to a union type
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
export type ToUnion<T> = T extends [infer Item, ...infer Spread] ? Item | ToUnion<Spread> : T

/**
 * Check if a value exists within a tuple and is equal to a specific value
 *
 * @param {unknown[]} Array - The array to search for the element
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
    : false

/**
 * TODO: is it the correct location for this type?
 *
 * Determines the primitive type corresponding to the provided value.
 *
 * @param {unknown} T - The value to get the type of
 * @example
 * // Expected: number
 * type TypeOfValue = ReturnTypeOf<123>
 *
 * // Expected: string
 * type TypeOfValue = ReturnTypeOf<"hello">
 */
export type ReturnTypeOf<T> = T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : IsObject<T> extends true
          ? object
          : IsFunction<T> extends true
            ? Function
            : IsArray<T> extends true
              ? T
              : T

/**
 * @internal
 */
type InternalTake<
    N extends number,
    Array extends unknown[],
    Negative = IsNegative<N>,
    Build extends unknown[] = [],
> = `${N}` extends `${Build["length"]}` | `-${Build["length"]}`
    ? Build
    : Negative extends true
      ? Array extends [...infer Spread, infer Item]
          ? InternalTake<N, Spread, Negative, [Item, ...Build]>
          : Build
      : Array extends [infer Item, ...infer Spread]
        ? InternalTake<N, Spread, Negative, [...Build, Item]>
        : Build

/**
 * Extracts the first `N` elements from an array. If `N` is negative,
 * it extracts the last `N` elements.
 *
 * @param {number} N - The number of elements to extract
 * @param {unknown[]} Array - The array to extract elements from
 * @example
 * // Expected: [1, 2]
 * type Take1 = Take<2, [1, 2, 3, 4]>;
 *
 * // Expected: [3, 4]
 * type Take2 = Take<-2, [1, 2, 3, 4]>;
 */
export type Take<N extends number, Array extends unknown[]> = InternalTake<N, Array>

/**
 * Removes all nullish values from the provided array. This utility type implements the
 * `DeepNonNullish` type to ensure that all nested objects are also checked for nullish values.
 *
 * @param {unknown[]} Array - The array to filter
 */
export type FilterNonNullish<Array extends unknown[]> = Array extends [infer Item, ...infer Spread]
    ? Item extends Nullish
        ? FilterNonNullish<Spread>
        : IsObject<Item> extends true
          ? [Prettify<DeepNonNullish<Item & {}>>, ...FilterNonNullish<Spread>]
          : [Item, ...FilterNonNullish<Spread>]
    : Array
