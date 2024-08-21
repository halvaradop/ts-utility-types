import { describe, test, expectTypeOf } from "vitest";

import type {
    Capitalize,
    Uppercase,
    Lowercase,
    TrimLeft,
    TrimRight,
    Trim,
    Join,
    StartsWith,
    DropChar,
    EndsWith,
    LengthOfString,
    IndexOfString,
    FirstUniqueCharIndex,
    Replace,
} from "../src/string-mappers";

describe("String mappers", () => {
    test("TrimLeft", () => {
        expectTypeOf<TrimLeft<"  foo">>().toMatchTypeOf<"foo">();
        expectTypeOf<TrimLeft<"   foo bar">>().toMatchTypeOf<"foo bar">();
        expectTypeOf<TrimLeft<"\r\r\r\nfoo bar">>().toMatchTypeOf<"foo bar">();
    });

    test("TrimRight", () => {
        expectTypeOf<TrimRight<"foo  ">>().toMatchTypeOf<"foo">();
        expectTypeOf<TrimRight<"foo bar  ">>().toMatchTypeOf<"foo bar">();
        expectTypeOf<TrimRight<"foo bar  \n\n">>().toMatchTypeOf<"foo bar">();
    });

    test("Trim", () => {
        expectTypeOf<Trim<"  foo">>().toMatchTypeOf<"foo">();
        expectTypeOf<Trim<"foo  ">>().toMatchTypeOf<"foo">();
        expectTypeOf<Trim<"  foo  ">>().toMatchTypeOf<"foo">();
        expectTypeOf<Trim<"\r\n foo \r\n">>().toMatchTypeOf<"foo">();
    });

    test("Uppercase", () => {
        expectTypeOf<Uppercase<"foo">>().toMatchTypeOf<"FOO">();
        expectTypeOf<Uppercase<"Foo">>().toMatchTypeOf<"FOO">();
        expectTypeOf<Uppercase<"Foo bar">>().toMatchTypeOf<"FOO BAR">();
        expectTypeOf<Uppercase<"Foo Bar">>().toMatchTypeOf<"FOO BAR">();
    });

    test("Lowercase", () => {
        expectTypeOf<Lowercase<"foo">>().toMatchTypeOf<"foo">();
        expectTypeOf<Lowercase<"Foo">>().toMatchTypeOf<"foo">();
        expectTypeOf<Lowercase<"Foo bar">>().toMatchTypeOf<"foo bar">();
        expectTypeOf<Lowercase<"Foo Bar">>().toMatchTypeOf<"foo bar">();
    });

    test("Capitalize the strings", () => {
        expectTypeOf<Capitalize<"foo">>().toMatchTypeOf<"Foo">();
        expectTypeOf<Capitalize<"foo bar">>().toMatchTypeOf<"Foo Bar">();
        expectTypeOf<Capitalize<"Foo">>().toMatchTypeOf<"Foo">();
        expectTypeOf<Capitalize<"Foo bar">>().toMatchTypeOf<"Foo Bar">();
        expectTypeOf<Capitalize<"Foo Bar">>().toMatchTypeOf<"Foo Bar">();
    });
});

describe("Join", () => {
    test("Join the elements of a tuple separated by a character", () => {});
    expectTypeOf<Join<["a", "p", "p", "l", "e"], "-">>().toEqualTypeOf<"a-p-p-l-e">();
    expectTypeOf<Join<["Hello", "World"], " ">>().toEqualTypeOf<"Hello World">();
    expectTypeOf<Join<["2", "2", "2"], "1">>().toEqualTypeOf<"21212">();
});

describe("Match strings", () => {
    test("StartsWith", () => {
        expectTypeOf<StartsWith<"foobar", "foo">>().toEqualTypeOf<true>();
        expectTypeOf<StartsWith<"foobar", "bar">>().toEqualTypeOf<false>();
        expectTypeOf<StartsWith<"foobar", "obar">>().toEqualTypeOf<false>();
        expectTypeOf<StartsWith<"foobar", "foobarr">>().toEqualTypeOf<false>();
        expectTypeOf<StartsWith<"foobar", "">>().toEqualTypeOf<true>();
        expectTypeOf<StartsWith<"", "">>().toEqualTypeOf<true>();
    });

    test("EndsWith", () => {
        expectTypeOf<EndsWith<"foobar", "foo">>().toEqualTypeOf<false>();
        expectTypeOf<EndsWith<"foobar", "bar">>().toEqualTypeOf<true>();
        expectTypeOf<EndsWith<"bar", "br">>().toEqualTypeOf<false>();
        expectTypeOf<EndsWith<"foobar", " ">>().toEqualTypeOf<false>();
        expectTypeOf<EndsWith<"foobar", "">>().toEqualTypeOf<true>();
        expectTypeOf<EndsWith<"", "">>().toEqualTypeOf<true>();
    });
});

describe("DropChar", () => {
    test("Remove the characters that match with the given char", () => {
        expectTypeOf<DropChar<"foobar foo!", " ">>().toEqualTypeOf<"foobarfoo!">();
        expectTypeOf<DropChar<"f o o b a r f o o !", " ">>().toEqualTypeOf<"foobarfoo!">();
        expectTypeOf<DropChar<"f o o b a r f o o !", any>>().toEqualTypeOf<"">();
    });
});

describe("LengthOfString", () => {
    test("Returns the length of a string type", () => {
        expectTypeOf<LengthOfString<"">>().toEqualTypeOf<0>();
        expectTypeOf<LengthOfString<any>>().toEqualTypeOf<0>();
        expectTypeOf<LengthOfString<never>>().toEqualTypeOf<never>();
        expectTypeOf<LengthOfString<"foobarfoobar">>().toEqualTypeOf<12>();
    });
});

describe("IndexOfString", () => {
    test("Returns the first index occurrence of a character", () => {
        expectTypeOf<IndexOfString<"", never>>().toEqualTypeOf<-1>();
        expectTypeOf<IndexOfString<"foobar", "f">>().toEqualTypeOf<0>();
        expectTypeOf<IndexOfString<"foobar", "b">>().toEqualTypeOf<3>();
        expectTypeOf<IndexOfString<"foobar", "r">>().toEqualTypeOf<5>();
        expectTypeOf<IndexOfString<"foobar", "x">>().toEqualTypeOf<-1>();
    });
});

describe("FirstUniqueCharIndex", () => {
    test("Returns the first index of a character that is not repeated", () => {
        expectTypeOf<FirstUniqueCharIndex<"">>().toEqualTypeOf<-1>();
        expectTypeOf<FirstUniqueCharIndex<"comparator">>().toEqualTypeOf<0>();
        expectTypeOf<FirstUniqueCharIndex<"comparator and comparable">>().toEqualTypeOf<7>();
        expectTypeOf<FirstUniqueCharIndex<"aabbcc">>().toEqualTypeOf<-1>();
        expectTypeOf<FirstUniqueCharIndex<"aabcb">>().toEqualTypeOf<3>();
    });
});

describe("Replace", () => {
    test("Replace the first match with a new value", () => {
        expectTypeOf<Replace<"foobar", "bar", "foo">>().toEqualTypeOf<"foofoo">();
        expectTypeOf<Replace<"foobarbar", "bar", "foo">>().toEqualTypeOf<"foofoobar">();
        expectTypeOf<Replace<"foobarbar", "", "foo">>().toEqualTypeOf<"foobarbar">();
        expectTypeOf<Replace<"foobarbar", "bar", "">>().toEqualTypeOf<"foobar">();
    });
});
