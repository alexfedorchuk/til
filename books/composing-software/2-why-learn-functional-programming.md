## Why Learn Functional Programming in JavaScript?

JavaScript has the most important features nedeed for functional programming:

1. **First class functions:** The ability to use functions as data values: pass functions as arguments, return functions, and assign functions to variables and object properties. This property allow for higher order functions, which enable partial application, currying, and composition.
2. **Anonymous functions and concise lambda syntext:** `x => x * 2` is a valid function expression in JavaScript. Concise lambdas make it easier to work with higher-order functions.
3. **Closures:** A closure is the bundling of a function with its lexical environment. Closures are created at function creation time. When a function is defined inside another function, it has access to the variable binding in the outer function, even after the outer function exists. Closures are how partial applications get their fixed arguments. A **fixed** argument is an argument bound in the closure scope of a returned function.

### What JavaScript is Missing

1. **Purity:** In some FP languages, purity is enforced by the language. Expressions with side-effects are not allowed.
2. **Immutability:** Some FP languages disable mutations. Instead of mutating an existing data structure, such as an array or object, expressions evaluate to new data structures. This may sound inefficient, but most functional languages use trie data structures under the hood, which feature structural sharing: meaning that the old object and new object share references to the data that is the same.
3. **Recursion:** Recursion is the ability for a function to reference itself for the purpose of iteration. In many FP languages, recursion is the only way to iterate. There are no loop statements like for, while, or do loops.

** Recursion: JavaScript technically supports recursion, but most functional languages have a feature called proper tail calls. Proper tail calls are a language feature which allows recursive functions to reuse stack frames for recursive calls.

Without proper tail calls, a call stack can grow without bounds and cause a stack overflow. JavaScript technically proper tail calls in the ES6 specification. Unfortunately, only one of the major browser engines enabled it as a default feature, and the optimization was partially implemented and then subsequently removed from Babel (the most popular standard JavaScript compiler, used to compile ES6 to ES5 for use in older browsers).

### What is a Function?

A function is a process which takes some input, called arguments, and produces some output called a return value. Functins may server the following purposes:

* **Mapping:** Produce some output based on given inputs. A function maps input values to output values.
* **Procedures:** A function may be called to perform a sequence of steps. The sequence is known as a procedure, and programming in this tyle is known as procedural programming.
* **I/O:** Some functions exist to communicate with other parts of the system, such as the screen, storage, ststem logs, or network.

#### Mapping

Pure functions are all about mapping. If you want **referential transparency**, you need to use pure functions.

[<-- Back](./readme.md)
