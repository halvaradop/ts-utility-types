# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Changed

- `ReturnTypeOf` type relocated from the `array.ts` file to `utils.ts` for improved organization and clarity. [#183](https://github.com/halvaradop/ts-utility-types/pull/183)

---

## [0.20.0] - 2025-06-03

### Added

- New Deep Utility Types: Introduced `DeepFilter`, `DeepReplace`, `DeepSet`, and other advanced deep utility types. These enable powerful and flexible manipulation of deeply nested object structures, allowing for filtering, replacing, and setting values at any depth.

- Enhanced Deep Types with `IsObject`: Improved `DeepOmit`, `DeepPartial`, and `DeepPick` by leveraging the new `IsObject` type. This provides stricter type checking, reduces code duplication, and enhances reliability. [#164](https://github.com/halvaradop/ts-utility-types/pull/164)

- New Non-Nullish Utilities: Added `DeepNonNullish` for object types and `FilterNonNullish` for array types. These utilities recursively remove `null` and `undefined` values from deeply nested structures. [#169](https://github.com/halvaradop/ts-utility-types/pull/169)

- New Entry Points: Introduced new module-specific entry points for better access and organization:

  - `deep`: Contains `Deep-` prefixed utility types for object manipulation.
  - `numbers`: Contains utility types for number types.
    [#171](https://github.com/halvaradop/ts-utility-types/pull/171)

- `DeepUnion` Type Added: Introduced the `DeepUnion` type. [#177](https://github.com/halvaradop/ts-utility-types/pull/177)

### Changed

- Refactored and Reorganized File Structure: Utility types have been reorganized into more focused and descriptive files for improved maintainability and usability:
  - `array-types.ts` renamed to `arrays.ts`.
  - `object-types.ts` renamed to `objects.ts`.
  - `string-mappers.ts` renamed to `strings.ts`.
  - `type-guards` renamed to `guards.ts`.
  - New files introduced: `deep.ts` and `numbers.ts`.

### Deprecated

- Entry Point Deprecation: The `/utility-types` and `/types` entry points have been deprecated and are scheduled for removal in the next major release. Users should migrate to the new, specific entry points. [#171](https://github.com/halvaradop/ts-utility-types/pull/171)

### Fixed

- `DeepReadonly` Function Handling: Resolved issues where function properties were not handled correctly by the `DeepReadonly` type, ensuring deeply nested functions are now preserved as expected during readonly transformations. [#158](https://github.com/halvaradop/ts-utility-types/pull/158)

- `DeepKeys` Redundancy: Addressed redundant generation in the `DeepKeys` type. [#177](https://github.com/halvaradop/ts-utility-types/pull/177)

### Removed

- Deprecated Type Cleanup: Removed redundant or deprecated types as part of the ongoing restructuring and modernization efforts, reducing maintenance overhead and potential user confusion.

---

## [0.19.0] - 2025-03-15

### Added

- New Utility Types: Added `DeepTruncate` and `IsFunction` types. [#158](https://github.com/halvaradop/ts-utility-types/pull/158)

- Strict Type Guards: Introduced `IsArray` and `IsObject` type guards. These provide stricter type checking, particularly addressing cases where TypeScript might incorrectly infer functions as objects, which previously led to unexpected results in advanced object utility types. [#159](https://github.com/halvaradop/ts-utility-types/pull/158)

- Deep Transformation Types: Added `DeepPartial` and `DeepRequired` types, complementing TypeScript's built-in `Partial` and `Required` with deep transformation capabilities. [#161](https://halvaradop.github.io/ts-utility-types/pull/161)

- Deep Nullability Types: Introduced `DeepNullable` and `DeepNonNullable` types for deep nullability transformations. [#163](https://halvaradop.github.io/ts-utility-types/pull/163)

### Changed

- Improved Type Checking with `IsObject`: Enhanced `DeepMutable`, `DeepReadonly`, and `MapTypes` to perform stricter type checking. The previous `extends object` comparison incorrectly treated functions as objects; now, `IsObject` is implemented to ensure accurate comparisons for nested operations. [#158](https://halvaradop.github.io/ts-utility-types/pull/158)

### Fixed

- `DeepReadonly` Function Handling: Corrected an issue in the `DeepReadonly` type that caused errors when encountering function properties. The problem was resolved by using the `IsObject` type for strict checking, ensuring functions are correctly identified and handled. [#158](https://halvaradop.github.io/ts-utility-types/pull/158)

---

## [0.18.0] - 2025-03-01

### Added

- `DeepKeys` Utility Type: Added `DeepKeys` to recursively obtain all keys of an object at any depth. This new utility type enhances autocompletion and provides a more robust foundation for other deep object utility types like `DeepPick` and `DeepOmit`. [#152](https://halvaradop.github.io/ts-utility-types/pull/152)

### Changed

- Type Renames:
  - `RetrieveKeyValue` renamed to `Get`.
  - `AddPropertyToObject` renamed to `Append`.
    [#153](https://halvaradop.github.io/ts-utility-types/pull/153)

---

## [0.17.0] - 2025-02-17

### Added

- `DeepPick` Object Type: Introduced the `DeepPick` object utility type. [#146](https://halvaradop.github.io/ts-utility-types/pull/146)

- `LiteralUnion` and `RetrieveKeyValue` Types: Added `LiteralUnion` and `RetrieveKeyValue` types. [#150](https://halvaradop.github.io/ts-utility-types/pull/150)

### Changed

- Enhanced Deep Operations: Improved `Merge`, `MergeAll`, and `Intersection` utility types to support operations at any depth within the provided objects. [#150](https://halvaradop.github.io/ts-utility-types/pull/150)

### Removed

- `UnionMerge` Type: Removed the `UnionMerge` type. [#150](https://halvaradop.github.io/ts-utility-types/pull/150)

---

## [0.16.0] - 2025-02-17

### Added

- `Get` Utility Type: Introduced the `Get` utility type. [#137](https://halvaradop.github.io/ts-utility-types/pull/137)

- `Take` Utility Type: Added the `Take` utility type. [#139](https://halvaradop.github.io/ts-utility-types/pull/139)

- New Type Guards: Added `IsPositive` and `IsNegative` type guards. [#138](https://halvaradop.github.io/ts-utility-types/pull/138)

- `IsAny` Type Guard: Introduced the `IsAny` type guard. [#140](https://halvaradop.github.io/ts-utility-types/pull/140)

- `AnyOf` Utility Type: Added the `AnyOf` utility type. [#142](https://halvaradop.github.io/ts-utility-types/pull/142)

### Changed

- File Extension Renames: Renamed file extensions from `.d.ts` to `.ts`. [#136](https://halvaradop.github.io/ts-utility-types/pull/136)

- Type Renames:
  - `Unique` renamed to `Uniques`.
  - `FlattenArrayType` renamed to `Flatten`.
  - `CheckRepeatedType` renamed to `HasDuplicates`.
    [#136](https://halvaradop.github.io/ts-utility-types/pull/136)

### Removed

- Redundant String Mappers: Removed `Uppercase` and `Lowercase` string mappers, as these types are now natively provided by TypeScript. [#136](https://halvaradop.github.io/ts-utility-types/pull/136)

- Redundant Built-in Types: Removed `Pick`, `Omit`, `Parameters`, and `Exclude` types, as these are now natively provided by TypeScript. [#136](https://halvaradop.github.io/ts-utility-types/pull/136)

---

## [0.15.0] - 2024-12-01

### Added

- `Discard` Utility Type: Added the `Discard` utility type, useful for object types that compare two types and return a modified type or property. [#132](https://halvaradop.github.io/ts-utility-types/pull/132)

- `isFalsy` Validate Type: Introduced the `isFalsy` validation type. [#133](https://halvaradop.github.io/ts-utility-types/pull/133)

---

## [0.14.0] - 2024-11-29

### Added

- `GetRequired` Advanced Object Utility Type: Added the `GetRequired` advanced object utility type. [#128](https://halvaradop.github.io/ts-utility-types/pull/128)

- `GetOptional` Advanced Object Utility Type: Added the `GetOptional` advanced object utility type. [#130](https://halvaradop.github.io/ts-utility-types/pull/130)

---

## [0.13.0] - 2024-11-21

### Added

- `Unique` Type: Introduced the `Unique` type. [#125](https://halvaradop.github.io/ts-utility-types/pull/125)

- `CompareArrayLength` Type: Added the `CompareArrayLength` type. [#126](https://halvaradop.github.io/ts-utility-types/pull/126)

---

## [0.12.0] - 2024-11-20

### Added

- Module-Specific Entry Points: Added new entry points to the package, allowing easier access to specific utility types based on their functionality and category. This change improves readability and usage for users by providing a more structured way to access resources. The new entry points are: `/validate`, `/arrays`, `/objects`, `/string-mappers`, `/test`, `/type-guards`, `/types`, `/utilities`. [#123](https://halvaradop.github.io/ts-utility-types/pull/123)

---

## [0.11.1] - 2024-10-26

### Fixed

- Build Content for Packages: Corrected the package distribution content by addressing an issue where source code and building files from `types` and `validate-types` were incorrectly included.

---

## [0.11.0] - 2024-10-26

### Added

- `isFunction` Validate Type: Added the `isFunction` validation type. [#116](https://halvaradop.github.io/ts-utility-types/pull/116)

---

## [0.10.0] - 2024-09-10

### Added

- `FlattenArrayType` Utility Type: Added the `FlattenArrayType` utility type. [#110](https://halvaradop.github.io/ts-utility-types/pull/110)

---

## [0.9.0] - 2024-09-06

### Added

- `IsEven` Type Guard: Introduced the `IsEven` type guard. [#103](https://halvaradop.github.io/ts-utility-types/pull/103)

- `NumberRange` Utility Type: Added the `NumberRange` utility type. [#101](https://halvaradop.github.io/ts-utility-types/pull/101)

- `ToPrimitive` and `ReturnTypeOf` Types: Added the `ToPrimitive` utility type and the `ReturnTypeOf` type. [#99](https://halvaradop.github.io/ts-utility-types/pull/99)

- `Zip` Utility Type: Introduced the `Zip` utility type. [#98](https://halvaradop.github.io/ts-utility-types/pull/91)

### Changed

- String Mappers Refactoring: Updated string mappers for simplification and to prevent unnecessary parameters. (#96)

- Utility Types Refactoring: Updated general utility types for simplification and to prevent unnecessary parameters. (#95)

---

## [0.8.0] - 2024-09-03

### Added

- `DeepOmit` Utility Type: Added the `DeepOmit` utility type. [#91](https://halvaradop.github.io/ts-utility-types/pull/91)

- `Chunk` Utility Type: Added the `Chunk` utility type. [#92](https://halvaradop.github.io/ts-utility-types/pull/92)

---

## [0.7.0] - 2024-08-29

### Added

- `Trunc` Utility Type: Introduced the `Trunc` utility type. [#80](https://halvaradop.github.io/ts-utility-types/pull/80)

- `CheckRepeatedChars` String Utility Type: Added the `CheckRepeatedChars` string utility type. [#82](https://halvaradop.github.io/ts-utility-types/pull/82)

- `ParseUrlParams` Utility Type: Added the `ParseUrlParams` utility type. [#83](https://halvaradop.github.io/ts-utility-types/pull/83)

- `FindAll` Utility Type: Introduced the `FindAll` utility type. [#87](https://halvaradop.github.io/ts-utility-types/pull/87)

---

## [0.6.1] - 2024-08-20

### Added

- `IndexOfString` String Utility Type: Added the `IndexOfString` string utility type. [#70](https://halvaradop.github.io/ts-utility-types/pull/70)

- `FirstUniqueCharIndex` String Utility Type: Added the `FirstUniqueCharIndex` string utility type. [#71](https://halvaradop.github.io/ts-utility-types/pull/71)

- `Replace` String Utility Type: Added the `Replace` string utility type. [#75](https://halvaradop.github.io/ts-utility-types/pull/75)

- `ReplaceKeys` Utility Type: Added the `ReplaceKeys` utility type. [#76](https://halvaradop.github.io/ts-utility-types/pull/76)

### Fixed

- `emitDeclarationOnly` Configuration: Corrected the `emitDeclarationOnly` setup. It was incorrectly set to `false` before being set to `true`, which caused `validate-types` to only compile `.d.ts` files, despite containing logic and functions that require JavaScript.

---

## [0.6.0] - 2024-08-15

### Added

- `AllEquals` Utility Type: Added the `AllEquals` utility type. [#62](https://halvaradop.github.io/ts-utility-types/pull/62)

### Changed

- Type Renames:
  - `Diff` utility type renamed to `Intersection`. [#64](https://halvaradop.github.io/ts-utility-types/pull/64)
  - `ExtractToObject` renamed to `FlattenProperties`. [#67](https://halvaradop.github.io/ts-utility-types/pull/67)
  - `PublicType` renamed to `PublicOnly`. [#67](https://halvaradop.github.io/ts-utility-types/pull/67)
  - `MergeKeyObjects` renamed to `UnionMerge`. [#67](https://halvaradop.github.io/ts-utility-types/pull/67)
  - `Without` renamed to `FilterOut`. [#67](https://halvaradop.github.io/ts-utility-types/pull/67)
  - `AppendToObject` renamed to `AddProperty`. [#67](https://halvaradop.github.io/ts-utility-types/pull/67)
  - `HasKeyObjects` renamed to `RetrieveKeyValue`. [#67](https://halvaradop.github.io/ts-utility-types/pull/67)

---

## [0.5.0] - 2024-08-11

### Added

- `LastIndexOf` Utility Type: Added the `LastIndexOf` utility type. [#41](https://halvaradop.github.io/ts-utility-types/pull/41)

- `PercentageParser` Utility Type: Introduced the `PercentageParser` utility type. [#46](https://halvaradop.github.io/ts-utility-types/pull/46)

- `ConstructTuple` Utility Type: Added the `ConstructTuple` utility type. [#50](https://halvaradop.github.io/ts-utility-types/pull/50)

- `StartsWith` String Utility Type: Introduced the `StartsWith` string utility type. [#51](https://halvaradop.github.io/ts-utility-types/pull/51)

- `DropChar` String Mapper Utility Type: Added the `DropChar` string mapper utility type. [#53](https://halvaradop.github.io/ts-utility-types/pull/53)

- `IsOdd` Type Guard: Introduced the `IsOdd` type guard. [#54](https://halvaradop.github.io/ts-utility-types/pull/54)

- `CheckRepeatedTuple` String Mapper Utility Type: Added the `CheckRepeatedTuple` string mapper utility type. [#55](https://halvaradop.github.io/ts-utility-types/pull/55)

- `EndsWith` String Utility Type: Introduced the `EndsWith` string utility type. [#56](https://halvaradop.github.io/ts-utility-types/pull/56)

- `LengthOfString` Utility Type: Added the `LengthOfString` utility type. [#58](https://halvaradop.github.io/ts-utility-types/pull/58)

- `Absolute` Utility Type: Introduced the `Absolute` utility type. [#59](https://halvaradop.github.io/ts-utility-types/pull/59)

- `ObjectEntries` Utility Type: Added the `ObjectEntries` utility type. [#60](https://halvaradop.github.io/ts-utility-types/pull/60)

---

## [0.4.0] - 2024-08-06

### Added

- `Mutable` Utility Type: Added the `Mutable` utility type. [#37](https://halvaradop.github.io/ts-utility-types/pull/37)

- `AppendToObject` Utility Type: Introduced the `AppendToObject` utility type. [#38](https://halvaradop.github.io/ts-utility-types/pull/38)

---

## [0.3.0] - 2024-08-03

### Added

- `OmitByType` Utility Type: Added the `OmitByType` utility type. [#27](https://halvaradop.github.io/ts-utility-types/pull/27)

- `ExtractToObject` Utility Type: Introduced the `ExtractToObject` utility type. [#28](https://halvaradop.github.io/ts-utility-types/pull/28)

- `PublicType` Utility Type: Added the `PublicType` utility type. [#29](https://halvaradop.github.io/ts-utility-types/pull/29)

- `HasKeyObjects` Utility Type: Introduced the `HasKeyObjects` utility type. [#30](https://halvaradop.github.io/ts-utility-types/pull/20)

- `RequiredByKeys` Utility Type: Added the `RequiredByKeys` utility type. [#35](https://halvaradop.github.io/ts-utility-types/pull/35)

---

## [0.2.0] - 2024-07-31

### Added

- `Properties` and `Merge` Utility Types: Added `Properties` and `Merge` utility types. [#20](https://halvaradop.github.io/ts-utility-types/pull/20)

- `IsNever` Type Guard: Introduced the `IsNever` type guard. [#22](https://halvaradop.github.io/ts-utility-types/pull/22)

- `Diff` Utility Type: Added the `Diff` utility type. [#23](https://halvaradop.github.io/ts-utility-types/pull/23)

- `PickByType` Utility Type: Added the `PickByType` utility type. [#24](https://halvaradop.github.io/ts-utility-types/pull/24)

- `PartialByKeys` Utility Type: Added the `PartialByKeys` utility type. [#25](https://halvaradop.github.io/ts-utility-types/pull/25)

---

## [0.1.0] - 2024-07-26

### Added

- Built-in String Types: Added support for `Lowercase`, `Uppercase`, and `Capitalize` string built-in types, directly provided by TypeScript. [#18](https://halvaradop.github.io/ts-utility-types/pull/18)

- `Expected` Type Guard: Introduced the `Expected` type guard. [#18](https://halvaradop.github.io/ts-utility-types/pull/18)

---

## [0.0.6] - 2024-07-23

### Added

- Validation Types: Added `isNullish`, `isBoolean`, `isString`, `isNumber`, `isObject`, and `isArray` validation types for type checking. [#15](https://halvaradop.github.io/ts-utility-types/pull/15)

- `Omit` Built-in Type: Added `Omit` based on TypeScript's built-in type. [#16](https://halvaradop.github.io/ts-utility-types/pull/16)

- String Utility Types: Added `Trim`, `TrimLeft`, and `TrimRight` string utility types. [#16](https://halvaradop.github.io/ts-utility-types/pull/16)

### Changed

- Type Rename: `WhiteSpace` renamed to `WhiteSpaces` for improved readability. [#16](https://halvaradop.github.io/ts-utility-types/pull/16)

---

## [0.0.5] - 2024-07-19

### Added

- `isPrimitive` and `isPrimitiveNullish` Functions: Added `isPrimitive` and `isPrimitiveNullish` functions for checking if a type matches an expected value. [#12](https://halvaradop.github.io/ts-utility-types/pull/12)

- Built-in Type Utilities: Added `Exclude`, `Awaited`, `Parameters`, and `Pick` based on TypeScript's built-in types. Additionally, `Includes` and `Equals` utility types were introduced. [#13](https://halvaradop.github.io/ts-utility-types/pull/13)

---

## [0.0.4] - 2024-07-17

### Added

- `TupleToUnion` Utility Type: Added the `TupleToUnion` utility type. [#6](https://halvaradop.github.io/ts-utility-types/pull/6)

- Tuple Utility Types: Added `Size`, `Last`, and `Pop` utility types for tuple manipulation. [#8](https://halvaradop.github.io/ts-utility-types/pull/8)

- Primitive Utility Types: Added `PrimitiveNullish` and `WhiteSpace` utility types. [#9](https://halvaradop.github.io/ts-utility-types/pull/9)

---

## [0.0.3] - 2024-07-13

### Fixed

- Package Distribution: Corrected the package distribution content by setting `declaration` and `declarationDir` fields, ensuring types are accessible to users. [#3](https://halvaradop.github.io/ts-utility-types/pull/3)

---

## [0.0.2] - 2024-07-13

### Added

- `ArgsFunction`, `Nullish` and `Primitive` utility types: Introduced these utility types. [#2](https://halvaradop.github.io/ts-utility-types/pull/2)

---

## [0.0.1] - 2024-07-13

### Added

- Initial Release: Added `Prettify` and `DeepReadonly` utility types. [#1](https://halvaradop.github.io/ts-utility-types/pull/1)

[0.20.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.19.0...v0.20.0
[0.19.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.18.0...v0.19.0
[0.18.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.17.0...v0.18.0
[0.17.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.16.0...v0.17.0
[0.16.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.15.0...v0.16.0
[0.15.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.13.0...v0.14.0
[0.13.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.11.1...v0.12.0
[0.11.1]: https://github.com/halvaradop/ts-utility-types/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.6.1...v0.7.0
[0.6.1]: https://github.com/halvaradop/ts-utility-types/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/halvaradop/ts-utility-types/compare/v0.0.6...v0.1.0
[0.0.6]: https://github.com/halvaradop/ts-utility-types/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/halvaradop/ts-utility-types/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/halvaradop/ts-utility-types/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/halvaradop/ts-utility-types/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/halvaradop/ts-utility-types/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/halvaradop/ts-utility-types/releases/tag/v0.0.1
