# “Composing Software: An Introduction”

The process of software development is breaking down large problems into small problems, building components that solve that solve these problems, then composing those component together to form a complete application.

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

Class inheritance is just one kind of composite object construction. All classes produce composite objects, but not all composite objects are produced by classes or class inheritance. “Favor object composition over class inheritance” means that you should form composite objects from small component parts, rather than inheriting all properties from an ancestor in a class hierarchy.

Well-known problems in object oriented design:

* The tight coupling problem
* The fragile class problem
* The inflexible hirerarchy problem
* The duplication by necessity problem
* The gorilla/banana problem

The most common form of object composition in JavaScript is known as object concatenation (aka, concatenative inheritance: informally, “mixin composition”).


> The essence of software development is composition.

## Lambda Calculus

LC is a univesal model of computation based on **function application**.

In lambda calculus, functions are king.

There are three important points that make lambda calculus special:

1. Functions are always anonymous. `const sum = (x, y) => x + y` is the anonymus functions expression (the right side).
2. Functions in lambda calculus are *always unary*, meaning they only accept a single parameter.
3. Functions are first-class, meaning that functions can be used as inputs to other functions, and functions can return functions.

Together, these features form a simple, yet expressive vocabulary for compoing software using functions as the primary building block.

[<-- Back](./readme.md)
