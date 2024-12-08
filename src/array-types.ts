import type { Equals } from "./test.js"

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
    : never

/**
 * Gets the length (size) of an array.
 *
 * @example
 * const numbers: number[] = [1, 2, 3, 4, 5];
 * // Expected: 5
 * type SizeOfNumbers = Size<typeof numbers>;
 */
export type Size<Array extends unknown[]> = Array extends unknown[] ? Array["length"] : 0

/**
 * Gets the type of the last element in an array, or `never` if the array is empty.
 *
 * @example
 * // Expected: 4
 * type LastItem = Last<1, 2, 3, 4>;
 */
export type Last<Array extends unknown[]> = Array extends [...any, infer Last] ? Last : never

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
export type Pop<Array extends unknown[]> = Array extends [...infer Spread, unknown] ? Spread : []

/**
 * @internal
 */
type FilterImplementation<
    Array extends readonly unknown[],
    Predicate,
    Build extends unknown[] = [],
    Includes extends boolean = true,
    Comparator = ToUnion<Predicate>,
> = Array extends [infer Item, ...infer Spread]
    ? Includes extends true
        ? FilterImplementation<Spread, Predicate, Item extends Comparator ? [...Build, Item] : Build, Includes>
        : FilterImplementation<Spread, Predicate, Item extends Comparator ? Build : [...Build, Item], Includes>
    : Build

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
 *
 * // Expected: [0, 1]
 * type FilterOut1 = Filter<[0, 1, 2], 2, false>
 *
 * // Expected: [1]
 * type FilterOut2 = Filter<[0, 1, 2], 0 | 2, false>
 */
export type Filter<Array extends unknown[], Predicate, Includes extends boolean = true> = FilterImplementation<
    Array,
    Predicate,
    [],
    Includes
>

/**
 * Change the relative ordern of the elements of a tuple stype, reversing
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
export type Reverse<Array extends unknown[]> = Array extends [infer Item, ...infer Spread] ? [...Reverse<Spread>, Item] : Array

/**
 * @internal
 */
type IndexOfImplementation<Array extends unknown[], Match, Index extends unknown[] = []> = Array extends [
    infer Item,
    ...infer Spread,
]
    ? Equals<Item, Match> extends true
        ? Index["length"]
        : IndexOfImplementation<Spread, Match, [...Index, Item]>
    : -1

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
export type IndexOf<Array extends unknown[], Match> = IndexOfImplementation<Array, Match, []>

/**
 * @internal
 */
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
      : -1

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
export type LastIndexOf<Array extends unknown[], Match> = LastIndexOfImplementation<Array, Match, [], []>

/**
 * Helper type to create a tuple with a specific length, repeating a given value
 * Avoids the `Type instantiation is excessively deep and possibly infinite` error
 * @interface
 */
type RepeatConstructTuple<
    Length extends number,
    Value extends unknown = unknown,
    Array extends unknown[] = [],
> = Array["length"] extends Length ? Array : RepeatConstructTuple<Length, Value, [...Array, Value]>

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
> = RepeatConstructTuple<Length, Value, Array>

/**
 * Check if there are duplidated elements inside the tuple
 *
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
type ChunkImplementation<
    Array extends unknown[],
    Length extends number,
    Build extends unknown[] = [],
    Partition extends unknown[] = [],
> = Array extends [infer Item, ...infer Spread]
    ? [...Partition, Item]["length"] extends Length
        ? ChunkImplementation<Spread, Length, [...Build, [...Partition, Item]], []>
        : ChunkImplementation<Spread, Length, Build, [...Partition, Item]>
    : Size<Partition> extends 0
      ? Build
      : [...Build, Partition]

/**
 * TODO: add examples
 */
export type Chunk<Array extends unknown[], Length extends number> = ChunkImplementation<Array, Length, [], []>

/**
 * @internal
 */
type ZipImplementation<T, U, Build extends unknown[] = []> = T extends [infer ItemT, ...infer SpreadT]
    ? U extends [infer ItemU, ...infer SpreadU]
        ? ZipImplementation<SpreadT, SpreadU, [...Build, [ItemT, ItemU]]>
        : Build
    : Build

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
export type Zip<Array1 extends unknown[], Array2 extends unknown[]> = ZipImplementation<Array1, Array2>

/**
 * Returns the flatten type of an array.
 *
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
type UniqueImplementation<Array extends unknown[], Uniques extends unknown = never, Set extends unknown[] = []> = Array extends [
    infer Item,
    ...infer Spread,
]
    ? Includes<Set, Item> extends true
        ? UniqueImplementation<Spread, Uniques, Set>
        : UniqueImplementation<Spread, Uniques | Item, [...Set, Item]>
    : Set

/**
 * Returns the uniques values of an array
 *
 * @example
 * // Expected: [1, 2, 3, 4, 5]
 * type Uniques1 = Unique<[1, 2, 3, 3, 4, 4, 5]>;
 *
 * // Expected: ["a", "b", "c"]
 * type Uniques2 = Unique<["a", "b", "c", "a", "b"]>;
 */
export type Uniques<Array extends unknown[]> = UniqueImplementation<Array>

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
export type ToUnion<T> = T extends [infer Item, ...infer Spread] ? Item | ToUnion<Spread> : T

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
    : false

/**
 * Determines the primitive type corresponding to the provided value.
 *
 * @example
 * // Expected: number
 * type TypeOfValue = TypeOf<123>
 *
 * // Expected: string
 * type TypeOfValue = TypeOf<"hello">
 */
export type ReturnTypeOf<T> = T extends string
    ? string
    : T extends number
      ? number
      : T extends object
        ? object
        : T extends boolean
          ? boolean
          : T extends Function
            ? Function
            : never
