# Why Composition is Harder with Classes

ES6 includes a convenient class syntax, so you may be wondering why we should care about factories at all. The most obvious difference is that constructors and class require the new keyword. But what does *new* actually do?

* Creates a new object and binds this to it in the constructor function.
* Implicitly returns this, unless you explicitly return another object.
* Sets the instance `[[Prototype]]`, `instance.__proto__` to `Constructor.prototype`, so that `Object.getPrototypeOf(instance) === Constructor.prototype` and `instance.__proto__ === Constructor.prototype`.
* Sets the `instance.constructor === Constructor`.

## The Delegate Prototype

The `[[Prototype]]` link is used for prototype delegation, which is a convenient way to conserve memory if you have millions of objects, or to squeeze a micro-performance boost out of your program if you need to access tens of thousands of properties on an object within a 16 ms render loop cycle.

If you don’t need to micro-optimize memory or performance, the `[[Prototype]]` link can do more harm than good. The prototype chain powers the `instanceof` operator in JavaScript, and unfortunately `instanceof` lies for two reasons:

In ES5, the `Constructor.prototype` link was dynamic and reconfigurable, which could be a handy feature if you need to create an abstract factory — but if you reassign the prototype, `instanceof` will give you false negatives if the `Constructor.prototype` does not currently reference the same object in memory that the instance `[[Prototype]]` references.

```js
 1 class User {
 2   constructor ({userName, avatar}) {
 3     this.userName = userName;
 4     this.avatar = avatar;
 5   }
 6 }
 7 
 8 const currentUser = new User({
 9   userName: 'Foo',
10   avatar: 'foo.png'
11 });
12 
13 User.prototype = {};
14 
15 console.log(
16   currentUser instanceof User, // <-- false -- Oops!
17   // But it clearly has the correct shape:
18   // { avatar: "foo.png", userName: "Foo" }
19   currentUser
20 );
```

A more common problem is that JavaScript has multiple execution contexts called *realms* — memory sandboxes where the same code will access different physical memory locations. For example, if you have a constructor in a parent frame and the same constructor in an iframe, the parent frame’s Constructor.prototype will not reference the same memory location as the Constructor.prototype in the iframe. Object values in JavaScript are memory references under the hood, and different frames point to different locations in memory, so === checks will fail.

## Code that Requires *new* Violates the Open/Closed Principle

Our APIs should be *open to extension*, but closed to *breaking changes*. Since a common extension to a class is to turn it into a more flexible factory, but that refactor is a breaking change, code that requires the new keyword is closed to extension and open to breaking changes. That’s the opposite of what we want.

### Performance and Memory

*class* offers two kinds of performance optimizations: shared memory for properties stored on the delegate prototype, and property lookup optimizations.

***class* property lookup optimizations are tiny microoptimizations**. Any type of closure scope or property access is measured in hundreds of thousands or millions of ops/second, so performance differences are rarely measurable in the context of an application, let alone impactful.

There are exceptions, of course. RxJS used class instances because they were faster than closure scopes when they profiled, but RxJS is a general purpose utility library that might be used in the context of hundreds of thousands operations that need to be squeezed into a 16ms render loop.

ThreeJS uses classes, but ThreeJS is a 3d rendering library which might be used for game engines manipulating thousands of objects every 16ms.

## Classes are OK if You’re Careful

With all the warnings out of the way, some clear guidelines emerge that can help you use classes safely:

* **Avoid *instanceof*** — it lies because JavaScript is dynamic and has multiple execution contexts, and instanceof fails in both situations. It can also cause problems if you switch to an abstract factory down the road.
* **Avoid *extends*** — don’t extend a single hierarchy more than once. “Favor object composition over class inheritance.”
* **Avoid exporting your class**. Use class internally for performance gains, but export a factory that creates instances in order to discourage users from extending your class and avoid forcing callers to use new.
* **Avoid *new***. Try to avoid using it directly whenever it makes sense, and don’t force your callers to use it. (Export a factory, instead).


It’s OK to use class if:
* **You’re building UI components for a framework like React or Angular**. Both frameworks wrap your component classes into factories and manage instantiation for you, so you don’t have to use new in your own code.
* *You never inherit from your own classes or components*. Instead, try object composition, function composition, higher order functions, higher order components, or modules — all of them are better code reuse patterns than class inheritance.
* **You need to optimize performance**. Just remember to export a factory so callers don’t have to use new and don’t get lured into the extends trap.