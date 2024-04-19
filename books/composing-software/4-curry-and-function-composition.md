# Curry and Function Composition

## What is curried function?

A curried function is a function that takes multiple arguments one at a time. Given a function with 3 parameters, the curried version will take one argument and return a function that takes the next argument, which returns a function that takes the third argument. The last function returns the result of applying the function to all of its arguments.

`const add = a => b => a + b`

The `add` function takes one argument, and then returns a `partial application` of itself with a `fixed` in the closure scope. A `closure` is a function bundled with its lexical scope. Closures are created at runtime during function creation. `Fixed` means that the variables are assigned values in the closure’s bundled scope.

```js
function curry(f) {
  return function curried(...args) {
    if (args.length === f.length) {
      return f.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
```

## What is partial application?

A partial application is a function which has been applied to some, but not yet all of its arguments. In other words, it’s a function which has some arguments *fixed* inside its closure scope. A function with some of its parameters fixed is said to be *partially applied*.

### What’s the Difference?

Partial applications can take as many or as few arguments a time as desired. Curried functions on the other hand always return a unary function: a function which takes one argument.

All curried functions return partial applications, but not all partial applications are the result of curried functions.

The unary requirement for curried functions is an important feature.

## What is point-free style?

Point-free style is a style of programming where function definitions do not make reference to the function’s arguments. Let’s look at function definitions in JavaScript.

## Why do we curry?

Curried functions are particularly useful in the context of **function composition**, because they allow you to easily convert an n-ary function into the unary function form needed for function composition pipelines: Functions in a pipeline must expect exactly one argument.

Data last functions are convenient for function composition, because they can be easily used in point-free style.