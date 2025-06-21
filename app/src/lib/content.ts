export const ourServiceContent = [
    {
        title: "Deep",
        paragraph: "Dive into powerful TypeScript utilities crafted to simplify and enhance your type system workflows.",
        code: `
import type { 
    DeepOmit, 
    DeepPick, 
    DeepMerge, 
    DeepMutable 
} from "@halvaradop/ts-utility-types/deep"

type User = {
    name: string;
    address: {
        city: string;
        zip: number;
    };
    age: number;
}

// Expected: { name: string; address: { zip: number }; age: number }
type Omitted = DeepOmit<User, "address.city">

// Expected: { name: string; address: { city: string } }
type Picked = DeepPick<User, "name" | "address.city">

// Expected: { name: string; address: { city: string; zip: number }; age: number }
type Merged = DeepMerge<User, Partial<User>>

// Expected: { name: string; address: { city: string; zip: number }; age: number }
type Mapped = DeepMutable<User>
        `,
    },
    {
        title: "Object",
        paragraph: "Easily transform object types — extract, map, omit, and reshape structures with real-world utility.",
        code: `
import type { 
    GetOptional,
    GetRequired,
    Mutable,
    ObjectEntries 
} from "@halvaradop/ts-utility-types/objects"

type Address = { city?: string; zip?: number }
type User = { name?: string; address?: Address }

// Expected: { name?: string; address?: Address }
type Optionals = GetOptional<User, "name" | "address">

// Expected: { name: string; address: Address }
type Requireds = GetRequired<User, "name" | "address">

// Expected: { name?: string; address?: Address }
type Muted = Mutable<User>

// Expected: ["name", string | undefined] | ["address", Address | undefined]
type Entries = ObjectEntries<User>
        `,
    },
    {
        title: "Guards",
        paragraph: "Validate values with precision — confirm types like `never`, `any`, positive numbers, and more.",
        code: `
import type { 
    IsPositive,
    IsNegative,
    IsString,
    IsObject,
    IsFunction,
} from "@halvaradop/ts-utility-types/type-guards"
    
// Expected: true
type IsPositive = IsPositive<5>

// Expected: true
type IsNegative = IsNegative<-3>

// Expected: true
type IsString = IsString<"Hello">

// Expected: true
type IsObj = IsObject<{ a: 1 }>

// Expected: true
type IsFunc = IsFunction<() => void>

// Expected: true
type IsAnyType = IsAny<any>

// Expected: true
type IsNeverType = IsNever<never>
        `,
    },
    {
        title: "Array",
        paragraph: "Use tuple-based utilities to filter, extract, and transform array-like types with confidence and control.",
        code: `
import type { 
    Flatten,
    ToUnion,
    Filter,
    Includes
} from "@halvaradop/ts-utility-types/arrays"


type Tuple = [string, number, boolean]

// Expected: string
type Flattened = Flatten<string[][]>

// Expected: string | number | boolean
type Union = ToUnion<Tuple>

// Expected: ["str"]
type Filtered = Filter<[1, 2, 3, "str"], string>

// Expected: true
type HasString = Includes<Tuple, string>
        `,
    },
    {
        title: "Utils",
        paragraph:
            "Access core utilities for primitives, nullish, falsy values, and more — made to simplify any TypeScript type logic.",
        code: `
import type { 
    Prettify, 
    LiteralUnion, 
    Discard, 
    Nullish
} from "@halvaradop/ts-utility-types/utils" 

// Expected: { a: number; b: string }
type Pretty = Prettify<{ a: number; b: string }>

// Expected: "foo" | (string & {})
type Literal = LiteralUnion<"foo", string>

// Expected: string
type Discarded = Discard<string | number, number>

// Expecteda: null | undefined
type NullishType = Nullish
        `,
    },
    {
        title: "Test",
        paragraph: "Ensure types match your expectations with type-safe testing patterns built for reliability.",
        code: `
import type { 
    Equals,
    Expect,
    Not,
} from "@halvaradop/ts-utility-types/test"

// Expected: true
type IsEqual = Equals<"Hello", "Hello">

// Expected: false
type IsNotEqual = Not<Equals<"Hello", "World">>

// Expected: true
type IsEquals = Equals<1, 1>

// Expected: true
type IsNotEquals = Not<Equals<1, 2>>

// Expected: true
type IsExpect = Expect<"Hello" extends string ? true : false>
        `,
    },
    {
        title: "String",
        paragraph:
            "Manipulate string types effortlessly — transform, match, and format types just like native JavaScript string methods.",
        code: `
import type { 
    Join,
    FindAll,
    ParseUrlParams,
    IndexOfString
} from "@halvaradop/ts-utility-types/string-mappers"

// Expected: "a-b-c"
type Joined = Join<["a", "b", "c"], "-">

// Expected: ["foo", "foo"]
type Found = FindAll<"foo bar foo", "foo">

// Expected: "id" | "section"
type Params = ParseUrlParams<"/user/:id/profile/:section">

// Expected: 2
type Index = IndexOfString<"hello", "l">
        `,
    },
    {
        title: "Validate Types",
        paragraph: "Assert and validate that types meet strict constraints — from objects and arrays to booleans and primitives.",
        code: `
import { 
    isPrimitive,
    isObject,
    isArray,
    isFalsy
} from "@halvaradop/ts-utility-types/validate"

// Expected: true
const isPrim = isPrimitive(42)

// Expected: true
const isObj = isObject({ a: 1 })

// Expected: true
const isArr = isArray([1, 2, 3])

// Expected: true
const isFalsyVal = isFalsy(0)
        `,
    },
]
