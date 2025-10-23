# Annotations and Assertations

## Annotating Variable vs Values

### When You Annotate a Variable, the Variable Wins

```ts
type Color =
  | string
  | {
      r: number;
      g: number;
      b: number;
    };

const config: Record<string, Color> = {
  foreground: { r: 255, g: 255, b: 255 },
  background: { r: 0, g: 0, b: 0 },
  border: "transparent",
};

config.foreground.r;
// Property 'r' does not exist on type 'Color'.
// Property 'r' does not exist on type 'string'.
```

We annotated the variable, but the actual _value_ got discarded. This is an important point - when you annotate a variable, TypeScript will:

1. Ensure that the value passed to the variable matches the annotation.
2. Forget about the value's type.

### With no Annotations, the Value Wins

```ts
const config = {
  foreground: { r: 255, g: 255, b: 255 },
  background: { r: 0, g: 0, b: 0 },
  border: "transparent",
};

// No error
const config = {
  foreground: 123,
};
```

**config** is inferred as the type of the value provided. But now we've lost the ability to check that the `Color` type is correct.

### Annotating Values with `satisfies`

The `satisfies` operator is a way to tell TypeScript that a value must satisfy certain criteria, but still allow TypeScript to infer the type.

Now, we get the best of both worlds. This means we can access the keys without any issues:

```ts
const config = {
  foreground: { r: 255, g: 255, b: 255 },
  background: { r: 0, g: 0, b: 0 },
  border: "transparent",
} satisfies Record<string, Color>;

config.foreground.r; // OK

config.border.toUpperCase(); // OK
```

Let's recap:

* When you use a variable annotation, the variable's type wins.
* When you don't use a variable annotation, the value's type wins.
* When you use `satisfies`, you can tell TypeScript that a value must satisfy certain criteria, but still allow TypeScript to infer the type.

## Assertations: Forcing the Type of Values

### The `as` Assertation

The `as` assertion is a way to tell TypeScript that you know more about a value than it does. It's a way to override TypeScript's type inference and tell it to treat a value as a different type.

```ts
const searchParams = new URLSearchParams(window.location.search); 
const id = searchParams.get("id"); // string | null

const id = searchParams.get("id") as string;
// Or
const id = <string>searchParams.get("id");
```

`as` has some limits on how it can be used. It can't be used to convert between unrelated types.

```ts
const albumSales = "Heroes" as number; // Error
```

We could double up on the `as` assertions to first assert the string as `unknown` and then as a `X`:

```ts
const albumSales = "Heroes" as unknown as number; // no error
```

So, `as` does have some built-in safeguards. But by using `as unknown as X`, you can easily bypass them.

## The Non-null Assertations

Another assertion we can use is the non-null assertion, which is specified by using the `!` operator. This provides a quick way to tell TypeScript that a value is not `null` or `undefined`.

```ts
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id")!;
```

## Error Suppression Directives

* `@ts-expect-error`
* `@ts-ignore`
* `@ts-nocheck`

### Suppresseion Errors vs `as any`

`as any` is an extremely powerful tool because it combines a lie to TypeScript (`as`) with a type that disables all type checking (`any`).

```ts
const result = addOne({} as any);
```

When there's a choice with how to suppress an error, I prefer using `as any`. Error suppression directives are too broad - they target the entire line of code. Using `as any` instead is more precise.