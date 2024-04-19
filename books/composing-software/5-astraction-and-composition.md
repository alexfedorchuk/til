# Abstraction & Composition

Abstraction is “the process of considering something independently of its associations, attributes, or concrete accompaniments,” according to Google dictionary.

The process of decomposition is the process of abstraction. Successful abstraction implies that the result is a set of independently useful and recomposable components. From this we get an important principle of software architecture.

**Abstraction is simplification**

The process of abstraction has two main components:

**Generalization** is the process of finding similarities (the obvious) in repeated patterns, and hiding the similarities behind an abstraction.

**Specialization** is the process of using the abstraction, supplying only what is different (the meaningful) for each use case.

## Abstraction in Software

Abstraction in software takes many forms:

* Algorithms
* Data structures
* Modules
* Classes
* Frameworks
 
## Abstraction through composition

The most useful functions for abstraction in software are *pure functions*, which share modular characteristics with functions from math.

## How to Do More with Less Code

Abstraction is the key to doing more with less code.

```js
const add = a => b => a + b;

const inc = add(1);

const a = inc(1);
const b = inc(a);
const c = inc(b);
```

In this case, *inc* is just a *specialized* version of add. All curried functions are abstractions. In fact, all higher-order functions are generalizations that you can specialize by passing one or more arguments.
