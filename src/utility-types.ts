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
 * Returns the size of an array
 * @example
 * const nums = [1, 2, 3, 4, 5]
 * type SizeNums = Size<nums> // 5
 */
export type Size<T extends any[]> = T extends any[] ? T["length"] : 0;


/**
 * Get the last element within an array otherwise it return never
 * @example
 * type LastItem = Last<1, 2, 3, 4> // 4
 */
export type Last<T extends any[]> = T extends [...any, infer Last] ? Last : never;

/**
 * Pops the last item of an array and returns the first element without the last item.
 * @example
 * type PopStr = Pop<["a", "b", "c"]> // ["a", "b"]
 * type PopNums = Pop<[1, 2, 3]> // [1, 2]
 */
export type Pop<T extends any[]> = T extends [...infer Items, any] ? Items : [];