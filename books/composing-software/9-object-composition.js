const objs = [
  { a: 'a', b: 'b' },
  { b: 'b' },
  { c: 'c', b: 'cb' },
];

// Aggregation
const collection = (a, e) => a.concat([e]);

const a = objs.reduce(collection, []);

console.log(
  'collection aggregation',
  a,
  a[1].b,
  a[2].c,
  `enumerable keys: ${Object.keys(a)}`
);

// Concatenation
const concatenate = (a, o) => ({ ...a, ...o });

const c = objs.reduce(concatenate, {});

console.log(
  'concatenation',
  c,
  `enumerable keys: ${Object.keys(c)}`
);

// Delegation
const delegate = (a, b) => Object.assign(Object.create(a), b);

const d = objs.reduce(delegate, {});

console.log(
  'delegation',
  d,
  `enumerable keys: ${Object.keys(d)}`
)