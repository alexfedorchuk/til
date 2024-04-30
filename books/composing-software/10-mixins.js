const withConstructor = constructor => o => ({
  // create the delegate [[Prototype]]
  __proto__: {
    // add the constructor prop to the new [[Prototype]]
    constructor,
  },
  // mix all o's props into the new object
  ...o,
});


// setup some functional mixins

const withFlying = o => {
  let isFlying = false;
  return {
    ...o,
    fly() {
      isFlying = true;
      return this;
    },
    land() {
      isFlying = false;
      return this;
    },
    isFlying: () => isFlying,
  }
}

const withBattery = ({ capacity }) => o => {
  let percentCharged = 100;
  return {
    ...o,
    draw(percent) {
      const remaining = percentCharged - percent;
      percentCharged = Math.max(remaining, 0);
      return this;
    },
    getCharge: () => percentCharged,
    getCapacity: () => capacity,
  }
};

const createDrone = ({ capacity = '3000mAh' }) => pipe(
  withFlying,
  withBattery({ capacity }),
  withConstructor(createDrone),
)({});

const myDrone = createDrone({ capacity: '5000mAh' });

console.log(myDrone)

console.log(`
  can fly:  ${ myDrone.fly().isFlying() === true }
  can land: ${ myDrone.land().isFlying() === false }
  battery capacity: ${ myDrone.getCapacity() }
  battery status: ${ myDrone.draw(50).getCharge() }%
  battery drained: ${ myDrone.draw(75).getCharge() }% remaining
`);

console.log(`
  constructor linked: ${ myDrone.constructor === createDrone }
`);
