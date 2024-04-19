// # “Composing Software: An Introduction”
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

const trace = (label) => (value) => {
  console.log(`${label}: ${value}`);
  return value;
};

const add = (n) => n + 1;
const multiply = (n) => n * 2;

const doBetterStuff = pipe(
  add,
  trace("after add"),
  multiply,
  trace("after multiply")
);

doBetterStuff(20);

// Recursion

const sum = (n) => (n ? n + sum(n - 1) : 0);

/**
 * Proper tail call
 *
 * Некоторые движки поддерживают оптимизацию «хвостового вызова»: если рекурсивный вызов является самым последним в функции,
 * без каких-либо других вычислений, то внешней функции не нужно будет возобновлять выполнение и не нужно запоминать контекст его выполнения.
 * В итоге требования к памяти снижаются. Но если JavaScript-движок не поддерживает это (большинство не поддерживают),
 * будет ошибка: максимальный размер стека превышен, так как обычно существует ограничение на максимальный размер стека.
 */

const sum2 = (number, tail = 0) =>
  number ? sum2(number - 1, tail + number) : tail;

console.log(sum2(10));

/**
 * Tiny recursive curry
 */

// const curry =
//   (f, arr = []) =>
//   (...args) =>
//     ((a) => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args]);

const curry2 =
  (f, arr = []) =>
  (...args) =>
    (function (a) {
      // console.log(a.length, f.length);
      console.log(arr, args);
      // console.log(a.length, a);
      // console.log("f.length: ", f.length, f);
      return a.length === f.length ? f(...a) : curry2(f, a);
    })([...arr, ...args]);

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

const addC = curry2((a, b, c) => a + b + c);

// HOF

const reduce = (reducer, initial, arr) => {
  let acc = initial;
  for (let i = 0, { length } = arr; i < length; i++) {
    acc = reducer(acc, arr[i]);
  }

  return acc;
};

const filter = (fn, arr) =>
  reduce((acc, curr) => (fn(curr) ? acc.concat([curr]) : acc), [], arr);

console.log(reduce((acc, current) => acc + current, 0, [1, 2, 3]));


// Building an own functor

const Identity = (value) => ({
  map: (fn) => Identity(fn(value)),
});

const u = Identity(2);

const r1 = u;
const r2 = u.map(x => x);

console.log(r1, r2);
