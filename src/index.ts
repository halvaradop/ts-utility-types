export type { 
    Prettify, 
    DeepReadonly, 
    TupleToUnion, 
    Last, 
    Pop, 
    Size, 
    Awaited, 
    Exclude, 
    Includes, 
    Parameters, 
    Pick,
    Omit,
    Trim,
    TrimLeft,
    TrimRight
} from "./utility-types"

export type { 
    ArgsFunction, 
    Nullish, 
    Primitive,
    PrimitiveNullish,
    WhiteSpaces
} from "./types"

export {
    isPrimitive,
    isPrimitiveNullish,
    isArray,
    isBoolean,
    isNullish,
    isNumber,
    isObject,
    isString
} from "./validate-types"

export type {
    Equals
} from "./test"