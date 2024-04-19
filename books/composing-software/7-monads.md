# Monads

Monads are a way to compose type lifting functions: `g: a => M(b), f: b => M(c)`. To accomplish this, monads must `flatten M(b)` to `b` before applying `f()`. In other words, functors are things you can map over. Monads are things you can flatMap over:

* Functions can compose: `a => b => c` becomes `a => c`
* Functors can compose functions with context: given `F(a)` and two functions, `a => b => c`, return `F(c)`.
* Monads can compose type lifting functions: `a => M(b), b => M(c)` becomes `a => M(c)`

A monad is based on a simple symmetry — A way to wrap a value into a context, and a way to access the value in the context:

* **Lift/Unit**: A type lift from some type into the monad context: `a => M(a)`
* **Flatten/Join**: Unwrapping the type from the context: `M(c) => c` — this is usually the result of mapping `a => M(b), so M(c) => c is usually M(M(b)) => M(b)`. The purpose of flatten is to discard the extra layer of wrapping.

And since monads are also functors, they can also map:

* **Map**: Map with context preserved: `M(a) -> M(b)`

Combine *flatten* with *map*, and you get *flatMap* — function composition for lifting functions, aka Kleisli composition:

* **FlatMap/Chain** Flatten + map: given f: a => M(b), g: b => M(c) f(a).map(g) returns M(M(b)), so f(a).map(g).flatten() returns M(b), which is the same as f(a).flatMap(g).

Monads must satisfy three laws (axioms), collectively known as the monad laws:

* Left identity: `unit(x).flatMap(f) ==== f(x)`

* Right identity: `m.flatMap(unit) ==== m`

* Associativity: `m.flatMap(f).flatMap(g) ==== m.flatMap(x => f(x).flatMap(g))`

Examples of monads you might encounter in every day JavaScript code include promises and observables. Kleisli composition allows you to compose your data flow logic without worrying about the particulars of the data type’s API, and without worrying about the possible side-effects, conditional branching, or other details of the unwrapping computations hidden in the flatMap() operation.

This makes monads a very powerful tool to simplify your code. You don’t have to understand or worry about what’s going on inside monads to reap the simplifying benefits that monads can provide, but now that you know more about what’s under the hood, taking a peek under the hood isn’t such a scary prospect.
