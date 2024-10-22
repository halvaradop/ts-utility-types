import { describe, test, expectTypeOf } from "vitest";
import type * as utilities from "../src/string-mappers";

describe("String mappers", () => {
    test("TrimLeft", () => {
        expectTypeOf<utilities.TrimLeft<"  foo">>().toMatchTypeOf<"foo">();
        expectTypeOf<utilities.TrimLeft<"   foo bar">>().toMatchTypeOf<"foo bar">();
        expectTypeOf<utilities.TrimLeft<"\r\r\r\nfoo bar">>().toMatchTypeOf<"foo bar">();
    });

    test("TrimRight", () => {
        expectTypeOf<utilities.TrimRight<"foo  ">>().toMatchTypeOf<"foo">();
        expectTypeOf<utilities.TrimRight<"foo bar  ">>().toMatchTypeOf<"foo bar">();
        expectTypeOf<utilities.TrimRight<"foo bar  \n\n">>().toMatchTypeOf<"foo bar">();
    });

    test("Trim", () => {
        expectTypeOf<utilities.Trim<"  foo">>().toMatchTypeOf<"foo">();
        expectTypeOf<utilities.Trim<"foo  ">>().toMatchTypeOf<"foo">();
        expectTypeOf<utilities.Trim<"  foo  ">>().toMatchTypeOf<"foo">();
        expectTypeOf<utilities.Trim<"\r\n foo \r\n">>().toMatchTypeOf<"foo">();
    });

    test("Uppercase", () => {
        expectTypeOf<utilities.Uppercase<"foo">>().toMatchTypeOf<"FOO">();
        expectTypeOf<utilities.Uppercase<"Foo">>().toMatchTypeOf<"FOO">();
        expectTypeOf<utilities.Uppercase<"Foo bar">>().toMatchTypeOf<"FOO BAR">();
        expectTypeOf<utilities.Uppercase<"Foo Bar">>().toMatchTypeOf<"FOO BAR">();
    });

    test("Lowercase", () => {
        expectTypeOf<utilities.Lowercase<"foo">>().toMatchTypeOf<"foo">();
        expectTypeOf<utilities.Lowercase<"Foo">>().toMatchTypeOf<"foo">();
        expectTypeOf<utilities.Lowercase<"Foo bar">>().toMatchTypeOf<"foo bar">();
        expectTypeOf<utilities.Lowercase<"Foo Bar">>().toMatchTypeOf<"foo bar">();
    });

    test("Capitalize the strings", () => {
        expectTypeOf<utilities.Capitalize<"foo">>().toMatchTypeOf<"Foo">();
        expectTypeOf<utilities.Capitalize<"foo bar">>().toMatchTypeOf<"Foo Bar">();
        expectTypeOf<utilities.Capitalize<"Foo">>().toMatchTypeOf<"Foo">();
        expectTypeOf<utilities.Capitalize<"Foo bar">>().toMatchTypeOf<"Foo Bar">();
        expectTypeOf<utilities.Capitalize<"Foo Bar">>().toMatchTypeOf<"Foo Bar">();
    });
});

describe("Join", () => {
    test("Join the elements of a tuple separated by a character", () => {});
    expectTypeOf<utilities.Join<["a", "p", "p", "l", "e"], "-">>().toEqualTypeOf<"a-p-p-l-e">();
    expectTypeOf<utilities.Join<["Hello", "World"], " ">>().toEqualTypeOf<"Hello World">();
    expectTypeOf<utilities.Join<["2", "2", "2"], "1">>().toEqualTypeOf<"21212">();
});

describe("Match strings", () => {
    test("StartsWith", () => {
        expectTypeOf<utilities.StartsWith<"foobar", "foo">>().toEqualTypeOf<true>();
        expectTypeOf<utilities.StartsWith<"foobar", "bar">>().toEqualTypeOf<false>();
        expectTypeOf<utilities.StartsWith<"foobar", "obar">>().toEqualTypeOf<false>();
        expectTypeOf<utilities.StartsWith<"foobar", "foobarr">>().toEqualTypeOf<false>();
        expectTypeOf<utilities.StartsWith<"foobar", "">>().toEqualTypeOf<true>();
        expectTypeOf<utilities.StartsWith<"", "">>().toEqualTypeOf<true>();
    });

    test("EndsWith", () => {
        expectTypeOf<utilities.EndsWith<"foobar", "foo">>().toEqualTypeOf<false>();
        expectTypeOf<utilities.EndsWith<"foobar", "bar">>().toEqualTypeOf<true>();
        expectTypeOf<utilities.EndsWith<"bar", "br">>().toEqualTypeOf<false>();
        expectTypeOf<utilities.EndsWith<"foobar", " ">>().toEqualTypeOf<false>();
        expectTypeOf<utilities.EndsWith<"foobar", "">>().toEqualTypeOf<true>();
        expectTypeOf<utilities.EndsWith<"", "">>().toEqualTypeOf<true>();
    });
});

describe("DropChar", () => {
    test("Remove the characters that match with the given char", () => {
        expectTypeOf<utilities.DropChar<"foobar foo!", " ">>().toEqualTypeOf<"foobarfoo!">();
        expectTypeOf<utilities.DropChar<"f o o b a r f o o !", " ">>().toEqualTypeOf<"foobarfoo!">();
        expectTypeOf<utilities.DropChar<"f o o b a r f o o !", any>>().toEqualTypeOf<"">();
    });
});

describe("LengthOfString", () => {
    test("Returns the length of a string type", () => {
        expectTypeOf<utilities.LengthOfString<"">>().toEqualTypeOf<0>();
        expectTypeOf<utilities.LengthOfString<any>>().toEqualTypeOf<0>();
        expectTypeOf<utilities.LengthOfString<never>>().toEqualTypeOf<never>();
        expectTypeOf<utilities.LengthOfString<"foobarfoobar">>().toEqualTypeOf<12>();
    });
});

describe("IndexOfString", () => {
    test("Returns the first index occurrence of a character", () => {
        expectTypeOf<utilities.IndexOfString<"", never>>().toEqualTypeOf<-1>();
        expectTypeOf<utilities.IndexOfString<"foobar", "f">>().toEqualTypeOf<0>();
        expectTypeOf<utilities.IndexOfString<"foobar", "b">>().toEqualTypeOf<3>();
        expectTypeOf<utilities.IndexOfString<"foobar", "r">>().toEqualTypeOf<5>();
        expectTypeOf<utilities.IndexOfString<"foobar", "x">>().toEqualTypeOf<-1>();
    });
});

describe("FirstUniqueCharIndex", () => {
    test("Returns the first index of a character that is not repeated", () => {
        expectTypeOf<utilities.FirstUniqueCharIndex<"">>().toEqualTypeOf<-1>();
        expectTypeOf<utilities.FirstUniqueCharIndex<"comparator">>().toEqualTypeOf<0>();
        expectTypeOf<utilities.FirstUniqueCharIndex<"comparator and comparable">>().toEqualTypeOf<7>();
        expectTypeOf<utilities.FirstUniqueCharIndex<"aabbcc">>().toEqualTypeOf<-1>();
        expectTypeOf<utilities.FirstUniqueCharIndex<"aabcb">>().toEqualTypeOf<3>();
    });
});

describe("Replace", () => {
    test("Replace the first match with a new value", () => {
        expectTypeOf<utilities.Replace<"foobar", "bar", "foo">>().toEqualTypeOf<"foofoo">();
        expectTypeOf<utilities.Replace<"foobarbar", "bar", "foo">>().toEqualTypeOf<"foofoobar">();
        expectTypeOf<utilities.Replace<"foobarbar", "", "foo">>().toEqualTypeOf<"foobarbar">();
        expectTypeOf<utilities.Replace<"foobarbar", "bar", "">>().toEqualTypeOf<"foobar">();
    });
});

describe("CheckRepeatedChars", () => {
    test("Check if there are repeated characters in the string", () => {
        expectTypeOf<utilities.CheckRepeatedChars<"">>().toEqualTypeOf<false>();
        expectTypeOf<utilities.CheckRepeatedChars<"aba">>().toEqualTypeOf<true>();
        expectTypeOf<utilities.CheckRepeatedChars<"abcza">>().toEqualTypeOf<true>();
        expectTypeOf<utilities.CheckRepeatedChars<"añlamnhj">>().toEqualTypeOf<true>();
    });
});

describe("ParseUrlParams", () => {
    test("Parse the URL parameters", () => {
        expectTypeOf<utilities.ParseUrlParams<"posts/:id">>().toEqualTypeOf<"id">();
        expectTypeOf<utilities.ParseUrlParams<":posts/:id">>().toEqualTypeOf<"posts" | "id">();
        expectTypeOf<utilities.ParseUrlParams<"user/:id/posts/:postId">>().toEqualTypeOf<"id" | "postId">();
        expectTypeOf<utilities.ParseUrlParams<":posts/:id">>().toEqualTypeOf<"posts" | "id">();
        expectTypeOf<utilities.ParseUrlParams<"posts/:id/:items/likes">>().toEqualTypeOf<"id" | "items">();
    });
});

describe("FindAll", () => {
    test("Find all the indexes of a substring in a string", () => {
        expectTypeOf<utilities.FindAll<"", "">>().toEqualTypeOf<[]>();
        expectTypeOf<utilities.FindAll<"ooooo", "">>().toEqualTypeOf<[]>();
        expectTypeOf<utilities.FindAll<"", "foobar">>().toEqualTypeOf<[]>();
        expectTypeOf<utilities.FindAll<"foobar", "o">>().toEqualTypeOf<[1, 2]>();
        expectTypeOf<utilities.FindAll<"foooo", "o">>().toEqualTypeOf<[1, 2, 3, 4]>();
        expectTypeOf<utilities.FindAll<"ooooo", "oo">>().toEqualTypeOf<[0, 1, 2, 3]>();
    });
});
