import { describe, test, expectTypeOf } from "vitest";
//import type * as utilities from "../src/utility-types";
import type * as utilities from "../src/object-types";

describe("Readonly", () => {
	test("DeepReadonly for objects", () => {
		expectTypeOf<utilities.DeepReadonly<{ foo: string; bar: number }>>().toEqualTypeOf<{
			readonly foo: string;
			readonly bar: number;
		}>();
		expectTypeOf<utilities.DeepReadonly<{ foo: string; bar: { foo: number } }>>().toEqualTypeOf<{
			readonly foo: string;
			readonly bar: { readonly foo: number };
		}>();
		expectTypeOf<utilities.DeepReadonly<{ foo: { bar: string }; bar: { foo: number } }>>().toEqualTypeOf<{
			readonly foo: { readonly bar: string };
			readonly bar: { readonly foo: number };
		}>();
	});
});

describe("Properties with keyof", () => {
	test("Combines keys of two object types", () => {
		expectTypeOf<utilities.Properties<{ a: number }, { a: string }>>().toEqualTypeOf<"a">();
		expectTypeOf<utilities.Properties<{ a: number }, { b: string }>>().toEqualTypeOf<"a" | "b">();
		expectTypeOf<utilities.Properties<{ a: number }, { b: string; c: number }>>().toEqualTypeOf<"a" | "b" | "c">();
	});
});

describe("Merge values", () => {
	test("Union two object types", () => {
		expectTypeOf<utilities.Merge<{ a: number }, { b: string }>>().toEqualTypeOf<{
			a: number;
			b: string;
		}>();
		expectTypeOf<utilities.Merge<{ a: number }, { b: string; c: boolean }>>().toEqualTypeOf<{
			a: number;
			b: string;
			c: boolean;
		}>();
		expectTypeOf<utilities.Merge<{ a: number }, { a: string; b: string }>>().toEqualTypeOf<{ a: string; b: string }>();
	});
});

describe("FlattenProperties", () => {
	test("Extract property from object", () => {
		expectTypeOf<utilities.FlattenProperties<{ name: string; address: { street: string } }, "address">>().toEqualTypeOf<{
			name: string;
			street: string;
		}>();
		expectTypeOf<
			utilities.FlattenProperties<{ name: string; address: { street: string; avenue: string } }, "address">
		>().toEqualTypeOf<{ name: string; street: string; avenue: string }>();
	});
});

describe("PublicOnly", () => {
	test("Remove properties beginning with (_)", () => {
		expectTypeOf<utilities.PublicOnly<{ foo: string }>>().toEqualTypeOf<{
			foo: string;
		}>();
		expectTypeOf<utilities.PublicOnly<{ foo: string; _bar: string }>>().toEqualTypeOf<{ foo: string }>();
		expectTypeOf<utilities.PublicOnly<{ _foo: string; _bar: string }>>().toEqualTypeOf<{}>();
	});
});

describe("RetrieveKeyValue", () => {
	test("Exist the key within objects", () => {
		expectTypeOf<utilities.RetrieveKeyValue<{ foo: string }, { bar: number }, "foo">>().toEqualTypeOf<string>();
		expectTypeOf<utilities.RetrieveKeyValue<{ foo: string }, { bar: number }, "bar">>().toEqualTypeOf<number>();
		expectTypeOf<utilities.RetrieveKeyValue<{ foo: string }, { foo: number }, "foo">>().toEqualTypeOf<string>();
		expectTypeOf<utilities.RetrieveKeyValue<{ foo: string }, { foo: number }, "foobar">>().toEqualTypeOf<never>();
	});
});

describe("RequiredByKeys", () => {
	test("Convert required properties in an object", () => {
		expectTypeOf<utilities.RequiredByKeys<{ foo?: string; bar?: number }, "foo">>().toEqualTypeOf<{
			foo: string;
			bar?: number;
		}>();
		expectTypeOf<utilities.RequiredByKeys<{ foo?: string; bar?: number }, "bar">>().toEqualTypeOf<{
			foo?: string;
			bar: number;
		}>();
		expectTypeOf<utilities.RequiredByKeys<{ foo?: string; bar?: number }>>().toEqualTypeOf<{ foo: string; bar: number }>();
	});
});

describe("UnionMerge", () => {
	test("Merge the types of the properties of two objects.", () => {
		expectTypeOf<utilities.UnionMerge<{ foo: string }, { bar: string }>>().toEqualTypeOf<{ foo: string; bar: string }>();
		expectTypeOf<utilities.UnionMerge<{ foo: string }, { foo: number }>>().toEqualTypeOf<{ foo: string | number }>();
		expectTypeOf<utilities.UnionMerge<{ foo: string | number }, { foo: boolean }>>().toEqualTypeOf<{
			foo: string | number | boolean;
		}>();
	});
});

describe("Mutable", () => {
	test("Converts properties to non readonly only one level", () => {
		expectTypeOf<utilities.Mutable<{ readonly foo: string }>>().toEqualTypeOf<{
			foo: string;
		}>();
		expectTypeOf<
			utilities.Mutable<{
				readonly foo: string;
				readonly bar: { readonly foobar: number };
			}>
		>().toEqualTypeOf<{ foo: string; bar: { readonly foobar: number } }>();
	});
});

describe("DeepMutable", () => {
	test("Converts all properties to non readonly of an object type", () => {
		interface Test5 {
			foo: [
				{ bar: string },
				{
					foobar: {
						foofoo: number;
					};
				},
			];
		}

		interface Test6 {
			foo: {
				bar: [
					{
						foobar: string;
						barfoo: {
							foofoo: number;
						};
					},
				];
			};
		}
		expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<{ foo: string }>>>().toEqualTypeOf<{ foo: string }>();
		expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<{ foo: { bar: number } }>>>().toEqualTypeOf<{
			foo: { bar: number };
		}>();
		expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<{ foo: { bar: { foobar: number } } }>>>().toEqualTypeOf<{
			foo: { bar: { foobar: number } };
		}>();
		expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<{ foo: [{ bar: string; foobar: number }] }>>>().toEqualTypeOf<{
			foo: [{ bar: string; foobar: number }];
		}>();
		expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<Test5>>>().toEqualTypeOf<Test5>();
		expectTypeOf<utilities.DeepMutable<utilities.DeepReadonly<Test6>>>().toEqualTypeOf<Test6>();
	});
});

describe("MergeAll", () => {
	test("Merge the properties of a tuple of objects", () => {
		expectTypeOf<utilities.MergeAll<[{ foo: string }, { bar: number }]>>().toEqualTypeOf<{ foo: string; bar: number }>();
		expectTypeOf<utilities.MergeAll<[{ foo: string }, { bar: { foobar: number } }]>>().toEqualTypeOf<{
			foo: string;
			bar: { foobar: number };
		}>();
		type Expect3 = {
			foo: string | boolean;
			bar: number | string;
			foobar: string;
		};
		expectTypeOf<
			utilities.MergeAll<[{ foo: string }, { bar: string }, { bar: number; foo: boolean; foobar: string }]>
		>().toEqualTypeOf<Expect3>();
	});
});

describe("ToUnion", () => {
	test("Create an union type", () => {
		expectTypeOf<utilities.ToUnion<12>>().toEqualTypeOf<12>();
		expectTypeOf<utilities.ToUnion<"foo">>().toEqualTypeOf<"foo">();
		expectTypeOf<utilities.ToUnion<12 | 21>>().toEqualTypeOf<12 | 21>();
		expectTypeOf<utilities.ToUnion<[12, 21, "foo"]>>().toEqualTypeOf<12 | 21 | "foo" | []>();
	});
});

describe("AddPropertyToObject", () => {
	test("Append a new property of an exist object type", () => {
		expectTypeOf<utilities.AddPropertyToObject<{ foo: string }, "bar", number>>().toEqualTypeOf<{
			foo: string;
			bar: number;
		}>();
		expectTypeOf<utilities.AddPropertyToObject<{ foo: string }, "bar", { foobar: number; barfoo: boolean }>>().toEqualTypeOf<{
			foo: string;
			bar: { foobar: number; barfoo: boolean };
		}>();
		expectTypeOf<utilities.AddPropertyToObject<{ foo: string }, "bar", [1, 2, 3]>>().toEqualTypeOf<{
			foo: string;
			bar: [1, 2, 3];
		}>();
		expectTypeOf<utilities.AddPropertyToObject<{ foo: string }, "bar", string | boolean | number>>().toEqualTypeOf<{
			foo: string;
			bar: string | boolean | number;
		}>();
	});
});

describe("Intersection", () => {
	test("Intersection of properties between two objects", () => {
		expectTypeOf<utilities.Intersection<{ foo: string }, { foo: number; bar: boolean }>>().toEqualTypeOf<{ bar: boolean }>();
		expectTypeOf<utilities.Intersection<{ foo: string; bar: boolean }, { bar: number; foo: bigint }>>().toEqualTypeOf<{}>();
		expectTypeOf<
			utilities.Intersection<{ foo: string; bar: { bar: number } }, { barfoo: { bar: number }; foo: bigint }>
		>().toEqualTypeOf<{ bar: { bar: number }; barfoo: { bar: number } }>();
	});
});

describe("Omit Properties", () => {
	describe("Omit", () => {
		test("Omit the properties based on the key type", () => {
			expectTypeOf<Omit<{ foo: string }, "">>().toEqualTypeOf<{
				foo: string;
			}>();
			expectTypeOf<Omit<{ foo: string; bar: number }, "foo">>().toEqualTypeOf<{ bar: number }>();
			expectTypeOf<Omit<{ foo: () => void; bar: { foobar: number } }, "foo">>().toEqualTypeOf<{
				bar: { foobar: number };
			}>();
		});
	});

	describe("OmitByType", () => {
		test("Omit the properties based on the type", () => {
			expectTypeOf<utilities.OmitByType<{ foo: string; bar: string; foobar: number }, string>>().toEqualTypeOf<{
				foobar: number;
			}>();
			expectTypeOf<utilities.OmitByType<{ foo: string; bar: number; foobar: boolean }, string | boolean>>().toEqualTypeOf<{
				bar: number;
			}>();
			expectTypeOf<
				utilities.OmitByType<
					{
						foo: () => void;
						bar: () => void;
						foobar: { barbar: number };
					},
					() => void
				>
			>().toEqualTypeOf<{ foobar: { barbar: number } }>();
		});
	});
});

describe("Parameters", () => {
	test("Returns the parameters of a function", () => {
		expectTypeOf<utilities.Parameters<() => void>>().toEqualTypeOf<[]>();
		expectTypeOf<utilities.Parameters<(foo: string) => void>>().toEqualTypeOf<[string]>();
		expectTypeOf<utilities.Parameters<(foo: string, bar: number) => void>>().toEqualTypeOf<[string, number]>();
		expectTypeOf<utilities.Parameters<(foo: { bar: number }) => void>>().toEqualTypeOf<[{ bar: number }]>();
	});
});

describe("Includes", () => {
	test("Check if an element exist withins a tuple", () => {
		expectTypeOf<utilities.Includes<[], any>>().toEqualTypeOf<false>();
		expectTypeOf<utilities.Includes<[1, 2, "foo", "bar"], 2>>().toEqualTypeOf<true>();
		expectTypeOf<utilities.Includes<["foo", "bar", () => void, {}], () => void>>().toEqualTypeOf<true>();
		expectTypeOf<utilities.Includes<[string, 1, () => void, {}], string>>().toEqualTypeOf<true>();
		expectTypeOf<utilities.Includes<[string, number, () => void, {}], number>>().toEqualTypeOf<true>();
		expectTypeOf<utilities.Includes<[true, false, true], number>>().toEqualTypeOf<false>();
	});
});

describe("ObjectEntries", () => {
	test("Returns the entries from an object", () => {
		expectTypeOf<utilities.ObjectEntries<{ foo: string }>>().toEqualTypeOf<["foo", string]>();
		expectTypeOf<utilities.ObjectEntries<{ foo?: string }>>().toEqualTypeOf<["foo", string]>();
		expectTypeOf<utilities.ObjectEntries<{ foo?: string; bar?: number }>>().toEqualTypeOf<
			["foo", string] | ["bar", number]
		>();
		expectTypeOf<utilities.ObjectEntries<{ foo?: undefined; bar: undefined | string }>>().toEqualTypeOf<
			["foo", undefined] | ["bar", undefined | string]
		>();
	});
});

describe("Pick Utilities", () => {
	describe("Pick", () => {
		test("Pick by keys", () => {
			expectTypeOf<Pick<{ foo: string; bar: number }, never>>().toEqualTypeOf<{}>();
			expectTypeOf<Pick<{ foo: string; bar: number }, "bar">>().toEqualTypeOf<{ bar: number }>();
			expectTypeOf<Pick<{ foo: string; bar: number }, "bar" | "foo">>().toEqualTypeOf<{ foo: string; bar: number }>();
		});
	});

	describe("PickByType", () => {
		test("Pick by type", () => {
			expectTypeOf<utilities.PickByType<{ foo: string; bar: number; foofoo: string }, number>>().toEqualTypeOf<{
				bar: number;
			}>();
			expectTypeOf<utilities.PickByType<{ foo: string; bar: number; foofoo: string }, string>>().toEqualTypeOf<{
				foo: string;
				foofoo: string;
			}>();
			expectTypeOf<utilities.PickByType<{ foo: () => {}; bar: number }, string>>().toEqualTypeOf<{}>();
			expectTypeOf<utilities.PickByType<{ foo: () => {}; bar: number; foobar: {} }, never>>().toEqualTypeOf<{}>();
			expectTypeOf<utilities.PickByType<{ foo: () => {}; bar: number; foobar: {} }, () => {}>>().toEqualTypeOf<{
				foo: () => {};
			}>();
		});
	});
});

describe("ReplaceKeys", () => {
	test("Replace the key types", () => {
		expectTypeOf<utilities.ReplaceKeys<{ foo: string; bar: number }, "bar", { bar: string }>>().toEqualTypeOf<{
			foo: string;
			bar: string;
		}>();
		expectTypeOf<utilities.ReplaceKeys<{ foo: string; bar: number }, "foobar", { bar: string }>>().toEqualTypeOf<{
			foo: string;
			bar: number;
		}>();
		expectTypeOf<utilities.ReplaceKeys<{ foo: string; bar: number }, "bar", { foobar: string }>>().toEqualTypeOf<{
			foo: string;
			bar: unknown;
		}>();
		expectTypeOf<
			utilities.ReplaceKeys<{ foo: string; bar: number }, "foo" | "bar", { foo: number; bar: boolean }>
		>().toEqualTypeOf<{
			foo: number;
			bar: boolean;
		}>();
	});
});

describe("MapTypes", () => {
	test("Replace the types of the keys that match with Mapper type", () => {
		expectTypeOf<utilities.MapTypes<{ foo: string; bar: number }, { from: string; to: number }>>().toEqualTypeOf<{
			foo: number;
			bar: number;
		}>();
		expectTypeOf<utilities.MapTypes<{ foo: number; bar: number }, { from: number; to: string }>>().toEqualTypeOf<{
			foo: string;
			bar: string;
		}>();
		expectTypeOf<utilities.MapTypes<{ foo: string; bar: number }, { from: boolean; to: number }>>().toEqualTypeOf<{
			foo: string;
			bar: number;
		}>();
		expectTypeOf<utilities.MapTypes<{ foo: () => {}; bar: string }, { from: () => {}; to: never }>>().toEqualTypeOf<{
			foo: never;
			bar: string;
		}>();
		expectTypeOf<
			utilities.MapTypes<{ foo: string; bar: number }, { from: string; to: boolean } | { from: number; to: bigint }>
		>().toEqualTypeOf<{ foo: boolean; bar: bigint }>();
	});
});

describe("DeepOmit", () => {
	test("Omit properties from nested objects", () => {
		expectTypeOf<utilities.DeepOmit<{ foo: string; bar: { foobar: number } }, "foo">>().toEqualTypeOf<{
			bar: { foobar: number };
		}>();
		expectTypeOf<utilities.DeepOmit<{ foo: string; bar: { foobar: number } }, "bar.foobar">>().toEqualTypeOf<{
			foo: string;
			bar: {};
		}>();
		expectTypeOf<utilities.DeepOmit<{ foo: string; bar: { foobar: number } }, "foobar">>().toEqualTypeOf<{
			foo: string;
			bar: { foobar: number };
		}>();
		expectTypeOf<
			utilities.DeepOmit<{ foo: string; bar: { foobar: number; nested: { baz: string } } }, "bar.nested.baz">
		>().toEqualTypeOf<{
			foo: string;
			bar: { foobar: number; nested: {} };
		}>();
	});
});

describe("ToPrimitive", () => {
	test("Converts a string to a primitive type", () => {
		expectTypeOf<utilities.ToPrimitive<{ foo: string; bar: string }>>().toEqualTypeOf<{ foo: string; bar: string }>();
		expectTypeOf<utilities.ToPrimitive<{ foo: "foobar"; bar: string }>>().toEqualTypeOf<{ foo: string; bar: string }>();
		expectTypeOf<utilities.ToPrimitive<{ foo: "foobar"; bar: 12 }>>().toEqualTypeOf<{ foo: string; bar: number }>();
		expectTypeOf<utilities.ToPrimitive<{ foo: { foobar: "fo"; bar: false }; bar: 12 }>>().toEqualTypeOf<{
			foo: { foobar: string; bar: boolean };
			bar: number;
		}>();
	});
});
