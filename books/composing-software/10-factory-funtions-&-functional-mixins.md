# Factory Functions

A factory function is any function which is not a class or constructor that returns a (presumably new) object. In JavaScript, any function can return an object. When it does so without the new keyword, it’s a factory function.

## Literals for One, Factories for Many

If you need to create many objects, you’ll want to combine the power of object literals and factory functions.

```js
const createUser = ({ userName, avatar }) => ({
  userName,
  avatar,
  setUserName (userName) {
    this.userName = userName;
    return this;”
  }
});
```

# Functional mixins

**Functional mixins** are composable factory functions which connect together in a pipeline; each function adding some properties or behaviors like workers on an assembly line. Functional mixins don’t depend on or require a base factory or constructor: Simply pass any arbitrary object into a mixin, and an enhanced version of that object will be returned.

Functional mixin features:

* Data privacy/encapsulation
* Inheriting private state
* Inheriting from multiple sources
* No diamond problem (property collision ambiguity) – last in wins
* No base-class requirement

## What are mixins?

**Mixins** are a form of object composition, where component features get mixed into a composite object so that properties of each mixin become properties of the composite object.

```js
const chocolate = {
  hasChocolate: () => true
};
 
const caramelSwirl = {
  hasCaramelSwirl: () => true
};
 
const pecans = {
  hasPecans: () => true
};
 
const iceCream = Object.assign({}, chocolate, caramelSwirl, pecans);

/*
// or, if your environment supports object spread...
const iceCream = {...chocolate, ...caramelSwirl, ...pecans};
*/

console.log(`
  hasChocolate: ${ iceCream.hasChocolate() }
  hasCaramelSwirl: ${ iceCream.hasCaramelSwirl() }
  hasPecans: ${ iceCream.hasPecans() }
`);
```

## What is functional inheritance?

**Functional inheritance** is the process of inheriting features by applying an augmenting function to an object instance. The function supplies a closure scope which you can use to keep some data private. The augmenting function uses dynamic object extension to extend the object instance with new properties and methods.

Let’s look at an example from Douglas Crockford, who coined the term:

```js
// Base object factory
function base(spec) {
    var that = {}; // Create an empty object
    that.name = spec.name; // Add it a "name" property
    return that; // Return the object
}

// Construct a child object, inheriting from "base"
function child(spec) {
    var that = base(spec); // Create the object through  "base" constructor
    that.sayHello = function() { // Augment that object
        return 'Hello, I\'m ' + that.name;
    };
    return that; // Return it
}

// Usage
var result = child({ name: 'a functional object' });
console.log(result.sayHello()); // 'Hello, I'm a functional object
```

## What is a functional mixin?

**Functional mixins** are composable functions which mix new properties or behaviors into existing objects. Functional mixins don’t depend on or require a base factory or constructor: Simply pass any arbitrary object into a mixin, and it will be extended.

## When to Use Functional Mixins

You should always use the simplest possible abstraction to solve the problem you’re working on. Start with a pure function. If you need an object with persistent state, try a factory function. If you need to build more complex objects, try functional mixins.

Here are some good use-cases for functional mixins:

* Application state management, e.g., something similar to a Redux store.
* Certain cross-cutting concerns and services, e.g., a centralized logger.
* Composable functional data types, e.g., the JavaScript Array type implements Semigroup, Functor, Foldable… Some algebraic structures can be derived in terms of other algebraic structures, meaning that certain derivations can be composed into a new data type without customization.

**React users**: *class* is fine for lifecycle hooks because callers aren’t expected to use *new*, and documented best-practice is to avoid inheriting from any components other than the React-provided base components.

## Caveats

Most problems can be elegantly solved using pure functions. The same is not true of functional mixins. Like class inheritance, functional mixins can cause problems of their own. In fact, it’s possible to faithfully reproduce all of the features and problems of class inheritance using functional mixins.

You can avoid that, though, using the following advice:


* **Favor pure functions > factories > functional mixins > classes**
* Avoid the creation of is-a relationships between objects, mixins, or data types
  Avoid implicit dependencies between mixins – wherever possible, functional mixins should be self-contained, and have no knowledge of other mixins
* “Functional mixins” doesn’t mean “functional programming”
* There may be side-effects when you access a property using Object.assign() or object spread syntax ({...object}). You’ll also skip any non-enumerable properties. ES2017 added Object.getOwnPropertyDescriptors() to get around this problem.

Excerpt From
Composing Software
Eric Elliott
This material may be protected by copyright.
