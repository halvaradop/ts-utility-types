# @halvaradop/ts-utility-types

This package provides a collection of utility types designed to enhance productivity and improve the readability of your TypeScript code. It simplifies common tasks and promotes cleaner code structure.

## Installation

To install @halvaradop/ts-utility-types as a dependency in your project, run the following command:

```bash
npm i --save-dev @halvaradop/ts-utility-types
// or
npm i -D @halvaradop/ts-utility-types

```

## Usage

Once installed, you can import the types from your typescript files

```ts
import { Merge } from "@halvaradop/ts-utility-types";

interface Config {
  storePaths: string[];
  hooks: unknown[];
}

interface AppStore {
  path: string;
  hooks: ArgsFunction[];
}
// Expect: { storePaths: string[], path: string, hooks: ArgsFunction[] }
export type Store = Merge<Config, AppStore>;
```

## TypeHero Challenges

This repository offers solutions to challenges found on [TypeHero](https://typehero.dev/), constructed entirely from scratch without leveraging built-in TypeScript utility types

## Contributing

We welcome contributions to `@halvaradop/ts-utility-types`! If you have an idea for a new type or find an improvement to an existing one, please feel free to open an issue or create a pull request. We offer a guide on how to contribute to the project and the necessary steps to do so. Here's how you can contribute, Read our [Contribuing Guideline](https://github.com/halvaradop/.github/blob/master/.github/CONTRIBUTING.md).

## Code of conduct

Please be aware that this project has a code of conduct, and we expect all contributors to follow these guidelines in their interactions. For more information, please read our [Code of Conduct](https://github.com/halvaradop/.github/blob/master/.github/CODE_OF_CONDUCT.md).
