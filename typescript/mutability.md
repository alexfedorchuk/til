# Mutability

## Variable Declaration and Type Inference

When using the `let` keyword, the variable is mutable and can be reassigned. Therefore, it will infer a wider type in order to accommodate the variable being reassigned.

```ts
let albumGenre = "rock"; // let albumGenter: string
```

When using `const`, the variable is immutable and cannot be reassigned.


```ts
const albumGenre = "rock"; // const albumGenter: "rock"
```

## Object Property Inference

Objects are mutable in JavaScript, meaning their properties can be changed after they are created.

```ts
const updateStatus = (attributes: AlbumAttributes) => {
  // ...
};

/**
 * const albumAttributes: {
 *   status: string;
 * }
 */
const albumAttributes = {
  status: "on-sale",
};

updateStatus(albumAttributes); // Error
```

How we can to fix this issue?

**Using inline object**

When inlining the object, TypeScript knows that there is no way that object properties could be changed before it is passed into the function.

```ts
updateStatus({
  status: "on-sale",
}); // No error
```

**Adding a Type to the Object**

This behaviour works the same for all object-like structures, including arrays and tuples. 

```ts
const albumAttributes: AlbumAttributes = {
  status: "on-sale",
};

updateStatus(albumAttributes); // No error
```

## Readonly Object Properties

Note that this only occurs on the type level. At runtime, the properties are still mutable. TypeScript is just helping us catch potential errors.

```ts
interface Album {
  readonly title: string;
  readonly artist: string;
  status?: "new-release" | "on-sale" | "staff-pick";
  genre?: string[];
}
```

**The Readonly Type Helper**

TypeScript provides a type helper called `Readonly`.

`Readonly` only operates on the first level. It won't make properties read-only recursively.

```ts
const readOnlyWhiteAlbum: Readonly<Album> = {
  title: "The Beatles (White Album)",
  artist: "The Beatles",
  status: "staff-pick",
};
```

**Readonly Arrays**

Does not affect runtime behavior of the array.

```ts
const readOnlyGenres: readonly string[] = ["rock", "pop", "unclassifiable"];
const readOnlyGenres: ReadonlyArray<string> = ["rock", "pop", "unclassifiable"];
```

## Deep Immutability with `as const`

We've seen so far that objects and arrays are mutable in JavaScript. This leads to their properties being inferred widely by TypeScript.

The `as const` assertion has made the entire object deeply read-only, including all of its properties.

```ts
const albumAttributes = {
  status: "on-sale",
} as const;
```

This makes `as const` ideal for large config objects that you don't expect to change.

**`as const` vs Variable Annotations**

When you have a competition like this, the variable annotation wins. The variable *owns* the value, and forgets whatever the explicit value was before.

```ts
const albumAttributes: AlbumAttributes = {
  status: "on-sale",
} as const;
```
