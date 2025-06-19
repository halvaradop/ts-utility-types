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

// Expected: string | number | boolean
type Flattened = Flatten<Tuple>

// Expected: string | number | boolean
type Union = ToUnion<Tuple>

// Expected: [string]
type Filtered = Filter<Tuple, string>

// Expected: true
type HasString = Includes<Tuple, string>
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

// Expected: false
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
        title: "Test",
        paragraph: "Ensure types match your expectations with type-safe testing patterns built for reliability.",
        code: `
import type { 
    Equals,
    Expect,
    Not,
} from "@halvaradop/ts-utility-types/test"

// Expected: true
type IsEqual = Expect<Equals<"Hello", "Hello">>

// Expected: false
type IsNotEqual = Expect<Not<Equals<"Hello", "World">>>

// Expected: true
type IsEquals = Equals<1, 1>
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

// Expected: { a: number }
type Discarded = Discard<{ a: number; b: string }, "b">

// Expecteda: true
type NullishType = Nullish<undefined>
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

// Expected: { id: string; section: string }
type Params = ParseUrlParams<"/user/:id/profile/:section">

// Expected: 2
type Index = IndexOfString<"hello", "l">
        `,
    },
    {
        title: "Validate Types",
        paragraph: "Assert and validate that types meet strict constraints — from objects and arrays to booleans and primitives.",
        code: `
import type { 
    isPrimitive,
    isObject,
    isArray,
    isFalsy
} from "@halvaradop/ts-utility-types/validate"


// Expected: true
type IsPrim = isPrimitive<42>

// Expected: true
type IsObj = isObject<{ a: 1 }>

// Expected: true
type IsArr = isArray<[1, 2, 3]>

// Expected: true
type IsFalsyVal = isFalsy<0>
        `,
    },
]
