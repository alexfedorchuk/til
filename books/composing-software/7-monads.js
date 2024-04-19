const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((y, f) => f(y), x);

const composeM =
  (flatMap) =>
  (...ms) =>
    ms.reduce((f, g) => (x) => g(x)[flatMap](f));

const composePromises = composeM("then");

const label = "API call composition";

// a => Promise(b)
const getUserById = (id) =>
  id === 3 ? Promise.resolve({ name: "Kurt", role: "Author" }) : undefined;

// b => Promise(c)
const hasPermission = ({ role }) => Promise.resolve(role === "Author");

const authUser = composePromises(hasPermission, getUserById);

authUser(3).then((r) => console.log(r));

/**
 * Monads
 */

const x = 20;

const Monad = (value) => ({
  flatMap: (f) => f(value),
  map(f) {
    return this.flatMap((a) => Monad.of(f(a)));
  },
});

Monad.of = (x) => Monad(x);

/**
 * Identity Monad
 */

// Identity monad
const Id = (value) => ({
  // Functor mapping
  // Preserve the wrapping for .map() by
  // passing the mapped value into the type
  // lift:
  map: (f) => Id.of(f(value)),

  // Monad flatMap
  // Discard one level of wrapping
  // by omitting the .of() type lift:
  flatMap: (f) => f(value),

  // Just a convenient way to inspect
  // the values:
  toString: () => `Id(${value})`,
});

// The type lift for this monad is just
// a reference to the factory.
Id.of = Id;

const g = (n) => Id(n + 1);
const f = (n) => Id(n * 2);

// Left identity
// unit(x).flatMap(f) ==== f(x)”
trace("Id monad left ")([Id(x).flatMap(f), f(x)]);

// Right identity
// m.flatMap(unit) ==== m
trace("Id monad right identity")([Id(x).flatMap(Id.of), Id(x)]);

// Associativity
// m.flatMap(f).flatMap(g) ====
// m.flatMap(x => f(x).flatMap(g)
trace("Id monad associativity")([
  Id(x).flatMap(g).flatMap(f),
  Id(x).flatMap((x) => g(x).flatMap(f)),
]);
// Id monad associativity: Id(42), Id(42)
