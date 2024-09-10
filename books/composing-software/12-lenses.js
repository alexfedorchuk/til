// [x, y, z]
// Getter lens
const getX = ([x]) => x;
const getY = ([x, y]) => y;
const getZ = ([x, y, z]) => z;

console.log(getZ([1, 2, 3]));

// Setter lens
const setY = ([x, _, z]) => y => ([x, y, z]);

console.log(setY([1, 2, 3])(999));

// Pure functions to view and set which can be used with any lens
const view = (lens, store) => lens.view(store);
const set = (lens, value, store) => lens.set(value, store);

const lensProp = prop => ({
  view: store => store[prop],
  set: (value, store) => ({
    ...store,
    [prop]: value,
  }),
});

const fooStore = {
  a: 'foo',
  b: 'bar',
};

const aLens = lensProp('a');
const bLens = lensProp('b');

const aa = view(aLens, fooStore);
const bb = view(bLens, fooStore);

console.log(aa, bb);

const bazStore = set(aLens, 'baz', fooStore);

console.log(view(aLens, bazStore));