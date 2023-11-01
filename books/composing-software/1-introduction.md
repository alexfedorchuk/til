# Composing software. Introduction

The process of software developmemt is breaking down large problems into small problems, building components that solve that solve these problems, then composing those component together to form a complete application.

## Composing Functions

**Function composition** is the process of applying function to the output of another function.

Writing functions without mention of the arguments is called "point-free style".

Point-free style can be taken too far, but a little bit here and there is great because those intermediary variables add unnecessary complexity to your functions.

There are several benefits to reduced complexity:

* Working memory: wm models typically involve 4-7 discrete quanta;
* Signal to Noise Ratio
* Surface Area for Bugs: Less code = less surface area for bugs = fewer bugs.

## Composing Objects

> Favor object composition over class inheritance
> -- <cite>the Gang of Four</cite>

Any time your build any non-primitive data structure (Arrays, Sets, Maps, etc), **you're performing some kind of object composition**.

Three kinds of object compositional relationship:

* delegation (when an object delegates property access to another object)
* acquaintance (when an object knows about another object be reference: a uses-a relationship)
* aggregation (when child objects form part of a parent object: a has-a relationhip, e.g., DOM node)

Class inheritance is just one kind of composite object construction. “Favor object composition over class inheritance” means that you should form composite objects from small component parts, rather than inheriting all properties from an ancestor in a class hierarchy.”

Well-known problems in object oriented design:

* The tight coupling problem
* The fragile class problem
* The inflexible hirerarchy problem
* The duplication by necessity problem
* The gorilla/banana problem

The most common form of object composition in JavaScript is known as object concatenation (aka, concatenative inheritance: informally, “mixin composition”).

## Lambda Calculus

LC is a univesal model of computation based on **function application**.

In lambda calculus, functions are king.

There are three important points that make lambda calculus special:

1. Functions are always anonymous. `const sum = (x, y) => x + y` is the anonymus functions expression (the right side).
2. Functions in lambda calculus are *always unary*, meaning they only accept a single parameter.
3. Functions are first-class, meaning that functions can be used as inputs to other functions, and functions can return functions.

Together, these features form a simple, yet expressive vocabulary for compoing software using functions as the primary building block.

## Functional Programming

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

## What is Functional Programming?

**Functional programming** is a programming paradigm where applications are composed using pure functions, avoiding shared mutable state and side-effects. Functional programming is usually more declarative than imperative, meaning that we express what to do rather than how to do it.

Functional programming favors:

* **Pure functions** over shared state and side effects
* **Immutability** over mutable data
* **Function composition** over imperative flow control
* **Generic** utilities that act on many data types over object methods that only operate on ther colocated data
* **Declarative** over imperative code (what to do, rather how to do it)
* **Expression** over statments

### Pure Functions

A pure function is a functions which:

* Given the same inputes, always returns the same output, and
* Has no side-effects

Pure functions have lows of preperties that are important in functional programming, including referential transparency (you can replace a function call with its resulting value without changing the meaning of the program).

### Function Composition

Function composition is the process of combining two or more functions in order to produce a new function or perform some computation.

### Shared State

Shared state is any variable, object, or memory space that exists in a shared scope, or as the property of an object being passed between scopes. A shared scope can include global scope or closure scopes. Often, in object oriented programming, objects are shared between scopes by adding properties to other objects.

The problem with shared state is that in order to understand the effects of a function, you have to know the entire history of every shared variable that the function uses or affects.

When you avoid shared state, the timing and order of function calls don’t change the result of calling the function. With pure functions, given the same input, you’ll always get the same output. This makes function calls completely independent of other function calls, which can radically simplify changes and refactoring.

Remove function call timing dependency, and you eliminate an entire class of potential bugs.

### Immutability

An immutable object is an object that can’t be modified after it’s created. Conversely, a mutable object is any object which can be modified after it’s created.

Immutability is a central concept of functional programming because without it, the data flow in your program is lossy. State history is abandoned, and strange bugs can creep into your software.

In JavaScript, it’s important not to confuse const, with immutability. const creates a variable name binding which can’t be reassigned after creation. const does not create immutable objects. You can’t change the object that the binding refers to, but you can still change the properties of the object, which means that bindings created with const are mutable, not immutable.

In many functional programming languages, there are special immutable data structures called trie data structures (pronounced “tree”) which are effectively deep frozen — meaning that no property can change, regardless of the level of the property in the object hierarchy.

Tries use structural sharing to share reference memory locations for all the parts of the object which are unchanged after a “mutation”, which uses less memory, and enables significant performance improvements for some kinds of operations.

### Side Effects

A side effect is any application state change that is observable outside the called function other than its return value. Side effects include:

* Modifying any external variable or object property (e.g., a global variable, or a variable in the parent function scope chain)
* Logging to the console
* Writing to the screen
* Writing to a file
* Writing to the network
* Triggering any external process
* Calling any other functions with side-effects

Side effects are mostly avoided in functional programming, which makes the effects of a program easier to extend, refactor, debug, test, and maintain. This is the reason that most frameworks encourage users to manage state and component rendering in separate, loosely coupled modules.

### Reusability Through Higher Order Functions

A higher order function is any function which takes a function as an argument, returns a function, or both. Higher order functions are often used to:

* Abstract or isolate actions, effects, or async flow control using callback functions, promises, monads, etc.
* Create utilities which can act on a wide variety of data types
* Partially apply a function to its arguments or create a curried function for the purpose of reuse or function composition
* Take a list of functions and return some composition of those input functions

Functional programming tends to reuse a common set of functional utilities to process data. Object oriented programming tends to colocate methods and data in objects. In most object-oriented software, those colocated methods can only operate on the type of data they were designed to operate on, and often only the data contained in that specific object instance.

### Containers, Functors, Lists, and Streams

A **functor data structure** is a data structure that can be mapped over (e.g., [1,2,3].map(x => x * 2)). In other words, it’s a container which has an interface which can be used to apply a function to the values inside it. When you see the word functor, you should think “mappable”.

### Declarative vs Imperative

Functional programming is a declarative paradigm, meaning that the program logic is expressed without explicitly describing the flow control.

* Imperative programs spend lines of code describing the specific steps used to achieve the desired results — the flow control: How to do things.
* Declarative programs abstract the flow control process (the how gets abstracted away), and instead spend lines of code describing the data flow: What to do.

Imperative code frequently utilizes statements. A **statement** is a piece of code which performs some action. Examples of commonly used statements include for, if, switch, throw, etc.

Declarative code relies more on expressions. An **expression** is a piece of code which evaluates to some value. Expressions are usually some combination of function calls, values, and operators which are evaluated to produce the resulting value.