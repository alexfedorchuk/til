# Deriving Types

> Explore TypeScript's advanced type derivation techniques: keyof, typeof, indexed access types, and as const for enums.

## The `keyof` Operator

The `keyof` operator allows you to extract the keys from an object type into a union type.

```ts
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
}

type AlbumKeys = keyof Album; // "title" | "artist" | "releaseYear"
```

### Get An Object's Values With `keyof`

```ts
//  default
type AlbumPropertyTypes = Album["title" | "isSingle" | "releaseYear"];

// or

type AlbumPropertyTypes = Album[keyof Album];
```

This is a great pattern to use when you want to extract all of the values from an object type. `keyof Obj` will give you a union of all the *keys* in `Obj`, and `Obj[keyof Obj]` will give you a union of all the *values* in `Obj`.

## The `typeof` Operator

The `typeof` operator allows you to extract a type from a value.

```ts
const albumSales = {
  "Kind of Blue": 5000000,
  "A Love Supreme": 1000000,
  "Mingus Ah Um": 3000000,
};

type AlbumSalesType = typeof albumSales;

// we can use `keyof` to extract the keys from the albumSales object
type AlbumTitles = keyof AlbumSalesType; // "Kind of Blue" | "A Love Supreme" | "Mingus Ah Um"

// or
type  AlbumTitles = keyof typeof albumSales;
```

Use the `typeof` keyword whenever you need to extract types based on runtime values, including objects, functions, classes, and more.


## Using `as const` For JavaScript-Style Enums

```ts
const albumTypes = {
  CD: "cd",
  VINYL: "vinyl",
  DIGITAL: "digital",
} as const;
```

We can now derive the types we need from `albumTypes` using `keyof` and `typeof`. For instance, we can grab the keys using `keyof`:

```ts
type UppercaseAlbumType = keyof typeof albumTypes; // "CD" | "VINYL" | "DIGITAL"
```

We can also grab the `values` using `Obj[keyof Obj]`:

```ts
type AlbumType = (typeof albumTypes)[keyof typeof albumTypes]; // "cd" | "vinyl" | "digital"
```

In general, if you're working with a team that's used to `enum`, you should use `enum`. But if I were starting a project today, I would use `as const` instead of enums.

## Deriving Types from Functions

* `Parameters`
* `ReturnType`
* `Awaited`