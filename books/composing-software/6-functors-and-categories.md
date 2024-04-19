# Functors and Categories

A **functor data type** is something you can map over. It’s a container which has a map operation which can be used to apply a function to the values inside it. When you see a functor datatype, you should think *“mappable”*. In JavaScript, functor types are typically represented as an object with a `.map()` method that maps from inputs to outputs, e.g., `Array.prototype.map()`.

In category theory, a *functor is a structure preserving map from category to category*, where “structure preserving” means that the relationships between objects and morphisms are retained.

A *category* is a collection of objects and arrows between objects. Arrows represent morphisms, which we can roughly think of as functions in code. Each object in a category has an identity morphism. For any chain of objects there exists a composition.

## Why Functors?

* The details of the underlying data structure implementation are abstracted away. Users don’t need to know if iteration is required,   or how it’s handled if it is. You can map over arrays, streams, trees, or anything else.
* Functors hide the types of the data they contain, which allows you to act on the containers using generic functions, without caring about what you’re storing inside them. You don’t need special arrays for numbers, and special arrays for strings. Instead, you pass functions into map() that can deal with the type contained inside the functor.
* Mapping over an empty functor is the same as mapping over a functor containing many items. Switching logic is not needed in the case of an empty collection, and there’s no need to keep track of iteration state if the data structure enumerates over a collection of items.
* Most importantly, functors allow you to easily compose functions over the data inside.

Functors are great higher-order abstractions that allow you compose functions over the contents of a container without coupling those functions to the structure or implementation details of the functor data type. Functors form the foundation of other very useful algebraic structures, such as monads.

## Build Your Own Functor

```js
const Indentity = (value) => ({
  map: (fn) => Indentity(fn(value)),
})
```

*Identity* takes a *value* and returns an object with a *.map()* method. The .map() method takes a function and returns the result of applying the function to the *value* inside the *Identity*. The returned value is wrapped inside another Identity. Functor maps always return an instance of the same functor type: Array on the left? Array on the right. Stream on the left? Stream on the right. Promise on the left? Promise on the right, and so on.