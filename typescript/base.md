# TypeScript

TypesScript gives us types, powerful IDE features like autocomplete, automatic imports, inline errors, and automatic refactors. TypeScript server starts in the background, it will be active as long as you have a TS file open. TypeScript IDE server is running on JavaScript files too.

TS catches Runtime Errors and Non-Runtime Errors. Reading errors bottom-to-top can be a helpful strategy when dealing with multi-line TypeScript errors.

## Essential Types and Annotations

### Basic Annotations

* Variables don't always need annotations
* Function parameters always need annotations

When TS doesn't know what type something is, it assigns it the `any` type.

### Object Litaral Types

```ts
const talkToAnimal = (animal: { name: string; type: string; age: number }) => {
  // rest of function body
};
```

### Type Alias

```ts
type Animal = {
  name: string;
  type: string;
  age?: number;
};
```

### Tuples

```ts
// Tuple
let album: [string, number] = ["Rubber Soul", 1965];
```

#### Named Tuples

This can be helpful when you have a tuple with a lot of elements, or when you want to make the code more readable.

```ts
type MyTuple = [album: Album, playCount: number];
```

### Typing Functions

Function parameters always need annotations:

```ts
const logAlbumInfo = (
  title: string,
  // Default parameters
  format: string = "CD",
  // Optional parameters
  releaseDate?: string,
  // Rest parameters
  ...rest: string[]
) => {
  // rest of function body
};
```

### Function Types

```ts
// Optional parameters
type WithOptional = (index?: number) => number;

// Rest parameters
type WithRest = (...rest: string[]) => number;

// Multiple parameters
type WithMultiple = (first: string, second: string) => number;
```
