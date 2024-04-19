# Object Composition

## What is Object Composition?

In computer science, a composite data type or compound data type is any data type which can be constructed in a program using the programming languageâ€™s primitive data types and other composite types. […] ~ Wikipedia

All objects made from other objects and language primitives are *composite objects*.

The act of creating a composite object is known as *object composition*.

## Three Different Forms of Object Composition

### Aggregation

**Aggregation** is when an object is formed from an enumerable collection of subobjects. An aggregate is an object which contains other objects. Each subobject in an aggregation retains its own reference identity, and could be losslessly destructured from the aggregate. Aggregates can be represented in a wide variety of structures.

Examples

* Arrays
* Maps
* Sets
* Graphs
* Trees
  * DOM nodes (a DOM node may contain child nodes)
  * UI components (a component may contain child components)

When to use

Whenever there are collections of objects which need to share common operations, such as iterables, stacks, queues, trees, graphs, state machines, or the composite pattern (when you want a single item to share the same interface as many items).

### Concatenation

**Concatenation** is when an object is formed by adding new properties to an existing object.

Examples
* Plugins are added to jQuery.fn via concatenation
* State reducers (e.g., Redux)
* Functional mixins

When to Use

Any time it would be useful to progressively assemble data structures at runtime, e.g., merging JSON objects, hydrating application state from multiple sources, creating updates to immutable state (by merging previous state with new data), etc…


### Delegation

**Delegation** is when an object forwards or delegates to another object.

Examples

* JavaScript’s built-in types use delegation to forward built-in method calls up the prototype chain. e.g., [].map() delegates to Array.prototype.map(), obj.hasOwnProperty() delegates to Object.prototype.hasOwnProperty() and so on.
* jQuery plugins rely on delegation to share built-in and plugin methods among all jQuery object instances.
* Sketchpad’s “masters” were dynamic delegates. Modifications to the delegate would be reflected instantly in all of the object instances.
* Photoshop uses delegates called “smart objects” to refer to images and resources defined in separate files. Changes to the object that smart objects refer to are reflected in all instances of the smart object.


When to Use

1. **Conserve memory**: Any time there may be potentially many instances of an object and it would be useful to share identical properties or methods among each instance which would otherwise require allocating more memory.
2. **Dynamically update many instances**: Any time many instances of an object need to share identical state which may need to be updated dynamically and changes instantaneously reflected in every instance, e.g., Sketchpad’s “masters” or Photoshop’s “smart objects”.

These are not the only three kinds of object composition. It’s also possible to form loose, dynamic relationships between objects through acquaintance/association relationships where objects are passed as parameters to other objects (dependency injection), and so on.

Excerpt From
Composing Software
Eric Elliott
This material may be protected by copyright.