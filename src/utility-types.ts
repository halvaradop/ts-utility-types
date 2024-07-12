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