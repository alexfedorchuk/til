# Objects

## Intersection Types

An intersection type lets us combine multiple object types into a single type. It uses the `&` operator.
Using the intersection operator `&` combines multiple separate types into a single type.
This is a useful method for creating new types from existing ones.

```ts
type Album = {
  title: string;
  artist: string;
  releaseYear: number;
};

type SalesData = {
  unitsSold: number;
  revenue: number;
};

type AlbumSales = Album & SalesData; // title, artist, releaseYear, unitsSold, revenue
```

### Intersection Types With Primitives

```ts
type StringAndNumber = string & number; // never
```

It's actually `never`. This is because string and number have innate properties that can't be combined together.
This also happens when you intersect two object types with an incompatible property.

## Interfaces

Interfaces let you declare object types using a slightly different syntax to `type`.

```ts
interface Album {
  title: string;
  artist: string;
  releaseYear: number;
}

interface StudioAlbum extends Album {
  studio: string;
  producer: string;
}
```

### Intersections vs interface extends

You should choose `interface extends` for two reasons.

**Better Errors When Merging Incompatible Types**

When you intersect two object types with an incompatible property, TypeScript will resolve the property to `never`.
When using interface extends, TypeScript will raise an error when you try to extend an interface with an incompatible property.

So, `interface extends` is better for catching errors when building out your types.

**Better TypeScript Performance**

With intersections, the intersection is recomputed every time it's used. This can be slow, especially when you're working with complex types.

Interfaces are faster. TypeScript can cache the resulting type of an interface based on its name. So if you use `interface extends`, TypeScript only has to compute the type once, and then it can reused it every time you use the interface.

**Conclusion**

`interface extends` is better for catching errors and for TypeScript performance.

## Types vs Interfaces

* **Types can be anything** - Type aliases are a lot more flexible than interfaces. A `type` can represent anything – union types, object types, intersection types, and more. An `interface` can only represent object types (and functions)
* **Declaration merging** - When multiple interfaces with the same name in the same scope are created, TypeScript automatically merges them. This is very different from `type`, which would give you an error if you tried to declare the same type twice

**Conclusion**

I tend to default to `type` unless I need to use interface extends. This is because `type` is more flexible and doesn't declaration merge unexpectedly.

## Dynamic Object Keys

**Index Signatures for Dynamic Keys**

The `[index: string]: boolean` syntax is an index signature. 

```ts
const albumAwards: {
  [index: string]: boolean;
} = {};
```

**Using a Record for Dynamic Keys**

```ts
const albumAwards: Record<string, boolean> = {};

const albumAwards1: Record<"Grammy" | "MercuryPrize" | "Billboard", boolean> = {
  Grammy: true,
  MercuryPrize: false,
  Billboard: true,
};
```

Index signatures can't use literal types, but `Record` can.

The `Record` type helper is a repeatable pattern that's easy to read and understand, and is a bit more flexible than an index signature. It's my go-to for dynamic keys.

**Combining Known and Dynamic Keys**

```ts
type BaseAwards = "Grammy" | "MercuryPrize" | "Billboard";

type ExtendedAlbumAwards = Record<BaseAwards, boolean> & {
  [award: string]: boolean;
};

// Or

interface BaseAwards {
  Grammy: boolean;
  MercuryPrize: boolean;
}

interface ExtendedAlbumAwards extends BaseAwards {
  [award: string]: boolean;
}
```

**PropetyKey**

The `PropertyKey` type is a global type that represents the set of all possible keys that can be used on an object, including string, number, and symbol.

```ts
// inside lib.es5.d.ts
declare type PropertyKey = string | number | symbol;
```

**object**

**object** represents any non-primitive type. This includes arrays, functions, and objects.
**object** type is rarely useful by itself. Using Record is usually a better choice. For instance, if you want to accept any object type, you can use `Record<string, unknown>`.

```ts
function acceptAllNonPrimitives(obj: object) {}

// Ok
acceptAllNonPrimitives({});
acceptAllNonPrimitives([]);
acceptAllNonPrimitives(() => {});

// Not ok
acceptAllNonPrimitives(1);
```

## Excess Property Warnings

```ts
const myFetch = (options: { url: string; timeout?: number }) => {
  // Implementation
};

const options = {
  url: "/",
  timeOut: 1000,
};

myFetch(options); // No error!
```

**Open vs Closed Object Types**

TypeScript, by default, treats all objects as open. At any time, it expects that other properties might be present on objects. Open objects more closely reflect how JavaScript actually works.
