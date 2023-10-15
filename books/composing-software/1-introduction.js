const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const trace = label => value => {
  console.log(`${label}: ${value}`);
  return value;
};

const add = n => n + 1;
const multiply = n => n * 2;

const doBetterStuff = pipe(
  add,
  trace('after add'),
  multiply,
  trace('after multiply'),
);

doBetterStuff(20);
